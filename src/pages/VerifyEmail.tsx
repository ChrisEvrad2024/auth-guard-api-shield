
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Mail, RefreshCw, CheckCircle, Shield, Sparkles } from 'lucide-react';
import AnimatedIcon from '@/components/ui/animated-icon';

const VerifyEmail = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const { verifyEmail, resendVerificationCode } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await verifyEmail(code);
      toast({
        title: "Email vérifié",
        description: "Votre compte a été activé avec succès !",
      });
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Code invalide",
        description: error.message || "Le code de vérification est incorrect",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);

    try {
      await resendVerificationCode();
      toast({
        title: "Code renvoyé",
        description: "Un nouveau code de vérification a été envoyé",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de renvoyer le code",
        variant: "destructive",
      });
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 gradient-bg">
      {/* Éléments décoratifs flottants */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl floating-animation"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-green-500/10 rounded-full blur-lg floating-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-3/4 w-16 h-16 bg-purple-500/10 rounded-full blur-md floating-animation" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="morphing-border fade-in-scale">
          <Card className="auth-card">
            <CardHeader className="text-center pb-8 pt-8 px-8">
              <div className="mx-auto w-24 h-24 bg-gradient-to-r from-blue-500 via-green-600 to-teal-600 rounded-full flex items-center justify-center mb-6 shadow-2xl pulse-glow">
                <AnimatedIcon 
                  icon={Mail} 
                  animation="glow" 
                  size={32} 
                  color="white" 
                />
              </div>
              <CardTitle className="text-4xl font-bold gradient-text mb-3 slide-in-right">
                Vérification Email
              </CardTitle>
              <CardDescription className="text-white/90 text-lg font-medium slide-in-right" style={{animationDelay: '0.1s'}}>
                Saisissez le code à 6 chiffres envoyé à votre adresse email
              </CardDescription>
              <div className="flex items-center justify-center mt-4 slide-in-right" style={{animationDelay: '0.2s'}}>
                <Sparkles className="h-4 w-4 text-yellow-300 mr-2" />
                <span className="text-white/80 text-sm">Vérification sécurisée</span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-8 px-8 pb-8">
              <div className="glass-effect rounded-xl p-6 border border-white/20 fade-in-up" style={{animationDelay: '0.3s'}}>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-500/20 rounded-full p-2 status-indicator status-active">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white mb-2">Email envoyé !</p>
                    <p className="text-white/80">
                      Vérifiez votre boîte mail (et vos spams) pour le code de vérification.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4 fade-in-up" style={{animationDelay: '0.4s'}}>
                  <Label htmlFor="code" className="text-white font-bold text-xl flex items-center justify-center">
                    <Shield className="h-5 w-5 mr-2 text-blue-300" />
                    Code de vérification
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-green-500/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Input
                      id="code"
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="0 0 0 0 0 0"
                      className="relative enhanced-input text-center text-4xl tracking-[1em] h-20 font-mono bg-white/10 border-4 border-white/30 focus:border-blue-400 focus:ring-blue-400 rounded-2xl text-white placeholder-white/40 backdrop-blur-sm shadow-2xl"
                      maxLength={6}
                      required
                    />
                  </div>
                  <p className="text-white/70 text-base text-center font-semibold">
                    Entrez les 6 chiffres reçus par email
                  </p>
                </div>

                <div className="fade-in-up" style={{animationDelay: '0.5s'}}>
                  <Button
                    type="submit"
                    className="interactive-button w-full h-16 bg-gradient-to-r from-blue-600 via-green-600 to-teal-600 hover:from-blue-700 hover:via-green-700 hover:to-teal-700 text-white font-bold text-lg shadow-2xl rounded-xl border-0"
                    disabled={loading || code.length !== 6}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Vérification en cours...
                      </div>
                    ) : (
                      <span className="flex items-center">
                        <CheckCircle className="h-5 w-5 mr-3" />
                        Vérifier mon email
                      </span>
                    )}
                  </Button>
                </div>
              </form>

              <div className="text-center pt-6 border-t border-white/20 fade-in-up" style={{animationDelay: '0.6s'}}>
                <p className="text-white/90 text-lg mb-4 font-semibold">
                  Vous n'avez pas reçu le code ?
                </p>
                <Button
                  variant="outline"
                  onClick={handleResend}
                  disabled={resendLoading}
                  className="interactive-button bg-white/10 text-white border-2 border-white/30 hover:bg-white/20 hover:border-white/50 h-14 px-8 font-bold rounded-xl backdrop-blur-sm"
                >
                  <RefreshCw className={`h-5 w-5 mr-3 ${resendLoading ? 'animate-spin' : ''}`} />
                  {resendLoading ? 'Envoi en cours...' : 'Renvoyer le code'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
