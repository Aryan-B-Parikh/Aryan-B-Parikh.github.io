'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThemeToggle } from '@/components/theme-toggle';
import { 
  Github, 
  Linkedin, 
  Instagram, 
  Download, 
  ExternalLink, 
  Code, 
  Database, 
  Brain, 
  Zap,
  Target,
  Users,
  Award,
  BookOpen,
  ChevronDown
} from 'lucide-react';

export default function Home() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const skills = {
    programming: [
      { name: 'Python', icon: '🐍', level: 90 },
      { name: 'C++', icon: '🔧', level: 85 },
      { name: 'C', icon: '⚡', level: 80 },
      { name: 'SQL', icon: '🗄️', level: 75 }
    ],
    datascience: [
      { name: 'Machine Learning', icon: '🤖', level: 85 },
      { name: 'Data Analysis', icon: '📊', level: 80 },
      { name: 'Deep Learning', icon: '🧠', level: 75 },
      { name: 'Statistics', icon: '📈', level: 70 }
    ],
    tools: [
      { name: 'Git', icon: '📝', level: 85 },
      { name: 'Linux', icon: '🐧', level: 70 },
      { name: 'Docker', icon: '🐳', level: 65 },
      { name: 'VS Code', icon: '💻', level: 90 }
    ]
  };

  const projects = [
    {
      title: 'Hospital Management System',
      description: 'A comprehensive terminal-based application for managing hospital operations including patient records, admissions, discharges, and billing systems.',
      technologies: ['Python', 'File I/O', 'OOP', 'Data Structures'],
      category: 'python',
      githubUrl: 'https://github.com/Aryan-B-Parikh/Python/blob/main/Projects/hospital_management.py',
      featured: true
    },
    {
      title: 'To-Do List Application',
      description: 'A command-line task management application with features for adding, viewing, and deleting tasks with persistent storage.',
      technologies: ['Python', 'File Handling', 'CLI', 'Algorithms'],
      category: 'python',
      githubUrl: 'https://github.com/Aryan-B-Parikh/Python/blob/main/Projects/To_Do_List_App.py',
      featured: false
    },
    {
      title: 'Quiz Game in C++',
      description: 'An interactive console-based quiz application featuring multiple-choice questions, score tracking, and user-friendly interface.',
      technologies: ['C++', 'STL', 'OOP', 'Console I/O'],
      category: 'cpp',
      githubUrl: 'https://github.com/Aryan-B-Parikh/CPP/blob/main/Projects/quiz.cpp',
      featured: false
    }
  ];

  const experiences = [
    {
      title: 'Computer Engineering Student',
      organization: 'University',
      period: '2021 - Present',
      description: 'Pursuing Bachelor\'s degree with focus on AI/ML and Data Science',
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      title: 'AI/ML Enthusiast',
      organization: 'Self-learning',
      period: '2022 - Present',
      description: 'Continuously learning and implementing AI/ML algorithms and data science techniques',
      icon: <Brain className="w-6 h-6" />
    },
    {
      title: 'Programming Projects',
      organization: 'Personal Portfolio',
      period: '2021 - Present',
      description: 'Developing various programming projects to enhance technical skills',
      icon: <Code className="w-6 h-6" />
    }
  ];

  const socialLinks = [
    { icon: Github, url: 'https://github.com/Aryan-B-Parikh', label: 'GitHub' },
    { icon: Linkedin, url: 'https://www.linkedin.com/in/aryan-parikh-548228316?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', label: 'LinkedIn' },
    { icon: Instagram, url: 'https://www.instagram.com/parikh_aryan_08', label: 'Instagram' }
  ];

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : activeTab === 'featured'
    ? projects.filter(project => project.featured)
    : projects.filter(project => project.category === activeTab);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 nav-glass ${
        isScrolled ? 'border-b' : ''
      }`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent cyan-text-glow">
            AP
          </div>
          <div className="hidden md:flex space-x-6">
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-muted-foreground hover:text-cyan-400 transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('skills')} 
              className="text-muted-foreground hover:text-cyan-400 transition-colors"
            >
              Skills
            </button>
            <button 
              onClick={() => scrollToSection('projects')} 
              className="text-muted-foreground hover:text-cyan-400 transition-colors"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-muted-foreground hover:text-cyan-400 transition-colors"
            >
              Contact
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button size="sm" className="btn-cyan" asChild>
              <a href="/resume.pdf" download>
                <Download className="w-4 h-4 mr-2" />
                Resume
              </a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden hero-bg">
        <div className="absolute inset-0 bg-grid-cyan/5 [mask-image:linear-gradient(0deg,#000,rgba(0,0,0,0.1))]" />
        
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-block p-4 rounded-full bg-cyan-500/10 mb-6 cyan-glow">
                <div className="text-4xl">👨‍💻</div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500 bg-clip-text text-transparent animate-gradient cyan-text-glow">
              Aryan Parikh
            </h1>
            
            <div className="text-xl md:text-2xl text-cyan-400 mb-8 font-light">
              AI/ML & Data Science Enthusiast
            </div>
            
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Computer Engineering student passionate about building intelligent systems and exploring 
              the intersection of data, algorithms, and artificial intelligence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="btn-cyan gap-2" asChild>
                <a href="/resume.pdf" download>
                  <Download className="w-5 h-5" />
                  Download Resume
                </a>
              </Button>
              <Button variant="outline" size="lg" className="gap-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10" onClick={() => scrollToSection('projects')}>
                <Code className="w-5 h-5" />
                View Projects
              </Button>
            </div>
            
            <div className="mt-16 animate-bounce">
              <ChevronDown className="w-8 h-8 mx-auto text-cyan-400" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about"
        ref={(el) => sectionRefs.current[0] = el}
        className="py-20 opacity-0 transform translate-y-8 transition-all duration-700 ease-out"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                About Me
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 mx-auto rounded-full cyan-glow" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I'm a passionate Computer Engineering student with a deep fascination for artificial intelligence, 
                  machine learning, and data science. My journey in technology has been driven by curiosity and 
                  the desire to create intelligent systems that can solve real-world problems.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  My expertise spans from low-level programming in C and C++ to high-level data analysis and 
                  machine learning implementation in Python. I believe in the power of data to drive decisions 
                  and the transformative potential of AI across industries.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm">Problem Solver</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm">AI Enthusiast</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm">Team Player</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm">Quick Learner</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {experiences.map((exp, index) => (
                  <Card key={index} className="tech-card hover-lift">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-cyan-400">{exp.icon}</div>
                        <CardTitle className="text-lg">{exp.title}</CardTitle>
                      </div>
                      <CardDescription className="text-sm">
                        {exp.organization} • {exp.period}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground">{exp.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section 
        id="skills"
        ref={(el) => sectionRefs.current[1] = el}
        className="py-20 bg-muted/30 opacity-0 transform translate-y-8 transition-all duration-700 ease-out"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                Skills & Expertise
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 mx-auto rounded-full cyan-glow" />
            </div>
            
            <Tabs defaultValue="programming" className="w-full">
              <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8 bg-black/50 border border-cyan-500/30">
                <TabsTrigger value="programming" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">Programming</TabsTrigger>
                <TabsTrigger value="datascience" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">Data Science</TabsTrigger>
                <TabsTrigger value="tools" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">Tools</TabsTrigger>
              </TabsList>
              
              {Object.entries(skills).map(([category, skillList]) => (
                <TabsContent key={category} value={category} className="mt-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    {skillList.map((skill, index) => (
                      <Card key={skill.name} className="tech-card hover-lift">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">{skill.icon}</div>
                              <h3 className="font-semibold">{skill.name}</h3>
                            </div>
                            <span className="text-sm text-cyan-400 font-medium">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="skill-progress h-2 rounded-full transition-all duration-700 ease-out"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        id="projects"
        ref={(el) => sectionRefs.current[2] = el}
        className="py-20 opacity-0 transform translate-y-8 transition-all duration-700 ease-out"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                Featured Projects
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 mx-auto rounded-full cyan-glow" />
            </div>
            
            <div className="flex justify-center mb-8">
              <div className="inline-flex p-1 bg-black/50 rounded-lg border border-cyan-500/30">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'all' 
                      ? 'bg-cyan-500/20 text-cyan-400 shadow-sm' 
                      : 'text-muted-foreground hover:text-cyan-400'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveTab('python')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'python' 
                      ? 'bg-cyan-500/20 text-cyan-400 shadow-sm' 
                      : 'text-muted-foreground hover:text-cyan-400'
                  }`}
                >
                  Python
                </button>
                <button
                  onClick={() => setActiveTab('cpp')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'cpp' 
                      ? 'bg-cyan-500/20 text-cyan-400 shadow-sm' 
                      : 'text-muted-foreground hover:text-cyan-400'
                  }`}
                >
                  C++
                </button>
                <button
                  onClick={() => setActiveTab('featured')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'featured' 
                      ? 'bg-cyan-500/20 text-cyan-400 shadow-sm' 
                      : 'text-muted-foreground hover:text-cyan-400'
                  }`}
                >
                  Featured
                </button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <Card key={index} className={`tech-card hover-lift ${
                  project.featured ? 'featured-project' : ''
                }`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl leading-tight">{project.title}</CardTitle>
                      {project.featured && (
                        <Badge variant="default" className="ml-2 bg-cyan-500/20 text-cyan-400 border-cyan-500/50">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-sm leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full gap-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        View on GitHub
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact"
        ref={(el) => sectionRefs.current[3] = el}
        className="py-20 bg-muted/30 opacity-0 transform translate-y-8 transition-all duration-700 ease-out"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 mx-auto rounded-full cyan-glow mb-8" />
            
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              I'm always excited to collaborate on interesting projects, discuss new opportunities, 
              or connect with fellow developers and AI enthusiasts. Feel free to reach out!
            </p>
            
            <div className="flex justify-center gap-6 mb-8">
              {socialLinks.map((link, index) => (
                <Button key={index} variant="outline" size="lg" className="social-link gap-2" asChild>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </a>
                </Button>
              ))}
            </div>
            
            <div className="glass rounded-lg p-8 max-w-2xl mx-auto border-cyan-500/20">
              <h3 className="text-2xl font-semibold mb-4 text-cyan-400">Get in Touch</h3>
              <p className="text-muted-foreground mb-6">
                Whether you have a question, want to collaborate, or just want to say hi, 
                I'd love to hear from you!
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-cyan-400" />
                  <span>GitHub: @Aryan-B-Parikh</span>
                </div>
                <div className="flex items-center gap-3">
                  <Linkedin className="w-5 h-5 text-cyan-400" />
                  <span>LinkedIn: Aryan Parikh</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cyan-500/20 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground mb-4 md:mb-0">
              © 2025 Aryan Parikh. All rights reserved.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <Button key={index} variant="ghost" size="sm" className="social-link" asChild>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    <link.icon className="w-4 h-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}