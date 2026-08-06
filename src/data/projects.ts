export interface ProjectData {
  id: string;
  number: string;
  category: string;
  title: string;
  sentence: string;
  proof: string;
  tags: string;
  liveLink?: string;
  imageUrl: string;
  objectPosition: string;
  accentColor: string;
}

export const PROJECTS: ProjectData[] = [
  {
    id: "skillforge",
    number: "01",
    category: "AI",
    title: "SkillForge AI",
    sentence: "Technical interviews, reimagined.",
    proof: "Live Product",
    tags: "React • AI",
    liveLink: "https://www.skillforge-ai.com/",
    imageUrl: "/images/projects/skillforge.png",
    objectPosition: "left top", 
    accentColor: "#0ea5e9", // SkillForge Blue
  },
  {
    id: "scraplink",
    number: "02",
    category: "Marketplace",
    title: "ScrapLink",
    sentence: "Modern infrastructure for the scrap economy.",
    proof: "Client Project",
    tags: "Node.js • Postgres",
    liveLink: "https://www.scraplink.in/",
    imageUrl: "/images/projects/scraplink.jpg",
    objectPosition: "center top",
    accentColor: "#f97316", // ScrapLink Orange
  },
  {
    id: "mallzo",
    number: "03",
    category: "Retail",
    title: "Mallzo",
    sentence: "Shopping designed for the mobile generation.",
    proof: "Startup",
    tags: "3D • WebGL",
    imageUrl: "/images/projects/mallzo.png",
    objectPosition: "center 20%",
    accentColor: "#fbbf24", // Mallzo Gold
  },
  {
    id: "feathermound",
    number: "04",
    category: "Commerce",
    title: "Feather Mound",
    sentence: "Luxury commerce built with precision.",
    proof: "Full-Stack",
    tags: "React • Node.js",
    liveLink: "https://feather-mound.vercel.app/",
    imageUrl: "/images/projects/feathermound.png",
    objectPosition: "center 30%",
    accentColor: "#fef3c7", // Feather Ivory
  },
  {
    id: "portfolio-animated",
    number: "05",
    category: "Studio",
    title: "Portfolio",
    sentence: "Engineering personality into every interaction.",
    proof: "Personal Product",
    tags: "WebGL • Motion",
    liveLink: "https://mohammed-junaid-vp.vercel.app/",
    imageUrl: "/images/projects/portfolio_animated.png",
    objectPosition: "center center",
    accentColor: "#a855f7", // Portfolio Purple
  },
  {
    id: "urbaniq",
    number: "06",
    category: "Real Estate",
    title: "Urbaniq",
    sentence: "Real estate without the enterprise complexity.",
    proof: "Internal Tool",
    tags: "Real-Time • WebSockets",
    imageUrl: "/images/projects/urbaniq.png",
    objectPosition: "center 40%",
    accentColor: "#10b981", // Urbaniq Green
  },
  {
    id: "safvan",
    number: "07",
    category: "Sports",
    title: "Safvan",
    sentence: "Every champion has a beginning.",
    proof: "Athlete Portfolio",
    tags: "GSAP • Cinematic",
    liveLink: "https://safvan-boxer.vercel.app/",
    imageUrl: "/images/projects/safvan.png",
    objectPosition: "center top",
    accentColor: "#dc2626", // Safvan Red
  }
];
