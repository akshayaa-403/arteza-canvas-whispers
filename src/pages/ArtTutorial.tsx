
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Upload, Palette, BookOpen, Download, Mail, ChevronDown, Star, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ArtTutorial = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [tutorial, setTutorial] = useState<any>(null);
  const [isStepsOpen, setIsStepsOpen] = useState(true);
  const [isMaterialsOpen, setIsMaterialsOpen] = useState(false);
  const [isTipsOpen, setIsTipsOpen] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/jpg")) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      toast({
        title: "Invalid file format",
        description: "Please upload a JPEG or JPG image.",
        variant: "destructive",
      });
    }
  };

  const generateTutorial = async () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please upload an image first.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI tutorial generation
    setTimeout(() => {
      const mockTutorial = {
        title: "Watercolor Landscape Masterpiece",
        difficulty: "Intermediate",
        duration: "2-3 hours",
        style: "Watercolor Impressionism",
        materials: [
          { item: "Watercolor paints", colors: ["Ultramarine Blue", "Cadmium Yellow", "Burnt Umber", "Alizarin Crimson"], essential: true },
          { item: "Watercolor paper", specification: "300gsm cold-pressed", essential: true },
          { item: "Round brushes", sizes: ["6", "10", "14"], essential: true },
          { item: "Flat brush", sizes: ["1 inch"], essential: true },
          { item: "Masking tape", specification: "Artist grade", essential: false },
          { item: "Natural sponge", specification: "For texture effects", essential: false }
        ],
        steps: [
          {
            step: 1,
            title: "Initial Sketch & Composition",
            description: "Start by lightly sketching the basic shapes and composition using a 2H pencil. Focus on the main elements: horizon line, mountain silhouettes, and foreground elements. Keep lines minimal and light.",
            image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400",
            timeEstimate: "15 minutes",
            difficulty: "Easy"
          },
          {
            step: 2,
            title: "Sky Foundation - Wet-on-Wet Technique",
            description: "Wet the sky area with clean water using a large flat brush. While the paper is still damp, drop in ultramarine blue mixed with a touch of burnt umber. Let the colors flow naturally for a soft, atmospheric effect.",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
            timeEstimate: "20 minutes",
            difficulty: "Medium"
          },
          {
            step: 3,
            title: "Mountain Layers - Atmospheric Perspective",
            description: "Paint distant mountains with a light wash of ultramarine blue and burnt umber. Each layer should be darker as it comes forward. This creates depth through atmospheric perspective.",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
            timeEstimate: "30 minutes",
            difficulty: "Medium"
          },
          {
            step: 4,
            title: "Foreground Vegetation & Details",
            description: "Mix various greens using yellow and blue combinations. Paint trees and vegetation using vertical brushstrokes. Add texture with dry brush technique for realistic foliage effects.",
            image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
            timeEstimate: "45 minutes",
            difficulty: "Hard"
          },
          {
            step: 5,
            title: "Final Details & Highlights",
            description: "Add final details like highlights on water, texture in rocks, and light catching on leaves. Use masking fluid for preserved white areas. Sign your masterpiece!",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
            timeEstimate: "30 minutes",
            difficulty: "Easy"
          }
        ],
        tips: [
          "Always work from light to dark in watercolor - you can't easily lighten once it's dark",
          "Let each layer dry completely before adding the next to avoid muddy colors",
          "Use a spray bottle to keep your paints moist throughout the painting session",
          "Don't overwork the painting - watercolor loves spontaneity and happy accidents",
          "Test colors on a separate piece of paper before applying to your main painting",
          "Clean your brush thoroughly between color changes to maintain color purity"
        ]
      };
      
      setTutorial(mockTutorial);
      setIsGenerating(false);
      toast({
        title: "Tutorial Generated Successfully!",
        description: "Your personalized art tutorial is ready to explore.",
      });
    }, 3000);
  };

  const testimonials = [
    {
      name: "Sarah Chen",
      location: "Artist from Delhi",
      text: "This AI tutorial generator helped me understand watercolor techniques I'd been struggling with for months!",
      rating: 5
    },
    {
      name: "Raj Patel",
      location: "Art Student from Mumbai",
      text: "The step-by-step approach made complex paintings feel achievable. Absolutely love this tool!",
      rating: 5
    },
    {
      name: "Maya Singh",
      location: "Professional Artist",
      text: "As a teacher, I use these tutorials to create lesson plans for my students. Incredible detail!",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "How accurate are the AI-generated tutorials?",
      answer: "Our AI analyzes thousands of art techniques and provides guidance based on established artistic principles. While highly accurate, we recommend using these as starting points and adapting to your personal style."
    },
    {
      question: "Can I use any image format?",
      answer: "Currently, we support JPEG and JPG formats for the best AI analysis results. Make sure your image is clear and well-lit for optimal tutorial generation."
    },
    {
      question: "How long does it take to generate a tutorial?",
      answer: "Tutorial generation typically takes 30 seconds to 2 minutes, depending on image complexity and current server load."
    },
    {
      question: "Can I download or share my tutorials?",
      answer: "Yes! You can download your tutorials as PDF files or email them to yourself for future reference."
    },
    {
      question: "Are there any limitations on image content?",
      answer: "We accept most artistic subjects including landscapes, portraits, still life, and abstract compositions. The AI works best with clear, well-composed reference images."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-arteza-cream via-background to-arteza-sage/10">
      {/* Hero Section */}
      <div className="relative py-20 px-4 text-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-arteza-sage/20 rounded-full animate-gentle-float" />
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-arteza-terracotta/20 rounded-full animate-gentle-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-arteza-copper/20 rounded-full animate-gentle-float" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-arteza-charcoal mb-6 animate-brush-stroke">
            Turn Any Image into a 
            <span className="block text-arteza-terracotta mt-2">Masterpiece Plan</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Upload your reference image and let our AI create a personalized, step-by-step art tutorial 
            with materials, techniques, and professional tips tailored just for you.
          </p>
          <div className="flex items-center justify-center gap-2 mb-8">
            <Sparkles className="h-5 w-5 text-arteza-terracotta animate-pulse" />
            <span className="text-sm font-medium text-arteza-charcoal">Powered by Advanced AI Art Analysis</span>
            <Sparkles className="h-5 w-5 text-arteza-terracotta animate-pulse" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* Upload Section */}
        <Card className="mb-12 border-arteza-sage/30 shadow-lg bg-background/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center text-2xl text-arteza-charcoal">
              <Upload className="mr-3 h-6 w-6 text-arteza-terracotta" />
              Upload Your Reference Image
            </CardTitle>
            <p className="text-muted-foreground">JPEG or JPG format, maximum 10MB</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Upload Area */}
              <div className="space-y-4">
                <Label htmlFor="image-upload" className="text-arteza-charcoal font-medium text-lg">
                  Choose Your Reference Image
                </Label>
                <div className="border-2 border-dashed border-arteza-sage/40 rounded-lg p-8 text-center hover:border-arteza-terracotta/40 transition-colors">
                  <Input
                    id="image-upload"
                    type="file"
                    accept=".jpeg,.jpg"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 text-arteza-sage mx-auto mb-4" />
                    <p className="text-arteza-charcoal font-medium mb-2">Click to upload or drag and drop</p>
                    <p className="text-sm text-muted-foreground">JPEG, JPG up to 10MB</p>
                  </label>
                </div>
                
                {imagePreview && (
                  <div className="mt-6">
                    <h4 className="font-medium text-arteza-charcoal mb-3">Preview</h4>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg border-2 border-arteza-sage/30 shadow-md"
                    />
                  </div>
                )}
              </div>

              {/* Feature Highlights */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-arteza-charcoal">What You'll Receive</h3>
                <div className="space-y-4">
                  {[
                    { icon: BookOpen, title: "Step-by-Step Guide", desc: "Detailed instructions for each stage" },
                    { icon: Palette, title: "Color-Coded Materials", desc: "Complete supply list with color specifications" },
                    { icon: Star, title: "Visual References", desc: "Annotated images showing each technique" },
                    { icon: Sparkles, title: "Professional Tips", desc: "Expert advice tailored to your image style" }
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-4 p-4 rounded-lg bg-arteza-cream/30">
                      <div className="w-10 h-10 bg-arteza-terracotta/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <feature.icon className="h-5 w-5 text-arteza-terracotta" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-arteza-charcoal">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Button
                onClick={generateTutorial}
                disabled={!selectedImage || isGenerating}
                size="lg"
                className="bg-arteza-terracotta text-white hover:bg-arteza-rust px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isGenerating ? (
                  <>
                    <Palette className="mr-3 h-5 w-5 animate-spin" />
                    Generating Your Tutorial...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-3 h-5 w-5" />
                    Generate AI Tutorial
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Generated Tutorial */}
        {tutorial && (
          <Card className="mb-12 border-arteza-terracotta/30 shadow-lg bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-3xl text-arteza-charcoal mb-2">{tutorial.title}</CardTitle>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="bg-arteza-sage/20 px-3 py-1 rounded-full">Style: {tutorial.style}</span>
                    <span className="bg-arteza-copper/20 px-3 py-1 rounded-full">Difficulty: {tutorial.difficulty}</span>
                    <span className="bg-arteza-terracotta/20 px-3 py-1 rounded-full">Duration: {tutorial.duration}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="border-arteza-terracotta text-arteza-terracotta hover:bg-arteza-terracotta hover:text-white">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                  <Button variant="outline" className="border-arteza-sage text-arteza-sage hover:bg-arteza-sage hover:text-white">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Tutorial
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="steps" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8 bg-arteza-cream/50">
                  <TabsTrigger value="steps" className="data-[state=active]:bg-arteza-terracotta data-[state=active]:text-white">
                    Step-by-Step Guide
                  </TabsTrigger>
                  <TabsTrigger value="materials" className="data-[state=active]:bg-arteza-sage data-[state=active]:text-white">
                    Materials & Colors
                  </TabsTrigger>
                  <TabsTrigger value="tips" className="data-[state=active]:bg-arteza-copper data-[state=active]:text-white">
                    Pro Tips
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="steps" className="space-y-6">
                  {tutorial.steps.map((step: any) => (
                    <Card key={step.step} className="border-arteza-sage/20 overflow-hidden">
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          <div className="lg:col-span-1">
                            <img
                              src={step.image}
                              alt={step.title}
                              className="w-full h-48 object-cover rounded-lg shadow-md"
                            />
                          </div>
                          <div className="lg:col-span-2">
                            <div className="flex items-center mb-4">
                              <div className="w-10 h-10 bg-arteza-terracotta text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                                {step.step}
                              </div>
                              <div>
                                <h3 className="text-xl font-semibold text-arteza-charcoal">{step.title}</h3>
                                <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                                  <span>⏱️ {step.timeEstimate}</span>
                                  <span>📊 {step.difficulty}</span>
                                </div>
                              </div>
                            </div>
                            <p className="text-foreground leading-relaxed">{step.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="materials" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tutorial.materials.map((material: any, index: number) => (
                      <Card key={index} className={`border-l-4 ${material.essential ? 'border-l-arteza-terracotta' : 'border-l-arteza-sage'}`}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-arteza-charcoal flex items-center">
                                {material.item}
                                {material.essential && <span className="ml-2 text-xs bg-arteza-terracotta text-white px-2 py-1 rounded-full">Essential</span>}
                              </h4>
                              {material.colors && (
                                <div className="mt-2">
                                  <p className="text-sm text-muted-foreground mb-1">Colors needed:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {material.colors.map((color: string, idx: number) => (
                                      <span key={idx} className="text-xs bg-arteza-copper/20 px-2 py-1 rounded">{color}</span>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {material.sizes && (
                                <p className="text-sm text-muted-foreground mt-1">Sizes: {material.sizes.join(", ")}</p>
                              )}
                              {material.specification && (
                                <p className="text-sm text-muted-foreground mt-1">{material.specification}</p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="tips" className="space-y-4">
                  <div className="bg-gradient-to-r from-arteza-sage/10 to-arteza-copper/10 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-arteza-charcoal mb-4 flex items-center">
                      <Palette className="mr-2 h-5 w-5 text-arteza-terracotta" />
                      Professional Artist Tips
                    </h3>
                    <div className="space-y-3">
                      {tutorial.tips.map((tip: string, index: number) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-background/50 rounded-lg">
                          <div className="w-6 h-6 bg-arteza-terracotta rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-white text-xs font-bold">{index + 1}</span>
                          </div>
                          <p className="text-foreground leading-relaxed">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}

        {/* Testimonials */}
        <Card className="mb-12 border-arteza-copper/30 bg-gradient-to-r from-arteza-cream/30 to-arteza-sage/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-arteza-charcoal">What Artists Are Saying</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-background/80 p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-arteza-terracotta text-arteza-terracotta" />
                    ))}
                  </div>
                  <p className="text-foreground italic mb-4">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-arteza-charcoal">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="mb-12 border-arteza-sage/30">
          <CardHeader>
            <CardTitle className="text-2xl text-arteza-charcoal text-center">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-arteza-sage/20">
                  <AccordionTrigger className="text-left text-arteza-charcoal hover:text-arteza-terracotta">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="text-center p-8 bg-arteza-cream/30 rounded-lg border border-arteza-sage/20">
          <p className="text-muted-foreground mb-4">
            <span className="font-medium text-arteza-charcoal">Please note:</span> Tutorials are AI-generated for guidance purposes. 
            While based on established art principles, individual results may vary.
          </p>
          <p className="text-sm text-muted-foreground">
            For personalized guidance and art mentorship, contact{" "}
            <span className="font-semibold text-arteza-terracotta">Upasna</span>, 
            professional artist based in Noida. Available for consultations and custom tutorials.
          </p>
        </div>
      </div>

      {/* Sticky Mobile Upload Button */}
      <div className="fixed bottom-6 right-6 md:hidden z-50">
        <Button
          onClick={() => document.getElementById('image-upload')?.click()}
          size="lg"
          className="bg-arteza-terracotta text-white hover:bg-arteza-rust rounded-full shadow-lg w-14 h-14 p-0"
        >
          <Upload className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default ArtTutorial;
