import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Star, Edit, Plus, Trash2, RotateCcw } from "lucide-react";
import { TripPlan, TripSpot } from "@/data/mockTripData";

interface TripPlanDisplayProps {
  tripPlan: TripPlan;
  onRestart?: () => void;
}

const TripPlanDisplay = ({ tripPlan, onRestart }: TripPlanDisplayProps) => {
  const [editingTripPlan, setEditingTripPlan] = useState<TripPlan>(tripPlan);

  const removeSpot = (dayIndex: number, spotIndex: number) => {
    const updatedTripPlan = { ...editingTripPlan };
    const removedSpot = updatedTripPlan.days[dayIndex].spots[spotIndex];
    updatedTripPlan.days[dayIndex].spots.splice(spotIndex, 1);
    updatedTripPlan.days[dayIndex].totalDuration -= removedSpot.duration;
    setEditingTripPlan(updatedTripPlan);
  };

  const addSpot = (dayIndex: number) => {
    // Simple mock spot for demonstration
    const newSpot: TripSpot = {
      id: `new-${Date.now()}`,
      name: "새로운 장소",
      category: "etc",
      description: "새로 추가된 장소입니다",
      location: "위치 미정",
      duration: 60,
      rating: 4.0
    };
    
    const updatedTripPlan = { ...editingTripPlan };
    updatedTripPlan.days[dayIndex].spots.push(newSpot);
    updatedTripPlan.days[dayIndex].totalDuration += newSpot.duration;
    setEditingTripPlan(updatedTripPlan);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">
            {editingTripPlan.title} ✨
          </CardTitle>
          <CardDescription className="text-center">
            AI가 당신의 취향에 맞게 생성한 여행 코스입니다
          </CardDescription>
          <div className="flex justify-center mt-4">
            <Button
              variant="outline"
              onClick={onRestart}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              다시 코스 짜기
            </Button>
          </div>
        </CardHeader>
      </Card>

      {editingTripPlan.days.map((day, dayIndex) => (
        <Card key={day.day} className="bg-white/80 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center gap-2">
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm">
                  Day {day.day}
                </span>
                총 {Math.floor(day.totalDuration / 60)}시간 {day.totalDuration % 60}분
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addSpot(dayIndex)}
                className="flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                장소 추가
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {day.spots.map((spot, spotIndex) => (
              <div key={spot.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg group">
                <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  {spotIndex + 1}
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
                <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                    onClick={() => removeSpot(dayIndex, spotIndex)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
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
