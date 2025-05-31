'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, formatPercentage, getPercentageColor } from '@/lib/utils';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface StatsCardProps {
  title: string;
  amount: number;
  percentageChange: number;
  icon?: React.ReactNode;
  bgGradient?: string;
}

export default function StatsCard({
  title,
  amount,
  percentageChange,
  icon,
  bgGradient = 'from-blue-500 to-indigo-600',
}: StatsCardProps) {
  const isPositive = percentageChange >= 0;
  const ArrowIcon = isPositive ? ArrowUpIcon : ArrowDownIcon;
  const percentageColor = getPercentageColor(percentageChange);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-none shadow-md overflow-hidden relative">
        <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-10 rounded-lg`} />
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-zinc-700 flex items-center">
            {icon && <span className="mr-2">{icon}</span>}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-1">{formatCurrency(amount)}</div>
          <div className="flex items-center">
            <div className={`inline-flex items-center ${percentageColor}`}>
              <ArrowIcon className="h-4 w-4 mr-1" />
              <span>{formatPercentage(Math.abs(percentageChange))}</span>
            </div>
            <span className="text-zinc-500 text-sm ml-1">vs mois dernier</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 