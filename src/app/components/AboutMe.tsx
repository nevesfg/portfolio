export default function AboutMe() {
    return (
        <div className="profileCustomization">
            <div className="profileRecentgameHeader">
                Sobre Mim
            </div>

            <div className="profileCustomizationBlock">
                <div className="aboutMeContent">
                    <div className="aboutMeSection">
                        <div className="aboutMeItem">
                            <div className="aboutMeIcon">
                                <img src="../assets/hello-img.webp" alt="Bem-vindo" />
                            </div>
                            <div className="aboutMeDetails">
                                <div className="aboutMeTitle">Olá, bem-vindo ao meu portfólio!</div>
                                <div className="aboutMeDescription">
                                    Sou um Desenvolvedor Front-End, concluinte do curso de Análise e Desenvolvimento de Sistemas pelo IF Baiano – Campus Guanambi.
                                    <br/><br/>
                                    Minha jornada na tecnologia começou como hobby, evoluiu com mais de três anos de estudos acadêmicos e, desde então, tem se transformado em carreira e propósito. Ao longo desse caminho, desenvolvi uma compreensão sólida sobre como criar aplicações web eficientes, intuitivas e visualmente atraentes.
                                </div>
                                <blockquote className="github-quote">
                                    "Se você pode sonhar, você pode realizar." — Walt Disney
                                </blockquote>
                            </div>
                        </div>
                    </div>

                    <div className="aboutMeSection">
                        <div className="aboutMeItem">
                            <div className="aboutMeIcon">
                                <img src="../assets/about-img.webp" alt="Tecnologias" />
                            </div>
                            <div className="aboutMeDetails">
                                <div className="aboutMeTitle">Tecnologias & Habilidades</div>
                                <div className="aboutMeDescription">
                                    Embora meu foco atual seja o Front-End, também construí uma base consistente no backend, o que me permite atuar com visão completa do produto. 
                                    <br/><br/>
                                    {/* Trabalho com tecnologias como Node.js, Git, MySQL, Django Rest Framework e Java, enquanto no front-end utilizo React.js, Vue.js, Django, Spring Boot, Bootstrap, HTML5 e CSS3. */}
 Essa combinação me permite criar soluções modernas, escaláveis e alinhadas às demandas reais do mercado.
                                </div>
                                {/* <div className="aboutMeSkills">
                                    <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44a23.476 23.476 0 0 0-3.107-.534A23.892 23.892 0 0 0 12.769 4.7c1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442a22.73 22.73 0 0 0-3.113.538 15.02 15.02 0 0 1-.254-1.42c-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.471 0-.92.014-1.36.034.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87a25.64 25.64 0 0 1-4.412.005 26.64 26.64 0 0 1-1.183-1.86c-.372-.64-.71-1.29-1.018-1.946a25.17 25.17 0 0 1 1.013-1.954c.38-.66.773-1.286 1.18-1.868A25.245 25.245 0 0 1 12 8.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933a25.952 25.952 0 0 0-1.345-2.32zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493a23.966 23.966 0 0 0-1.1-2.98c.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98a23.142 23.142 0 0 0-1.086 2.964c-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39a25.819 25.819 0 0 0 1.341-2.338zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143a22.005 22.005 0 0 1-2.006-.386c.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295a1.185 1.185 0 0 1-.553-.132c-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.36.034.47 0 .92-.014 1.36-.034-.44.572-.895 1.095-1.36 1.56-.465-.467-.92-.992-1.36-1.56z' fill='#61DAFB'/></svg>
                                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'><path d='M0 8.934l49.854.158 14.167 24.47 14.432-24.47L128 8.935l-63.834 110.14zm126.98.637l-24.36.02-38.476 66.053L25.691 9.592.942 9.572l63.211 107.89zm-25.149-.008l-22.745.168-15.053 24.647L49.216 9.73l-22.794-.168 37.731 64.476zm-75.834-.17l23.002.009m-23.002-.01l23.002.01' fill='none'/><path d='M25.997 9.393l23.002.009L64.035 34.36 79.018 9.404 102 9.398 64.15 75.053z' fill='#35495e'/><path d='M.91 9.569l25.067-.172 38.15 65.659L101.98 9.401l25.11.026-62.966 108.06z' fill='#41b883'/></svg>
                                    <svg version='1.0' viewBox='0 0 128 128' xmlns='http://www.w3.org/2000/svg' fill='#092e20'><path d='M59.448 0h20.93v96.88c-10.737 2.04-18.62 2.855-27.181 2.855-25.551-.001-38.87-11.551-38.87-33.705 0-21.338 14.135-35.2 36.015-35.2 3.398 0 5.98.272 9.106 1.087zm0 48.765c-2.446-.815-4.485-1.086-7.067-1.086-10.6 0-16.717 6.523-16.717 17.939 0 11.145 5.845 17.26 16.582 17.26 2.309 0 4.212-.136 7.202-.542z'/><path d='M113.672 32.321V80.84c0 16.717-1.224 24.735-4.893 31.666-3.398 6.661-7.883 10.873-17.124 15.494l-19.435-9.241c9.242-4.35 13.726-8.153 16.58-14 2.99-5.979 3.943-12.91 3.943-31.122V32.321zM92.742.111h20.93v21.474h-20.93z'/></svg>
                                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'><path d='M116.452 6.643a59.104 59.104 0 01-6.837 12.136A64.249 64.249 0 0064.205-.026C28.984-.026 0 28.982 0 64.242a64.316 64.316 0 0019.945 46.562l2.368 2.1a64.22 64.22 0 0041.358 15.122c33.487 0 61.637-26.24 64.021-59.683 1.751-16.371-3.051-37.077-11.24-61.7zM29.067 111.17a5.5 5.5 0 01-4.269 2.034c-3.018 0-5.487-2.484-5.487-5.502 0-3.017 2.485-5.501 5.487-5.501 1.25 0 2.485.433 3.452 1.234 2.351 1.9 2.718 5.384.817 7.735zm87.119-19.238c-15.843 21.122-49.68 14.003-71.376 15.02 0 0-3.852.234-7.721.867 0 0 1.45-.617 3.335-1.334 15.226-5.301 22.43-6.335 31.685-11.086 17.427-8.869 34.654-28.274 38.24-48.463-6.637 19.422-26.75 36.11-45.077 42.895-12.557 4.635-35.238 9.136-35.238 9.136l-.917-.484c-15.442-7.518-15.91-40.977 12.157-51.78 12.291-4.735 24.048-2.134 37.323-5.302 14.175-3.367 30.568-14.004 37.238-27.874 7.471 22.19 16.46 56.932.35 78.405z' fill='#77bc1f'/></svg>
                                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'><defs><linearGradient id='a' x1='76.079' x2='523.48' y1='10.798' y2='365.95' gradientTransform='translate(1.11 14.613) scale(.24566)' gradientUnits='userSpaceOnUse'><stop offset='0' stopColor='#9013fe'/><stop offset='1' stopColor='#6610f2'/></linearGradient><linearGradient id='b' x1='193.51' x2='293.51' y1='109.74' y2='278.87' gradientTransform='translate(0 52)' gradientUnits='userSpaceOnUse'><stop offset='0' stopColor='#fff'/><stop offset='1' stopColor='#f1e5fc'/></linearGradient><filter id='c' width='197' height='249' x='161.9' y='135.46' colorInterpolationFilters='sRGB' filterUnits='userSpaceOnUse'><feFlood floodOpacity='0' result='BackgroundImageFix'/><feColorMatrix in='SourceAlpha' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'/><feOffset dy='4'/><feGaussianBlur stdDeviation='8'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0'/><feBlend in2='BackgroundImageFix' result='effect1_dropShadow'/><feBlend in='SourceGraphic' in2='effect1_dropShadow' result='shape'/></filter></defs><path fill='url(#a)' d='M14.985 27.712c-.237-6.815 5.072-13.099 12.249-13.099h73.54c7.177 0 12.486 6.284 12.249 13.099-.228 6.546.068 15.026 2.202 21.94 2.141 6.936 5.751 11.319 11.664 11.883v6.387c-5.913.564-9.523 4.947-11.664 11.883-2.134 6.914-2.43 15.394-2.202 21.94.237 6.815-5.072 13.098-12.249 13.098h-73.54c-7.177 0-12.486-6.284-12.249-13.098.228-6.546-.068-15.026-2.203-21.94-2.14-6.935-5.76-11.319-11.673-11.883v-6.387c5.913-.563 9.533-4.947 11.673-11.883 2.135-6.914 2.43-15.394 2.203-21.94z'/><path fill='url(#b)' d='M267.1 364.46c47.297 0 75.798-23.158 75.798-61.355 0-28.873-20.336-49.776-50.532-53.085v-1.203c22.185-3.609 39.594-24.211 39.594-47.219 0-32.783-25.882-54.138-65.322-54.138h-88.74v217zm-54.692-189.48h45.911c24.958 0 39.131 11.128 39.131 31.279 0 21.505-16.484 33.535-46.372 33.535h-38.67zm0 161.96v-71.431h45.602c32.661 0 49.608 12.03 49.608 35.49 0 23.459-16.484 35.941-47.605 35.941z' filter='url(#c)' transform='translate(1.494 2.203) scale(.24566)'/></svg>
                                    <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z' fill='#E34F26'/></svg>
                                    <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z' fill='#1572B6'/></svg>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    <div className="aboutMeSection">
                        <div className="aboutMeItem">
                            <div className="aboutMeIcon">
                                <img src="../assets/games-img.webp" alt="Paixões" />
                            </div>
                            <div className="aboutMeDetails">
                                <div className="aboutMeTitle">Paixão & Inovação</div>
                                <div className="aboutMeDescription">
                                    Além da área técnica, sou um entusiasta do universo dos games, algo que impulsiona minha criatividade, minha visão estética e até meu inglês características que agregam valor ao meu processo de desenvolvimento e à forma como penso soluções.
                                </div>
                                <div className="aboutMeDescription">
                                    Sou movido por curiosidade, evolução contínua e pela vontade de transformar ideias em experiências reais.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="recentgameQuicklinks">
                    <a className="whiteLink" href="https://www.linkedin.com/in/nevesfg/" target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </a>
                    <span className="linkSeparator">|</span>
                    <a className="whiteLink" href="https://github.com/nevesfg" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                    <span className="linkSeparator">|</span>
                    <a className="whiteLink" href="../assets/VictorNeves-CV-FrontEnd.pdf" target="_blank" rel="noopener noreferrer">
                        Currículo
                    </a>
                </div>
            </div>
        </div>
    );
}