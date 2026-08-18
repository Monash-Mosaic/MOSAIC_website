'use client';

import { motion } from 'framer-motion';

export default function RoleList({ title, roles, expandedRole, onToggle }) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-lime-400 mb-8">{title}</h2>
      <div className="space-y-0">
        {roles.map((role, index) => (
          <div key={role.id}>
            <div
              className="flex items-center justify-between py-4 cursor-pointer hover:bg-[#1a2a4a] transition-colors duration-200"
              onClick={() => onToggle(role.id)}
            >
              <span className="text-white text-lg">{role.title}</span>
              <span className="text-lime-400 text-xl font-bold">{expandedRole === role.id ? '-' : '+'}</span>
            </div>
            {expandedRole === role.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="pb-4"
              >
                <p className="text-gray-300 text-base mb-4">{role.description}</p>
                <a href={role.formPath}>
                  <button className="bg-lime-400 text-white px-6 py-2 rounded font-semibold hover:bg-lime-500 transition-colors duration-200">
                    Apply now
                  </button>
                </a>
              </motion.div>
            )}
            {index < roles.length - 1 && <div className="border-b border-dotted border-lime-400"></div>}
          </div>
        ))}
      </div>
    </div>
  );
}
