'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BanknotesIcon, CurrencyDollarIcon, FlagIcon } from '@heroicons/react/24/outline';
import { 
  totalFiat, 
  totalCrypto, 
  totalPortfolio, 
  objective, 
  historicalData, 
  previousYearData,
  getBestPerformers,
  getWorstPerformers
} from '@/lib/mock-data';

import StatsCard from './components/StatsCard';
import PortfolioCard from './components/PortfolioCard';
import EvolutionChart from './components/EvolutionChart';
import PerformanceCard from './components/PerformanceCard';

export default function DashboardPage() {
  // Calcul de l'évolution globale (pour le MVP, on utilise une valeur fixe)
  const portfolioChange = 5.3;
  const fiatChange = 1.8;
  const cryptoChange = 18.4;
  
  // Récupération des meilleures et pires performances
  const bestPerformers = getBestPerformers(2);
  const worstPerformers = getWorstPerformers(2);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold mb-8">Hello Justin !</h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatsCard 
          title="Total FIAT" 
          amount={totalFiat} 
          percentageChange={fiatChange}
          icon={<BanknotesIcon className="h-5 w-5 text-green-600" />}
          bgGradient="from-green-500 to-emerald-600"
        />
        <StatsCard 
          title="Total Crypto" 
          amount={totalCrypto} 
          percentageChange={cryptoChange}
          icon={<CurrencyDollarIcon className="h-5 w-5 text-purple-600" />}
          bgGradient="from-purple-500 to-indigo-600"
        />
        <StatsCard 
          title="Objectif 2025" 
          amount={objective.target_amount} 
          percentageChange={(totalPortfolio / objective.target_amount) * 100}
          icon={<FlagIcon className="h-5 w-5 text-blue-600" />}
          bgGradient="from-blue-500 to-cyan-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        <PortfolioCard 
          totalAmount={totalPortfolio}
          percentageChange={portfolioChange}
          objectiveAmount={objective.target_amount}
          onUpdateValues={() => {}}
          onAdjustObjective={() => {}}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        <EvolutionChart
          currentData={historicalData}
          previousYearData={previousYearData}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PerformanceCard
          title="Meilleures performances"
          investments={bestPerformers}
          type="best"
        />
        <PerformanceCard
          title="Pires performances"
          investments={worstPerformers}
          type="worst"
        />
      </div>

      {/* TODO: Modals pour la mise à jour des valeurs et l'ajustement de l'objectif */}
    </div>
  );
} 