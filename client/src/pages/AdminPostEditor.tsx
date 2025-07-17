import { useState, useEffect } from 'react';
import { useRoute } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, ArrowLeft, Save, Eye } from 'lucide-react';
import { BlogPost, InsertBlogPost, UpdateBlogPost } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';

interface AdminPostEditorProps {
  isEditing?: boolean;
}

export default function AdminPostEditor({ isEditing = false }: AdminPostEditorProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [, params] = useRoute('/admin/posts/:id/edit');
  const postId = params?.id ? parseInt(params.id) : null;
  
  const [formData, setFormData] = useState<Partial<InsertBlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [],
    isPublished: false,
    authorId: user?.id || 1,
  });
  
  const [error, setError] = useState('');
  const [tagInput, setTagInput] = useState('');

  const { data: post, isLoading: isLoadingPost } = useQuery<BlogPost>({
    queryKey: [`/api/admin/posts/${postId}`],
    enabled: isEditing && !!postId,
  });

  useEffect(() => {
    if (post && isEditing) {
      setFormData({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        tags: post.tags,
        isPublished: post.isPublished,
        authorId: post.authorId,
      });
      setTagInput(post.tags.join(', '));
    }
  }, [post, isEditing]);

  const saveMutation = useMutation({
    mutationFn: async (data: InsertBlogPost | UpdateBlogPost) => {
      if (isEditing && postId) {
        return await apiRequest(`/api/admin/posts/${postId}`, {
          method: 'PUT',
          body: JSON.stringify(data),
        });
      } else {
        return await apiRequest('/api/admin/posts', {
          method: 'POST',
          body: JSON.stringify(data),
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/posts'] });
      if (isEditing) {
        queryClient.invalidateQueries({ queryKey: [`/api/admin/posts/${postId}`] });
      }
      window.location.href = '/admin';
    },
    onError: (error) => {
      setError(error.message || 'Failed to save post');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.content) {
      setError('Title and content are required');
      return;
    }

    const slug = formData.slug || formData.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const tags = tagInput.split(',').map(tag => tag.trim()).filter(tag => tag);

    const postData = {
      ...formData,
      slug,
      tags,
      authorId: user?.id || 1,
    };

    saveMutation.mutate(postData);
  };

  const categories = [
    'Technology',
    'AI & Machine Learning',
    'Business Intelligence',
    'Automation',
    'Data Analytics',
    'Digital Transformation',
    'Cybersecurity',
    'Cloud Computing',
    'Software Development',
    'Industry News'
  ];

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-600">Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">You don't have admin privileges.</p>
            <Button onClick={() => window.location.href = '/'} variant="outline">
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isEditing && isLoadingPost) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => window.location.href = '/admin'}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Admin
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {isEditing ? 'Edit Post' : 'Create New Post'}
          </h1>
        </div>

        <div className="max-w-4xl mx-auto">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Blog Post Editor
                {formData.isPublished && (
                  <Badge variant="default">Published</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter post title"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="auto-generated-from-title"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Brief description of the post"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Write your blog post content here..."
                    rows={12}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="ai, machine learning, technology"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={formData.isPublished}
                    onCheckedChange={(checked) => setFormData({ ...formData, isPublished: checked })}
                  />
                  <Label htmlFor="published">Publish immediately</Label>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={saveMutation.isPending} className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    {saveMutation.isPending ? 'Saving...' : 'Save Post'}
                  </Button>
                  
                  {formData.slug && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => window.open(`/blog/${formData.slug}`, '_blank')}
                      className="flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}