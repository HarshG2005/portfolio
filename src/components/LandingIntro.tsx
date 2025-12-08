import { motion } from 'framer-motion';

interface LandingIntroProps {
    onComplete: () => void;
}

// Letter sizes to create depth effect - outer letters bigger, middle smaller
const name = "HARSH GOUTAM";
const letterSizes = [
    1.15,  // H
    1.08,  // A
    1.02,  // R
    0.96,  // S
    0.92,  // H
    0.88,  // (space)
    0.92,  // G
    0.96,  // O
    1.02,  // U
    1.08,  // T
    1.12,  // A
    1.18,  // M
];

const LandingIntro = ({ onComplete }: LandingIntroProps) => {
    return (
        <motion.div
            onClick={onComplete}
            className="h-screen w-full bg-[#141414] flex flex-col items-center justify-center overflow-hidden cursor-pointer"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Depth effect text - each letter with different size */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="flex items-baseline select-none"
                style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}
            >
                {name.split('').map((letter, index) => (
                    <span
                        key={index}
                        className="inline-block"
                        style={{
                            color: '#E50914',
                            fontSize: `clamp(2.5rem, ${letterSizes[index] * 6}vw, ${letterSizes[index] * 7}rem)`,
                            lineHeight: 1,
                            letterSpacing: letter === ' ' ? '0.3em' : '0.02em'
                        }}
                    >
                        {letter === ' ' ? '\u00A0' : letter}
                    </span>
                ))}
            </motion.div>

            {/* Click hint */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="mt-8 text-gray-600 text-xs tracking-widest uppercase"
            >
                Click to enter
            </motion.p>
        </motion.div>
    );
};

export default LandingIntro;
