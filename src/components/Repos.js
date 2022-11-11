import React from 'react';
import { useContext } from 'react';

import styled from 'styled-components';

import { GithubContext } from '../context/context';

import ChartComponent from './ChartComponent';

const Repos = () => {
  const { repos } = useContext(GithubContext);

  // calc languages % for the chart
  const languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;

    // language === null
    if (!language) return total;

    // if property doesnt exist on total obj
    if (!total[language]) {
      total[language] = {
        label: language,
        value: 1,
        stars: stargazers_count
      };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };
    }

    return total;
  }, {});

  // get 5 most popular languages descending
  const mostUsed = Object.values(languages).sort((a, b) => b.value - a.value).slice(0, 5);

  // most starts per lang
  // overwrite value with start property
  const mostPopular = Object.values(languages).sort((a, b) => b.stars - a.stars).map(item => { return { ...item, value: item.stars } }).slice(0, 5);

  // starts & forks
  let { stars, forks } = repos.reduce((total, item) => {
    const { stargazers_count, name, forks } = item;
    total.stars[stargazers_count] = { label: name, value: stargazers_count };
    total.forks[forks] = { label: name, value: forks };

    return total;
  }, { stars: {}, forks: {} });

  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();

  const options = [
    {
      type: "pie3d",
      data: mostUsed,
      chart: {
        caption: "Languages",
        theme: "fusion",
        decimals: 0,
        pieRadius: '45%',
      }
    },
    {
      type: "column3d",
      data: stars,
      chart: {
        caption: "Most Popular",
        yAxisName: 'Stars',
        xAxisName: 'Repos',
        yAxisNameFontSize: '16px',
        xAxisNameFontSize: '16px',
      }
    },
    {
      type: "doughnut2d",
      data: mostPopular,
      chart: {
        caption: "Stars Per Language",
        decimals: 0,
        pieRadius: '45%',
        showPercentValues: 0,
        theme: 'candy'
      }
    },
    {
      type: "bar3d",
      data: forks,
      chart: {
        caption: "Most Forked",
        yAxisName: 'Forks',
        xAxisName: 'Repos',
        yAxisNameFontSize: '16px',
        xAxisNameFontSize: '16px',
      }
    },
  ];

  const charts = options.map((item, i) => {
    const { type, data, chart } = item;

    return (
      <ChartComponent key={i} data={data} type={type} chart={chart} />
    )
  });
  console.log(charts);

  return (
    <section className="section">
      <Wrapper className='section-center'>
        {charts}
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
