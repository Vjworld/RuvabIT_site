import { useRoute } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Calendar, Tag, Share2, Loader2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AdSenseAd } from '@/components/AdSenseAd';
import { BlogPost } from '@shared/schema';

export default function BlogPostDetail() {
  const [, params] = useRoute('/blog/:slug');
  const slug = params?.slug;

  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: [`/api/blog/posts/${slug}`],
    enabled: !!slug,
  });

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => (
      <p key={index} className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
        {paragraph}
      </p>
    ));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Post Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/blog">
              <Button className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{post.title} | Ruvab IT Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.tags.join(', ')} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://ruvab.it.com/blog/${post.slug}`} />
        <meta property="article:published_time" content={new Date(post.publishedAt).toISOString()} />
        <meta property="article:section" content={post.category} />
        {post.tags.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}
        <link rel="canonical" href={`https://ruvab.it.com/blog/${post.slug}`} />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/blog">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Button>
            </Link>
          </div>

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="default">{post.category}</Badge>
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5" />
                <span>{post.category}</span>
              </div>
            </div>
          </header>

          {/* Featured Image Placeholder */}
          <div className="mb-8">
            <div className="w-full h-64 md:h-80 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <div className="text-white text-center">
                <Tag className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-xl font-medium">{post.category}</p>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none mb-12">
            <div className="text-xl text-gray-600 dark:text-gray-400 mb-8 font-medium leading-relaxed">
              {post.excerpt}
            </div>
            
            {/* Ad placement */}
            <div className="my-8">
              <AdSenseAd
                slot="1234567890"
                style={{ display: 'block', textAlign: 'center' }}
                format="auto"
                responsive
              />
            </div>
            
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {formatContent(post.content)}
            </div>
          </article>

          {/* Share Section */}
          <div className="border-t pt-8 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Share this article
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Help others discover this content
                </p>
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>

          {/* Related Articles */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Related Articles
              </h3>
              <div className="text-center text-gray-600 dark:text-gray-400 py-8">
                <p>More articles coming soon...</p>
                <Link href="/blog" className="mt-4 inline-block">
                  <Button variant="outline">Browse All Articles</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}