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
                            <div className="profileHeaderTopRow">
                                <div className="profileHeaderCenteredPersona">
                                    <div className="personaName">
                                        <span className="actualPersonaName socialHoverTrigger">
                                            Victor Neves
                                            <div className="socialTooltip">
                                                <h4 className="socialTooltipTitle">Você também pode me encontrar no:</h4>
                                                <div className="socialLinks">
                                                    <a href="https://www.instagram.com/nevesfg" target="_blank" rel="noopener noreferrer" className="socialLink">
                                                        <svg className="socialIcon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                                            <path fillRule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clipRule="evenodd"/>
                                                        </svg>
                                                        <span>Instagram: nevesfg</span>
                                                    </a>
                                                    <a href="https://www.linkedin.com/in/nevesfg" target="_blank" rel="noopener noreferrer" className="socialLink">
                                                        <svg className="socialIcon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                                            <path fillRule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clipRule="evenodd"/>
                                                            <path d="M7.2 8.809H4V19.5h3.2V8.809Z"/>
                                                        </svg>
                                                        <span>LinkedIn: nevesfg</span>
                                                    </a>
                                                    <a href="https://github.com/nevesfg" target="_blank" rel="noopener noreferrer" className="socialLink">
                                                        <svg className="socialIcon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                                            <path fillRule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clipRule="evenodd"/>
                                                        </svg>
                                                        <span>GitHub: nevesfg</span>
                                                    </a>
                                                    <a href="https://steamcommunity.com/id/nevesfg/" target="_blank" rel="noopener noreferrer" className="socialLink">
                                                        <svg className="socialIcon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 0 1-8-8 7.92 7.92 0 0 1 .07-.91l4.12 1.7a2.45 2.45 0 0 0 1.81 3.07 2.47 2.47 0 0 0 3.07-1.81v-.07l2.36-3.37a3.28 3.28 0 1 0-3.27-3.27v.05l-3.37 2.36a2.47 2.47 0 0 0-3.88.83A8 8 0 1 1 12 20Z"/>
                                                        </svg>
                                                        <span>Steam: nevesfg</span>
                                                    </a>
                                                    <a href="https://discord.com/users/625828665791348758" target="_blank" rel="noopener noreferrer" className="socialLink">
                                                        <svg className="socialIcon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M18.942 5.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.586 11.586 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3 17.392 17.392 0 0 0-2.868 11.662 15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.638 10.638 0 0 1-1.706-.83c.143-.106.283-.217.418-.331a11.664 11.664 0 0 0 10.118 0c.137.114.277.225.418.331-.544.328-1.116.606-1.71.832a12.58 12.58 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM8.678 14.813a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.929 1.929 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z"/>
                                                        </svg>
                                                        <span>Discord: nevesfg</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </span>
                                        {/* <span className="namehistoryLink">
                                            <img src="/api/placeholder/9/5" alt="Arrow" />
                                        </span> */}
                                    </div>
                                    <div className="headerRealName">nevesfg</div>
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
                            </div>

                            {/* Card de descrição */}
                            <div className="profileDescription">
                                <div className="profileDescriptionCard">
                                    <h3 className="profileDescriptionTitle">Agenda aberta!</h3>
                                    <p className="profileDescriptionText">
                                        Quer um portfólio profissional, um sistema próprio ou um app do zero?
                                        <br />
                                        Se quiser tirar sua ideia do papel, só me chamar.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
