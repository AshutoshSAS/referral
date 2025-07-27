import React from 'react';
import { Users, UserPlus, Building, MessageSquare, Home, LogOut } from 'lucide-react';

interface HeaderProps {
  currentUser: string;
  currentView: string;
  onViewChange: (view: 'dashboard' | 'add-member' | 'members' | 'companies' | 'referrals') => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentUser, currentView, onViewChange, onLogout }) => {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'add-member', label: 'Add Member', icon: UserPlus },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'companies', label: 'Companies', icon: Building },
    { id: 'referrals', label: 'Referrals', icon: MessageSquare },
  ];

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Users className="w-6 h-6 text-indigo-600" />
              <span className="font-bold text-gray-900 hidden sm:block">LHTBLN</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === item.id
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 hidden sm:block">
              Welcome, {currentUser}
            </span>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:block">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200">
          <div className="flex justify-around py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id as any)}
                  className={`flex flex-col items-center space-y-1 px-2 py-2 rounded-lg transition-colors ${
                    currentView === item.id
                      ? 'text-indigo-600'
                      : 'text-gray-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};