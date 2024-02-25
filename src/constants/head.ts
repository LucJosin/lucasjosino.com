interface HeadConfig {
  name: string;
  social: string;
  copyright: string;
  endDescription: string;
  tags: string;
  banner: string;
  robots: string;
  shortLink: string;
  canonical: string;
  alternative: string;
}

const headConfig: HeadConfig = {
  name: 'Lucas Josino',
  social: '@LucJosin',
  copyright: '© 2024, Lucas Josino. All Rights Reserved.',
  endDescription:
    ' • lucasjosino.com | lucasjosino.dev | lucjos.in | @lucjosin',
  tags: 'java, java developer, kotlin, golang, go, sql, postgresql, hawapi, spring, spring boot, spring mvc, backend, backend developer, portfolio, lucasjosino, lucas josino, lucjosin, lucjos.in, josino, developer, @lucjoin, @lucjos.in, desenvolvedor, desenvolvedor backend, desenvolvedor java',
  banner: 'static/banner.png',
  robots: 'index,follow',
  shortLink: 'https://lucjos.in',
  canonical: 'https://www.lucasjosino.com',
  alternative: 'https://lucasjosino.dev',
};

export default headConfig;
