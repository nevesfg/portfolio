'use client';

import { useEffect } from 'react';

export default function LinkedInCallback() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const error = urlParams.get('error');
    
    if (error) {
      console.error('LinkedIn auth error:', error);
      window.close();
      return;
    }
    
    const savedState = localStorage.getItem('linkedin_state');
    if (state !== savedState) {
      console.error('Invalid state parameter');
      window.close();
      return;
    }
    
    if (code) {
      exchangeCodeForToken(code);
    } else {
      console.error('No authorization code received');
      window.close();
    }
  }, []);

  const exchangeCodeForToken = async (code: string) => {
    try {
      
      const res = await fetch("/api/linkedin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const user = await res.json();

      if (user.error) {
        console.error("❌ Erro da API:", user.error);
        alert(`Erro: ${user.error}`);
        window.close();
        return;
      }

      localStorage.setItem("linkedin_user", JSON.stringify(user));

      window.close();
    } catch (err) {
      console.error("❌ LinkedIn token error:", err);
      alert(`Erro de rede: ${err}`);
      window.close();
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      background: '#000',
      color: '#fff',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          border: '3px solid #0077b5', 
          borderTop: '3px solid transparent', 
          borderRadius: '50%', 
          animation: 'spin 1s linear infinite',
          margin: '0 auto 16px'
        }}></div>
        <p>Processando autenticação do LinkedIn...</p>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}