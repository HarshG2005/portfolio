import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, type ProfileType } from '../context/UserContext';
import {
    Github,
    Linkedin,
    FileText,
    Instagram,
    Twitter,
    Play,
    Info,
    Award,
    Code2,
    Heart,
    ChevronLeft,
    ChevronRight,
    GraduationCap
} from 'lucide-react';

// --- DYNAMIC CONTENT BASED ON PROFILE (PRD Section 5) ---
const heroContent: Record<NonNullable<ProfileType>, {
    title: string;
    subtitle: string;
    description: string;
    primaryBtn: { text: string; icon: typeof FileText; link: string };
    secondaryBtn: { text: string; icon: typeof Linkedin; link: string };
}> = {
    RECRUITER: {
        title: "Harsh Goutam",
        subtitle: "#1 Ranked for Hire",
        description: "B.E. CSE Student (2027) with a focus on scalable AI solutions. National Hackathon Finalist. Ready to drive business impact.",
        primaryBtn: { text: "Download Resume", icon: FileText, link: "/resume.pdf" },
        secondaryBtn: { text: "LinkedIn", icon: Linkedin, link: "https://linkedin.com/in/harshgoutam" }
    },
    DEVELOPER: {
        title: "Full Stack Architect",
        subtitle: "Built with React & Gemini",
        description: "Check out the clean architecture behind this site. Powered by Anime.js, Tailwind CSS, and React Router. Open source everything.",
        primaryBtn: { text: "View Source Code", icon: Github, link: "https://github.com/HarshG2005/portfolio" },
        secondaryBtn: { text: "Tech Stack", icon: Code2, link: "#skills" }
    },
    STALKER: {
        title: "Welcome, Fan 👀",
        subtitle: "I see you looking...",
        description: "Since you dug this deep, you might as well follow me on socials. No screenshots allowed. I know you're here at 3 AM. 😏",
        primaryBtn: { text: "Instagram", icon: Instagram, link: "https://instagram.com" },
        secondaryBtn: { text: "Twitter / X", icon: Twitter, link: "https://twitter.com" }
    }
};

const projects = [
    {
        title: "Edu-Saarathi",
        category: "AI-EdTech",
        description: "AI-assisted learning with mind maps, MCQs, and summaries.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop",
        link: "https://github.com/HarshG2005/Edu-Saarathi",
        match: 98,
        tags: ["React", "Gemini API", "Node.js"]
    },
    {
        title: "DATAVIS",
        category: "Data Analytics",
        description: "Transform raw datasets into interactive visualizations.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop",
        link: "https://github.com/HarshG2005/NL2VIS",
        match: 95,
        tags: ["Python", "Recharts", "NLP"]
    },
    {
        title: "NEURONAV",
        category: "RL Dashboard",
        description: "Real-time monitoring for PPO agents in 3D environments.",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=225&fit=crop",
        link: "https://github.com/HarshG2005/NeuroNav",
        match: 92,
        tags: ["Python", "WebSockets", "RL"]
    }
];

const dynamicRows: Record<NonNullable<ProfileType>, {
    title: string;
    icon: typeof Award;
    items: { title: string; image: string; match?: number }[];
}> = {
    RECRUITER: {
        title: "Certifications & Honors",
        icon: Award,
        items: [
            { title: "Code Red 2025 - National Finalist", image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=300&h=170&fit=crop", match: 99 },
            { title: "LeetCode - 150+ Problems", image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=300&h=170&fit=crop", match: 95 },
            { title: "CGPA: 8.85 - BMS Institute", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=170&fit=crop", match: 97 }
        ]
    },
    DEVELOPER: {
        title: "Tech Stack & Tools",
        icon: Code2,
        items: [
            { title: "React & TypeScript", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=170&fit=crop", match: 98 },
            { title: "Python & AI/ML", image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=300&h=170&fit=crop", match: 96 },
            { title: "Node.js & Express", image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=170&fit=crop", match: 94 },
            { title: "Docker & DevOps", image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=300&h=170&fit=crop", match: 90 }
        ]
    },
    STALKER: {
        title: "Personal Interests",
        icon: Heart,
        items: [
            { title: "Chess ♟️", image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=300&h=170&fit=crop", match: 100 },
            { title: "Cricket 🏏", image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=300&h=170&fit=crop", match: 97 },
            { title: "Photography 📷", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=170&fit=crop", match: 94 },
            { title: "Gaming 🎮", image: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=300&h=170&fit=crop", match: 91 }
        ]
    }
};

// --- COMPONENTS ---

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-12 py-4 bg-gradient-to-b from-black to-transparent">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <button onClick={() => navigate('/')} className="text-[#E50914] text-3xl font-bold tracking-tighter">
                        HG
                    </button>
                    <div className="hidden md:flex items-center gap-6 text-sm text-gray-300">
                        <a href="#" className="text-white font-medium">Home</a>
                        <a href="#skills" className="hover:text-white transition">Tech Stack</a>
                        <a href="#projects" className="hover:text-white transition">Projects</a>
                    </div>
                </div>
                <button
                    onClick={() => navigate('/')}
                    className="text-sm text-gray-300 hover:text-white transition"
                >
                    Switch Profile
                </button>
            </div>
        </nav>
    );
};

const HeroSection = ({ profile }: { profile: NonNullable<ProfileType> }) => {
    const content = heroContent[profile];

    return (
        <section className="relative min-h-screen flex items-end pb-32 px-4 md:px-12">
            {/* Background with Ken Burns effect */}
            <div
                className="absolute inset-0 bg-cover bg-center animate-ken-burns"
                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?w=1920&h=1080&fit=crop)' }}
            />

            {/* Gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />

            <div className="relative z-20 max-w-2xl">
                <span className="text-[#E50914] font-bold text-sm tracking-wider mb-2 block">{content.subtitle}</span>
                <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
                    {content.title}
                </h1>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-xl">
                    {content.description}
                </p>
                <div className="flex gap-3">
                    <a
                        href={content.primaryBtn.link}
                        target={content.primaryBtn.link.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer"
                        className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded font-bold hover:bg-gray-200 transition text-lg"
                    >
                        <Play size={20} fill="black" /> {content.primaryBtn.text}
                    </a>
                    <a
                        href={content.secondaryBtn.link}
                        target={content.secondaryBtn.link.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer"
                        className="flex items-center gap-2 bg-gray-500/60 text-white px-6 py-3 rounded font-bold hover:bg-gray-500/80 transition text-lg"
                    >
                        <Info size={20} /> {content.secondaryBtn.text}
                    </a>
                </div>
            </div>
        </section>
    );
};

// Movie Card with 400ms hover delay (PRD Section 4.3)
const MovieCard = ({ item, link }: { item: { title: string; image: string; match?: number; tags?: string[] }; link?: string }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showExpanded, setShowExpanded] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleMouseEnter = () => {
        setIsHovered(true);
        timeoutRef.current = setTimeout(() => {
            setShowExpanded(true);
        }, 400); // 400ms delay per PRD
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setShowExpanded(false);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    return (
        <a
            href={link || '#'}
            target={link?.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            className={`flex-shrink-0 relative rounded-md overflow-hidden transition-all duration-300 ${showExpanded ? 'scale-150 z-50 shadow-2xl' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img
                src={item.image}
                alt={item.title}
                className="w-64 h-36 object-cover"
            />

            {/* Expanded overlay with info */}
            {showExpanded && (
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/80 to-transparent flex flex-col justify-end p-3">
                    {item.match && (
                        <span className="text-green-400 font-bold text-xs mb-1">{item.match}% Match</span>
                    )}
                    <p className="text-white text-sm font-medium">{item.title}</p>
                    {item.tags && (
                        <div className="flex gap-1 mt-1">
                            {item.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="text-[10px] text-gray-400 bg-gray-800 px-1 rounded">{tag}</span>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Default title overlay */}
            {!showExpanded && isHovered && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                    <p className="text-white text-sm font-medium">{item.title}</p>
                </div>
            )}
        </a>
    );
};

// Content Row with Chevron controls (PRD Section 4.2)
const ContentRow = ({ title, items, icon: Icon }: {
    title: string;
    items: { title: string; image: string; link?: string; match?: number; tags?: string[] }[];
    icon?: typeof Award
}) => {
    const rowRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (rowRef.current) {
            const scrollAmount = 300;
            rowRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="px-4 md:px-12 mb-8 group/row relative">
            <div className="flex items-center gap-3 mb-3">
                {Icon && <Icon size={20} className="text-[#E50914]" />}
                <h2 className="text-lg md:text-xl font-bold text-white">{title}</h2>
            </div>

            {/* Chevron Controls */}
            <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 z-40 h-36 w-12 bg-black/50 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
            >
                <ChevronLeft className="text-white" size={32} />
            </button>
            <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 z-40 h-36 w-12 bg-black/50 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
            >
                <ChevronRight className="text-white" size={32} />
            </button>

            <div ref={rowRef} className="flex gap-2 overflow-x-auto scrollbar-hide pb-4">
                {items.map((item, i) => (
                    <MovieCard key={i} item={item} link={item.link} />
                ))}
            </div>
        </section>
    );
};

const Browse = () => {
    const { selectedProfile } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!selectedProfile) {
            navigate('/');
        }
    }, [selectedProfile, navigate]);

    if (!selectedProfile) return null;

    const dynamicRow = dynamicRows[selectedProfile];

    return (
        <div className="min-h-screen bg-[#141414]">
            <Navbar />
            <HeroSection profile={selectedProfile} />

            <div className="relative z-20 -mt-20" id="projects">
                <ContentRow
                    title="Trending Now: Projects"
                    icon={Play}
                    items={projects.map(p => ({
                        title: p.title,
                        image: p.image,
                        link: p.link,
                        match: p.match,
                        tags: p.tags
                    }))}
                />

                <ContentRow
                    title={dynamicRow.title}
                    icon={dynamicRow.icon}
                    items={dynamicRow.items}
                />

                {/* Education Section - Netflix Card Style */}
                <ContentRow
                    title="Education & Achievements"
                    icon={GraduationCap}
                    items={[
                        {
                            title: "BMS Institute of Technology",
                            image: "https://images.unsplash.com/photo-1562774053-701939374585?w=300&h=170&fit=crop",
                            match: 99
                        },
                        {
                            title: "B.E. Computer Science (2023-27)",
                            image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=170&fit=crop",
                            match: 97
                        },
                        {
                            title: "CGPA: 8.85",
                            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=170&fit=crop",
                            match: 95
                        },
                        {
                            title: "🏆 Code Red 2025 Finalist",
                            image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=300&h=170&fit=crop",
                            match: 100
                        },
                        {
                            title: "💻 LeetCode 150+ Solved",
                            image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=300&h=170&fit=crop",
                            match: 96
                        }
                    ]}
                />
            </div>

            <footer className="py-12 px-4 md:px-12 text-center text-gray-600 text-sm">
                <p>Built with React, Tailwind & ❤️ by Harsh Goutam</p>
                <p className="mt-2">&copy; {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
};

export default Browse;
