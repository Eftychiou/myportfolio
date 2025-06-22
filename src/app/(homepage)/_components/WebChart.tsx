import {
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis
  //   PolarRadiusAxis
} from 'recharts';
import classes from '@/app/(homepage)/_styles/page.module.scss';
import React from 'react';

export const WebChart = React.memo((props: { languages: any; setLanguageActiveLabel: any }) => {
  return (
    <div className={classes.second_chart}>
      <div className={classes.inner}>
        <div className={classes.chart_container}>
          <ResponsiveContainer width='100%' height='100%'>
            <RadarChart
              style={{ cursor: 'pointer' }}
              cx='60%'
              cy='50%'
              outerRadius='70%'
              data={props.languages}
              onClick={(a) => props.setLanguageActiveLabel(a.activeLabel as string)}
            >
              <PolarGrid />
              <PolarAngleAxis
                stroke='white'
                onMouseEnter={(a) => props.setLanguageActiveLabel(a.value)}
                dataKey='subject'
                onClick={(a) => props.setLanguageActiveLabel(a.value)}
              />

              {/* <PolarRadiusAxis /> */}
              <Radar
                dataKey='value'
                stroke={props.languages.length === 7 ? '#CB247C' : '#5f7d6e'}
                fill={props.languages.length === 7 ? '#CB247C' : '#5f7d6e'}
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
});

WebChart.displayName = 'WebChart';
