import PostCard from '../components/PostCard';
import { getAllPosts, getAuthor, getAuthorPosts } from '../lib/cosmic';
import { Post, Author } from '../lib/types';

interface PostListProps {
  authorSlug?: string;
}

export async function PostList({ authorSlug }: PostListProps): Promise<JSX.Element> {
  let posts: Post[] = [];
  let author: Author | null = null;
  
  try {
    if (authorSlug) {
      author = await getAuthor(authorSlug);
      if (author && author.id) {
        posts = await getAuthorPosts(author.id);
      }
    } else {
      posts = await getAllPosts();
    }
  } catch (error) {
    console.error('Error loading posts:', error);
  }

  return (
    <>
      {author && (
        <h1 className="my-4 text-4xl font-bold leading-tight tracking-tight text-zinc-700 dark:text-zinc-300">
          Posts by {author.title}
        </h1>
      )}
      {!posts || posts.length === 0 ? (
        <p className="text-zinc-600 dark:text-zinc-400">
          {authorSlug ? 'No posts found for this author.' : 'You must add at least one Post to your Bucket'}
        </p>
      ) : (
        posts.map((post) => (
          <div key={post.id}>
            <PostCard post={post} />
          </div>
        ))
      )}
    </>
  );
}