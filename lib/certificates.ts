export type Certificate = {
  id: string;
  title: string;
  description: string;
  issuedAt: string;
  badge: string;
};

export function listCertificates(): Certificate[] {
  return [
    {
      id: 'react-ui-specialist',
      title: 'React UI Specialist',
      description: 'Awarded for completing the React Basics course with top performance.',
      issuedAt: '3 days ago',
      badge: '⚡',
    },
    {
      id: 'typescript-mastery',
      title: 'TypeScript Mastery',
      description: 'Awarded for completing the TypeScript Pro learning path.',
      issuedAt: '2 weeks ago',
      badge: '🧠',
    },
    {
      id: 'ui-design-expert',
      title: 'UI Design Expert',
      description: 'Earned by completing the UI Design path and submitting the final capstone project.',
      issuedAt: '1 month ago',
      badge: '✨',
    },
  ];
}
