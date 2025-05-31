export type InvestmentCategory = 'FIAT' | 'CRYPTO';

export interface Investment {
  id: string;
  name: string;
  category: InvestmentCategory;
  subcategory: string;
  created_at: string;
  updated_at: string;
}

export interface InvestmentValue {
  id: string;
  investment_id: string;
  date: string; // format YYYY-MM-01
  value: number;
  percentage_change: number;
  created_at: string;
}

export interface Objective {
  id: string;
  year: number;
  target_amount: number;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface InvestmentWithValue extends Investment {
  currentValue: number;
  percentage_change: number;
} 