
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Mail, RefreshCw } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center gradient-bg p-4">
      <div className="w-full max-w-md">
        <Card className="auth-card">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">Vérification Email</CardTitle>
            <CardDescription className="text-white/70">
              Saisissez le code à 6 chiffres envoyé à votre adresse email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="code" className="text-white">Code de vérification</Label>
                <Input
                  id="code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="123456"
                  className="text-center text-2xl tracking-widest bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  maxLength={6}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-white text-purple-600 hover:bg-white/90 transition-all duration-200"
                disabled={loading || code.length !== 6}
              >
                {loading ? 'Vérification...' : 'Vérifier'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/70 text-sm mb-3">
                Vous n'avez pas reçu le code ?
              </p>
              <Button
                variant="ghost"
                onClick={handleResend}
                disabled={resendLoading}
                className="text-white hover:bg-white/10"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${resendLoading ? 'animate-spin' : ''}`} />
                Renvoyer le code
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerifyEmail;
