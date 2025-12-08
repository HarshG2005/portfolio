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
        setTimeout(() => {
            onComplete();
        }, 600);
    };

    return (
        <motion.div
            className="fixed inset-0 bg-black flex flex-col items-center justify-center cursor-pointer z-50 overflow-hidden"
            onClick={handleClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: isExiting ? 0 : 1 }}
            transition={{ duration: 0.6 }}
        >
            {/* Logo with pulse effect */}
            <motion.div
                className="relative flex flex-col items-center"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
            >
                <motion.img
                    src="/logo.png"
                    alt="HARSH GOUTAM"
                    className="w-64 md:w-80 lg:w-96"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                        opacity: isExiting ? 0 : 1,
                        scale: isExiting ? 1.1 : [1, 1.03, 1],
                    }}
                    transition={{
                        opacity: { duration: 0.5 },
                        scale: isExiting
                            ? { duration: 0.6 }
                            : { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                    draggable={false}
                />

                <motion.p
                    className="mt-8 text-gray-500 text-sm tracking-widest uppercase"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isExiting ? 0 : [0.3, 0.7, 0.3] }}
                    transition={{
                        duration: 2,
                        repeat: isExiting ? 0 : Infinity,
                        ease: "easeInOut",
                    }}
                >
                    Click anywhere to enter
                </motion.p>
            </motion.div>

            {/* Ambient particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full"
                        style={{
                            backgroundColor: 'rgba(229, 9, 20, 0.3)',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -50 - Math.random() * 100],
                            opacity: [0, 0.6, 0],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "easeOut",
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default LandingIntro;
