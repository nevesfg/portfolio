import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Criar FormData para enviar ao FormSubmit
    const formData = new FormData();
    formData.append('name', body.name);
    formData.append('email', body.email);
    formData.append('message', body.message);
    formData.append('_subject', 'Novo contato do portfólio!');
    formData.append('_captcha', 'false');
    formData.append('_template', 'table');
    
    console.log('📧 Enviando email para:', body.email);
    
    // Reenviar para FormSubmit
    const response = await fetch('https://formsubmit.co/victor@nevesfg.com', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    });

    console.log('📬 FormSubmit status:', response.status);

    if (response.ok) {
      return NextResponse.json({ success: true, message: 'Email enviado com sucesso!' });
    } else {
      const errorText = await response.text();
      console.error('❌ FormSubmit error:', errorText);
      return NextResponse.json(
        { success: false, message: 'Erro ao enviar email' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('❌ Contact API error:', error);
    return NextResponse.json(
      { success: false, message: 'Erro no servidor: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}
