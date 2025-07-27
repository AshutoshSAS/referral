import React, { useState } from 'react';
import { Lock, Users } from 'lucide-react';

interface LoginProps {
  onLogin: (userName: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [passcode, setPasscode] = useState('');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'ladai2024' && userName.trim()) {
      onLogin(userName.trim());
    } else if (passcode !== 'ladai2024') {
      setError('Incorrect passcode');
    } else {
      setError('Please enter your name');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-amber-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
            <Users className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Ladai Ho To Bulana Lena Network
          </h1>
          <p className="text-gray-600">
            Welcome to our referral community
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label htmlFor="passcode" className="block text-sm font-medium text-gray-700 mb-2">
              Passcode
            </label>
            <div className="relative">
              <input
                type="password"
                id="passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter passcode"
                required
              />
              <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Enter Network
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Private network for friends only
          </p>
        </div>
      </div>
    </div>
  );
};