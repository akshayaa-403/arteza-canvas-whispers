
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail, Palette, Sparkles, Check } from "lucide-react";

interface SubscriptionPreferences {
  artTips: boolean;
  classUpdates: boolean;
  newArtworks: boolean;
  specialOffers: boolean;
}

const EmailSubscription = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [preferences, setPreferences] = useState<SubscriptionPreferences>({
    artTips: true,
    classUpdates: true,
    newArtworks: true,
    specialOffers: false
  });
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setLoading(true);
    try {
      // Check if email already exists
      const { data: existing } = await supabase
        .from("email_subscribers")
        .select("id, subscription_status")
        .eq("email", email)
        .single();

      if (existing) {
        if (existing.subscription_status === 'active') {
          toast.error("You're already subscribed to our newsletter!");
          return;
        } else {
          // Reactivate subscription
          const { error } = await supabase
            .from("email_subscribers")
            .update({
              subscription_status: 'active',
              name: name || null,
              preferences: preferences,
              updated_at: new Date().toISOString()
            })
            .eq("id", existing.id);

          if (error) throw error;
          toast.success("Welcome back! Your subscription has been reactivated.");
        }
      } else {
        // Create new subscription
        const { error } = await supabase
          .from("email_subscribers")
          .insert({
            email,
            name: name || null,
            subscription_source: 'website',
            preferences: preferences
          });

        if (error) throw error;
        toast.success("Successfully subscribed! Welcome to the ARTEZA community.");
      }

      setSubscribed(true);
      // Trigger welcome email series (this would be handled by a background job)
      triggerWelcomeEmailSeries(email);
      
    } catch (error) {
      console.error("Error subscribing:", error);
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const triggerWelcomeEmailSeries = async (email: string) => {
    // This would typically trigger a background job or webhook
    // For now, we'll just log it and update the database
    console.log(`Triggering welcome email series for: ${email}`);
    
    // Mark that we've started the welcome series
    await supabase
      .from("email_subscribers")
      .update({ 
        last_email_sent: new Date().toISOString(),
        welcome_series_completed: false 
      })
      .eq("email", email);
  };

  const updatePreference = (key: keyof SubscriptionPreferences, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  if (subscribed) {
    return (
      <Card className="bg-gradient-to-br from-arteza-sage/20 to-arteza-terracotta/20 border-arteza-sage/30">
        <CardContent className="text-center py-8">
          <div className="w-16 h-16 bg-arteza-sage rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-arteza-charcoal mb-2">
            Welcome to ARTEZA!
          </h3>
          <p className="text-muted-foreground mb-4">
            You're now part of our artistic community. Check your email for your welcome gift!
          </p>
          <div className="bg-white/60 rounded-lg p-4 max-w-sm mx-auto">
            <p className="text-sm text-arteza-charcoal font-medium">
              🎨 Coming your way:
            </p>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1">
              <li>• Weekly art tips & tutorials</li>
              <li>• Early access to new classes</li>
              <li>• Behind-the-scenes studio content</li>
              <li>• Exclusive artwork previews</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-arteza-sage/30">
      <CardHeader className="text-center">
        <div className="w-12 h-12 bg-gradient-to-br from-arteza-terracotta to-arteza-rust rounded-full flex items-center justify-center mx-auto mb-3">
          <Mail className="h-6 w-6 text-white" />
        </div>
        <CardTitle className="text-xl font-serif text-arteza-charcoal">
          Join the ARTEZA Community
        </CardTitle>
        <p className="text-muted-foreground">
          Get weekly art inspiration, tutorials, and exclusive access to new classes
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubscribe} className="space-y-4">
          <div className="space-y-3">
            <div>
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-arteza-sage/30 focus:border-arteza-terracotta"
              />
            </div>
            
            <div>
              <Input
                type="text"
                placeholder="Your name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-arteza-sage/30 focus:border-arteza-terracotta"
              />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-arteza-charcoal">
              What would you like to receive?
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="artTips"
                  checked={preferences.artTips}
                  onCheckedChange={(checked) => updatePreference('artTips', checked as boolean)}
                />
                <label htmlFor="artTips" className="text-sm cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-arteza-terracotta" />
                    Weekly art tips & tutorials
                  </div>
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="classUpdates"
                  checked={preferences.classUpdates}
                  onCheckedChange={(checked) => updatePreference('classUpdates', checked as boolean)}
                />
                <label htmlFor="classUpdates" className="text-sm cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-arteza-sage" />
                    New class announcements
                  </div>
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="newArtworks"
                  checked={preferences.newArtworks}
                  onCheckedChange={(checked) => updatePreference('newArtworks', checked as boolean)}
                />
                <label htmlFor="newArtworks" className="text-sm cursor-pointer">
                  New artwork releases
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="specialOffers"
                  checked={preferences.specialOffers}
                  onCheckedChange={(checked) => updatePreference('specialOffers', checked as boolean)}
                />
                <label htmlFor="specialOffers" className="text-sm cursor-pointer">
                  Special offers & promotions
                </label>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-arteza-terracotta to-arteza-rust hover:from-arteza-rust hover:to-arteza-terracotta text-white"
            disabled={loading}
          >
            {loading ? "Subscribing..." : "Subscribe & Get Free Art Tips"}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            You can unsubscribe at any time. We respect your privacy and will never share your email.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default EmailSubscription;
