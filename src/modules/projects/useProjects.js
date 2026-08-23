'use client';

import { useEffect, useState } from 'react';

export default function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProjects() {
      try {
        const response = await fetch('/api/projects', { signal: controller.signal });
        const data = await response.json();

        if (!response.ok || data.success === false) {
          throw new Error(data.error || 'Failed to load projects');
        }

        setProjects(Array.isArray(data.projects) ? data.projects : []);
        setError(null);
      } catch (loadError) {
        if (loadError.name === 'AbortError') return;
        setError(loadError);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
    return () => controller.abort();
  }, []);

  return { projects, loading, error };
}
