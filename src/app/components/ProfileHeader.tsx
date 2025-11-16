export default function ProfileHeader() {
    return (
        <div className="profileHeaderBg">
            <div className="profileHeaderBgTexture">
                <div className="profileHeader">
                    <div className="profileHeaderContent">
                        <div className="playerAvatar">
                            <div className="playerAvatarAutoSizeInner">
                                {/* Frame de Avatar caso queira habilitar */}
                                {/* <div className="profileAvatarFrame">
                                    <img src="../assets/frame.png" alt="Frame" />
                                </div> */}
                                <img src="../assets/IMG_9070.jpg" alt="Avatar" />
                            </div>
                        </div>

                        {/* Informações centrais */}
                        <div className="profileHeaderCenteredCol">
                            <div className="profileHeaderCenteredPersona">
                                <div className="personaName">
                                    <span className="actualPersonaName">Victor Neves</span>
                                    {/* <span className="namehistoryLink">
                                        <img src="/api/placeholder/9/5" alt="Arrow" />
                                    </span> */}
                                </div>
                                <div className="headerRealName">nevesfg</div>
                            </div>
                        </div>

                        {/* Botão Currículo */}
                        <div className="profileHeaderActions">
                            <a 
                                className="cvDownloadBtn" 
                                href="/assets/VictorNeves-CV-FrontEnd.pdf" 
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg 
                                    className="cvIcon" 
                                    aria-hidden="true" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="24" 
                                    height="24" 
                                    fill="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        fillRule="evenodd" 
                                        d="M13 11.15V4a1 1 0 1 0-2 0v7.15L8.78 8.374a1 1 0 1 0-1.56 1.25l4 5a1 1 0 0 0 1.56 0l4-5a1 1 0 1 0-1.56-1.25L13 11.15Z" 
                                        clipRule="evenodd"
                                    />
                                    <path 
                                        fillRule="evenodd" 
                                        d="M9.657 15.874 7.358 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2.358l-2.3 2.874a3 3 0 0 1-4.685 0ZM17 16a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z" 
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="cvText">Currículo CV</span>
                            </a>
                        </div>

                        {/* Card de descrição */}
                        {/* <div className="profileDescription">
                            <div className="profileDescriptionCard">
                                <h3 className="profileDescriptionTitle">Sobre mim</h3>
                                <p className="profileDescriptionText">
                                    Desenvolvedor Full Stack apaixonado por tecnologia e inovação. 
                                    Especializado em React, Node.js e tecnologias modernas. 
                                    Sempre em busca de novos desafios e oportunidades para criar 
                                    soluções impactantes e eficientes.
                                </p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
