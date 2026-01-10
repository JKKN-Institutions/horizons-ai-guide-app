import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog';
import {
  MessageSquare, Heart, Send, Plus, ChevronLeft, User, Clock,
  Shield, Train, FileText, Landmark, MapPin, Loader2, Pin
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { categoryInfo } from './governmentExamsData';
import { CategoryType } from './types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

interface ForumPost {
  id: string;
  user_id: string | null;
  category: string;
  title: string;
  content: string;
  author_name: string;
  likes_count: number;
  comments_count: number;
  is_pinned: boolean;
  created_at: string;
}

interface ForumComment {
  id: string;
  post_id: string;
  user_id: string | null;
  content: string;
  author_name: string;
  likes_count: number;
  created_at: string;
}

export const GovtForum = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [comments, setComments] = useState<ForumComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNewPostDialog, setShowNewPostDialog] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'defence', authorName: '' });
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedPost) {
      fetchComments(selectedPost.id);
    }
  }, [selectedPost]);

  const fetchPosts = async () => {
    setIsLoading(true);
    let query = supabase
      .from('govt_forum_posts')
      .select('*')
      .order('is_pinned', { ascending: false })
      .order('created_at', { ascending: false });

    if (selectedCategory !== 'all') {
      query = query.eq('category', selectedCategory);
    }

    const { data, error } = await query.limit(50);

    if (!error && data) {
      setPosts(data);
    }
    setIsLoading(false);
  };

  const fetchComments = async (postId: string) => {
    setIsLoadingComments(true);
    const { data, error } = await supabase
      .from('govt_forum_comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (!error && data) {
      setComments(data);
    }
    setIsLoadingComments(false);
  };

  const handleLikePost = async (postId: string) => {
    if (likedPosts.has(postId)) {
      toast.info(language === 'ta' ? 'ஏற்கனவே விருப்பப்பட்டது' : 'Already liked');
      return;
    }

    // Optimistic update
    setLikedPosts(prev => new Set([...prev, postId]));
    setPosts(prev => prev.map(p => 
      p.id === postId ? { ...p, likes_count: p.likes_count + 1 } : p
    ));

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error(language === 'ta' ? 'உள்நுழைக தேவை' : 'Please login to like');
      // Revert optimistic update
      setLikedPosts(prev => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
      setPosts(prev => prev.map(p => 
        p.id === postId ? { ...p, likes_count: p.likes_count - 1 } : p
      ));
      return;
    }

    const { error } = await supabase
      .from('govt_forum_post_likes')
      .insert({ post_id: postId, user_id: user.id });

    if (error) {
      // Revert on error
      setLikedPosts(prev => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
      setPosts(prev => prev.map(p => 
        p.id === postId ? { ...p, likes_count: p.likes_count - 1 } : p
      ));
    }
  };

  const handleCreatePost = async () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      toast.error(language === 'ta' ? 'தலைப்பும் உள்ளடக்கமும் தேவை' : 'Title and content required');
      return;
    }

    setIsSubmitting(true);
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('govt_forum_posts')
      .insert({
        user_id: user?.id || null,
        category: newPost.category,
        title: newPost.title.trim(),
        content: newPost.content.trim(),
        author_name: newPost.authorName.trim() || 'Anonymous'
      });

    if (error) {
      toast.error(language === 'ta' ? 'இடுகையிட முடியவில்லை' : 'Failed to create post');
    } else {
      toast.success(language === 'ta' ? 'இடுகை உருவாக்கப்பட்டது!' : 'Post created!');
      setNewPost({ title: '', content: '', category: 'defence', authorName: '' });
      setShowNewPostDialog(false);
      fetchPosts();
    }
    setIsSubmitting(false);
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || !selectedPost) return;

    setIsSubmitting(true);
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('govt_forum_comments')
      .insert({
        post_id: selectedPost.id,
        user_id: user?.id || null,
        content: newComment.trim(),
        author_name: 'Anonymous'
      });

    if (error) {
      toast.error(language === 'ta' ? 'கருத்து சேர்க்க முடியவில்லை' : 'Failed to add comment');
    } else {
      setNewComment('');
      fetchComments(selectedPost.id);
      // Update comment count locally
      setPosts(prev => prev.map(p => 
        p.id === selectedPost.id ? { ...p, comments_count: p.comments_count + 1 } : p
      ));
    }
    setIsSubmitting(false);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'defence': return Shield;
      case 'railway': return Train;
      case 'ssc': return FileText;
      case 'banking': return Landmark;
      case 'state': return MapPin;
      default: return MessageSquare;
    }
  };

  if (selectedPost) {
    return (
      <Card className="border-2 border-teal-200 bg-gradient-to-br from-teal-50/50 to-cyan-50/50">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Button variant="ghost" size="sm" onClick={() => setSelectedPost(null)}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              {language === 'ta' ? 'திரும்பு' : 'Back'}
            </Button>
          </div>
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-teal-100 text-teal-700">
                {selectedPost.author_name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{selectedPost.title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{selectedPost.author_name}</span>
                <span>•</span>
                <span>{formatDistanceToNow(new Date(selectedPost.created_at), { addSuffix: true })}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-6 whitespace-pre-wrap">{selectedPost.content}</p>
          
          <div className="flex items-center gap-4 pb-4 border-b">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleLikePost(selectedPost.id)}
              className={likedPosts.has(selectedPost.id) ? 'text-red-500' : ''}
            >
              <Heart className={`h-4 w-4 mr-1 ${likedPosts.has(selectedPost.id) ? 'fill-current' : ''}`} />
              {selectedPost.likes_count}
            </Button>
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <MessageSquare className="h-4 w-4" />
              {selectedPost.comments_count} {language === 'ta' ? 'கருத்துகள்' : 'comments'}
            </div>
          </div>

          {/* Comments */}
          <div className="mt-4">
            <h4 className="font-semibold text-gray-800 mb-4">
              {language === 'ta' ? 'கருத்துகள்' : 'Comments'}
            </h4>
            
            {isLoadingComments ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-teal-600" />
              </div>
            ) : (
              <ScrollArea className="h-64 mb-4">
                <div className="space-y-4 pr-4">
                  {comments.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">
                      {language === 'ta' ? 'இன்னும் கருத்துகள் இல்லை. முதலில் கருத்து தெரிவியுங்கள்!' : 'No comments yet. Be the first to comment!'}
                    </p>
                  ) : (
                    comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3 p-3 bg-white rounded-lg border">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                            {comment.author_name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm text-gray-800">{comment.author_name}</span>
                            <span className="text-xs text-gray-400">
                              {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{comment.content}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            )}

            {/* Add Comment */}
            <div className="flex gap-2">
              <Input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={language === 'ta' ? 'உங்கள் கருத்தை எழுதுங்கள்...' : 'Write a comment...'}
                onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
              />
              <Button onClick={handleAddComment} disabled={isSubmitting || !newComment.trim()}>
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-teal-200 bg-gradient-to-br from-teal-50/50 to-cyan-50/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-lg">
            <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            {language === 'ta' ? 'சமூக மன்றம்' : 'Community Forum'}
          </CardTitle>
          <Dialog open={showNewPostDialog} onOpenChange={setShowNewPostDialog}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                {language === 'ta' ? 'புதிய இடுகை' : 'New Post'}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {language === 'ta' ? 'புதிய விவாதத்தை தொடங்கு' : 'Start New Discussion'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    {language === 'ta' ? 'உங்கள் பெயர்' : 'Your Name'}
                  </label>
                  <Input
                    value={newPost.authorName}
                    onChange={(e) => setNewPost(prev => ({ ...prev, authorName: e.target.value }))}
                    placeholder={language === 'ta' ? 'பெயர் (விருப்பம்)' : 'Name (optional)'}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    {language === 'ta' ? 'வகை' : 'Category'}
                  </label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {Object.entries(categoryInfo).map(([key, info]) => (
                      <option key={key} value={key}>{info.emoji} {info.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    {language === 'ta' ? 'தலைப்பு' : 'Title'}
                  </label>
                  <Input
                    value={newPost.title}
                    onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                    placeholder={language === 'ta' ? 'விவாத தலைப்பு...' : 'Discussion title...'}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    {language === 'ta' ? 'உள்ளடக்கம்' : 'Content'}
                  </label>
                  <Textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                    placeholder={language === 'ta' ? 'உங்கள் கேள்வி அல்லது குறிப்பைப் பகிரவும்...' : 'Share your question or tip...'}
                    rows={5}
                  />
                </div>
                <Button onClick={handleCreatePost} disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Send className="h-4 w-4 mr-2" />
                  )}
                  {language === 'ta' ? 'இடுகையிடு' : 'Post'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <p className="text-gray-600 text-sm mt-1">
          {language === 'ta'
            ? 'குறிப்புகளைப் பகிரவும், கேள்விகளைக் கேட்கவும், சக மாணவர்களுடன் விவாதிக்கவும்'
            : 'Share tips, ask questions, and discuss with fellow aspirants'}
        </p>
      </CardHeader>
      <CardContent>
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            size="sm"
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
          >
            {language === 'ta' ? 'அனைத்தும்' : 'All'}
          </Button>
          {Object.entries(categoryInfo).map(([key, info]) => (
            <Button
              key={key}
              size="sm"
              variant={selectedCategory === key ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(key as CategoryType)}
              className="gap-1"
            >
              <span>{info.emoji}</span>
              {info.label.split(' ')[0]}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
          </div>
        ) : (
          <ScrollArea className="h-96">
            <div className="space-y-4 pr-4">
              {posts.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">
                    {language === 'ta' ? 'இன்னும் இடுகைகள் இல்லை. முதலில் பகிரவும்!' : 'No posts yet. Be the first to share!'}
                  </p>
                </div>
              ) : (
                posts.map((post) => {
                  const Icon = getCategoryIcon(post.category);
                  const info = categoryInfo[post.category as CategoryType];

                  return (
                    <motion.div
                      key={post.id}
                      whileHover={{ scale: 1.01 }}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        post.is_pinned
                          ? 'bg-amber-50 border-amber-200'
                          : 'bg-white border-gray-200 hover:border-teal-200'
                      }`}
                      onClick={() => setSelectedPost(post)}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className={`${info?.bgColor || 'bg-gray-100'}`}>
                            <Icon className="h-5 w-5 text-gray-600" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {post.is_pinned && (
                              <Pin className="h-3 w-3 text-amber-500" />
                            )}
                            <h4 className="font-semibold text-gray-800 truncate">{post.title}</h4>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-2">{post.content}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {post.author_name}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              {post.likes_count}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              {post.comments_count}
                            </span>
                          </div>
                        </div>
                        <Badge className={info?.bgColor} variant="outline">
                          {info?.emoji}
                        </Badge>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};
