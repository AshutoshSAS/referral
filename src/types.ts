export interface Member {
  id: string;
  name: string;
  currentCompany: string;
  position: string;
  previousCompanies: string;
  linkedinUrl: string;
  skills: string;
  email: string;
}

export interface ReferralRequest {
  id: string;
  fromMember: string;
  toMember: string;
  message: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}