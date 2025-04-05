import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HomePage from './Home.jsx';
import LandingText from './LandingText.jsx';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
};

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 10,
      delay: 0.2
    }
  }
};

const slideFromRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 15,
      delay: 0.4
    }
  }
};

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
    const [isPageLoaded, setIsPageLoaded] = useState(false);
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
        // Set page as loaded after a short delay to trigger animations
        const loadTimer = setTimeout(() => {
            setIsPageLoaded(true);
        }, 100);
        
        resetInterval();
        return () => {
            clearInterval(intervalRef.current);
            clearTimeout(timeoutRef.current);
            clearTimeout(loadTimer);
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
        <motion.div 
            initial="hidden"
            animate={isPageLoaded ? "visible" : "hidden"}
            variants={fadeIn}
            className="relative w-full flex flex-col md:h-screen overflow-hidden"
        >
            {/* Image slider - full height on large screens, fixed height on small screens */}
            <div className="md:relative w-full h-64 md:h-full flex-shrink-0">
                <motion.div
                    className={`relative w-full h-full flex transition-transform duration-1000 ease-in-out ${
                        isTransitioning ? '' : '!transition-none'
                    }`}
                    style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    {sliderImages.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`slide ${index}`}
                            className="w-full h-full object-cover flex-shrink-0 brightness-75"
                            loading="eager"
                        />
                    ))}
                </motion.div>
            </div>
            
            {/* HomePage component - on large screens it overlays the slider, on small screens it's below */}
            <motion.div 
                className="md:absolute md:top-0 md:left-0 md:h-full w-full flex items-center justify-around"
                initial="hidden"
                animate={isPageLoaded ? "visible" : "hidden"}
                variants={fadeIn}
            >
                <motion.div variants={slideUp}>
                    <HomePage />
                </motion.div>
                <motion.div variants={slideFromRight}>
                    <LandingText />
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default Visuals;