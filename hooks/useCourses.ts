import { getCourses } from '@/lib/firestore';
import type { Course } from '@/types/course';
import { useEffect, useState } from 'react';

interface UseCourses {
  courses: Course[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export default function useCourses(): UseCourses {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCourses();
      setCourses(data || []);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch courses');
      setError(error);
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return {
    courses,
    loading,
    error,
    refetch: fetchCourses,
  };
}
