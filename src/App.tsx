import React from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  Mail,
  ExternalLink,
  Code2,
  Cpu,
  Database,
  Terminal
} from 'lucide-react';

// --- DATA FROM RESUME ---
const PROFILE = {
  name: "Harsh Goutam",
  title: "Full Stack Developer & AI Enthusiast",
  about: "I am a Computer Science student at BMS Institute of Technology and Management, Bengaluru (2027). I specialize in building AI-driven applications and scalable web solutions, with a strong foundation in Data Structures and Algorithms.",
  email: "harshvam@gmail.com",
  github: "https://github.com/HarshG2005",
  leetcode: "https://leetcode.com/u/PafrCpM6tD/",
  resumeLink: "/resume.pdf" // Make sure to put your PDF in the public folder
};

const SKILLS = {
  languages: ["Python", "TypeScript", "JavaScript", "C++", "Java", "SQL"],
  web: ["React.js", "Node.js", "Express.js", "TailwindCSS", "ShadCN/UI"],
  ml: ["LangChain", "Gemini/OpenAI API", "RAG Pipelines", "Stable Baselines3"],
  tools: ["Git/GitHub", "Linux", "Docker", "Postman", "Railway"]
};

const PROJECTS = [
  {
    title: "Edu-Saarathi",
    category: "AI-EdTech Platform",
    description: "A comprehensive AI-assisted learning platform generating mind maps, MCQs, and summaries from user text using Google Gemini LLM. Features interactive visualizations and a hybrid routing backend.",
    tech: ["React", "TypeScript", "Node.js", "Gemini API", "ShadCN"],
    repo: "https://github.com/HarshG2005/Edu-Saarathi",
    live: "https://web-production-ab87.up.railway.app/"
  },
  {
    title: "DATAVIS",
    category: "Intelligent EDA Tool",
    description: "Automated data analytics tool transforming raw CSV/Excel datasets into interactive visualizations using NLP. Uses Node.js streams for high-performance parsing of large datasets.",
    tech: ["React", "Express.js", "Gemini Pro", "Recharts", "Node Streams"],
    repo: "https://github.com/HarshG2005/NL2VIS",
    live: null // No live link mentioned in resume
  },
  {
    title: "NEURONAV",
    category: "RL Telemetry Dashboard",
    description: "Real-time monitoring system for PPO agents in 3D environments. Uses WebSocket for low-latency streaming of agent POV and reward metrics during training.",
    tech: ["Python", "Stable Baselines3", "WebSockets", "React"],
    repo: "https://github.com/HarshG2005/NeuroNav",
    live: null
  }
];

// --- COMPONENTS ---

const Section = ({ children, id, className = "" }: { children: React.ReactNode, id: string, className?: string }) => (
  <section id={id} className={`py-20 px-6 md:px-20 max-w-7xl mx-auto ${className}`}>
    {children}
  </section>
);

const Navbar = () => (
  <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800 z-50">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <span className="text-xl font-bold text-blue-400">HG.</span>
      <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
        <a href="#about" className="hover:text-blue-400 transition">About</a>
        <a href="#skills" className="hover:text-blue-400 transition">Skills</a>
        <a href="#projects" className="hover:text-blue-400 transition">Projects</a>
        <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 max-w-7xl mx-auto pt-16">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span className="text-blue-400 font-medium tracking-wider">HELLO WORLD</span>
      <h1 className="text-5xl md:text-7xl font-bold mt-4 mb-6 leading-tight">
        I'm <span className="text-slate-100">{PROFILE.name}</span>.<br />
        I build <span className="text-blue-500">intelligent</span> software.
      </h1>
      <p className="text-slate-400 text-lg max-w-2xl mb-8 leading-relaxed">
        {PROFILE.about}
      </p>

      <div className="flex gap-4">
        <a href="#contact" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
          Contact Me
        </a>
        <a href={PROFILE.github} target="_blank" rel="noreferrer" className="px-6 py-3 border border-slate-700 hover:border-slate-500 text-slate-300 rounded-lg font-medium transition flex items-center gap-2">
          <Github size={20} /> GitHub
        </a>
      </div>
    </motion.div>
  </section>
);

const SkillCard = ({ title, skills, icon: Icon }: { title: string, skills: string[], icon: any }) => (
  <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 hover:border-blue-500/30 transition duration-300">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-semibold text-slate-100">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span key={skill} className="px-3 py-1 bg-slate-800 text-slate-300 text-sm rounded-full">
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const ProjectCard = ({ project }: { project: typeof PROJECTS[0] }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex flex-col"
  >
    <div className="p-6 flex-1 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-blue-400 text-sm font-medium">{project.category}</span>
          <h3 className="text-2xl font-bold text-slate-100 mt-1">{project.title}</h3>
        </div>
        <div className="flex gap-3">
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition">
              <Github size={20} />
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-400 transition">
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>
      <p className="text-slate-400 mb-6 flex-1">{project.description}</p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tech.map((t) => (
          <span key={t} className="text-xs font-mono text-blue-300 bg-blue-900/20 px-2 py-1 rounded">
            {t}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

function App() {
  return (
    <div className="bg-slate-950 min-h-screen">
      <Navbar />
      <Hero />

      <Section id="skills" className="bg-slate-950">
        <h2 className="text-3xl font-bold mb-12 text-slate-100"><span className="text-blue-500">01.</span> Technical Arsenal</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SkillCard title="Languages" skills={SKILLS.languages} icon={Code2} />
          <SkillCard title="Web Dev" skills={SKILLS.web} icon={Terminal} />
          <SkillCard title="AI / ML" skills={SKILLS.ml} icon={Cpu} />
          <SkillCard title="Tools" skills={SKILLS.tools} icon={Database} />
        </div>
      </Section>

      <Section id="projects">
        <h2 className="text-3xl font-bold mb-12 text-slate-100"><span className="text-blue-500">02.</span> Featured Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </Section>

      <Section id="education">
        <h2 className="text-3xl font-bold mb-8 text-slate-100"><span className="text-blue-500">03.</span> Education & Achievements</h2>
        <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-2xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white">BMS Institute of Technology and Management</h3>
            <p className="text-blue-400">Bachelor of Engineering (CSE) | 2023 - 2027</p>
            <p className="text-slate-400 mt-2">CGPA: 8.85</p>
          </div>
          <hr className="border-slate-800 my-6" />
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Honors</h4>
            <ul className="list-disc list-inside text-slate-400 space-y-2">
              <li><strong className="text-slate-200">National Finalist</strong> - Code Red Hackathon 2025</li>
              <li><strong className="text-slate-200">LeetCode</strong> - 150+ DSA Problems Solved</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section id="contact" className="mb-20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-slate-100">Get In Touch</h2>
          <p className="text-slate-400 mb-8">
            I'm currently looking for internships and new opportunities. Whether you have a question or just want to say hi, my inbox is always open.
          </p>
          <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-blue-500 text-blue-400 hover:bg-blue-500/10 rounded-lg font-bold transition">
            <Mail size={20} /> Say Hello
          </a>
        </div>
      </Section>

      <footer className="py-8 text-center text-slate-600 text-sm border-t border-slate-900">
        <p>Built with React, Tailwind & Framer Motion</p>
        <p>&copy; {new Date().getFullYear()} Harsh Goutam</p>
      </footer>
    </div>
  );
}

export default App;
