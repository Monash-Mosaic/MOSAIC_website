'use client';

import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import { useEffect } from 'react';
import Footer from '../../components/Footer';

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "Disinformer",
      subtitle: "International Federation of Red Cross",
      description: "Imagine creating a web platform for the organisation that helps communities all over the world",
      bgColor: "#ffffffff",
      textColor: "black",
      buttonColor: "#213359",
      buttonTextColor: "white",
      image: "/mos+ifrc.png"
    },
    {
      id: 2,
      title: "Nestle-In",
      subtitle: "Tackling Secondary Homelessnes",
      description: "A Hackathon project that turned to a real life application for people who experience secondary and tertiary homelessness",
      bgColor: "#C8D1F0",
      textColor: "#213359",
      buttonColor: "#213359",
      buttonTextColor: "white",
      image: "/nestled.jpg"
    },
    {
      id: 3,
      title: "Aged Care",
      subtitle: "Supporting aged care workers",
      description: "Co-designing solutions with and for people who transition from being active and independent to a new era of their lives",
      bgColor: "#ffffffff",
      textColor: "black",
      buttonColor: "#213359",
      buttonTextColor: "white",
      image: "/agedCare.jpg"
    }
  ];

  useEffect(() => {
    // Override navbar styles for this page
    const header = document.querySelector('header');
    if (header) {
      header.style.backgroundColor = 'white';
      header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }

    // Override nav link colors
    const navLinks = document.querySelectorAll('header nav a');
    navLinks.forEach(link => {
      if (!link.classList.contains('bg-white')) { // Don't change the "Join us" button
        link.style.color = '#213359';
      }
    });

    // Override mobile menu button color
    const mobileButton = document.querySelector('header button');
    if (mobileButton) {
      mobileButton.style.color = '#213359';
    }

    // Override mobile menu background
    const mobileMenu = document.querySelector('header > div:last-child');
    if (mobileMenu && mobileMenu.classList.contains('bg-[#213359]')) {
      mobileMenu.style.backgroundColor = 'white';
      mobileMenu.style.border = '1px solid #e5e7eb';

      // Override mobile menu link colors
      const mobileLinks = mobileMenu.querySelectorAll('a');
      mobileLinks.forEach(link => {
        if (!link.classList.contains('bg-white')) {
          link.style.color = '#213359';
        }
      });
    }

    // Cleanup function to restore original styles when leaving the page
    return () => {
      if (header) {
        header.style.backgroundColor = '';
        header.style.boxShadow = '';
      }
      navLinks.forEach(link => {
        if (!link.classList.contains('bg-white')) {
          link.style.color = '';
        }
      });
      if (mobileButton) {
        mobileButton.style.color = '';
      }
      if (mobileMenu) {
        mobileMenu.style.backgroundColor = '';
        mobileMenu.style.border = '';
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
          if (!link.classList.contains('bg-white')) {
            link.style.color = '';
          }
        });
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white projects-page">
      <Navbar color="light" />

      <main className="py-32">
        {/* Projects Grid */}
        <div className="space-y-16">
          {projects.map((project, index) => {
            const isProject2 = project.id === 2;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="w-full"
              >
                {isProject2 ? (
                  // Project 2 - Background extends to the right edge of the screen
                  <div className="relative w-full overflow-hidden">
                    {/* Extended background that goes to screen edge on the right */}
                    <div
                      className="absolute top-0 right-0 w-1/2 h-full rounded-l-3xl"
                      style={{ backgroundColor: project.bgColor }}
                    />

                    <div className="max-w-7xl mx-auto px-10 relative z-10">
                      <div
                        className="py-12 rounded-l-3xl relative"
                        style={{ backgroundColor: project.bgColor }}
                      >
                        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 justify-end">
                          {/* Content Side - with proper left margin */}
                          <div className="flex-1 space-y-6 pl-8 md:pl-65 pr-1 md:pr-1">
                            <div>
                              <h2
                                className="text-3xl md:text-4xl font-bold mb-2"
                                style={{ color: project.textColor }}
                              >
                                Project {project.id}: {project.title}
                              </h2>
                              <h3
                                className="text-xl md:text-2xl font-semibold mb-4"
                                style={{ color: project.textColor, opacity: 0.8 }}
                              >
                                {project.subtitle}
                              </h3>
                            </div>

                            <p
                              className="text-lg leading-relaxed font-medium"
                              style={{ color: project.textColor, opacity: 0.9 }}
                            >
                              {project.description}
                            </p>

                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-8 py-3 rounded-full font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                              style={{
                                backgroundColor: project.buttonColor,
                                color: project.buttonTextColor
                              }}
                            >
                              Learn more
                            </motion.button>
                          </div>

                          {/* Image Side for Project 2 - aligned to right edge like "Join us" */}
                          <div className="flex-shrink-0 pr-6">
                            <img
                              src={project.image}
                              alt={`${project.title} project`}
                              className="w-80 h-60 md:w-130 md:h-auto rounded-3xl object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Projects 1 and 3 - Images aligned to left edge like MOSAIC logo
                  <div className="max-w-7xl mx-auto px-11">
                    <div
                      className="rounded-3xl overflow-hidden"
                      style={{ backgroundColor: project.bgColor }}
                    >
                      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                        {/* Image Side - flush to the left edge of the section */}
                        <div className="flex-shrink-0">
                          <img
                            src={project.image}
                            alt={`${project.title} project`}
                            className="w-80 h-60 md:w-[30rem] md:h-auto rounded-3xl object-cover"
                          />
                        </div>

                        {/* Content Side - padded from margin, closer to image */}
                        <div className="flex-1 space-y-6 pl-8 md:pl-1 pr-8 md:pr-60">
                          <div>
                            <h2
                              className="text-3xl md:text-4xl font-bold mb-2"
                              style={{ color: project.textColor }}
                            >
                              Project {project.id}: {project.title}
                            </h2>
                            <h3
                              className="text-xl md:text-2xl font-semibold mb-4"
                              style={{ color: project.textColor, opacity: 0.8 }}
                            >
                              {project.subtitle}
                            </h3>
                          </div>

                          <p
                            className="text-lg leading-relaxed font-medium"
                            style={{ color: project.textColor, opacity: 0.9 }}
                          >
                             {project.description}
                          </p>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 rounded-full font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                            style={{
                              backgroundColor: project.buttonColor,
                              color: project.buttonTextColor
                            }}
                          >
                            Learn more
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}