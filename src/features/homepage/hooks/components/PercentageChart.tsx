import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import classes from '@/app/(homepage)/home.module.scss';
import React from 'react';
import { COLORS, data, languagesList, renderCustomizedLabel } from '@/app/(homepage)/data';

export const PercentageChart = React.memo((props: { setLanguages: any }) => {
  return (
    <div className={classes.first_chart}>
      <div className={classes.inner}>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart onMouseLeave={() => props.setLanguages(languagesList)}>
            <Pie
              cursor='pointer'
              data={data}
              cx='30%'
              cy='50%'
              labelLine={false}
              label={(a: any) => renderCustomizedLabel(a, props.setLanguages, languagesList)}
              outerRadius={100}
              // fill='#8884d8'
              dataKey='value'
            >
              {data.map((entry, index) => (
                <Cell
                  style={{ outline: 'none' }}
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  onClick={() => {
                    if (index === 0) {
                      props.setLanguages(languagesList.filter((l) => l.type === 'frontend'));
                    } else if (index === 1) {
                      props.setLanguages(languagesList.filter((l) => l.type === 'backend'));
                    }
                  }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

PercentageChart.displayName = 'PercentageChart';
