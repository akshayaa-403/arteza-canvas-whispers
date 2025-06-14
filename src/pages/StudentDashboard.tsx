
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BookOpen, Calendar, Award, LogOut, Palette, Clock, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface Enrollment {
  id: string;
  class_type: string;
  completion_status: string;
  progress_percentage: number;
  skills_learned: string[];
  enrollment_date: string;
}

interface Booking {
  id: string;
  booking_status: string;
  payment_status: string;
  class_schedules: {
    class_title: string;
    scheduled_date: string;
    start_time: string;
    end_time: string;
    age_group: string;
  };
}

const StudentDashboard = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const [enrollmentsResponse, bookingsResponse] = await Promise.all([
        supabase
          .from("student_enrollments")
          .select("*")
          .eq("user_id", user?.id),
        supabase
          .from("class_bookings")
          .select(`
            *,
            class_schedules(class_title, scheduled_date, start_time, end_time, age_group)
          `)
          .eq("user_id", user?.id)
      ]);

      if (enrollmentsResponse.error) throw enrollmentsResponse.error;
      if (bookingsResponse.error) throw bookingsResponse.error;

      setEnrollments(enrollmentsResponse.data || []);
      setBookings(bookingsResponse.data || []);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to load your data");
    } finally {
      setLoadingData(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-arteza-sage/20 to-arteza-terracotta/20 flex items-center justify-center">
        <div className="text-center">
          <Palette className="h-12 w-12 text-arteza-terracotta mx-auto mb-4 animate-spin" />
          <p className="text-arteza-charcoal">Loading your artistic journey...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const completedClasses = enrollments.filter(e => e.completion_status === 'completed').length;
  const totalSkills = [...new Set(enrollments.flatMap(e => e.skills_learned))];
  const averageProgress = enrollments.length > 0 
    ? enrollments.reduce((sum, e) => sum + e.progress_percentage, 0) / enrollments.length 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-arteza-sage/20 to-arteza-terracotta/20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-arteza-sage/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-serif font-bold text-arteza-charcoal">
                Welcome back, {user.user_metadata?.name || user.email}!
              </h1>
              <p className="text-muted-foreground mt-1">Your artistic journey continues here</p>
            </div>
            <div className="flex gap-3">
              <Button asChild variant="outline">
                <Link to="/">
                  <Palette className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <Button onClick={handleSignOut} variant="outline">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-arteza-terracotta/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-arteza-terracotta">
                <Award className="h-5 w-5" />
                Classes Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-arteza-charcoal">{completedClasses}</div>
              <p className="text-sm text-muted-foreground">
                {enrollments.length - completedClasses} in progress
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-arteza-sage/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-arteza-sage">
                <Star className="h-5 w-5" />
                Skills Mastered
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-arteza-charcoal">{totalSkills.length}</div>
              <p className="text-sm text-muted-foreground">Across all art forms</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-arteza-clay/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-arteza-clay">
                <BookOpen className="h-5 w-5" />
                Overall Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-arteza-charcoal">{Math.round(averageProgress)}%</div>
              <Progress value={averageProgress} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Enrollments */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-arteza-terracotta" />
                Your Art Classes
              </CardTitle>
            </CardHeader>
            <CardContent>
              {enrollments.length === 0 ? (
                <div className="text-center py-8">
                  <Palette className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No enrollments yet</p>
                  <Button asChild>
                    <Link to="/art-classes">Explore Classes</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {enrollments.map((enrollment) => (
                    <div key={enrollment.id} className="border border-arteza-sage/20 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-arteza-charcoal">{enrollment.class_type}</h3>
                          <p className="text-sm text-muted-foreground">
                            Enrolled on {new Date(enrollment.enrollment_date).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={enrollment.completion_status === 'completed' ? 'default' : 'secondary'}>
                          {enrollment.completion_status}
                        </Badge>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{enrollment.progress_percentage}%</span>
                        </div>
                        <Progress value={enrollment.progress_percentage} />
                      </div>

                      {enrollment.skills_learned.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-2">Skills Learned:</p>
                          <div className="flex flex-wrap gap-1">
                            {enrollment.skills_learned.map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Classes */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-arteza-sage" />
                Upcoming Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {bookings.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No upcoming sessions</p>
                  <Button asChild>
                    <Link to="/class-scheduler">Book a Class</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="border border-arteza-terracotta/20 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-arteza-charcoal">
                          {booking.class_schedules.class_title}
                        </h3>
                        <Badge variant={booking.booking_status === 'confirmed' ? 'default' : 'secondary'}>
                          {booking.booking_status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(booking.class_schedules.scheduled_date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {booking.class_schedules.start_time} - {booking.class_schedules.end_time}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          {booking.class_schedules.age_group} group
                        </div>
                      </div>
                      <div className="mt-3">
                        <Badge variant="outline" className={`text-xs ${
                          booking.payment_status === 'paid' ? 'border-green-500 text-green-700' : 'border-orange-500 text-orange-700'
                        }`}>
                          Payment: {booking.payment_status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button asChild className="h-auto p-4 flex-col">
                <Link to="/class-scheduler">
                  <Calendar className="h-6 w-6 mb-2" />
                  <span>Book New Class</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex-col">
                <Link to="/student-gallery">
                  <Palette className="h-6 w-6 mb-2" />
                  <span>View Gallery</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex-col">
                <Link to="/shop">
                  <Award className="h-6 w-6 mb-2" />
                  <span>Shop Artworks</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
