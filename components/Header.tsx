import React from 'react';
import Link from 'next/link';
import SiteLogo from './logos/SiteLogo';
import { GlobalData } from '../lib/types';

export default function Header({ name }: { name: GlobalData }): JSX.Element {
  return (
    <header className="sticky top-0 z-10 w-full bg-white/75 backdrop-blur-lg dark:bg-zinc-950/75">
      <div className="w-full px-4 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <SiteLogo siteData={name} />
          <nav className="flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}