import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  Calendar, 
  Clock, 
  Users, 
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MapPin,
  Video,
  User,
  Star,
  BookOpen,
  Globe,
  Zap
} from 'lucide-react';
import { useLanguage } from '../providers/LanguageProvider';

interface ScheduleItem {
  id: string;
  title: string;
  description: string;
  instructor: {
    name: string;
    avatar: string;
    rating: number;
  };
  date: string;
  time: string;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  type: 'group' | 'individual' | 'workshop';
  format: 'online' | 'offline';
  location?: string;
  maxStudents?: number;
  currentStudents: number;
  price: number;
  category: 'general' | 'business' | 'conversation' | 'exam' | 'kids';
  available: boolean;
}

const Schedule: React.FC = () => {
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Generate sample schedule data
  const generateScheduleItems = (): ScheduleItem[] => {
    const items: ScheduleItem[] = [];
    const today = new Date();
    
    const instructors = [
      { name: 'Sarah Johnson', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', rating: 4.9 },
      { name: 'Michael Chen', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', rating: 4.8 },
      { name: 'Emma Wilson', avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', rating: 4.9 },
      { name: 'David Brown', avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', rating: 4.7 },
    ];

    const courses = [
      { title: 'Business English Fundamentals', category: 'business', level: 'intermediate', type: 'group', price: 45 },
      { title: 'IELTS Speaking Practice', category: 'exam', level: 'intermediate', type: 'group', price: 35 },
      { title: 'Conversation Club', category: 'conversation', level: 'beginner', type: 'group', price: 25 },
      { title: 'Advanced Grammar Workshop', category: 'general', level: 'advanced', type: 'workshop', price: 55 },
      { title: 'Kids English Fun Time', category: 'kids', level: 'beginner', type: 'group', price: 30 },
      { title: 'One-on-One Tutoring', category: 'general', level: 'intermediate', type: 'individual', price: 65 },
    ];

    // Generate items for the next 14 days
    for (let day = 0; day < 14; day++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + day);
      
      // Generate 3-6 items per day
      const itemsPerDay = Math.floor(Math.random() * 4) + 3;
      
      for (let i = 0; i < itemsPerDay; i++) {
        const course = courses[Math.floor(Math.random() * courses.length)];
        const instructor = instructors[Math.floor(Math.random() * instructors.length)];
        const hour = Math.floor(Math.random() * 12) + 8; // 8 AM to 8 PM
        const minute = Math.random() > 0.5 ? 0 : 30;
        const format = Math.random() > 0.3 ? 'online' : 'offline';
        
        items.push({
          id: `${day}-${i}`,
          title: course.title,
          description: `Join our ${course.title.toLowerCase()} session and improve your English skills with expert guidance.`,
          instructor,
          date: currentDate.toISOString().split('T')[0],
          time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
          duration: course.type === 'individual' ? 60 : course.type === 'workshop' ? 120 : 90,
          level: course.level as 'beginner' | 'intermediate' | 'advanced',
          type: course.type as 'group' | 'individual' | 'workshop',
          format: format as 'online' | 'offline',
          location: format === 'offline' ? 'Speakyz Learning Center' : undefined,
          maxStudents: course.type === 'individual' ? 1 : course.type === 'workshop' ? 20 : 8,
          currentStudents: Math.floor(Math.random() * (course.type === 'individual' ? 1 : course.type === 'workshop' ? 15 : 6)),
          price: course.price,
          category: course.category as 'general' | 'business' | 'conversation' | 'exam' | 'kids',
          available: Math.random() > 0.2, // 80% availability
        });
      }
    }
    
    return items.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });
  };

  const [scheduleItems] = useState<ScheduleItem[]>(generateScheduleItems());

  const levels = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const types = [
    { value: 'all', label: 'All Types' },
    { value: 'group', label: 'Group Classes' },
    { value: 'individual', label: 'Individual' },
    { value: 'workshop', label: 'Workshops' }
  ];

  const formats = [
    { value: 'all', label: 'All Formats' },
    { value: 'online', label: 'Online' },
    { value: 'offline', label: 'In-Person' }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'general', label: 'General English' },
    { value: 'business', label: 'Business English' },
    { value: 'conversation', label: 'Conversation' },
    { value: 'exam', label: 'Exam Prep' },
    { value: 'kids', label: 'Kids English' }
  ];

  // Filter schedule items
  const filteredItems = scheduleItems.filter(item => {
    const matchesLevel = selectedLevel === 'all' || item.level === selectedLevel;
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesFormat = selectedFormat === 'all' || item.format === selectedFormat;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    return matchesLevel && matchesType && matchesFormat && matchesCategory;
  });

  // Group items by date
  const groupedItems = filteredItems.reduce((groups, item) => {
    const date = item.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {} as Record<string, ScheduleItem[]>);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'group':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'individual':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'workshop':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const isToday = (dateString: string) => {
    const today = new Date().toISOString().split('T')[0];
    return dateString === today;
  };

  const isTomorrow = (dateString: string) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return dateString === tomorrow.toISOString().split('T')[0];
  };

  const getDateLabel = (dateString: string) => {
    if (isToday(dateString)) return 'Today';
    if (isTomorrow(dateString)) return 'Tomorrow';
    return formatDate(dateString);
  };

  return (
    <div className="min-h-screen pt-20">
      <Helmet>
        <title>Class Schedule - Speakyz</title>
        <meta name="description" content="Browse and book English classes. Find the perfect time slot that fits your schedule with our flexible class options." />
      </Helmet>

      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-accent-50 to-success-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-success-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
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
              className="inline-flex items-center space-x-2 px-4 py-2 bg-accent-500/10 rounded-full mb-6"
            >
              <Calendar className="w-4 h-4 text-accent-500" />
              <span className="text-sm font-medium text-accent-600 dark:text-accent-400">
                Flexible Scheduling
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-accent-600 to-success-600 dark:from-accent-400 dark:to-success-400 bg-clip-text text-transparent">
                Find Your Perfect
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">
                Class Time
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Browse our comprehensive class schedule and book the perfect time slot for your English learning journey. 
              Choose from group classes, individual sessions, and specialized workshops.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {[
                { icon: Calendar, label: 'Classes/Week', value: '150+' },
                { icon: Clock, label: 'Time Slots', value: '24/7' },
                { icon: Users, label: 'Class Types', value: '10+' },
                { icon: Globe, label: 'Time Zones', value: '15+' }
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
                    <div className="w-12 h-12 bg-gradient-to-r from-accent-500 to-success-500 rounded-xl flex items-center justify-center mx-auto mb-2">
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

      {/* Filters */}
      <section className="py-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-b border-gray-200/20 dark:border-gray-700/20 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
              <button
                onClick={() => setViewMode('week')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  viewMode === 'week'
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Week View
              </button>
              <button
                onClick={() => setViewMode('month')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  viewMode === 'month'
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                List View
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              {/* Level Filter */}
              <div className="relative">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-300"
                >
                  {levels.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Type Filter */}
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-300"
                >
                  {types.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Format Filter */}
              <div className="relative">
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-300"
                >
                  {formats.map(format => (
                    <option key={format.value} value={format.value}>
                      {format.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-300"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredItems.length} available classes
          </div>
        </div>
      </section>

      {/* Schedule Content */}
      <section ref={ref} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {Object.keys(groupedItems).length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No classes found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your filters to see more available classes
              </p>
            </motion.div>
          ) : (
            <div className="space-y-12">
              {Object.entries(groupedItems).map(([date, items], dateIndex) => (
                <motion.div
                  key={date}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: dateIndex * 0.1 }}
                >
                  {/* Date Header */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`
                      px-4 py-2 rounded-xl font-semibold
                      ${isToday(date) 
                        ? 'bg-gradient-to-r from-accent-500 to-success-500 text-white' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                      }
                    `}>
                      {getDateLabel(date)}
                    </div>
                    <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {items.length} classes available
                    </div>
                  </div>

                  {/* Classes Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item, itemIndex) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: (dateIndex * 0.1) + (itemIndex * 0.05) }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="group"
                      >
                        <div className={`
                          relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl 
                          transition-all duration-300 overflow-hidden border border-gray-200/20 dark:border-gray-700/20
                          ${!item.available ? 'opacity-60' : ''}
                        `}>
                          {/* Availability Badge */}
                          {!item.available && (
                            <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                              Full
                            </div>
                          )}

                          <div className="p-6">
                            {/* Class Header */}
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors duration-300">
                                  {item.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                                  {item.description}
                                </p>
                              </div>
                              <div className="text-right ml-4">
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                  ${item.price}
                                </div>
                              </div>
                            </div>

                            {/* Instructor */}
                            <div className="flex items-center space-x-3 mb-4">
                              <img
                                src={item.instructor.avatar}
                                alt={item.instructor.name}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                              <div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {item.instructor.name}
                                </div>
                                <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                  <span>{item.instructor.rating}</span>
                                </div>
                              </div>
                            </div>

                            {/* Class Details */}
                            <div className="space-y-3 mb-4">
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                                  <Clock className="w-4 h-4" />
                                  <span>{item.time} ({item.duration} min)</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  {item.format === 'online' ? (
                                    <Video className="w-4 h-4 text-green-500" />
                                  ) : (
                                    <MapPin className="w-4 h-4 text-blue-500" />
                                  )}
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {item.format === 'online' ? 'Online' : 'In-Person'}
                                  </span>
                                </div>
                              </div>

                              {item.type !== 'individual' && (
                                <div className="flex items-center justify-between text-sm">
                                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                                    <Users className="w-4 h-4" />
                                    <span>{item.currentStudents}/{item.maxStudents} students</span>
                                  </div>
                                  <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div 
                                      className="bg-gradient-to-r from-accent-500 to-success-500 h-2 rounded-full transition-all duration-300"
                                      style={{ width: `${(item.currentStudents / (item.maxStudents || 1)) * 100}%` }}
                                    ></div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                              <span className={`px-2 py-1 text-xs rounded-full ${getLevelColor(item.level)}`}>
                                {item.level.charAt(0).toUpperCase() + item.level.slice(1)}
                              </span>
                              <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(item.type)}`}>
                                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                              </span>
                            </div>

                            {/* Action Button */}
                            <motion.button
                              whileHover={{ scale: item.available ? 1.02 : 1 }}
                              whileTap={{ scale: item.available ? 0.98 : 1 }}
                              disabled={!item.available}
                              className={`
                                w-full px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2
                                ${item.available
                                  ? 'bg-gradient-to-r from-accent-500 to-success-500 text-white hover:shadow-lg hover:shadow-accent-500/25'
                                  : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                }
                              `}
                            >
                              {item.available ? (
                                <>
                                  <Calendar className="w-4 h-4" />
                                  <span>Book Now</span>
                                </>
                              ) : (
                                <>
                                  <Users className="w-4 h-4" />
                                  <span>Class Full</span>
                                </>
                              )}
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
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

export default Schedule;