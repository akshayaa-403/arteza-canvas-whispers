
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Quiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      question: "What draws you to art?",
      options: [
        { text: "The escape it provides", value: "dreamscapes" },
        { text: "Raw emotional expression", value: "abstract" },
        { text: "Stories and heritage", value: "cultural" },
        { text: "Quiet, personal moments", value: "intimate" }
      ]
    },
    {
      question: "Which colors speak to your soul?",
      options: [
        { text: "Soft pastels and dreamy hues", value: "dreamscapes" },
        { text: "Bold, contrasting tones", value: "abstract" },
        { text: "Rich, earthy pigments", value: "cultural" },
        { text: "Muted, gentle shades", value: "intimate" }
      ]
    },
    {
      question: "What time of day inspires you most?",
      options: [
        { text: "Dawn - when the world awakens", value: "dreamscapes" },
        { text: "Midday - when energy peaks", value: "abstract" },
        { text: "Golden hour - when light tells stories", value: "cultural" },
        { text: "Twilight - when thoughts turn inward", value: "intimate" }
      ]
    },
    {
      question: "How do you prefer to experience art?",
      options: [
        { text: "Lost in imagination", value: "dreamscapes" },
        { text: "Feeling every brushstroke", value: "abstract" },
        { text: "Connecting with history", value: "cultural" },
        { text: "In quiet contemplation", value: "intimate" }
      ]
    },
    {
      question: "What would you want art to do for your space?",
      options: [
        { text: "Transport me elsewhere", value: "dreamscapes" },
        { text: "Energize and inspire", value: "abstract" },
        { text: "Tell meaningful stories", value: "cultural" },
        { text: "Create peaceful moments", value: "intimate" }
      ]
    }
  ];

  const collections = {
    dreamscapes: {
      name: "Dreamscapes",
      description: "Ethereal visions painted in whispers of color",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
      message: "You're drawn to the poetic and otherworldly. These pieces will transport you to realms where imagination meets canvas."
    },
    abstract: {
      name: "Abstract Expressions",
      description: "Raw emotion through bold brushstrokes",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      message: "You connect with pure emotion and energy. These works speak the language of the heart without words."
    },
    cultural: {
      name: "Cultural Chronicles",
      description: "Stories from the heart of India",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      message: "You value heritage and narrative. These pieces carry the weight of history and the beauty of cultural depth."
    },
    intimate: {
      name: "Intimate Moments",
      description: "Quiet observations of daily poetry",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
      message: "You find beauty in stillness and contemplation. These works celebrate the gentle poetry of everyday life."
    }
  };

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const getResult = () => {
    const counts = answers.reduce((acc, answer) => {
      acc[answer] = (acc[answer] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.keys(counts).reduce((a, b) => 
      counts[a] > counts[b] ? a : b
    ) as keyof typeof collections;
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setShowResult(false);
  };

  if (showResult) {
    const result = getResult();
    const collection = collections[result];

    return (
      <div className="min-h-screen pt-8 pb-20 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <Card className="border-arteza-blush overflow-hidden">
            <div className="relative h-80">
              <img
                src={collection.image}
                alt={collection.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h2 className="text-3xl font-serif font-bold mb-2">{collection.name}</h2>
                <p className="text-lg">{collection.description}</p>
              </div>
            </div>
            
            <CardContent className="p-8">
              <h3 className="text-2xl font-serif font-bold text-arteza-charcoal mb-4">
                Your Collection Match
              </h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {collection.message}
              </p>
              
              <div className="space-y-4">
                <Button 
                  asChild
                  size="lg"
                  className="w-full bg-arteza-indigo text-white hover:bg-arteza-charcoal"
                >
                  <Link to="/shop">Explore This Collection</Link>
                </Button>
                <Button 
                  variant="outline"
                  onClick={resetQuiz}
                  className="w-full border-arteza-blush text-arteza-charcoal hover:bg-arteza-blush"
                >
                  Take Quiz Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-8 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-arteza-charcoal mb-4">
            Which Arteza Collection Speaks to You?
          </h1>
          <p className="text-lg text-muted-foreground">
            A 5-step journey to discover the art that resonates with your soul
          </p>
        </div>

        {/* Progress */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-muted-foreground">
              Question {currentStep + 1} of {questions.length}
            </span>
            <Badge variant="outline" className="border-arteza-blush text-arteza-charcoal">
              {Math.round(((currentStep + 1) / questions.length) * 100)}% Complete
            </Badge>
          </div>
          <div className="w-full bg-arteza-blush/30 rounded-full h-2">
            <div 
              className="bg-arteza-indigo h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <Card className="border-arteza-blush">
          <CardContent className="p-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-arteza-charcoal mb-8 text-center">
              {questions[currentStep].question}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questions[currentStep].options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleAnswer(option.value)}
                  className="h-auto p-6 text-left border-arteza-blush hover:bg-arteza-blush hover:border-arteza-peach transition-all duration-300"
                >
                  <span className="text-lg">{option.text}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="ghost"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="text-arteza-indigo hover:bg-arteza-blush"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <Link to="/">
            <Button variant="ghost" className="text-muted-foreground hover:text-arteza-charcoal">
              Exit Quiz
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
