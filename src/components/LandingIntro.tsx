import { motion } from 'framer-motion';

interface LandingIntroProps {
    onComplete: () => void;
}

const LandingIntro = ({ onComplete }: LandingIntroProps) => {
    return (
        <motion.div
            onClick={onComplete}
            className="h-screen w-full bg-[#141414] flex flex-col items-center justify-center overflow-hidden cursor-pointer"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Simple flat Netflix-style text */}
            <motion.h1
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-5xl md:text-7xl lg:text-8xl uppercase select-none tracking-tight"
                style={{
                    fontFamily: "'Bebas Neue', 'Impact', sans-serif",
                    color: '#E50914',
                    letterSpacing: '0.02em'
                }}
            >
                HARSH GOUTAM
            </motion.h1>

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
