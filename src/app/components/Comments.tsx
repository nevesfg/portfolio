'use client';

import { useState, useEffect } from 'react';
import commentsData from '../config/comments.json';
import CustomAlert from './CustomAlert';

interface Comment {
    id: number;
    author: string;
    authorImage: string;
    content: string;
    timestamp: string;
}

export default function Comments() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [newComment, setNewComment] = useState('');
    const [currentUserPokemon, setCurrentUserPokemon] = useState<{name: string, id: number} | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cooldownSeconds, setCooldownSeconds] = useState(0);
    const [alertConfig, setAlertConfig] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
    }>({
        isOpen: false,
        title: '',
        message: ''
    });
    
    const COMMENTS_PER_PAGE = 6;

    const getCurrentDate = () => {
        return new Date();
    };
    
    // Pokémons da primeira geração para usuários anônimos
    const firstGenPokemons = [
        { name: 'Bulbasaur', id: 1 }, { name: 'Ivysaur', id: 2 }, { name: 'Venusaur', id: 3 },
        { name: 'Charmander', id: 4 }, { name: 'Charmeleon', id: 5 }, { name: 'Charizard', id: 6 },
        { name: 'Squirtle', id: 7 }, { name: 'Wartortle', id: 8 }, { name: 'Blastoise', id: 9 },
        { name: 'Caterpie', id: 10 }, { name: 'Metapod', id: 11 }, { name: 'Butterfree', id: 12 },
        { name: 'Weedle', id: 13 }, { name: 'Kakuna', id: 14 }, { name: 'Beedrill', id: 15 },
        { name: 'Pidgey', id: 16 }, { name: 'Pidgeotto', id: 17 }, { name: 'Pidgeot', id: 18 },
        { name: 'Rattata', id: 19 }, { name: 'Raticate', id: 20 }, { name: 'Spearow', id: 21 },
        { name: 'Fearow', id: 22 }, { name: 'Ekans', id: 23 }, { name: 'Arbok', id: 24 },
        { name: 'Pikachu', id: 25 }, { name: 'Raichu', id: 26 }, { name: 'Sandshrew', id: 27 },
        { name: 'Sandslash', id: 28 }, { name: 'Nidoran♀', id: 29 }, { name: 'Nidorina', id: 30 },
        { name: 'Nidoqueen', id: 31 }, { name: 'Nidoran♂', id: 32 }, { name: 'Nidorino', id: 33 },
        { name: 'Nidoking', id: 34 }, { name: 'Clefairy', id: 35 }, { name: 'Clefable', id: 36 },
        { name: 'Vulpix', id: 37 }, { name: 'Ninetales', id: 38 }, { name: 'Jigglypuff', id: 39 },
        { name: 'Wigglytuff', id: 40 }, { name: 'Zubat', id: 41 }, { name: 'Golbat', id: 42 },
        { name: 'Oddish', id: 43 }, { name: 'Gloom', id: 44 }, { name: 'Vileplume', id: 45 },
        { name: 'Paras', id: 46 }, { name: 'Parasect', id: 47 }, { name: 'Venonat', id: 48 },
        { name: 'Venomoth', id: 49 }, { name: 'Diglett', id: 50 }, { name: 'Dugtrio', id: 51 },
        { name: 'Meowth', id: 52 }, { name: 'Persian', id: 53 }, { name: 'Psyduck', id: 54 },
        { name: 'Golduck', id: 55 }, { name: 'Mankey', id: 56 }, { name: 'Primeape', id: 57 },
        { name: 'Growlithe', id: 58 }, { name: 'Arcanine', id: 59 }, { name: 'Poliwag', id: 60 },
        { name: 'Poliwhirl', id: 61 }, { name: 'Poliwrath', id: 62 }, { name: 'Abra', id: 63 },
        { name: 'Kadabra', id: 64 }, { name: 'Alakazam', id: 65 }, { name: 'Machop', id: 66 },
        { name: 'Machoke', id: 67 }, { name: 'Machamp', id: 68 }, { name: 'Bellsprout', id: 69 },
        { name: 'Weepinbell', id: 70 }, { name: 'Victreebel', id: 71 }, { name: 'Tentacool', id: 72 },
        { name: 'Tentacruel', id: 73 }, { name: 'Geodude', id: 74 }, { name: 'Graveler', id: 75 },
        { name: 'Golem', id: 76 }, { name: 'Ponyta', id: 77 }, { name: 'Rapidash', id: 78 },
        { name: 'Slowpoke', id: 79 }, { name: 'Slowbro', id: 80 }, { name: 'Magnemite', id: 81 },
        { name: 'Magneton', id: 82 }, { name: 'Farfetchd', id: 83 }, { name: 'Doduo', id: 84 },
        { name: 'Dodrio', id: 85 }, { name: 'Seel', id: 86 }, { name: 'Dewgong', id: 87 },
        { name: 'Grimer', id: 88 }, { name: 'Muk', id: 89 }, { name: 'Shellder', id: 90 },
        { name: 'Cloyster', id: 91 }, { name: 'Gastly', id: 92 }, { name: 'Haunter', id: 93 },
        { name: 'Gengar', id: 94 }, { name: 'Onix', id: 95 }, { name: 'Drowzee', id: 96 },
        { name: 'Hypno', id: 97 }, { name: 'Krabby', id: 98 }, { name: 'Kingler', id: 99 },
        { name: 'Voltorb', id: 100 }, { name: 'Electrode', id: 101 }, { name: 'Exeggcute', id: 102 },
        { name: 'Exeggutor', id: 103 }, { name: 'Cubone', id: 104 }, { name: 'Marowak', id: 105 },
        { name: 'Hitmonlee', id: 106 }, { name: 'Hitmonchan', id: 107 }, { name: 'Lickitung', id: 108 },
        { name: 'Koffing', id: 109 }, { name: 'Weezing', id: 110 }, { name: 'Rhyhorn', id: 111 },
        { name: 'Rhydon', id: 112 }, { name: 'Chansey', id: 113 }, { name: 'Tangela', id: 114 },
        { name: 'Kangaskhan', id: 115 }, { name: 'Horsea', id: 116 }, { name: 'Seadra', id: 117 },
        { name: 'Goldeen', id: 118 }, { name: 'Seaking', id: 119 }, { name: 'Staryu', id: 120 },
        { name: 'Starmie', id: 121 }, { name: 'Mr. Mime', id: 122 }, { name: 'Scyther', id: 123 },
        { name: 'Jynx', id: 124 }, { name: 'Electabuzz', id: 125 }, { name: 'Magmar', id: 126 },
        { name: 'Pinsir', id: 127 }, { name: 'Tauros', id: 128 }, { name: 'Magikarp', id: 129 },
        { name: 'Gyarados', id: 130 }, { name: 'Lapras', id: 131 }, { name: 'Ditto', id: 132 },
        { name: 'Eevee', id: 133 }, { name: 'Vaporeon', id: 134 }, { name: 'Jolteon', id: 135 },
        { name: 'Flareon', id: 136 }, { name: 'Porygon', id: 137 }, { name: 'Omanyte', id: 138 },
        { name: 'Omastar', id: 139 }, { name: 'Kabuto', id: 140 }, { name: 'Kabutops', id: 141 },
        { name: 'Aerodactyl', id: 142 }, { name: 'Snorlax', id: 143 }, { name: 'Articuno', id: 144 },
        { name: 'Zapdos', id: 145 }, { name: 'Moltres', id: 146 }, { name: 'Dratini', id: 147 },
        { name: 'Dragonair', id: 148 }, { name: 'Dragonite', id: 149 }, { name: 'Mewtwo', id: 150 },
        { name: 'Mew', id: 151 }
    ];

    useEffect(() => {
        loadComments();
        generateNewPokemon();
    }, []);

    useEffect(() => {
        if (cooldownSeconds > 0) {
            const timer = setTimeout(() => {
                setCooldownSeconds(cooldownSeconds - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [cooldownSeconds]);

    const generateNewPokemon = () => {
        const randomPokemon = firstGenPokemons[Math.floor(Math.random() * firstGenPokemons.length)];
        setCurrentUserPokemon(randomPokemon);
    };

    const showAlert = (title: string, message: string) => {
        setAlertConfig({
            isOpen: true,
            title,
            message
        });
    };

    const closeAlert = () => {
        setAlertConfig({
            isOpen: false,
            title: '',
            message: ''
        });
    };

    const loadComments = async () => {
        try {
            const response = await fetch('/api/comments');
            const data = await response.json();
            setComments(data.comments);
        } catch (error) {
            console.error('Error loading comments:', error);
            setComments(commentsData.comments);
        }
    };

    const totalComments = comments.length;
    const totalPages = Math.ceil(totalComments / COMMENTS_PER_PAGE);
    
    const sortedComments = [...comments].sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    const startIndex = (currentPage - 1) * COMMENTS_PER_PAGE;
    const currentComments = sortedComments.slice(startIndex, startIndex + COMMENTS_PER_PAGE);

    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = getCurrentDate();
        const diffInMs = now.getTime() - date.getTime();
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        
        if (diffInMinutes < 1) {
            return 'agora';
        } else if (diffInMinutes < 60) {
            return `${diffInMinutes}min atrás`;
        } else if (diffInHours < 24) {
            return `${diffInHours}h atrás`;
        } else if (diffInDays < 7) {
            return `${diffInDays}d atrás`;
        } else if (diffInDays < 30) {
            const weeks = Math.floor(diffInDays / 7);
            return `${weeks}sem atrás`;
        } else {
            return date.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
        }
    };

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!newComment.trim() || isSubmitting || !currentUserPokemon) return;
        
        if (newComment.length > 1000) {
            showAlert(
                'Limite Excedido',
                'Seu comentário excede o limite de 1000 caracteres. Por favor, reduza o tamanho.'
            );
            return;
        }
        
        setIsSubmitting(true);
        
        const comment: Comment = {
            id: Date.now(),
            author: currentUserPokemon.name,
            authorImage: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentUserPokemon.id}.png`,
            content: newComment.trim(),
            timestamp: getCurrentDate().toISOString()
        };

        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(comment),
            });

            const responseData = await response.json();

            if (response.ok) {
                setComments(prev => [comment, ...prev]);
                setNewComment('');
                setCurrentPage(1);
                setCooldownSeconds(60);
                generateNewPokemon();
                
                if (responseData.moderation?.category === 'uncertain') {
                    showAlert(
                        'Comentário em Revisão',
                        'Seu comentário foi publicado, mas foi marcado para revisão manual devido ao conteúdo ambíguo.'
                    );
                }
            } else {
                console.error('Failed to save comment:', responseData);
                
                if (response.status === 429) {
                    const match = responseData.error.match(/(\d+) segundos/);
                    const seconds = match ? parseInt(match[1]) : 60;
                    setCooldownSeconds(seconds);
                    showAlert(
                        'Aguarde um Momento',
                        responseData.error
                    );
                } else if (response.status === 400 && responseData.reason) {
                    showAlert(
                        'Comentário Rejeitado',
                        responseData.reason || 'Seu comentário contém conteúdo inadequado e não pode ser publicado.'
                    );
                } else {
                    showAlert(
                        'Erro ao Salvar',
                        'Ocorreu um erro ao salvar seu comentário. Tente novamente.'
                    );
                }
            }
        } catch (error) {
            console.error('Error saving comment:', error);
            showAlert(
                'Erro de Conexão',
                'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = e.target;
        setNewComment(textarea.value);
        
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    };

    const generatePageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 6;
        
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }
        
        return pages;
    };

    return (
        <div className="profileCustomization">
            <div className="profileCustomizationHeader">
                <span>Comentários</span>
                <span className="anonymousModeIndicator">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                    </svg>
                    Modo Anônimo
                </span>
            </div>
            
            <div className="profileCustomizationBlock">
                <div className="commentthreadArea">
                    <div className="commentthreadHeader">
                        <div className="commentthreadHeaderAndCount">
                            <button 
                                className="commentthreadCountButton"
                                onClick={() => window.location.href = '/comments'}
                            >
                                Ver todos os {totalComments} comentários
                            </button>
                            
                            <div className="commentPaginationTop">
                                <button 
                                    className="paginationArrow"
                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                >
                                    ←
                                </button>
                                
                                <div className="paginationNumbers">
                                    {generatePageNumbers().map((page, index) => (
                                        <span key={index}>
                                            {page === '...' ? (
                                                <span className="paginationEllipsis">...</span>
                                            ) : (
                                                <button
                                                    className={`paginationNumber ${currentPage === page ? 'active' : ''}`}
                                                    onClick={() => setCurrentPage(page as number)}
                                                >
                                                    {page}
                                                </button>
                                            )}
                                        </span>
                                    ))}
                                </div>
                                
                                <button 
                                    className="paginationArrow"
                                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                >
                                    →
                                </button>
                            </div>
                        </div>
                    </div>

                    {currentUserPokemon && (
                        <form className="commentthreadForm" onSubmit={handleSubmitComment}>
                            <div className="commentthreadEntry">
                                <div className="commentthreadUserAvatar">
                                    <img 
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentUserPokemon.id}.png`} 
                                        alt={currentUserPokemon.name} 
                                        title={`${currentUserPokemon.name} - Clique para trocar`}
                                        onClick={generateNewPokemon}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                                <div className="commentInputContainer">
                                    <div className="commentthreadEntryQuotebox">
                                        <textarea 
                                            className="commentthreadTextarea" 
                                            placeholder="Deixe um comentário" 
                                            rows={1}
                                            value={newComment}
                                            maxLength={1000}
                                            onChange={handleTextareaChange}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleSubmitComment(e);
                                                }
                                            }}
                                        />
                                        {newComment && (
                                            <span className={`commentCharCounter ${newComment.length > 900 ? 'warning' : ''} ${newComment.length === 1000 ? 'limit' : ''}`}>
                                                {newComment.length}/1000
                                            </span>
                                        )}
                                    </div>
                                    {newComment.trim() && (
                                        <div className={`commentFormActions ${newComment.trim() ? 'visible' : ''}`}>
                                            <button 
                                                type="submit" 
                                                className="commentSubmitBtn"
                                                disabled={!newComment.trim() || isSubmitting || cooldownSeconds > 0}
                                            >
                                                {cooldownSeconds > 0 
                                                    ? `Aguarde ${cooldownSeconds}s` 
                                                    : isSubmitting 
                                                    ? 'Postando...' 
                                                    : 'Postar Comentário'}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </form>
                    )}

                    <div className="commentthreadCommentContainer">
                        <div className="commentthreadComments">
                            {currentComments.map((comment: Comment) => (
                                <div key={comment.id} className="commentthreadComment">
                                    <div className="commentthreadCommentAvatar">
                                        <a href="#">
                                            <img src={comment.authorImage} alt={`${comment.author} Avatar`} />
                                        </a>
                                    </div>
                                    <div className="commentthreadCommentContent">
                                        <div className="commentthreadCommentAuthor">
                                            <span className="commentthreadAuthorName">{comment.author}</span>
                                            <span className="commentthreadCommentDate">{formatDate(comment.timestamp)}</span>
                                        </div>
                                        <div className="commentthreadCommentText">
                                            {comment.content}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {totalPages > 1 && (
                        <div className="commentPagination">
                            <button 
                                className="paginationArrow"
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                            >
                                ← Anterior
                            </button>
                            
                            <div className="paginationNumbers">
                                {generatePageNumbers().map((page, index) => (
                                    <span key={index}>
                                        {page === '...' ? (
                                            <span className="paginationEllipsis">...</span>
                                        ) : (
                                            <button
                                                className={`paginationNumber ${currentPage === page ? 'active' : ''}`}
                                                onClick={() => setCurrentPage(page as number)}
                                            >
                                                {page}
                                            </button>
                                        )}
                                    </span>
                                ))}
                            </div>
                            
                            <button 
                                className="paginationArrow"
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                            >
                                Próxima →
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <CustomAlert
                isOpen={alertConfig.isOpen}
                onClose={closeAlert}
                title={alertConfig.title}
                message={alertConfig.message}
            />
        </div>
    );
}
