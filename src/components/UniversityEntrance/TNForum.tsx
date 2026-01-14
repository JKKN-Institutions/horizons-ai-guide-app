import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, ThumbsUp, Send, Sparkles, User, Clock, Filter, Plus, X, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { universities } from '@/data/university-entrance-data';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author_name: string;
  category: string;
  university: string | null;
  course: string | null;
  likes_count: number;
  comments_count: number;
  has_ai_answer: boolean;
  ai_answer: string | null;
  created_at: string;
  user_id: string | null;
}

interface Comment {
  id: string;
  content: string;
  author_name: string;
  is_ai_response: boolean;
  created_at: string;
}

const categories = [
  { id: 'general', label: 'General', labelTamil: 'பொது' },
  { id: 'exam-tips', label: 'Exam Tips', labelTamil: 'தேர்வு குறிப்புகள்' },
  { id: 'syllabus', label: 'Syllabus', labelTamil: 'பாடத்திட்டம்' },
  { id: 'application', label: 'Application', labelTamil: 'விண்ணப்பம்' },
  { id: 'results', label: 'Results', labelTamil: 'முடிவுகள்' },
  { id: 'career', label: 'Career', labelTamil: 'தொழில்' },
];

export const TNForum = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'general',
    university: '',
    askAI: true
  });

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('tn_forum_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;
      if (error) throw error;
      setPosts((data as ForumPost[]) || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load discussions');
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async (postId: string) => {
    try {
      const { data, error } = await supabase
        .from('tn_forum_comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setComments((data as Comment[]) || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleCreatePost = async () => {
    if (!user) {
      toast.error('Please login to post');
      navigate('/auth');
      return;
    }

    if (!newPost.title.trim() || !newPost.content.trim()) {
      toast.error('Please fill in title and content');
      return;
    }

    setIsCreatingPost(true);
    try {
      let aiAnswer = null;

      // Get AI answer if requested
      if (newPost.askAI) {
        setIsLoadingAI(true);
        try {
          const { data, error } = await supabase.functions.invoke('tn-forum-ai', {
            body: {
              question: `${newPost.title}\n\n${newPost.content}`,
              university: newPost.university || undefined,
              category: newPost.category
            }
          });

          if (error) throw error;
          aiAnswer = data.answer;
        } catch (aiError) {
          console.error('AI error:', aiError);
          // Continue without AI answer
        }
        setIsLoadingAI(false);
      }

      const { error } = await supabase.from('tn_forum_posts').insert({
        user_id: user.id,
        author_name: user.email?.split('@')[0] || 'Anonymous',
        title: newPost.title,
        content: newPost.content,
        category: newPost.category,
        university: newPost.university || null,
        has_ai_answer: !!aiAnswer,
        ai_answer: aiAnswer
      });

      if (error) throw error;

      toast.success('Question posted successfully!');
      setNewPost({ title: '', content: '', category: 'general', university: '', askAI: true });
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
    } finally {
      setIsCreatingPost(false);
      setIsLoadingAI(false);
    }
  };

  const handleLikePost = async (postId: string) => {
    if (!user) {
      toast.error('Please login to like');
      return;
    }

    try {
      // Check if already liked
      const { data: existing } = await supabase
        .from('tn_forum_post_likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .single();

      if (existing) {
        // Unlike
        await supabase.from('tn_forum_post_likes').delete().eq('id', existing.id);
      } else {
        // Like
        await supabase.from('tn_forum_post_likes').insert({
          post_id: postId,
          user_id: user.id
        });
      }

      fetchPosts();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleAddComment = async () => {
    if (!user || !selectedPost) {
      toast.error('Please login to comment');
      return;
    }

    if (!newComment.trim()) return;

    try {
      await supabase.from('tn_forum_comments').insert({
        post_id: selectedPost.id,
        user_id: user.id,
        author_name: user.email?.split('@')[0] || 'Anonymous',
        content: newComment
      });

      setNewComment('');
      fetchComments(selectedPost.id);
      fetchPosts();
      toast.success('Comment added');
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    }
  };

  const openPost = (post: ForumPost) => {
    setSelectedPost(post);
    fetchComments(post.id);
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Discussion Forum
            </h2>
            <p className="text-sm text-muted-foreground font-tamil">கலந்துரையாடல் மன்றம்</p>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              Ask
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Ask a Question</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <Input
                placeholder="Question title..."
                value={newPost.title}
                onChange={(e) => setNewPost(p => ({ ...p, title: e.target.value }))}
              />
              <Textarea
                placeholder="Describe your question in detail..."
                value={newPost.content}
                onChange={(e) => setNewPost(p => ({ ...p, content: e.target.value }))}
                rows={4}
              />
              <div className="grid grid-cols-2 gap-3">
                <Select
                  value={newPost.category}
                  onValueChange={(v) => setNewPost(p => ({ ...p, category: v }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={newPost.university}
                  onValueChange={(v) => setNewPost(p => ({ ...p, university: v }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="University (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any University</SelectItem>
                    {universities.map(uni => (
                      <SelectItem key={uni.id} value={uni.name}>{uni.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newPost.askAI}
                  onChange={(e) => setNewPost(p => ({ ...p, askAI: e.target.checked }))}
                  className="rounded"
                />
                <Sparkles className="h-4 w-4 text-purple-500" />
                <span className="text-sm">Get instant AI answer</span>
              </label>
              <Button
                onClick={handleCreatePost}
                disabled={isCreatingPost}
                className="w-full"
              >
                {isLoadingAI ? 'Getting AI Answer...' : isCreatingPost ? 'Posting...' : 'Post Question'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="w-full overflow-x-auto flex-nowrap justify-start">
          <TabsTrigger value="all">All</TabsTrigger>
          {categories.map(cat => (
            <TabsTrigger key={cat.id} value={cat.id}>{cat.label}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Posts List */}
      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Loading discussions...</div>
      ) : posts.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No discussions yet. Be the first to ask!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {posts.map(post => (
            <Card
              key={post.id}
              className="cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => openPost(post)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">{post.category}</Badge>
                      {post.has_ai_answer && (
                        <Badge className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                          <Sparkles className="h-3 w-3 mr-1" />
                          AI Answered
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-medium text-foreground line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{post.content}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {post.author_name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatTimeAgo(post.created_at)}
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3" />
                        {post.likes_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {post.comments_count}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Post Detail Dialog */}
      <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {selectedPost && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{selectedPost.category}</Badge>
                  {selectedPost.university && (
                    <Badge variant="secondary">{selectedPost.university}</Badge>
                  )}
                </div>
                <DialogTitle className="text-left">{selectedPost.title}</DialogTitle>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span>{selectedPost.author_name}</span>
                  <span>•</span>
                  <span>{formatTimeAgo(selectedPost.created_at)}</span>
                </div>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <p className="text-foreground whitespace-pre-wrap">{selectedPost.content}</p>

                {/* AI Answer */}
                {selectedPost.has_ai_answer && selectedPost.ai_answer && (
                  <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2 text-purple-700 dark:text-purple-300">
                        <Bot className="h-4 w-4" />
                        AI Answer
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-purple-900 dark:text-purple-100 whitespace-pre-wrap">
                        {selectedPost.ai_answer}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLikePost(selectedPost.id)}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {selectedPost.likes_count}
                  </Button>
                </div>

                {/* Comments */}
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Comments ({comments.length})</h4>
                  
                  <div className="space-y-3 mb-4">
                    {comments.map(comment => (
                      <div
                        key={comment.id}
                        className={`p-3 rounded-lg ${
                          comment.is_ai_response
                            ? 'bg-purple-50 dark:bg-purple-900/20'
                            : 'bg-muted'
                        }`}
                      >
                        <div className="flex items-center gap-2 text-sm mb-1">
                          {comment.is_ai_response ? (
                            <Bot className="h-4 w-4 text-purple-500" />
                          ) : (
                            <User className="h-4 w-4" />
                          )}
                          <span className="font-medium">
                            {comment.is_ai_response ? 'AI Assistant' : comment.author_name}
                          </span>
                          <span className="text-muted-foreground">
                            {formatTimeAgo(comment.created_at)}
                          </span>
                        </div>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                    ))}
                  </div>

                  {/* Add Comment */}
                  {user ? (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                      />
                      <Button size="icon" onClick={handleAddComment}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center">
                      <Button variant="link" onClick={() => navigate('/auth')}>Login</Button>
                      to comment
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
