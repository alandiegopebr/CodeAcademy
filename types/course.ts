export interface Course {
  id: string;
  title: string;
  description: string;
  progress: string;
  duration: string;
  lessons: number;
  level?: 'Iniciante' | 'Intermediário' | 'Avançado';
}
