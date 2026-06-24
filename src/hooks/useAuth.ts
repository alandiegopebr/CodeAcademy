import { useAuthContext } from '@/contexts/AuthContext';

export default function useAuth() {
  return useAuthContext();
}
