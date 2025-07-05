
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Calendar, Heart, Star, Clock, ArrowLeft, Share2 } from "lucide-react";
import { mockOtherUserTrips, OtherUserTrip } from "@/data/mockTripData";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<OtherUserTrip | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const foundCourse = mockOtherUserTrips.find(trip => trip.id === id);
    setCourse(foundCourse || null);
  }, [id]);

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">코스를 찾을 수 없습니다</h2>
          <Link to="/courses">
            <Button>코스 목록으로 돌아가기</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/courses">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              목록으로
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              공유
            </Button>
            <Button 
              variant={isLiked ? "default" : "outline"}
              onClick={() => setIsLiked(!isLiked)}
              className="flex items-center gap-2"
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              {isLiked ? '저장됨' : '저장'}
            </Button>
          </div>
        </div>

        {/* Course Hero */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg mb-6">
          <div className="h-64 bg-gradient-to-r from-blue-400 to-purple-400 relative">
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h1 className="text-3xl font-bold mb-2">{course.tripPlan.title}</h1>
              <div className="flex items-center gap-4 text-white/90">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{course.tripPlan.location}</span>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/20">
                  {course.tripPlan.duration}
                </Badge>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{course.likes}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Author Info */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-400 text-white">
                  {course.userName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-semibold text-lg">{course.userName}</div>
                <Badge variant="outline" className="mt-1">
                  {course.userType}
                </Badge>
              </div>
              <div className="text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{course.createdAt}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Itinerary */}
        <div className="space-y-6">
          {course.tripPlan.days.map((day) => (
            <Card key={day.day} className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full">
                    Day {day.day}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    총 {Math.floor(day.totalDuration / 60)}시간 {day.totalDuration % 60}분
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {day.spots.map((spot, index) => (
                  <div key={spot.id} className="flex gap-4">
                    {/* Timeline */}
                    <div className="flex flex-col items-center">
                      <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      {index < day.spots.length - 1 && (
                        <div className="w-0.5 h-16 bg-blue-200 mt-2" />
                      )}
                    </div>

                    {/* Spot Details */}
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-lg">{spot.name}</h4>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{spot.rating}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{spot.description}</p>

                        {/* Spot Image Placeholder */}
                        <div className="h-48 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg mb-3 flex items-center justify-center">
                          <span className="text-gray-400">📸 여행 사진</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{spot.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{Math.floor(spot.duration / 60)}시간 {spot.duration % 60}분</span>
                          </div>
                          {spot.openTime && (
                            <Badge variant="outline" className="text-xs">
                              {spot.openTime} - {spot.closeTime}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reviews Section */}
        {course.reviews.length > 0 && (
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg mt-6">
            <CardHeader>
              <CardTitle>여행 후기</CardTitle>
              <CardDescription>이 코스를 참고한 분들의 후기</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {course.reviews.map((review) => (
                <div key={review.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">{review.userName}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{review.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Related Courses */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg mt-6">
          <CardHeader>
            <CardTitle>비슷한 코스</CardTitle>
            <CardDescription>{course.tripPlan.location} 지역의 다른 코스들</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {mockOtherUserTrips
                .filter(trip => trip.id !== course.id && trip.tripPlan.location === course.tripPlan.location)
                .slice(0, 2)
                .map((relatedCourse) => (
                  <Link key={relatedCourse.id} to={`/course/${relatedCourse.id}`}>
                    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <h4 className="font-semibold mb-1">{relatedCourse.tripPlan.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">by {relatedCourse.userName}</p>
                      <Badge variant="outline" className="text-xs">
                        {relatedCourse.tripPlan.duration}
                      </Badge>
                    </div>
                  </Link>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourseDetail;
