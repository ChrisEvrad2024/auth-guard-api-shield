
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, UserPlus, Check, X } from 'lucide-react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const passwordRequirements = [
    { test: (p: string) => p.length >= 8, text: 'Au moins 8 caractères' },
    { test: (p: string) => /[A-Z]/.test(p), text: 'Une majuscule' },
    { test: (p: string) => /[a-z]/.test(p), text: 'Une minuscule' },
    { test: (p: string) => /\d/.test(p), text: 'Un chiffre' },
    { test: (p: string) => /[!@#$%^&*]/.test(p), text: 'Un caractère spécial' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
      });
      return;
    }

    const allRequirementsMet = passwordRequirements.every(req => req.test(password));
    if (!allRequirementsMet) {
      toast({
        title: "Mot de passe invalide",
        description: "Veuillez respecter tous les critères de sécurité",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      await register(email, password);
      toast({
        title: "Inscription réussie",
        description: "Vérifiez votre email pour confirmer votre compte",
      });
      navigate('/verify-email');
    } catch (error: any) {
      toast({
        title: "Erreur d'inscription",
        description: error.message || "Une erreur est survenue",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg p-4">
      <div className="w-full max-w-md">
        <Card className="auth-card">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
              <UserPlus className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">Inscription</CardTitle>
            <CardDescription className="text-white/70">
              Créez votre compte sécurisé
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Créer un mot de passe"
                    className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-white/60 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                
                {password && (
                  <div className="space-y-1 mt-2">
                    {passwordRequirements.map((req, index) => (
                      <div key={index} className="flex items-center text-xs">
                        {req.test(password) ? (
                          <Check className="h-3 w-3 text-green-400 mr-1" />
                        ) : (
                          <X className="h-3 w-3 text-red-400 mr-1" />
                        )}
                        <span className={req.test(password) ? 'text-green-400' : 'text-white/60'}>
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">Confirmer le mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirmer le mot de passe"
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-white text-purple-600 hover:bg-white/90 transition-all duration-200"
                disabled={loading}
              >
                {loading ? 'Création...' : 'Créer mon compte'}
              </Button>
            </form>

            <div className="mt-6 text-center text-white/70">
              Déjà un compte ?{' '}
              <Link to="/login" className="text-white hover:underline font-medium">
                Se connecter
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
