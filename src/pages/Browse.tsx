import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser, type ProfileType } from '../context/UserContext';
import { motion } from 'framer-motion';
import {
    Github,
    Linkedin,
    FileText,
    Instagram,
    Twitter,
    Play,
    Plus,
    ThumbsUp,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    GraduationCap,
    Code2,
    Trophy,
    Briefcase
} from 'lucide-react';

// --- DYNAMIC CONTENT BASED ON PROFILE ---
const heroContent: Record<NonNullable<ProfileType>, {
    title: string;
    subtitle: string;
    description: string;
    primaryCta: { label: string; icon: typeof FileText; link: string };
    secondaryCta: { label: string; icon: typeof Github; link: string };
    featuredProject: string;
}> = {
    RECRUITER: {
        title: "Full-Stack Developer",
        subtitle: "HARSH GOUTAM",
        description: "Passionate about building scalable web applications with modern technologies. B.E. Computer Science student at BMS Institute of Technology with 8.85 CGPA. Code Red 2025 Finalist.",
        primaryCta: { label: "Download Resume", icon: FileText, link: "/resume.pdf" },
        secondaryCta: { label: "LinkedIn", icon: Linkedin, link: "https://linkedin.com" },
        featuredProject: 'edu-saarathi'
    },
    DEVELOPER: {
        title: "Code Architect",
        subtitle: "HARSH GOUTAM",
        description: "React, TypeScript, Node.js enthusiast. Building performant UIs and scalable backends. Exploring AI/ML with Gemini and OpenAI APIs. Check out my GitHub for technical deep-dives.",
        primaryCta: { label: "View GitHub", icon: Github, link: "https://github.com/HarshG2005" },
        secondaryCta: { label: "Tech Stack", icon: Code2, link: "/skills" },
        featuredProject: 'neuronav'
    },
    STALKER: {
        title: "Just a Human",
        subtitle: "HARSH GOUTAM",
        description: "When not coding, I'm probably watching anime, exploring new music, playing games, or contemplating why my code works. Welcome to the stalker zone 👀",
        primaryCta: { label: "Instagram", icon: Instagram, link: "https://instagram.com" },
        secondaryCta: { label: "Twitter", icon: Twitter, link: "https://twitter.com" },
        featuredProject: 'portfolio'
    }
};

// Persona-specific row configurations
const personaRows: Record<NonNullable<ProfileType>, {
    rows: { title: string; icon: typeof Play; type: 'projects' | 'education' | 'interests' | 'achievements' }[];
}> = {
    RECRUITER: {
        rows: [
            { title: "Featured Projects", icon: Briefcase, type: 'projects' },
            { title: "Education & Credentials", icon: GraduationCap, type: 'education' },
            { title: "Achievements & Awards", icon: Trophy, type: 'achievements' },
        ]
    },
    DEVELOPER: {
        rows: [
            { title: "Technical Projects", icon: Code2, type: 'projects' },
            { title: "More to Explore", icon: Play, type: 'projects' },
            { title: "Achievements", icon: Trophy, type: 'achievements' },
        ]
    },
    STALKER: {
        rows: [
            { title: "What I've Built", icon: Code2, type: 'projects' },
            { title: "Things I Like", icon: Play, type: 'interests' },
            { title: "Fun Facts", icon: Trophy, type: 'achievements' },
        ]
    }
};

// Projects data
const projects = [
    {
        id: 'edu-saarathi',
        title: 'Edu-Saarathi',
        description: 'AI-Driven Learning & Concept Mapping Platform using Gemini LLM',
        thumbnail: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=225&fit=crop',
        match: 98,
        tags: ['React', 'Gemini API', 'Node.js'],
        year: '2024',
        featured: true,
        link: 'https://github.com/HarshG2005/Edu-Saarathi'
    },
    {
        id: 'datavis',
        title: 'DATAVIS',
        description: 'Intelligent EDA Platform with Natural Language Processing',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
        match: 96,
        tags: ['Gemini API', 'React', 'Recharts'],
        year: '2024',
        link: 'https://github.com/HarshG2005/NL2VIS'
    },
    {
        id: 'neuronav',
        title: 'NEURONAV',
        description: 'Reinforcement Learning Telemetry Dashboard with WebSocket',
        thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop',
        match: 94,
        tags: ['Python', 'Stable Baselines3', 'WebSocket'],
        year: '2024',
        link: 'https://github.com/HarshG2005/NeuroNav'
    },
    {
        id: 'portfolio',
        title: 'Netflix Portfolio',
        description: 'This very portfolio you\'re viewing right now',
        thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=225&fit=crop',
        match: 100,
        tags: ['React', 'Tailwind', 'Framer Motion'],
        year: '2024',
        link: 'https://github.com/HarshG2005/portfolio'
    },
];

const education = [
    { title: 'BMS Institute of Technology', thumbnail: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=225&fit=crop', match: 99 },
    { title: 'B.E. Computer Science (2023-27)', thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=225&fit=crop', match: 97 },
    { title: 'CGPA: 8.85', thumbnail: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=400&h=225&fit=crop', match: 95 },
];

const achievements = [
    { title: '🏆 Code Red 2025 Finalist', thumbnail: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=400&h=225&fit=crop', match: 100 },
    { title: '💻 LeetCode 150+ Solved', thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=225&fit=crop', match: 96 },
    { title: '📚 3+ AI/ML Projects', thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop', match: 94 },
];

// Stalker-specific fun content
const interests = [
    { title: '🎮 Gaming Enthusiast', thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=225&fit=crop', match: 100 },
    { title: '🎵 Music Lover', thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=225&fit=crop', match: 98 },
    { title: '📺 Anime Watcher', thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=225&fit=crop', match: 97 },
    { title: '☕ Coffee Addict', thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=225&fit=crop', match: 95 },
];

const stalkerAchievements = [
    { title: '🌙 Night Owl Coder', thumbnail: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=225&fit=crop', match: 100 },
    { title: '🐛 Bug Creator (and Fixer)', thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=225&fit=crop', match: 99 },
    { title: '⌨️ Types 80+ WPM', thumbnail: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=225&fit=crop', match: 95 },
    { title: '🎯 Perfectionist (sometimes)', thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=225&fit=crop', match: 92 },
];

// --- COMPONENTS ---
const Navbar = () => {
    const navigate = useNavigate();
    const { selectedProfile } = useUser();
    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 px-4 md:px-16 py-4 bg-gradient-to-b from-black to-transparent"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link to="/" className="text-3xl font-bold text-[#E50914]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                        HG
                    </Link>
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/browse" className="text-white hover:text-gray-300 transition-colors">Home</Link>
                        <Link to="/projects" className="text-gray-400 hover:text-white transition-colors">Projects</Link>
                        <Link to="/skills" className="text-gray-400 hover:text-white transition-colors">Skills</Link>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-gray-500 text-sm hidden md:block">
                        Viewing as: <span className="text-[#E50914]">{selectedProfile}</span>
                    </span>
                    <button
                        onClick={() => navigate('/profiles')}
                        className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                        Switch Profile
                    </button>
                </div>
            </div>
        </motion.nav>
    );
};

const Hero = ({ profile }: { profile: NonNullable<ProfileType> }) => {
    const content = heroContent[profile];
    const featured = projects.find(p => p.id === content.featuredProject) || projects[0];
    const SecondaryCta = content.secondaryCta.icon;

    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${featured.thumbnail})` }}
            >
                <div className="absolute inset-0 hero-gradient-right" />
                <div className="absolute inset-0 hero-gradient-bottom" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 max-w-3xl pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    {/* Profile Badge */}
                    <motion.span
                        className={`inline-block px-3 py-1 text-sm font-semibold mb-4 tracking-wide ${profile === 'RECRUITER' ? 'bg-blue-600' :
                            profile === 'DEVELOPER' ? 'bg-green-600' : 'bg-[#E50914]'
                            }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        {profile === 'RECRUITER' ? '📋 RECRUITER VIEW' :
                            profile === 'DEVELOPER' ? '💻 DEVELOPER VIEW' : '👀 STALKER MODE'}
                    </motion.span>

                    {/* Title */}
                    <h1
                        className="text-5xl md:text-7xl lg:text-8xl text-white mb-4 text-shadow-dramatic"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                        {content.title}
                    </h1>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl leading-relaxed">
                        {content.description}
                    </p>

                    {/* Match & Tags */}
                    <div className="flex items-center gap-4 mb-8 flex-wrap">
                        <span className="text-match-green font-semibold text-lg">
                            {featured.match}% Match
                        </span>
                        <span className="text-gray-400">{featured.year}</span>
                        <div className="flex gap-2">
                            {featured.tags.map(tag => (
                                <span key={tag} className="text-gray-400 text-sm border border-gray-600 px-2 py-0.5 rounded">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 flex-wrap">
                        <a
                            href={content.primaryCta.link}
                            className="netflix-button text-lg"
                        >
                            <Play className="w-5 h-5" fill="currentColor" />
                            {content.primaryCta.label}
                        </a>
                        <Link
                            to={content.secondaryCta.link.startsWith('/') ? content.secondaryCta.link : '#'}
                            onClick={(e) => {
                                if (!content.secondaryCta.link.startsWith('/')) {
                                    e.preventDefault();
                                    window.open(content.secondaryCta.link, '_blank');
                                }
                            }}
                            className="bg-gray-600/80 hover:bg-gray-600 text-white px-6 py-3 rounded flex items-center gap-2 transition-colors"
                        >
                            <SecondaryCta className="w-5 h-5" />
                            {content.secondaryCta.label}
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Skip Intro Button */}
            <motion.a
                href="#content"
                className="absolute bottom-8 right-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <span className="text-sm uppercase tracking-widest">Explore</span>
                <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <ChevronDown className="w-5 h-5" />
                </motion.div>
            </motion.a>
        </div>
    );
};

// Movie Card Component
const MovieCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
    const [isHovered, setIsHovered] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleMouseEnter = () => {
        timeoutRef.current = setTimeout(() => setIsHovered(true), 300);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsHovered(false);
    };

    return (
        <motion.div
            className="relative flex-shrink-0 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className={`relative w-64 md:w-72 aspect-video rounded-sm overflow-hidden transition-all duration-300 ease-out
          ${isHovered ? 'scale-125 z-50 shadow-2xl' : 'scale-100 z-10'}`}
            >
                <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />

                {/* Hover Info Panel */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/80 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-xl text-white mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                            {project.title}
                        </h3>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 mb-3">
                            <button className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition-colors">
                                <Play className="w-4 h-4" fill="currentColor" />
                            </button>
                            <button className="w-8 h-8 rounded-full border-2 border-gray-400 text-white flex items-center justify-center hover:border-white transition-colors">
                                <Plus className="w-4 h-4" />
                            </button>
                            <button className="w-8 h-8 rounded-full border-2 border-gray-400 text-white flex items-center justify-center hover:border-white transition-colors">
                                <ThumbsUp className="w-4 h-4" />
                            </button>
                            <button className="w-8 h-8 rounded-full border-2 border-gray-400 text-white flex items-center justify-center hover:border-white transition-colors ml-auto">
                                <ChevronDown className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Meta */}
                        <div className="flex items-center gap-3 text-sm">
                            <span className="text-match-green font-semibold">{project.match}% Match</span>
                            <span className="text-gray-400 border border-gray-600 px-1">{project.year}</span>
                        </div>

                        {/* Tags */}
                        <div className="flex gap-1 mt-2 flex-wrap">
                            {project.tags.slice(0, 3).map((tag, i) => (
                                <span key={tag} className="text-xs text-gray-400">
                                    {tag}{i < Math.min(project.tags.length, 3) - 1 && ' •'}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

// Simple Card for non-project items
const SimpleCard = ({ item, index }: { item: { title: string; thumbnail: string; match: number }; index: number }) => (
    <motion.div
        className="flex-shrink-0 w-64 md:w-72 aspect-video rounded-sm overflow-hidden relative group cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ scale: 1.05 }}
    >
        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
            <div>
                <h3 className="text-white font-semibold">{item.title}</h3>
                <span className="text-match-green text-sm">{item.match}% Match</span>
            </div>
        </div>
    </motion.div>
);

// Content Row Component
const ContentRow = ({ title, items, icon: Icon, isProject = false }: {
    title: string;
    items: (typeof projects | typeof education);
    icon?: typeof Play;
    isProject?: boolean;
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(true);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -400 : 400;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const handleScroll = () => {
        if (scrollRef.current) {
            setShowLeft(scrollRef.current.scrollLeft > 0);
            setShowRight(scrollRef.current.scrollLeft < scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 10);
        }
    };

    return (
        <section className="mb-8 group/row">
            <div className="flex items-center gap-3 px-4 md:px-16 mb-4">
                {Icon && <Icon size={20} className="text-[#E50914]" />}
                <h2 className="text-lg md:text-xl font-bold text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {title}
                </h2>
            </div>

            <div className="relative">
                {showLeft && (
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-40 w-10 h-10 bg-black/80 rounded-full flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
                    >
                        <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                )}

                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex gap-2 overflow-x-auto hide-scrollbar px-4 md:px-16 py-4"
                >
                    {items.map((item, index) => (
                        isProject && 'tags' in item ? (
                            <MovieCard key={item.id || index} project={item as typeof projects[0]} index={index} />
                        ) : (
                            <SimpleCard key={index} item={item as { title: string; thumbnail: string; match: number }} index={index} />
                        )
                    ))}
                </div>

                {showRight && (
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-40 w-10 h-10 bg-black/80 rounded-full flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
                    >
                        <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                )}
            </div>
        </section>
    );
};

// Footer with persona-specific CTAs
const Footer = ({ profile }: { profile: NonNullable<ProfileType> }) => {
    const footerContent = {
        RECRUITER: {
            message: "Interested in hiring? Let's connect!",
            links: [
                { icon: Linkedin, label: "LinkedIn", href: "#" },
                { icon: FileText, label: "Resume", href: "/resume.pdf" },
                { icon: Github, label: "GitHub", href: "https://github.com/HarshG2005" },
            ]
        },
        DEVELOPER: {
            message: "Let's build something awesome together!",
            links: [
                { icon: Github, label: "GitHub", href: "https://github.com/HarshG2005" },
                { icon: Code2, label: "Projects", href: "/projects" },
                { icon: Linkedin, label: "LinkedIn", href: "#" },
            ]
        },
        STALKER: {
            message: "Thanks for stalking! Here's more ways to stalk 👀",
            links: [
                { icon: Instagram, label: "Instagram", href: "#" },
                { icon: Twitter, label: "Twitter", href: "#" },
                { icon: Github, label: "GitHub", href: "https://github.com/HarshG2005" },
            ]
        }
    };

    const content = footerContent[profile];

    return (
        <footer className="border-t border-gray-800 py-12 px-4 md:px-16">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col items-center gap-8">
                    <p className="text-gray-400 text-lg text-center">{content.message}</p>

                    <div className="flex items-center gap-6">
                        {content.links.map(link => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="flex items-center gap-2 text-gray-500 hover:text-[#E50914] transition-colors"
                            >
                                <link.icon className="w-6 h-6" />
                                <span className="hidden md:inline">{link.label}</span>
                            </a>
                        ))}
                    </div>

                    <p className="text-gray-600 text-sm">
                        © {new Date().getFullYear()} Harsh Goutam. Built with React & ❤️
                    </p>
                </div>
            </div>
        </footer>
    );
};

// Main Browse Component
const Browse = () => {
    const { selectedProfile } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!selectedProfile) {
            navigate('/');
        }
    }, [selectedProfile, navigate]);

    if (!selectedProfile) return null;

    const rows = personaRows[selectedProfile].rows;

    // Get data based on row type
    const getRowData = (type: string) => {
        switch (type) {
            case 'projects': return projects;
            case 'education': return education;
            case 'achievements': return selectedProfile === 'STALKER' ? stalkerAchievements : achievements;
            case 'interests': return interests;
            default: return projects;
        }
    };

    return (
        <motion.div
            className="min-h-screen bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Navbar />
            <Hero profile={selectedProfile} />

            {/* Dynamic Content Rows based on persona */}
            <section id="content" className="-mt-16 relative z-20 pb-8 pt-8">
                {rows.map((row, index) => (
                    <ContentRow
                        key={index}
                        title={row.title}
                        items={getRowData(row.type)}
                        icon={row.icon}
                        isProject={row.type === 'projects'}
                    />
                ))}
            </section>

            <Footer profile={selectedProfile} />
        </motion.div>
    );
};

export default Browse;
