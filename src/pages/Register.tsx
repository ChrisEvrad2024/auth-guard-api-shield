
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, UserPlus, Check, X, ArrowLeft, Shield, Sparkles } from 'lucide-react';
import AnimatedIcon from '@/components/ui/animated-icon';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const passwordsMatch = password === confirmPassword && confirmPassword !== '';
  const allRequirementsMet = passwordRequirements.every(req => req.test(password));

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
    <div className="min-h-screen flex items-center justify-center p-4 gradient-bg">
      {/* Éléments décoratifs flottants */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-white/5 rounded-full blur-2xl floating-animation"></div>
        <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-white/10 rounded-full blur-xl floating-animation" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-2/3 right-1/3 w-20 h-20 bg-white/5 rounded-full blur-lg floating-animation" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Bouton retour amélioré */}
        <div className="mb-8 fade-in-up">
          <Link 
            to="/" 
            className="group inline-flex items-center text-white/80 hover:text-white transition-all duration-300 text-sm font-medium backdrop-blur-sm bg-white/10 px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/20 hover:border-white/30 hover:transform hover:-translate-y-1"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Retour à l'accueil
          </Link>
        </div>

        <div className="morphing-border fade-in-scale">
          <Card className="auth-card">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-24 h-24 bg-gradient-to-r from-green-500 via-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-2xl pulse-glow">
                <AnimatedIcon 
                  icon={UserPlus} 
                  animation="glow" 
                  size={32} 
                  color="white" 
                />
              </div>
              <CardTitle className="text-3xl font-bold gradient-text mb-2 slide-in-right">
                Créer un compte
              </CardTitle>
              <CardDescription className="text-white/90 text-lg font-medium slide-in-right" style={{animationDelay: '0.1s'}}>
                Rejoignez Auth Guard API Shield
              </CardDescription>
              <div className="flex items-center justify-center mt-4 slide-in-right" style={{animationDelay: '0.2s'}}>
                <Sparkles className="h-4 w-4 text-yellow-300 mr-2" />
                <span className="text-white/80 text-sm">Sécurité maximale</span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div className="space-y-3 fade-in-up" style={{animationDelay: '0.3s'}}>
                  <Label htmlFor="email" className="text-white font-semibold text-base flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-blue-300" />
                    Adresse email
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      className="relative enhanced-input h-14 pl-12 bg-white/10 border-2 border-white/20 focus:border-blue-400 focus:ring-blue-400 rounded-xl text-white placeholder-white/60 backdrop-blur-sm"
                      required
                    />
                    <Mail className="absolute left-3 top-4 h-5 w-5 text-white/60" />
                  </div>
                </div>
                
                {/* Password Field */}
                <div className="space-y-3 fade-in-up" style={{animationDelay: '0.4s'}}>
                  <Label htmlFor="password" className="text-white font-semibold text-base flex items-center">
                    <Lock className="h-4 w-4 mr-2 text-purple-300" />
                    Mot de passe
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••"
                      className="relative enhanced-input h-14 pl-12 pr-14 bg-white/10 border-2 border-white/20 focus:border-purple-400 focus:ring-purple-400 rounded-xl text-white placeholder-white/60 backdrop-blur-sm"
                      required
                    />
                    <Lock className="absolute left-3 top-4 h-5 w-5 text-white/60" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-4 text-white/60 hover:text-white transition-colors group"
                    >
                      {showPassword ? 
                        <EyeOff className="h-5 w-5 group-hover:scale-110 transition-transform" /> : 
                        <Eye className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      }
                    </button>
                  </div>
                  
                  {/* Password Requirements with better design */}
                  {password && (
                    <div className="glass-effect rounded-xl p-4 space-y-3 border border-white/20 fade-in-scale">
                      <div className="flex items-center mb-3">
                        <Shield className="h-4 w-4 text-white/80 mr-2" />
                        <p className="text-sm font-semibold text-white/90">Critères de sécurité</p>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {passwordRequirements.map((req, index) => (
                          <div key={index} className="flex items-center text-sm transition-all duration-300">
                            <div className={`mr-3 p-1 rounded-full ${req.test(password) ? 'bg-green-500/20' : 'bg-gray-500/20'}`}>
                              {req.test(password) ? (
                                <Check className="h-3 w-3 text-green-400" />
                              ) : (
                                <X className="h-3 w-3 text-gray-400" />
                              )}
                            </div>
                            <span className={`transition-colors duration-300 ${req.test(password) ? 'text-green-300 font-medium' : 'text-white/60'}`}>
                              {req.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-3 fade-in-up" style={{animationDelay: '0.5s'}}>
                  <Label htmlFor="confirmPassword" className="text-white font-semibold text-base flex items-center">
                    <Lock className="h-4 w-4 mr-2 text-pink-300" />
                    Confirmer le mot de passe
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••••"
                      className={`relative enhanced-input h-14 pl-12 pr-16 bg-white/10 border-2 border-white/20 focus:border-pink-400 focus:ring-pink-400 rounded-xl text-white placeholder-white/60 backdrop-blur-sm ${
                        confirmPassword && !passwordsMatch ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''
                      }`}
                      required
                    />
                    <Lock className="absolute left-3 top-4 h-5 w-5 text-white/60" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-10 top-4 text-white/60 hover:text-white transition-colors group"
                    >
                      {showConfirmPassword ? 
                        <EyeOff className="h-5 w-5 group-hover:scale-110 transition-transform" /> : 
                        <Eye className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      }
                    </button>
                    {confirmPassword && (
                      <div className="absolute right-3 top-4">
                        {passwordsMatch ? (
                          <div className="bg-green-500/20 rounded-full p-1">
                            <Check className="h-3 w-3 text-green-400" />
                          </div>
                        ) : (
                          <div className="bg-red-500/20 rounded-full p-1">
                            <X className="h-3 w-3 text-red-400" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {confirmPassword && !passwordsMatch && (
                    <p className="text-sm text-red-300 font-medium flex items-center">
                      <X className="h-4 w-4 mr-1" />
                      Les mots de passe ne correspondent pas
                    </p>
                  )}
                </div>

                <div className="fade-in-up" style={{animationDelay: '0.6s'}}>
                  <Button
                    type="submit"
                    className="interactive-button w-full h-14 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 hover:from-green-700 hover:via-blue-700 hover:to-purple-700 text-white font-bold text-lg shadow-2xl rounded-xl border-0"
                    disabled={loading || !allRequirementsMet || !passwordsMatch}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Création du compte...
                      </div>
                    ) : (
                      <span className="flex items-center">
                        <UserPlus className="h-5 w-5 mr-3" />
                        Créer mon compte
                      </span>
                    )}
                  </Button>
                </div>
              </form>

              <div className="text-center pt-4 border-t border-white/20 fade-in-up" style={{animationDelay: '0.7s'}}>
                <p className="text-white/90 text-base font-medium">
                  Déjà un compte ?{' '}
                  <Link 
                    to="/login" 
                    className="text-blue-300 hover:text-blue-200 font-bold transition-all duration-300 hover:underline"
                  >
                    Se connecter
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
