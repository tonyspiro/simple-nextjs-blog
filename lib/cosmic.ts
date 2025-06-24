import { createBucketClient } from '@cosmicjs/sdk';
import { Post, GlobalData, Author, HomePageData, AboutPageData, Category } from './types';

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG || '',
  readKey: process.env.COSMIC_READ_KEY || '',
});

export default cosmic;

export async function getGlobalData(): Promise<GlobalData> {
  try {
    const data: any = await cosmic.objects
      .findOne({
        type: 'globals',
        slug: 'header',
      })
      .props('metadata.site_title,metadata.site_tag')
      .depth(1);
    
    const siteData: GlobalData = data.object;
    return siteData;
  } catch (error) {
    console.error('Error fetching global data:', error);
    return {} as GlobalData;
  }
}

export async function getHomePageData(): Promise<HomePageData> {
  try {
    const data: any = await cosmic.objects
      .findOne({
        type: 'home-pages',
        slug: 'home',
      })
      .props('metadata')
      .depth(1);
    
    const homeData: HomePageData = data.object;
    return homeData;
  } catch (error) {
    console.error('Error fetching home page data:', error);
    return {} as HomePageData;
  }
}

export async function getAboutPageData(): Promise<AboutPageData> {
  try {
    const data: any = await cosmic.objects
      .findOne({
        type: 'about-pages',
        slug: 'about',
      })
      .props('metadata')
      .depth(1);
    
    const aboutData: AboutPageData = data.object;
    return aboutData;
  } catch (error) {
    console.error('Error fetching about page data:', error);
    return {} as AboutPageData;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const data: any = await cosmic.objects
      .find({
        type: 'posts',
      })
      .props('id,type,slug,title,metadata,created_at')
      .depth(1);
    
    const posts: Post[] = data.objects;
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    // Handle 404 error when no objects are found
    if (error && typeof error === 'object' && 'status' in error && (error as any).status === 404) {
      return [];
    }
    return [];
  }
}

export async function getPost(slug: string): Promise<Post> {
  try {
    const data: any = await cosmic.objects
      .findOne({
        type: 'posts',
        slug,
      })
      .props(['id', 'type', 'slug', 'title', 'metadata', 'created_at'])
      .depth(1);
    
    const post: Post = data.object;
    return post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return {} as Post;
  }
}

export async function getRelatedPosts(slug: string): Promise<Post[]> {
  try {
    const data: any = await cosmic.objects
      .find({
        type: 'posts',
        slug: {
          $ne: slug,
        },
      })
      .props(['id', 'type', 'slug', 'title', 'metadata', 'created_at'])
      .sort('random')
      .depth(1);
    
    const suggestedPosts: Post[] = data.objects;
    return suggestedPosts;
  } catch (error) {
    console.error('Error fetching related posts:', error);
    // Handle 404 error when no objects are found
    if (error && typeof error === 'object' && 'status' in error && (error as any).status === 404) {
      return [];
    }
    return [];
  }
}

export async function getAuthor(slug: string): Promise<Author> {
  try {
    const data: any = await cosmic.objects
      .findOne({
        type: 'authors',
        slug,
      })
      .props('id,title,slug,metadata')
      .depth(1);
    
    const author: Author = data.object;
    return author;
  } catch (error) {
    console.error('Error fetching author:', error);
    return {} as Author;
  }
}

export async function getAuthorPosts(id: string): Promise<Post[]> {
  try {
    const data: any = await cosmic.objects
      .find({
        type: 'posts',
        'metadata.author': id,
      })
      .props(['id', 'type', 'slug', 'title', 'metadata', 'created_at'])
      .sort('random')
      .depth(1);
    
    const authorPosts: Post[] = data.objects;
    return authorPosts;
  } catch (error) {
    console.error('Error fetching author posts:', error);
    // Handle 404 error when no objects are found
    if (error && typeof error === 'object' && 'status' in error && (error as any).status === 404) {
      return [];
    }
    return [];
  }
}

export async function getAuthors(): Promise<Author[]> {
  try {
    const data: any = await cosmic.objects
      .find({
        type: 'authors',
      })
      .props('id,title,slug,metadata')
      .depth(1);
    
    const authors: Author[] = data.objects;
    return authors;
  } catch (error) {
    console.error('Error fetching authors:', error);
    // Handle 404 error when no objects are found
    if (error && typeof error === 'object' && 'status' in error && (error as any).status === 404) {
      return [];
    }
    return [];
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const data: any = await cosmic.objects
      .find({
        type: 'categories',
      })
      .props('id,title,slug,metadata')
      .depth(1);
    
    const categories: Category[] = data.objects;
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Handle 404 error when no objects are found
    if (error && typeof error === 'object' && 'status' in error && (error as any).status === 404) {
      return [];
    }
    return [];
  }
}

export async function getCategory(slug: string): Promise<Category> {
  try {
    const data: any = await cosmic.objects
      .findOne({
        type: 'categories',
        slug,
      })
      .props('id,title,slug,metadata')
      .depth(1);
    
    const category: Category = data.object;
    return category;
  } catch (error) {
    console.error('Error fetching category:', error);
    return {} as Category;
  }
}

export async function getPostsByCategory(categoryId: string): Promise<Post[]> {
  try {
    const data: any = await cosmic.objects
      .find({
        type: 'posts',
        'metadata.categories': categoryId,
      })
      .props(['id', 'type', 'slug', 'title', 'metadata', 'created_at'])
      .depth(1);
    
    const posts: Post[] = data.objects;
    return posts;
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    // Handle 404 error when no objects are found
    if (error && typeof error === 'object' && 'status' in error && (error as any).status === 404) {
      return [];
    }
    return [];
  }
}