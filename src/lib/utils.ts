import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formater un montant en euros avec format français
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

// Formater un pourcentage
export function formatPercentage(value: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(value / 100);
}

// Détermine la couleur en fonction de la valeur du pourcentage
export function getPercentageColor(value: number): string {
  if (value > 0) return 'text-green-500';
  if (value < 0) return 'text-red-500';
  return 'text-gray-500';
}

// Génère une couleur aléatoire pour les graphiques
export function getRandomColor(): string {
  const colors = [
    '#0ea5e9', // sky-500
    '#8b5cf6', // violet-500
    '#ec4899', // pink-500
    '#f97316', // orange-500
    '#22c55e', // green-500
    '#14b8a6', // teal-500
    '#f43f5e', // rose-500
    '#a855f7', // purple-500
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Obtenir le mois en français
export function getMonthName(date: Date): string {
  return date.toLocaleDateString('fr-FR', { month: 'long' });
} 