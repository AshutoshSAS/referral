import React from 'react';
import { MessageSquare, Send, Inbox, Clock, CheckCircle, XCircle } from 'lucide-react';
import { ReferralRequest, Member } from '../types';

interface ReferralRequestsProps {
  requests: ReferralRequest[];
  members: Member[];
  currentUser: string;
}

export const ReferralRequests: React.FC<ReferralRequestsProps> = ({ 
  requests, 
  members, 
  currentUser 
}) => {
  const sentRequests = requests.filter(r => r.fromMember === currentUser);
  const receivedRequests = requests.filter(r => r.toMember === currentUser);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-amber-500" />;
      case 'accepted':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'declined':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Referral Requests</h2>
        <p className="text-gray-600">Manage your sent and received referral requests</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sent Requests */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Send className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Sent Requests</h3>
              <p className="text-sm text-gray-600">{sentRequests.length} total</p>
            </div>
          </div>

          <div className="space-y-4">
            {sentRequests.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No sent requests yet</p>
                <p className="text-sm text-gray-400">Start by requesting referrals from members</p>
              </div>
            ) : (
              sentRequests.map((request) => (
                <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-medium text-gray-900">To: {request.toMember}</p>
                      <p className="text-sm text-gray-600">{formatDate(request.createdAt)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(request.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 bg-gray-50 rounded-lg p-3 text-sm">
                    {request.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Received Requests */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-green-100 rounded-lg">
              <Inbox className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Received Requests</h3>
              <p className="text-sm text-gray-600">{receivedRequests.length} total</p>
            </div>
          </div>

          <div className="space-y-4">
            {receivedRequests.length === 0 ? (
              <div className="text-center py-8">
                <Inbox className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No received requests yet</p>
                <p className="text-sm text-gray-400">Members will reach out when they need referrals</p>
              </div>
            ) : (
              receivedRequests.map((request) => (
                <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-medium text-gray-900">From: {request.fromMember}</p>
                      <p className="text-sm text-gray-600">{formatDate(request.createdAt)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(request.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 bg-gray-50 rounded-lg p-3 text-sm mb-3">
                    {request.message}
                  </p>
                  {request.status === 'pending' && (
                    <div className="flex gap-2">
                      <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                        Accept
                      </button>
                      <button className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-indigo-600">{sentRequests.length}</p>
            <p className="text-sm text-gray-600">Sent</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{receivedRequests.length}</p>
            <p className="text-sm text-gray-600">Received</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-amber-600">
              {requests.filter(r => r.status === 'pending').length}
            </p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {requests.filter(r => r.status === 'accepted').length}
            </p>
            <p className="text-sm text-gray-600">Accepted</p>
          </div>
        </div>
      </div>
    </div>
  );
};