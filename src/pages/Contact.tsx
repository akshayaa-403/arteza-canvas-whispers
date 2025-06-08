
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast({
      title: "Message sent! ✨",
      description: "Thank you for reaching out. I'll get back to you soon with all the artistic love.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen pt-8 pb-20">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-arteza-charcoal mb-6">
          Let's Connect
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          Every conversation starts with a simple hello. Whether you're curious about a piece, 
          want to commission custom artwork, or just want to share your thoughts about art, 
          I'd love to hear from you.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-arteza-blush shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-semibold text-arteza-charcoal mb-6">
                What would you like to express?
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-arteza-charcoal font-medium">
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="What should I call you?"
                      className="mt-1 border-arteza-blush focus:border-arteza-indigo"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-arteza-charcoal font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="mt-1 border-arteza-blush focus:border-arteza-indigo"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject" className="text-arteza-charcoal font-medium">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's on your mind?"
                    className="mt-1 border-arteza-blush focus:border-arteza-indigo"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-arteza-charcoal font-medium">
                    Your Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Share your thoughts, questions, or commission ideas. I love hearing the stories behind each inquiry..."
                    rows={6}
                    className="mt-1 border-arteza-blush focus:border-arteza-indigo resize-none"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg"
                  className="w-full bg-arteza-indigo text-white hover:bg-arteza-charcoal transition-all duration-300"
                >
                  Send Message ✨
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Quick Connect */}
            <Card className="border-arteza-peach bg-arteza-peach/10">
              <CardContent className="p-8">
                <h3 className="text-xl font-serif font-semibold text-arteza-charcoal mb-4">
                  Quick Connect
                </h3>
                <p className="text-muted-foreground mb-6">
                  For immediate responses and behind-the-scenes glimpses of my artistic process:
                </p>
                
                <div className="space-y-4">
                  <a 
                    href="https://instagram.com/arteza_upasna" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 rounded-lg bg-white/50 hover:bg-white/80 transition-all duration-300 hover-brush-stroke"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
                      IG
                    </div>
                    <div>
                      <p className="font-medium text-arteza-charcoal">Instagram</p>
                      <p className="text-sm text-muted-foreground">@arteza_upasna</p>
                    </div>
                  </a>

                  <a 
                    href="https://wa.me/+91XXXXXXXXXX" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 rounded-lg bg-white/50 hover:bg-white/80 transition-all duration-300 hover-brush-stroke"
                  >
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">
                      WA
                    </div>
                    <div>
                      <p className="font-medium text-arteza-charcoal">WhatsApp</p>
                      <p className="text-sm text-muted-foreground">Quick chat about art</p>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Studio Information */}
            <Card className="border-arteza-olive bg-arteza-olive/10">
              <CardContent className="p-8">
                <h3 className="text-xl font-serif font-semibold text-arteza-charcoal mb-4">
                  Studio & Shipping
                </h3>
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <p className="font-medium text-arteza-charcoal">Based in:</p>
                    <p>Noida, Uttar Pradesh, India</p>
                  </div>
                  <div>
                    <p className="font-medium text-arteza-charcoal">Shipping:</p>
                    <p>Across India with careful packaging and love</p>
                  </div>
                  <div>
                    <p className="font-medium text-arteza-charcoal">Response Time:</p>
                    <p>Usually within 24 hours (sometimes sooner if I'm in the studio!)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Commission Information */}
            <Card className="border-arteza-blush bg-arteza-blush/10">
              <CardContent className="p-8">
                <h3 className="text-xl font-serif font-semibold text-arteza-charcoal mb-4">
                  Commission Guidelines
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Custom pieces start from ₹5,000</li>
                  <li>• Timeline: 2-4 weeks depending on size</li>
                  <li>• 50% advance, 50% on completion</li>
                  <li>• Includes progress photos throughout</li>
                  <li>• Free shipping within India</li>
                </ul>
                
                <Button 
                  className="mt-4 w-full bg-arteza-blush text-arteza-charcoal hover:bg-arteza-peach transition-all duration-300"
                >
                  Commission Request Form
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 mt-20">
        <h2 className="text-3xl font-serif font-bold text-arteza-charcoal text-center mb-12">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-6">
          <Card className="border-arteza-blush">
            <CardContent className="p-6">
              <h3 className="font-semibold text-arteza-charcoal mb-2">
                How long does shipping take within India?
              </h3>
              <p className="text-muted-foreground">
                Most artworks reach their destination within 5-7 business days. I package 
                each piece with extra care to ensure it arrives safely.
              </p>
            </CardContent>
          </Card>

          <Card className="border-arteza-peach">
            <CardContent className="p-6">
              <h3 className="font-semibold text-arteza-charcoal mb-2">
                Do you offer international shipping?
              </h3>
              <p className="text-muted-foreground">
                Currently, I ship within India only. However, I'm happy to discuss 
                international shipping for special commissions on a case-by-case basis.
              </p>
            </CardContent>
          </Card>

          <Card className="border-arteza-olive">
            <CardContent className="p-6">
              <h3 className="font-semibold text-arteza-charcoal mb-2">
                Can I see more photos of an artwork before purchasing?
              </h3>
              <p className="text-muted-foreground">
                Absolutely! I'm happy to send additional photos, detail shots, or even 
                a short video of any piece you're interested in.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
