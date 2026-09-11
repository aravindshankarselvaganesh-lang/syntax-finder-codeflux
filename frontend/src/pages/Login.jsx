import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User, Activity, AlertTriangle, ArrowRight } from 'lucide-react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('astha@psm.com');
  const [password, setPassword] = useState('demo');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Demo accounts
    if (
      (email === 'astha@psm.com' && password === 'demo') ||
      (email === 'admin@psm.com' && password === 'admin123')
    ) {
      onLogin(email);
      navigate('/');
    } else {
      setError('Invalid demo credentials. Try astha@psm.com / demo');
    }
  };

  return (
    <div className="min-h-screen bg-bgMain flex text-textMain font-sans">
      
      {/* Left Side - Visuals */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-[#0a111c] border-r border-borderC">
        {/* Abstract Map Background */}
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: 'radial-gradient(circle at 50% 50%, #2C81FF 0%, transparent 60%), linear-gradient(0deg, #060B14 0%, transparent 100%)',
          backgroundSize: '100% 100%' 
        }}></div>
        
        {/* Grid lines overlay */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(rgba(35, 50, 74, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(35, 50, 74, 0.3) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }}></div>

        <div className="relative z-10 flex flex-col justify-center p-16 w-full max-w-2xl">
          <div className="mb-8 flex items-center gap-3">
            <div className="w-12 h-12 bg-brandBlue rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(44,129,255,0.4)]">
              <Shield size={28} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">PSM <span className="text-brandBlue">Copilot</span></h1>
          </div>
          
          <h2 className="text-3xl font-bold mb-4">Intelligent Drilling<br/>Command Center</h2>
          <p className="text-textMuted text-lg mb-12 max-w-md leading-relaxed">
            Real-time telemetry, predictive risk analysis, and RAG-powered historical insights for onshore drilling operations.
          </p>

          {/* Floating UI Elements for visual interest */}
          <div className="space-y-4">
            <div className="bg-bgPanel/80 backdrop-blur border border-borderC p-4 rounded-xl flex items-center gap-4 w-80 transform -rotate-1 shadow-2xl">
              <Activity className="text-accentGreen" />
              <div>
                <p className="text-xs text-textMuted">Assam-07 Telemetry</p>
                <p className="font-bold">Active • Optimal ROP</p>
              </div>
            </div>
            <div className="bg-bgPanel/80 backdrop-blur border border-accentRed/30 p-4 rounded-xl flex items-center gap-4 w-80 transform translate-x-12 rotate-1 shadow-2xl">
              <AlertTriangle className="text-accentRed" />
              <div>
                <p className="text-xs text-textMuted">Gujarat-12 Alert</p>
                <p className="font-bold text-accentRed">Pressure Anomaly Detected</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 bg-bgMain relative">
        <div className="absolute top-8 right-8 text-xs font-mono text-textMuted border border-borderC px-3 py-1 rounded bg-bgPanel">
          SYSTEM STATUS: ONLINE
        </div>

        <div className="w-full max-w-md">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold mb-2">Secure Access</h2>
            <p className="text-textMuted">Enter your credentials to access the grid.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-textMuted mb-1.5 uppercase tracking-wider">Operator ID / Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={16} className="text-textMuted" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-bgPanel border border-borderC rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-brandBlue focus:ring-1 focus:ring-brandBlue transition-all"
                  placeholder="operator@psm.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-textMuted mb-1.5 uppercase tracking-wider">Access Clearance Code</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={16} className="text-textMuted" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-bgPanel border border-borderC rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-brandBlue focus:ring-1 focus:ring-brandBlue transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-accentRed/10 border border-accentRed/20 text-accentRed text-sm p-3 rounded flex items-center gap-2">
                <AlertTriangle size={16} /> {error}
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-brandBlue hover:bg-blue-600 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 mt-4"
            >
              Initialize Session <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-10 border-t border-borderC pt-6">
            <p className="text-xs text-textMuted mb-3 uppercase tracking-wider font-semibold">Available Demo Accounts</p>
            <div className="space-y-2">
              <div 
                onClick={() => { setEmail('astha@psm.com'); setPassword('demo'); }}
                className="bg-bgPanel border border-borderC p-3 rounded-lg flex justify-between items-center cursor-pointer hover:border-brandBlue transition-colors"
              >
                <div>
                  <p className="text-sm font-medium">Astha (Lead Engineer)</p>
                  <p className="text-xs text-textMuted">astha@psm.com</p>
                </div>
                <span className="text-xs bg-brandBlue/20 text-brandBlue px-2 py-1 rounded font-mono">pwd: demo</span>
              </div>
              <div 
                onClick={() => { setEmail('admin@psm.com'); setPassword('admin123'); }}
                className="bg-bgPanel border border-borderC p-3 rounded-lg flex justify-between items-center cursor-pointer hover:border-brandBlue transition-colors"
              >
                <div>
                  <p className="text-sm font-medium">System Admin</p>
                  <p className="text-xs text-textMuted">admin@psm.com</p>
                </div>
                <span className="text-xs bg-brandBlue/20 text-brandBlue px-2 py-1 rounded font-mono">pwd: admin123</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
