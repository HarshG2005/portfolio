import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser, type ProfileType } from '../context/UserContext';
import { Briefcase, Code2, Eye } from 'lucide-react';

const profiles = [
    {
        id: 'RECRUITER' as ProfileType,
        label: 'Recruiter',
        icon: Briefcase,
        glowClass: 'group-hover:glow-white',
        borderColor: 'group-hover:border-white',
    },
    {
        id: 'DEVELOPER' as ProfileType,
        label: 'Developer',
        icon: Code2,
        glowClass: 'group-hover:glow-green',
        borderColor: 'group-hover:border-green-500',
    },
    {
        id: 'STALKER' as ProfileType,
        label: 'Stalker',
        icon: Eye,
        glowClass: 'group-hover:glow-red',
        borderColor: 'group-hover:border-red-500',
    },
];

const ProfileGate = () => {
    const { setSelectedProfile } = useUser();
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState<ProfileType>(null);

    const handleSelect = (persona: ProfileType) => {
        setSelectedProfile(persona);
        setSelectedId(persona);
        setTimeout(() => {
            navigate('/browse');
        }, 800);
    };

    return (
        <motion.div
            className="fixed inset-0 bg-black flex flex-col items-center justify-center z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: selectedId ? 0 : 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.h1
                className="text-4xl md:text-6xl text-white mb-16 tracking-wider"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                Who's Watching?
            </motion.h1>

            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                {profiles.map((profile, index) => {
                    const Icon = profile.icon;
                    return (
                        <motion.button
                            key={profile.id}
                            className="group flex flex-col items-center gap-4"
                            onClick={() => handleSelect(profile.id)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + index * 0.15 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div
                                className={`
                  w-24 h-24 md:w-32 md:h-32 rounded-lg bg-[#1a1a1a]
                  flex items-center justify-center border-2 border-transparent
                  transition-all duration-300 ${profile.glowClass} ${profile.borderColor}
                `}
                            >
                                <Icon className="w-12 h-12 md:w-16 md:h-16 text-gray-500 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <span className="text-gray-500 group-hover:text-white text-lg transition-colors duration-300">
                                {profile.label}
                            </span>
                        </motion.button>
                    );
                })}
            </div>

            <motion.p
                className="mt-16 text-gray-600 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                Select a profile to customize your experience
            </motion.p>
        </motion.div>
    );
};

export default ProfileGate;
