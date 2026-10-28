import React, { useState } from 'react';
import { AuthIllustration } from './AuthIllustration';
import { LogIn, AlertCircle, KeyRound, ShieldAlert } from 'lucide-react';

interface LoginViewProps {
  onLogin: (email: string, pass: string) => boolean;
  onNavigateToRegister: () => void;
  onQuickFill: (email: string, pass: string) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onLogin,
  onNavigateToRegister,
  onQuickFill,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please provide your email and password');
      return;
    }

    const success = onLogin(email.trim(), password);
    if (!success) {
      setError('Invalid email or password. Please check your credentials.');
    }
  };

  const handleDemoFill = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
  };

  return (
    <div className="min-h-[calc(100vh-100px)] bg-slate-50 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        {/* Subheader */}
        <div className="bg-slate-100/70 border-b border-slate-200 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          User Login : RoomsForUse
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          {/* Left Illustration */}
          <div className="p-6 md:p-10 flex flex-col items-center justify-center bg-gradient-to-b from-blue-50/50 to-white">
            <AuthIllustration />
            <div className="mt-4 w-full max-w-sm bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-900">
              <span className="font-semibold block mb-1">Instant Demo Logins (from screenshot):</span>
              <div className="flex flex-col gap-1.5 mt-2">
                <button
                  type="button"
                  onClick={() => handleDemoFill('s@gmail.com', 'admin')}
                  className="px-2.5 py-1.5 rounded bg-white hover:bg-blue-100 text-left border border-blue-200 text-slate-700 flex items-center justify-between transition"
                >
                  <span className="font-medium text-blue-700">Admin (sun):</span>
                  <span className="text-slate-500">s@gmail.com / admin</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoFill('sid@gmail.com', 'password123')}
                  className="px-2.5 py-1.5 rounded bg-white hover:bg-emerald-50 text-left border border-emerald-200 text-slate-700 flex items-center justify-between transition"
                >
                  <span className="font-medium text-emerald-700">Guest (sid):</span>
                  <span className="text-slate-500">sid@gmail.com / password123</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Form matching Screenshot 1 */}
          <div className="p-8 sm:p-12 border-t md:border-t-0 md:border-l border-slate-200">
            <div className="max-w-md mx-auto">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 text-center md:text-left">
                Login for the Account
              </h2>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full px-4 py-2.5 rounded-md border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                </div>

                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full px-4 py-2.5 rounded-md border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-auto min-w-[120px] px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs uppercase tracking-wider rounded shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    LOGIN
                  </button>
                </div>
              </form>

              {/* Footer link matching screenshot */}
              <div className="mt-8 text-xs text-slate-600">
                Don't have an account?{' '}
                <button
                  onClick={onNavigateToRegister}
                  className="text-red-500 hover:text-red-600 font-semibold cursor-pointer underline"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
