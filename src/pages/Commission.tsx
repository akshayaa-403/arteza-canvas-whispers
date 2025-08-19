
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useFormValidation, ValidationRules } from "@/hooks/useFormValidation";
import { ValidatedInput } from "@/components/ValidatedInput";
import { ValidatedTextarea } from "@/components/ValidatedTextarea";
import { useToast } from "@/hooks/use-toast";

const Commission = () => {
  const { toast } = useToast();
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

  const validationRules: ValidationRules = {
    name: {
      required: true,
      minLength: 2,
      maxLength: 50
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    theme: {
      required: true,
      minLength: 3,
      maxLength: 100
    },
    description: {
      required: true,
      minLength: 20,
      maxLength: 500,
      custom: (value: string) => {
        const wordCount = value.trim().split(/\s+/).length;
        if (wordCount < 10) {
          return 'Please provide more details (at least 10 words)';
        }
        return null;
      }
    }
  };

  const {
    errors,
    touched,
    validateAllFields,
    handleFieldChange,
    handleFieldBlur,
    clearErrors
  } = useFormValidation(validationRules);

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
      title: "Dreamscapes Commission",
      size: "20x24 inches",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAllFields(formData)) {
      toast({
        title: "Please fix the errors",
        description: "Make sure all required fields are filled correctly.",
        variant: "destructive"
      });
      return;
    }

    // Check if required dropdowns are selected
    if (!formData.size || !formData.medium || !formData.budget || !formData.timeline) {
      toast({
        title: "Missing information",
        description: "Please select all required options from the dropdowns.",
        variant: "destructive"
      });
      return;
    }

    // Handle form submission
    console.log("Commission request:", formData);
    toast({
      title: "Commission request submitted!",
      description: "Thank you for your request. I'll get back to you within 24 hours.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      size: "",
      medium: "",
      budget: "",
      theme: "",
      timeline: "",
      description: ""
    });
    clearErrors();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    handleFieldChange(field, value);
  };

  const handleInputBlur = (field: string) => {
    handleFieldBlur(field, formData[field as keyof typeof formData]);
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
                    <ValidatedInput
                      id="name"
                      label="Your Name"
                      value={formData.name}
                      onChange={(value) => handleInputChange("name", value)}
                      onBlur={() => handleInputBlur("name")}
                      error={errors.name}
                      touched={touched.name}
                      required
                      placeholder="Enter your full name"
                      helpText="This will appear on your commission agreement"
                    />
                    
                    <ValidatedInput
                      id="email"
                      label="Email Address"
                      type="email"
                      value={formData.email}
                      onChange={(value) => handleInputChange("email", value)}
                      onBlur={() => handleInputBlur("email")}
                      error={errors.email}
                      touched={touched.email}
                      required
                      placeholder="your@email.com"
                      helpText="I'll use this to send you updates and the final artwork"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Preferred Size <span className="text-red-500">*</span>
                      </label>
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
                      <label className="text-sm font-medium mb-2 block">
                        Medium <span className="text-red-500">*</span>
                      </label>
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
                      <label className="text-sm font-medium mb-2 block">
                        Budget Range (₹) <span className="text-red-500">*</span>
                      </label>
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
                      <label className="text-sm font-medium mb-2 block">
                        Timeline <span className="text-red-500">*</span>
                      </label>
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

                  <ValidatedInput
                    id="theme"
                    label="Theme or Concept"
                    value={formData.theme}
                    onChange={(value) => handleInputChange("theme", value)}
                    onBlur={() => handleInputBlur("theme")}
                    error={errors.theme}
                    touched={touched.theme}
                    required
                    placeholder="e.g., Family portrait, Abstract emotion, Cultural heritage..."
                    maxLength={100}
                    showCharCount
                    helpText="What's the main subject or feeling you want to capture?"
                  />

                  <ValidatedTextarea
                    id="description"
                    label="Describe Your Vision"
                    value={formData.description}
                    onChange={(value) => handleInputChange("description", value)}
                    onBlur={() => handleInputBlur("description")}
                    error={errors.description}
                    touched={touched.description}
                    required
                    placeholder="Tell me more about what you envision. What emotions, memories, or stories should this piece capture? Include any specific details, colors, or elements you'd like to see..."
                    maxLength={500}
                    rows={4}
                    helpText="The more details you provide, the better I can bring your vision to life"
                  />

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
