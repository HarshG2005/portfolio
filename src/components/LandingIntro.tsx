import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface LandingIntroProps {
    onComplete: () => void;
}

const LandingIntro = ({ onComplete }: LandingIntroProps) => {
    const [isZooming, setIsZooming] = useState(false);
    const controls = useAnimation();

    const handleClick = async () => {
        if (isZooming) return;
        setIsZooming(true);

        // Trigger the massive zoom effect
        await controls.start({
            scale: 50,
            opacity: [1, 1, 0],
            transition: {
                duration: 0.9,
                ease: [0.87, 0, 0.13, 1], // easeInOutExpo-like
                opacity: {
                    times: [0, 0.7, 1],
                    duration: 0.9
                }
            }
        });

        onComplete();
    };

    return (
        <motion.div
            onClick={handleClick}
            className="h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Logo with pulse animation in idle, zoom on click */}
            <motion.img
                src="/logo.png"
                alt="HARSH GOUTAM"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isZooming ? controls : {
                    opacity: 1,
                    scale: [1, 1.03, 1],
                    transition: {
                        opacity: { duration: 1 },
                        scale: {
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }
                }}
                className="max-w-[90vw] md:max-w-2xl h-auto select-none"
                draggable={false}
            />

            {/* Click hint - fades out when clicked */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: isZooming ? 0 : 0.5 }}
                transition={{ delay: isZooming ? 0 : 1.5, duration: isZooming ? 0.2 : 1 }}
                className="mt-8 text-gray-600 text-xs tracking-widest uppercase"
            >
                Click to enter
            </motion.p>
        </motion.div>
    );
};

export default LandingIntro;
