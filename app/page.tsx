import React from 'react';
import Link from 'next/link';
import { Loader } from '../components/Loader';
import { Suspense } from 'react';
import { getHomePageData, getAuthors, getCategories } from '../lib/cosmic';
import { HomePageData, Author, Category } from '../lib/types';

async function AuthorsSection(): Promise<JSX.Element> {
  try {
    const authors: Author[] = await getAuthors();
    
    return (
      <section>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Meet Our Authors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {authors.map((author) => (
            <Link 
              key={author.id} 
              href={`/author/${author.slug}`}
              className="group block p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-zinc-700"
            >
              <div className="flex items-center space-x-4">
                {author.metadata?.image?.imgix_url && (
                  <img
                    src={`${author.metadata.image.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
                    alt={author.title}
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
                )}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {author.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Author
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error loading authors:', error);
    return (
      <section>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Meet Our Authors</h2>
        <p className="text-gray-600 dark:text-gray-300">Unable to load authors at this time.</p>
      </section>
    );
  }
}

async function CategoriesSection(): Promise<JSX.Element> {
  try {
    const categories: Category[] = await getCategories();
    
    return (
      <section>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Explore Topics</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/categories/${category.slug}`}
              className="group block p-4 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/30 dark:to-green-950/30 rounded-lg hover:from-blue-100 hover:to-green-100 dark:hover:from-blue-900/40 dark:hover:to-green-900/40 transition-all border border-gray-200 dark:border-zinc-700"
            >
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {category.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error loading categories:', error);
    return (
      <section>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Explore Topics</h2>
        <p className="text-gray-600 dark:text-gray-300">Unable to load categories at this time.</p>
      </section>
    );
  }
}

export default async function Page(): Promise<JSX.Element> {
  const homeData: HomePageData = await getHomePageData();

  return (
    <main className="mx-auto mt-4 w-full max-w-4xl flex-col space-y-16 px-4 lg:px-8">
      {/* Hero Section */}
      {homeData.metadata && (
        <section className="text-center py-12 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/50 dark:to-green-950/50 rounded-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {homeData.metadata.hero_title || 'Welcome to Our Blue Marble'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {homeData.metadata.hero_description || 'Discover amazing stories and insights about our beautiful planet Earth.'}
          </p>
          <Link 
            href="/about" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            {homeData.metadata.cta_text || 'Learn More About Us'}
          </Link>
        </section>
      )}

      {/* Welcome Section */}
      {homeData.metadata && (
        <section className="py-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {homeData.metadata.welcome_title || 'Welcome to Our Community'}
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ 
              __html: homeData.metadata.welcome_content || 
                '<p>Join us as we explore the wonders of our planet through thoughtful articles, stunning imagery, and inspiring stories. Our community is dedicated to sharing knowledge about Earth\'s natural beauty, environmental conservation, and the incredible diversity of life that calls our blue marble home.</p>'
            }} />
          </div>
        </section>
      )}

      {/* Authors Section */}
      <Suspense fallback={<Loader />}>
        <AuthorsSection />
      </Suspense>

      {/* Categories Section */}
      <Suspense fallback={<Loader />}>
        <CategoriesSection />
      </Suspense>
    </main>
  );
}

export const revalidate = 60;