
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Star } from "lucide-react";
import { TripPlan } from "@/data/mockTripData";

interface TripPlanDisplayProps {
  tripPlan: TripPlan;
}

const TripPlanDisplay = ({ tripPlan }: TripPlanDisplayProps) => {
  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">
            {tripPlan.title} ✨
          </CardTitle>
          <CardDescription className="text-center">
            AI가 당신의 취향에 맞게 생성한 여행 코스입니다
          </CardDescription>
        </CardHeader>
      </Card>

      {tripPlan.days.map((day) => (
        <Card key={day.day} className="bg-white/80 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm">
                Day {day.day}
              </span>
              총 {Math.floor(day.totalDuration / 60)}시간 {day.totalDuration % 60}분
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {day.spots.map((spot, index) => (
              <div key={spot.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{spot.name}</h4>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm">{spot.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{spot.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{spot.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
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
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TripPlanDisplay;
