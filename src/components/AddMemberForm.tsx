import React, { useState } from 'react';
import { User, Building, Briefcase, Globe, Mail, Award } from 'lucide-react';
import { Member } from '../types';

interface AddMemberFormProps {
  onAddMember: (member: Omit<Member, 'id'>) => void;
}

export const AddMemberForm: React.FC<AddMemberFormProps> = ({ onAddMember }) => {
  const [formData, setFormData] = useState({
    name: '',
    currentCompany: '',
    position: '',
    previousCompanies: '',
    linkedinUrl: '',
    skills: '',
    email: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onAddMember(formData);
    setFormData({
      name: '',
      currentCompany: '',
      position: '',
      previousCompanies: '',
      linkedinUrl: '',
      skills: '',
      email: '',
    });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formFields = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      icon: User,
      placeholder: 'Enter full name',
      required: true,
    },
    {
      name: 'currentCompany',
      label: 'Current Company',
      type: 'text',
      icon: Building,
      placeholder: 'e.g., Google, Microsoft, Startup Inc.',
      required: true,
    },
    {
      name: 'position',
      label: 'Position/Role',
      type: 'text',
      icon: Briefcase,
      placeholder: 'e.g., Software Engineer, Product Manager',
      required: true,
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      icon: Mail,
      placeholder: 'email@example.com',
      required: true,
    },
    {
      name: 'linkedinUrl',
      label: 'LinkedIn Profile URL',
      type: 'url',
      icon: Globe,
      placeholder: 'https://linkedin.com/in/profile',
      required: false,
    },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-4">
            <User className="w-6 h-6 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Add New Member</h2>
          <p className="text-gray-600 mt-2">Expand our referral network</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formFields.map((field) => {
              const Icon = field.icon;
              return (
                <div key={field.name} className={field.name === 'name' ? 'md:col-span-2' : ''}>
                  <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  <div className="relative">
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder={field.placeholder}
                      required={field.required}
                    />
                    <Icon className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              );
            })}
          </div>

          <div>
            <label htmlFor="previousCompanies" className="block text-sm font-medium text-gray-700 mb-2">
              Previous Companies
            </label>
            <div className="relative">
              <textarea
                id="previousCompanies"
                name="previousCompanies"
                value={formData.previousCompanies}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Comma-separated list: Company1, Company2, Company3"
              />
              <Building className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 mt-1">Separate multiple companies with commas</p>
          </div>

          <div>
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
              Skills & Expertise
            </label>
            <div className="relative">
              <textarea
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Comma-separated list: React, Node.js, Python, Product Management"
              />
              <Award className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 mt-1">Separate multiple skills with commas</p>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Adding Member...' : 'Add Member'}
            </button>
            <button
              type="button"
              onClick={() => setFormData({
                name: '',
                currentCompany: '',
                position: '',
                previousCompanies: '',
                linkedinUrl: '',
                skills: '',
                email: '',
              })}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};