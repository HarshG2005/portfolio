import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, type ProfileType } from '../context/UserContext';
import {
    Github,
    Linkedin,
    FileText,
    Instagram,
    Twitter,
    Play,
    Award,
    Code2,
    Heart
} from 'lucide-react';

// --- DYNAMIC CONTENT BASED ON PROFILE ---
const heroContent: Record<NonNullable<ProfileType>, {
    title: string;
    subtitle: string;
    description: string;
    primaryBtn: { text: string; icon: any; link: string };
    secondaryBtn: { text: string; icon: any; link: string };
}> = {
    RECRUITER: {
        title: "Harsh Goutam",
        subtitle: "Top Rated Engineer",
        description: "A high-performance engineer delivering scalable AI solutions. Ready to drive business impact with clean code and innovative solutions.",
        primaryBtn: { text: "Resume", icon: FileText, link: "/resume.pdf" },
        secondaryBtn: { text: "LinkedIn", icon: Linkedin, link: "https://linkedin.com/in/harshgoutam" }
    },
    DEVELOPER: {
        title: "Full Stack Architect",
        subtitle: "Clean Code & AI",
        description: "Built with React, Node.js, and Gemini API. Exploring the frontiers of Local LLMs and RAG pipelines. Let's collaborate on something cool.",
        primaryBtn: { text: "GitHub", icon: Github, link: "https://github.com/HarshG2005" },
        secondaryBtn: { text: "Tech Stack", icon: Code2, link: "#skills" }
    },
    STALKER: {
        title: "Welcome, Fan 👀",
        subtitle: "I see you looking...",
        description: "I noticed you checking my portfolio at 3 AM. While you're here, check out my socials. No screenshots allowed. 😏",
        primaryBtn: { text: "Instagram", icon: Instagram, link: "https://instagram.com" },
        secondaryBtn: { text: "Twitter/X", icon: Twitter, link: "https://twitter.com" }
    }
};

const projects = [
    {
        title: "Edu-Saarathi",
        category: "AI-EdTech Platform",
        description: "AI-assisted learning platform with mind maps, MCQs, and summaries.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop",
        link: "https://github.com/HarshG2005/Edu-Saarathi"
    },
    {
        title: "DATAVIS",
        category: "Intelligent EDA",
        description: "Transform raw datasets into interactive visualizations using NLP.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop",
        link: "https://github.com/HarshG2005/NL2VIS"
    },
    {
        title: "NEURONAV",
        category: "RL Dashboard",
        description: "Real-time monitoring for PPO agents in 3D environments.",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=225&fit=crop",
        link: "https://github.com/HarshG2005/NeuroNav"
    }
];

const dynamicRows: Record<NonNullable<ProfileType>, {
    title: string;
    icon: any;
    items: { title: string; image: string }[];
}> = {
    RECRUITER: {
        title: "Certifications & Achievements",
        icon: Award,
        items: [
            { title: "Code Red 2025 - National Finalist", image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=300&h=170&fit=crop" },
            { title: "LeetCode - 150+ Problems", image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=300&h=170&fit=crop" },
            { title: "CGPA: 8.85", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=170&fit=crop" }
        ]
    },
    DEVELOPER: {
        title: "Tech Stack",
        icon: Code2,
        items: [
            { title: "React & TypeScript", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=170&fit=crop" },
            { title: "Python & AI", image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=300&h=170&fit=crop" },
            { title: "Node.js & Express", image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=170&fit=crop" },
            { title: "Docker & DevOps", image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=300&h=170&fit=crop" }
        ]
    },
    STALKER: {
        title: "Personal Interests",
        icon: Heart,
        items: [
            { title: "Chess ♟️", image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=300&h=170&fit=crop" },
            { title: "Cricket 🏏", image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=300&h=170&fit=crop" },
            { title: "Photography 📷", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=170&fit=crop" },
            { title: "Gaming 🎮", image: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=300&h=170&fit=crop" }
        ]
    }
};

// --- COMPONENTS ---

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-12 py-4 bg-gradient-to-b from-black/80 to-transparent">
            <div className="flex items-center justify-between">
                <button onClick={() => navigate('/')} className="text-[#E50914] text-3xl font-bold tracking-tighter">
                    HG
                </button>
                <div className="flex items-center gap-6 text-sm text-gray-300">
                    <a href="#projects" className="hover:text-white transition">Projects</a>
                    <a href="#skills" className="hover:text-white transition">Skills</a>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-white/10 px-4 py-2 rounded hover:bg-white/20 transition"
                    >
                        Switch Profile
                    </button>
                </div>
            </div>
        </nav>
    );
};

const HeroSection = ({ profile }: { profile: NonNullable<ProfileType> }) => {
    const content = heroContent[profile];
    const PrimaryIcon = content.primaryBtn.icon;
    const SecondaryIcon = content.secondaryBtn.icon;

    return (
        <section className="relative min-h-screen flex items-center px-4 md:px-12">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent z-10" />

            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-40"
                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?w=1920&h=1080&fit=crop)' }}
            />

            <div className="relative z-20 max-w-2xl pt-20">
                <span className="text-[#E50914] font-medium mb-2 block">{content.subtitle}</span>
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                    {content.title}
                </h1>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                    {content.description}
                </p>
                <div className="flex gap-4">
                    <a
                        href={content.primaryBtn.link}
                        target={content.primaryBtn.link.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer"
                        className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded font-bold hover:bg-gray-200 transition"
                    >
                        <PrimaryIcon size={20} /> {content.primaryBtn.text}
                    </a>
                    <a
                        href={content.secondaryBtn.link}
                        target={content.secondaryBtn.link.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer"
                        className="flex items-center gap-2 bg-gray-500/50 text-white px-8 py-3 rounded font-bold hover:bg-gray-500/70 transition"
                    >
                        <SecondaryIcon size={20} /> {content.secondaryBtn.text}
                    </a>
                </div>
            </div>
        </section>
    );
};

const ContentRow = ({ title, items, icon: Icon }: { title: string; items: { title: string; image: string; link?: string }[]; icon?: any }) => {
    return (
        <section className="px-4 md:px-12 mb-12">
            <div className="flex items-center gap-3 mb-4">
                {Icon && <Icon size={24} className="text-[#E50914]" />}
                <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4">
                {items.map((item, i) => (
                    <a
                        key={i}
                        href={item.link || '#'}
                        target={item.link?.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer"
                        className="flex-shrink-0 group relative overflow-hidden rounded-md transition-all duration-300 hover:scale-110 hover:z-10"
                        style={{ transitionDelay: '400ms' }}
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-64 h-36 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-white text-sm font-medium">{item.title}</p>
                        </div>
                    </a>
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

            <div className="relative z-20 -mt-32">
                <ContentRow
                    title="Trending Now: Projects"
                    icon={Play}
                    items={projects.map(p => ({
                        title: p.title,
                        image: p.image,
                        link: p.link
                    }))}
                />

                <ContentRow
                    title={dynamicRow.title}
                    icon={dynamicRow.icon}
                    items={dynamicRow.items}
                />
            </div>

            <footer className="py-12 px-4 md:px-12 text-center text-gray-500 text-sm">
                <p>Built with React, Tailwind & ❤️</p>
                <p className="mt-2">&copy; {new Date().getFullYear()} Harsh Goutam</p>
            </footer>
        </div>
    );
};

export default Browse;
