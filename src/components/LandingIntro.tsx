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
            {/* Logo image */}
            <motion.img
                src="/logo.png"
                alt="HARSH GOUTAM"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="max-w-[90vw] md:max-w-2xl h-auto select-none"
                draggable={false}
            />

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
