import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const IntroSplash = () => {
    const navigate = useNavigate();
    const [isExiting, setIsExiting] = useState(false);

    const handleClick = () => {
        setIsExiting(true);
        setTimeout(() => {
            navigate('/profiles');
        }, 800);
    };

    return (
        <motion.div
            onClick={handleClick}
            className="min-h-screen w-full bg-black flex items-center justify-center cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: isExiting ? 0 : 1 }}
            transition={{ duration: 0.8 }}
        >
            {/* Netflix-style name - Bebas Neue font, exact Netflix red */}
            <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                    opacity: isExiting ? 0 : 1,
                    scale: isExiting ? 1.1 : 1
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold uppercase tracking-wider select-none"
                style={{
                    fontFamily: "'Bebas Neue', 'Roboto Condensed', sans-serif",
                    color: '#E50914',
                    letterSpacing: '0.05em'
                }}
            >
                HARSH GOUTAM
            </motion.h1>
        </motion.div>
    );
};

export default IntroSplash;
