import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface LandingIntroProps {
    onComplete: () => void;
}

const LandingIntro = ({ onComplete }: LandingIntroProps) => {
    useEffect(() => {
        // Auto-transition after animation completes (3.5 seconds)
        const timer = setTimeout(() => {
            onComplete();
        }, 3500);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            className="h-screen w-full bg-black flex items-center justify-center overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Netflix-style name animation */}
            <motion.h1
                initial={{
                    opacity: 0,
                    scale: 0.9
                }}
                animate={{
                    opacity: [0, 1, 1, 0],
                    scale: [0.9, 1, 1, 1.1]
                }}
                transition={{
                    duration: 3.5,
                    times: [0, 0.3, 0.8, 1],
                    ease: "easeInOut"
                }}
                className="text-6xl md:text-8xl lg:text-9xl uppercase select-none"
                style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    color: '#E50914',
                    letterSpacing: '0.02em'
                }}
            >
                HARSH GOUTAM
            </motion.h1>
        </motion.div>
    );
};

export default LandingIntro;
