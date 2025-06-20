import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  Users, 
  Award, 
  Globe,
  Target,
  Heart,
  Zap,
  BookOpen,
  Star,
  TrendingUp,
  Shield,
  Clock,
  CheckCircle,
  Lightbulb,
  Rocket,
  Trophy
} from 'lucide-react';
import { useLanguage } from '../providers/LanguageProvider';

const About: React.FC = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { icon: Users, label: 'Happy Students', value: '15,000+', color: 'from-blue-500 to-cyan-500' },
    { icon: Award, label: 'Expert Teachers', value: '50+', color: 'from-purple-500 to-pink-500' },
    { icon: Globe, label: 'Countries Served', value: '25+', color: 'from-green-500 to-emerald-500' },
    { icon: BookOpen, label: 'Courses Completed', value: '100,000+', color: 'from-orange-500 to-red-500' },
    { icon: Star, label: 'Average Rating', value: '4.9/5', color: 'from-yellow-500 to-orange-500' },
    { icon: TrendingUp, label: 'Success Rate', value: '95%', color: 'from-indigo-500 to-purple-500' }
  ];

  const values = [
    {
      icon: Target,
      title: 'Excellence in Education',
      description: 'We are committed to providing the highest quality English education with proven methodologies and expert instructors.',
      color: 'from-primary-500 to-secondary-500'
    },
    {
      icon: Heart,
      title: 'Student-Centered Approach',
      description: 'Every student is unique. We tailor our teaching methods to match individual learning styles and goals.',
      color: 'from-secondary-500 to-accent-500'
    },
    {
      icon: Globe,
      title: 'Global Community',
      description: 'We connect learners from around the world, creating a diverse and supportive learning environment.',
      color: 'from-accent-500 to-success-500'
    },
    {
      icon: Lightbulb,
      title: 'Innovation in Learning',
      description: 'We continuously integrate cutting-edge technology and modern teaching techniques to enhance the learning experience.',
      color: 'from-success-500 to-warning-500'
    },
    {
      icon: Shield,
      title: 'Trust & Reliability',
      description: 'With transparent pricing, qualified teachers, and proven results, we build lasting relationships with our students.',
      color: 'from-warning-500 to-error-500'
    },
    {
      icon: Rocket,
      title: 'Continuous Growth',
      description: 'We believe in lifelong learning and support our students\' journey from beginner to advanced proficiency.',
      color: 'from-error-500 to-primary-500'
    }
  ];

  const team = [
    {
      name: 'Dr. Emily Richardson',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'PhD in Applied Linguistics with 15+ years of experience in language education. Former Cambridge University lecturer.',
      specialties: ['Curriculum Development', 'Teacher Training', 'Educational Leadership']
    },
    {
      name: 'Michael Chen',
      role: 'Head of Technology',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Former Google engineer passionate about educational technology. Leads our platform development and innovation initiatives.',
      specialties: ['EdTech Innovation', 'Platform Development', 'AI in Education']
    },
    {
      name: 'Sarah Martinez',
      role: 'Director of Curriculum',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Master\'s in TESOL with expertise in curriculum design. Oversees all course content and teaching methodologies.',
      specialties: ['Curriculum Design', 'Assessment Development', 'Teacher Training']
    },
    {
      name: 'David Thompson',
      role: 'Head of Student Success',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Dedicated to ensuring every student achieves their learning goals. Manages student support and success programs.',
      specialties: ['Student Support', 'Learning Analytics', 'Success Coaching']
    }
  ];

  const milestones = [
    {
      year: '2018',
      title: 'Speakyz Founded',
      description: 'Started with a vision to make quality English education accessible to everyone worldwide.',
      icon: Rocket
    },
    {
      year: '2019',
      title: 'First 1,000 Students',
      description: 'Reached our first major milestone with students from 10 different countries.',
      icon: Users
    },
    {
      year: '2020',
      title: 'Platform Innovation',
      description: 'Launched our advanced learning platform with AI-powered personalization.',
      icon: Zap
    },
    {
      year: '2021',
      title: 'Global Expansion',
      description: 'Expanded to serve students in 25+ countries with 24/7 support.',
      icon: Globe
    },
    {
      year: '2022',
      title: 'Excellence Recognition',
      description: 'Received multiple awards for innovation in online language education.',
      icon: Trophy
    },
    {
      year: '2023',
      title: '15,000+ Students',
      description: 'Celebrated serving over 15,000 students with a 95% success rate.',
      icon: Star
    }
  ];

  const achievements = [
    'Top-rated English learning platform with 4.9/5 stars',
    '95% of students achieve their target proficiency level',
    'Certified by Cambridge English and TESOL International',
    'Featured in TechCrunch, Forbes, and Education Week',
    'Winner of EdTech Innovation Award 2023',
    'ISO 9001:2015 certified for quality management'
  ];

  return (
    <div className="min-h-screen pt-20">
      <Helmet>
        <title>About Us - Speakyz</title>
        <meta name="description" content="Learn about Speakyz's mission to transform English education. Meet our team, discover our values, and see why thousands choose us." />
      </Helmet>

      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
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
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-500/10 rounded-full mb-6"
            >
              <Heart className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                Our Story
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 bg-clip-text text-transparent">
                Transforming Lives
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">
                Through English
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Since 2018, Speakyz has been on a mission to make quality English education accessible to everyone, 
              everywhere. We believe that language learning should be engaging, effective, and transformative.
            </p>

            {/* Mission Statement */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-4xl mx-auto p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/20 dark:border-gray-700/20"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                To empower individuals worldwide with the English language skills they need to achieve their personal, 
                academic, and professional goals through innovative, personalized, and accessible education.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 bg-clip-text text-transparent">
                Our Impact in Numbers
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              These numbers represent real people whose lives we've helped transform through English education
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group"
                >
                  <div className="relative p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 border border-gray-200/20 dark:border-gray-700/20 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                      {stat.value}
                    </div>
                    
                    <div className="text-gray-600 dark:text-gray-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={ref} className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 bg-clip-text text-transparent">
                Our Core Values
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              These principles guide everything we do and shape the experience we create for our students
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group"
                >
                  <div className="relative p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/20 dark:border-gray-700/20 h-full">
                    <div className={`w-14 h-14 bg-gradient-to-r ${value.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {value.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {value.description}
                    </p>

                    {/* Hover Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${value.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 bg-clip-text text-transparent">
                Meet Our Leadership Team
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Passionate educators and innovators dedicated to transforming English education
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <div className="relative bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 border border-gray-200/20 dark:border-gray-700/20 text-center">
                  {/* Profile Image */}
                  <div className="relative mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 w-24 h-24 rounded-full bg-gradient-to-r from-primary-500/20 to-secondary-500/20 mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Member Info */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  
                  <p className="text-primary-600 dark:text-primary-400 font-medium mb-4">
                    {member.role}
                  </p>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Specialties */}
                  <div className="space-y-2">
                    {member.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs rounded-full mr-2 mb-2"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 bg-clip-text text-transparent">
                Our Journey
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              From a small startup to a global platform - here's how we've grown
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-secondary-500"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                return (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative flex items-start space-x-6"
                  >
                    {/* Timeline Icon */}
                    <div className="relative z-10 w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200/20 dark:border-gray-700/20">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                          {milestone.year}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {milestone.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 bg-clip-text text-transparent">
                Recognition & Achievements
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're proud of the recognition we've received for our commitment to excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200/20 dark:border-gray-700/20 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-success-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  {achievement}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Join Our Community?
            </h2>
            
            <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto">
              Become part of the Speakyz family and start your journey to English fluency today. 
              Join thousands of successful learners from around the world.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="/courses"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-primary-600 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300 flex items-center space-x-2"
              >
                <BookOpen className="w-5 h-5" />
                <span>Explore Courses</span>
              </motion.a>
              
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-semibold text-lg border border-white/30 hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
              >
                <Users className="w-5 h-5" />
                <span>Contact Us</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;