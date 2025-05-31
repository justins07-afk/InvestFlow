'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatPercentage, getPercentageColor } from '@/lib/utils';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import { PencilIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface PortfolioCardProps {
  totalAmount: number;
  percentageChange: number;
  objectiveAmount: number;
  onUpdateValues: () => void;
  onAdjustObjective: () => void;
}

export default function PortfolioCard({
  totalAmount,
  percentageChange,
  objectiveAmount,
  onUpdateValues,
  onAdjustObjective,
}: PortfolioCardProps) {
  const isPositive = percentageChange >= 0;
  const ArrowIcon = isPositive ? ArrowUpIcon : ArrowDownIcon;
  const percentageColor = getPercentageColor(percentageChange);
  const percentComplete = Math.min(100, (totalAmount / objectiveAmount) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Card className="shadow-md border-none">
        <CardContent className="pt-6">
          <div className="flex flex-col space-y-6">
            <div>
              <h3 className="text-lg font-medium text-zinc-500 mb-2">Total du Portfolio</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{formatCurrency(totalAmount)}</span>
                <div className={`inline-flex items-center ${percentageColor}`}>
                  <ArrowIcon className="h-4 w-4 mr-1" />
                  <span>{formatPercentage(Math.abs(percentageChange))}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Progression vers l'objectif</span>
                <span className="font-medium">{Math.round(percentComplete)}%</span>
              </div>
              <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${percentComplete}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between text-xs text-zinc-400">
                <span>0 €</span>
                <span>{formatCurrency(objectiveAmount)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={onUpdateValues}
                className="flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800"
              >
                <ArrowPathIcon className="h-4 w-4" />
                <span>Mettre à jour les valeurs</span>
              </Button>
              <Button 
                onClick={onAdjustObjective}
                variant="outline"
                className="flex items-center justify-center gap-2 border-zinc-300"
              >
                <PencilIcon className="h-4 w-4" />
                <span>Ajuster mon objectif</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 