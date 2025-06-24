import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategory, getPostsByCategory } from '../../../lib/cosmic';
import { Category, Post } from '../../../lib/types';
import { PostCard } from '../../../components/PostCard';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps): Promise<JSX.Element> {
  const { slug } = await params;
  
  const category: Category | null = await getCategory(slug);
  
  if (!category) {
    notFound();
  }

  const posts: Post[] = await getPostsByCategory(category.id || '');

  return (
    <main className="mx-auto mt-4 w-full max-w-3xl flex-col space-y-16 px-4 lg:px-0">
      {/* Category Header */}
      <section>
        <div className="mb-8">
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {category.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Articles in the {category.title} category
        </p>
      </section>

      {/* Posts */}
      <section>
        {posts.length > 0 ? (
          <div className="space-y-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              No articles found in this category yet.
            </p>
            <Link 
              href="/" 
              className="inline-block mt-4 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              Browse all articles
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

export const revalidate = 60;