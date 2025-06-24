import React from 'react';
import { getAboutPageData } from '../../lib/cosmic';
import { AboutPageData } from '../../lib/types';

export default async function AboutPage(): Promise<JSX.Element> {
  const aboutData: AboutPageData = await getAboutPageData();

  return (
    <main className="mx-auto mt-4 w-full max-w-3xl flex-col space-y-8 px-4 lg:px-0">
      <div className="py-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">About Us</h1>
        
        {/* Main Content */}
        {aboutData.metadata?.content && (
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: aboutData.metadata.content }} />
          </div>
        )}

        {/* Mission Statement */}
        {aboutData.metadata?.mission_statement && (
          <section className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Our Mission</h2>
            <div className="prose dark:prose-invert [&_p]:text-gray-700 dark:[&_p]:text-gray-200">
              <div dangerouslySetInnerHTML={{ __html: aboutData.metadata.mission_statement }} />
            </div>
          </section>
        )}

        {/* Team Info */}
        {aboutData.metadata?.team_info && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Our Team</h2>
            <div className="prose dark:prose-invert [&_p]:text-gray-700 dark:[&_p]:text-gray-200">
              <div dangerouslySetInnerHTML={{ __html: aboutData.metadata.team_info }} />
            </div>
          </section>
        )}

        {/* Default content if no CMS data */}
        {!aboutData.metadata && (
          <div className="prose prose-lg dark:prose-invert max-w-none [&_p]:text-gray-700 dark:[&_p]:text-gray-200">
            <p>
              Welcome to Our Blue Marble, a platform dedicated to exploring and celebrating the wonders of our planet Earth. 
              Through thoughtful articles, stunning imagery, and inspiring stories, we aim to foster a deeper appreciation 
              for the natural world around us.
            </p>
            <p>
              Our community of writers and contributors share a passion for environmental conservation, scientific discovery, 
              and the incredible diversity of life that makes our planet so special. From the depths of our oceans to the 
              heights of our mountains, we explore every corner of this amazing world we call home.
            </p>
            <p>
              Join us on this journey of discovery as we learn together about climate, ecology, biodiversity, and the 
              countless ways we can work together to protect and preserve our blue marble for future generations.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export const revalidate = 60;