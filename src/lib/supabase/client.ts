import { createBrowserClient } from '@supabase/ssr';

// Utilisation des variables d'environnement pour la configuration Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

// Création du client Supabase pour le navigateur
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

/**
 * Authentification avec email et mot de passe
 * @param email - Email de l'utilisateur
 * @param password - Mot de passe de l'utilisateur
 */
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

/**
 * Inscription d'un nouvel utilisateur
 * @param email - Email de l'utilisateur
 * @param password - Mot de passe de l'utilisateur
 */
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

/**
 * Déconnexion de l'utilisateur
 */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  return { error: null };
};

/**
 * Récupération de l'utilisateur actuellement connecté
 */
export const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  return { data, error };
};

/**
 * Récupération de la session active
 */
export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  return { data, error };
};

/**
 * Réinitialisation du mot de passe
 * @param email - Email de l'utilisateur
 */
export const resetPassword = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  
  if (error) throw error;
  return data;
}; 