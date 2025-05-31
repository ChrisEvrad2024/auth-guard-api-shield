import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Eye, Users, Key, Zap } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: "Sécurité avancée",
      description: "Authentification multi-facteurs et chiffrement des données"
    },
    {
      icon: Lock,
      title: "Protection des mots de passe",
      description: "Hachage bcrypt et politiques de mots de passe robustes"
    },
    {
      icon: Eye,
      title: "Vérification d'email",
      description: "Validation automatique avec codes de vérification"
    },
    {
      icon: Users,
      title: "Gestion des rôles",
      description: "Système de permissions granulaire et flexible"
    },
    {
      icon: Key,
      title: "Tokens sécurisés",
      description: "JWT avec refresh tokens et révocation automatique"
    },
    {
      icon: Zap,
      title: "Rate limiting",
      description: "Protection contre les attaques par force brute"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg min-h-screen flex items-center justify-center p-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Auth Guard
              <span className="block text-3xl md:text-4xl text-white/80 mt-2">
                API Shield
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Système d'authentification sécurisé avec protection avancée, 
              gestion des rôles et authentification multi-facteurs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-white/90 px-8 py-3 text-lg"
              >
                Commencer gratuitement
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg"
              >
                Se connecter
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Sécurité de niveau entreprise
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Protégez vos utilisateurs et vos données avec notre système 
              d'authentification robuste et moderne.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à sécuriser votre application ?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Rejoignez des milliers d'utilisateurs qui font confiance à Auth Guard 
            pour protéger leurs données.
          </p>
          <Link to="/register">
            <Button 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-white/90 px-8 py-3 text-lg"
            >
              Créer un compte
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-8 w-8 text-purple-400 mr-3" />
            <span className="text-2xl font-bold">Auth Guard API Shield</span>
          </div>
          <p className="text-gray-400">
            © 2024 Auth Guard. Tous droits réservés. Sécurité et protection des données.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
