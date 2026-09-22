import react from '../assets/logos/react.webp';
import node from '../assets/logos/node.webp';
import express from '../assets/logos/express.webp';
import mongodb from '../assets/logos/mongodb.webp';
import mysql from '../assets/logos/mysql.webp';
import javascript from '../assets/logos/javascript.webp';
import css from '../assets/logos/css.webp';
import tailwind from '../assets/logos/tailwind.webp';
import wordpress from '../assets/logos/wordpress.webp';
import python from '../assets/logos/python.webp';
import cpp from '../assets/logos/cpp.webp';
import skillsyncShot from '../assets/projects/skillsync.webp';
import lensfillersShot from '../assets/projects/lensfillers.webp';
import skillmentorShot from '../assets/projects/skillmentor.webp';
import devdeckShot from '../assets/projects/devdeck.webp';
import indytruckShot from '../assets/projects/indytruck.webp';

export const contact = {
  email: 'gurprince151@gmail.com',
  phone: '+91 78883 62208',
  phoneHref: 'tel:+917888362208',
  github: 'https://github.com/Gurprince',
  linkedin: 'https://linkedin.com/in/gurprince-singh-b572b9221',
  resume: '/Resume_Gurprince_Singh.pdf',
};

export const numbers = [
  { value: 99.99, decimals: 2, suffix: '%', label: 'faster report generation for a client' },
  { value: 180, suffix: '+', label: 'developers trained in a 2-day React workshop' },
  { value: 1, label: 'granted patent for an IoT notice board' },
  { value: 4, label: 'companies shipped for since 2024' },
];

export const stack = [
  { name: 'React.js', logo: react },
  { name: 'NestJS' },
  { name: 'Node.js', logo: node },
  { name: 'Express.js', logo: express },
  { name: 'PHP' },
  { name: 'JavaScript', logo: javascript },
  { name: 'Azure Logic Apps' },
  { name: 'Power Automate' },
  { name: 'MongoDB', logo: mongodb },
  { name: 'MySQL', logo: mysql },
  { name: 'MCP servers' },
  { name: 'Tailwind CSS', logo: tailwind },
  { name: 'CSS3', logo: css },
  { name: 'WordPress', logo: wordpress },
  { name: 'Python', logo: python },
  { name: 'C++', logo: cpp },
];

export const projects = [
  {
    name: 'SkillMentor',
    kind: 'AI learning platform',
    tone: 'graphite',
    image: skillmentorShot,
    ratio: '2 / 1',
    desc: 'Pick a target role, like Frontend Developer or DevOps Engineer, and get a personalised roadmap with curated resources, tasks and milestones. AI reviews each finished task, gives feedback and adjusts the path.',
    tags: ['React.js', 'Node.js', 'MongoDB', 'REST APIs', 'AI'],
  },
  {
    name: 'DevDeck',
    kind: 'Developer productivity',
    tone: 'accent',
    image: devdeckShot,
    ratio: '2 / 1',
    desc: 'One workspace in place of five tools: a Kanban board, a searchable snippet library, docs with version history, custom dashboards and live notifications. Owner, Editor and Viewer roles keep team data safe.',
    tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'RBAC'],
  },
  {
    name: 'Smart Notice Board',
    kind: 'Granted patent',
    tone: 'light',
    art: 'board',
    desc: 'An IoT display system built as two sites: a sender portal where notices are written, and a receiver site hosted on a Raspberry Pi that shows them on screen in real time.',
    tags: ['Raspberry Pi', 'IoT', 'Real-time web'],
  },
  {
    name: 'SkillSync',
    kind: 'AI recommendations',
    tone: 'deep',
    image: skillsyncShot,
    desc: "A productivity app that suggests tasks based on each person's skills. The recommendation engine made people more likely to finish the tasks they started.",
    tags: ['React.js', 'Node.js', 'MongoDB', 'REST APIs'],
  },
];

export const freelance = [
  { name: 'Indy Truck & Trailer Repair', what: 'Business site for a truck and trailer repair shop', url: 'https://indytruckrepair.us', label: 'indytruckrepair.us', image: indytruckShot },
  { name: 'LensFillers', what: 'Portfolio for a photographer and filmmaker', url: 'https://lensfillers.ca', label: 'lensfillers.ca', image: lensfillersShot },
];

export const roles = [
  {
    when: 'Jul 2026 – now',
    title: 'Full Stack Developer',
    org: 'CFZ Technologies, Mohali',
    points: [
      'Build end-to-end features across the frontend and backend of a high-traffic web application.',
      'Designed complex calculation and business-logic modules for accurate, real-time data processing.',
      'Built responsive interfaces for new product features.',
    ],
  },
  {
    when: 'Oct 2025 – Jun 2026',
    title: 'Software Developer Intern',
    org: 'Penthara Technologies, Mohali',
    points: [
      'Rebuilt a React + PHP reporting feature for Healthicity: generation went from 24 hours to 3–7 seconds.',
      'Built Azure Logic Apps and Power Automate flows for Standish that removed manual uploads to Blob Storage and filed SharePoint documents into client-named folders automatically.',
      'Built an internal employee management app in React and NestJS with multi-tenancy, MS Teams integration and automated emails.',
      'Added semantic search with a vector database and wrote custom MCP servers for context-aware AI features.',
      'Made Power Apps on SharePoint and flows that handle email attachments and Blob Storage pipelines.',
      'Shipped a client WordPress site and new features on a React + PHP client platform.',
    ],
  },
  {
    when: 'Jun – Jul 2025',
    title: 'Junior Software Intern',
    org: 'Logicsoft International, Gurgaon',
    points: ['Built a company AI chatbot platform and designed its UX and landing page to improve onboarding.'],
  },
  {
    when: 'Jan – Sep 2024',
    title: 'Software Developer Intern',
    org: 'Speedum Technology, Punjab',
    points: ['Developed and debugged web apps in HTML, CSS, JavaScript and React.js, with training in component architecture and ES6+.'],
  },
];

export const skills = [
  { group: 'Frontend', items: 'React.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, SCSS' },
  { group: 'Backend', items: 'Node.js, Express.js, NestJS, PHP, LAMP, MCP server development' },
  { group: 'Data', items: 'MongoDB, MySQL, Firebase, vector databases for semantic search' },
  { group: 'Microsoft & Azure', items: 'Logic Apps, Function Apps, Power Apps, Power Automate, SharePoint, SPFx, Teams integration' },
  { group: 'Languages', items: 'Python, C++' },
  { group: 'Tools', items: 'WordPress, Git, GitHub' },
];

export const education = [
  { title: 'B.Tech, Computer Science & Engineering', where: 'GNA University, Phagwara, 2022–2026', note: 'Full stack development, data structures & algorithms, web technologies.' },
  { title: 'Senior Secondary (CBSE)', where: 'Akal Academy Tibber, 2021–2022', note: '86%, second in school.' },
];

export const recognition = [
  '2nd place, inter-college web design competition',
  'Ran a 2-day React.js workshop for 180+ participants: components, state and hooks',
  'Built an AI tutor suite in 28 hours with a 5-person team at GNA Hackathon',
  'Coordinated Coding Mania and several gaming events',
];
