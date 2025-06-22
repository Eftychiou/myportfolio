export const data = [
  { name: 'FRONTEND', value: 100 },
  { name: 'BACKEND', value: 68 }
];

export const COLORS = ['#5f7d6e ', '#CB247C'];

export const RADIAN = Math.PI / 180;

export const renderCustomizedLabel = (
  { cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any,
  setLanguages: any,
  languagesList: any
) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <>
      <text
        x={x}
        y={y}
        fill='white'
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline='central'
        onClick={() => {
          if (index === 0) {
            setLanguages(languagesList.filter((l: any) => l.type === 'frontend'));
          } else {
            setLanguages(languagesList.filter((l: any) => l.type === 'backend'));
          }
        }}
        cursor='pointer'
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
      <text
        x={250}
        y={y}
        fill={data[index].name === 'FRONTEND' ? 'white' : 'white'}
        textAnchor={'start'}
        dominantBaseline='central'
        fontWeight='bold'
        cursor='pointer'
        onClick={() => {
          if (index === 0) {
            setLanguages(languagesList.filter((l: any) => l.type === 'frontend'));
          } else {
            setLanguages(languagesList.filter((l: any) => l.type === 'backend'));
          }
        }}
      >
        {`${data[index].name}`}
      </text>
    </>
  );
};

export const languagesList = [
  {
    subject: 'Javascript',
    value: 95,
    type: 'frontend'
  },
  {
    subject: 'NextJS',
    value: 95,
    type: 'frontend'
  },
  {
    subject: 'React',
    value: 95,
    type: 'frontend'
  },
  {
    subject: 'CSS',
    value: 95,
    type: 'frontend'
  },
  {
    subject: 'NodeJS',
    value: 80,
    type: 'backend'
  },
  {
    subject: 'MongoDB',
    value: 70,
    type: 'backend'
  },
  {
    subject: 'SQL',
    value: 50,
    type: 'backend'
  },
  {
    subject: 'Java',
    value: 50,
    type: 'backend'
  },
  {
    subject: 'Andoid Java',
    value: 20,
    type: 'backend'
  },
  {
    subject: 'NGINX',
    value: 50,
    type: 'backend'
  },

  {
    subject: 'Docker',
    value: 75,
    type: 'backend'
  }
];
