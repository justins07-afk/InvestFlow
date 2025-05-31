import { Investment, InvestmentValue, InvestmentWithValue, Objective } from '@/types/investment';
import { v4 as uuidv4 } from 'uuid';

// Générer des IDs uniques
const generateId = () => uuidv4();

// Investissements FIAT
export const fiatInvestments: InvestmentWithValue[] = [
  {
    id: generateId(),
    name: 'LDD',
    category: 'FIAT',
    subcategory: 'Livret',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    currentValue: 12253,
    percentage_change: 1.2,
  },
  {
    id: generateId(),
    name: 'PEA',
    category: 'FIAT',
    subcategory: 'Bourse',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    currentValue: 2509,
    percentage_change: 2.5,
  },
  {
    id: generateId(),
    name: 'Yomoni',
    category: 'FIAT',
    subcategory: 'Assurance-vie',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    currentValue: 4081,
    percentage_change: -0.8,
  },
  {
    id: generateId(),
    name: 'MPP',
    category: 'FIAT',
    subcategory: 'Assurance-vie',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    currentValue: 4041,
    percentage_change: 0.5,
  },
  {
    id: generateId(),
    name: 'Livret A',
    category: 'FIAT',
    subcategory: 'Livret',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    currentValue: 11553,
    percentage_change: 3.0,
  },
  {
    id: generateId(),
    name: 'Crédit Agricole',
    category: 'FIAT',
    subcategory: 'Compte courant',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    currentValue: 0,
    percentage_change: 0,
  },
];

// Investissements CRYPTO
export const cryptoInvestments: InvestmentWithValue[] = [
  {
    id: generateId(),
    name: 'Nexo',
    category: 'CRYPTO',
    subcategory: 'Exchange',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    currentValue: 3301.63,
    percentage_change: 15.2,
  },
  {
    id: generateId(),
    name: 'Ledger',
    category: 'CRYPTO',
    subcategory: 'Cold Wallet',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    currentValue: 27665.14,
    percentage_change: 28.7,
  },
  {
    id: generateId(),
    name: 'Binance',
    category: 'CRYPTO',
    subcategory: 'Exchange',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    currentValue: 0,
    percentage_change: 0,
  },
  {
    id: generateId(),
    name: 'Coinbase',
    category: 'CRYPTO',
    subcategory: 'Exchange',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    currentValue: 0,
    percentage_change: 0,
  },
  {
    id: generateId(),
    name: 'Kraken',
    category: 'CRYPTO',
    subcategory: 'Exchange',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    currentValue: 0,
    percentage_change: 0,
  },
  {
    id: generateId(),
    name: 'xPortal',
    category: 'CRYPTO',
    subcategory: 'Hot Wallet',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    currentValue: 0,
    percentage_change: 0,
  },
];

// Tous les investissements
export const allInvestments = [...fiatInvestments, ...cryptoInvestments];

// Calcul des totaux
export const totalFiat = fiatInvestments.reduce((acc, inv) => acc + inv.currentValue, 0);
export const totalCrypto = cryptoInvestments.reduce((acc, inv) => acc + inv.currentValue, 0);
export const totalPortfolio = totalFiat + totalCrypto;

// Objectif
export const objective: Objective = {
  id: generateId(),
  year: 2025,
  target_amount: 80000,
  created_at: new Date().toISOString(),
};

// Données d'évolution historique (6 derniers mois) pour graphiques
export const historicalData = [
  { month: 'Oct 2024', value: 55000 },
  { month: 'Nov 2024', value: 57500 },
  { month: 'Dec 2024', value: 59000 },
  { month: 'Jan 2025', value: 60500 },
  { month: 'Feb 2025', value: 63000 },
  { month: 'Mar 2025', value: totalPortfolio },
];

export const previousYearData = [
  { month: 'Oct 2023', value: 41000 },
  { month: 'Nov 2023', value: 43000 },
  { month: 'Dec 2023', value: 44500 },
  { month: 'Jan 2024', value: 46000 },
  { month: 'Feb 2024', value: 48000 },
  { month: 'Mar 2024', value: 50000 },
];

// Fonction utilitaire pour obtenir les meilleures et pires performances
export const getBestPerformers = (count: number = 2) => {
  return [...allInvestments]
    .filter(inv => inv.currentValue > 0) // Filtrer les investissements avec une valeur > 0
    .sort((a, b) => b.percentage_change - a.percentage_change)
    .slice(0, count);
};

export const getWorstPerformers = (count: number = 2) => {
  return [...allInvestments]
    .filter(inv => inv.currentValue > 0) // Filtrer les investissements avec une valeur > 0
    .sort((a, b) => a.percentage_change - b.percentage_change)
    .slice(0, count);
}; 