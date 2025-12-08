import { useState } from 'react';
import { motion } from 'framer-motion';

interface LandingIntroProps {
    onComplete: () => void;
}

const LandingIntro = ({ onComplete }: LandingIntroProps) => {
    const [isExiting, setIsExiting] = useState(false);

    const handleClick = () => {
        if (isExiting) return;
        setIsExiting(true);

        // Smooth transition delay before showing next page
        setTimeout(() => {
            onComplete();
        }, 800);
    };

    return (
        <motion.div
            onClick={handleClick}
            className="h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: isExiting ? 0 : 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            {/* Logo with smooth scale transition */}
            <motion.img
                src="/logo.png"
                alt="HARSH GOUTAM"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                    opacity: isExiting ? 0 : 1,
                    scale: isExiting ? 1.05 : 1
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="max-w-[90vw] md:max-w-2xl h-auto select-none"
                draggable={false}
            />

            {/* Click hint */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: isExiting ? 0 : 0.5 }}
                transition={{
                    delay: isExiting ? 0 : 1.5,
                    duration: isExiting ? 0.3 : 1
                }}
                className="mt-8 text-gray-600 text-xs tracking-widest uppercase"
            >
                Click to enter
            </motion.p>
        </motion.div>
    );
};

export default LandingIntro;
