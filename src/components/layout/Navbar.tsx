"use client";

import React, { useState } from "react";
import { Github, Flame, User as UserIcon, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState<'login' | 'signup' | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowAuthModal(null);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-brand-border">
        <div className="flex items-center gap-2">
          <div className="text-brand-orange">
            <Flame className="w-6 h-6 fill-current" />
          </div>
          <span className="text-xl font-semibold tracking-tight text-brand-dark">NEXA</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-brand-dark transition-colors">Products</a>
          <a href="#" className="hover:text-brand-dark transition-colors">Resources</a>
          <a href="#" className="hover:text-brand-dark transition-colors">Pricing</a>
          <a href="#" className="hover:text-brand-dark transition-colors">Docs</a>
          <a href="#" className="hover:text-brand-dark transition-colors">Playground</a>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="#" 
            className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand-dark transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>183.5K</span>
          </a>
          
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full text-sm font-medium text-brand-dark">
                <UserIcon className="w-4 h-4 text-brand-orange" />
                User
              </div>
              <button 
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-gray-100"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowAuthModal('login')}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-brand-dark transition-colors"
              >
                Log in
              </button>
              <button 
                onClick={() => setShowAuthModal('signup')}
                className="px-4 py-2 text-sm font-medium bg-brand-orange hover:bg-orange-600 text-white rounded-full transition-colors shadow-sm"
              >
                Sign up
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Mock Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl relative">
            <button 
              onClick={() => setShowAuthModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-brand-dark">
              {showAuthModal === 'login' ? 'Welcome back' : 'Create an account'}
            </h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-3 mt-2 font-medium text-white bg-brand-orange hover:bg-orange-600 rounded-xl transition-colors shadow-md"
              >
                {showAuthModal === 'login' ? 'Log in' : 'Sign up'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
