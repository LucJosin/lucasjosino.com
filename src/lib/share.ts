const TWITTER_SHARE = 'https://x.com/intent/tweet?url=';
const LINKEDIN_SHARE = 'https://www.linkedin.com/sharing/share-offsite/?url=';
const REDDIT_SHARE = 'https://reddit.com/submit?url=';
const BLUESKY_SHARE = 'https://bsky.app/intent/compose?text=';

interface SocialShare {
  twitter: string;
  linkedin: string;
  reddit: string;
  bluesky: string;
}

export function getSocialsShare(
  url: string,
  title: string,
  social: string,
  tags: string[]
): SocialShare {
  const twitter =
    TWITTER_SHARE +
    encodeURI(`${url}`) +
    '&text=' +
    encodeURI(`${title} by ${social}`);

  const linkedin = LINKEDIN_SHARE + encodeURI(`${url}`);

  const reddit =
    REDDIT_SHARE + encodeURI(`${url}`) + '&title=' + encodeURI(title);

  const bluesky = BLUESKY_SHARE + encodeURIComponent(`${title} ${joinTags(tags)} ${url}`);

  return {
    twitter,
    linkedin,
    reddit,
    bluesky
  };
}

function joinTags(tags: string[]) : string {
  return tags.map(tag => `#${tag}`).join(' ');
}