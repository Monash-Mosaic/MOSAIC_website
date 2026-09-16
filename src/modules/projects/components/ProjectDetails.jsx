'use client';

import { useParams, useRouter } from 'next/navigation';
import { PageLayout } from '@/components';
import useProjects from '@/modules/projects/useProjects';
import { motion } from 'framer-motion';

export default function ProjectDetails() {
    const params = useParams();
    const router = useRouter();
    const { projects, loading, error } = useProjects();

    // Find the project based on the URL parameter
    const projectId = params?.id;
    const project = projects?.find((p) => p.id === projectId);

    if (loading) {
        return (
            <PageLayout navbarColor="light" className="min-h-screen bg-white">
                <motion.main
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-32 max-w-7xl mx-auto px-10"
                >
                    <div className="mb-8 w-32 h-6 bg-gray-100 animate-pulse rounded" />
                    <div className="h-80 md:h-[30rem] w-full rounded-3xl bg-gray-100 animate-pulse mb-12" />
                    <div className="h-12 w-2/3 md:w-1/3 bg-gray-100 animate-pulse mb-4 rounded" />
                    <div className="space-y-4 mt-8">
                        <div className="h-4 bg-gray-100 animate-pulse rounded w-full" />
                        <div className="h-4 bg-gray-100 animate-pulse rounded w-full" />
                        <div className="h-4 bg-gray-100 animate-pulse rounded w-4/5" />
                    </div>
                </motion.main>
            </PageLayout>
        );
    }

    if (error || !project) {
        return (
            <PageLayout navbarColor="light" className="min-h-screen bg-white">
                <main className="py-32 flex flex-col items-center justify-center space-y-6">
                    <p className="text-center text-[#213359] text-2xl font-bold">Project not found.</p>
                    <button
                        onClick={() => router.push('/project')}
                        className="px-8 py-3 rounded-full font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl bg-[#213359] text-white"
                    >
                        Return to Projects
                    </button>
                </main>
            </PageLayout>
        );
    }

    return (
        <PageLayout navbarColor="light" className="min-h-screen bg-white">
            <main className="py-32">
                <div className="max-w-7xl mx-auto px-11">

                    {/* Back Button */}
                    <button
                        onClick={() => router.back()}
                        className="mb-8 text-[#213359] hover:opacity-70 transition-opacity font-semibold flex items-center gap-2 text-lg cursor-pointer"
                    >
                        &larr; Back to Projects
                    </button>

                    {/* Hero Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="rounded-3xl overflow-hidden mb-12 shadow-sm"
                        style={{ backgroundColor: project.bgColor || '#f3f4f6' }}
                    >
                        <div className="w-full h-80 md:h-[30rem] relative">
                            <img
                                src={project.image}
                                alt={`${project.title} project cover`}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>

                    {/* Details Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="max-w-4xl"
                    >
                        <h1
                            className="text-4xl md:text-5xl font-bold mb-4"
                            style={{ color: project.textColor || '#000000' }}
                        >
                            {project.title}
                        </h1>

                        {project.subtitle && (
                            <h2
                                className="text-2xl md:text-3xl font-semibold mb-8"
                                style={{ color: project.textColor || '#000000', opacity: 0.8 }}
                            >
                                {project.subtitle}
                            </h2>
                        )}

                        <div
                            className="prose prose-lg max-w-none mt-8"
                            style={{ color: project.textColor || '#000000', opacity: 0.9 }}
                        >
                            <p className="text-lg leading-relaxed font-medium whitespace-pre-wrap">
                                {project.description}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </main>
        </PageLayout>
    );
}