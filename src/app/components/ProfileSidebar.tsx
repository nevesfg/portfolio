'use client';

import { useState } from 'react';
import ProfileStatus from "./ProfileStatus";

export default function ProfileSidebar() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            // Enviar diretamente para FormSubmit com AJAX
            const response = await fetch('https://formsubmit.co/ajax/victor@nevesfg.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    message: formData.get('message'),
                    _subject: 'Novo contato do portfólio!',
                    _captcha: 'false',
                    _template: 'table'
                })
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setSubmitStatus('success');
                form.reset();
                // Limpar status após 5 segundos
                setTimeout(() => setSubmitStatus('idle'), 5000);
            } else {
                setSubmitStatus('error');
                console.error('Erro:', result.message || 'Erro ao enviar');
            }
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="profileRightcol">
            <ProfileStatus />

            <div className="responsiveCountLinkArea">

                {/* Contact Form */}
                <div className="profileContactForm" id="contato">
                    <div className="contactFormHeader">
                        <h3>Entre em Contato</h3>
                        <p>Vem fazer orçamento de Bots Discord/Whatsapp/Telegram, Sistemas Web e até mesmo E-commerces!</p>
                    </div>
                    
                    <form 
                        onSubmit={handleSubmit}
                        className="contactForm"
                    >
                        <div className="formGroup">
                            <label htmlFor="name">Nome</label>
                            <input 
                                type="text" 
                                id="name"
                                name="name" 
                                placeholder="Seu nome completo" 
                                required 
                            />
                        </div>
                        
                        <div className="formGroup">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email"
                                name="email" 
                                placeholder="seu@email.com" 
                                required 
                            />
                        </div>
                        
                        <div className="formGroup">
                            <label htmlFor="message">Mensagem</label>
                            <textarea 
                                id="message"
                                name="message" 
                                placeholder="Conte-me sobre seu projeto ou ideia..." 
                                rows={4}
                                required
                            ></textarea>
                        </div>
                        
                        <button 
                            type="submit" 
                            className={`contactSubmitBtn ${isSubmitting ? 'submitting' : ''} ${submitStatus === 'success' ? 'success' : ''} ${submitStatus === 'error' ? 'error' : ''}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span>Enviando...</span>
                                    <div className="spinner"></div>
                                </>
                            ) : submitStatus === 'success' ? (
                                <>
                                    <span>Enviado!</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                    </svg>
                                </>
                            ) : submitStatus === 'error' ? (
                                <>
                                    <span>Erro - Tente novamente</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                    </svg>
                                </>
                            ) : (
                                <>
                                    <span>Enviar Mensagem</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                                    </svg>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
