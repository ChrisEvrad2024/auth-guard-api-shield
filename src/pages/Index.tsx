
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Eye, Users, Key, Zap, ArrowRight, Sparkles, Star } from 'lucide-react';
import AnimatedIcon from '@/components/ui/animated-icon';

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: "Sécurité avancée",
      description: "Authentification multi-facteurs et chiffrement des données",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Lock,
      title: "Protection des mots de passe",
      description: "Hachage bcrypt et politiques de mots de passe robustes",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Eye,
      title: "Vérification d'email",
      description: "Validation automatique avec codes de vérification",
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: Users,
      title: "Gestion des rôles",
      description: "Système de permissions granulaire et flexible",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Key,
      title: "Tokens sécurisés",
      description: "JWT avec refresh tokens et révocation automatique",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: Zap,
      title: "Rate limiting",
      description: "Protection contre les attaques par force brute",
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section amélioré */}
      <section className="gradient-bg min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
        {/* Éléments décoratifs animés */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl floating-animation"></div>
          <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-white/10 rounded-full blur-2xl floating-animation" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-3/4 w-32 h-32 bg-white/5 rounded-full blur-xl floating-animation" style={{animationDelay: '4s'}}></div>
          
          {/* Particules flottantes */}
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full floating-animation"
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 12}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${4 + i * 0.5}s`
              }}
            />
          ))}
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="mb-8 fade-in-up">
            <div className="inline-flex items-center justify-center w-28 h-28 bg-white/20 rounded-full mb-8 pulse-glow backdrop-blur-sm border border-white/30">
              <AnimatedIcon 
                icon={Shield} 
                animation="glow" 
                size={48} 
                color="white" 
              />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 gradient-text slide-in-right">
              Auth Guard
              <span className="block text-4xl md:text-5xl text-white/90 mt-4 font-bold slide-in-right" style={{animationDelay: '0.2s'}}>
                API Shield
              </span>
            </h1>
            
            <div className="flex items-center justify-center mb-6 slide-in-right" style={{animationDelay: '0.3s'}}>
              <Star className="h-6 w-6 text-yellow-300 mr-2" />
              <Sparkles className="h-5 w-5 text-yellow-300 mr-2" />
              <span className="text-white/90 text-lg font-semibold">Interface Redesignée</span>
              <Sparkles className="h-5 w-5 text-yellow-300 ml-2" />
              <Star className="h-6 w-6 text-yellow-300 ml-2" />
            </div>
            
            <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-medium leading-relaxed slide-in-right" style={{animationDelay: '0.4s'}}>
              Système d'authentification sécurisé avec protection avancée, 
              gestion des rôles et authentification multi-facteurs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center fade-in-up" style={{animationDelay: '0.5s'}}>
            <Link to="/register">
              <Button 
                size="lg" 
                className="interactive-button bg-white text-purple-600 hover:bg-white/90 px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl border-0 h-auto"
              >
                <Sparkles className="h-6 w-6 mr-3" />
                Commencer gratuitement
                <ArrowRight className="h-6 w-6 ml-3" />
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                size="lg" 
                variant="outline" 
                className="interactive-button border-2 border-white/50 text-white hover:bg-white/20 hover:border-white/70 px-12 py-6 text-xl font-bold rounded-2xl backdrop-blur-sm h-auto"
              >
                <Shield className="h-6 w-6 mr-3" />
                Se connecter
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section amélioré */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
        {/* Motif de fond subtil */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #667eea 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-8 shadow-xl">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 gradient-text">
              Sécurité de niveau entreprise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
              Protégez vos utilisateurs et vos données avec notre système 
              d'authentification robuste et moderne.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="fade-in-up card-hover"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm h-full relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300" 
                       style={{background: `linear-gradient(135deg, var(--tw-gradient-stops))`, 
                               '--tw-gradient-from': feature.gradient.split(' ')[1], 
                               '--tw-gradient-to': feature.gradient.split(' ')[3]}}></div>
                  
                  <CardHeader className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <CardDescription className="text-gray-600 text-lg leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section amélioré */}
      <section className="py-24 gradient-bg relative overflow-hidden">
        {/* Éléments décoratifs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl floating-animation"></div>
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-2xl floating-animation" style={{animationDelay: '3s'}}></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center px-6 relative z-10">
          <div className="fade-in-up">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8 gradient-text">
              Prêt à sécuriser votre application ?
            </h2>
            <p className="text-2xl text-white/90 mb-12 font-medium leading-relaxed">
              Rejoignez des milliers d'utilisateurs qui font confiance à Auth Guard 
              pour protéger leurs données.
            </p>
            
            <div className="flex items-center justify-center mb-8">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full border-4 border-white flex items-center justify-center">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                ))}
              </div>
              <span className="ml-4 text-white/90 font-semibold">+1000 utilisateurs satisfaits</span>
            </div>
            
            <Link to="/register">
              <Button 
                size="lg" 
                className="interactive-button bg-white text-purple-600 hover:bg-white/90 px-16 py-8 text-2xl font-black rounded-2xl shadow-2xl border-0 h-auto"
              >
                <Sparkles className="h-8 w-8 mr-4" />
                Créer un compte
                <ArrowRight className="h-8 w-8 ml-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer amélioré */}
      <footer className="bg-gray-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"></div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="flex items-center justify-center mb-8 fade-in-up">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-3xl font-black gradient-text">Auth Guard API Shield</span>
          </div>
          <p className="text-gray-400 text-lg font-medium fade-in-up" style={{animationDelay: '0.1s'}}>
            © 2024 Auth Guard. Tous droits réservés. Sécurité et protection des données.
          </p>
          <div className="flex items-center justify-center mt-6 space-x-6 fade-in-up" style={{animationDelay: '0.2s'}}>
            <span className="text-gray-500">Fait avec</span>
            <span className="text-red-500 text-xl">❤️</span>
            <span className="text-gray-500">et beaucoup de</span>
            <Sparkles className="h-5 w-5 text-yellow-400" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
