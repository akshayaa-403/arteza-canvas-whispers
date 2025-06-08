
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
    <div className="min-h-screen pt-8 pb-20">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-arteza-charcoal mb-6">
          Art Journal
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          Thoughts, musings, and stories from the studio. A glimpse into the mind 
          and heart behind each brushstroke.
        </p>
      </div>

      {/* Category Filter */}
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className="cursor-pointer border-arteza-blush text-arteza-charcoal hover:bg-arteza-blush transition-all duration-300"
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Featured Post */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <Card className="border-arteza-blush overflow-hidden hover:shadow-xl transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-2 h-96">
            <div className="relative overflow-hidden">
              <img
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <Badge className="absolute top-4 left-4 bg-arteza-indigo text-white">
                Featured
              </Badge>
            </div>
            <CardContent className="p-8 flex flex-col justify-center">
              <div className="mb-4">
                <Badge variant="outline" className="border-arteza-peach text-arteza-charcoal mb-2">
                  {blogPosts[0].category}
                </Badge>
                <p className="text-sm text-muted-foreground">
                  {blogPosts[0].date} • {blogPosts[0].readTime}
                </p>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-arteza-charcoal mb-4 hover-brush-stroke">
                {blogPosts[0].title}
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                {blogPosts[0].excerpt}
              </p>
              
              <Button className="w-fit bg-arteza-indigo text-white hover:bg-arteza-charcoal transition-all duration-300">
                Read Full Story
              </Button>
            </CardContent>
          </div>
        </Card>
      </div>

      {/* Blog Grid */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post, index) => (
            <Card 
              key={post.id}
              className="group cursor-pointer border-arteza-blush hover:shadow-lg transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <CardContent className="p-6">
                <div className="mb-3">
                  <Badge variant="outline" className="border-arteza-peach text-arteza-charcoal text-xs mb-2">
                    {post.category}
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    {post.date} • {post.readTime}
                  </p>
                </div>
                
                <h3 className="text-lg font-serif font-semibold text-arteza-charcoal mb-3 group-hover:text-arteza-indigo transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-arteza-indigo hover:text-arteza-charcoal hover:bg-arteza-blush transition-all duration-300 p-0 h-auto font-medium"
                >
                  Continue reading →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="max-w-4xl mx-auto px-4 mt-20">
        <Card className="bg-arteza-blush/20 border-arteza-blush text-center">
          <CardContent className="p-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-arteza-charcoal mb-4">
              Never Miss a Story
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Subscribe to receive new journal entries, studio updates, and artistic musings 
              directly in your inbox.
            </p>
            <Button 
              size="lg"
              className="bg-arteza-indigo text-white hover:bg-arteza-charcoal transition-all duration-300"
            >
              Subscribe to Art Journal
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quote Section */}
      <div className="max-w-4xl mx-auto px-4 mt-20">
        <div className="text-center py-16 relative">
          <div className="absolute inset-0 watercolor-fade opacity-20 rounded-lg" />
          <blockquote className="relative text-2xl md:text-3xl font-serif italic text-arteza-charcoal leading-relaxed">
            "Writing about art is like trying to capture moonlight in a jar - 
            impossible, but beautiful in the attempt."
          </blockquote>
          <p className="text-lg text-arteza-indigo font-medium mt-6">— Studio Journal Entry, 2024</p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
