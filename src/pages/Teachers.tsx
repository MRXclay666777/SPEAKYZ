import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  Users, 
  Star,
  Globe,
  Award,
  Clock,
  MessageCircle,
  Video,
  Calendar,
  Filter,
  Search,
  ChevronDown,
  Play,
  BookOpen,
  Languages,
  GraduationCap,
  Heart,
  CheckCircle
} from 'lucide-react';
import { useLanguage } from '../providers/LanguageProvider';

interface Teacher {
  id: string;
  name: string;
  avatar: string;
  title: string;
  specialties: string[];
  languages: string[];
  experience: number;
  rating: number;
  reviews: number;
  students: number;
  lessonsCompleted: number;
  hourlyRate: number;
  availability: string[];
  timezone: string;
  country: string;
  flag: string;
  bio: string;
  education: string[];
  certifications: string[];
  teachingStyle: string;
  videoIntro: string;
  featured?: boolean;
  online?: boolean;
}

const Teachers: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('rating');
  const [showFilters, setShowFilters] = useState(false);
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const teachers: Teacher[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      title: 'Certified English Teacher & IELTS Expert',
      specialties: ['IELTS Preparation', 'Business English', 'Conversation'],
      languages: ['English (Native)', 'Spanish (Fluent)', 'French (Intermediate)'],
      experience: 8,
      rating: 4.9,
      reviews: 1247,
      students: 3420,
      lessonsCompleted: 8750,
      hourlyRate: 35,
      availability: ['Mon-Fri: 9AM-6PM', 'Sat: 10AM-4PM'],
      timezone: 'EST (UTC-5)',
      country: 'United States',
      flag: '🇺🇸',
      bio: 'Passionate English teacher with 8+ years of experience helping students achieve their language goals. Specialized in IELTS preparation with a 95% success rate.',
      education: ['MA in Applied Linguistics - Columbia University', 'BA in English Literature - NYU'],
      certifications: ['TESOL Certified', 'IELTS Official Examiner', 'Cambridge CELTA'],
      teachingStyle: 'Interactive and student-centered approach with focus on practical communication skills',
      videoIntro: 'https://example.com/video1',
      featured: true,
      online: true
    },
    {
      id: '2',
      name: 'Michael Chen',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      title: 'Business English Specialist',
      specialties: ['Business English', 'Professional Communication', 'Interview Preparation'],
      languages: ['English (Native)', 'Mandarin (Native)', 'Japanese (Conversational)'],
      experience: 12,
      rating: 4.8,
      reviews: 892,
      students: 2156,
      lessonsCompleted: 6430,
      hourlyRate: 42,
      availability: ['Mon-Fri: 8AM-8PM', 'Weekend by appointment'],
      timezone: 'PST (UTC-8)',
      country: 'Canada',
      flag: '🇨🇦',
      bio: 'Former corporate executive turned English teacher. Specializes in helping professionals advance their careers through improved English communication.',
      education: ['MBA - University of Toronto', 'BA in International Business - UBC'],
      certifications: ['TESOL Advanced', 'Business English Specialist', 'Corporate Training Certified'],
      teachingStyle: 'Results-oriented with real-world business scenarios and practical applications',
      videoIntro: 'https://example.com/video2',
      featured: true,
      online: true
    },
    {
      id: '3',
      name: 'Emma Wilson',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      title: 'Cambridge & TOEFL Expert',
      specialties: ['Cambridge Exams', 'TOEFL', 'Academic English', 'Grammar'],
      languages: ['English (Native)', 'German (Fluent)', 'Italian (Intermediate)'],
      experience: 10,
      rating: 4.9,
      reviews: 1456,
      students: 4230,
      lessonsCompleted: 12500,
      hourlyRate: 38,
      availability: ['Mon-Sat: 7AM-9PM'],
      timezone: 'GMT (UTC+0)',
      country: 'United Kingdom',
      flag: '🇬🇧',
      bio: 'Cambridge certified teacher with extensive experience in exam preparation. Helped over 4000 students achieve their target scores.',
      education: ['MA in English Language Teaching - Cambridge University', 'BA in Modern Languages - Oxford'],
      certifications: ['Cambridge DELTA', 'TOEFL iBT Specialist', 'Academic English Certified'],
      teachingStyle: 'Systematic and thorough approach with personalized study plans and regular progress assessments',
      videoIntro: 'https://example.com/video3',
      featured: true,
      online: true
    },
    {
      id: '4',
      name: 'David Brown',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      title: 'Conversation & Pronunciation Coach',
      specialties: ['Conversation Practice', 'Pronunciation', 'Accent Reduction', 'Fluency'],
      languages: ['English (Native)', 'Portuguese (Fluent)', 'Spanish (Conversational)'],
      experience: 6,
      rating: 4.7,
      reviews: 987,
      students: 1890,
      lessonsCompleted: 5670,
      hourlyRate: 28,
      availability: ['Daily: 6AM-10PM'],
      timezone: 'AEST (UTC+10)',
      country: 'Australia',
      flag: '🇦🇺',
      bio: 'Energetic conversation coach focused on building confidence and fluency. Uses innovative techniques to improve pronunciation and natural speech patterns.',
      education: ['BA in Communications - University of Sydney', 'Diploma in Speech Therapy'],
      certifications: ['TESOL Certified', 'Pronunciation Specialist', 'Conversation Coach Certified'],
      teachingStyle: 'Fun and engaging with emphasis on natural conversation and confidence building',
      videoIntro: 'https://example.com/video4',
      online: true
    },
    {
      id: '5',
      name: 'Jennifer Taylor',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      title: 'Advanced English & Literature Expert',
      specialties: ['Advanced English', 'Literature', 'Academic Writing', 'Critical Thinking'],
      languages: ['English (Native)', 'French (Fluent)', 'Latin (Academic)'],
      experience: 15,
      rating: 4.9,
      reviews: 743,
      students: 1567,
      lessonsCompleted: 4890,
      hourlyRate: 45,
      availability: ['Mon-Fri: 10AM-6PM'],
      timezone: 'EST (UTC-5)',
      country: 'United States',
      flag: '🇺🇸',
      bio: 'PhD in English Literature with 15 years of teaching experience. Specializes in advanced English skills and academic writing for university-bound students.',
      education: ['PhD in English Literature - Harvard', 'MA in Creative Writing - Yale', 'BA in English - Princeton'],
      certifications: ['University Teaching Certified', 'Academic Writing Specialist', 'Literature Analysis Expert'],
      teachingStyle: 'Scholarly approach with deep analysis and critical thinking development',
      videoIntro: 'https://example.com/video5',
      featured: true,
      online: true
    },
    {
      id: '6',
      name: 'Lisa Anderson',
      avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      title: 'Kids English Specialist',
      specialties: ['Kids English', 'Young Learners', 'Interactive Learning', 'Games & Activities'],
      languages: ['English (Native)', 'Sign Language (Fluent)'],
      experience: 9,
      rating: 4.8,
      reviews: 2134,
      students: 5670,
      lessonsCompleted: 15400,
      hourlyRate: 32,
      availability: ['Mon-Fri: 3PM-8PM', 'Sat-Sun: 9AM-5PM'],
      timezone: 'CST (UTC-6)',
      country: 'United States',
      flag: '🇺🇸',
      bio: 'Dedicated kids English teacher with a passion for making learning fun and engaging. Expert in age-appropriate teaching methods and interactive activities.',
      education: ['MEd in Elementary Education - University of Texas', 'BA in Child Development - UT Austin'],
      certifications: ['Young Learners Specialist', 'TESOL for Children', 'Interactive Learning Certified'],
      teachingStyle: 'Fun, interactive, and age-appropriate with games, songs, and creative activities',
      videoIntro: 'https://example.com/video6',
      online: true
    }
  ];

  const specialties = [
    { value: 'all', label: 'All Specialties' },
    { value: 'Business English', label: 'Business English' },
    { value: 'IELTS Preparation', label: 'IELTS Preparation' },
    { value: 'Conversation', label: 'Conversation Practice' },
    { value: 'Cambridge Exams', label: 'Cambridge Exams' },
    { value: 'TOEFL', label: 'TOEFL' },
    { value: 'Kids English', label: 'Kids English' },
    { value: 'Academic English', label: 'Academic English' }
  ];

  const countries = [
    { value: 'all', label: 'All Countries' },
    { value: 'United States', label: 'United States' },
    { value: 'United Kingdom', label: 'United Kingdom' },
    { value: 'Canada', label: 'Canada' },
    { value: 'Australia', label: 'Australia' }
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-25', label: '$0 - $25/hour' },
    { value: '25-35', label: '$25 - $35/hour' },
    { value: '35-45', label: '$35 - $45/hour' },
    { value: '45+', label: '$45+/hour' }
  ];

  const sortOptions = [
    { value: 'rating', label: 'Highest Rated' },
    { value: 'experience', label: 'Most Experienced' },
    { value: 'students', label: 'Most Students' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ];

  // Filter and sort teachers
  const filteredTeachers = teachers
    .filter(teacher => {
      const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           teacher.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesSpecialty = selectedSpecialty === 'all' || teacher.specialties.includes(selectedSpecialty);
      const matchesCountry = selectedCountry === 'all' || teacher.country === selectedCountry;
      
      let matchesPrice = true;
      if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(p => p.replace('+', ''));
        if (max) {
          matchesPrice = teacher.hourlyRate >= parseInt(min) && teacher.hourlyRate <= parseInt(max);
        } else {
          matchesPrice = teacher.hourlyRate >= parseInt(min);
        }
      }
      
      return matchesSearch && matchesSpecialty && matchesCountry && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'experience':
          return b.experience - a.experience;
        case 'students':
          return b.students - a.students;
        case 'price-low':
          return a.hourlyRate - b.hourlyRate;
        case 'price-high':
          return b.hourlyRate - a.hourlyRate;
        default: // rating
          return b.rating - a.rating;
      }
    });

  return (
    <div className="min-h-screen pt-20">
      <Helmet>
        <title>Expert English Teachers - Speakyz</title>
        <meta name="description" content="Learn from certified native English teachers. Choose from our expert instructors specialized in IELTS, Business English, Conversation, and more." />
      </Helmet>

      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-secondary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-secondary-500/10 rounded-full mb-6"
            >
              <Users className="w-4 h-4 text-secondary-500" />
              <span className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                Expert Native Teachers
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-secondary-600 to-accent-600 dark:from-secondary-400 dark:to-accent-400 bg-clip-text text-transparent">
                Learn from the
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">
                Best Teachers
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Connect with certified native English teachers from around the world. 
              Each instructor is carefully selected and trained to help you achieve your language learning goals.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {[
                { icon: Users, label: 'Teachers', value: '50+' },
                { icon: Globe, label: 'Countries', value: '15+' },
                { icon: Award, label: 'Certified', value: '100%' },
                { icon: Star, label: 'Avg Rating', value: '4.8' }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-b border-gray-200/20 dark:border-gray-700/20 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search teachers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              {/* Specialty Filter */}
              <div className="relative">
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all duration-300"
                >
                  {specialties.map(specialty => (
                    <option key={specialty.value} value={specialty.value}>
                      {specialty.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Country Filter */}
              <div className="relative">
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all duration-300"
                >
                  {countries.map(country => (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Price Filter */}
              <div className="relative">
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all duration-300"
                >
                  {priceRanges.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all duration-300"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredTeachers.length} of {teachers.length} teachers
          </div>
        </div>
      </section>

      {/* Teachers Grid */}
      <section ref={ref} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredTeachers.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No teachers found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search criteria or filters
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredTeachers.map((teacher, index) => (
                <motion.div
                  key={teacher.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.01 }}
                  className="group"
                >
                  <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200/20 dark:border-gray-700/20">
                    {/* Featured Badge */}
                    {teacher.featured && (
                      <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded-full">
                        Featured
                      </div>
                    )}

                    {/* Online Status */}
                    {teacher.online && (
                      <div className="absolute top-4 right-4 z-10 flex items-center space-x-1 px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span>Online</span>
                      </div>
                    )}

                    <div className="p-6">
                      {/* Teacher Header */}
                      <div className="flex items-start space-x-4 mb-6">
                        <div className="relative">
                          <img
                            src={teacher.avatar}
                            alt={teacher.name}
                            className="w-20 h-20 rounded-2xl object-cover"
                          />
                          <div className="absolute -bottom-2 -right-2 text-2xl">
                            {teacher.flag}
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                            {teacher.name}
                          </h3>
                          <p className="text-secondary-600 dark:text-secondary-400 font-medium mb-2">
                            {teacher.title}
                          </p>
                          
                          {/* Rating and Stats */}
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="font-medium text-gray-900 dark:text-white">
                                {teacher.rating}
                              </span>
                              <span>({teacher.reviews.toLocaleString()})</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{teacher.students.toLocaleString()} students</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            ${teacher.hourlyRate}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            per hour
                          </div>
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {teacher.bio}
                      </p>

                      {/* Specialties */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                          Specialties
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {teacher.specialties.map((specialty, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-secondary-50 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400 text-sm rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Languages */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                          Languages
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {teacher.languages.slice(0, 2).map((language, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-accent-50 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 text-sm rounded-full"
                            >
                              {language}
                            </span>
                          ))}
                          {teacher.languages.length > 2 && (
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm rounded-full">
                              +{teacher.languages.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900 dark:text-white">
                            {teacher.experience}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            Years Exp.
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900 dark:text-white">
                            {teacher.lessonsCompleted.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            Lessons
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900 dark:text-white">
                            {teacher.timezone.split(' ')[0]}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            Timezone
                          </div>
                        </div>
                      </div>

                      {/* Availability */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Availability
                        </h4>
                        <div className="space-y-1">
                          {teacher.availability.map((time, idx) => (
                            <div key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                              {time}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 px-4 py-3 bg-gradient-to-r from-secondary-500 to-accent-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-secondary-500/25 transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                          <Calendar className="w-4 h-4" />
                          <span>Book Lesson</span>
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-4 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300 flex items-center justify-center"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-4 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300 flex items-center justify-center"
                        >
                          <Heart className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Teachers;