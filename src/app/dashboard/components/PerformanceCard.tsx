'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, formatPercentage, getPercentageColor } from '@/lib/utils';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import { InvestmentWithValue } from '@/types/investment';

interface PerformanceCardProps {
  title: string;
  investments: InvestmentWithValue[];
  type: 'best' | 'worst';
}

export default function PerformanceCard({ title, investments, type }: PerformanceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: type === 'best' ? 0.3 : 0.4 }}
    >
      <Card className="shadow-md h-full border-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-zinc-700">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {investments.map((investment) => {
              const isPositive = investment.percentage_change >= 0;
              const ArrowIcon = isPositive ? ArrowUpIcon : ArrowDownIcon;
              const percentageColor = getPercentageColor(investment.percentage_change);
              
              return (
                <li key={investment.id} className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg">
                  <div className="flex flex-col">
                    <span className="font-medium">{investment.name}</span>
                    <span className="text-xs text-zinc-500">{investment.subcategory}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className={`inline-flex items-center ${percentageColor} font-medium`}>
                      <ArrowIcon className="h-4 w-4 mr-1" />
                      <span>{formatPercentage(Math.abs(investment.percentage_change))}</span>
                    </div>
                    <span className="text-xs text-zinc-500">{formatCurrency(investment.currentValue)}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
} 