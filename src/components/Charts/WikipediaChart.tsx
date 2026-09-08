import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { useTranslation } from 'react-i18next';
import { CityData } from '../../types/city.types';
import { COLORS } from '../../utils/constants';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface WikipediaChartProps {
  data: CityData;
}

export const WikipediaChart = ({ data }: WikipediaChartProps) => {
  const { t } = useTranslation();

  const chartData = {
    labels: [
      `${data.pcLink}% ${t('chart.have')}`,
      `${data.pcNoLink}% ${t('chart.notHave')}`,
    ],
    datasets: [
      {
        data: [data.numLink, data.numNoLink],
        backgroundColor: [COLORS.female, `${COLORS.female}70`],
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
        text: t('chart.wikiTitle'),
        font: {
          family: 'Roboto, sans-serif',
          size: 16,
        },
        padding: 20,
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};
