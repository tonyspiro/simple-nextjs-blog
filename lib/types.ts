export interface GlobalData {
  metadata: {
    site_title: string;
    site_tag: string;
  };
}

export interface HomePageData {
  metadata: {
    hero_title: string;
    hero_description: string;
    welcome_title: string;
    welcome_content: string;
    cta_text: string;
  };
}

export interface AboutPageData {
  metadata: {
    content: string;
    mission_statement: string;
    team_info?: string;
  };
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  metadata: {
    published_date: string;
    content: string;
    hero?: {
      imgix_url?: string;
    };
    author?: {
      id: string;
      slug?: string;
      title?: string;
      metadata: {
        image?: {
          imgix_url?: string;
        };
      };
    };
    teaser: string;
    categories: {
      title: string;
    }[];
  };
}

export interface Author {
  id: string;
  slug: string;
  title: string;
  metadata: {
    image?: {
      imgix_url?: string;
    };
  };
}