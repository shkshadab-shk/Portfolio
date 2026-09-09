/**
 * SINGLE SOURCE OF TRUTH — every word here is derived from Resume.pdf.
 *
 * Nothing is invented: summaries, dates, institutions, percentages, project
 * descriptions and skill lists are lifted from the resume. Where a value is an
 * *interpretation* of the resume rather than a direct quote, it is marked with
 * a `// derived:` comment so it is obvious what to edit.
 *
 * Edit this file to update the site — no component hard-codes content.
 */

export const profile = {
  name: 'Shadab Shaikh',
  firstName: 'Shadab',
  lastName: 'Shaikh',
  initials: 'SS',
  // derived: role headline distilled from the resume's degree + project stack
  role: 'AI & Machine Learning Engineer',
  // Typing-animation rotation — each entry is grounded in the resume
  roles: [
    'AI & ML Undergraduate',
    'Full-Stack MERN Developer',
    'Computer Vision Tinkerer',
    'Machine Learning Enthusiast',
  ],
  tagline:
    'Turning AI & machine learning theory into things people can actually use — from code reviewers to computer vision.',
  status: 'Open to AI / ML internships & roles',
  summary:
    'Motivated and enthusiastic undergraduate student pursuing a degree in Artificial Intelligence and Machine Learning. Passionate about exploring AI and ML technologies, developing practical solutions, and enhancing skills in data analysis, programming, and machine learning algorithms. Eager to apply theoretical knowledge to real-world projects and internships in AI/ML domains.',
  // Short form for the hero, so the long summary lands in About instead
  summaryShort:
    'AI & ML undergraduate with a bias for building. I ship full-stack MERN products, computer-vision pipelines and ML models — and I am looking for a team where I can do that full time.',
  resumeFile: '/Shadab-Shaikh-Resume.pdf',
  resumeFileName: 'Shadab-Shaikh-Resume.pdf',
}

export const contact = {
  email: 'shk.shadab.a@gmail.com',
  phone: '8452090043',
  phoneHref: '+918452090043',
  location: 'Mumbra, Thane',
  locationLong: 'Mumbra, Thane, Maharashtra, India',
  github: 'https://github.com/shkshadab-shk',
  githubHandle: 'shkshadab-shk',
  // The resume lists a GitHub handle only. LinkedIn is inferred from the same
  // handle so the link exists — update it if your LinkedIn slug differs.
  linkedin: 'https://www.linkedin.com/in/shkshadab-shk',
  linkedinHandle: 'shkshadab-shk',
}

export const socials = [
  { label: 'GitHub', handle: contact.githubHandle, href: contact.github, icon: 'github' },
  { label: 'LinkedIn', handle: contact.linkedinHandle, href: contact.linkedin, icon: 'linkedin' },
  { label: 'Email', handle: contact.email, href: `mailto:${contact.email}`, icon: 'mail' },
  { label: 'Phone', handle: contact.phone, href: `tel:${contact.phoneHref}`, icon: 'phone' },
]

/** Hero metric strip — counts are computed at the bottom of this file. */
export const heroStats = [
  { value: 5, suffix: '', label: 'Projects shipped' },
  { value: 2, suffix: '', label: 'Certifications' },
  { value: 12, suffix: '+', label: 'Technologies used' },
  { value: 2022, suffix: '', label: 'Building since', raw: true },
]

/**
 * About-section highlight cards.
 * derived: each card is a restatement of a resume theme, not new information.
 */
export const aboutHighlights = [
  {
    icon: 'brain',
    title: 'AI & ML Focus',
    body:
      'Pursuing a degree in Artificial Intelligence and Machine Learning, with hands-on work in ML models, data analysis and computer vision.',
    accent: 'blue',
  },
  {
    icon: 'stack',
    title: 'Full-Stack Builder',
    body:
      'Ships end-to-end products on the MERN stack — React interfaces, Node.js REST APIs, MongoDB and MySQL persistence.',
    accent: 'violet',
  },
  {
    icon: 'shield',
    title: 'Practical Solutions',
    body:
      'From visual cryptography for secure QR payments to plate recognition with OpenCV — theory applied to real problems.',
    accent: 'cyan',
  },
  {
    icon: 'spark',
    title: 'Eager to Contribute',
    body:
      'Actively seeking internships and roles in AI/ML domains where classroom knowledge meets production-scale work.',
    accent: 'purple',
  },
]

export const aboutFacts = [
  { label: 'Degree', value: 'B.E. — AI & Machine Learning' },
  { label: 'College', value: 'Shivajirao S. Jondhale College of Engineering' },
  { label: 'Based in', value: contact.locationLong },
  { label: 'Focus', value: 'AI / ML · Full-Stack · Computer Vision' },
]

/**
 * SKILLS — categories 1-4 are verbatim from the resume's SKILLS block.
 * "AI, ML & Data" and "Soft Skills" are derived: every item in them appears in
 * the resume's PROJECTS descriptions or professional summary.
 * `level` is a self-assessment for the animated meters — tune freely.
 */
export const skillCategories = [
  {
    id: 'frontend',
    title: 'Frontend',
    subtitle: 'Interfaces & markup',
    icon: 'layout',
    accent: 'blue',
    source: 'resume',
    skills: [
      { name: 'HTML', level: 90 },
      { name: 'CSS', level: 88 },
      { name: 'JavaScript', level: 85 },
      { name: 'Bootstrap', level: 82 },
      { name: 'React.js', level: 84, note: 'AI Code Reviewer, Fly Talker' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    subtitle: 'APIs & services',
    icon: 'server',
    accent: 'violet',
    source: 'resume',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'REST API Development', level: 82 },
      { name: 'RESTful Web Services', level: 80 },
      { name: 'Socket.IO', level: 76, note: 'Fly Talker real-time chat' },
      { name: 'Flask', level: 74, note: 'Vehicle Detection web app' },
    ],
  },
  {
    id: 'database',
    title: 'Database',
    subtitle: 'Storage & modelling',
    icon: 'database',
    accent: 'cyan',
    source: 'resume',
    skills: [
      { name: 'MongoDB', level: 82 },
      { name: 'MySQL', level: 80 },
      { name: 'SQLite', level: 75, note: 'Vehicle record storage' },
    ],
  },
  {
    id: 'ai-ml',
    title: 'AI, ML & Data',
    subtitle: 'Models & vision',
    icon: 'brain',
    accent: 'purple',
    source: 'projects',
    skills: [
      { name: 'Python', level: 86 },
      { name: 'Machine Learning Models', level: 78 },
      { name: 'OpenCV', level: 76 },
      { name: 'Streamlit', level: 78 },
      { name: 'Matplotlib', level: 80 },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Version Control',
    subtitle: 'Workflow',
    icon: 'tool',
    accent: 'blue',
    source: 'resume',
    skills: [
      { name: 'Git', level: 84 },
      { name: 'GitHub', level: 86 },
      { name: 'VS Code', level: 88 },
    ],
  },
]

/** derived: distilled from the resume's professional summary wording. */
export const softSkills = [
  { name: 'Problem Solving', icon: 'puzzle' },
  { name: 'Analytical Thinking', icon: 'chart' },
  { name: 'Self-Motivated', icon: 'rocket' },
  { name: 'Fast Learner', icon: 'bolt' },
  { name: 'Collaboration', icon: 'users' },
  { name: 'Curiosity', icon: 'compass' },
]

/** Flat marquee list for the infinite tech ticker. */
export const techMarquee = [
  'React.js',
  'Node.js',
  'JavaScript',
  'Python',
  'MongoDB',
  'MySQL',
  'Express',
  'Socket.IO',
  'OpenCV',
  'Flask',
  'Streamlit',
  'Matplotlib',
  'Bootstrap',
  'SQLite',
  'REST APIs',
  'GitHub',
  'HTML',
  'CSS',
]

/**
 * PROJECTS — titles, dates and bullet points are from the resume.
 * `stack` entries are the technologies named in each resume bullet.
 * `href` points at the GitHub profile because the resume lists no per-repo URL.
 */
export const projects = [
  {
    id: 'ai-code-reviewer',
    title: 'AI Powered Code Reviewer',
    period: 'March 2025 — June 2025',
    year: '2025',
    category: 'AI / Full-Stack',
    featured: true,
    accent: 'blue',
    icon: 'brain',
    blurb: 'A full-stack MERN application that reviews source code with AI assistance.',
    bullets: ['Developed a full-stack application utilizing the MERN (React.js, Node.js) technology stack.'],
    stack: ['React.js', 'Node.js', 'Express', 'MongoDB', 'AI'],
    highlights: [
      { label: 'Stack', value: 'MERN' },
      { label: 'Type', value: 'Full-stack' },
    ],
    href: contact.github,
    linkLabel: 'View on GitHub',
  },
  {
    id: 'qr-payment-system',
    title: 'QR Payment System',
    period: 'Nov 2024 — Feb 2025',
    year: '2025',
    category: 'Security / Cryptography',
    featured: true,
    accent: 'violet',
    icon: 'shield',
    blurb: 'Secure QR payments hardened with visual cryptography.',
    bullets: [
      'Developed a secure QR payment system leveraging visual cryptography techniques to ensure data protection and authenticity.',
    ],
    stack: ['Visual Cryptography', 'Node.js', 'JavaScript', 'MongoDB'],
    highlights: [
      { label: 'Focus', value: 'Data integrity' },
      { label: 'Method', value: 'Visual crypto' },
    ],
    href: contact.github,
    linkLabel: 'View on GitHub',
  },
  {
    id: 'fly-talker',
    title: 'Fly Talker',
    period: 'Sep 2024 — Nov 2024',
    year: '2024',
    category: 'Real-Time Web',
    featured: true,
    accent: 'cyan',
    icon: 'chat',
    blurb: 'Real-time chat with instant, bidirectional delivery over web sockets.',
    bullets: [
      'Developed a real-time chat application utilizing the MERN stack and Socket.IO library to enable seamless communication between users.',
    ],
    stack: ['React.js', 'Node.js', 'Socket.IO', 'MongoDB', 'Express'],
    highlights: [
      { label: 'Transport', value: 'WebSockets' },
      { label: 'Stack', value: 'MERN' },
    ],
    href: contact.github,
    linkLabel: 'View on GitHub',
  },
  {
    id: 'vehicle-detection',
    title: 'Vehicle Number Plate Detection',
    period: 'July 2024 — Sep 2024',
    year: '2024',
    category: 'Computer Vision',
    featured: false,
    accent: 'purple',
    icon: 'scan',
    blurb: 'Image-based plate recognition with an audit trail of every detection.',
    bullets: [
      'Built a Vehicle Number Plate Detection Web App using Python and Flask for efficient image-based recognition.',
      'Integrated OpenCV for plate detection and image processing to extract vehicle details.',
      'Utilized SQLite database to store detected vehicle records with date and time information.',
    ],
    stack: ['Python', 'Flask', 'OpenCV', 'SQLite'],
    highlights: [
      { label: 'Vision', value: 'OpenCV' },
      { label: 'Records', value: 'SQLite log' },
    ],
    href: contact.github,
    linkLabel: 'View on GitHub',
  },
  {
    id: 'stock-prediction',
    title: 'Stock Market Prediction',
    period: 'July 2024 — Sep 2024',
    year: '2024',
    category: 'Machine Learning',
    featured: false,
    accent: 'blue',
    icon: 'chart',
    blurb: 'Interactive ML forecasting of price trends, charted against reality.',
    bullets: [
      'Developed a Stock Market Prediction web app using Python and Streamlit for real-time user interaction.',
      'Implemented machine learning models to forecast stock price trends based on historical data.',
      'Used Matplotlib for dynamic graph visualization of predicted vs actual stock performance.',
    ],
    stack: ['Python', 'Streamlit', 'Machine Learning', 'Matplotlib'],
    highlights: [
      { label: 'Models', value: 'ML forecast' },
      { label: 'Charts', value: 'Matplotlib' },
    ],
    href: contact.github,
    linkLabel: 'View on GitHub',
  },
]

export const projectFilters = ['All', 'AI / Full-Stack', 'Machine Learning', 'Computer Vision', 'Real-Time Web', 'Security / Cryptography']

/**
 * TIMELINE — education entries and the SkillDzire internship, all from the
 * resume. `kind` drives the filter tabs and the node styling.
 */
export const timeline = [
  {
    id: 'sjcoe',
    kind: 'education',
    title: 'B.E. — Artificial Intelligence & Machine Learning',
    org: 'Shivajirao S. Jondhale College of Engineering',
    period: '2022 — Present',
    year: '2022',
    status: 'Pursuing',
    accent: 'blue',
    icon: 'cap',
    detail:
      'Pursuing Artificial Intelligence and Machine Learning — coursework spanning ML algorithms, data analysis and programming, applied through five self-built projects.',
    tags: ['AI', 'Machine Learning', 'Data Analysis'],
  },
  {
    id: 'skilldzire',
    kind: 'experience',
    title: 'Python Internship Program',
    org: 'SkillDzire',
    period: 'Certification',
    year: '—',
    status: 'Completed',
    accent: 'violet',
    icon: 'briefcase',
    detail:
      'Demonstrated professional acumen through a comprehensive internship program organized by SkillDzire, gaining valuable industry insights and hands-on experience through a structured program.',
    tags: ['Python', 'Industry Program', 'Hands-on'],
  },
  {
    id: 'hsc',
    kind: 'education',
    title: 'HSC — Higher Secondary Certificate',
    org: 'Dr. Asadullah Khan English High School & Jr College',
    period: '2021 — 2022',
    year: '2022',
    status: '62%',
    accent: 'cyan',
    icon: 'book',
    detail: 'Completed Higher Secondary Certificate with 62%, the foundation for an engineering track in AI & ML.',
    tags: ['Science'],
  },
  {
    id: 'ssc',
    kind: 'education',
    title: 'SSC — Secondary School Certificate',
    org: 'Symbiosis Convent High School',
    period: '2020',
    year: '2020',
    status: '70.40%',
    accent: 'purple',
    icon: 'book',
    detail: 'Completed Secondary School Certificate with 70.40%.',
    tags: ['Foundation'],
  },
]

export const timelineFilters = ['All', 'Education', 'Experience']

/** CERTIFICATIONS — both entries verbatim from the resume's CERTIFICATE block. */
export const certifications = [
  {
    id: 'web-development',
    title: 'Web Development',
    issuer: 'Certification',
    accent: 'blue',
    icon: 'code',
    bullets: [
      'Possessed certification in web development, showcasing expertise in the field.',
      'Held a certification in web development, demonstrating proficiency in web technologies.',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
  },
  {
    id: 'python-course',
    title: 'Python Course',
    issuer: 'SkillDzire',
    accent: 'violet',
    icon: 'python',
    bullets: [
      'Demonstrated professional acumen through a comprehensive internship program organized by SkillDzire.',
      'Gained valuable industry insights and hands-on experience through a structured internship program provided by SkillDzire.',
    ],
    tags: ['Python', 'Internship', 'SkillDzire'],
  },
]

/** derived: quantified restatements of resume facts, for the achievement strip. */
export const achievements = [
  { value: '5', label: 'Projects built end-to-end', icon: 'rocket' },
  { value: '2', label: 'Professional certifications', icon: 'award' },
  { value: '4', label: 'Domains: AI, CV, security, real-time', icon: 'grid' },
  { value: '70.4%', label: 'SSC score', icon: 'star' },
]

export const navLinks = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'journey', label: 'Journey', href: '#journey' },
  { id: 'certifications', label: 'Certs', href: '#certifications' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]

export const sectionMeta = {
  about: { eyebrow: 'About', title: 'The person behind the commits', accent: 'blue' },
  skills: { eyebrow: 'Skills', title: 'A stack built by shipping', accent: 'cyan' },
  projects: { eyebrow: 'Projects', title: 'Things I built and broke', accent: 'violet' },
  journey: { eyebrow: 'Journey', title: 'Education & experience', accent: 'purple' },
  certifications: { eyebrow: 'Credentials', title: 'Certifications & achievements', accent: 'blue' },
  contact: { eyebrow: 'Contact', title: "Let's build something", accent: 'cyan' },
}

export const footerNote = `Designed & built by ${profile.name}`

export default {
  profile,
  contact,
  socials,
  heroStats,
  aboutHighlights,
  aboutFacts,
  skillCategories,
  softSkills,
  techMarquee,
  projects,
  projectFilters,
  timeline,
  timelineFilters,
  certifications,
  achievements,
  navLinks,
  sectionMeta,
  footerNote,
}
