'use client'
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function OctopusDecoration() {
  const [isFirstIcon, setIsFirstIcon] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFirstIcon(prev => !prev);
      setAnimationKey(prev => prev + 1); // Force re-render for smooth transition
    }, 5000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="absolute bottom-20 left-5">
        <AnimatePresence>
          <motion.div
            whileHover={{ scale: 1.1 }}
            initial={{ y: 30 }}
            animate={{
              y: 0,
              transition: {
                duration: 0.5,
                ease: "easeInOut"
              }
            }}
            className="w-20 md:w-32"
            transition={{
              type: "smooth",
              duration: 1.5,
            }}>
            <motion.img
              initial={{ y: -10, x: 10 }}
              animate={{ y: 10, x: -10 }}
              transition={{
                type: "smooth",
                repeatType: "mirror",
                duration: 3,
                repeat: Infinity,
              }} src="/Octopus_icon_green_1.png" alt="Octopus left" />
          </motion.div>
        </AnimatePresence>

      </div>
      <div className="absolute top-40 right-40">
        <AnimatePresence mode="wait">
          {isFirstIcon ? (
            <motion.div
              key={`icon1-${animationKey}`}
              whileHover={{ scale: 1.1 }}
              initial={{ x: -30, y: -30 }}
              animate={{
                x: 30,
                y: 30,
                transition: {
                  duration: 2,
                  ease: "easeInOut"
                }
              }}
              className="absolute w-20 md:w-32">
              <motion.img
                initial={{ y: -7, x: 7 }}
                animate={{ y: 7, x: -7 }}
                transition={{
                  type: "smooth",
                  repeatType: "mirror",
                  duration: 3,
                  repeat: Infinity,
                }}
                src="/Octopus_icon_green_2.png" alt="Octopus right" />
            </motion.div>
          ) : (
            <motion.div
              key={`icon1-flipped-${animationKey}`}
              whileHover={{ scale: 1.1 }}
              initial={{ x: 30, y: 30 }}
              animate={{
                x: -30,
                y: -30,
                transition: {
                  duration: 2,
                  ease: "easeInOut"
                }
              }}
              className="absolute w-20 md:w-32">
              <motion.img
                initial={{ y: -7, x: 7 }}
                animate={{ y: 7, x: -7 }}
                transition={{
                  type: "smooth",
                  repeatType: "mirror",
                  duration: 3,
                  repeat: Infinity,
                }}
                src="/Octopus_icon_green_2_flipped.png" alt="Octopus right" />
            </motion.div>
          )
          }
        </AnimatePresence>
      </div>
    </div>
  );
}
