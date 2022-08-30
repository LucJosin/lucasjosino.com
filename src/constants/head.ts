interface HeadConfig {
  name: string;
  titleStart: string;
  social: string;
  copyRight: string;
  endDescription: string;
  tags: string;
  imageUrl: string;
  robots: string;
}

const headConfig: HeadConfig = {
  name: 'Lucas Josino',
  titleStart: 'Lucas Josino | ',
  social: '@LucJosin',
  copyRight: '© 2022, Lucas Josino. All Rights Reserved.',
  endDescription: '• lucasjosino.com | lucjos.in | @lucjosin',
  tags: 'flutter, flutter developer, dart, kotlin, kotlin developer, android, android developer, portfolio, lucasjosino, lucas josino, lucjosin, lucjos.in, josino, mobile, developer, mobile developer, @lucjoin, @lucjos.in, desenvolvedor, desenvolvedor android, desenvolvedor flutter, desenvolvedor kotlin',
  imageUrl: './static/icons/logo.svg',
  robots: 'index,follow',
};

export default headConfig;
