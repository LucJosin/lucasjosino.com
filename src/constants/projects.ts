type ProjectStatusModel = {
  name: string;
  description: string;
};

const projectStatuses: { [key: string]: ProjectStatusModel } = {
  InProgress: {
    name: 'In Progress',
    description: 'Work on the project is currently ongoing.',
  },
  OnHold: {
    name: 'On Hold',
    description: 'The project has been temporarily paused.',
  },
  Completed: {
    name: 'Completed',
    description: 'The project has been finished.',
  },
  Inactive: {
    name: 'Inactive',
    description:
      'The project is not currently active but may be resumed in the future.',
  },
  Active: {
    name: 'Active',
    description: 'The project is currently active and work is ongoing.',
  },
};

export interface ProjectModel {
  image?: string;
  title: string;
  description: string;
  git?: string;
  url?: string;
  article?: string;
  tags: string[];
  language: string;
  icon: string;
  category: 'Project' | 'Collection';
  status: ProjectStatusModel;
}

export const projects: ProjectModel[] = [
  {
    image:
      'https://repository-images.githubusercontent.com/680511363/f5989e03-eb8b-43bb-988a-fe80abe00210',
    title: 'Hawbrary',
    description:
      'The Hawbrary is a showcase of the HawAPI - A Free and Open Source API for Stranger Things - built with React (NextJs) + Typescript.',
    git: 'https://github.com/LucJosin/hawbrary',
    url: 'https://hawbrary.theproject.id/',
    tags: ['React.js', 'Next.js', 'SDK', 'CSS', ' TypeScript'],
    language: 'Typescript',
    icon: 'simple-icons:typescript',
    category: 'Project',
    status: projectStatuses['Active'],
  },
  {
    image:
      'https://repository-images.githubusercontent.com/566830817/1ee86716-d27f-4703-a003-977eca9aee8b',
    title: 'HawAPI',
    description:
      'A Free and Open Source API for Stranger Things built with Java (Spring Boot) and PostgreSQL with support for multiple languages (English and Portuguese).',
    git: 'https://github.com/HawAPI/HawAPI',
    url: 'https://hawapi.theproject.id/',
    tags: ['Java', 'Spring Boot', 'JUnit', 'PostgreSQL', 'SQL'],
    language: 'Java',
    icon: 'mdi:language-java',
    category: 'Collection',
    status: projectStatuses['Active'],
  },
  {
    image: 'https://www.lucasjosino.com/static/default-og.png',
    title: 'lucasjosino.com',
    description:
      'Minimalist portfolio website/blog built with Astro & Typescript.',
    git: 'https://github.com/LucJosin/lucasjosino.com',
    tags: ['Astro', 'TypeScript', 'JavaScript', 'CSS'],
    language: 'Astro',
    icon: 'simple-icons:astro',
    category: 'Project',
    status: projectStatuses['Active'],
  },
  {
    image:
      'https://pub.dev/static/hash-v7cgjij4/img/pub-dev-icon-cover-image.png',
    title: 'on_audio_query',
    description:
      'Flutter Plugin used to query audios/songs infos from device storage.',
    git: 'https://github.com/LucJosin/on_audio_query',
    url: 'https://pub.dev/packages/on_audio_query#gif-examples',
    tags: ['Kotlin', 'Swift', 'Flutter', 'Dart'],
    language: 'Dart',
    icon: 'simple-icons:dart',
    category: 'Project',
    status: projectStatuses['Inactive'],
  },
];
