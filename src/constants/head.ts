interface HeadConfig {
  name: string;
  titleStart: string;
  social: string;
  copyRight: string;
  endDescription: string;
  tags: string;
  icon: string;
  banner: string;
  robots: string;
}

const headConfig: HeadConfig = {
  name: 'Lucas Josino',
  titleStart: 'Lucas Josino | ',
  social: '@LucJosin',
  copyRight: '© 2023, Lucas Josino. All Rights Reserved.',
  endDescription: '• lucasjosino.com | lucasjosino.dev | lucjos.in | @lucjosin',
  tags: 'java, java developer, kotlin, sql, postgresql, hawapi, spring, spring boot, spring mvc, kotlin developer, backend, backend developer, portfolio, lucasjosino, lucas josino, lucjosin, lucjos.in, josino, developer, @lucjoin, @lucjos.in, desenvolvedor, desenvolvedor backend, desenvolvedor kotlin',
  icon: './favicon.ico',
  banner: './static/banner.jpg',
  robots: 'index,follow',
};

export default headConfig;
