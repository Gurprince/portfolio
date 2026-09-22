import react from '../assets/logos/react.webp';
import node from '../assets/logos/nodejs.svg';
import express from '../assets/logos/express.svg';
import mongodb from '../assets/logos/mongodb.webp';
import mysql from '../assets/logos/mysql.svg';
import javascript from '../assets/logos/javascript.webp';
import css from '../assets/logos/css.webp';
import tailwind from '../assets/logos/tailwindcss.svg';
import wordpress from '../assets/logos/wordpress.webp';
import python from '../assets/logos/python.webp';
import cpp from '../assets/logos/cpp.webp';
import typescript from '../assets/logos/typescript.svg';
import html5 from '../assets/logos/html5.svg';
import sass from '../assets/logos/sass.svg';
import nestjs from '../assets/logos/nestjs.svg';
import php from '../assets/logos/php.svg';
import linux from '../assets/logos/linux.svg';
import mcp from '../assets/logos/mcp.svg';
import firebase from '../assets/logos/firebase.svg';
import vector from '../assets/logos/vector.svg';
import azure from '../assets/logos/azure.svg';
import azurefunctions from '../assets/logos/azurefunctions.svg';
import powerapps from '../assets/logos/powerapps.svg';
import powerautomate from '../assets/logos/powerautomate.svg';
import sharepoint from '../assets/logos/sharepoint.svg';
import teams from '../assets/logos/teams.svg';
import git from '../assets/logos/git.svg';
import github from '../assets/logos/github.svg';
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
  { value: 180, suffix: '+', label: 'developers trained in a 2-day React workshop' },
  { value: 1, label: 'granted patent, for an IoT notice board' },
  { value: 3, label: 'client websites built and deployed' },
];

/* client work, told from the résumé: problem, what I built, result */
export const cases = [
  {
    slug: 'healthicity',
    metric: '24h → 7s',
    metricLabel: 'Healthicity report generation, rebuilt',
    client: 'Healthicity',
    via: 'Penthara Technologies',
    title: 'A day-long report, down to seconds',
    diagram: 'bars',
    problem: 'Healthicity’s data reports took up to 24 hours to generate, so decisions waited a full day on the numbers.',
    built: 'I engineered a new reporting feature in React and PHP to replace the day-long generation step.',
    result: 'Reports now come back in 3–7 seconds, about 99.99% faster, and decisions no longer wait on the data.',
    stack: ['React.js', 'PHP'],
  },
  {
    slug: 'standish',
    metric: '0',
    metricLabel: 'manual document uploads left for Standish',
    client: 'Standish',
    via: 'Penthara Technologies',
    title: 'No more manual uploads',
    diagram: 'flow',
    problem: 'Documents reached Azure Blob Storage by hand, and SharePoint files had to be moved over manually.',
    built: 'I designed and deployed Azure Logic App and Power Automate flows that pick up SharePoint files and file them into Blob Storage, in a structured, client-named folder layout.',
    result: 'Manual uploads dropped to zero, and every file lands where the team expects it.',
    stack: ['Logic Apps', 'Power Automate', 'SharePoint'],
  },
  {
    slug: 'penthara',
    metric: '1 platform',
    metricLabel: 'for leave, timesheets, projects and reporting at Penthara',
    client: 'Voyager',
    via: 'Penthara Technologies',
    title: 'One workspace for projects, people and time',
    diagram: 'system',
    problem: 'Penthara needed one internal tool for HR and day-to-day team operations: managing leave and timesheets, running projects, and seeing who is working on what.',
    built: 'I built a multi-tenant workforce platform end to end in React and NestJS. Each organisation gets its own workspace, with Microsoft Teams integration and automated email workflows. I also added AI: semantic search on a vector database, and custom MCP servers for context-aware features.',
    result: 'Leave, timesheets, projects and reporting now run through one platform, and managers can see team capacity and project risk at a glance.',
    features: [
      { name: 'Workspaces', text: 'Each organisation gets its own workspace, isolated by the multi-tenant architecture.' },
      { name: 'Projects, tasks and subtasks', text: 'Plan work inside a workspace and break it down into tasks and subtasks.' },
      { name: 'Timesheets', text: 'Employees log time against the work they did.' },
      { name: 'Leave management', text: 'Leave requests and approvals in the same place as the work.' },
      { name: 'Employee capacity', text: 'See how occupied each person is before assigning new work.' },
      { name: 'RAG reports', text: 'Red, amber and green status reporting across projects.' },
      { name: 'Risk reports', text: 'Track and surface project risks for managers.' },
      { name: 'Teams, email and AI search', text: 'Microsoft Teams integration, automated emails, and semantic search built on a vector database.' },
    ],
    live: { label: 'Voyager', url: 'https://voyager.penthara.com' },
    stack: ['React.js', 'NestJS', 'Vector search', 'MCP servers', 'Teams'],
  },
];

/* rotating results in the hero; each one opens its case study */
export const results = cases.map((c) => ({ metric: c.metric, label: c.metricLabel, slug: c.slug }));

export const caseBySlug = (slug) => cases.find((c) => c.slug === slug);

/* one logo per tech name, shared by the marquee and the skill chips */
const logos = {
  'React.js': react, TypeScript: typescript, JavaScript: javascript, HTML5: html5, CSS3: css,
  'Tailwind CSS': tailwind, SCSS: sass,
  'Node.js': node, 'Express.js': express, NestJS: nestjs, PHP: php, LAMP: linux, 'MCP servers': mcp,
  MongoDB: mongodb, MySQL: mysql, Firebase: firebase, 'Vector search': vector,
  'Logic Apps': azure, 'Azure Logic Apps': azure, 'Function Apps': azurefunctions, 'Power Apps': powerapps,
  'Power Automate': powerautomate, SharePoint: sharepoint, SPFx: sharepoint, Teams: teams,
  Python: python, 'C++': cpp, WordPress: wordpress, Git: git, GitHub: github,
};

export const logoFor = (name) => logos[name];

export const stack = [
  'React.js', 'NestJS', 'Node.js', 'Express.js', 'PHP', 'JavaScript', 'Azure Logic Apps', 'Power Automate',
  'MongoDB', 'MySQL', 'MCP servers', 'Tailwind CSS', 'CSS3', 'WordPress', 'Python', 'C++',
].map((name) => ({ name, logo: logos[name] }));

export const projects = [
  {
    name: 'SkillMentor',
    kind: 'AI learning platform',
    tone: 'graphite',
    image: skillmentorShot,
    repo: 'https://github.com/Gurprince/Skill-Mentor',
    ratio: '2 / 1',
    desc: 'Pick a target role, like Frontend Developer or DevOps Engineer, and get a personalised roadmap with curated resources, tasks and milestones. AI reviews each finished task, gives feedback and adjusts the path.',
    tags: ['React.js', 'Node.js', 'MongoDB', 'REST APIs', 'AI'],
  },
  {
    name: 'DevDeck',
    kind: 'Developer productivity',
    tone: 'accent',
    image: devdeckShot,
    repo: 'https://github.com/Gurprince/dev-deck',
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
    repo: 'https://github.com/Gurprince/Ai-TaskRecommend',
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
    cases: ['healthicity', 'standish', 'penthara'],
    points: [
      'Rebuilt a React + PHP reporting feature for Healthicity: generation went from 24 hours to 3–7 seconds.',
      'Built Azure Logic Apps and Power Automate flows for Standish that removed manual uploads to Blob Storage and filed SharePoint documents into client-named folders automatically.',
      'Built a multi-tenant workforce platform in React and NestJS: workspaces, projects with tasks and subtasks, timesheets, leave, capacity tracking, and RAG and risk reports.',
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

/* `used` says where each skill shows up in real work, straight from the résumé */
export const skills = [
  {
    group: 'Frontend',
    items: [
      { name: 'React.js', used: 'SkillMentor, DevDeck and SkillSync, plus the Healthicity reporting feature that went from 24 hours to 3–7 seconds.' },
      { name: 'TypeScript', used: 'NestJS services behind Voyager, Penthara’s workforce platform.' },
      { name: 'JavaScript', used: 'My everyday language across React and Node, since my first internship at Speedum Technology.' },
      { name: 'HTML5', used: 'Every interface I ship, starting with web apps at Speedum Technology.' },
      { name: 'CSS3', used: 'Responsive, user-facing interfaces for new product features at CFZ Technologies.' },
      { name: 'Tailwind CSS', used: 'Utility-first styling for fast, consistent React interfaces.' },
      { name: 'SCSS', used: 'Structured, reusable stylesheets for larger interfaces.' },
    ],
  },
  {
    group: 'Backend',
    items: [
      { name: 'Node.js', used: 'Back ends for SkillMentor, DevDeck and SkillSync, and the Indy Truck and LensFillers client sites.' },
      { name: 'Express.js', used: 'DevDeck’s API, with Owner, Editor and Viewer access control.' },
      { name: 'NestJS', used: 'Voyager, Penthara’s workforce platform: multi-tenant workspaces, projects, timesheets, leave, RAG and risk reports.' },
      { name: 'PHP', used: 'The Healthicity reporting feature, rebuilt from 24 hours down to 3–7 seconds, and a React + PHP client platform.' },
      { name: 'LAMP', used: 'Running and extending PHP client platforms at Penthara.' },
      { name: 'MCP servers', used: 'Custom Model Context Protocol servers that power context-aware AI features at Penthara.' },
    ],
  },
  {
    group: 'Data',
    items: [
      { name: 'MongoDB', used: 'The data layer for SkillMentor, DevDeck and SkillSync.' },
      { name: 'MySQL', used: 'The relational side of LAMP, behind PHP client platforms.' },
      { name: 'Firebase', used: 'Indy Truck & Trailer Repair and LensFillers, both live today.' },
      { name: 'Vector search', used: 'Semantic search inside Penthara’s NestJS app, built on a vector database.' },
    ],
  },
  {
    group: 'Microsoft & Azure',
    items: [
      { name: 'Logic Apps', used: 'Flows for Standish that removed manual document uploads to Azure Blob Storage entirely.' },
      { name: 'Function Apps', used: 'Serverless tasks alongside Logic App and Power Automate flows.' },
      { name: 'Power Apps', used: 'SharePoint-connected apps built at Penthara.' },
      { name: 'Power Automate', used: 'Standish’s SharePoint-to-Blob pipeline and automated email-attachment handling.' },
      { name: 'SharePoint', used: 'Automatic file ingestion into client-named Blob Storage folders.' },
      { name: 'SPFx', used: 'SharePoint Framework web parts and extensions.' },
      { name: 'Teams', used: 'Microsoft Teams integration in Voyager, Penthara’s workforce platform.' },
    ],
  },
  {
    group: 'Languages',
    items: [
      { name: 'Python', used: 'Scripting, automation and problem solving.' },
      { name: 'C++', used: 'Data structures and algorithms, from my B.Tech coursework onward.' },
    ],
  },
  {
    group: 'Tools',
    items: [
      { name: 'WordPress', used: 'A client website built and deployed at Penthara.' },
      { name: 'Git', used: 'Version control on every project.' },
      { name: 'GitHub', used: 'Where my code lives: github.com/Gurprince.' },
    ],
  },
];

export const education = [
  { years: ['2022', '26'], title: 'B.Tech, Computer Science & Engineering', where: 'GNA University, Phagwara', note: 'Full stack development, data structures & algorithms, web technologies.' },
  { years: ['2021', '22'], title: 'Senior Secondary (CBSE)', where: 'Akal Academy Tibber', note: '86%, second in school.' },
];

export const recognition = [
  { figure: '2nd', text: 'Place in an inter-college web design competition' },
  { figure: '180+', text: 'Participants in a 2-day React.js workshop I ran on components, state and hooks' },
  { figure: '28h', text: 'To build an AI tutor suite with a 5-person team at GNA Hackathon' },
  { figure: 'Lead', text: 'Coordinator for Coding Mania and several gaming events' },
];
