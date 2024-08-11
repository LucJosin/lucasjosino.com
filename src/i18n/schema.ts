export interface i18nSchema {
  '404': {
    description: string;
    help_message: string;
    go_back: string;
    go_back_alt: string;
    links: { github_alt: string; email_alt: string };
  };
  about: {
    title: string;
    article: {
      topic_1: {
        title: string;
        paragraph_1: string;
        paragraph_2: string;
        paragraph_3: string;
        paragraph_4: string;
      };
      topic_2: { title: string; paragraph_1: string; paragraph_2: string };
      topic_3: { title: string; paragraph_1: string };
      topic_4: { title: string; paragraph_1: string };
      topic_5: { title: string; paragraph_1: string };
    };
  };
  blog: { title: string; description: string; no_post_found: string };
  categories: {
    title: string;
    description: string;
    category: {
      title: string;
      description: string;
      description_one: string;
      description_other: string;
    };
  };
  common: {
    title: string;
    description: string;
    header: {
      homepage: string;
      blog: string;
      projects: string;
      about: string;
      blog_link_alt: string;
      projects_link_alt: string;
      about_link_alt: string;
      change_language_alt: string;
      change_language_alt_disabled: string;
      change_theme_alt: string;
    };
    footer: {
      powered: string;
      links: { rss: string; tags: string; source_code: string };
    };
  };
  home: {
    welcome: string;
    see_more: string;
    posts: { title: string; see_more_alt: string };
    projects: {
      title: string;
      see_more_alt: string;
    };
  };
  projects: {
    title: string;
    description: string;
    repositories: string;
    org: string;
    org_alt: string;
  };
  tags: {
    title: string;
    description: string;
    tag: {
      title: string;
      description: string;
      description_one: string;
      description_other: string;
    };
  };
}
