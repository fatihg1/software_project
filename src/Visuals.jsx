import React, { useState, useEffect, useRef } from 'react';
import HomePage from './HomePage.jsx';

function Visuals() {
    const images = [
        '/train_slide1.png',
        '/train_slide2.png',
        '/train_slide3.png',
        '/train_slide4.png',
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const timeoutRef = useRef(null);
    const intervalRef = useRef(null);

    const resetInterval = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setIsTransitioning(true);
            setCurrentImageIndex((prevIndex) => {
                if (prevIndex === images.length - 1) {
                    timeoutRef.current = setTimeout(() => {
                        setIsTransitioning(false);
                        setCurrentImageIndex(0);
                    }, 1000); // Duration of the transition
                    return prevIndex + 1;
                }
                return (prevIndex + 1) % images.length;
            });
        }, 4000);
    };

    useEffect(() => {
        resetInterval();
        return () => {
            clearInterval(intervalRef.current);
            clearTimeout(timeoutRef.current);
        };
    }, [images.length]);

    const handlePrevClick = () => {
        setIsTransitioning(true);
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
        resetInterval();
    };

    const handleNextClick = () => {
        setIsTransitioning(true);
        setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        resetInterval();
    };

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div
                className={`relative w-full h-full flex transition-transform duration-1000 ease-in-out ${isTransitioning ? '' : 'transition-none'}`}
                style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`slide ${index}`}
                        className="w-full h-full object-cover flex-shrink-0"
                    />
                ))}
            </div>
            <div className="absolute top-0 left-0 w-1/2 h-full flex items-center justify-center">
                <HomePage />
            </div>
            <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 text-blue-600 text-4xl"
                onClick={handlePrevClick}
            >
                &#9664;
            </button>
            <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-blue-600 text-4xl"
                onClick={handleNextClick}
            >
                &#9654;
            </button>
        </div>
    );
}

export default Visuals;