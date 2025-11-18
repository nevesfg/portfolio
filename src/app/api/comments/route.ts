import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { moderateComment } from '../../config/openai';

const commentsFilePath = path.join(process.cwd(), 'src/app/config/comments.json');

export async function GET() {
  try {
    const fileContents = fs.readFileSync(commentsFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read comments' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const newComment = await request.json();
    
    if (!newComment.isLinkedInUser) {
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
    
    if (!newComment.isLinkedInUser) {
      response.cookies.set('last_anonymous_comment', Date.now().toString(), {
        maxAge: 60,
        httpOnly: true,
        sameSite: 'strict'
      });
    }
    
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
    const { commentId, linkedInId } = await request.json();
    
    // Verificar sessão do LinkedIn via cookie
    const sessionCookie = request.cookies.get('linkedin_session')?.value;
    
    if (!sessionCookie) {
      console.log('❌ Tentativa não autorizada: sem sessão');
      return NextResponse.json({ 
        error: 'Não autorizado - faça login' 
      }, { status: 401 });
    }
    
    // Decodificar sessão (formato: linkedInId:timestamp)
    const [sessionLinkedInId, timestamp] = sessionCookie.split(':');
    const adminLinkedInId = process.env.ADMIN_LINKEDIN_ID || 'l-Aqc5-pZh';
    
    // Verificar se a sessão é válida (menos de 24h)
    const sessionAge = Date.now() - parseInt(timestamp);
    const maxAge = 24 * 60 * 60 * 1000; // 24 horas
    
    if (sessionAge > maxAge) {
      console.log('❌ Sessão expirada');
      return NextResponse.json({ 
        error: 'Sessão expirada - faça login novamente' 
      }, { status: 401 });
    }
    
    // Validação: linkedInId da sessão E do body devem ser do admin
    if (sessionLinkedInId !== adminLinkedInId || linkedInId !== adminLinkedInId) {
      console.log('❌ Tentativa não autorizada: linkedInId inválido', { sessionLinkedInId, linkedInId });
      return NextResponse.json({ 
        error: 'Não autorizado' 
      }, { status: 403 });
    }
    
    const fileContents = fs.readFileSync(commentsFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    const commentsBefore = data.comments.length;
    data.comments = data.comments.filter((comment: any) => comment.id !== commentId);
    
    if (data.comments.length === commentsBefore) {
      return NextResponse.json({ 
        error: 'Comentário não encontrado' 
      }, { status: 404 });
    }
    
    fs.writeFileSync(commentsFilePath, JSON.stringify(data, null, 2), 'utf8');
    
    console.log('✅ Comentário deletado com sucesso por:', linkedInId);
    
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