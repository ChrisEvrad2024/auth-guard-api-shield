
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'verified' | 'unverified' | 'enabled' | 'disabled' | 'pending';
  className?: string;
  showIcon?: boolean;
  animated?: boolean;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className,
  showIcon = true,
  animated = true
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'active':
      case 'verified':
      case 'enabled':
        return {
          icon: CheckCircle,
          text: status === 'active' ? 'Actif' : status === 'verified' ? 'Vérifié' : 'Activé',
          className: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200',
          iconColor: 'text-green-600'
        };
      case 'inactive':
      case 'disabled':
        return {
          icon: XCircle,
          text: status === 'inactive' ? 'Inactif' : 'Désactivé',
          className: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200',
          iconColor: 'text-red-600'
        };
      case 'unverified':
        return {
          icon: AlertTriangle,
          text: 'Non vérifié',
          className: 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200',
          iconColor: 'text-orange-600'
        };
      case 'pending':
        return {
          icon: Clock,
          text: 'En attente',
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200',
          iconColor: 'text-yellow-600'
        };
      default:
        return {
          icon: XCircle,
          text: 'Inconnu',
          className: 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200',
          iconColor: 'text-gray-600'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <Badge 
      className={cn(
        'flex items-center space-x-1 font-medium border transition-all duration-200',
        animated && 'hover:scale-105 hover:shadow-md',
        config.className,
        className
      )}
    >
      {showIcon && (
        <Icon 
          className={cn(
            'h-3 w-3',
            config.iconColor,
            animated && status === 'pending' && 'animate-pulse'
          )} 
        />
      )}
      <span>{config.text}</span>
    </Badge>
  );
};

export default StatusBadge;
