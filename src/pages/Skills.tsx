import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Code2, Database, Cloud, Cpu, Wrench,
    Globe, FileCode, Server, Box, GitBranch,
    Layers, Zap, Terminal, PenTool, Settings
} from 'lucide-react';

// Skill categories with Lucide icons (rendered in red)
const skillCategories = [
    {
        title: 'Frontend',
        skills: [
            { name: 'React', description: 'UI Library', Icon: Code2 },
            { name: 'TypeScript', description: 'Type-Safe JS', Icon: FileCode },
            { name: 'Tailwind CSS', description: 'Utility-First CSS', Icon: PenTool },
            { name: 'Next.js', description: 'React Framework', Icon: Globe },
            { name: 'Framer Motion', description: 'Animations', Icon: Zap },
        ]
    },
    {
        title: 'Backend',
        skills: [
            { name: 'Node.js', description: 'JS Runtime', Icon: Server },
            { name: 'Python', description: 'Programming Language', Icon: Terminal },
            { name: 'FastAPI', description: 'Python API Framework', Icon: Zap },
            { name: 'Express', description: 'Node Framework', Icon: Layers },
            { name: 'PostgreSQL', description: 'Relational Database', Icon: Database },
        ]
    },
    {
        title: 'Cloud & DevOps',
        skills: [
            { name: 'Git', description: 'Version Control', Icon: GitBranch },
            { name: 'Docker', description: 'Containerization', Icon: Box },
            { name: 'Vercel', description: 'Deployment Platform', Icon: Cloud },
            { name: 'Railway', description: 'Cloud Platform', Icon: Cloud },
            { name: 'GitHub Actions', description: 'CI/CD', Icon: Settings },
        ]
    },
    {
        title: 'AI & ML',
        skills: [
            { name: 'Gemini AI', description: 'Google AI API', Icon: Cpu },
            { name: 'OpenAI', description: 'GPT APIs', Icon: Cpu },
            { name: 'LangChain', description: 'LLM Framework', Icon: Layers },
            { name: 'OpenCV', description: 'Computer Vision', Icon: Cpu },
        ]
    },
    {
        title: 'Tools & Others',
        skills: [
            { name: 'VS Code', description: 'Code Editor', Icon: Code2 },
            { name: 'Figma', description: 'UI Design', Icon: PenTool },
            { name: 'Postman', description: 'API Testing', Icon: Wrench },
            { name: 'Linux', description: 'Operating System', Icon: Terminal },
        ]
    }
];

const SkillCard = ({ skill, index }: { skill: { name: string; description: string; Icon: typeof Code2 }; index: number }) => {
    const [isClicked, setIsClicked] = useState(false);
    const { Icon } = skill;

    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 500);
    };

    return (
        <motion.div
            className={`bg-[#1a1a1a] rounded-lg p-6 flex flex-col items-center text-center 
        hover:bg-[#222] transition-all duration-300 cursor-pointer group
        border border-transparent hover:border-[#E50914]/50
        ${isClicked ? 'shadow-[0_0_25px_rgba(229,9,20,0.6)]' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
        >
            <div className={`mb-3 group-hover:scale-110 transition-transform ${isClicked ? 'animate-pulse' : ''}`}>
                <Icon className="w-10 h-10 text-[#E50914]" strokeWidth={1.5} />
            </div>
            <h3 className="text-white font-semibold mb-1">{skill.name}</h3>
            <p className="text-gray-500 text-sm">{skill.description}</p>
        </motion.div>
    );
};

const Skills = () => {
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
                            <Link to="/projects" className="text-gray-400 hover:text-white transition-colors">Projects</Link>
                            <Link to="/skills" className="text-[#E50914] font-semibold">Skills</Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Content */}
            <div className="pt-24 px-4 md:px-16 pb-16">
                {skillCategories.map((category, catIndex) => (
                    <motion.section
                        key={category.title}
                        className="mb-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: catIndex * 0.2 }}
                    >
                        <h2
                            className="text-3xl md:text-4xl text-center mb-8"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                            <span className="text-[#E50914]">{category.title}</span>
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
                            {category.skills.map((skill, skillIndex) => (
                                <SkillCard key={skill.name} skill={skill} index={skillIndex} />
                            ))}
                        </div>
                    </motion.section>
                ))}
            </div>
        </div>
    );
};

export default Skills;
