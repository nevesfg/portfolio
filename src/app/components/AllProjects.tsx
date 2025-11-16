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
    date: string;
    aboutProject: string;
}

export default function AllProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [imageStates, setImageStates] = useState<{[key: number]: boolean}>({});

    useEffect(() => {
        setTimeout(() => {
            setProjects(projectsData.projects);
            setLoading(false);
            
            const initialImageStates: {[key: number]: boolean} = {};
            projectsData.projects.forEach(project => {
                initialImageStates[project.id] = false;
            });
            setImageStates(initialImageStates);
        }, 500);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setImageStates(prev => {
                const newStates = { ...prev };
                Object.keys(newStates).forEach(key => {
                    newStates[parseInt(key)] = !newStates[parseInt(key)];
                });
                return newStates;
            });
        }, 4000);

        return () => clearInterval(interval);
    }, [projects]);



    const handleProjectClick = (project: Project) => {
        window.location.href = `/projects/${project.id}`;
    };

    const handleLiveDemo = (project: Project) => {
        window.open(project.viewLink, '_blank', 'noopener,noreferrer');
    };

    if (loading) {
        return (
            <div className="profileCustomization">
                <div className="profileCustomizationHeader">Todos os Projetos</div>
                <div className="profileCustomizationBlock">
                    <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(198, 212, 223, 0.7)' }}>
                        Carregando projetos...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="profileCustomization">
            <div className="profileCustomizationHeader">
                <span>Todos os Projetos</span>
            </div>
            
            <div className="profileCustomizationBlock">
                <div className="allProjectsContainer">
                    <div className="projectsHeader">
                        <div className="projectsCount">
                            <span className="projectsCountLabel">
                                {projects.length} projetos encontrados
                            </span>
                        </div>
                    </div>

                    <div className="projectsGrid">
                        {projects.map((project) => (
                            <div key={project.id} className="project-card">
                                <div 
                                    className="project-card-image"
                                    onClick={() => handleProjectClick(project)}
                                >
                                    <img 
                                        className={`project-image project-image--primary ${imageStates[project.id] ? 'project-image--hidden' : ''}`}
                                        src={project.image[0]} 
                                        alt={`${project.title} Primary`} 
                                    />
                                    <img 
                                        className={`project-image project-image--secondary ${imageStates[project.id] ? 'project-image--visible' : ''}`}
                                        src={project.image[1]} 
                                        alt={`${project.title} Secondary`} 
                                    />
                                </div>
                                
                                <p className="project-card-title">{project.title}</p>
                                
                                <p className="project-card-body">
                                    {project.description}
                                </p>
                                
                                <div className="project-card-technologies">
                                    {project.technologies.slice(0, 4).map((tech, index) => {
                                        const techIcon = technologyIcons.technologies[tech as keyof typeof technologyIcons.technologies];
                                        return techIcon ? (
                                            <div 
                                                key={index}
                                                className="tech-icon-project"
                                                title={techIcon.name}
                                                dangerouslySetInnerHTML={{ __html: techIcon.icon }}
                                            />
                                        ) : (
                                            <span key={index} className="tech-tag">
                                                {tech}
                                            </span>
                                        );
                                    })}
                                    {project.technologies.length > 9 && (
                                        <span className="tech-tag more">
                                            +{project.technologies.length - 9}
                                        </span>
                                    )}
                                </div>
                                
                                <div className="project-card-actions">
                                    <button 
                                        className="project-action-btn primary"
                                        onClick={() => handleProjectClick(project)}
                                    >
                                        Detalhes
                                    </button>
                                    {/* <button 
                                        className={`project-detail-btn ${project.isPublic ? 'secondary' : 'private'}`}
                                        onClick={() => handleDetailsClick(project)}
                                    ><span>{project.isPublic ? 'Github' : 'Privado'}</span>
                                    </button> */}

                                    <button 
                                        className="card__button secondary" 
                                        onClick={() => handleLiveDemo(project)}
                                    >
                                        Visualizar
                                    </button>
                                </div>
                                
                                <p className="project-footer">
                                    Desenvolvido por <span className="by-name">Victor Neves</span> em <span className="date">{project.date}</span>
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="allProjectsFooter">
                        <button 
                            className="backButton"
                            onClick={() => window.history.back()}
                        >
                            ← Voltar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}