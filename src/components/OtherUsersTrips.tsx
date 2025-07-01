import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Star, ThumbsUp, Calendar, MapPin } from "lucide-react";
import { mockOtherUserTrips, OtherUserTrip } from "@/data/mockTripData";

const OtherUsersTrips = () => {
  const [likedTrips, setLikedTrips] = useState<Set<string>>(new Set());
  const [selectedTrip, setSelectedTrip] = useState<OtherUserTrip | null>(null);

  const toggleLike = (tripId: string) => {
    setLikedTrips(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tripId)) {
        newSet.delete(tripId);
      } else {
        newSet.add(tripId);
      }
      return newSet;
    });
  };

  const viewTripDetails = (trip: OtherUserTrip) => {
    setSelectedTrip(trip);
  };

  if (selectedTrip) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-500" />
              {selectedTrip.tripPlan.title}
            </CardTitle>
            <Button variant="outline" onClick={() => setSelectedTrip(null)}>
              목록으로 돌아가기
            </Button>
          </div>
          <CardDescription>
            {selectedTrip.userName}님의 {selectedTrip.tripPlan.location} 여행 코스
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{selectedTrip.tripPlan.location}</span>
            </div>
            <span>{selectedTrip.tripPlan.duration}</span>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-red-500" />
              <span>{selectedTrip.likes + (likedTrips.has(selectedTrip.id) ? 1 : 0)}</span>
            </div>
          </div>

          {selectedTrip.tripPlan.days.map((day) => (
            <div key={day.day} className="border rounded-lg p-4 bg-gray-50">
              <h4 className="font-semibold mb-3">Day {day.day}</h4>
              <div className="space-y-3">
                {day.spots.map((spot, index) => (
                  <div key={spot.id} className="flex items-start gap-3">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-medium">{spot.name}</h5>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-sm">{spot.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{spot.description}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{spot.location}</span>
                        <span>{Math.floor(spot.duration / 60)}시간 {spot.duration % 60}분</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {selectedTrip.reviews.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-semibold">여행 후기</h4>
              {selectedTrip.reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-lg p-4 border">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">{review.userName}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{review.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-600 mb-2">{review.comment}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{review.helpful}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

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
                <button
                  onClick={() => toggleLike(userTrip.id)}
                  className="flex items-center gap-1 hover:text-red-500 transition-colors"
                >
                  <Heart 
                    className={`w-4 h-4 ${
                      likedTrips.has(userTrip.id) 
                        ? 'text-red-500 fill-current' 
                        : 'text-red-500'
                    }`} 
                  />
                  <span>{userTrip.likes + (likedTrips.has(userTrip.id) ? 1 : 0)}</span>
                </button>
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
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => viewTripDetails(userTrip)}
            >
              이 코스 자세히 보기
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default OtherUsersTrips;
