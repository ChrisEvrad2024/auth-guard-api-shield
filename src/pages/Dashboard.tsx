
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Bienvenue, {user.email}</p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </Button>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Statut du compte</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                {user.is_active ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <Badge variant="default" className="bg-green-100 text-green-800">Actif</Badge>
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

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Email</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                {user.email_verified ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <Badge variant="default" className="bg-green-100 text-green-800">Vérifié</Badge>
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

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Authentification 2FA</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                {user.mfa_enabled ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <Badge variant="default" className="bg-green-100 text-green-800">Activé</Badge>
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

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informations du profil
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-sm">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Rôle</label>
                <p className="text-sm capitalize">{user.role.name}</p>
              </div>
              {user.last_login && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Dernière connexion</label>
                  <p className="text-sm flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {format(new Date(user.last_login), 'PPp', { locale: fr })}
                  </p>
                </div>
              )}
              {user.email_verified_at && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Email vérifié le</label>
                  <p className="text-sm">
                    {format(new Date(user.email_verified_at), 'PPp', { locale: fr })}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Paramètres de sécurité
              </CardTitle>
              <CardDescription>
                Gérez vos paramètres de sécurité et d'authentification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Authentification à deux facteurs</p>
                  <p className="text-xs text-gray-500">
                    {user.mfa_enabled ? 'Sécurité renforcée activée' : 'Recommandé pour plus de sécurité'}
                  </p>
                </div>
                <Button
                  onClick={handleToggleMFA}
                  variant={user.mfa_enabled ? "destructive" : "default"}
                  size="sm"
                >
                  <Key className="h-4 w-4 mr-2" />
                  {user.mfa_enabled ? 'Désactiver' : 'Activer'}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Changer le mot de passe</p>
                  <p className="text-xs text-gray-500">Modifiez votre mot de passe</p>
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Permissions */}
        {user.role.permissions && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Permissions</CardTitle>
              <CardDescription>
                Permissions associées à votre rôle : {user.role.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {Object.entries(user.role.permissions as Record<string, any>).map(([key, value]) => (
                  <Badge key={key} variant={value ? "default" : "secondary"}>
                    {key}: {value ? 'Autorisé' : 'Refusé'}
                  </Badge>
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
