import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, type ProfileType } from '../context/UserContext';
import { Briefcase, Code2, Eye } from 'lucide-react';

const profiles = [
    {
        id: 'RECRUITER' as ProfileType,
        name: 'Recruiter',
        icon: Briefcase,
        hoverClass: 'hover:ring-4 hover:ring-white/80 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]',
        bgGradient: 'from-blue-600 to-blue-800'
    },
    {
        id: 'DEVELOPER' as ProfileType,
        name: 'Developer',
        icon: Code2,
        hoverClass: 'hover:ring-4 hover:ring-green-500/80 hover:shadow-[0_0_30px_rgba(0,255,0,0.3)]',
        bgGradient: 'from-green-600 to-green-800'
    },
    {
        id: 'STALKER' as ProfileType,
        name: 'Stalker',
        icon: Eye,
        hoverClass: 'hover:ring-4 hover:ring-red-500/80 hover:shadow-[0_0_30px_rgba(229,9,20,0.3)]',
        bgGradient: 'from-red-600 to-red-800'
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

        // CSS transition, then navigate
        setTimeout(() => {
            navigate('/browse');
        }, 600);
    };

    return (
        <div
            className={`min-h-screen bg-[#141414] flex flex-col items-center justify-center px-4 transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
        >
            <h1 className="text-4xl md:text-5xl font-medium text-white mb-12 tracking-wide">
                Who's watching?
            </h1>

            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                {profiles.map((profile) => {
                    const Icon = profile.icon;
                    const isSelected = selectedId === profile.id;
                    return (
                        <button
                            key={profile.id}
                            onClick={() => handleProfileSelect(profile.id)}
                            className={`group flex flex-col items-center gap-3 transition-all duration-300 ${profile.hoverClass} ${isSelected ? 'scale-150 opacity-0' : ''}`}
                        >
                            <div className={`w-28 h-28 md:w-36 md:h-36 rounded-md bg-gradient-to-br ${profile.bgGradient} flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
                                <Icon size={48} className="text-white" />
                            </div>
                            <span className="text-gray-400 text-lg group-hover:text-white transition-colors">
                                {profile.name}
                            </span>
                        </button>
                    );
                })}
            </div>

            <p className="mt-16 text-gray-500 text-sm">
                Click to explore my portfolio from your perspective
            </p>
        </div>
    );
};

export default ProfileGate;
