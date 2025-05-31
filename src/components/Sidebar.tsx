'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Icons
import {
  ChartBarIcon,
  ChartPieIcon,
  CurrencyDollarIcon,
  HomeIcon,
  ArrowTrendingUpIcon,
  UserIcon,
  Cog6ToothIcon,
  FlagIcon,
} from '@heroicons/react/24/outline';

const menuItems = [
  {
    name: 'Tableau de bord',
    icon: HomeIcon,
    path: '/dashboard',
  },
  {
    name: 'Portfolio',
    icon: CurrencyDollarIcon,
    path: '/portfolio',
  },
  {
    name: 'Évolution',
    icon: ArrowTrendingUpIcon,
    path: '/evolution',
  },
  {
    name: 'Allocation',
    icon: ChartPieIcon,
    path: '/allocation',
  },
  {
    name: 'Objectif',
    icon: FlagIcon,
    path: '/objectif',
  },
  {
    name: 'Analyse',
    icon: ChartBarIcon,
    path: '/analyse',
  },
];

const bottomMenuItems = [
  {
    name: 'Paramètres',
    icon: Cog6ToothIcon,
    path: '/settings',
  },
  {
    name: 'Mon compte',
    icon: UserIcon,
    path: '/account',
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex flex-col h-screen w-64 bg-zinc-950 text-white py-8 px-4">
      <div className="mb-8 px-4">
        <Link href="/dashboard">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            InvestFlow
          </h1>
        </Link>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path}>
                <Link 
                  href={item.path}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors relative",
                    isActive ? "text-white" : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-indicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto">
        <ul className="space-y-2">
          {bottomMenuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path}>
                <Link 
                  href={item.path}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                    isActive ? "text-white bg-zinc-900" : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
} 