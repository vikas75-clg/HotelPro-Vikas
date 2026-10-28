import React, { useState } from 'react';
import { AuthIllustration } from './AuthIllustration';
import { User, UserRole } from '../types';
import { CheckCircle2, ChevronDown, UserPlus, AlertCircle } from 'lucide-react';

interface RegisterViewProps {
  onRegister: (newUser: Omit<User, 'id'>) => boolean;
  onNavigateToLogin: () => void;
}

export const RegisterView: React.FC<RegisterViewProps> = ({
  onRegister,
  onNavigateToLogin,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<UserRole>('Ordinary');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim() || !email.trim() || !password.trim() || !phone.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    const ok = onRegister({
      name: fullName.trim(),
      email: email.trim().toLowerCase(),
      password: password.trim(),
      phone: phone.trim(),
      type: role,
    });

    if (ok) {
      setSuccess(true);
      setTimeout(() => {
        onNavigateToLogin();
      }, 1500);
    } else {
      setError('A user with this email already exists.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] bg-slate-50 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        {/* Subheader Title */}
        <div className="bg-slate-100/70 border-b border-slate-200 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          User Register : RoomsForUse
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          {/* Left Illustration */}
          <div className="p-6 md:p-10 flex flex-col items-center justify-center bg-gradient-to-b from-blue-50/50 to-white">
            <AuthIllustration />
            <p className="mt-4 text-xs text-center text-slate-500 max-w-sm">
              Streamline reservations, room inventories, and hospitality management with HotelPro.
            </p>
          </div>

          {/* Right Form matching Screenshot 1 */}
          <div className="p-8 sm:p-12 border-t md:border-t-0 md:border-l border-slate-200">
            <div className="max-w-md mx-auto">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 text-center md:text-left">
                Register for the Account
              </h2>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Account registered successfully! Redirecting to login...</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-4 py-2.5 rounded-md border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                </div>

                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
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

                <div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter Mobile no."
                    className="w-full px-4 py-2.5 rounded-md border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                </div>

                {/* SELECT USER dropdown matching screenshot */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-auto px-4 py-2 bg-blue-600 text-white text-xs font-semibold tracking-wider uppercase rounded shadow-xs flex items-center justify-between gap-2 hover:bg-blue-700 transition"
                  >
                    <span>SELECT USER : {role === 'Ordinary' ? 'User' : 'Admin'}</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-slate-200 py-1 z-20">
                      <button
                        type="button"
                        onClick={() => {
                          setRole('Ordinary');
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs font-medium ${
                          role === 'Ordinary' ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        Ordinary User / Guest
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setRole('Admin');
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs font-medium ${
                          role === 'Admin' ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        Hotel Administrator (Admin)
                      </button>
                    </div>
                  )}
                </div>

                {/* REGISTER button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-auto min-w-[130px] px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs uppercase tracking-wider rounded shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    REGISTER
                  </button>
                </div>
              </form>

              {/* Footer link matching screenshot */}
              <div className="mt-6 text-xs text-slate-600">
                Had an account?{' '}
                <button
                  onClick={onNavigateToLogin}
                  className="text-red-500 hover:text-red-600 font-semibold cursor-pointer underline"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
