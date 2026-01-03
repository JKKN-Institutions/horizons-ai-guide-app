import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  ArrowLeft, 
  Search, 
  Trash2, 
  GraduationCap,
  Clock,
  IndianRupee,
  FileText,
  BookOpen,
  Filter,
  SortAsc,
  X,
  Sparkles,
  StickyNote,
  Edit3,
  Save,
  MessageSquare,
  Download,
  FolderPlus,
  Folder,
  FolderOpen,
  MoreVertical,
  Pencil,
  Check,
  Palette,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { useCareerPredictorFavorites, Folder as FolderType } from '@/hooks/useCareerPredictorFavorites';
import { courseDatabase, Course } from '@/data/courseDatabase';
import { generateSavedCoursesPDF } from './generateSavedCoursesPDF';

const FOLDER_COLORS = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', 
  '#8B5CF6', '#EC4899', '#06B6D4', '#F97316',
];

const SavedCourses = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    favorites, 
    toggleFavorite, 
    clearAllFavorites, 
    getFavoritesCount, 
    getNote, 
    setNote, 
    hasNote,
    folders,
    createFolder,
    renameFolder,
    deleteFolder,
    updateFolderColor,
    assignCourseToFolder,
    getCourseFolder,
    getCoursesInFolder,
    getFolderById,
  } = useCareerPredictorFavorites();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [streamFilter, setStreamFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteInput, setNoteInput] = useState('');
  
  // Folder states
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
  const [editingFolderName, setEditingFolderName] = useState('');

  // Get saved courses from database
  const savedCourses = useMemo(() => {
    return courseDatabase.filter(course => favorites.has(course.id));
  }, [favorites]);

  // Apply filters and sorting
  const filteredCourses = useMemo(() => {
    let result = [...savedCourses];

    // Folder filter
    if (selectedFolderId !== null) {
      const courseIdsInFolder = getCoursesInFolder(selectedFolderId);
      result = result.filter(course => courseIdsInFolder.includes(course.id));
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(course =>
        course.name.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query) ||
        (course.description?.toLowerCase().includes(query))
      );
    }

    // Stream filter
    if (streamFilter !== 'all') {
      result = result.filter(course => course.stream === streamFilter);
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'duration':
          return a.duration.localeCompare(b.duration);
        case 'stream':
          return a.stream.localeCompare(b.stream);
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return result;
  }, [savedCourses, searchQuery, streamFilter, sortBy, selectedFolderId, getCoursesInFolder]);

  // Get uncategorized count
  const uncategorizedCount = useMemo(() => {
    return getCoursesInFolder(null).length;
  }, [getCoursesInFolder]);

  const handleRemoveCourse = (courseId: string, courseName: string) => {
    toggleFavorite(courseId);
    toast({
      title: "Course Removed",
      description: `${courseName} has been removed from your saved courses.`,
    });
  };

  const handleClearAll = () => {
    clearAllFavorites();
    setSelectedFolderId(null);
    toast({
      title: "All Courses Cleared",
      description: "Your saved courses list has been cleared.",
    });
  };

  const handleStartEditNote = (courseId: string) => {
    setEditingNoteId(courseId);
    setNoteInput(getNote(courseId));
  };

  const handleSaveNote = (courseId: string) => {
    setNote(courseId, noteInput);
    setEditingNoteId(null);
    setNoteInput('');
    toast({
      title: noteInput.trim() ? "Note Saved" : "Note Removed",
      description: noteInput.trim() ? "Your note has been saved." : "Your note has been removed.",
    });
  };

  const handleCancelEditNote = () => {
    setEditingNoteId(null);
    setNoteInput('');
  };

  const handleDownloadPDF = () => {
    const coursesWithNotes = savedCourses.map(course => ({
      ...course,
      note: getNote(course.id),
    }));
    generateSavedCoursesPDF(coursesWithNotes);
    toast({
      title: "PDF Downloaded",
      description: "Your saved courses have been exported to PDF.",
    });
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      createFolder(newFolderName);
      setNewFolderName('');
      setIsCreatingFolder(false);
      toast({
        title: "Folder Created",
        description: `"${newFolderName}" folder has been created.`,
      });
    }
  };

  const handleRenameFolder = (folderId: string) => {
    if (editingFolderName.trim()) {
      renameFolder(folderId, editingFolderName);
      setEditingFolderId(null);
      setEditingFolderName('');
      toast({
        title: "Folder Renamed",
        description: "Folder has been renamed successfully.",
      });
    }
  };

  const handleDeleteFolder = (folderId: string, folderName: string) => {
    deleteFolder(folderId);
    if (selectedFolderId === folderId) {
      setSelectedFolderId(null);
    }
    toast({
      title: "Folder Deleted",
      description: `"${folderName}" folder has been deleted. Courses moved to uncategorized.`,
    });
  };

  const handleAssignToFolder = (courseId: string, folderId: string | null, folderName?: string) => {
    assignCourseToFolder(courseId, folderId);
    toast({
      title: folderId ? "Course Moved" : "Course Removed from Folder",
      description: folderId 
        ? `Course moved to "${folderName}".`
        : "Course moved to uncategorized.",
    });
  };

  const getStreamLabel = (stream: string) => {
    const labels: Record<string, string> = {
      pcm: 'Science (PCM)',
      pcb: 'Science (PCB)',
      pcmb: 'Science (PCMB)',
      commerce: 'Commerce',
      commerce_math: 'Commerce (Math)',
      arts: 'Arts/Humanities',
    };
    return labels[stream] || stream;
  };

  const getStreamColor = (stream: string) => {
    const colors: Record<string, string> = {
      pcm: 'bg-blue-100 text-blue-800',
      pcb: 'bg-green-100 text-green-800',
      pcmb: 'bg-purple-100 text-purple-800',
      commerce: 'bg-amber-100 text-amber-800',
      commerce_math: 'bg-orange-100 text-orange-800',
      arts: 'bg-pink-100 text-pink-800',
    };
    return colors[stream] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                  My Saved Courses
                </h1>
                <p className="text-sm text-muted-foreground">
                  {getFavoritesCount()} course{getFavoritesCount() !== 1 ? 's' : ''} saved
                </p>
              </div>
            </div>
            
            {savedCourses.length > 0 && (
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleDownloadPDF}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear All
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Clear all saved courses?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will remove all {getFavoritesCount()} saved courses and folders. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleClearAll} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Clear All
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>

          {/* Search and Filters */}
          {savedCourses.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search saved courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                    onClick={() => setSearchQuery('')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="flex gap-2">
                <Select value={streamFilter} onValueChange={setStreamFilter}>
                  <SelectTrigger className="w-[140px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Stream" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Streams</SelectItem>
                    <SelectItem value="pcm">PCM</SelectItem>
                    <SelectItem value="pcb">PCB</SelectItem>
                    <SelectItem value="pcmb">PCMB</SelectItem>
                    <SelectItem value="commerce">Commerce</SelectItem>
                    <SelectItem value="arts">Arts</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[130px]">
                    <SortAsc className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                    <SelectItem value="stream">Stream</SelectItem>
                    <SelectItem value="category">Category</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        {savedCourses.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <Heart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No Saved Courses Yet</h2>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Start exploring courses and save your favorites to see them here.
            </p>
            <Button onClick={() => navigate('/career-assessment/ai-predictor')}>
              <Sparkles className="h-4 w-4 mr-2" />
              Explore AI Career Predictor
            </Button>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Folders Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-card rounded-lg border p-4 sticky top-32">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <Folder className="h-4 w-4" />
                    Folders
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => setIsCreatingFolder(true)}
                  >
                    <FolderPlus className="h-4 w-4" />
                  </Button>
                </div>

                {/* New folder input */}
                {isCreatingFolder && (
                  <div className="flex gap-2 mb-3">
                    <Input
                      placeholder="Folder name"
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value.slice(0, 30))}
                      className="h-8 text-sm"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleCreateFolder();
                        if (e.key === 'Escape') {
                          setIsCreatingFolder(false);
                          setNewFolderName('');
                        }
                      }}
                    />
                    <Button size="icon" className="h-8 w-8" onClick={handleCreateFolder}>
                      <Check className="h-3.5 w-3.5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => {
                        setIsCreatingFolder(false);
                        setNewFolderName('');
                      }}
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                )}

                {/* Folder list */}
                <div className="space-y-1">
                  {/* All courses */}
                  <button
                    onClick={() => setSelectedFolderId(null)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedFolderId === null 
                        ? 'bg-primary/10 text-primary' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <FolderOpen className="h-4 w-4" />
                      All Courses
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {savedCourses.length}
                    </Badge>
                  </button>

                  {/* Uncategorized */}
                  {uncategorizedCount > 0 && folders.length > 0 && (
                    <button
                      onClick={() => setSelectedFolderId('uncategorized')}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedFolderId === 'uncategorized' 
                          ? 'bg-primary/10 text-primary' 
                          : 'hover:bg-muted'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Folder className="h-4 w-4 text-muted-foreground" />
                        Uncategorized
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {uncategorizedCount}
                      </Badge>
                    </button>
                  )}

                  {/* Custom folders */}
                  {folders.map((folder) => {
                    const folderCourseCount = getCoursesInFolder(folder.id).length;
                    
                    return (
                      <div key={folder.id} className="group relative">
                        {editingFolderId === folder.id ? (
                          <div className="flex gap-1 p-1">
                            <Input
                              value={editingFolderName}
                              onChange={(e) => setEditingFolderName(e.target.value.slice(0, 30))}
                              className="h-7 text-sm"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleRenameFolder(folder.id);
                                if (e.key === 'Escape') {
                                  setEditingFolderId(null);
                                  setEditingFolderName('');
                                }
                              }}
                            />
                            <Button size="icon" className="h-7 w-7" onClick={() => handleRenameFolder(folder.id)}>
                              <Check className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setSelectedFolderId(folder.id)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                              selectedFolderId === folder.id 
                                ? 'bg-primary/10 text-primary' 
                                : 'hover:bg-muted'
                            }`}
                          >
                            <span className="flex items-center gap-2 truncate">
                              <Folder 
                                className="h-4 w-4 flex-shrink-0" 
                                style={{ color: folder.color }}
                              />
                              <span className="truncate">{folder.name}</span>
                            </span>
                            <div className="flex items-center gap-1">
                              <Badge variant="secondary" className="text-xs">
                                {folderCourseCount}
                              </Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <MoreVertical className="h-3.5 w-3.5" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setEditingFolderId(folder.id);
                                      setEditingFolderName(folder.name);
                                    }}
                                  >
                                    <Pencil className="h-3.5 w-3.5 mr-2" />
                                    Rename
                                  </DropdownMenuItem>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                        <Palette className="h-3.5 w-3.5 mr-2" />
                                        Change Color
                                      </DropdownMenuItem>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-2" align="start">
                                      <div className="flex gap-1">
                                        {FOLDER_COLORS.map((color) => (
                                          <button
                                            key={color}
                                            className="w-6 h-6 rounded-full border-2 border-transparent hover:border-foreground/30 transition-colors"
                                            style={{ backgroundColor: color }}
                                            onClick={() => updateFolderColor(folder.id, color)}
                                          />
                                        ))}
                                      </div>
                                    </PopoverContent>
                                  </Popover>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-destructive focus:text-destructive"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteFolder(folder.id, folder.name);
                                    }}
                                  >
                                    <Trash2 className="h-3.5 w-3.5 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                {folders.length === 0 && !isCreatingFolder && (
                  <p className="text-xs text-muted-foreground text-center py-4">
                    Create folders to organize your courses
                  </p>
                )}
              </div>
            </div>

            {/* Course Grid */}
            <div className="flex-1">
              {filteredCourses.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Search className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">No Courses Found</h2>
                  <p className="text-muted-foreground mb-4">
                    {selectedFolderId && selectedFolderId !== 'uncategorized'
                      ? "This folder is empty. Assign courses to it from the course cards."
                      : "Try adjusting your search or filters."}
                  </p>
                  <Button variant="outline" onClick={() => { setSearchQuery(''); setStreamFilter('all'); setSelectedFolderId(null); }}>
                    Clear Filters
                  </Button>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  <AnimatePresence>
                    {filteredCourses.map((course, index) => {
                      const courseFolder = getCourseFolder(course.id);
                      const folderInfo = courseFolder ? getFolderById(courseFolder) : null;
                      
                      return (
                        <motion.div
                          key={course.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <Badge className={getStreamColor(course.stream)}>
                                    {getStreamLabel(course.stream)}
                                  </Badge>
                                  {folderInfo && (
                                    <Badge 
                                      variant="outline" 
                                      className="text-xs"
                                      style={{ borderColor: folderInfo.color, color: folderInfo.color }}
                                    >
                                      <Folder className="h-3 w-3 mr-1" />
                                      {folderInfo.name}
                                    </Badge>
                                  )}
                                </div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    {folders.length > 0 && (
                                      <>
                                        <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                                          Move to folder
                                        </div>
                                        {folders.map((folder) => (
                                          <DropdownMenuItem
                                            key={folder.id}
                                            onClick={() => handleAssignToFolder(course.id, folder.id, folder.name)}
                                            className={courseFolder === folder.id ? 'bg-accent' : ''}
                                          >
                                            <Folder 
                                              className="h-3.5 w-3.5 mr-2" 
                                              style={{ color: folder.color }}
                                            />
                                            {folder.name}
                                            {courseFolder === folder.id && (
                                              <Check className="h-3.5 w-3.5 ml-auto" />
                                            )}
                                          </DropdownMenuItem>
                                        ))}
                                        {courseFolder && (
                                          <DropdownMenuItem
                                            onClick={() => handleAssignToFolder(course.id, null)}
                                          >
                                            <X className="h-3.5 w-3.5 mr-2" />
                                            Remove from folder
                                          </DropdownMenuItem>
                                        )}
                                        <DropdownMenuSeparator />
                                      </>
                                    )}
                                    <DropdownMenuItem
                                      className="text-destructive focus:text-destructive"
                                      onClick={() => handleRemoveCourse(course.id, course.name)}
                                    >
                                      <Trash2 className="h-3.5 w-3.5 mr-2" />
                                      Remove from saved
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>

                              <div onClick={() => setSelectedCourse(course)}>
                                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                                  {course.name}
                                </h3>

                                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                  {course.description || 'No description available'}
                                </p>

                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div className="flex items-center gap-1.5 text-muted-foreground">
                                    <Clock className="h-3.5 w-3.5" />
                                    <span>{course.duration}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5 text-muted-foreground">
                                    <IndianRupee className="h-3.5 w-3.5" />
                                    <span>{course.feesRange}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5 text-muted-foreground col-span-2">
                                    <FileText className="h-3.5 w-3.5" />
                                    <span className="truncate">{course.entranceExam}</span>
                                  </div>
                                </div>

                                <div className="mt-3 pt-3 border-t flex items-center justify-between">
                                  <Badge variant="outline" className="text-xs">
                                    {course.category}
                                  </Badge>
                                  {hasNote(course.id) && (
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                      <StickyNote className="h-3 w-3" />
                                      <span>Has note</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Course Details Modal */}
      <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          {selectedCourse && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className={`mb-2 ${getStreamColor(selectedCourse.stream)}`}>
                      {getStreamLabel(selectedCourse.stream)}
                    </Badge>
                    <DialogTitle className="text-xl">{selectedCourse.name}</DialogTitle>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-4">
                {/* Description */}
                <p className="text-muted-foreground">
                  {selectedCourse.description || 'No description available'}
                </p>

                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                    <Clock className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="text-sm font-medium">{selectedCourse.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                    <IndianRupee className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Fees/Year</p>
                      <p className="text-sm font-medium">{selectedCourse.feesRange}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg col-span-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Entrance Exam</p>
                      <p className="text-sm font-medium">{selectedCourse.entranceExam}</p>
                    </div>
                  </div>
                </div>

                {/* Eligibility */}
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Eligibility</p>
                  <p className="text-sm font-medium">{selectedCourse.eligibility}</p>
                </div>

                {/* Career Prospects */}
                {selectedCourse.careerProspects && selectedCourse.careerProspects.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      Career Prospects
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCourse.careerProspects.map((career, i) => (
                        <Badge key={i} variant="secondary">{career}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Top Colleges */}
                {selectedCourse.topColleges && selectedCourse.topColleges.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      Top Colleges
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCourse.topColleges.map((college, i) => (
                        <Badge key={i} variant="outline">{college}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Folder Assignment */}
                {folders.length > 0 && (
                  <div className="border rounded-lg p-3 bg-muted/30">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Folder className="h-4 w-4 text-primary" />
                      Folder
                    </h4>
                    <Select
                      value={getCourseFolder(selectedCourse.id) || 'none'}
                      onValueChange={(value) => {
                        const folder = folders.find(f => f.id === value);
                        handleAssignToFolder(
                          selectedCourse.id, 
                          value === 'none' ? null : value,
                          folder?.name
                        );
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select folder" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No folder</SelectItem>
                        {folders.map((folder) => (
                          <SelectItem key={folder.id} value={folder.id}>
                            <span className="flex items-center gap-2">
                              <Folder className="h-3.5 w-3.5" style={{ color: folder.color }} />
                              {folder.name}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Personal Notes Section */}
                <div className="border rounded-lg p-3 bg-muted/30">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    Personal Notes
                  </h4>
                  
                  {editingNoteId === selectedCourse.id ? (
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Add your notes, reminders, or preferences for this course... (max 500 characters)"
                        value={noteInput}
                        onChange={(e) => setNoteInput(e.target.value.slice(0, 500))}
                        className="min-h-[80px] resize-none text-sm"
                        maxLength={500}
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {noteInput.length}/500
                        </span>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCancelEditNote}
                          >
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleSaveNote(selectedCourse.id)}
                          >
                            <Save className="h-3.5 w-3.5 mr-1" />
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {hasNote(selectedCourse.id) ? (
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground whitespace-pre-wrap bg-background p-2 rounded border">
                            {getNote(selectedCourse.id)}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStartEditNote(selectedCourse.id)}
                          >
                            <Edit3 className="h-3.5 w-3.5 mr-1" />
                            Edit Note
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => handleStartEditNote(selectedCourse.id)}
                        >
                          <StickyNote className="h-3.5 w-3.5 mr-1" />
                          Add a Note
                        </Button>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => {
                      handleRemoveCourse(selectedCourse.id, selectedCourse.name);
                      setSelectedCourse(null);
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove from Saved
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedCourse(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SavedCourses;