// useProject.ts
import { useEffect, useState } from 'react';
import { fetchProject } from '../api';
import { mocketData, type Project } from '../constant';

const useProject = (projectCode: string) => {
  const [data, setData] = useState<Project | null>(mocketData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchProject(projectCode);
        //todo:поставить нужную дату
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [projectCode]);

  return { data, loading, error };
};

export default useProject;
