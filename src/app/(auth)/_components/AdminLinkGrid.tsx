'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Spinner } from '@/shared/components/Loader/SpinnerWithBackdrop';

export default function AdminLinkGrid() {
  const router = useRouter();
  const [loadingHref, setLoadingHref] = useState<string | null>(null);

  const [colorMap, setColorMap] = useState<Record<string, string>>({});

  useEffect(() => {
    const allLinks = [...internalLinks, ...externalLinks];
    const colors: Record<string, string> = {};
    allLinks.forEach((link) => {
      colors[link.href] = getRandomColor();
    });
    setColorMap(colors);
  }, []);

  const handleNavigate = (href: string) => {
    setLoadingHref(href);
    router.push(href);
  };

  return (
    <>
      <div className='grid'>
        {internalLinks.map((link) => (
          <div key={link.href} className='card' onClick={() => handleNavigate(link.href)}>
            {loadingHref === link.href ? (
              <div className='spinnerWrapper'>
                <Spinner />
              </div>
            ) : (
              <div className='fakeImage' style={{ backgroundColor: colorMap[link.href] || '#e0e0e0' }}>
                {link.label}
              </div>
            )}
          </div>
        ))}

        {externalLinks.map((link) => (
          <a key={link.href} href={link.href} className='card'>
            <div className='fakeImage' style={{ backgroundColor: colorMap[link.href] || '#e0e0e0' }}>
              {link.label}
            </div>
          </a>
        ))}
      </div>

      <style jsx>{`
        .grid {
          display: flex;
          justify-content: center;
          gap: 30px;
          flex-wrap: wrap;
        }

        .card {
          display: inline-block;
          width: 220px;
          text-align: center;
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          text-decoration: none;
          color: #333;
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
          padding: 10px;
        }

        .card:hover {
          transform: scale(1.03);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .fakeImage {
          height: 200px;
          border-radius: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 20px;
          font-weight: 600;
          color: #555;
          text-align: center;
          padding: 10px;
          transition: filter 0.2s;
        }

        .card:hover .fakeImage {
          filter: brightness(1.1);
        }

        .spinnerWrapper {
          height: 200px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  );
}

function getRandomColor() {
  const colors = [
    '#FFCDD2',
    '#F8BBD0',
    '#E1BEE7',
    '#D1C4E9',
    '#C5CAE9',
    '#BBDEFB',
    '#B3E5FC',
    '#B2EBF2',
    '#B2DFDB',
    '#C8E6C9',
    '#DCEDC8',
    '#F0F4C3',
    '#FFF9C4',
    '#FFECB3',
    '#FFE0B2',
    '#FFCCBC'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

const internalLinks = [
  { href: '/admin/todo', label: 'Todo' },
  { href: '/admin/files', label: 'Files' },
  { href: '/admin/projects', label: 'Projects' }
];

const externalLinks = [
  { href: 'https://geef.cc/cypos/visits', label: 'Cypos visits' },
  { href: 'https://geef.cc/cypos/licenses?password=geef', label: 'Cypos Licenses' },
  { href: 'https://geef.cc/cypos/visitors?message=hello', label: 'Cypos send Message' }
];
