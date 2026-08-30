'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageLayout } from '@/components';
import { committeeRoles, projectRoles } from './data';
import RecruitmentProcess from './components/RecruitmentProcess';
import RoleList from './components/RoleList';
import WhyJoin from './components/WhyJoin';

export default function JoinPage() {
  const [expandedRole, setExpandedRole] = useState();

  const toggleRole = (roleId) => {
    setExpandedRole(expandedRole === roleId ? null : roleId);
  };

  return (
    <PageLayout navbarColor="dark" className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-6 py-12">
        <WhyJoin />
        <RecruitmentProcess />
      </main>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-[#213359] py-16 w-full"
      >
        <div className="px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
              <RoleList
                title="Project Roles"
                roles={projectRoles}
                expandedRole={expandedRole}
                onToggle={toggleRole}
              />
              <RoleList
                title="Committee Roles"
                roles={committeeRoles}
                expandedRole={expandedRole}
                onToggle={toggleRole}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </PageLayout>
  );
}
