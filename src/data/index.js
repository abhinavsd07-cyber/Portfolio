// ─── Navigation ───────────────────────────────────────────────────────────────
export const NAV_LINKS = ['About', 'Skills', 'Projects', 'Experience', 'Contact']

import doctor from '../assets/doctor_appoinment.png'
import doctor1 from '../assets/doctor_appoinment1.png'
import doctor2 from '../assets/doctor_appoinment2.png'
import doctor3 from '../assets/doctor_appoinment3.png'
import doctor4 from '../assets/doctor_appoinment4.png'
import doctor5 from '../assets/doctor_appoinment5.png'
import doctor6 from '../assets/doctor_appoinment6.png'

import cineBook from '../assets/cineBook.png'
import cineBook1 from '../assets/cineBook1.png'
import cineBook2 from '../assets/cineBook2.png'
import cineBook3 from '../assets/cineBook3.png'
import cineBook4 from '../assets/cineBook4.png'
import cineBook5 from '../assets/cineBook5.png'
import cineBook6 from '../assets/cineBook6.png'
import cineBook7 from '../assets/cineBook7.png'
import  cineBook8 from '../assets/cineBook8.png'
import  cineBook9 from '../assets/cineBook9.png'
import  cineBook10 from '../assets/cineBook10.png'





import teaEstate from '../assets/teaEstate.png'
import teaEstate1 from '../assets/teaEstate1.png'

import skincare from '../assets/skincare.png'
import skincare1 from '../assets/skincare1.png'
import skincare2 from '../assets/skincare2.png'
import skincare3 from '../assets/skincare3.png'
import skincare4 from '../assets/skincare4.png'




const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

// ─── Skills ───────────────────────────────────────────────────────────────────
export const SKILLS = [
  { icon: `${DEVICON}/react/react-original.svg`, name: 'React',        level: 92, cat: 'Frontend' },
  { icon: `${DEVICON}/javascript/javascript-original.svg`, name: 'JavaScript',   level: 90, cat: 'Frontend' },
  { icon: `${DEVICON}/typescript/typescript-original.svg`, name: 'TypeScript',   level: 85, cat: 'Frontend' },
  { icon: `${DEVICON}/nextjs/nextjs-original.svg`, name: 'Next.js',      level: 88, cat: 'Frontend', invert: true },
  { icon: `${DEVICON}/html5/html5-original.svg`, name: 'HTML5',        level: 95, cat: 'Frontend' },
  { icon: `${DEVICON}/css3/css3-original.svg`, name: 'CSS3',         level: 87, cat: 'Frontend' },
  { icon: `${DEVICON}/nodejs/nodejs-original.svg`, name: 'Node.js',      level: 85, cat: 'Backend'  },
  { icon: `${DEVICON}/express/express-original.svg`, name: 'Express',      level: 82, cat: 'Backend', invert: true },
  { icon: `${DEVICON}/postgresql/postgresql-original.svg`, name: 'PostgreSQL',   level: 78, cat: 'Backend'  },
  { icon: `${DEVICON}/mongodb/mongodb-original.svg`, name: 'MongoDB',      level: 80, cat: 'Backend'  },
  { icon: `${DEVICON}/redis/redis-original.svg`, name: 'Redis',        level: 70, cat: 'Backend'  },
  { icon: `${DEVICON}/java/java-original.svg`, name: 'Java', level: 80, cat: 'Backend' },
  { icon: `${DEVICON}/python/python-original.svg`, name: 'Python', level: 85, cat: 'Backend' },
  { icon: `${DEVICON}/c/c-original.svg`, name: 'C', level: 75, cat: 'Backend' },
  { icon: `${DEVICON}/cplusplus/cplusplus-original.svg`, name: 'C++', level: 75, cat: 'Backend' },
  { icon: `${DEVICON}/docker/docker-original.svg`, name: 'Docker',       level: 75, cat: 'DevOps'   },
  { icon: `${DEVICON}/amazonwebservices/amazonwebservices-original-wordmark.svg`, name: 'AWS',          level: 72, cat: 'DevOps'   },
  { icon: `${DEVICON}/githubactions/githubactions-original.svg`, name: 'CI/CD',        level: 74, cat: 'DevOps'   },
  { icon: `${DEVICON}/github/github-original.svg`, name: 'Git / GitHub', level: 93, cat: 'DevOps', invert: true },
  { icon: `${DEVICON}/jest/jest-plain.svg`, name: 'Jest / Testing',level: 76, cat: 'Tools'   },
  { icon: `${DEVICON}/react/react-original.svg`, name: 'React Native', level: 70, cat: 'Tools'    },
]

export const SKILL_CATEGORIES = ['All', 'Frontend', 'Backend', 'DevOps', 'Tools']

// ─── Projects ─────────────────────────────────────────────────────────────────
export const PROJECTS = [
  {
    title: 'Doctor Appointment Booking & Management System',
    desc: 'Developed a full-stack platform supporting Admin, Doctor, and User roles with role-based access control. Implemented secure authentication using JWT and Google OAuth. Integrated Stripe for payments and Cloudinary for media handling.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'Stripe'],
    images: [doctor, doctor1,doctor2,doctor3,doctor4,doctor5,doctor6],
    github: 'https://github.com/abhinavsd07-cyber/doctor-booking-full-Folder.git',
    live: 'https://doctor-booking-frontend-virid.vercel.app/',
    featured: true,
  },
  {
    title: 'cineBook - Real-Time Movie Booking Platform',
    desc: 'Built a full-stack movie ticket booking application with real-time seat locking using Socket.io to prevent double bookings. Integrated Stripe for secure payments, AWS S3 for scalable media storage, and automated email confirmations via Nodemailer.',
    tags: ['MERN', 'Socket.io', 'Stripe', 'AWS S3'],
    images: [cineBook, cineBook1,cineBook2,cineBook3,cineBook4,cineBook5,cineBook6,cineBook7,cineBook8,cineBook9,cineBook10],
    github: 'https://github.com/abhinavsd07-cyber/CineBook.git',
    live: 'https://cinebook-black-eight.vercel.app/',
  },
  {
    title: 'Tea Estate Management System (Client Project)',
    desc: 'Developed a comprehensive management platform with secure role-based authentication and authorization. Implemented workflows for estate operations and activity tracking. Built robust REST APIs and optimized frontend state management.',
    tags: ['React', 'Node.js', 'Express', 'Tailwind CSS'],
    images: [teaEstate, teaEstate1],
    gradient: 'linear-gradient(135deg, #2c5e1a 0%, #112908 100%)',
    github: '',
    live: '',
  },
  {
    title: 'SkinCare Ai Analysis & Ecommerce (Ongoing)',
    desc: 'A next-generation e-commerce platform that integrates real-time computer vision to analyze facial skin conditions directly through a user"s webcam or mobile camera. Users can upload images or use their camera to get instant skin health reports and personalized product recommendations.The platform features advanced AI models for acne detection, wrinkle analysis, and skin tone evaluation, ensuring high accuracy and personalized care.',
    tags: ['React', 'Node.js', 'Express', 'Tailwind CSS'],
    images: [skincare,skincare1, skincare2,skincare3,skincare4],
    gradient: 'linear-gradient(135deg, #2c5e1a 0%, #112908 100%)',
    github: '',
    live: '',
  }
]

// ─── Experience ───────────────────────────────────────────────────────────────
export const EXPERIENCES = [
  {
    company: 'Aabasoft Technologies',
    url: 'https://www.aabasoft.com/in-en/',
    logo: 'https://www.google.com/s2/favicons?domain=aabasoft.com&sz=256',
    role: 'React Developer Intern',
    date: 'Jan 2026 – Present',
    desc: 'Built responsive and scalable UI components using React.js. Integrated REST APIs using Axios and optimized state management. Reduced UI bugs systematically and collaborated to deliver dynamic features.',
  },
  {
    company: 'Luminar Technolab',
    logo: 'https://www.google.com/s2/favicons?domain=luminartechnolab.com&sz=256',
    role: 'MERN Full Stack Developer Trainee',
    date: 'Jul 2025 – Jan 2026',
    desc: 'Developed and deployed 3+ MERN apps with authentication. Designed RESTful APIs handling CRUD operations with secure JWT auth. Structured applications using MVC architecture and built reusable components.',
  },
]

// ─── Testimonials ─────────────────────────────────────────────────────────────
export const TESTIMONIALS = [
  {
    text: 'Abhinav delivered our dashboard project ahead of schedule. His attention to detail and proactive communication made the entire process seamless. Highly recommended!',
    name: 'Sarah Mitchell',
    role: 'CTO at TechNova',
    initials: 'SM',
    color: '#737373',
  },
  {
    text: "Exceptional full-stack skills. The application he built scaled beautifully from day one. He brings creative solutions to complex problems effortlessly.",
    name: 'James Rodriguez',
    role: 'Founder at StartupHub',
    initials: 'JR',
    color: '#a3a3a3',
  },
  {
    text: "One of the most reliable developers I've worked with. Clean code, clear communication, and always delivers exactly what was discussed.",
    name: 'Priya Sharma',
    role: 'Product Manager at DataFlow',
    initials: 'PS',
    color: '#525252',
  },
]

// ─── Tech Strip ───────────────────────────────────────────────────────────────
export const TECH_STRIP = [
  { icon: `${DEVICON}/react/react-original.svg`, name: 'React'      },
  { icon: `${DEVICON}/nextjs/nextjs-original.svg`, name: 'Next.js'    },
  { icon: `${DEVICON}/javascript/javascript-original.svg`, name: 'JavaScript' },
  { icon: `${DEVICON}/typescript/typescript-original.svg`, name: 'TypeScript' },
  { icon: `${DEVICON}/nodejs/nodejs-original.svg`, name: 'Node.js'    },
  { icon: `${DEVICON}/postgresql/postgresql-original.svg`, name: 'PostgreSQL' },
  { icon: `${DEVICON}/mongodb/mongodb-original.svg`, name: 'MongoDB'    },
  { icon: `${DEVICON}/docker/docker-original.svg`, name: 'Docker'     },
  { icon: `${DEVICON}/amazonwebservices/amazonwebservices-original-wordmark.svg`, name: 'AWS'        },
  { icon: `${DEVICON}/tailwindcss/tailwindcss-original.svg`, name: 'Tailwind'   },
  { icon: `${DEVICON}/redis/redis-original.svg`, name: 'Redis'      },
  { icon: `${DEVICON}/github/github-original.svg`, name: 'GitHub'     },
]

// ─── Social Links ─────────────────────────────────────────────────────────────
export const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/abhinavsd07-cyber',
    icon: null,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/abhinav-s-d',
    icon: null,
  },
]

// ─── Hero Stats ───────────────────────────────────────────────────────────────
export const HERO_STATS = [
  { n: '2+',  label: 'Years Exp.' },
  { n: '4+', label: 'Major Projects'   },
  { n: '100%', label: 'MERN Stack'    },
  { n: '∞',   label: 'Code'  },
]

// ─── About Highlights ─────────────────────────────────────────────────────────
export const ABOUT_HIGHLIGHTS = [
  { 
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>', 
    title: 'Fast Delivery',  
    text: 'Efficient workflows & agile development'   
  },
  { 
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>', 
    title: 'Quality Code',   
    text: 'Clean, maintainable & well-tested code'    
  },
  { 
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>', 
    title: 'Team Player',    
    text: 'Strong communication & collaboration'       
  },
  { 
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>', 
    title: 'Growth Mindset', 
    text: 'Always learning new technologies'           
  },
]

// ─── Contact Info ─────────────────────────────────────────────────────────────
export const CONTACT_INFO = [
  { 
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>', 
    label: 'Email',         
    value: 'abhinavsd07@gmail.com'      
  },
  { 
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>', 
    label: 'Phone',         
    value: '+91 8301952285'             
  },
  { 
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>', 
    label: 'Location',      
    value: 'Thiruvananthapuram, Kerala' 
  },
  { 
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>', 
    label: 'Status',        
    value: 'React Developer Intern @ Aabasoft'         
  },
]