
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Smile
} from "lucide-react";

const ArtClasses = () => {
  const [selectedAge, setSelectedAge] = useState("all");

  const ageGroups = [
    { id: "all", label: "All Ages", icon: Users },
    { id: "kids", label: "Kids & Teens (6-17)", icon: Smile },
    { id: "adults", label: "Young Adults (18-45)", icon: Palette },
    { id: "seniors", label: "Seniors (45+)", icon: Heart }
  ];

  const classes = [
    // Kids & Teens Classes
    {
      id: 1,
      title: "Creative Kids Club",
      subtitle: "Little Brushstrokes, Big Dreams",
      ageGroup: "kids",
      duration: "1 hour",
      cost: "₹800/session",
      effort: "Beginner-friendly",
      skills: ["Basic drawing", "Color theory", "Imagination", "Confidence building"],
      description: "Watch your little artist's eyes light up as they discover the magic of creating something beautiful with their own hands. In our Creative Kids Club, every stroke is a step towards building confidence and unleashing boundless imagination.",
      story: "Remember when you were little and saw colors everywhere? That's exactly what we nurture here. Each child gets to explore their unique artistic voice in a safe, encouraging environment.",
      maxStudents: 8,
      nextSession: "Every Saturday, 10:00 AM",
      highlight: "Parent-child sessions available!"
    },
    {
      id: 2,
      title: "Teen Sketch Lab",
      subtitle: "Draw & Grow Together",
      ageGroup: "kids",
      duration: "1.5 hours",
      cost: "₹1,200/session",
      effort: "Intermediate",
      skills: ["Advanced sketching", "Portrait drawing", "Digital art basics", "Portfolio building"],
      description: "For teenagers ready to take their art seriously. We understand the pressure you face and offer art as your creative sanctuary - a place where your voice matters and your style evolves.",
      story: "Teen years are tough, but art doesn't have to be. Here, mistakes become masterpieces and every sketch tells your story. No judgment, just growth.",
      maxStudents: 6,
      nextSession: "Wednesdays & Sundays, 4:00 PM",
      highlight: "Build your art portfolio for college applications"
    },
    
    // Young Adults Classes
    {
      id: 3,
      title: "Paint Your Stress Away",
      subtitle: "Evening Escape: Art After Hours",
      ageGroup: "adults",
      duration: "2 hours",
      cost: "₹1,500/session",
      effort: "All levels welcome",
      skills: ["Stress relief techniques", "Watercolor basics", "Mindful painting", "Color therapy"],
      description: "After a long day of emails and deadlines, there's something magical about watching paint flow across paper. This isn't just an art class - it's your mental health break, your creative reset button.",
      story: "We get it. Life is overwhelming. That's why we created this space where you can breathe, create, and remember who you are beyond your job title. Come as you are, leave feeling renewed.",
      maxStudents: 10,
      nextSession: "Tuesdays & Thursdays, 7:00 PM",
      highlight: "Perfect for working professionals"
    },
    {
      id: 4,
      title: "Weekend Watercolor Workshops",
      subtitle: "From Doodles to Masterpieces",
      ageGroup: "adults",
      duration: "3 hours",
      cost: "₹2,000/session",
      effort: "Beginner to Advanced",
      skills: ["Watercolor techniques", "Landscape painting", "Botanical illustration", "Personal style development"],
      description: "Your weekends deserve to be more than just catching up on chores. Join fellow art enthusiasts as we explore the beautiful, unpredictable world of watercolors. Every session is a mini-vacation for your soul.",
      story: "There's something liberating about watercolors - you can't control everything, and that's exactly the point. Learn to embrace the beautiful accidents and discover your artistic voice.",
      maxStudents: 8,
      nextSession: "Saturdays, 2:00 PM",
      highlight: "Includes all materials guide & recording"
    },

    // Seniors Classes
    {
      id: 5,
      title: "Golden Hour Painting Sessions",
      subtitle: "Art Therapy for the Soul",
      ageGroup: "seniors",
      duration: "1.5 hours",
      cost: "₹1,000/session",
      effort: "Gentle pace",
      skills: ["Therapeutic painting", "Memory enhancement", "Social connection", "Gentle creativity"],
      description: "Art has no expiration date, and neither do dreams. Whether you're picking up a brush for the first time in decades or continuing a lifelong passion, this is your time to create, connect, and find joy in every brushstroke.",
      story: "Every line you draw carries the wisdom of your experiences. In our gentle, supportive environment, you'll discover that creativity only gets richer with age. No rushing, no pressure - just pure joy.",
      maxStudents: 6,
      nextSession: "Mondays & Fridays, 11:00 AM",
      highlight: "Tea time included! Perfect paced for comfort"
    },
    {
      id: 6,
      title: "Mindful Art for Seniors",
      subtitle: "Brushstrokes of Memory",
      ageGroup: "seniors",
      duration: "2 hours",
      cost: "₹1,200/session",
      effort: "Relaxed learning",
      skills: ["Memory painting", "Mindfulness through art", "Storytelling through color", "Community building"],
      description: "Each painting session becomes a journey through cherished memories. Share stories, make new friends, and discover how art can be a beautiful bridge between past and present, bringing peace and purpose to each day.",
      story: "Your memories are treasures, and we help you paint them into existence. Every session is filled with laughter, stories, and the gentle satisfaction of creating something meaningful.",
      maxStudents: 8,
      nextSession: "Wednesdays, 10:00 AM",
      highlight: "Story-sharing sessions included"
    }
  ];

  const filteredClasses = selectedAge === "all" ? classes : classes.filter(c => c.ageGroup === selectedAge);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-arteza-sage/10 via-background to-arteza-terracotta/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6">
              Where Every Brushstroke
              <span className="text-arteza-terracotta block">Tells Your Story</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              From curious 6-year-olds to wise souls rediscovering creativity, art has no age limit. 
              Join me, Upasna, for intimate Zoom sessions where we don't just teach techniques - 
              we nurture the artist within you.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Badge variant="secondary" className="px-4 py-2 text-sm bg-arteza-sage/20 text-arteza-moss">
                <Video className="w-4 h-4 mr-2" />
                Live Zoom Sessions
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm bg-arteza-terracotta/20 text-arteza-rust">
                <Users className="w-4 h-4 mr-2" />
                Small Groups (6-10 people)
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm bg-arteza-clay/20 text-arteza-charcoal">
                <Heart className="w-4 h-4 mr-2" />
                All Skill Levels Welcome
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Age Group Filters */}
      <section className="py-12 bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {ageGroups.map((group) => {
              const Icon = group.icon;
              return (
                <Button
                  key={group.id}
                  variant={selectedAge === group.id ? "default" : "outline"}
                  onClick={() => setSelectedAge(group.id)}
                  className={`px-6 py-3 rounded-full transition-all duration-300 ${
                    selectedAge === group.id 
                      ? "bg-arteza-terracotta text-background hover:bg-arteza-rust" 
                      : "border-arteza-terracotta/30 text-arteza-terracotta hover:bg-arteza-terracotta/10"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {group.label}
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {filteredClasses.map((artClass) => (
              <Card key={artClass.id} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-arteza-terracotta/30">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-3">
                    <Badge 
                      variant="secondary" 
                      className={`${
                        artClass.ageGroup === 'kids' ? 'bg-arteza-sage/20 text-arteza-moss' :
                        artClass.ageGroup === 'adults' ? 'bg-arteza-terracotta/20 text-arteza-rust' :
                        'bg-arteza-clay/20 text-arteza-charcoal'
                      }`}
                    >
                      {artClass.ageGroup === 'kids' ? '6-17 years' :
                       artClass.ageGroup === 'adults' ? '18-45 years' : '45+ years'}
                    </Badge>
                    <div className="text-right">
                      <div className="flex items-center text-arteza-terracotta font-semibold">
                        <DollarSign className="w-4 h-4" />
                        {artClass.cost}
                      </div>
                    </div>
                  </div>
                  
                  <CardTitle className="text-2xl text-foreground group-hover:text-arteza-terracotta transition-colors">
                    {artClass.title}
                  </CardTitle>
                  <CardDescription className="text-arteza-rust font-medium italic">
                    {artClass.subtitle}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Story Section */}
                  <div className="bg-arteza-sage/5 p-4 rounded-lg border-l-4 border-arteza-sage">
                    <p className="text-muted-foreground italic leading-relaxed">
                      "{artClass.story}"
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-foreground leading-relaxed">
                    {artClass.description}
                  </p>

                  {/* Class Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2 text-arteza-terracotta" />
                      {artClass.duration}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="w-4 h-4 mr-2 text-arteza-sage" />
                      Max {artClass.maxStudents} students
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Award className="w-4 h-4 mr-2 text-arteza-clay" />
                      {artClass.effort}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2 text-arteza-rust" />
                      {artClass.nextSession}
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">What You'll Learn:</h4>
                    <div className="flex flex-wrap gap-2">
                      {artClass.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-arteza-terracotta/30 text-arteza-terracotta">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Highlight */}
                  <div className="bg-gradient-to-r from-arteza-terracotta/10 to-arteza-sage/10 p-3 rounded-lg">
                    <div className="flex items-center text-sm font-medium text-arteza-rust">
                      <Star className="w-4 h-4 mr-2" />
                      {artClass.highlight}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button asChild className="w-full bg-gradient-to-r from-arteza-terracotta to-arteza-rust hover:from-arteza-rust hover:to-arteza-terracotta text-background font-semibold py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
                    <a href="/class-scheduler">Book Your Creative Journey</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-arteza-sage/5 to-arteza-terracotta/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-border/50">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              A Personal Note from Upasna
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Art found me when I was young, and it has been my constant companion through every chapter of life. 
              Now, from my studio in Noida, I get to share that same magic with students across the globe through 
              intimate Zoom sessions. Every class is a conversation, every student brings something unique to our creative circle.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Whether you're 6 or 60, whether you've never held a brush or you're returning to art after years away - 
              there's a place for you here. Because art isn't about perfection; it's about connection, expression, and 
              the simple joy of creating something beautiful with your own hands.
            </p>
            <Button 
              asChild
              size="lg" 
              className="bg-gradient-to-r from-arteza-terracotta to-arteza-rust hover:from-arteza-rust hover:to-arteza-terracotta text-background font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <a href="/class-scheduler">Start Your Artistic Journey Today</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArtClasses;
