'use client'
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
const variants = {
  // Step 1: Initial state (hidden)
  hidden: {
    opacity: 0,
    y: 60,
  },
  // Step 2: First animation (float up)
  floatUp: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
  // Step 3: Second animation (wobble)
  wobble: {
    y: [0, -10, 5, 0],  // Keyframes for wobble effect
    rotate: [0, -3, 2, 0],
    transition: {
      type: "smooth",
      repeatType: "mirror",
      duration: 3,
      repeat: Infinity
    },
  },
};


export default function OctopusDecoration() {
  const [isFirstIcon, setIsFirstIcon] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFirstIcon(prev => !prev);
      setAnimationKey(prev => prev + 1); // Force re-render for smooth transition
    }, 4000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* <motion.div
        initial={{ y: 60 }}
        animate={{ y: 30 }}
        className="absolute bottom-10 left-10"
        transition={{
          type: "smooth",
          duration: 0.3,
        }}>
        <motion.img
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0 }}
          src="/Octopus_icon_green_3.png"
          className="w-20 md:w-32"
        />
      </motion.div> */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute bottom-10 left-10"
        transition={{
          type: "smooth",
          duration: 0.5,
        }}>
        <motion.img
          initial={{ y: -10, x: 10 }}
          animate={{ y: 10, x: -10 }}
          transition={{
            type: "smooth",
            repeatType: "mirror",
            duration: 3,
            repeat: Infinity,
          }} src="/Octopus_icon_green_1.png" alt="Octopus left" className="w-20 md:w-32" />
      </motion.div>
      <div className="absolute top-50 right-50">
        <AnimatePresence mode="wait">
          {isFirstIcon ? (
            <motion.div
              key={`icon1-${animationKey}`}
              initial={{ x: -30, y: -30 }}
              animate={{
                x: 30,
                y: 30,
                transition: {
                  duration: 1,
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
              initial={{ x: 30, y: 30 }}
              animate={{
                x: -30,
                y: -30,
                transition: {
                  duration: 1,
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
