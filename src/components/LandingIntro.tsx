import { motion } from 'framer-motion';

interface LandingIntroProps {
    onComplete: () => void;
}

const LandingIntro = ({ onComplete }: LandingIntroProps) => {
    return (
        <motion.div
            onClick={onComplete}
            className="h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden cursor-pointer"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Netflix-style curved SVG text */}
            <motion.svg
                viewBox="0 0 600 150"
                className="w-[90vw] max-w-4xl h-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
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

            {/* Click hint */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="mt-12 text-gray-500 text-sm tracking-widest uppercase"
            >
                Click anywhere to continue
            </motion.p>
        </motion.div>
    );
};

export default LandingIntro;
