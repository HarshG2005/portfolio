import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
    {
        id: 'edu-saarathi',
        title: 'Edu-Saarathi',
        description: 'AI-powered personalized learning platform that adapts to your learning style. Features real-time progress tracking and intelligent course recommendations.',
        thumbnail: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop',
        tags: ['React', 'TypeScript', 'AI'],
        github: 'https://github.com/HarshG2005',
        live: '#'
    },
    {
        id: 'portfolio',
        title: 'Netflix Portfolio',
        description: 'This very portfolio you\'re viewing. A Netflix-inspired portfolio site with persona-based content and smooth animations.',
        thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop',
        tags: ['React', 'Tailwind', 'Framer Motion'],
        github: 'https://github.com/HarshG2005/portfolio',
        live: '#'
    },
    {
        id: 'chatbot',
        title: 'AI Chatbot',
        description: 'Intelligent conversational assistant built with Python and NLP. Features context awareness and multi-turn conversations.',
        thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
        tags: ['Python', 'NLP', 'FastAPI'],
        github: 'https://github.com/HarshG2005',
        live: '#'
    },
    {
        id: 'dashboard',
        title: 'Analytics Dashboard',
        description: 'Real-time data visualization dashboard with interactive charts, custom filters, and export capabilities.',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
        tags: ['D3.js', 'React', 'SQL'],
        github: 'https://github.com/HarshG2005',
        live: '#'
    },
    {
        id: 'byteforge',
        title: 'ByteForge',
        description: 'Real-time hand gesture recognition system using computer vision. Built for Code Red hackathon.',
        thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop',
        tags: ['Python', 'OpenCV', 'Streamlit'],
        github: 'https://github.com/HarshG2005',
        live: '#'
    },
    {
        id: 'quizzy',
        title: 'Quizzy',
        description: 'AI-driven quiz generation tool that creates MCQs from PDF documents using Google Gemini API.',
        thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop',
        tags: ['React', 'FastAPI', 'Gemini AI'],
        github: 'https://github.com/HarshG2005',
        live: '#'
    },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => (
    <motion.div
        className="bg-[#1a1a1a] rounded-lg overflow-hidden group cursor-pointer hover:bg-[#222] transition-colors"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
    >
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
            <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent opacity-60" />
        </div>

        {/* Content */}
        <div className="p-5">
            <h3 className="text-xl text-[#E50914] font-semibold mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em' }}>
                {project.title}
            </h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1 text-xs text-gray-300 bg-[#333] px-2 py-1 rounded">
                        <span className="text-[#E50914]">⚡</span> {tag}
                    </span>
                ))}
            </div>

            {/* Links */}
            <div className="flex gap-3">
                <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                >
                    <Github className="w-4 h-4" /> Code
                </a>
                <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-[#E50914] transition-colors text-sm"
                >
                    <ExternalLink className="w-4 h-4" /> Live
                </a>
            </div>
        </div>
    </motion.div>
);

const Projects = () => {
    return (
        <div className="min-h-screen bg-[#141414]">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-16 py-4 bg-gradient-to-b from-black to-transparent">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link to="/browse" className="text-3xl font-bold text-[#E50914]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                            HARSH GOUTAM
                        </Link>
                        <div className="hidden md:flex items-center gap-6">
                            <Link to="/browse" className="text-gray-400 hover:text-white transition-colors">Home</Link>
                            <Link to="/projects" className="text-white font-semibold">Projects</Link>
                            <Link to="/skills" className="text-gray-400 hover:text-white transition-colors">Skills</Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Content */}
            <div className="pt-24 px-4 md:px-16 pb-16">
                <motion.h1
                    className="text-4xl md:text-5xl text-white mb-12"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    My Projects
                </motion.h1>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;
