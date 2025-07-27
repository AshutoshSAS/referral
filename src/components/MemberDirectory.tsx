import React, { useState } from 'react';
import { Search, Mail, ExternalLink, MessageSquare, Building, Award, User, Briefcase } from 'lucide-react';
import { Member, ReferralRequest } from '../types';
import { ReferralModal } from './ReferralModal';

interface MemberDirectoryProps {
  members: Member[];
  currentUser: string;
  onSendRequest: (request: Omit<ReferralRequest, 'id' | 'createdAt'>) => void;
}

export const MemberDirectory: React.FC<MemberDirectoryProps> = ({ 
  members, 
  currentUser, 
  onSendRequest 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.currentCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.skills.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.previousCompanies.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendRequest = (message: string) => {
    if (selectedMember) {
      onSendRequest({
        fromMember: currentUser,
        toMember: selectedMember.name,
        message,
        status: 'pending',
      });
      setIsModalOpen(false);
      setSelectedMember(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Member Directory</h2>
          <p className="text-gray-600">Find and connect with network members</p>
        </div>
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search members, companies, or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {filteredMembers.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? 'No members found' : 'No members yet'}
          </h3>
          <p className="text-gray-500">
            {searchTerm ? 'Try adjusting your search terms' : 'Add the first member to get started'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
              {/* Header Section */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">
                      {member.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    <div className="flex items-center space-x-2 text-gray-600 mt-1">
                      <Briefcase className="w-4 h-4" />
                      <span className="font-medium">{member.position}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Company Section */}
              <div className="mb-5">
                <div className="flex items-center space-x-2 mb-2">
                  <Building className="w-5 h-5 text-indigo-600" />
                  <span className="font-semibold text-gray-900">Current Company</span>
                </div>
                <div className="bg-indigo-50 rounded-lg p-3">
                  <p className="text-indigo-900 font-medium">{member.currentCompany}</p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-5">
                <div className="flex items-center space-x-2 mb-3">
                  <User className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-gray-900">Contact</span>
                </div>
                <div className="space-y-2">
                  {member.email && (
                    <div className="flex items-center space-x-3 text-sm">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <a 
                        href={`mailto:${member.email}`}
                        className="text-gray-700 hover:text-indigo-600 transition-colors"
                      >
                        {member.email}
                      </a>
                    </div>
                  )}
                  {member.linkedinUrl && (
                    <div className="flex items-center space-x-3 text-sm">
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                      <a 
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-indigo-600 transition-colors"
                      >
                        LinkedIn Profile
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Skills Section */}
              {member.skills && (
                <div className="mb-5">
                  <div className="flex items-center space-x-2 mb-3">
                    <Award className="w-5 h-5 text-amber-600" />
                    <span className="font-semibold text-gray-900">Skills & Expertise</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.split(',').map((skill, index) => (
                      <span
                        key={index}
                        className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Previous Companies Section */}
              {member.previousCompanies && (
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Building className="w-5 h-5 text-gray-600" />
                    <span className="font-semibold text-gray-900">Previous Experience</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex flex-wrap gap-2">
                      {member.previousCompanies.split(',').map((company, index) => (
                        <span
                          key={index}
                          className="bg-white text-gray-700 px-3 py-1 rounded-md text-sm border border-gray-200"
                        >
                          {company.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    setSelectedMember(member);
                    setIsModalOpen(true);
                  }}
                  className="flex-1 bg-indigo-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Request Referral</span>
                </button>
                
                <div className="flex gap-2">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                      title="Send Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                  
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                      title="View LinkedIn"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ReferralModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedMember(null);
        }}
        member={selectedMember}
        onSendRequest={handleSendRequest}
      />
    </div>
  );
};