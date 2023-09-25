const TWITTER_SHARE = 'https://twitter.com/intent/tweet?url=';
const LINKEDIN_SHARE = 'https://www.linkedin.com/sharing/share-offsite/?url=';
const REDDIT_SHARE = 'https://reddit.com/submit?url=';

interface SocialShare {
  twitter: string;
  linkedin: string;
  reddit: string;
}

export function getSocialsShare(
  url: string,
  title: string,
  social: string
): SocialShare {
  const twitter =
    TWITTER_SHARE +
    encodeURI(`${url}`) +
    '&text=' +
    encodeURI(`${title} by ${social}`);

  const linkedin = LINKEDIN_SHARE + encodeURI(`${url}`);

  const reddit =
    REDDIT_SHARE + encodeURI(`${url}`) + '&title=' + encodeURI(title);

  return {
    twitter,
    linkedin,
    reddit,
  };
}
