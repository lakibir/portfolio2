export type SocialLink = {
  label: string;
  href: string;
};

export type Skill = {
  name: string;
  level: number;
  category: string;
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  achievements: string[];
};

export type PortfolioProject = {
  id: string;
  title: string;
  description: string;
  image: string;
  categories: string[];
  stack: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
};

export type Metric = {
  label: string;
  value: string;
};

export const siteConfig = {
  name: "Portfolio",
  role: "Junior Full-Stack Developer",
  email: "lakbrmulatu@gmail.com",
  siteUrl: "https://portfolio-demo.vercel.app",
  githubUsername: "vercel",
  location: "Remote · Available worldwide",
  description:
    "Junior full-stack developer and 2026 Wollo University graduate, focused on building accessible, performant, and production-ready web applications.",
  intro:
    "I graduated in 2026 from Wollo University and have hands-on experience building full-stack products, from responsive interfaces to robust backend APIs.",
  availability: "Open to junior product engineering roles and select freelance work.",
  cvUrl: "/resume.pdf",
  heroImage: 
  "/n.jpg",
  heroImageAlt: "Portfolio portrait",
  socialLinks: [
    { label: "GitHub", href: "https://github.com/lakibir" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/avery-stone" },
    { label: "X", href: "https://x.com/averycodes" },
    { label: "Email", href: "mailto:lakbrmulatu@gmail.com" },
  ] satisfies SocialLink[],
};

export const metrics: Metric[] = [
  { label: "Graduation year", value: "2026" },
  { label: "Hands-on projects", value: "10+" },
  { label: "Average Lighthouse", value: "95+" },
];

export const aboutHighlights = [
  "Graduated in 2026 from Wollo University with a strong software engineering foundation.",
  "Built practical full-stack projects using Next.js, React, javaScript, and Node.js.",
  "Focused on clean code, performance optimization, accessibility, and user-centered interfaces.",
];

export const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
  "GraphQL",
  "Vercel",
  "Docker",
  "AWS",
];

export const skills: Skill[] = [
  { name: "Next.js", level: 96, category: "Frontend" },
  { name: "React", level: 95, category: "Frontend" },
  { name: "JavaScript", level: 94, category: "Frontend" },
  { name: "Tailwind CSS", level: 92, category: "Frontend" },
  { name: "Node.js", level: 91, category: "Backend" },
  { name: "PostgreSQL", level: 88, category: "Backend" },
  { name: "GraphQL", level: 86, category: "Backend" },
  { name: "Docker", level: 84, category: "Platform" },
  { name: "AWS", level: 82, category: "Platform" },
  { name: "Figma", level: 79, category: "Design" },
  { name: "Framer Motion", level: 90, category: "Design" },
  { name: "Three.js", level: 76, category: "Design" },
];

export const experiences: ExperienceItem[] = [
  {
    role: "Software Engineering Intern",
    company: "Medde Welabu Computing College",
    period: "2025 June 1 — 2025 August 30",
    location: "On-site",
    summary:
      "Developed and maintained web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js) in academic projects.",
    achievements: [
      "Built responsive user interfaces with HTML, CSS, JavaScript, and React.js.",
      "Assisted in developing RESTful APIs and backend services using Node.js and Express.js.",
      "Utilized MySQL and MongoDB for efficient data storage and management.",
      "Collaborated in team-based projects to implement login systems and CRUD functionality.",
    ],
  },
  {
    role: "Technology Club Participant",
    company: "Wollo University",
    period: "2025",
    location: "Campus",
    summary:
      "Participated in the university techno club through collaborative learning, project activities, and technical events.",
    achievements: [
      "Worked with peers on small technical projects and coding practice sessions.",
      "Attended club workshops focused on software tools and modern web development.",
      "Improved communication, teamwork, and presentation skills in technical discussions.",
    ],
  },
  
];

export const projects: PortfolioProject[] = [
  {
    id: "signalboard",
    title: "SignalBoard Analytics",
    description:
      "Multi-tenant analytics dashboard for tracking product metrics, alerts, and reporting.",
    image: "/projects/project-analytics.svg",
    categories: ["SaaS", "Analytics"],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
    githubUrl: "https://github.com/vercel/next.js",
    liveUrl: "https://nextjs.org",
    featured: true,
  },
  {
    id: "atelier-commerce",
    title: "Atelier Commerce",
    description:
      "E-commerce storefront with fast product browsing, editorial content, and checkout integration.",
    image: "/projects/project-commerce.svg",
    categories: ["E-commerce", "Brand"],
    stack: ["Next.js", "Stripe", "Sanity", "Framer Motion"],
    githubUrl: "https://github.com/vercel/commerce",
    liveUrl: "https://vercel.com/templates/next.js/nextjs-commerce",
    featured: true,
  },
  {
    id: "pulse-hiring",
    title: "Pulse Hiring Portal",
    description:
      "Hiring platform for managing candidate pipelines, interview workflows, and team collaboration.",
    image: "/projects/project-hiring.svg",
    categories: ["HR Tech", "Workflow"],
    stack: ["React", "Node.js", "GraphQL", "Docker"],
    githubUrl: "https://github.com/graphql/graphql-js",
    liveUrl: "https://graphql.org",
    featured: false,
  },
];

export const navigationItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export const projectFilters = ["All", "SaaS", "Analytics", "E-commerce", "Brand", "HR Tech", "Workflow"];
