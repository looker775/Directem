import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Role = 'owner' | 'admin' | 'buyer';

export interface Profile {
  id: string;
  email?: string | null;
  role: Role;
  full_name?: string | null;
  phone?: string | null;
  country?: string | null;
  admin_approved?: boolean | null;
  admin_blocked?: boolean | null;
  created_at?: string;
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}

export async function getUserProfile(): Promise<Profile | null> {
  const user = await getCurrentUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  if (error) {
    console.error('Failed to load profile:', error);
  }

  if (data) return data as Profile;

  const fallbackRole = (user.user_metadata?.role as Role | undefined) || 'buyer';
  const fullName = typeof user.user_metadata?.full_name === 'string'
    ? user.user_metadata.full_name
    : null;
  const phone = typeof user.user_metadata?.phone === 'string'
    ? user.user_metadata.phone
    : null;

  const adminApprovedDefault = fallbackRole === 'admin' ? false : true;

  await supabase
    .from('profiles')
    .upsert({
      id: user.id,
      email: user.email,
      role: fallbackRole,
      full_name: fullName,
      phone,
      admin_approved: adminApprovedDefault,
      admin_blocked: false,
    });

  const { data: refreshed } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  return (refreshed as Profile) || {
    id: user.id,
    email: user.email ?? null,
    role: fallbackRole,
    full_name: fullName,
    phone,
    admin_approved: adminApprovedDefault,
    admin_blocked: false,
  };
}

export async function signOut() {
  await supabase.auth.signOut();
}
