import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { animate, stagger, onScroll } from 'animejs';
import ParticleBackground from './components/ParticleBackground';
import {
  Github,
  Mail,
  ExternalLink,
  Code2,
  Cpu,
  Database,
  Terminal,
  ChevronDown,
  Sparkles
} from 'lucide-react';

// --- DATA FROM RESUME ---
const PROFILE = {
  name: "Harsh Goutam",
  title: "Full Stack Developer & AI Enthusiast",
  aboutHighlights: [
    "Building AI-driven applications",
    "Scalable web solutions",
    "Strong DSA foundation"
  ],
  longAbout: "I am a Computer Science student at BMS Institute of Technology and Management, Bengaluru (2027), specializing in the intersection of modern web technologies and artificial intelligence.",
  email: "harshvam@gmail.com",
  github: "https://github.com/HarshG2005",
  leetcode: "https://leetcode.com/u/PafrCpM6tD/",
  resumeLink: "/resume.pdf"
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
    description: "A comprehensive AI-assisted learning platform generating mind maps, MCQs, and summaries from user text using Google Gemini LLM.",
    tech: ["React", "TypeScript", "Node", "Gemini API"],
    repo: "https://github.com/HarshG2005/Edu-Saarathi",
    live: "https://web-production-ab87.up.railway.app/"
  },
  {
    title: "DATAVIS",
    category: "Intelligent EDA Tool",
    description: "Automated data analytics tool transforming raw CSV/Excel datasets into interactive visualizations using NLP and Node.js streams.",
    tech: ["React", "Express", "Gemini Pro", "Recharts"],
    repo: "https://github.com/HarshG2005/NL2VIS",
    live: null
  },
  {
    title: "NEURONAV",
    category: "RL Telemetry Dashboard",
    description: "Real-time monitoring system for PPO agents in 3D environments. Uses WebSocket for low-latency streaming of agent POV.",
    tech: ["Python", "Stable Baselines3", "WebSockets"],
    repo: "https://github.com/HarshG2005/NeuroNav",
    live: null
  }
];

// --- COMPONENTS ---

const Section = ({ children, id, className = "" }: { children: React.ReactNode, id: string, className?: string }) => (
  <section id={id} className={`py-24 px-6 md:px-20 max-w-7xl mx-auto relative ${className}`}>
    {children}
  </section>
);

const Navbar = () => (
  <motion.nav
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ duration: 0.5 }}
    className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
  >
    <div className="glass px-8 py-4 rounded-full flex items-center gap-8 text-sm font-medium text-slate-300">
      <a href="#" className="text-white font-bold text-lg mr-4">HG.</a>
      <a href="#about" className="hover:text-blue-400 transition hidden md:block">About</a>
      <a href="#skills" className="hover:text-blue-400 transition hidden md:block">Skills</a>
      <a href="#projects" className="hover:text-blue-400 transition hidden md:block">Projects</a>
      <a href="#contact" className="hover:text-blue-400 transition hidden md:block">Contact</a>
      <a href={PROFILE.github} target="_blank" rel="noreferrer" className="text-white hover:text-blue-400 transition">
        <Github size={20} />
      </a>
    </div>
  </motion.nav>
);

const Hero = () => (
  <section className="min-h-screen flex flex-col justify-center items-center px-6 relative overflow-hidden">
    {/* Background Glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />

    <div className="max-w-4xl mx-auto text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium border border-blue-500/20 mb-6">
          <Sparkles size={14} /> Available for hire
        </span>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 text-white">
          I build <span className="text-gradient">intelligent</span><br />
          software solutions.
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          {PROFILE.longAbout}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex flex-col md:flex-row gap-4 justify-center items-center"
      >
        <a href="#projects" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition shadow-lg shadow-blue-500/25">
          View Work
        </a>
        <a href="#contact" className="px-8 py-4 glass hover:bg-white/10 text-white rounded-full font-bold transition">
          Contact Me
        </a>
      </motion.div>
    </div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 animate-bounce"
    >
      <ChevronDown size={24} />
    </motion.div>
  </section>
);

const SkillCard = ({ title, skills, icon: Icon }: { title: string, skills: string[], icon: any }) => (
  <div className="skill-card glass glass-hover p-8 rounded-2xl opacity-0 translate-y-8">
    <div className="flex items-center gap-4 mb-6">
      <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 ring-1 ring-blue-500/20">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span key={skill} className="px-3 py-1 bg-white/5 border border-white/5 text-slate-300 text-sm rounded-full hover:bg-white/10 transition cursor-default">
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const ProjectCard = ({ project }: { project: typeof PROJECTS[0] }) => (
  <div className="project-card group relative glass rounded-2xl overflow-hidden flex flex-col h-full opacity-0 translate-y-12">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition duration-500" />

    <div className="p-8 relative z-10 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <span className="text-blue-400 text-xs font-bold tracking-wider uppercase bg-blue-500/10 px-2 py-1 rounded">
          {project.category}
        </span>
        <div className="flex gap-3">
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition p-1 hover:bg-white/10 rounded-full">
              <Github size={20} />
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-400 transition p-1 hover:bg-white/10 rounded-full">
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>

      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition">{project.title}</h3>
      <p className="text-slate-400 mb-6 leading-relaxed flex-1">{project.description}</p>

      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
        {project.tech.map((t) => (
          <span key={t} className="text-xs font-medium text-slate-300 bg-slate-800/50 px-2 py-1 rounded">
            {t}
          </span>
        ))}
      </div>
    </div>
  </div>
);

function App() {
  const skillsGridRef = useRef<HTMLDivElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skills Section: Staggered pop-in animation on scroll
    if (skillsGridRef.current) {
      const skillCards = skillsGridRef.current.querySelectorAll('.skill-card');
      animate(skillCards, {
        translateY: [40, 0],
        opacity: [0, 1],
        delay: stagger(100),
        duration: 800,
        easing: 'easeOutElastic(1, .6)',
        autoplay: onScroll({
          target: skillsGridRef.current,
          enter: 'bottom-=100 top'
        })
      });
    }

    // Projects Section: Slide up animation on scroll
    if (projectsGridRef.current) {
      const projectCards = projectsGridRef.current.querySelectorAll('.project-card');
      animate(projectCards, {
        translateY: [60, 0],
        opacity: [0, 1],
        delay: stagger(150),
        duration: 1000,
        easing: 'easeOutQuad',
        autoplay: onScroll({
          target: projectsGridRef.current,
          enter: 'bottom-=150 top'
        })
      });
    }

    // Education Section: Simple fade in
    if (educationRef.current) {
      animate(educationRef.current, {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        easing: 'easeOutQuad',
        autoplay: onScroll({
          target: educationRef.current,
          enter: 'bottom-=100 top'
        })
      });
    }
  }, []);

  return (
    <div className="min-h-screen selection:bg-blue-500/30">
      <ParticleBackground />
      <Navbar />
      <Hero />

      <Section id="skills">
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-blue-400 font-medium mb-4">THE TOOLKIT</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Technical <span className="text-gradient">Arsenal</span></h2>
        </div>
        <div ref={skillsGridRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SkillCard title="Languages" skills={SKILLS.languages} icon={Code2} />
          <SkillCard title="Web Stacks" skills={SKILLS.web} icon={Terminal} />
          <SkillCard title="AI & ML" skills={SKILLS.ml} icon={Cpu} />
          <SkillCard title="Dev Tools" skills={SKILLS.tools} icon={Database} />
        </div>
      </Section>

      <Section id="projects" className="bg-slate-950/30">
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-blue-400 font-medium mb-4">SELECTED WORKS</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Featured <span className="text-gradient">Projects</span></h2>
        </div>
        <div ref={projectsGridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </Section>

      <Section id="education">
        <div ref={educationRef} className="glass p-10 rounded-3xl border border-white/10 relative overflow-hidden opacity-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10 grid md:grid-cols-3 gap-10">
            <div className="md:col-span-1">
              <h2 className="text-3xl font-bold text-white mb-2">Education</h2>
              <p className="text-slate-400">My academic journey and milestones.</p>
            </div>
            <div className="md:col-span-2 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white">BMS Institute of Technology and Management</h3>
                <p className="text-blue-400 font-medium mt-1">Bachelor of Engineering (CSE) | 2023 - 2027</p>
                <p className="text-slate-400 mt-2">CGPA: 8.85</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-4">Achievements</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-slate-300">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span><strong className="text-white">National Finalist</strong> - Code Red Hackathon 2025</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span><strong className="text-white">LeetCode</strong> - 150+ DSA Problems Solved</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="contact" className="mb-20">
        <div className="glass rounded-3xl p-12 text-center max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 pointer-events-none" />
          <h2 className="text-4xl font-bold mb-6 text-white relative z-10">Ready to <span className="text-gradient">Collaborate?</span></h2>
          <p className="text-slate-300 mb-10 text-lg max-w-2xl mx-auto leading-relaxed relative z-10">
            I'm currently looking for internships and new opportunities. Whether you have a question or just want to say hi, my inbox is always open.
          </p>
          <a href={`mailto:${PROFILE.email}`} className="relative z-10 inline-flex items-center gap-2 px-10 py-5 bg-white text-slate-900 hover:bg-slate-100 rounded-full font-bold transition">
            <Mail size={20} /> Say Hello
          </a>
        </div>
      </Section>

      <footer className="py-8 text-center text-slate-600 text-sm">
        <p>Built with React, Tailwind & Anime.js V4</p>
        <p className="mt-2 text-slate-700">&copy; {new Date().getFullYear()} Harsh Goutam</p>
      </footer>
    </div>
  );
}

export default App;
