import React, { useState, useEffect, useRef } from 'react';
import HomePage from './Home.jsx';

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

    return (
        <div className="relative w-full flex flex-col md:h-screen overflow-hidden">
            {/* Image slider - full height on large screens, fixed height on small screens */}
            <div className="md:relative w-full h-64 md:h-full flex-shrink-0">
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
                
                
            </div>
            
            {/* HomePage component - on large screens it overlays the slider, on small screens it's below */}
            <div className="md:absolute md:top-0 md:left-0 md:h-full w-full flex items-center justify-center">
                <HomePage />
            </div>
        </div>
    );
}

export default Visuals;