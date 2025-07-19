'use client'
import { motion } from "framer-motion";

export default function OctopusDecoration() {
  return (
    <>
      <div className="absolute bottom-10 left-10">
        <motion.img
          initial={{ y: -10, x: -10 }}
          animate={{ y: 10, x: 10 }}
          transition={{
            type: "smooth",
            repeatType: "mirror",
            duration: 2,
            repeat: Infinity,
          }} src="/Octopus_icon_green_1.png" alt="Octopus left" className="w-20 md:w-32" />
      </div>
      <div className="absolute top-30 right-10">
        <img src="/Octopus_icon_green_2.png" alt="Octopus right" className="w-20 md:w-32" />
      </div>
    </>
  );
}
