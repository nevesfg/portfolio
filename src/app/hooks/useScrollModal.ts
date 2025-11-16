'use client';

import { useEffect, useState } from 'react';

export function useScrollModal() {
    const [activeModal, setActiveModal] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['sobre', 'habilidades', 'projetos'];
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const centerPosition = scrollPosition + windowHeight / 2;

            if (scrollPosition < 100) {
                setActiveModal(null);
                return;
            }

            let closestSection = null;
            let closestDistance = Infinity;
            const maxDistanceForModal = windowHeight * 0.15;

            sections.forEach(sectionId => {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const elementCenter = rect.top + scrollPosition + rect.height / 2;
                    const distance = Math.abs(centerPosition - elementCenter);

                    // Verifica se a seção está visível e próxima do centro
                    const isVisible = rect.top < windowHeight * 0.7 && rect.bottom > windowHeight * 0.3;
                    const isCentered = distance < maxDistanceForModal;

                    if (isVisible && isCentered && distance < closestDistance) {
                        closestDistance = distance;
                        closestSection = sectionId;
                    }
                }
            });

            setActiveModal(closestSection);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return activeModal;
}