import React, { useState } from 'react';
import { Search, Building, Users, Briefcase } from 'lucide-react';
import { Member } from '../types';

interface CompanyDirectoryProps {
  members: Member[];
}

export const CompanyDirectory: React.FC<CompanyDirectoryProps> = ({ members }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Extract and organize companies
  const companyData = new Map<string, { current: Member[], previous: Member[] }>();

  members.forEach(member => {
    // Current company
    if (member.currentCompany) {
      if (!companyData.has(member.currentCompany)) {
        companyData.set(member.currentCompany, { current: [], previous: [] });
      }
      companyData.get(member.currentCompany)!.current.push(member);
    }

    // Previous companies
    if (member.previousCompanies) {
      member.previousCompanies.split(',').forEach(company => {
        const trimmedCompany = company.trim();
        if (trimmedCompany) {
          if (!companyData.has(trimmedCompany)) {
            companyData.set(trimmedCompany, { current: [], previous: [] });
          }
          companyData.get(trimmedCompany)!.previous.push(member);
        }
      });
    }
  });

  const companies = Array.from(companyData.entries()).map(([name, data]) => ({
    name,
    currentCount: data.current.length,
    previousCount: data.previous.length,
    totalCount: data.current.length + data.previous.length,
    currentMembers: data.current,
    previousMembers: data.previous,
  }));

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => b.totalCount - a.totalCount);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Company Directory</h2>
          <p className="text-gray-600">Explore companies in our network</p>
        </div>
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {filteredCompanies.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? 'No companies found' : 'No companies yet'}
          </h3>
          <p className="text-gray-500">
            {searchTerm ? 'Try adjusting your search terms' : 'Add members to see companies'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCompanies.map((company) => (
            <div key={company.name} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{company.name}</h3>
                    <p className="text-sm text-gray-600">
                      {company.totalCount} connection{company.totalCount !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-900">Current</span>
                  </div>
                  <p className="text-2xl font-bold text-green-700">{company.currentCount}</p>
                </div>
                <div className="bg-amber-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="w-4 h-4 text-amber-600" />
                    <span className="text-sm font-medium text-amber-900">Previous</span>
                  </div>
                  <p className="text-2xl font-bold text-amber-700">{company.previousCount}</p>
                </div>
              </div>

              <div className="space-y-3">
                {company.currentMembers.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Current Employees</h4>
                    <div className="space-y-1">
                      {company.currentMembers.map((member) => (
                        <div key={`current-${member.id}`} className="text-sm text-gray-600 flex justify-between">
                          <span>{member.name}</span>
                          <span className="text-gray-500">{member.position}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {company.previousMembers.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Former Employees</h4>
                    <div className="space-y-1">
                      {company.previousMembers.slice(0, 3).map((member, index) => (
                        <div key={`previous-${member.id}-${index}`} className="text-sm text-gray-600">
                          <span>{member.name}</span>
                        </div>
                      ))}
                      {company.previousMembers.length > 3 && (
                        <p className="text-xs text-gray-500">
                          +{company.previousMembers.length - 3} more
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};