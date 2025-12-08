import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LandingIntroProps {
    onComplete: () => void;
}

const LandingIntro = ({ onComplete }: LandingIntroProps) => {
    const [stage, setStage] = useState<'idle' | 'growing' | 'zooming'>('idle');

    const handleClick = () => {
        if (stage === 'idle') {
            // First click: logo grows larger
            setStage('growing');
        } else if (stage === 'growing') {
            // Second click: zoom through and transition
            setStage('zooming');
            setTimeout(() => {
                onComplete();
            }, 800);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black flex flex-col items-center justify-center cursor-pointer z-50 overflow-hidden"
                onClick={handleClick}
                initial={{ opacity: 0 }}
                animate={{ opacity: stage === 'zooming' ? 0 : 1 }}
                transition={{ duration: stage === 'zooming' ? 0.6 : 0.5 }}
            >
                {/* Logo with multi-stage animation */}
                <motion.div
                    className="relative flex flex-col items-center"
                    initial={{ scale: 1 }}
                    animate={{
                        scale: stage === 'idle' ? 1 : stage === 'growing' ? 1.3 : 15,
                    }}
                    transition={{
                        duration: stage === 'zooming' ? 0.8 : 0.5,
                        ease: stage === 'zooming' ? [0.87, 0, 0.13, 1] : 'easeOut',
                    }}
                >
                    <motion.img
                        src="/logo.png"
                        alt="HARSH GOUTAM"
                        className="w-48 md:w-64 lg:w-72"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: stage === 'zooming' ? 0 : 1,
                            scale: stage === 'idle' ? [1, 1.02, 1] : 1,
                        }}
                        transition={{
                            opacity: { duration: 0.3 },
                            scale: stage === 'idle'
                                ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                                : { duration: 0.3 }
                        }}
                        draggable={false}
                    />
                </motion.div>

                {/* Click hint - changes based on stage */}
                <motion.p
                    className="absolute bottom-16 text-gray-500 text-sm tracking-widest uppercase"
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: stage === 'zooming' ? 0 : [0.3, 0.7, 0.3],
                        y: stage === 'growing' ? -20 : 0
                    }}
                    transition={{
                        opacity: { duration: 2, repeat: stage === 'idle' ? Infinity : 0, ease: "easeInOut" },
                        y: { duration: 0.3 }
                    }}
                >
                    {stage === 'idle' ? 'Click to start' : stage === 'growing' ? 'Click to enter' : ''}
                </motion.p>

                {/* Ambient particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 rounded-full"
                            style={{
                                backgroundColor: 'rgba(229, 9, 20, 0.4)',
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -30 - Math.random() * 50],
                                opacity: [0, 0.8, 0],
                            }}
                            transition={{
                                duration: 2 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                                ease: "easeOut",
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default LandingIntro;
