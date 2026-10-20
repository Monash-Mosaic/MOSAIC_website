'use client';

import { motion } from 'framer-motion';

export default function RoleList({ title, roles, expandedRole, onToggle }) {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold break-words text-lime-400 sm:mb-8 sm:text-3xl">{title}</h2>
      <div className="space-y-0">
        {roles.map((role, index) => (
          <div key={role.id}>
            <div
              className="flex cursor-pointer items-center justify-between gap-4 py-4 transition-colors duration-200 hover:bg-[#1a2a4a]"
              onClick={() => onToggle(role.id)}
            >
              <span className="text-base text-white sm:text-lg">{role.title}</span>
              <span className="shrink-0 text-xl font-bold text-lime-400">{expandedRole === role.id ? '-' : '+'}</span>
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
