import { Box } from '@mui/material';
import { PieChart } from '@mui/x-charts';
import { useEffect, useState } from 'react';
import { arrayOf, string, shape, node, boolean, func } from 'prop-types';

export const ChartContainer = ({ data = [] }) => {
  const [chartValues, setChartValues] = useState({ inStock: 0, outOfStock: 0 });

  useEffect(() => {
    const values = data.reduce(
      (acc, item) => {
        if (item.inStock) {
          return {
            ...acc,
            inStock: ++acc.inStock,
          };
        }
        return {
          ...acc,
          outOfStock: ++acc.outOfStock,
        };
      },
      { inStock: 0, outOfStock: 0 },
    );
    setChartValues(values);
  }, [data]);

  return (
    <Box>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: chartValues.inStock, label: 'In stock' },
              { id: 1, value: chartValues.outOfStock, label: 'Out of stock' },
            ],
            arcLabel: (item) => `${(item.value / data.length) * 100}%`,
            arcLabelMinAngle: 15,
          },
        ]}
        width={600}
        height={300}
      />
    </Box>
  );
};
ChartContainer.propTypes = {
  rows: arrayOf(
    shape({
      productName: string,
      company: string,
      color: string,
      inStock: boolean,
      price: number,
      count: number,
      reviews: number,
      location: string,
      productImg: string,
      additional: string,
      id: string,
    }),
  ),
};
