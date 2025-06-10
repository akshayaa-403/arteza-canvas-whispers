
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Palette, BookOpen, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ArtTutorial = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [tutorial, setTutorial] = useState<any>(null);
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
        title: "Watercolor Landscape Tutorial",
        difficulty: "Intermediate",
        duration: "2-3 hours",
        materials: [
          "Watercolor paints (ultramarine blue, cadmium yellow, burnt umber)",
          "Watercolor paper (300gsm)",
          "Round brushes (sizes 6, 10, 14)",
          "Flat brush (1 inch)",
          "Masking tape",
          "Natural sponge"
        ],
        steps: [
          {
            step: 1,
            title: "Sketch the Composition",
            description: "Lightly sketch the basic shapes of the mountains, trees, and horizon line using a 2H pencil.",
            image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400"
          },
          {
            step: 2,
            title: "Wet-on-Wet Sky",
            description: "Wet the sky area with clean water. While damp, add ultramarine blue mixed with a touch of burnt umber for the sky.",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"
          },
          {
            step: 3,
            title: "Paint the Mountains",
            description: "Mix ultramarine blue with burnt umber for distant mountains. Paint in layers, making foreground mountains darker.",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"
          },
          {
            step: 4,
            title: "Add Foreground Details",
            description: "Paint trees and vegetation using various greens mixed from yellow and blue. Add texture with dry brush technique.",
            image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400"
          },
          {
            step: 5,
            title: "Final Details",
            description: "Add final details like highlights, shadows, and texture. Use masking fluid for light areas if needed.",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"
          }
        ],
        tips: [
          "Always work from light to dark in watercolor",
          "Let each layer dry completely before adding the next",
          "Use a spray bottle to keep paints moist",
          "Don't overwork the painting - watercolor loves spontaneity"
        ]
      };
      
      setTutorial(mockTutorial);
      setIsGenerating(false);
      toast({
        title: "Tutorial Generated!",
        description: "Your personalized art tutorial is ready.",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-arteza-blush/20 to-arteza-peach/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-arteza-charcoal mb-4">
            AI Art Tutorial Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your reference image and let AI create a personalized step-by-step art tutorial just for you
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Upload Section */}
          <Card className="border-arteza-blush">
            <CardHeader>
              <CardTitle className="flex items-center text-arteza-charcoal">
                <Upload className="mr-2 h-5 w-5 text-arteza-terracotta" />
                Upload Reference Image
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="image-upload" className="text-arteza-charcoal font-medium">
                  Choose JPEG/JPG Image
                </Label>
                <Input
                  id="image-upload"
                  type="file"
                  accept=".jpeg,.jpg"
                  onChange={handleImageUpload}
                  className="mt-2 border-arteza-blush focus:border-arteza-terracotta"
                />
              </div>
              
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg border border-arteza-blush"
                  />
                </div>
              )}
              
              <Button
                onClick={generateTutorial}
                disabled={!selectedImage || isGenerating}
                className="w-full bg-arteza-terracotta text-white hover:bg-arteza-rust"
              >
                {isGenerating ? (
                  <>
                    <Palette className="mr-2 h-4 w-4 animate-spin" />
                    Generating Tutorial...
                  </>
                ) : (
                  <>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Generate AI Tutorial
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="border-arteza-sage">
            <CardHeader>
              <CardTitle className="text-arteza-charcoal">What You'll Get</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-arteza-blush rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-arteza-charcoal font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-arteza-charcoal">Step-by-Step Instructions</h4>
                  <p className="text-sm text-muted-foreground">Detailed guidance for each stage of your artwork</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-arteza-peach rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-arteza-charcoal font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-arteza-charcoal">Materials List</h4>
                  <p className="text-sm text-muted-foreground">Complete list of supplies you'll need</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-arteza-sage rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-arteza-charcoal font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-arteza-charcoal">Visual References</h4>
                  <p className="text-sm text-muted-foreground">Images showing each step of the process</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-arteza-copper rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-arteza-charcoal font-bold text-sm">4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-arteza-charcoal">Pro Tips</h4>
                  <p className="text-sm text-muted-foreground">Expert advice to improve your technique</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Generated Tutorial */}
        {tutorial && (
          <Card className="border-arteza-terracotta">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-arteza-charcoal">{tutorial.title}</CardTitle>
                <Button variant="outline" className="border-arteza-terracotta text-arteza-terracotta hover:bg-arteza-terracotta hover:text-white">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>Difficulty: {tutorial.difficulty}</span>
                <span>Duration: {tutorial.duration}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Materials */}
              <div>
                <h3 className="text-lg font-semibold text-arteza-charcoal mb-3">Materials Needed</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {tutorial.materials.map((material: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-arteza-terracotta rounded-full"></div>
                      <span className="text-sm text-foreground">{material}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Steps */}
              <div>
                <h3 className="text-lg font-semibold text-arteza-charcoal mb-6">Tutorial Steps</h3>
                <div className="space-y-8">
                  {tutorial.steps.map((step: any) => (
                    <div key={step.step} className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-full h-48 object-cover rounded-lg border border-arteza-blush"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 bg-arteza-terracotta text-white rounded-full flex items-center justify-center font-bold mr-3">
                            {step.step}
                          </div>
                          <h4 className="text-lg font-semibold text-arteza-charcoal">{step.title}</h4>
                        </div>
                        <p className="text-foreground leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div>
                <h3 className="text-lg font-semibold text-arteza-charcoal mb-3">Pro Tips</h3>
                <div className="bg-arteza-blush/20 rounded-lg p-4 space-y-2">
                  {tutorial.tips.map((tip: string, index: number) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Palette className="h-4 w-4 text-arteza-terracotta mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ArtTutorial;
