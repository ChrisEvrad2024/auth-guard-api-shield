
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md">
        <Card className="bg-white/95 backdrop-blur-xl border-0 shadow-2xl rounded-2xl overflow-hidden">
          <CardHeader className="text-center pb-8 pt-8 px-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mb-6 shadow-xl">
              <AlertTriangle className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-6xl font-bold text-gray-900 mb-4">404</CardTitle>
            <CardDescription className="text-gray-600 text-xl font-medium">
              Oops! Page introuvable
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 px-8 pb-8">
            <div className="text-center">
              <p className="text-gray-600 text-lg mb-8">
                La page que vous recherchez n'existe pas ou a été déplacée.
              </p>
              <Link to="/">
                <Button className="w-full h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl rounded-xl">
                  <Home className="h-5 w-5 mr-3" />
                  Retour à l'accueil
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
