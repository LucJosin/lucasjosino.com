interface HeadConfig {
  name: string;
  social: string;
  copyright: string;
  endDescription: string;
  tags: string;
  image: string;
  robots: string;
  shortLink: string;
  canonical: string;
}

const headConfig: HeadConfig = {
  name: 'Lucas Josino',
  social: '@LucJosin',
  copyright: '© 2024, Lucas Josino. All Rights Reserved.',
  endDescription: ' • lucasjosino.com | lucjos.in | @lucjosin',
  tags: 'java, java developer, kotlin, golang, go, sql, postgresql, hawapi, spring, spring boot, spring mvc, backend, backend developer, portfolio, lucasjosino, lucas josino, lucjosin, lucjos.in, josino, developer, @lucjoin, @lucjos.in, desenvolvedor, desenvolvedor backend, desenvolvedor java',
  image: 'static/default-og.png',
  robots: 'index,follow',
  shortLink: 'https://lucjos.in',
  canonical: 'https://www.lucasjosino.com',
};

export default headConfig;
