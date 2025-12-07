import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface LandingIntroProps {
    onComplete: () => void;
}

const LandingIntro = ({ onComplete }: LandingIntroProps) => {
    useEffect(() => {
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
            {/* Netflix-style curved SVG text */}
            <motion.svg
                viewBox="0 0 600 150"
                className="w-[90vw] max-w-4xl h-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: [0, 1, 1, 0],
                    scale: [0.8, 1, 1, 1.05]
                }}
                transition={{
                    duration: 3.5,
                    times: [0, 0.25, 0.85, 1],
                    ease: "easeInOut"
                }}
            >
                {/* Define the curved path for text to follow */}
                <defs>
                    <path
                        id="textCurve"
                        d="M 30,120 Q 300,40 570,120"
                        fill="transparent"
                    />
                </defs>

                {/* Curved text following the path */}
                <text
                    fill="#E50914"
                    style={{
                        fontFamily: "'Bebas Neue', 'Impact', sans-serif",
                        fontSize: '72px',
                        fontWeight: 'bold',
                        letterSpacing: '0.05em'
                    }}
                >
                    <textPath
                        href="#textCurve"
                        startOffset="50%"
                        textAnchor="middle"
                    >
                        HARSH GOUTAM
                    </textPath>
                </text>

                {/* Subtle shadow for depth */}
                <text
                    fill="rgba(229, 9, 20, 0.3)"
                    style={{
                        fontFamily: "'Bebas Neue', 'Impact', sans-serif",
                        fontSize: '72px',
                        fontWeight: 'bold',
                        letterSpacing: '0.05em',
                        filter: 'blur(4px)'
                    }}
                >
                    <textPath
                        href="#textCurve"
                        startOffset="50%"
                        textAnchor="middle"
                    >
                        HARSH GOUTAM
                    </textPath>
                </text>
            </motion.svg>
        </motion.div>
    );
};

export default LandingIntro;
