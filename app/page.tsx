import React from 'react';
import Link from 'next/link';
import { PostList } from '../components/PostList';
import { Loader } from '../components/Loader';
import { Suspense } from 'react';
import { getHomePageData } from '../lib/cosmic';
import { HomePageData } from '../lib/types';

export default async function Page(): Promise<JSX.Element> {
  const homeData: HomePageData = await getHomePageData();

  return (
    <main className="mx-auto mt-4 w-full max-w-3xl flex-col space-y-16 px-4 lg:px-0">
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

      {/* Latest Posts Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Latest Articles</h2>
        <Suspense fallback={<Loader />}>
          <PostList />
        </Suspense>
      </section>
    </main>
  );
}

export const revalidate = 60;