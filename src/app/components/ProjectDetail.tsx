'use client';

import { useState, useEffect } from 'react';
import projectsData from '../config/projects.json';
import technologyIcons from '../config/technology-icons.json';

interface Project {
    id: number;
    title: string;
    description: string;
    image: string[];
    className: string;
    detailsLink: string;
    viewLink: string;
    technologies: string[];
    isPublic: boolean;
    aboutProject: string;
}

interface ProjectDetailProps {
    projectId: string;
}

export default function ProjectDetail({ projectId }: ProjectDetailProps) {
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const foundProject = projectsData.projects.find(p => p.id === parseInt(projectId));
        setProject(foundProject || null);
        setLoading(false);
    }, [projectId]);

    // Alternar imagens automaticamente
    useEffect(() => {
        if (!project || !project.image.length) return;
        
        const interval = setInterval(() => {
            setCurrentImage(prev => (prev + 1) % project.image.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [project]);

    const handleViewProject = () => {
        if (project) {
            window.open(project.viewLink, '_blank', 'noopener,noreferrer');
        }
    };

    const handleViewCode = () => {
        if (project) {
            if (project.isPublic) {
                window.open(project.detailsLink, '_blank', 'noopener,noreferrer');
            } else {
                alert('Este projeto possui código privado. Entre em contato para mais informações.');
            }
        }
    };

    if (loading) {
        return (
            <div className="profileCustomization">
                <div className="profileCustomizationHeader">Carregando Projeto</div>
                <div className="profileCustomizationBlock">
                    <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(198, 212, 223, 0.7)' }}>
                        Carregando detalhes do projeto...
                    </div>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="profileCustomization">
                <div className="profileCustomizationHeader">Projeto Não Encontrado</div>
                <div className="profileCustomizationBlock">
                    <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(198, 212, 223, 0.7)' }}>
                        <p>O projeto solicitado não foi encontrado.</p>
                        <button 
                            className="backButton"
                            onClick={() => window.history.back()}
                            style={{ marginTop: '20px' }}
                        >
                            ← Voltar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="profileCustomization">
            <div className="profileCustomizationHeader">
                <span>{project.title}</span>
            </div>
            
            <div className="profileCustomizationBlock">
                <div className="projectDetailContainer">
                    <div className="projectDetailHeader">
                        <div className="projectDetailImages">
                            <div className="projectDetailImageContainer">
                                {project.image.map((img, index) => (
                                    <img 
                                        key={index}
                                        className={`project-detail-image ${currentImage === index ? 'active' : ''}`}
                                        src={img} 
                                        alt={`${project.title} ${index + 1}`} 
                                    />
                                ))}
                            </div>
                            
                            <div className="projectDetailImageIndicators">
                                {project.image.map((_, index) => (
                                    <button 
                                        key={index}
                                        className={`image-indicator ${currentImage === index ? 'active' : ''}`}
                                        onClick={() => setCurrentImage(index)}
                                    />
                                ))}
                            </div>
                        </div>
                        
                        <div className="projectDetailInfo">
                            <h2 className="projectDetailTitle">{project.title}</h2>
                            <p className="projectDetailDescription">{project.description}</p>
                            
                            <div className="projectDetailTechnologies">
                                <h3>Tecnologias Utilizadas</h3>
                                <div className="techIconsGrid">
                                    {project.technologies.map((tech, index) => {
                                        const techIcon = technologyIcons.technologies[tech as keyof typeof technologyIcons.technologies];
                                        return techIcon ? (
                                            <div 
                                                key={index}
                                                className="tech-icon-detail"
                                                title={techIcon.name}
                                            >
                                                <div 
                                                    className="tech-icon-svg"
                                                    dangerouslySetInnerHTML={{ __html: techIcon.icon }}
                                                />
                                                {/* <span className="tech-name">{techIcon.name}</span> */}
                                            </div>
                                        ) : (
                                            <div key={index} className="tech-icon-detail">
                                                <div className="tech-icon-fallback">
                                                    {tech.charAt(0)}
                                                </div>
                                                <span className="tech-name">{tech}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            
                            <div className="projectDetailActions">
                                <button 
                                    className="project-detail-btn primary"
                                    onClick={handleViewProject}
                                >
                                    <span>Ver Projeto</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
                                    </svg>
                                </button>
                                <button 
                                    className={`project-detail-btn ${project.isPublic ? 'secondary' : 'private'}`}
                                    onClick={handleViewCode}
                                >
                                    <span>{project.isPublic ? 'Github' : 'Repositório Privado'}</span>
                                    {project.isPublic ? (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"/>
                                        </svg>
                                    ) : (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"/>
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="projectAboutSection">
                        <h3>Sobre o Projeto</h3>
                        <div className="projectAboutContent">
                            {project.aboutProject.split('\n').map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </div>

                    <div className="projectDetailFooter">
                        <button 
                            className="backButton"
                            onClick={() => window.history.back()}
                        >
                            ← Voltar aos Projetos
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}