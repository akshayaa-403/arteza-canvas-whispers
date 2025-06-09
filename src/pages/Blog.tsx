
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Poetry of Morning Light",
      excerpt: "How the golden hour shapes my artistic vision and why I always keep a sketchbook by my window...",
      date: "March 15, 2024",
      category: "Studio Thoughts",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Colors Have Memories",
      excerpt: "Exploring how each pigment carries stories from my childhood in India, and why indigo always makes me homesick...",
      date: "March 8, 2024",
      category: "Artistic Process",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "When Brushstrokes Become Mantras",
      excerpt: "The meditative quality of repetitive mark-making and how it connects me to generations of artists before me...",
      date: "February 28, 2024",
      category: "Philosophy",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Finding Silence in the City",
      excerpt: "Living and creating in Noida - how urban chaos transforms into artistic inspiration when you know where to look...",
      date: "February 20, 2024",
      category: "Life & Art",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
      readTime: "4 min read"
    },
    {
      id: 5,
      title: "The Stories Canvases Tell",
      excerpt: "Before the first brushstroke, after the last - what happens in the spaces between intention and creation...",
      date: "February 12, 2024",
      category: "Studio Thoughts",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      readTime: "8 min read"
    },
    {
      id: 6,
      title: "Teaching Art, Learning Life",
      excerpt: "Reflections on sharing creative practice with students and how they've taught me to see with fresh eyes...",
      date: "February 5, 2024",
      category: "Teaching",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      readTime: "6 min read"
    }
  ];

  const categories = ["All", "Studio Thoughts", "Artistic Process", "Philosophy", "Life & Art", "Teaching"];

  return (
    <div className="min-h-screen pt-4 sm:pt-8 pb-10 sm:pb-20 px-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 sm:mb-6">
          Art Journal
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed px-4 sm:px-0">
          Thoughts, musings, and stories from the studio. A glimpse into the mind 
          and heart behind each brushstroke.
        </p>
      </div>

      {/* Category Filter */}
      <div className="max-w-6xl mx-auto mb-8 sm:mb-12">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className="cursor-pointer border-primary/20 text-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300 text-xs sm:text-sm"
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Featured Post */}
      <div className="max-w-6xl mx-auto mb-12 sm:mb-16">
        <Card className="border-primary/20 overflow-hidden hover:shadow-xl transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[300px] lg:h-96">
            <div className="relative overflow-hidden order-2 lg:order-1">
              <img
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                className="w-full h-48 lg:h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground hover:bg-primary/90">
                Featured
              </Badge>
            </div>
            <CardContent className="p-4 sm:p-6 lg:p-8 flex flex-col justify-center order-1 lg:order-2">
              <div className="mb-3 sm:mb-4">
                <Badge variant="outline" className="border-primary/30 text-foreground mb-2">
                  {blogPosts[0].category}
                </Badge>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {blogPosts[0].date} • {blogPosts[0].readTime}
                </p>
              </div>
              
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-foreground mb-3 sm:mb-4 hover-brush-stroke">
                {blogPosts[0].title}
              </h2>
              
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                {blogPosts[0].excerpt}
              </p>
              
              <Button className="w-fit bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300">
                Read Full Story
              </Button>
            </CardContent>
          </div>
        </Card>
      </div>

      {/* Blog Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {blogPosts.slice(1).map((post, index) => (
            <Card 
              key={post.id}
              className="group cursor-pointer border-primary/20 hover:shadow-lg transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-36 sm:h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <CardContent className="p-4 sm:p-6">
                <div className="mb-2 sm:mb-3">
                  <Badge variant="outline" className="border-primary/30 text-foreground text-xs mb-2">
                    {post.category}
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    {post.date} • {post.readTime}
                  </p>
                </div>
                
                <h3 className="text-sm sm:text-lg font-serif font-semibold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-3 sm:mb-4">
                  {post.excerpt}
                </p>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-300 p-0 h-auto font-medium text-xs sm:text-sm"
                >
                  Continue reading →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="max-w-4xl mx-auto mt-12 sm:mt-20">
        <Card className="bg-secondary/20 border-primary/20 text-center">
          <CardContent className="p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-foreground mb-3 sm:mb-4">
              Never Miss a Story
            </h2>
            <p className="text-sm sm:text-lg text-muted-foreground mb-4 sm:mb-6 px-2 sm:px-0">
              Subscribe to receive new journal entries, studio updates, and artistic musings 
              directly in your inbox.
            </p>
            <Button 
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
            >
              Subscribe to Art Journal
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quote Section */}
      <div className="max-w-4xl mx-auto mt-12 sm:mt-20">
        <div className="text-center py-8 sm:py-16 relative px-4 sm:px-0">
          <div className="absolute inset-0 watercolor-fade opacity-20 rounded-lg" />
          <blockquote className="relative text-lg sm:text-2xl md:text-3xl font-serif italic text-foreground leading-relaxed">
            "Writing about art is like trying to capture moonlight in a jar - 
            impossible, but beautiful in the attempt."
          </blockquote>
          <p className="text-sm sm:text-lg text-primary font-medium mt-4 sm:mt-6">— Studio Journal Entry, 2024</p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
