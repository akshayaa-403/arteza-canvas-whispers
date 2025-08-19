import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Clock, 
  DollarSign, 
  Users, 
  Star, 
  Heart, 
  Palette, 
  Video,
  Calendar,
  Award,
  Smile,
  CheckCircle,
  ArrowRight,
  MapPin,
  Globe,
  BookOpen,
  TrendingUp,
  Zap,
  Gift,
  MessageCircle
} from "lucide-react";
import { toast } from "sonner";

const ArtClasses = () => {
  const [selectedAge, setSelectedAge] = useState("all");
  const [selectedFormat, setSelectedFormat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const ageGroups = [
    { id: "all", label: "All Ages", icon: Users, color: "bg-gray-100 text-gray-600" },
    { id: "kids", label: "Kids & Teens (6-17)", icon: Smile, color: "bg-blue-100 text-blue-600" },
    { id: "adults", label: "Young Adults (18-45)", icon: Palette, color: "bg-purple-100 text-purple-600" },
    { id: "seniors", label: "Seniors (45+)", icon: Heart, color: "bg-green-100 text-green-600" }
  ];

  const formats = [
    { id: "all", label: "All Formats", color: "bg-gray-100 text-gray-600" },
    { id: "online", label: "Online", color: "bg-blue-100 text-blue-600" },
    { id: "hybrid", label: "Hybrid", color: "bg-purple-100 text-purple-600" },
    { id: "workshop", label: "Workshop", color: "bg-green-100 text-green-600" }
  ];

  const classes = [
    // Kids & Teens Classes
    {
      id: 1,
      title: "Creative Kids Club",
      subtitle: "Little Brushstrokes, Big Dreams ✨",
      ageGroup: "kids",
      format: "online",
      duration: "1 hour",
      cost: "₹800/session",
      originalPrice: "₹1000",
      effort: "Beginner-friendly",
      skills: ["Basic drawing", "Color theory", "Imagination", "Confidence building"],
      description: "Watch your little artist's eyes light up as they discover the magic of creating something beautiful with their own hands. In our Creative Kids Club, every stroke is a step towards building confidence and unleashing boundless imagination.",
      story: "Remember when you were little and saw colors everywhere? That's exactly what we nurture here. Each child gets to explore their unique artistic voice in a safe, encouraging environment.",
      maxStudents: 8,
      nextSession: "Every Saturday, 10:00 AM",
      highlight: "Parent-child sessions available!",
      rating: 4.9,
      totalStudents: 150,
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0",
      popular: true,
      tags: ["kids", "beginner", "fun", "creative"]
    },
    {
      id: 2,
      title: "Teen Sketch Lab",
      subtitle: "Draw & Grow Together 🎨",
      ageGroup: "kids",
      format: "hybrid",
      duration: "1.5 hours",
      cost: "₹1200/session",
      originalPrice: "₹1500",
      effort: "Beginner to Intermediate",
      skills: ["Advanced sketching", "Digital art basics", "Portfolio building", "Art careers"],
      description: "For teenagers ready to take their art seriously. We explore both traditional and digital mediums, helping teens develop their unique style while building skills for potential art careers.",
      story: "Art becomes a powerful voice during teenage years. Here, we help young artists find that voice and express it confidently through various mediums.",
      maxStudents: 10,
      nextSession: "Every Sunday, 2:00 PM",
      highlight: "Portfolio review sessions included!",
      rating: 4.8,
      totalStudents: 89,
      image: "https://images.unsplash.com/photo-1596548438137-d51ea5c83ca4",
      popular: false,
      tags: ["teens", "portfolio", "digital", "career"]
    },
    // Young Adults Classes
    {
      id: 3,
      title: "Mindful Art Therapy",
      subtitle: "Heal Through Colors 🌈",
      ageGroup: "adults",
      format: "online",
      duration: "2 hours",
      cost: "₹1500/session",
      originalPrice: "₹2000",
      effort: "All levels welcome",
      skills: ["Stress relief", "Mindfulness", "Self-expression", "Emotional healing"],
      description: "Combine art with mindfulness practices to create a therapeutic experience. Perfect for busy professionals looking to unwind and reconnect with their creative side.",
      story: "In our fast-paced world, art becomes a sanctuary. This class is designed to help young adults find peace and clarity through creative expression.",
      maxStudents: 12,
      nextSession: "Every Wednesday, 7:00 PM",
      highlight: "Includes meditation & art journaling!",
      rating: 4.9,
      totalStudents: 200,
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262",
      popular: true,
      tags: ["therapy", "mindfulness", "stress-relief", "wellness"]
    },
    {
      id: 4,
      title: "Urban Sketching Adventures",
      subtitle: "Capture City Life 🏙️",
      ageGroup: "adults",
      format: "workshop",
      duration: "3 hours",
      cost: "₹2000/session",
      originalPrice: "₹2500",
      effort: "Intermediate",
      skills: ["Location sketching", "Quick studies", "Urban observation", "Travel art"],
      description: "Learn to capture the energy and beauty of urban environments. Perfect for those who love to travel and want to document their journeys artistically.",
      story: "Every street corner has a story. This class teaches you to see and capture the poetry hidden in everyday urban scenes.",
      maxStudents: 15,
      nextSession: "Every Saturday, 9:00 AM",
      highlight: "Outdoor sketching sessions in Noida!",
      rating: 4.7,
      totalStudents: 76,
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b",
      popular: false,
      tags: ["urban", "sketching", "outdoor", "travel"]
    },
    // Seniors Classes
    {
      id: 5,
      title: "Golden Years Gallery",
      subtitle: "Art Has No Expiry Date 🌻",
      ageGroup: "seniors",
      format: "online",
      duration: "1.5 hours",
      cost: "₹1000/session",
      originalPrice: "₹1300",
      effort: "Gentle pace, all levels",
      skills: ["Watercolor basics", "Memory painting", "Gentle techniques", "Social connection"],
      description: "A warm, welcoming space for seniors to explore art at their own pace. Share stories, make friends, and create beautiful memories together.",
      story: "Art is timeless, and so is creativity. This class celebrates the wisdom and experience that seniors bring to their artistic journey.",
      maxStudents: 8,
      nextSession: "Every Tuesday, 11:00 AM",
      highlight: "Tea time & story sharing included!",
      rating: 5.0,
      totalStudents: 45,
      image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a",
      popular: false,
      tags: ["seniors", "gentle", "watercolor", "community"]
    },
    {
      id: 6,
      title: "Master's Touch Workshop",
      subtitle: "Advanced Techniques Masterclass 🎭",
      ageGroup: "adults",
      format: "workshop",
      duration: "4 hours",
      cost: "₹3000/session",
      originalPrice: "₹4000",
      effort: "Advanced",
      skills: ["Professional techniques", "Gallery preparation", "Art business", "Exhibition skills"],
      description: "For serious artists ready to take their work to the next level. Learn professional techniques and get guidance on building an art career.",
      story: "Every master was once a beginner. This intensive workshop bridges the gap between passion and profession.",
      maxStudents: 6,
      nextSession: "First Sunday of every month, 10:00 AM",
      highlight: "One-on-one portfolio review!",
      rating: 4.9,
      totalStudents: 32,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
      popular: true,
      tags: ["advanced", "professional", "portfolio", "career"]
    }
  ];

  const filteredClasses = classes.filter(artClass => {
    const matchesAge = selectedAge === "all" || artClass.ageGroup === selectedAge;
    const matchesFormat = selectedFormat === "all" || artClass.format === selectedFormat;
    const matchesSearch = artClass.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artClass.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artClass.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesAge && matchesFormat && matchesSearch;
  });

  const handleBookClass = (classItem: any) => {
    setSelectedClass(classItem);
    setBookingDialogOpen(true);
  };

  const handleBookingSubmit = () => {
    toast.success("Booking request submitted! We'll contact you within 24 hours.");
    setBookingDialogOpen(false);
    setSelectedClass(null);
  };

  const totalStudents = classes.reduce((sum, cls) => sum + cls.totalStudents, 0);
  const averageRating = classes.reduce((sum, cls) => sum + cls.rating, 0) / classes.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-arteza-sage/10 to-arteza-terracotta/10">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className={`mb-4 bg-gradient-to-r from-arteza-terracotta to-arteza-rust text-white border-0 ${isVisible ? 'animate-bounce' : ''}`}>
              <TrendingUp className="w-3 h-3 mr-1" />
              Art Classes
            </Badge>
            
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              Discover Your Creative Voice ✨
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Join our vibrant community of artists across all ages and skill levels. 
              From beginner-friendly sessions to professional workshops, find your perfect creative journey.
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-arteza-terracotta">{totalStudents}+</div>
                <div className="text-sm text-muted-foreground">Happy Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-arteza-terracotta">{averageRating.toFixed(1)}</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-arteza-terracotta">{classes.length}</div>
                <div className="text-sm text-muted-foreground">Class Types</div>
              </div>
            </div>

            {/* Quick Benefits */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                { icon: Video, text: "Online & Offline" },
                { icon: Globe, text: "Global Community" },
                { icon: Award, text: "Expert Guidance" },
                { icon: Gift, text: "All Skill Levels" }
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-arteza-blush">
                  <benefit.icon className="h-4 w-4 text-arteza-terracotta" />
                  <span className="text-sm font-medium text-arteza-charcoal">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white/50 backdrop-blur-sm border-y border-arteza-blush/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search classes, skills, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/80 backdrop-blur-sm"
              />
            </div>
            <Select value={selectedFormat} onValueChange={setSelectedFormat}>
              <SelectTrigger className="w-full md:w-48 bg-white/80 backdrop-blur-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {formats.map((format) => (
                  <SelectItem key={format.id} value={format.id}>
                    {format.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Age Group Filters */}
          <div className="flex flex-wrap gap-3">
            {ageGroups.map((group) => (
              <Button
                key={group.id}
                variant={selectedAge === group.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedAge(group.id)}
                className={`${group.color} border-0 hover:scale-105 transition-all duration-200`}
              >
                <group.icon className="w-4 h-4 mr-2" />
                {group.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
              {selectedAge === "all" ? "All Classes" : `${ageGroups.find(g => g.id === selectedAge)?.label} Classes`}
            </h2>
            <Badge variant="outline" className="border-arteza-blush text-arteza-charcoal">
              {filteredClasses.length} classes found
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredClasses.map((artClass, index) => (
              <Card 
                key={artClass.id}
                className={`group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden bg-white/80 backdrop-blur-sm border-2 ${
                  artClass.popular ? 'border-arteza-terracotta ring-2 ring-arteza-terracotta/20' : 'border-arteza-blush hover:border-arteza-terracotta'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Class Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={artClass.image}
                    alt={artClass.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {artClass.popular && (
                      <Badge className="bg-red-500 text-white border-0">
                        <Zap className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                    <Badge className={`${
                      artClass.format === 'online' ? 'bg-blue-500' :
                      artClass.format === 'hybrid' ? 'bg-purple-500' :
                      'bg-green-500'
                    } text-white border-0`}>
                      {artClass.format === 'online' ? <Video className="w-3 h-3 mr-1" /> :
                       artClass.format === 'hybrid' ? <Globe className="w-3 h-3 mr-1" /> :
                       <MapPin className="w-3 h-3 mr-1" />}
                      {artClass.format}
                    </Badge>
                  </div>

                  {/* Rating & Students */}
                  <div className="absolute bottom-3 right-3 flex gap-2">
                    <Badge className="bg-black/70 text-white border-0 text-xs">
                      <Star className="w-3 h-3 mr-1 fill-current text-yellow-400" />
                      {artClass.rating}
                    </Badge>
                    <Badge className="bg-black/70 text-white border-0 text-xs">
                      <Users className="w-3 h-3 mr-1" />
                      {artClass.totalStudents}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-4">
                  {/* Price & Age Group */}
                  <div className="flex items-center justify-between mb-3">
                    <Badge 
                      className={`text-xs ${
                        artClass.ageGroup === 'kids' ? 'bg-blue-100 text-blue-600' :
                        artClass.ageGroup === 'adults' ? 'bg-purple-100 text-purple-600' :
                        'bg-green-100 text-green-600'
                      }`}
                    >
                      {artClass.ageGroup === 'kids' ? '6-17 years' :
                       artClass.ageGroup === 'adults' ? '18-45 years' : '45+ years'}
                    </Badge>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground line-through">
                          {artClass.originalPrice}
                        </span>
                        <div className="flex items-center text-arteza-terracotta font-bold">
                          <DollarSign className="w-4 h-4" />
                          {artClass.cost}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl text-foreground group-hover:text-arteza-terracotta transition-colors">
                    {artClass.title}
                  </CardTitle>
                  <CardDescription className="text-arteza-rust font-medium">
                    {artClass.subtitle}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Story Section */}
                  <div className="bg-arteza-sage/10 p-3 rounded-lg border-l-4 border-arteza-sage">
                    <p className="text-sm text-muted-foreground italic leading-relaxed">
                      "{artClass.story}"
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-foreground leading-relaxed line-clamp-3">
                    {artClass.description}
                  </p>

                  {/* Class Details */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="w-3 h-3 mr-2 text-arteza-terracotta" />
                      {artClass.duration}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="w-3 h-3 mr-2 text-arteza-sage" />
                      Max {artClass.maxStudents}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Award className="w-3 h-3 mr-2 text-arteza-clay" />
                      {artClass.effort}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="w-3 h-3 mr-2 text-arteza-rust" />
                      {artClass.nextSession.split(',')[0]}
                    </div>
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1">
                    {artClass.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-arteza-terracotta/30 text-arteza-terracotta">
                        {skill}
                      </Badge>
                    ))}
                    {artClass.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs border-arteza-terracotta/30 text-arteza-terracotta">
                        +{artClass.skills.length - 3} more
                      </Badge>
                    )}
                  </div>

                  {/* Highlight */}
                  <div className="bg-gradient-to-r from-arteza-terracotta/10 to-arteza-sage/10 p-3 rounded-lg">
                    <div className="flex items-center text-sm font-medium text-arteza-rust">
                      <Star className="w-4 h-4 mr-2" />
                      {artClass.highlight}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-2">
                    <Button 
                      className="w-full bg-gradient-to-r from-arteza-terracotta to-arteza-rust hover:from-arteza-rust hover:to-arteza-terracotta text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                      onClick={() => handleBookClass(artClass)}
                    >
                      Book Your Spot
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <BookOpen className="w-4 h-4 mr-1" />
                        Details
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Ask
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredClasses.length === 0 && (
            <div className="text-center py-16">
              <Palette className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No classes found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search terms
              </p>
              <Button 
                onClick={() => {
                  setSelectedAge("all");
                  setSelectedFormat("all");
                  setSearchQuery("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-arteza-sage/20 to-arteza-terracotta/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="bg-white/90 backdrop-blur-sm border-arteza-blush overflow-hidden">
            <CardContent className="p-8 lg:p-12">
              <div className="w-16 h-16 bg-arteza-terracotta/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-arteza-terracotta" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                A Personal Note from Upasna ✨
              </h2>
              
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Art found me when I was young, and it has been my constant companion through every chapter of life. 
                  Now, from my studio in Noida, I get to share that same magic with students across the globe through 
                  intimate sessions that feel more like conversations between friends.
                </p>
                <p>
                  Whether you're 6 or 60, whether you've never held a brush or you're returning to art after years away - 
                  there's a place for you here. Because art isn't about perfection; it's about connection, expression, and 
                  the simple joy of creating something beautiful with your own hands.
                </p>
                <p className="text-arteza-terracotta font-medium">
                  Every class is a journey. Every student brings something unique to our creative circle. 
                  Let's discover what you'll bring to ours. 🎨
                </p>
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-arteza-terracotta to-arteza-rust hover:from-arteza-rust hover:to-arteza-terracotta text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Your Artistic Journey Today
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-arteza-blush text-arteza-charcoal hover:bg-arteza-blush px-8 py-4 rounded-full"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat with Upasna
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Booking Dialog */}
      <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-arteza-terracotta" />
              Book Your Class
            </DialogTitle>
            <DialogDescription>
              {selectedClass && `Reserve your spot in "${selectedClass.title}"`}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <Input placeholder="Your full name" />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input type="email" placeholder="your@email.com" />
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <Input placeholder="+91 XXXXX XXXXX" />
            </div>
            <div>
              <label className="text-sm font-medium">Experience Level</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select your level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Complete Beginner</SelectItem>
                  <SelectItem value="some">Some Experience</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button 
                className="flex-1 bg-arteza-terracotta hover:bg-arteza-rust"
                onClick={handleBookingSubmit}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Book Now
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setBookingDialogOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArtClasses;