
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Calendar as CalendarIcon, Clock, Users, MapPin, ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface ClassSchedule {
  id: string;
  class_title: string;
  class_type: string;
  age_group: string;
  instructor_name: string;
  scheduled_date: string;
  start_time: string;
  end_time: string;
  max_students: number;
  current_enrollments: number;
  zoom_link: string | null;
  materials_list: string[];
  status: string;
}

const ClassScheduler = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [classes, setClasses] = useState<ClassSchedule[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>("all");
  const [selectedClass, setSelectedClass] = useState<ClassSchedule | null>(null);
  const [specialRequests, setSpecialRequests] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [loadingClasses, setLoadingClasses] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    fetchClasses();
  }, [selectedDate, selectedAgeGroup]);

  const fetchClasses = async () => {
    try {
      let query = supabase
        .from("class_schedules")
        .select("*")
        .eq("status", "scheduled")
        .gte("scheduled_date", new Date().toISOString().split('T')[0])
        .order("scheduled_date", { ascending: true });

      if (selectedDate) {
        const dateStr = selectedDate.toISOString().split('T')[0];
        query = query.eq("scheduled_date", dateStr);
      }

      if (selectedAgeGroup !== "all") {
        query = query.eq("age_group", selectedAgeGroup);
      }

      const { data, error } = await query;

      if (error) throw error;
      setClasses(data || []);
    } catch (error) {
      // Error handling - consider using proper error reporting service
      toast.error("Failed to load classes");
    } finally {
      setLoadingClasses(false);
    }
  };

  const handleBookClass = async () => {
    if (!selectedClass || !user) return;

    setBookingLoading(true);
    try {
      // Check if user already booked this class
      const { data: existingBooking } = await supabase
        .from("class_bookings")
        .select("id")
        .eq("user_id", user.id)
        .eq("class_schedule_id", selectedClass.id)
        .single();

      if (existingBooking) {
        toast.error("You've already booked this class!");
        return;
      }

      // Create booking
      const { error: bookingError } = await supabase
        .from("class_bookings")
        .insert({
          user_id: user.id,
          class_schedule_id: selectedClass.id,
          special_requests: specialRequests || null
        });

      if (bookingError) throw bookingError;

      // Update enrollment count
      const { error: updateError } = await supabase
        .from("class_schedules")
        .update({ 
          current_enrollments: selectedClass.current_enrollments + 1,
          status: selectedClass.current_enrollments + 1 >= selectedClass.max_students ? 'full' : 'scheduled'
        })
        .eq("id", selectedClass.id);

      if (updateError) throw updateError;

      toast.success("Class booked successfully! Check your email for Zoom details.");
      setSelectedClass(null);
      setSpecialRequests("");
      fetchClasses();
    } catch (error) {
      // Error handling - consider using proper error reporting service
      toast.error("Failed to book class. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-arteza-sage/20 to-arteza-terracotta/20 flex items-center justify-center">
        <div className="text-center">
          <CalendarIcon className="h-12 w-12 text-arteza-terracotta mx-auto mb-4 animate-spin" />
          <p className="text-arteza-charcoal">Loading class schedules...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-arteza-sage/20 to-arteza-terracotta/20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-arteza-sage/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button asChild variant="outline" size="sm">
              <Link to="/student-dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl font-serif font-bold text-arteza-charcoal">
            Book Your Art Class
          </h1>
          <p className="text-muted-foreground mt-1">Choose from our available sessions</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Filter Classes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-sm font-medium mb-3 block">Select Date</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    className="rounded-md border"
                  />
                  {selectedDate && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-2"
                      onClick={() => setSelectedDate(undefined)}
                    >
                      Clear Date
                    </Button>
                  )}
                </div>

                <div>
                  <Label className="text-sm font-medium mb-3 block">Age Group</Label>
                  <Select value={selectedAgeGroup} onValueChange={setSelectedAgeGroup}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Age Groups</SelectItem>
                      <SelectItem value="kids">Kids</SelectItem>
                      <SelectItem value="adults">Adults</SelectItem>
                      <SelectItem value="seniors">Seniors</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Classes Grid */}
          <div className="lg:col-span-3">
            {loadingClasses ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="bg-white/80 backdrop-blur-sm animate-pulse">
                    <CardHeader className="pb-4">
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        <div className="h-8 bg-gray-200 rounded"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : classes.length === 0 ? (
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="text-center py-12">
                  <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Classes Available</h3>
                  <p className="text-muted-foreground mb-4">
                    {selectedDate || selectedAgeGroup !== "all" 
                      ? "Try adjusting your filters to see more classes."
                      : "Check back soon for new class schedules!"}
                  </p>
                  {(selectedDate || selectedAgeGroup !== "all") && (
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSelectedDate(undefined);
                        setSelectedAgeGroup("all");
                      }}
                    >
                      Clear All Filters
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {classes.map((classItem) => (
                  <Card key={classItem.id} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-lg font-semibold text-arteza-charcoal">
                          {classItem.class_title}
                        </CardTitle>
                        <Badge 
                          variant={classItem.current_enrollments >= classItem.max_students ? 'destructive' : 'secondary'}
                          className="ml-2"
                        >
                          {classItem.current_enrollments >= classItem.max_students ? 'Full' : 'Available'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{classItem.class_type}</p>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <CalendarIcon className="h-4 w-4" />
                          {new Date(classItem.scheduled_date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                        
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {classItem.start_time} - {classItem.end_time}
                        </div>
                        
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          {classItem.current_enrollments}/{classItem.max_students} students • {classItem.age_group}
                        </div>
                        
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          Online (Zoom) • Instructor: {classItem.instructor_name}
                        </div>
                      </div>

                      {classItem.materials_list.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-2">Materials needed:</p>
                          <div className="flex flex-wrap gap-1">
                            {classItem.materials_list.slice(0, 3).map((material, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {material}
                              </Badge>
                            ))}
                            {classItem.materials_list.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{classItem.materials_list.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      <Button 
                        className="w-full"
                        disabled={classItem.current_enrollments >= classItem.max_students}
                        onClick={() => setSelectedClass(classItem)}
                      >
                        {classItem.current_enrollments >= classItem.max_students ? 'Class Full' : 'Book This Class'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedClass && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-arteza-sage" />
                Confirm Booking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-arteza-sage/10 p-4 rounded-lg">
                <h3 className="font-semibold text-arteza-charcoal">{selectedClass.class_title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{selectedClass.class_type}</p>
                <div className="text-sm space-y-1">
                  <div>📅 {new Date(selectedClass.scheduled_date).toLocaleDateString()}</div>
                  <div>🕐 {selectedClass.start_time} - {selectedClass.end_time}</div>
                  <div>👥 {selectedClass.age_group} group</div>
                </div>
              </div>

              <div>
                <Label htmlFor="special-requests" className="text-sm font-medium">
                  Special Requests (Optional)
                </Label>
                <Textarea
                  id="special-requests"
                  placeholder="Any special requirements or questions..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setSelectedClass(null)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-arteza-sage hover:bg-arteza-moss"
                  onClick={handleBookClass}
                  disabled={bookingLoading}
                >
                  {bookingLoading ? "Booking..." : "Confirm Booking"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ClassScheduler;
