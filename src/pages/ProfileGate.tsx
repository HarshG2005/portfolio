import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, type ProfileType } from '../context/UserContext';

// Avatar images - replace these URLs with your own images in public folder
const profiles = [
    {
        id: 'RECRUITER' as ProfileType,
        name: 'Recruiter',
        // Blue fuzzy avatar
        image: 'https://api.dicebear.com/7.x/bottts-neutral/svg?seed=recruiter&backgroundColor=3b82f6',
        hoverClass: 'hover:ring-4 hover:ring-white/80 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]'
    },
    {
        id: 'DEVELOPER' as ProfileType,
        name: 'Developer',
        // Gray/tech avatar
        image: 'https://api.dicebear.com/7.x/bottts-neutral/svg?seed=developer&backgroundColor=374151',
        hoverClass: 'hover:ring-4 hover:ring-green-500/80 hover:shadow-[0_0_40px_rgba(34,197,94,0.4)]'
    },
    {
        id: 'STALKER' as ProfileType,
        name: 'Stalker',
        // Red avatar
        image: 'https://api.dicebear.com/7.x/bottts-neutral/svg?seed=stalker&backgroundColor=dc2626',
        hoverClass: 'hover:ring-4 hover:ring-red-500/80 hover:shadow-[0_0_40px_rgba(239,68,68,0.4)]'
    }
];

const ProfileGate = () => {
    const { setSelectedProfile } = useUser();
    const navigate = useNavigate();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [selectedId, setSelectedId] = useState<ProfileType>(null);

    const handleProfileSelect = (profile: ProfileType) => {
        setSelectedProfile(profile);
        setSelectedId(profile);
        setIsTransitioning(true);

        setTimeout(() => {
            navigate('/browse');
        }, 600);
    };

    return (
        <div
            className={`min-h-screen bg-[#141414] flex flex-col items-center justify-center px-4 transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
        >
            <h1 className="text-4xl md:text-5xl font-medium text-white mb-12 tracking-wide">
                Who's Watching?
            </h1>

            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                {profiles.map((profile) => {
                    const isSelected = selectedId === profile.id;
                    return (
                        <button
                            key={profile.id}
                            onClick={() => handleProfileSelect(profile.id)}
                            className={`group flex flex-col items-center gap-3 transition-all duration-300 ${profile.hoverClass} rounded-lg ${isSelected ? 'scale-125 opacity-0' : ''}`}
                        >
                            <div className="w-28 h-28 md:w-36 md:h-36 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105">
                                <img
                                    src={profile.image}
                                    alt={profile.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="text-gray-400 text-lg group-hover:text-white transition-colors">
                                {profile.name}
                            </span>
                        </button>
                    );
                })}
            </div>

            <p className="mt-16 text-gray-600 text-sm">
                Choose your perspective
            </p>
        </div>
    );
};

export default ProfileGate;
