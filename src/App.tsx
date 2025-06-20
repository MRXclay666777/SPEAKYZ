import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import components
import LoadingSpinner from './components/ui/LoadingSpinner';
import ErrorBoundary from './components/ui/ErrorBoundary';
import ParticleBackground from './components/ui/ParticleBackground';
import ThemeProvider from './providers/ThemeProvider';
import LanguageProvider from './providers/LanguageProvider';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ui/ScrollToTop';
import CookieConsent from './components/ui/CookieConsent';
import ChatBot from './components/ui/ChatBot';
import ProgressBar from './components/ui/ProgressBar';

// Import pages
import Home from './pages/Home';
import Courses from './pages/Courses';
import Teachers from './pages/Teachers';
import Schedule from './pages/Schedule';
import Contact from './pages/Contact';
import About from './pages/About';
import NotFound from './pages/NotFound';

// Create Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

const App: React.FC = () => {
  useEffect(() => {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
      duration: 800,
      offset: 100,
      easing: 'ease-in-out-cubic',
      once: true,
    });

    // Refresh AOS on window resize
    const handleResize = () => AOS.refresh();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <LanguageProvider>
            <ThemeProvider>
              <Router>
                <div className="App relative min-h-screen overflow-x-hidden">
                  {/* Progress Bar */}
                  <ProgressBar />
                  
                  {/* Particle Background */}
                  <ParticleBackground />
                  
                  {/* Main Application */}
                  <div className="relative z-10">
                    {/* Navigation */}
                    <Navigation />
                    
                    {/* Main Content */}
                    <main className="min-h-screen">
                      <AnimatePresence mode="wait">
                        <Suspense fallback={<LoadingSpinner />}>
                          <Routes>
                            <Route 
                              path="/" 
                              element={
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -20 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <Home />
                                </motion.div>
                              } 
                            />
                            <Route 
                              path="/courses" 
                              element={
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -20 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <Courses />
                                </motion.div>
                              } 
                            />
                            <Route 
                              path="/teachers" 
                              element={
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -20 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <Teachers />
                                </motion.div>
                              } 
                            />
                            <Route 
                              path="/schedule" 
                              element={
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -20 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <Schedule />
                                </motion.div>
                              } 
                            />
                            <Route 
                              path="/contact" 
                              element={
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -20 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <Contact />
                                </motion.div>
                              } 
                            />
                            <Route 
                              path="/about" 
                              element={
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -20 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <About />
                                </motion.div>
                              } 
                            />
                            <Route 
                              path="*" 
                              element={
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -20 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <NotFound />
                                </motion.div>
                              } 
                            />
                          </Routes>
                        </Suspense>
                      </AnimatePresence>
                    </main>
                    
                    {/* Footer */}
                    <Footer />
                  </div>
                  
                  {/* UI Components */}
                  <ScrollToTop />
                  <ChatBot />
                  <CookieConsent />
                  
                  {/* Toast Notifications */}
                  <Toaster
                    position="top-right"
                    reverseOrder={false}
                    gutter={8}
                    containerClassName=""
                    containerStyle={{}}
                    toastOptions={{
                      className: '',
                      duration: 4000,
                      style: {
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: '#fff',
                      },
                      success: {
                        duration: 3000,
                        style: {
                          background: 'rgba(16, 185, 129, 0.1)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(16, 185, 129, 0.3)',
                          color: '#10b981',
                        },
                      },
                      error: {
                        duration: 5000,
                        style: {
                          background: 'rgba(239, 68, 68, 0.1)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          color: '#ef4444',
                        },
                      },
                    }}
                  />
                </div>
              </Router>
            </ThemeProvider>
          </LanguageProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;