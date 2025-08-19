import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Calendar, 
  Clock, 
  Heart, 
  Share2, 
  BookOpen, 
  TrendingUp,
  Filter,
  Eye,
  MessageCircle,
  Bookmark
} from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "The Poetry of Morning Light",
      excerpt: "How the golden hour shapes my artistic vision and why I always keep a sketchbook by my window. Discover the magic that happens when light meets canvas in the early hours...",
      date: "March 15, 2024",
      category: "Studio Thoughts",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
      readTime: "5 min read",
      likes: 42,
      views: 1200,
      comments: 8,
      tags: ["morning", "light", "inspiration", "sketching"],
      featured: true
    },
    {
      id: 2,
      title: "Colors Have Memories",
      excerpt: "Exploring how each pigment carries stories from my childhood in India, and why indigo always makes me homesick. A deep dive into the emotional connection between color and memory...",
      date: "March 8, 2024",
      category: "Artistic Process",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      readTime: "7 min read",
      likes: 38,
      views: 890,
      comments: 12,
      tags: ["color", "memory", "india", "nostalgia"],
      featured: false
    },
    {
      id: 3,
      title: "When Brushstrokes Become Mantras",
      excerpt: "The meditative quality of repetitive mark-making and how it connects me to generations of artists before me. Finding zen in the rhythm of creation...",
      date: "February 28, 2024",
      category: "Philosophy",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      readTime: "6 min read",
      likes: 55,
      views: 1100,
      comments: 15,
      tags: ["meditation", "technique", "tradition", "mindfulness"],
      featured: false
    },
    {
      id: 4,
      title: "Finding Silence in the City",
      excerpt: "Living and creating in Noida - how urban chaos transforms into artistic inspiration when you know where to look. The beauty hidden in busy streets...",
      date: "February 20, 2024",
      category: "Life & Art",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
      readTime: "4 min read",
      likes: 29,
      views: 750,
      comments: 6,
      tags: ["urban", "noida", "inspiration", "city-life"],
      featured: false
    },
    {
      id: 5,
      title: "The Stories Canvases Tell",
      excerpt: "Before the first brushstroke, after the last - what happens in the spaces between intention and creation. The untold stories of artistic process...",
      date: "February 12, 2024",
      category: "Studio Thoughts",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      readTime: "8 min read",
      likes: 47,
      views: 980,
      comments: 10,
      tags: ["process", "creation", "storytelling", "canvas"],
      featured: false
    },
    {
      id: 6,
      title: "Teaching Art, Learning Life",
      excerpt: "Reflections on sharing creative practice with students and how they've taught me to see with fresh eyes. The beautiful exchange of art education...",
      date: "February 5, 2024",
      category: "Teaching",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      readTime: "6 min read",
      likes: 33,
      views: 650,
      comments: 9,
      tags: ["teaching", "students", "learning", "education"],
      featured: false
    },
    {
      id: 7,
      title: "Digital Art vs Traditional: Finding Balance",
      excerpt: "Exploring the intersection of traditional painting techniques with modern digital tools. How technology can enhance rather than replace classical artistry...",
      date: "January 28, 2024",
      category: "Modern Art",
      image: "https://images.unsplash.com/photo-1551808525-51a94da548ce",
      readTime: "9 min read",
      likes: 61,
      views: 1350,
      comments: 18,
      tags: ["digital", "traditional", "technology", "balance"],
      featured: false
    },
    {
      id: 8,
      title: "Art Collecting for Gen Z",
      excerpt: "How young art enthusiasts are reshaping the collecting landscape. Tips for starting your art collection on a budget and building meaningful connections with artists...",
      date: "January 20, 2024",
      category: "Art World",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
      readTime: "5 min read",
      likes: 72,
      views: 1500,
      comments: 22,
      tags: ["collecting", "gen-z", "budget", "investment"],
      featured: false
    }
  ];

  const categories = ["All", "Studio Thoughts", "Artistic Process", "Philosophy", "Life & Art", "Teaching", "Modern Art", "Art World"];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured) || blogPosts[0];
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const handleLike = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleBookmark = (postId: number) => {
    setBookmarkedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const totalViews = blogPosts.reduce((sum, post) => sum + post.views, 0);
  const totalLikes = blogPosts.reduce((sum, post) => sum + post.likes, 0);

  return (
    <div className="min-h-screen pt-4 sm:pt-8 pb-10 sm:pb-20 px-4 bg-gradient-to-br from-arteza-sage/10 to-arteza-cream/10">
      {/* Enhanced Header */}
      <div className="max-w-6xl mx-auto text-center mb-8 sm:mb-16">
        <div className="mb-6">
          <Badge className="mb-4 bg-gradient-to-r from-arteza-terracotta to-arteza-rust text-white border-0">
            <TrendingUp className="w-3 h-3 mr-1" />
            Art Journal
          </Badge>
        </div>
        
        <h1 className={`text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 sm:mb-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          Stories from the Studio ✨
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed px-4 sm:px-0 max-w-3xl mx-auto mb-6">
          Thoughts, musings, and stories from the studio. A glimpse into the mind 
          and heart behind each brushstroke.
        </p>

        {/* Blog Stats */}
        <div className="flex justify-center gap-6 mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-arteza-terracotta">{blogPosts.length}</div>
            <div className="text-sm text-muted-foreground">Articles</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-arteza-terracotta">{totalViews.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Views</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-arteza-terracotta">{totalLikes}</div>
            <div className="text-sm text-muted-foreground">Likes</div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-6xl mx-auto mb-8 sm:mb-12">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles, topics, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/80 backdrop-blur-sm"
            />
          </div>
          <Button variant="outline" className="bg-white/80 backdrop-blur-sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`cursor-pointer transition-all duration-300 text-xs sm:text-sm ${
                selectedCategory === category 
                  ? "bg-arteza-terracotta text-white hover:bg-arteza-rust" 
                  : "border-arteza-blush text-arteza-charcoal hover:bg-arteza-blush hover:text-arteza-charcoal"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Featured Post */}
      {selectedCategory === "All" && (
        <div className="max-w-6xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl font-serif font-bold text-arteza-charcoal mb-6 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Featured Story
          </h2>
          
          <Card className="border-arteza-blush overflow-hidden hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[300px] lg:h-96">
              <div className="relative overflow-hidden order-2 lg:order-1">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-48 lg:h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <Badge className="absolute top-3 left-3 bg-gradient-to-r from-arteza-terracotta to-arteza-rust text-white border-0">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
                
                {/* Engagement Stats Overlay */}
                <div className="absolute bottom-3 right-3 flex gap-2">
                  <Badge className="bg-black/70 text-white border-0 text-xs">
                    <Eye className="w-3 h-3 mr-1" />
                    {featuredPost.views}
                  </Badge>
                  <Badge className="bg-black/70 text-white border-0 text-xs">
                    <Heart className="w-3 h-3 mr-1" />
                    {featuredPost.likes}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4 sm:p-6 lg:p-8 flex flex-col justify-center order-1 lg:order-2">
                <div className="mb-3 sm:mb-4">
                  <Badge variant="outline" className="border-arteza-blush text-arteza-charcoal mb-2">
                    {featuredPost.category}
                  </Badge>
                  <div className="flex items-center gap-4 text-xs sm:text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                </div>
                
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-foreground mb-3 sm:mb-4 hover-brush-stroke">
                  {featuredPost.title}
                </h2>
                
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                  {featuredPost.excerpt}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {featuredPost.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center gap-3">
                  <Button className="bg-arteza-terracotta text-white hover:bg-arteza-rust transition-all duration-300">
                    Read Full Story
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(featuredPost.id)}
                      className={`p-2 ${likedPosts.includes(featuredPost.id) ? 'text-red-500' : 'text-muted-foreground'}`}
                    >
                      <Heart className={`h-4 w-4 ${likedPosts.includes(featuredPost.id) ? 'fill-current' : ''}`} />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleBookmark(featuredPost.id)}
                      className={`p-2 ${bookmarkedPosts.includes(featuredPost.id) ? 'text-arteza-terracotta' : 'text-muted-foreground'}`}
                    >
                      <Bookmark className={`h-4 w-4 ${bookmarkedPosts.includes(featuredPost.id) ? 'fill-current' : ''}`} />
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="p-2 text-muted-foreground">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      )}

      {/* Blog Grid */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-serif font-bold text-arteza-charcoal mb-6 flex items-center gap-2">
          <Palette className="h-5 w-5" />
          {selectedCategory === "All" ? "More Stories" : `${selectedCategory} Articles`}
          <Badge variant="secondary" className="ml-2">{regularPosts.length}</Badge>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {regularPosts.map((post, index) => (
            <Card 
              key={post.id}
              className="group cursor-pointer border-arteza-blush hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden bg-white/80 backdrop-blur-sm"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-36 sm:h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Engagement Stats */}
                <div className="absolute top-2 right-2 flex gap-1">
                  <Badge className="bg-black/70 text-white border-0 text-xs">
                    <Eye className="w-3 h-3 mr-1" />
                    {post.views}
                  </Badge>
                </div>
                
                <div className="absolute bottom-2 right-2 flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(post.id);
                    }}
                    className={`p-1 h-6 w-6 ${likedPosts.includes(post.id) ? 'text-red-500' : 'text-white'} hover:bg-white/20`}
                  >
                    <Heart className={`h-3 w-3 ${likedPosts.includes(post.id) ? 'fill-current' : ''}`} />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmark(post.id);
                    }}
                    className={`p-1 h-6 w-6 ${bookmarkedPosts.includes(post.id) ? 'text-arteza-terracotta' : 'text-white'} hover:bg-white/20`}
                  >
                    <Bookmark className={`h-3 w-3 ${bookmarkedPosts.includes(post.id) ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-4 sm:p-6">
                <div className="mb-2 sm:mb-3">
                  <Badge variant="outline" className="border-arteza-blush text-arteza-charcoal text-xs mb-2">
                    {post.category}
                  </Badge>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-sm sm:text-lg font-serif font-semibold text-foreground mb-2 sm:mb-3 group-hover:text-arteza-terracotta transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-3 sm:mb-4">
                  {post.excerpt}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {post.tags.slice(0, 2).map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-arteza-terracotta hover:text-white hover:bg-arteza-terracotta transition-all duration-300 p-0 h-auto font-medium text-xs sm:text-sm"
                  >
                    Continue reading →
                  </Button>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      {post.comments}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        {regularPosts.length > 6 && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="border-arteza-blush text-arteza-charcoal hover:bg-arteza-blush"
            >
              Load More Articles
            </Button>
          </div>
        )}
      </div>

      {/* Enhanced Newsletter CTA */}
      <div className="max-w-4xl mx-auto mt-12 sm:mt-20">
        <Card className="bg-gradient-to-r from-arteza-sage/20 to-arteza-terracotta/20 border-arteza-blush overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-arteza-terracotta to-arteza-rust p-6 lg:p-8 text-white text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold mb-3 sm:mb-4">
                Never Miss a Story 📚
              </h2>
              <p className="text-sm sm:text-lg opacity-90 mb-4 sm:mb-6 px-2 sm:px-0 max-w-md mx-auto">
                Subscribe to receive new journal entries, studio updates, and artistic musings 
                directly in your inbox.
              </p>
              
              <div className="flex justify-center gap-6 mb-4 text-sm">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>Weekly Stories</span>
                </div>
                <div className="flex items-center gap-1">
                  <Palette className="h-4 w-4" />
                  <span>Studio Updates</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 lg:p-8 text-center">
              <Button 
                size="lg"
                className="bg-arteza-terracotta text-white hover:bg-arteza-rust transition-all duration-300 mb-4"
              >
                Subscribe to Art Journal
              </Button>
              <p className="text-xs text-muted-foreground">
                Join 500+ art lovers already subscribed
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Quote Section */}
      <div className="max-w-4xl mx-auto mt-12 sm:mt-20">
        <Card className="bg-white/50 backdrop-blur-sm border-arteza-blush">
          <CardContent className="text-center py-8 sm:py-16 px-4 sm:px-8">
            <div className="mb-6">
              <div className="w-12 h-12 bg-arteza-terracotta/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-arteza-terracotta" />
              </div>
            </div>
            
            <blockquote className="text-lg sm:text-2xl md:text-3xl font-serif italic text-foreground leading-relaxed mb-4">
              "Writing about art is like trying to capture moonlight in a jar - 
              impossible, but beautiful in the attempt."
            </blockquote>
            
            <p className="text-sm sm:text-lg text-arteza-terracotta font-medium">
              — Studio Journal Entry, 2024 ✨
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Blog;