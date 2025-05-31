'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Tab, TabGroup, TabList, TabPanel, TabPanels } from '@tremor/react';
import { formatCurrency } from '@/lib/utils';

interface ChartData {
  month: string;
  value: number;
}

interface EvolutionChartProps {
  currentData: ChartData[];
  previousYearData: ChartData[];
}

export default function EvolutionChart({ currentData, previousYearData }: EvolutionChartProps) {
  const [activeTab, setActiveTab] = useState(0);

  // Transformer les données pour le graphique
  const chartData = currentData.map((item, index) => ({
    month: item.month,
    "2025": item.value,
    "2024": previousYearData[index]?.value || 0,
  }));

  // Définir le formatage de valeur personnalisé pour le graphique
  const valueFormatter = (value: number) => formatCurrency(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Card className="shadow-md border-none">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium text-zinc-700">Évolution</CardTitle>
            <TabGroup index={activeTab} onIndexChange={setActiveTab}>
              <TabList variant="solid" className="bg-zinc-100">
                <Tab className="text-xs">6 mois</Tab>
                <Tab className="text-xs">1 an</Tab>
                <Tab className="text-xs">Tout</Tab>
              </TabList>
            </TabGroup>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mt-4 h-72">
            <AreaChart
              data={chartData}
              index="month"
              categories={["2024", "2025"]}
              colors={["indigo", "blue"]}
              valueFormatter={valueFormatter}
              showLegend={true}
              showAnimation={true}
              showGradient={true}
              yAxisWidth={80}
              showTooltip={true}
              showYAxis={true}
              showXAxis={true}
              className="h-full"
            />
          </div>
          <div className="mt-2 text-sm text-zinc-500">
            <p>En novembre, votre patrimoine était de {formatCurrency(chartData[1]["2025"])} en 2025, contre {formatCurrency(chartData[1]["2024"])} en 2024.</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 