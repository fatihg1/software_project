import React, { useState, useEffect, useRef } from 'react';
import HomePage from './Home.jsx';
import { Link } from 'react-router-dom';
function Visuals() {
    const images = [
        '/train_slide1.png',
        '/train_slide2.png',
        '/train_slide3.png',
        '/train_slide4.png',
    ];

    // Create duplicated images array with first image added to the end
    const sliderImages = [images[images.length - 1], ...images, images[0]];

    const [currentImageIndex, setCurrentImageIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const timeoutRef = useRef(null);
    const intervalRef = useRef(null);

    const resetInterval = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setIsTransitioning(true);
            setCurrentImageIndex(prev => prev + 1);
        }, 4000);
    };

    useEffect(() => {
        resetInterval();
        return () => {
            clearInterval(intervalRef.current);
            clearTimeout(timeoutRef.current);
        };
    }, []);

    useEffect(() => {
        if (currentImageIndex === 0) {
            timeoutRef.current = setTimeout(() => {
                setIsTransitioning(false);
                setCurrentImageIndex(sliderImages.length - 2);
            }, 1000);
        }
        if (currentImageIndex === sliderImages.length - 1) {
            timeoutRef.current = setTimeout(() => {
                setIsTransitioning(false);
                setCurrentImageIndex(1);
            }, 1000);
        }
    }, [currentImageIndex]);

    const handlePrevClick = () => {
        if (currentImageIndex <= 1) return;
        setIsTransitioning(true);
        setCurrentImageIndex(prev => prev - 1);
        resetInterval();
    };

    const handleNextClick = () => {
        if (currentImageIndex >= sliderImages.length - 2) return;
        setIsTransitioning(true);
        setCurrentImageIndex(prev => prev + 1);
        resetInterval();
    };

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div
                className={`relative w-full h-full flex transition-transform duration-1000 ease-in-out ${
                    isTransitioning ? '' : '!transition-none'
                }`}
                style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            >
                {sliderImages.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`slide ${index}`}
                            className="w-full h-full object-cover flex-shrink-0"
                            loading="eager"
                        />
                ))}
            </div>
            <div className="absolute top-0 left-0 w-1/2 h-full flex items-center justify-center">
                <HomePage />
            </div>
        </div>
    );
}

export default Visuals;