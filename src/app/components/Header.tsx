'use client';

import { useState, useEffect } from 'react';

export default function Header() {
    const [showingMenu, setShowingMenu] = useState(false);
    const [activeSection, setActiveSection] = useState('sobre');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isRetracted, setIsRetracted] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && showingMenu) {
                setShowingMenu(false);
            }
        };

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            
            if (scrollPosition > 104) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
                setIsRetracted(false);
            }

            if (window.location.pathname !== '/') {
                setActiveSection('');
                return;
            }

            const sections = ['sobre', 'habilidades', 'projetos', 'comentarios', 'contato'];
            const scrollPositionWithOffset = scrollPosition + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetBottom = offsetTop + element.offsetHeight;
                    
                    if (scrollPositionWithOffset >= offsetTop && scrollPositionWithOffset < offsetBottom) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        const scrollToHashOnLoad = () => {
            if (window.location.pathname === '/' && window.location.hash) {
                const sectionId = window.location.hash.substring(1);
                setTimeout(() => {
                    scrollToSection(sectionId);
                }, 100);
            }
        };

        if (window.location.pathname !== '/') {
            setActiveSection('');
        } else {
            scrollToHashOnLoad();
        }

        handleScroll();

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [showingMenu]);

    const toggleMobileMenu = () => {
        setShowingMenu(!showingMenu);
    };

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const elementRect = element.getBoundingClientRect();
            const elementTop = elementRect.top + window.scrollY;
            const elementHeight = elementRect.height;
            const windowHeight = window.innerHeight;
            
            const targetScrollPosition = elementTop - (windowHeight / 2) + (elementHeight / 2);
            
            window.scrollTo({
                top: targetScrollPosition,
                behavior: 'smooth'
            });
        }
    };

    const handleMenuItemClick = (sectionId: string) => {
        if (showingMenu) {
            setShowingMenu(false);
        }
        
        if (window.location.pathname !== '/') {
            if (sectionId) {
                window.location.href = `/#${sectionId}`;
            }
            return;
        }
        
        scrollToSection(sectionId);
    };

    const handleLogoClick = () => {
        if (window.location.pathname !== '/') {
            window.location.href = '/';
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            <div className={`globalHeader ${isScrolled ? 'scrolled' : ''}`}>
                <div className="content">
                    <div className="logoText" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
                        <h1>&lt;/Nevesfg&gt;</h1>
                    </div>

                    <div className={`supernavContainer ${showingMenu ? 'active' : ''}`}>
                        <button 
                            className={`menuitem ${activeSection === 'sobre' ? 'active' : ''}`} 
                            onClick={() => handleMenuItemClick('sobre')}
                        >
                            Sobre
                        </button>
                        <button 
                            className={`menuitem ${activeSection === 'habilidades' ? 'active' : ''}`} 
                            onClick={() => handleMenuItemClick('habilidades')}
                        >
                            Habilidades
                        </button>
                        <button 
                            className={`menuitem ${activeSection === 'projetos' ? 'active' : ''}`} 
                            onClick={() => handleMenuItemClick('projetos')}
                        >
                            Projetos
                        </button>
                        <button 
                            className={`menuitem ${activeSection === 'comentarios' ? 'active' : ''}`} 
                            onClick={() => handleMenuItemClick('comentarios')}
                        >
                            Chat
                        </button>
                        <button 
                            className={`menuitem ${activeSection === 'contato' ? 'active' : ''}`} 
                            onClick={() => handleMenuItemClick('contato')}
                        >
                            Contato
                        </button>
                    </div>

                    <div 
                        id="mobile-menu-btn" 
                        className={showingMenu ? 'active' : ''}
                        onClick={toggleMobileMenu}
                    >
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>

            {/* Header retraído na lateral */}
            {isScrolled && (
                <div 
                    className={`sideHeader ${!isRetracted ? '' : 'retracted'}`}
                    onMouseEnter={() => setIsRetracted(false)}
                    onMouseLeave={() => setIsRetracted(true)}
                >
                    <div className="sideHeaderContent">
                        <button 
                            className={`sideMenuItem ${activeSection === 'sobre' ? 'active' : ''}`}
                            onClick={() => handleMenuItemClick('sobre')}
                            title="Sobre"
                        >
                            <span className="sideMenuIcon">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 5V4a1 1 0 0 0-1-1H8.914a1 1 0 0 0-.707.293L4.293 7.207A1 1 0 0 0 4 7.914V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5M9 3v4a1 1 0 0 1-1 1H4m11.383.772 2.745 2.746m1.215-3.906a2.089 2.089 0 0 1 0 2.953l-6.65 6.646L9 17.95l.739-3.692 6.646-6.646a2.087 2.087 0 0 1 2.958 0Z"/>
                                </svg>
                            </span>
                            <span className="sideMenuText">Sobre</span>
                        </button>
                        <button 
                            className={`sideMenuItem ${activeSection === 'habilidades' ? 'active' : ''}`}
                            onClick={() => handleMenuItemClick('habilidades')}
                            title="Habilidades"
                        >
                            <span className="sideMenuIcon">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M12.0001 20v-4M7.00012 4h9.99998M9.00012 5v5c0 .5523-.46939 1.0045-.94861 1.279-1.43433.8217-2.60135 3.245-2.25635 4.3653.07806.2535.35396.3557.61917.3557H17.5859c.2652 0 .5411-.1022.6192-.3557.3449-1.1204-.8221-3.5436-2.2564-4.3653-.4792-.2745-.9486-.7267-.9486-1.279V5c0-.55228-.4477-1-1-1h-4c-.55226 0-.99998.44772-.99998 1Z"/>
                                </svg>

                            </span>
                            <span className="sideMenuText">Habilidades</span>
                        </button>
                        <button 
                            className={`sideMenuItem ${activeSection === 'projetos' ? 'active' : ''}`}
                            onClick={() => handleMenuItemClick('projetos')}
                            title="Projetos"
                        >
                            <span className="sideMenuIcon">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 3v4a1 1 0 0 1-1 1H5m4 6 2 2 4-4m4-8v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"/>
                                </svg>

                            </span>
                            <span className="sideMenuText">Projetos</span>
                        </button>
                        <button 
                            className={`sideMenuItem ${activeSection === 'comentarios' ? 'active' : ''}`}
                            onClick={() => handleMenuItemClick('comentarios')}
                            title="Chat"
                        >
                            <span className="sideMenuIcon">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
                                </svg>

                            </span>
                            <span className="sideMenuText">Chat</span>
                        </button>
                        <button 
                            className={`sideMenuItem ${activeSection === 'contato' ? 'active' : ''}`}
                            onClick={() => handleMenuItemClick('contato')}
                            title="Contato"
                        >
                            <span className="sideMenuIcon">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
                                </svg>

                            </span>
                            <span className="sideMenuText">Contato</span>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
