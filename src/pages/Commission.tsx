
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const Commission = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    size: "",
    medium: "",
    budget: "",
    theme: "",
    timeline: "",
    description: ""
  });

  const pastCommissions = [
    {
      title: "Family Portrait in Watercolor",
      size: "16x20 inches",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027"
    },
    {
      title: "Abstract Memory Piece",
      size: "24x30 inches",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07"
    },
    {
      title: "Cultural Heritage Series",
      size: "18x24 inches",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
    },
    {
      title: "Dreamscape Commission",
      size: "20x24 inches",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Commission request:", formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen pt-8 pb-20">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-arteza-charcoal mb-6">
          Commission Your Vision
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          Let's collaborate to create something uniquely yours. Every commission is a journey 
          from your imagination to canvas, painted with intention and care.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Commission Form */}
          <div>
            <Card className="border-arteza-blush">
              <CardContent className="p-8">
                <h2 className="text-2xl font-serif font-bold text-arteza-charcoal mb-6">
                  Tell Me About Your Vision
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="border-arteza-blush focus:border-arteza-indigo"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="border-arteza-blush focus:border-arteza-indigo"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Preferred Size</Label>
                      <Select value={formData.size} onValueChange={(value) => handleInputChange("size", value)}>
                        <SelectTrigger className="border-arteza-blush">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="8x10">8x10 inches</SelectItem>
                          <SelectItem value="12x16">12x16 inches</SelectItem>
                          <SelectItem value="16x20">16x20 inches</SelectItem>
                          <SelectItem value="18x24">18x24 inches</SelectItem>
                          <SelectItem value="24x30">24x30 inches</SelectItem>
                          <SelectItem value="custom">Custom size</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Medium</Label>
                      <Select value={formData.medium} onValueChange={(value) => handleInputChange("medium", value)}>
                        <SelectTrigger className="border-arteza-blush">
                          <SelectValue placeholder="Select medium" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="watercolor">Watercolor</SelectItem>
                          <SelectItem value="acrylic">Acrylic on Canvas</SelectItem>
                          <SelectItem value="oil">Oil on Canvas</SelectItem>
                          <SelectItem value="mixed">Mixed Media</SelectItem>
                          <SelectItem value="digital">Digital Art</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Budget Range (₹)</Label>
                      <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                        <SelectTrigger className="border-arteza-blush">
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5000-10000">₹5,000 - ₹10,000</SelectItem>
                          <SelectItem value="10000-20000">₹10,000 - ₹20,000</SelectItem>
                          <SelectItem value="20000-35000">₹20,000 - ₹35,000</SelectItem>
                          <SelectItem value="35000+">₹35,000+</SelectItem>
                          <SelectItem value="discuss">Let's discuss</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Timeline</Label>
                      <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                        <SelectTrigger className="border-arteza-blush">
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2-3weeks">2-3 weeks</SelectItem>
                          <SelectItem value="1month">1 month</SelectItem>
                          <SelectItem value="6-8weeks">6-8 weeks</SelectItem>
                          <SelectItem value="flexible">I'm flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="theme">Theme or Concept</Label>
                    <Input
                      id="theme"
                      value={formData.theme}
                      onChange={(e) => handleInputChange("theme", e.target.value)}
                      placeholder="e.g., Family portrait, Abstract emotion, Cultural heritage..."
                      className="border-arteza-blush focus:border-arteza-indigo"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Describe Your Vision</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Tell me more about what you envision. What emotions, memories, or stories should this piece capture?"
                      rows={4}
                      className="border-arteza-blush focus:border-arteza-indigo"
                    />
                  </div>

                  <Button 
                    type="submit"
                    size="lg"
                    className="w-full bg-arteza-indigo text-white hover:bg-arteza-charcoal transition-all duration-300"
                  >
                    Request Your Piece
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Past Commissions Gallery */}
          <div>
            <h2 className="text-2xl font-serif font-bold text-arteza-charcoal mb-6">
              Past Commissions
            </h2>
            <p className="text-muted-foreground mb-8">
              Each piece tells a unique story, crafted in collaboration with wonderful clients.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {pastCommissions.map((commission, index) => (
                <Card 
                  key={index}
                  className="group border-arteza-blush hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={commission.image}
                      alt={commission.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-serif font-semibold text-arteza-charcoal mb-1">
                      {commission.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{commission.size}</p>
                    <Badge 
                      variant="outline" 
                      className="mt-2 border-arteza-peach text-arteza-charcoal text-xs"
                    >
                      Commission
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Process Info */}
            <Card className="mt-8 bg-arteza-blush/20 border-arteza-blush">
              <CardContent className="p-6">
                <h3 className="text-lg font-serif font-bold text-arteza-charcoal mb-4">
                  The Commission Process
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p><span className="font-medium text-arteza-charcoal">1. Consultation:</span> We'll discuss your vision in detail</p>
                  <p><span className="font-medium text-arteza-charcoal">2. Sketches:</span> I'll create initial concepts for your approval</p>
                  <p><span className="font-medium text-arteza-charcoal">3. Creation:</span> Your piece comes to life on canvas</p>
                  <p><span className="font-medium text-arteza-charcoal">4. Delivery:</span> Carefully packaged and shipped to you</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Commission;
