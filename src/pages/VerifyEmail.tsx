
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Mail, RefreshCw, CheckCircle } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md">
        <Card className="bg-white/95 backdrop-blur-xl border-0 shadow-2xl rounded-2xl overflow-hidden">
          <CardHeader className="text-center pb-8 pt-8 px-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-xl">
              <Mail className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Vérification Email</CardTitle>
            <CardDescription className="text-gray-600 text-lg">
              Saisissez le code à 6 chiffres envoyé à votre adresse email
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 px-8 pb-8">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-blue-900 mb-1">Email envoyé !</p>
                  <p className="text-sm text-blue-700">
                    Vérifiez votre boîte mail (et vos spams) pour le code de vérification.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <Label htmlFor="code" className="text-gray-700 font-semibold text-lg">Code de vérification</Label>
                <Input
                  id="code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="123456"
                  className="text-center text-3xl tracking-[0.8em] h-16 font-mono border-2 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl transition-all duration-200"
                  maxLength={6}
                  required
                />
                <p className="text-sm text-gray-500 text-center font-medium">
                  Entrez les 6 chiffres reçus par email
                </p>
              </div>

              <Button
                type="submit"
                className="w-full h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl rounded-xl"
                disabled={loading || code.length !== 6}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Vérification...
                  </div>
                ) : (
                  'Vérifier mon email'
                )}
              </Button>
            </form>

            <div className="text-center pt-6 border-t border-gray-100">
              <p className="text-gray-600 text-base mb-4 font-medium">
                Vous n'avez pas reçu le code ?
              </p>
              <Button
                variant="outline"
                onClick={handleResend}
                disabled={resendLoading}
                className="text-indigo-600 border-2 border-indigo-200 hover:bg-indigo-50 h-12 px-6 font-semibold rounded-xl transition-all duration-200"
              >
                <RefreshCw className={`h-5 w-5 mr-2 ${resendLoading ? 'animate-spin' : ''}`} />
                {resendLoading ? 'Envoi...' : 'Renvoyer le code'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerifyEmail;
