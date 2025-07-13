export interface i18nSchema {
  '404': {
    description: string;
    help_message: string;
    go_back: string;
    go_back_alt: string;
    links: {
      github_alt: string;
      email_alt: string;
      copy_email_tooltip: string;
      copy_email_success_tooltip: string;
    };
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
        paragraph_5: string;
      };
      topic_2: { title: string; paragraph_1: string; paragraph_2: string };
      topic_3: {
        title: string;
        paragraph_1: string;
        tabs: {
          education: string;
          experience: string;
          responsabilities: string;
        };
      };
      topic_4: { title: string; paragraph_1: string };
      topic_5: { title: string; paragraph_1: string };
      topic_6: { title: string; paragraph_1: string };
    };
  };
  blog: {
    title: string;
    description: string;
    no_post_found: string;
  };
  post: {
    card: {
      read_post: string;
      see_more_posts_from_this_category: string;
    };
    tags: string;
    tags_alt: string;
    tags_see_more_alt: string;
    comments: string;
    comments_go_alt: string;
    related_posts: string;
    see_post_history: string;
    last_updated: string;
    share: {
      title: string;
      linkedin_alt: string;
      twitter_alt: string;
      reddit_alt: string;
      bluesky_alt: string;
      copy_link_alt: string;
      copied_link_alt: string;
      dialog: {
        close: string;
      };
    };
  };
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
      homepage_tooltip: string;
      blog: string;
      projects: string;
      about: string;
      blog_link_alt: string;
      projects_link_alt: string;
      about_link_alt: string;
      change_language: string;
      change_language_tooltip: string;
      change_language_tooltip_disabled: string;
      change_theme: string;
      change_theme_tooltip: string;
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
  project: {
    title: string;
    target: string;
    type: string;
    status: string;
    language: string;
    article: string;
    article_alt: string;
    images: string;
    images_alt: string;
    code_alt: string;
    preview_alt: string;
    details: string;
    see_more_alt: string;
    project_status: {
      in_progress: {
        title: string;
        description: string;
      };
      on_hold: {
        title: string;
        description: string;
      };
      completed: {
        title: string;
        description: string;
      };
      inactive: {
        title: string;
        description: string;
      };
      active: {
        title: string;
        description: string;
      };
    };
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
