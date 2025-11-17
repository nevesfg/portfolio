'use client';

import { useState, useEffect } from 'react';
import projectsData from '../config/projects.json';
import technologyIcons from '../config/technology-icons.json';

export interface Project {
    id: number;
    title: string;
    description: string;
    image: string[];
    className: string;
    detailsLink: string;
    viewLink: string;
    technologies: string[];
}

interface ProjectCardProps {
    project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
    const [showSecondary, setShowSecondary] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowSecondary(prev => !prev);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const handleLiveDemo = () => {
        window.open(project.viewLink, '_blank', 'noopener,noreferrer');
    };

    const handleSourceCode = () => {
        window.location.href = `/projects/${project.id}`;
    };

    return (
        <div className="card">
            <img 
                className={`card__image card__image--primary ${showSecondary ? 'card__image--hidden' : ''}`}
                src={project.image[0]} 
                alt={`${project.title} Project Primary`} 
            />
            <img 
                className={`card__image card__image--secondary ${showSecondary ? 'card__image--visible' : ''}`}
                src={project.image[1]} 
                alt={`${project.title} Project Secondary`} 
            />
            <div className="card__content">
                <div className="card__header">
                    <p className="card__title">{project.title}</p>
                    <div className="card__technologies">
                        {project.technologies?.map((tech, index) => {
                            const techIcon = technologyIcons.technologies[tech as keyof typeof technologyIcons.technologies];
                            return techIcon ? (
                                <div 
                                    key={index}
                                    className="tech-icon"
                                    title={techIcon.name}
                                    dangerouslySetInnerHTML={{ __html: techIcon.icon }}
                                />
                            ) : null;
                        })}
                    </div>
                </div>
                <p className="card__description">{project.description}</p>
                <div className="card__buttons">
                    <button className="card__button" onClick={handleSourceCode}>
                        Detalhes
                    </button>
                    <button className="card__button secondary" onClick={handleLiveDemo}>
                        Visualizar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function ProjectsStats() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    
    const projects: Project[] = projectsData.projects;

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);
        
        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    const itemsPerPage = isMobile ? 1 : 3;
    const totalPages = Math.ceil(projects.length / itemsPerPage);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex + itemsPerPage >= projects.length ? 0 : prevIndex + itemsPerPage
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? Math.max(0, projects.length - itemsPerPage) : prevIndex - itemsPerPage
        );
    };

    useEffect(() => {
        setCurrentIndex(0);
    }, [isMobile]);

    const currentProjects = projects.slice(currentIndex, currentIndex + itemsPerPage);

    return (
        <div className="profileCustomization">
            <div className="profileCustomizationHeader">Colecionador de Projetos</div>

            <div className="profileCustomizationBlock">
                <div className="gamecollectorShowcase">
                    <div className="showcaseContentBg">
                        <a className="showcaseStat" >
                            <div className="value">15</div>
                            <div className="label">Projetos</div>
                        </a>
                        <a className="showcaseStat" >
                            <div className="value">6</div>
                            <div className="label">Tecnologias</div>
                        </a>
                        <a className="showcaseStat" >
                            <div className="value">6</div>
                            <div className="label">Frameworks</div>
                        </a>
                        <a className="showcaseStat" >
                            <div className="value">1M+</div>
                            <div className="label">Linhas</div>
                        </a>
                    </div>

                    <div className="projectsCarousel">
                        <div className="carouselContainer">
                            <button 
                                className="carouselArrow carouselArrow--left" 
                                onClick={prevSlide}
                                disabled={currentIndex === 0}
                            >
                                ←
                            </button>
                            
                            <div className="showcaseProjectsGrid">
                                {currentProjects.map((project) => (
                                    <ProjectCard key={project.id} project={project} />
                                ))}
                            </div>
                            
                            <button 
                                className="carouselArrow carouselArrow--right" 
                                onClick={nextSlide}
                                disabled={currentIndex + itemsPerPage >= projects.length}
                            >
                                →
                            </button>
                        </div>
                        
                        <div className="carouselIndicators">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    className={`indicator ${Math.floor(currentIndex / itemsPerPage) === index ? 'active' : ''}`}
                                    onClick={() => setCurrentIndex(index * itemsPerPage)}
                                />
                            ))}
                        </div>
                        
                        <div className="viewAllProjectsContainer">
                            <button 
                                className="viewAllProjectsBtn"
                                onClick={() => window.location.href = '/projects'}
                            >
                                Visualizar todos os projetos
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}