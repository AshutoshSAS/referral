import React from 'react';
import { Users, Building, MessageSquare, TrendingUp } from 'lucide-react';
import { Member, ReferralRequest } from '../types';

interface DashboardProps {
  members: Member[];
  referralRequests: ReferralRequest[];
  currentUser: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ members, referralRequests, currentUser }) => {
  const totalCompanies = new Set([
    ...members.map(m => m.currentCompany),
    ...members.flatMap(m => m.previousCompanies.split(',').map(c => c.trim()).filter(c => c))
  ]).size;

  const myRequests = referralRequests.filter(r => r.fromMember === currentUser);
  const requestsToMe = referralRequests.filter(r => r.toMember === currentUser);

  const stats = [
    {
      title: 'Total Members',
      value: members.length,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Companies',
      value: totalCompanies,
      icon: Building,
      color: 'bg-green-500',
    },
    {
      title: 'My Requests',
      value: myRequests.length,
      icon: MessageSquare,
      color: 'bg-amber-500',
    },
    {
      title: 'Requests to Me',
      value: requestsToMe.length,
      icon: TrendingUp,
      color: 'bg-indigo-500',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-indigo-600 to-amber-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          लड़ाई हो तो बुलाना लेना के रेफरल समाज में आपका स्वागत है!
        </h1>
        <p className="text-indigo-100 text-lg">
          Welcome to our exclusive friend referral network, {currentUser}
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <span className="text-sm font-medium">🤝 Help friends find opportunities</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <span className="text-sm font-medium">🚀 Grow together professionally</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <span className="text-sm font-medium">💼 Leverage our network</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Members</h3>
          <div className="space-y-3">
            {members.slice(-3).map((member) => (
              <div key={member.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 font-medium">
                    {member.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-600">{member.position} at {member.currentCompany}</p>
                </div>
              </div>
            ))}
            {members.length === 0 && (
              <p className="text-gray-500 text-center py-4">No members added yet</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <UserPlus className="w-5 h-5 text-indigo-600" />
                <div>
                  <p className="font-medium text-gray-900">Add New Member</p>
                  <p className="text-sm text-gray-600">Expand our network</p>
                </div>
              </div>
            </button>
            <button className="w-full text-left p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">Browse Members</p>
                  <p className="text-sm text-gray-600">Find connections</p>
                </div>
              </div>
            </button>
            <button className="w-full text-left p-4 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="font-medium text-gray-900">Send Referral Request</p>
                  <p className="text-sm text-gray-600">Get help from friends</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import { UserPlus } from 'lucide-react';