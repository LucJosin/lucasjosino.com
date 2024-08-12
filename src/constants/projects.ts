type i18nString = {
  [languageCode in string]: string;
};

type ProjectStatusModel = {
  name: i18nString;
  description: i18nString;
};

const projectStatuses: { [key: string]: ProjectStatusModel } = {
  InProgress: {
    name: {
      en: 'In Progress',
      pt: 'Ativo',
    },
    description: {
      en: 'Work on the project is currently ongoing.',
      pt: 'O projeto está atualmente em andamento.',
    },
  },
  OnHold: {
    name: {
      en: 'On Hold',
      pt: 'Pausado',
    },
    description: {
      en: 'The project has been temporarily paused.',
      pt: 'O projeto foi temporariamente pausado.',
    },
  },
  Completed: {
    name: {
      en: 'Completed',
      pt: 'Completo',
    },
    description: {
      en: 'The project has been finished.',
      pt: 'O projeto foi finalizado.',
    },
  },
  Inactive: {
    name: {
      en: 'Inactive',
      pt: 'Inativo',
    },
    description: {
      en: 'The project is not currently active but may be resumed in the future.',
      pt: 'O projeto não está atualmente ativo, mas pode ser retomado no futuro.',
    },
  },
  Active: {
    name: {
      en: 'Active',
      pt: 'Ativo',
    },
    description: {
      en: 'The project is currently active and work is ongoing.',
      pt: 'O projeto está atualmente ativo e o trabalho está em andamento.',
    },
  },
};

export interface MiniProjectModel {
  title: string;
  description: i18nString;
  git?: string;
  url?: string;
  language: string;
  icon: string;
}

export interface ProjectModel {
  thumbnail?: string;
  images?: string[];
  title: string;
  description: i18nString;
  git?: string;
  url?: string;
  article?: i18nString;
  tags: string[];
  language: string;
  icon: string;
  category: 'Project' | 'Org';
  org?: string;
  status: ProjectStatusModel;
  subProjects?: ProjectModel[];
}

export const projects: ProjectModel[] = [
  {
    thumbnail:
      'https://repository-images.githubusercontent.com/680511363/f5989e03-eb8b-43bb-988a-fe80abe00210',
    title: 'Hawbrary',
    description: {
      en: 'The Hawbrary is a showcase of the HawAPI - A Free and Open Source API for Stranger Things - built with React (NextJs) + Typescript.',
      pt: 'O Hawbrary é uma amostra do projeto HawAPI - Uma API gratuita e de código aberto para Stranger Things - construída com React (NextJs) + Typescript.',
    },
    git: 'https://github.com/LucJosin/hawbrary',
    url: 'https://hawbrary.theproject.id/',
    tags: ['React.js', 'Next.js', 'SDK', 'CSS', ' TypeScript'],
    language: 'Typescript',
    icon: 'simple-icons:typescript',
    category: 'Project',
    status: projectStatuses['Active'],
  },
  {
    thumbnail:
      'https://repository-images.githubusercontent.com/566830817/1ee86716-d27f-4703-a003-977eca9aee8b',
    title: 'HawAPI',
    description: {
      en: 'A Free and Open Source API for Stranger Things built with Java (Spring Boot) and PostgreSQL with support for multiple languages (English and Portuguese).',
      pt: 'Uma API de código aberto feita com Java (Spring Boot) e PostgreSQL sobre a série Stranger Things. Suporta múltiplas línguas (Inglês e Português) e um método de busca avançado.',
    },
    git: 'https://github.com/HawAPI/HawAPI',
    url: 'https://hawapi.theproject.id/',
    tags: ['Java', 'Spring Boot', 'JUnit', 'PostgreSQL', 'SQL'],
    language: 'Java',
    icon: 'mdi:language-java',
    category: 'Org',
    org: 'https://github.com/HawAPI/',
    status: projectStatuses['Active'],
    subProjects: [
      {
        thumbnail: '/static/js.png',
        title: '@hawapi/js-sdk',
        description: {
          en: 'HawAPI SDK for JavaScript/TypeScript designed to simplify the integration with the API.',
          pt: 'HawAPI SDK para JavaScript/TypeScript projetado para simplificar a integração com a API.',
        },
        git: 'https://github.com/HawAPI/js-sdk',
        url: 'https://npmjs.com/package/@hawapi/js-sdk',
        tags: ['Typescript', 'API', 'SDK', 'HawAPI'],
        language: 'Typescript',
        icon: 'simple-icons:typescript',
        category: 'Project',
        status: projectStatuses['Active'],
      },
      {
        thumbnail: '/static/go.png',
        title: '@hawapi/go-sdk',
        description: {
          en: 'HawAPI SDK for Golang designed to simplify the integration with the API.',
          pt: 'HawAPI SDK para Golang projetado para simplificar a integração com a API.',
        },
        git: 'https://github.com/HawAPI/go-sdk',
        url: 'https://pkg.go.dev/github.com/HawAPI/go-sdk',
        tags: ['Golang', 'API', 'SDK', 'HawAPI'],
        language: 'Golang',
        icon: 'simple-icons:go',
        category: 'Project',
        status: projectStatuses['Active'],
      },
    ],
  },
  {
    thumbnail: 'https://www.lucasjosino.com/static/default-og.png',
    title: 'lucasjosino.com',
    description: {
      en: 'Minimalist portfolio website/blog built with Astro, TypeScript, and i18n for multilingual support.',
      pt: 'Portfólio/blog minimalista construído com Astro, TypeScript e i18n para suporte de múltiplos idiomas.',
    },
    git: 'https://github.com/LucJosin/lucasjosino.com',
    tags: ['Astro', 'TypeScript', 'JavaScript', 'CSS'],
    language: 'Astro',
    icon: 'simple-icons:astro',
    category: 'Project',
    status: projectStatuses['Active'],
  },
  {
    thumbnail:
      'https://pub.dev/static/hash-v7cgjij4/img/pub-dev-icon-cover-image.png',
    title: 'on_audio_query',
    description: {
      en: 'Flutter Plugin used to query audios/songs infos from device storage.',
      pt: 'Plugin Flutter usado para consultar informações de áudios/músicas do armazenamento do dispositivo',
    },
    git: 'https://github.com/LucJosin/on_audio_query',
    url: 'https://pub.dev/packages/on_audio_query#gif-examples',
    tags: ['Kotlin', 'Swift', 'Flutter', 'Dart'],
    language: 'Dart',
    icon: 'simple-icons:dart',
    category: 'Project',
    status: projectStatuses['Inactive'],
  },
];
