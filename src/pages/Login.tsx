
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, Shield, ArrowLeft, Sparkles } from 'lucide-react';
import AnimatedIcon from '@/components/ui/animated-icon';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur votre tableau de bord !",
      });
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Erreur de connexion",
        description: error.message || "Email ou mot de passe incorrect",
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
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-xl floating-animation"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-white/10 rounded-full blur-lg floating-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-3/4 w-16 h-16 bg-white/5 rounded-full blur-md floating-animation" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
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
            <CardHeader className="text-center pb-8 pt-8 px-8">
              <div className="mx-auto w-24 h-24 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 rounded-full flex items-center justify-center mb-6 shadow-2xl pulse-glow">
                <AnimatedIcon 
                  icon={Shield} 
                  animation="glow" 
                  size={32} 
                  color="white" 
                />
              </div>
              <CardTitle className="text-4xl font-bold gradient-text mb-3 slide-in-right">
                Connexion
              </CardTitle>
              <CardDescription className="text-gray-200 text-lg font-medium slide-in-right" style={{animationDelay: '0.1s'}}>
                Accédez à votre espace sécurisé
              </CardDescription>
              <div className="flex items-center justify-center mt-4 slide-in-right" style={{animationDelay: '0.2s'}}>
                <Sparkles className="h-4 w-4 text-yellow-300 mr-2" />
                <span className="text-white/80 text-sm">Interface redesignée</span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-8 px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4 fade-in-up" style={{animationDelay: '0.3s'}}>
                  <Label htmlFor="email" className="text-white font-semibold text-lg flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-blue-300" />
                    Email
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      className="relative enhanced-input h-16 pl-14 bg-white/10 border-2 border-white/20 focus:border-blue-400 focus:ring-blue-400 rounded-xl text-lg text-white placeholder-white/60 backdrop-blur-sm"
                      required
                    />
                    <Mail className="absolute left-4 top-5 h-6 w-6 text-white/60" />
                  </div>
                </div>
                
                <div className="space-y-4 fade-in-up" style={{animationDelay: '0.4s'}}>
                  <Label htmlFor="password" className="text-white font-semibold text-lg flex items-center">
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
                      className="relative enhanced-input h-16 pl-14 pr-16 bg-white/10 border-2 border-white/20 focus:border-purple-400 focus:ring-purple-400 rounded-xl text-lg text-white placeholder-white/60 backdrop-blur-sm"
                      required
                    />
                    <Lock className="absolute left-4 top-5 h-6 w-6 text-white/60" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-5 text-white/60 hover:text-white transition-colors group"
                    >
                      {showPassword ? 
                        <EyeOff className="h-6 w-6 group-hover:scale-110 transition-transform" /> : 
                        <Eye className="h-6 w-6 group-hover:scale-110 transition-transform" />
                      }
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm fade-in-up" style={{animationDelay: '0.5s'}}>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <input
                        id="remember"
                        type="checkbox"
                        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-white/30 rounded bg-white/10 backdrop-blur-sm"
                      />
                    </div>
                    <label htmlFor="remember" className="text-white/90 font-medium cursor-pointer">
                      Se souvenir de moi
                    </label>
                  </div>
                  <Link 
                    to="/forgot-password" 
                    className="text-blue-300 hover:text-blue-200 transition-colors font-semibold hover:underline"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>

                <div className="fade-in-up" style={{animationDelay: '0.6s'}}>
                  <Button
                    type="submit"
                    className="interactive-button w-full h-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold text-lg shadow-2xl rounded-xl border-0"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Connexion en cours...
                      </div>
                    ) : (
                      <span className="flex items-center">
                        <Shield className="h-5 w-5 mr-3" />
                        Se connecter
                      </span>
                    )}
                  </Button>
                </div>
              </form>

              <div className="text-center pt-6 border-t border-white/20 fade-in-up" style={{animationDelay: '0.7s'}}>
                <p className="text-white/90 text-lg font-medium">
                  Pas encore de compte ?{' '}
                  <Link 
                    to="/register" 
                    className="text-blue-300 hover:text-blue-200 font-bold transition-all duration-300 hover:underline"
                  >
                    S'inscrire gratuitement
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

export default Login;
