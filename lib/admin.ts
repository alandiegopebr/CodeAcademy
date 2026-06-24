import type { User } from 'firebase/auth';

export const ADMIN_EMAIL = 'alandiegope123@gmail.com';

export function isAdmin(user: User | null | undefined) {
  return user?.email === ADMIN_EMAIL;
}
