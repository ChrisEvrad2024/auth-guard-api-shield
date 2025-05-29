
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Shield, 
  Mail, 
  Settings, 
  LogOut, 
  Key,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const Dashboard = () => {
  const { user, logout, toggleMFA } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const handleToggleMFA = async () => {
    try {
      await toggleMFA();
    } catch (error) {
      console.error('Failed to toggle MFA:', error);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header amélioré */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-600 mt-1">Bienvenue, {user.email}</p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </Button>
        </div>

        {/* Status Cards améliorées */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-md transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">Statut du compte</CardTitle>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                {user.is_active ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Actif</Badge>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-red-500" />
                    <Badge variant="destructive">Inactif</Badge>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-md transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">Email</CardTitle>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                {user.email_verified ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Vérifié</Badge>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-orange-500" />
                    <Badge variant="secondary">Non vérifié</Badge>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-violet-50 hover:shadow-md transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">Authentification 2FA</CardTitle>
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Shield className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                {user.mfa_enabled ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Activé</Badge>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-red-500" />
                    <Badge variant="secondary">Désactivé</Badge>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content amélioré */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Information */}
          <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-all duration-200">
            <CardHeader className="border-b border-gray-50">
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-indigo-600" />
                </div>
                Informations du profil
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-sm font-medium text-gray-900">{user.email}</p>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Rôle</label>
                  <Badge variant="outline" className="capitalize">{user.role.name}</Badge>
                </div>
                {user.last_login && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <label className="text-sm font-medium text-gray-500">Dernière connexion</label>
                    <p className="text-sm flex items-center gap-1 text-gray-900">
                      <Clock className="h-3 w-3" />
                      {format(new Date(user.last_login), 'PPp', { locale: fr })}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-all duration-200">
            <CardHeader className="border-b border-gray-50">
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Shield className="h-4 w-4 text-purple-600" />
                </div>
                Paramètres de sécurité
              </CardTitle>
              <CardDescription>
                Gérez vos paramètres de sécurité et d'authentification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="p-4 border border-gray-100 rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900">Authentification à deux facteurs</p>
                    <p className="text-xs text-gray-500">
                      {user.mfa_enabled ? 'Sécurité renforcée activée' : 'Recommandé pour plus de sécurité'}
                    </p>
                  </div>
                  <Button
                    onClick={handleToggleMFA}
                    variant={user.mfa_enabled ? "destructive" : "default"}
                    size="sm"
                    className="ml-2"
                  >
                    <Key className="h-4 w-4 mr-2" />
                    {user.mfa_enabled ? 'Désactiver' : 'Activer'}
                  </Button>
                </div>
              </div>

              <div className="p-4 border border-gray-100 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900">Changer le mot de passe</p>
                    <p className="text-xs text-gray-500">Modifiez votre mot de passe</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-2">
                    <Settings className="h-4 w-4 mr-2" />
                    Modifier
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Permissions */}
        {user.role.permissions && (
          <Card className="mt-6 border-0 shadow-sm bg-white hover:shadow-md transition-all duration-200">
            <CardHeader className="border-b border-gray-50">
              <CardTitle className="text-gray-800">Permissions</CardTitle>
              <CardDescription>
                Permissions associées à votre rôle : <span className="font-medium">{user.role.name}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {Object.entries(user.role.permissions as Record<string, any>).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                    {value ? (
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">{key}</p>
                      <p className="text-xs text-gray-500">{value ? 'Autorisé' : 'Refusé'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
