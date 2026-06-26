import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { moderateComment } from '../../config/openai';

const commentsFilePath = path.join(process.cwd(), 'src/app/config/comments.json');

// Hash da senha de admin (use bcrypt em produção, mas crypto.pbkdf2 é nativo do Node)
// Para gerar: node -e "console.log(crypto.pbkdf2Sync('SUA_SENHA', 'salt_fixo_aqui', 100000, 64, 'sha512').toString('hex'))"
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '';
const SALT = process.env.ADMIN_PASSWORD_SALT || 'portfolio_nevesfg_2026';

function hashPassword(password: string): string {
  return crypto.pbkdf2Sync(password, SALT, 100000, 64, 'sha512').toString('hex');
}

function verifyPassword(password: string): boolean {
  if (!ADMIN_PASSWORD_HASH) return false;
  const hash = hashPassword(password);
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(ADMIN_PASSWORD_HASH));
}

export async function GET() {
  try {
    const fileContents = fs.readFileSync(commentsFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    // Remover dados sensíveis antes de retornar
    const sanitizedComments = data.comments.map((comment: any) => ({
      id: comment.id,
      author: comment.author,
      authorImage: comment.authorImage,
      content: comment.content,
      timestamp: comment.timestamp
    }));
    
    return NextResponse.json({ comments: sanitizedComments });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read comments' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const newComment = await request.json();
    
    // Rate limiting (1 minuto para todos os usuários)
    const lastCommentTime = request.cookies.get('last_anonymous_comment')?.value;
    if (lastCommentTime) {
      const timeSinceLastComment = Date.now() - parseInt(lastCommentTime);
      const oneMinute = 60 * 1000;
      
      if (timeSinceLastComment < oneMinute) {
        const remainingSeconds = Math.ceil((oneMinute - timeSinceLastComment) / 1000);
        return NextResponse.json({ 
          error: `Aguarde ${remainingSeconds} segundos antes de comentar novamente`,
        }, { status: 429 });
      }
    }
    
    const moderationResult = await moderateComment(newComment.content);
    
    
    if (moderationResult.category === 'forbidden') {
      return NextResponse.json({ 
        error: 'Comentário rejeitado por conter conteúdo inadequado',
      }, { status: 400 });
    }
    
    if (moderationResult.category === 'uncertain') {
      newComment.needsReview = true;
      newComment.moderationResult = moderationResult;
    }
    
    if (moderationResult.category === 'error') {
      newComment.moderationError = true;
      newComment.moderationResult = moderationResult;
    }
    
    newComment.moderationResult = moderationResult;
    
    // Verificar se o arquivo existe e tem permissão de escrita
    try {
      fs.accessSync(commentsFilePath, fs.constants.R_OK | fs.constants.W_OK);
    } catch (accessError) {
      console.error('❌ Erro de permissão no arquivo:', commentsFilePath);
      console.error('Detalhes:', accessError);
      return NextResponse.json({ 
        error: 'Arquivo de comentários sem permissão de escrita' 
      }, { status: 500 });
    }
    
    const fileContents = fs.readFileSync(commentsFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    data.comments.unshift(newComment);
    
    fs.writeFileSync(commentsFilePath, JSON.stringify(data, null, 2), 'utf8');
    
    console.log('✅ Comentário salvo com sucesso!');
    
    const response = NextResponse.json({ 
      success: true, 
    });
    
    // Salvar timestamp do último comentário
    response.cookies.set('last_anonymous_comment', Date.now().toString(), {
      maxAge: 60, // 1 minuto
      httpOnly: true,
      sameSite: 'strict'
    });
    
    return response;
  } catch (error) {
    console.error('❌ Erro ao salvar comentário:', error);
    return NextResponse.json({ 
      error: 'Failed to save comment',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { commentId, password } = await request.json();
    
    if (!commentId || !password) {
      return NextResponse.json({ 
        error: 'ID do comentário e senha são obrigatórios' 
      }, { status: 400 });
    }
    
    // Verificar senha
    if (!verifyPassword(password)) {
      console.log('❌ Tentativa de deletar com senha incorreta');
      return NextResponse.json({ 
        error: 'Senha incorreta' 
      }, { status: 403 });
    }
    
    const fileContents = fs.readFileSync(commentsFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    // Filtrar o comentário a ser deletado
    const commentsBefore = data.comments.length;
    data.comments = data.comments.filter((comment: any) => comment.id !== commentId);
    
    if (data.comments.length === commentsBefore) {
      return NextResponse.json({ 
        error: 'Comentário não encontrado' 
      }, { status: 404 });
    }
    
    fs.writeFileSync(commentsFilePath, JSON.stringify(data, null, 2), 'utf8');
    
    console.log('✅ Comentário deletado com sucesso');
    
    return NextResponse.json({ 
      success: true, 
    });
  } catch (error) {
    console.error('❌ Erro ao deletar comentário:', error);
    return NextResponse.json({ 
      error: 'Failed to delete comment',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}