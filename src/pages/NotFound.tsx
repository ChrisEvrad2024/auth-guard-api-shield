
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, AlertTriangle, ArrowLeft, Sparkles } from "lucide-react";
import AnimatedIcon from "@/components/ui/animated-icon";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 gradient-bg">
      {/* Éléments décoratifs flottants */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-500/10 rounded-full blur-xl floating-animation"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-red-500/10 rounded-full blur-lg floating-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-3/4 w-16 h-16 bg-yellow-500/10 rounded-full blur-md floating-animation" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="morphing-border fade-in-scale">
          <Card className="auth-card">
            <CardHeader className="text-center pb-8 pt-8 px-8">
              <div className="mx-auto w-24 h-24 bg-gradient-to-r from-orange-500 via-red-600 to-pink-600 rounded-full flex items-center justify-center mb-6 shadow-2xl pulse-glow">
                <AnimatedIcon 
                  icon={AlertTriangle} 
                  animation="glow" 
                  size={32} 
                  color="white" 
                />
              </div>
              <CardTitle className="text-8xl font-black gradient-text mb-4 slide-in-right">404</CardTitle>
              <CardDescription className="text-white/90 text-xl font-bold slide-in-right" style={{animationDelay: '0.1s'}}>
                Oops! Page introuvable
              </CardDescription>
              <div className="flex items-center justify-center mt-4 slide-in-right" style={{animationDelay: '0.2s'}}>
                <Sparkles className="h-4 w-4 text-yellow-300 mr-2" />
                <span className="text-white/80 text-sm">Erreur détectée</span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6 px-8 pb-8">
              <div className="text-center fade-in-up" style={{animationDelay: '0.3s'}}>
                <div className="glass-effect rounded-xl p-6 mb-8 border border-white/20">
                  <p className="text-white/90 text-lg font-medium">
                    La page que vous recherchez n'existe pas ou a été déplacée.
                  </p>
                </div>
                
                <Link to="/">
                  <Button className="interactive-button w-full h-16 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 hover:from-orange-700 hover:via-red-700 hover:to-pink-700 text-white font-bold text-lg shadow-2xl rounded-xl border-0">
                    <Home className="h-6 w-6 mr-3" />
                    Retour à l'accueil
                  </Button>
                </Link>
              </div>
              
              <div className="text-center pt-6 border-t border-white/20 fade-in-up" style={{animationDelay: '0.4s'}}>
                <p className="text-white/70 text-sm mb-4">
                  Besoin d'aide ? Essayez ces liens :
                </p>
                <div className="flex flex-col space-y-2">
                  <Link 
                    to="/login" 
                    className="text-blue-300 hover:text-blue-200 font-medium transition-all duration-300 hover:underline"
                  >
                    Se connecter
                  </Link>
                  <Link 
                    to="/register" 
                    className="text-green-300 hover:text-green-200 font-medium transition-all duration-300 hover:underline"
                  >
                    Créer un compte
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
