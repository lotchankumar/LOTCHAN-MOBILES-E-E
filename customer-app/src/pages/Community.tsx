import { useState, useEffect } from 'react';
import api from '@/integrations/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import BottomNav from '@/components/BottomNav';
import { Heart, MessageCircle, Send, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const Community = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', type: 'discussion' });
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await api.get('/customer/community/posts');
      setPosts(data);
    } catch (error) { console.error(error); }
  };

  const handleCreatePost = async () => {
    if (!user) {
      toast({ title: 'Error', description: 'Please login to post', variant: 'destructive' });
      return;
    }

    if (!newPost.title || !newPost.content) {
      toast({ title: 'Error', description: 'Please fill all fields', variant: 'destructive' });
      return;
    }

    try {
      await api.post('/customer/community/posts', {
        title: newPost.title,
        content: newPost.content,
        type: newPost.type,
      });

      toast({ title: 'Success!', description: 'Post created!' });
      setNewPost({ title: '', content: '', type: 'discussion' });
      setDialogOpen(false);
      fetchPosts();
    } catch (error: any) {
      toast({ title: 'Error', description: error.response?.data?.error || 'Failed to post', variant: 'destructive' });
    }
  };

  const postTypes = [
    { value: 'tip', label: 'Tip', emoji: '💡' },
    { value: 'discussion', label: 'Discussion', emoji: '💬' },
    { value: 'before_after', label: 'Before/After', emoji: '✨' },
    { value: 'question', label: 'Question', emoji: '❓' },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 bg-card border-b border-border z-40 px-4 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Community</h1>
            <p className="text-sm text-muted-foreground">Share tips & experiences</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex gap-2">
                  {postTypes.map((type) => (
                    <Button
                      key={type.value}
                      variant={newPost.type === type.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setNewPost({ ...newPost, type: type.value })}
                    >
                      {type.emoji} {type.label}
                    </Button>
                  ))}
                </div>
                <Input
                  placeholder="Post title..."
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                />
                <Textarea
                  placeholder="Share your thoughts..."
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  rows={6}
                />
                <Button onClick={handleCreatePost} className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Post
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-4 space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white font-bold">
                  {post.profiles?.full_name?.[0] || 'U'}
                </div>
                <div>
                  <p className="font-semibold text-sm">{post.profiles?.full_name || 'Anonymous'}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Badge variant="outline">
                {postTypes.find((t) => t.value === post.post_type)?.emoji}
              </Badge>
            </div>

            <div>
              <h3 className="font-semibold mb-1">{post.title}</h3>
              <p className="text-sm text-muted-foreground">{post.content}</p>
            </div>

            <div className="flex items-center gap-4 pt-2 border-t">
              <Button variant="ghost" size="sm" className="gap-2">
                <Heart className="h-4 w-4" />
                {post.likes_count || 0}
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                Comment
              </Button>
            </div>
          </Card>
        ))}

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No posts yet. Be the first to share!</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Community;
