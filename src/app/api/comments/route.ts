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
    
    const fileContents = fs.readFileSync(commentsFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    data.comments.unshift(newComment);
    
    fs.writeFileSync(commentsFilePath, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ 
      success: true, 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save comment' }, { status: 500 });
  }
}