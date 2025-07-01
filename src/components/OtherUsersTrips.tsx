
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Star, ThumbsUp, Calendar, MapPin } from "lucide-react";
import { mockOtherUserTrips, OtherUserTrip } from "@/data/mockTripData";

const OtherUsersTrips = () => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-pink-500" />
          다른 사람들 코스 둘러보기
        </CardTitle>
        <CardDescription>
          비슷한 취향의 여행자들이 만든 코스를 참고해보세요
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {mockOtherUserTrips.map((userTrip) => (
          <div key={userTrip.id} className="border rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {userTrip.userName.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-sm">{userTrip.userName}</div>
                  <Badge variant="outline" className="text-xs">
                    {userTrip.userType}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>{userTrip.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{userTrip.createdAt}</span>
                </div>
              </div>
            </div>
            
            <h4 className="font-semibold mb-2">{userTrip.tripPlan.title}</h4>
            <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{userTrip.tripPlan.location}</span>
              </div>
              <span>{userTrip.tripPlan.duration}</span>
            </div>
            
            <div className="space-y-2 mb-4">
              {userTrip.tripPlan.days.slice(0, 1).map((day) => (
                <div key={day.day} className="text-sm">
                  <div className="font-medium mb-1">Day {day.day}</div>
                  <div className="text-gray-600">
                    {day.spots.map((spot, index) => (
                      <span key={spot.id}>
                        {spot.name}
                        {index < day.spots.length - 1 && " → "}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              {userTrip.tripPlan.days.length > 1 && (
                <div className="text-xs text-gray-500">
                  외 {userTrip.tripPlan.days.length - 1}일 더...
                </div>
              )}
            </div>
            
            {userTrip.reviews.length > 0 && (
              <div className="bg-white rounded p-3 mb-3">
                <div className="text-xs font-medium text-gray-700 mb-2">최근 후기</div>
                <div className="space-y-2">
                  {userTrip.reviews.slice(0, 1).map((review) => (
                    <div key={review.id} className="text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{review.userName}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span>{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-xs mb-1">{review.comment}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{review.date}</span>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" />
                          <span>{review.helpful}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <Button variant="outline" size="sm" className="w-full">
              이 코스 자세히 보기
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default OtherUsersTrips;
