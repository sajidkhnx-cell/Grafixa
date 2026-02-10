import React from 'react';
import { Service, Project, Review } from './types';

export const COMPANY_INFO = {
  name: 'Grafixa',
  phone: '0349-0099951',
  email: 'sajidkhanx4040@gmail.com',
  address: 'Nowshera, KPK, Pakistan',
  social: {
    facebook: 'https://www.facebook.com/share/1D7rPdeJ9t/',
    instagram: 'https://www.instagram.com/grafixaofficial',
    linkedin: 'https://www.linkedin.com/in/sajid-khn'
  }
};

// Custom SVG Icons
const Icons = {
  Branding: () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-brand-primary">
      <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 24L20 29L33 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 14V14.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 34V34.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 24H14.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M34 24H34.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Social: () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-brand-secondary">
      <path d="M36 10C36 13.3137 33.3137 16 30 16C26.6863 16 24 13.3137 24 10C24 6.68629 26.6863 4 30 4C33.3137 4 36 6.68629 36 10Z" stroke="currentColor" strokeWidth="2"/>
      <path d="M18 24C18 27.3137 15.3137 30 12 30C8.68629 30 6 27.3137 6 24C6 20.6863 8.68629 18 12 18C15.3137 18 18 20.6863 18 24Z" stroke="currentColor" strokeWidth="2"/>
      <path d="M42 38C42 41.3137 39.3137 44 36 44C32.6863 44 30 41.3137 30 38C30 34.6863 32.6863 32 36 32C39.3137 32 42 34.6863 42 38Z" stroke="currentColor" strokeWidth="2"/>
      <path d="M25.5 13.5L16.5 20.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16.5 27.5L31.5 34.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  SEO: () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-brand-accent">
      <path d="M22 38C30.8366 38 38 30.8366 38 22C38 13.1634 30.8366 6 22 6C13.1634 6 6 13.1634 6 22C6 30.8366 13.1634 38 22 38Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M42 42L33.3 33.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 26L20 20L24 24L28 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Ads: () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-blue-400">
       <path d="M22 6L10 16H4V32H10L22 42V6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
       <path d="M30 14C32.6522 16.6522 32.6522 20.9565 30 23.6087" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
       <path d="M35.6522 8.34784C40.9565 13.6522 40.9565 22.2609 35.6522 27.5652" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
};

// Translations Object
export const CONTENT = {
  en: {
    tagline: 'Professional Branding & Marketing Solutions',
    nav: {
      home: 'Home',
      services: 'Services',
      portfolio: 'Portfolio',
      reviews: 'Reviews',
      contact: 'Contact',
      cta: 'Get Started'
    },
    hero: {
      badge: 'Top Rated Agency in KPK',
      titlePrefix: 'Elevate Your',
      titleAnimated: ['Brand Identity', 'Digital Presence', 'Market Impact', 'Business Growth'],
      desc: 'We combine data-driven SEO strategies with world-class design to help your business grow.',
      btnPrimary: 'Start Your Project',
      btnSecondary: 'View Our Work'
    },
    services: {
      title: 'Our Expertise',
      subtitle: 'Full-service digital solutions tailored to your business goals.'
    },
    portfolio: {
      title: 'Featured Projects',
      subtitle: 'Successfully delivered for our clients.',
      cta: 'See All Projects'
    },
    stats: {
      projects: 'Projects Completed',
      satisfaction: 'Client Satisfaction',
      seo: 'SEO Agency in Region',
      support: 'Support Available'
    },
    ceo: {
      title: 'Meet The Visionary',
      subtitle: 'Leadership behind Grafixa',
      name: 'Sajid Khan',
      role: 'CEO & Founder',
      location: 'Nowshera, KPK, Pakistan',
      age: '22 Years Old',
      skillsTitle: 'Core Competencies',
      skills: [
        'Web Development (AI Integrated)',
        'Graphics Designing (Adobe Suite)',
        'Video Editing (Adobe & Capcut)',
        'Photo Editing (Photoshop & Lightroom)',
        'E-commerce Solutions',
        'Digital Marketing Strategy',
        'Professional Branding'
      ]
    },
    reviews: {
      title: 'Client Reviews'
    },
    contact: {
      title: 'Start Your Journey',
      subtitle: 'Ready to dominate your market? Contact Grafixa today for a free consultation.',
      chatWhatsapp: 'Chat on WhatsApp',
      labels: {
        name: 'Name',
        email: 'Email',
        message: 'Message',
        btn: 'Send Message'
      }
    },
    footer: {
      links: ['Privacy', 'Terms', 'Sitemap'],
      rights: 'Grafixa Agency. Professional Branding & Marketing Solutions.'
    }
  },
  ur: {
    tagline: 'پیشہ ورانہ برانڈنگ اور مارکیٹنگ کے حل',
    nav: {
      home: 'گھر',
      services: 'خدمات',
      portfolio: 'پورٹ فولیو',
      reviews: 'جائزے',
      contact: 'رابطہ',
      cta: 'شروع کریں'
    },
    hero: {
      badge: 'کے پی کے میں بہترین ایجنسی',
      titlePrefix: 'بہتر بنائیں اپنی',
      titleAnimated: ['برانڈ کی شناخت', 'ڈیجیٹل موجودگی', 'کاروباری اثر', 'کاروباری ترقی'],
      desc: 'ہم آپ کے کاروبار کو بڑھانے کے لیے عالمی معیار کے ڈیزائن کے ساتھ ڈیٹا پر مبنی مارکیٹنگ کی حکمت عملیوں کو یکجا کرتے ہیں۔',
      btnPrimary: 'پروجیکٹ شروع کریں',
      btnSecondary: 'ہمارا کام دیکھیں'
    },
    services: {
      title: 'ہماری مہارت',
      subtitle: 'آپ کے کاروباری اہداف کے مطابق مکمل ڈیجیٹل حل۔'
    },
    portfolio: {
      title: 'نمایاں پروجیکٹس',
      subtitle: 'ہمارے کلائنٹس کے لیے کامیابی سے مکمل کیے گئے۔',
      cta: 'تمام پروجیکٹس دیکھیں'
    },
    stats: {
      projects: 'مکمل پروجیکٹس',
      satisfaction: 'کلائنٹ کا اطمینان',
      seo: 'علاقے کی بہترین ایس ای او ایجنسی',
      support: 'سپورٹ دستیاب ہے'
    },
    ceo: {
      title: 'ہمارے سی ای او سے ملیں',
      subtitle: 'گرافیکسا کے پیچھے کا وژن',
      name: 'ساجد خان',
      role: 'سی ای او اور بانی',
      location: 'نوشہرہ، کے پی کے، پاکستان',
      age: '22 سال',
      skillsTitle: 'بنیادی مہارتیں',
      skills: [
        'ویب ڈویلپمنٹ (AI)',
        'گرافک ڈیزائننگ (Adobe)',
        'ویڈیو ایڈیٹنگ (Adobe/Capcut)',
        'فوٹو ایڈیٹنگ (Ps/Lr)',
        'ای کامرس کے حل',
        'ڈیجیٹل مارکیٹنگ',
        'پیشہ ورانہ برانڈنگ'
      ]
    },
    reviews: {
      title: 'کلائنٹ کے جائزے'
    },
    contact: {
      title: 'اپنا سفر شروع کریں',
      subtitle: 'مارکیٹ پر غلبہ حاصل کرنے کے لیے تیار ہیں؟ مفت مشورے کے لیے آج ہی گرافیکسا سے رابطہ کریں۔',
      chatWhatsapp: 'واٹس ایپ پر رابطہ کریں',
      labels: {
        name: 'نام',
        email: 'ای میل',
        message: 'پیغام',
        btn: 'پیغام بھیجیں'
      }
    },
    footer: {
      links: ['پرائیویسی', 'شرائط', 'سائٹ میپ'],
      rights: 'گرافیکسا ایجنسی۔ پیشہ ورانہ برانڈنگ اور مارکیٹنگ کے حل۔'
    }
  }
};

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Logo & Branding',
    description: 'Distinctive visual identities including logo design, color palettes, and brand voice development.',
    icon: <Icons.Branding />,
  },
  {
    id: '2',
    title: 'Social Media Mgmt',
    description: 'Strategic content creation and community management to boost engagement and brand loyalty.',
    icon: <Icons.Social />,
  },
  {
    id: '3',
    title: 'SEO & Web Growth',
    description: 'Search engine optimization strategies to ensure your business ranks high on Google.',
    icon: <Icons.SEO />,
  },
  {
    id: '4',
    title: 'Digital Ads',
    description: 'High-ROI ad campaigns across Facebook, Instagram, and Google specifically targeted to your audience.',
    icon: <Icons.Ads />,
  },
];

// Helper to get translated services
export const getServices = (lang: 'en' | 'ur') => {
  if (lang === 'en') return SERVICES;
  return [
    {
      id: '1',
      title: 'لوگو اور برانڈنگ',
      description: 'منفرد بصری شناخت بشمول لوگو ڈیزائن، رنگوں کی اسکیم، اور برانڈ کی آواز۔',
      icon: <Icons.Branding />,
    },
    {
      id: '2',
      title: 'سوشل میڈیا مینیجمنٹ',
      description: 'انگیجمنٹ اور برانڈ کی وفاداری بڑھانے کے لیے اسٹریٹجک مواد کی تخلیق۔',
      icon: <Icons.Social />,
    },
    {
      id: '3',
      title: 'ایس ای او اور ویب',
      description: 'گوگل پر آپ کے کاروبار کو اعلیٰ درجہ دینے کے لیے سرچ انجن آپٹیمائزیشن کی حکمت عملی۔',
      icon: <Icons.SEO />,
    },
    {
      id: '4',
      title: 'ڈیجیٹل اشتہارات',
      description: 'فیس بک، انسٹاگرام اور گوگل پر آپ کے سامعین کے لیے مخصوص اشتہاری مہمات۔',
      icon: <Icons.Ads />,
    },
  ];
}

export const PORTFOLIO: Project[] = [
  {
    id: '1',
    title: 'Creative Vision',
    category: 'Branding Identity',
    imageUrl: 'https://i.ibb.co/Mks8k9sH/file-0000000077607207acb07fd6f70b9e84-1.png',
  },
  {
    id: '2',
    title: 'Modern Aesthetics',
    category: 'Social Media Campaign',
    imageUrl: 'https://i.ibb.co/TG1HHs2/file-00000000619c7207b3993e1d2ed21158.png',
  },
  {
    id: '3',
    title: 'Future Tech',
    category: 'Digital Design',
    imageUrl: 'https://i.ibb.co/rR7THjSH/file-00000000aee47207bd0fe73da34f976e.png',
  },
  {
    id: '4',
    title: 'Urban Style',
    category: 'Product Marketing',
    imageUrl: 'https://i.ibb.co/dsw1m5KH/file-0000000011bc7207afbb317cecac8083.png',
  },
];

export const REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Dr. Amjid Khan',
    role: 'Professor of Homeopathy',
    content: "The branding for my clinic was exceptional. Grafixa understood exactly how to convey trust and professionalism.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&h=150&fit=crop&crop=faces"
  },
  {
    id: '2',
    name: 'Sarah Jenkins',
    role: 'CEO, Vitality',
    content: "Our wellness brand stands out on the shelves thanks to Grafixa's incredible logo and packaging design.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces"
  },
  {
    id: '3',
    name: 'Hamza Malik',
    role: 'JewelWave Owner',
    content: "They handled our entire social media launch. The engagement has been phenomenal since day one.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces"
  },
];