import React from 'react';
import { User, Key, Bell, Shield, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, clear context/localStorage
    navigate('/login');
  };

  return (
    <div className="h-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Platform Settings</h2>
        <p className="text-textMuted text-sm">Manage your profile, API keys, and notification preferences.</p>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-1 space-y-2">
          <button className="w-full text-left px-4 py-3 bg-bgPanel border border-borderC rounded-lg text-sm font-medium flex items-center gap-3">
            <User size={18} className="text-brandBlue"/> Profile & Account
          </button>
          <button className="w-full text-left px-4 py-3 hover:bg-bgPanel rounded-lg text-sm font-medium flex items-center gap-3 text-textMuted transition-colors">
            <Key size={18}/> API Configuration
          </button>
          <button className="w-full text-left px-4 py-3 hover:bg-bgPanel rounded-lg text-sm font-medium flex items-center gap-3 text-textMuted transition-colors">
            <Bell size={18}/> Notifications
          </button>
          <button className="w-full text-left px-4 py-3 hover:bg-bgPanel rounded-lg text-sm font-medium flex items-center gap-3 text-textMuted transition-colors">
            <Shield size={18}/> Security
          </button>
        </div>

        <div className="col-span-2 space-y-6">
          <div className="bg-bgCard border border-borderC rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-4">Profile Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-textMuted mb-1 uppercase tracking-wider">Full Name</label>
                <input type="text" value="Astha" readOnly className="w-full bg-bgPanel border border-borderC rounded-lg py-2 px-3 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-textMuted mb-1 uppercase tracking-wider">Email Address</label>
                <input type="email" value="astha@psm.com" readOnly className="w-full bg-bgPanel border border-borderC rounded-lg py-2 px-3 text-sm text-textMuted" />
              </div>
              <div>
                <label className="block text-xs font-medium text-textMuted mb-1 uppercase tracking-wider">Role</label>
                <input type="text" value="Operations Analyst" readOnly className="w-full bg-bgPanel border border-borderC rounded-lg py-2 px-3 text-sm text-textMuted" />
              </div>
            </div>
          </div>

          <div className="bg-bgCard border border-borderC rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Key size={18} className="text-brandBlue"/> AI Integrations</h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-medium text-textMuted mb-1 uppercase tracking-wider">Hugging Face Token</label>
                <input type="password" value="********" readOnly className="w-full bg-bgPanel border border-borderC rounded-lg py-2 px-3 text-sm font-mono text-textMuted" />
                <p className="text-xs text-textMuted mt-1">Used for Vector DB Embeddings.</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-textMuted mb-1 uppercase tracking-wider">Gemini API Key</label>
                <input type="password" value="********" readOnly className="w-full bg-bgPanel border border-borderC rounded-lg py-2 px-3 text-sm font-mono text-textMuted" />
                <p className="text-xs text-textMuted mt-1">Used for RAG Intelligence generation.</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button 
              onClick={handleLogout}
              className="bg-accentRed/10 hover:bg-accentRed/20 border border-accentRed/30 text-accentRed px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
