import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser, type ProfileType } from '../context/UserContext';

// Profile avatars - fuzzy monster style matching reference
const profiles = [
    {
        id: 'RECRUITER' as ProfileType,
        label: 'Recruiter',
        // Blue fuzzy monster
        image: 'https://api.dicebear.com/7.x/thumbs/svg?seed=recruiter&backgroundColor=3b82f6&shapeColor=1e3a5f',
        glowClass: 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]',
        borderColor: 'group-hover:border-blue-500',
    },
    {
        id: 'DEVELOPER' as ProfileType,
        label: 'Developer',
        // Gray fuzzy monster
        image: 'https://api.dicebear.com/7.x/thumbs/svg?seed=developer&backgroundColor=6b7280&shapeColor=374151',
        glowClass: 'group-hover:shadow-[0_0_30px_rgba(107,114,128,0.6)]',
        borderColor: 'group-hover:border-gray-400',
    },
    {
        id: 'STALKER' as ProfileType,
        label: 'Stalker',
        // Red fuzzy monster - using the uploaded image
        image: '/avatar-stalker.png',
        glowClass: 'group-hover:shadow-[0_0_30px_rgba(229,9,20,0.6)]',
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
        }, 600);
    };

    return (
        <motion.div
            className="fixed inset-0 bg-[#141414] flex flex-col items-center justify-center z-40"
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

            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                {profiles.map((profile, index) => (
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
                w-28 h-28 md:w-36 md:h-36 rounded-lg overflow-hidden
                border-2 border-transparent transition-all duration-300 
                ${profile.glowClass} ${profile.borderColor}
              `}
                        >
                            <img
                                src={profile.image}
                                alt={profile.label}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="text-gray-400 group-hover:text-white text-lg transition-colors duration-300">
                            {profile.label}
                        </span>
                    </motion.button>
                ))}
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
