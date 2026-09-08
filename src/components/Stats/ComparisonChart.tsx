import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  type TooltipItem,
} from 'chart.js';
import { City } from '../../types/city.types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface ComparisonChartProps {
  cities: City[];
  metric: 'pcFemale' | 'pcLink' | 'pcMale' | 'pcNoLink';
  color: string;
  labelKey: string;
}

export const ComparisonChart = ({
  cities,
  metric,
  color,
  labelKey,
}: ComparisonChartProps) => {
  const { t } = useTranslation();

  const data = useMemo(
    () => ({
      labels: cities.map((c) => c.name),
      datasets: [
        {
          label: t(labelKey),
          data: cities.map((c) => c.datos[metric]),
          backgroundColor: color,
          borderRadius: 4,
          borderSkipped: false,
        },
      ],
    }),
    [cities, metric, color, labelKey, t]
  );

  const options = useMemo(
    () => ({
      indexAxis: 'y' as const,
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx: TooltipItem<'bar'>) =>
              ` ${(ctx.parsed.x ?? 0).toFixed(1)}%`,
          },
        },
      },
      scales: {
        x: {
          min: 0,
          max: 100,
          ticks: {
            callback: (value: number | string) => `${value}%`,
            font: { size: 11 },
          },
          grid: { color: 'rgba(0,0,0,0.06)' },
        },
        y: {
          ticks: {
            font: { size: 12 },
          },
          grid: { display: false },
        },
      },
    }),
    []
  );

  const chartHeight = Math.max(cities.length * 36 + 40, 200);

  return (
    <div className="comparison-chart-wrapper" style={{ height: chartHeight }}>
      <Bar data={data} options={options} />
    </div>
  );
};
