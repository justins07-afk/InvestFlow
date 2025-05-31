'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signIn, signUp } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isSignUp) {
        // Inscription
        const { user } = await signUp(email, password);
        if (user) {
          // Si l'inscription nécessite une confirmation par email
          if (user.confirmation_sent_at) {
            setError('Un email de confirmation a été envoyé. Veuillez vérifier votre boîte de réception.');
            return;
          }
          router.push('/dashboard');
        }
      } else {
        // Connexion
        const { user, session } = await signIn(email, password);
        if (user && session) {
          router.push('/dashboard');
        }
      }
    } catch (err: any) {
      console.error('Erreur d\'authentification:', err);
      
      // Gestion des erreurs spécifiques de Supabase
      if (err.message) {
        switch (err.message) {
          case 'Invalid login credentials':
            setError('Email ou mot de passe incorrect.');
            break;
          case 'Email not confirmed':
            setError('Veuillez confirmer votre adresse email avant de vous connecter.');
            break;
          default:
            setError(`Erreur: ${err.message}`);
        }
      } else {
        setError('Une erreur est survenue lors de l\'authentification.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            InvestFlow
          </h1>
          <p className="text-zinc-500 mt-2">Suivez et analysez vos investissements</p>
        </div>

        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-center">
              {isSignUp ? 'Inscription' : 'Connexion'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-zinc-700">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="justin@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-zinc-700">
                  Mot de passe
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                disabled={isLoading}
              >
                {isLoading 
                  ? (isSignUp ? 'Inscription en cours...' : 'Connexion en cours...') 
                  : (isSignUp ? 'S\'inscrire' : 'Se connecter')
                }
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center border-t border-zinc-100 pt-4 space-y-3">
            <button 
              type="button"
              onClick={() => setIsSignUp(!isSignUp)} 
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              {isSignUp 
                ? 'Déjà un compte ? Connectez-vous' 
                : 'Pas encore de compte ? Inscrivez-vous'
              }
            </button>
            
            {!isSignUp && (
              <Link href="/forgot-password" className="text-sm text-zinc-500 hover:text-zinc-700">
                Mot de passe oublié ?
              </Link>
            )}
            
            <p className="text-xs text-zinc-400 mt-2">
              Pour utiliser l'application, vous devez créer un compte sur Supabase.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
} 