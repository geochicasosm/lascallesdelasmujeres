import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { useTranslation } from 'react-i18next';
import { CityData } from '../../types/city.types';
import { COLORS } from '../../utils/constants';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface GenderChartProps {
  data: CityData;
  cityName: string;
}

export const GenderChart = ({ data, cityName }: GenderChartProps) => {
  const { t } = useTranslation();

  const chartData = {
    labels: [
      `${data.pcMale}% ${t('chart.men')}`,
      `${data.pcFemale}% ${t('chart.women')}`,
    ],
    datasets: [
      {
        data: [data.numMale, data.numFemale],
        backgroundColor: [COLORS.male, COLORS.female],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: {
            family: 'Roboto, sans-serif',
          },
          padding: 15,
        },
      },
      title: {
        display: true,
        text: `${t('chart.streetsOf')} ${cityName}`,
        font: {
          family: 'Roboto, sans-serif',
          size: 16,
        },
        padding: 20,
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
};
