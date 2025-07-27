import React, { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { AddMemberForm } from './components/AddMemberForm';
import { MemberDirectory } from './components/MemberDirectory';
import { CompanyDirectory } from './components/CompanyDirectory';
import { ReferralRequests } from './components/ReferralRequests';
import { Header } from './components/Header';
import { Member, ReferralRequest } from './types';

type View = 'dashboard' | 'add-member' | 'members' | 'companies' | 'referrals';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string>('');
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [members, setMembers] = useState<Member[]>([]);
  const [referralRequests, setReferralRequests] = useState<ReferralRequest[]>([]);

  useEffect(() => {
    // Check if user is already authenticated
    const savedAuth = localStorage.getItem('lhtbln_auth');
    if (savedAuth) {
      const { isAuth, userName } = JSON.parse(savedAuth);
      setIsAuthenticated(isAuth);
      setCurrentUser(userName);
    }

    // Load data from localStorage
    const savedMembers = localStorage.getItem('lhtbln_members');
    if (savedMembers) {
      setMembers(JSON.parse(savedMembers));
    }

    const savedRequests = localStorage.getItem('lhtbln_requests');
    if (savedRequests) {
      setReferralRequests(JSON.parse(savedRequests));
    }
  }, []);

  const handleLogin = (userName: string) => {
    setIsAuthenticated(true);
    setCurrentUser(userName);
    localStorage.setItem('lhtbln_auth', JSON.stringify({ isAuth: true, userName }));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser('');
    localStorage.removeItem('lhtbln_auth');
    setCurrentView('dashboard');
  };

  const addMember = (member: Omit<Member, 'id'>) => {
    const newMember: Member = {
      ...member,
      id: Date.now().toString(),
    };
    const updatedMembers = [...members, newMember];
    setMembers(updatedMembers);
    localStorage.setItem('lhtbln_members', JSON.stringify(updatedMembers));
  };

  const sendReferralRequest = (request: Omit<ReferralRequest, 'id' | 'createdAt'>) => {
    const newRequest: ReferralRequest = {
      ...request,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const updatedRequests = [...referralRequests, newRequest];
    setReferralRequests(updatedRequests);
    localStorage.setItem('lhtbln_requests', JSON.stringify(updatedRequests));
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentUser={currentUser}
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={handleLogout}
      />
      
      <main className="container mx-auto px-4 py-8">
        {currentView === 'dashboard' && (
          <Dashboard 
            members={members}
            referralRequests={referralRequests}
            currentUser={currentUser}
          />
        )}
        {currentView === 'add-member' && (
          <AddMemberForm onAddMember={addMember} />
        )}
        {currentView === 'members' && (
          <MemberDirectory 
            members={members}
            currentUser={currentUser}
            onSendRequest={sendReferralRequest}
          />
        )}
        {currentView === 'companies' && (
          <CompanyDirectory members={members} />
        )}
        {currentView === 'referrals' && (
          <ReferralRequests 
            requests={referralRequests}
            members={members}
            currentUser={currentUser}
          />
        )}
      </main>
    </div>
  );
}

export default App;