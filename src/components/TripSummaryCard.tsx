
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Clock, Calendar, Star, Navigation } from "lucide-react";
import { TripPlan, TripDay } from "@/data/mockTripData";
import Map from "./Map";

interface TripSummaryCardProps {
  tripPlan: TripPlan;
}

const TripSummaryCard = ({ tripPlan }: TripSummaryCardProps) => {
  const [selectedDay, setSelectedDay] = useState<TripDay | null>(null);
  const [showMap, setShowMap] = useState(false);

  const totalDuration = tripPlan.days.reduce((acc, day) => acc + day.totalDuration, 0);
  const totalSpots = tripPlan.days.reduce((acc, day) => acc + day.spots.length, 0);
  const averageRating = tripPlan.days.reduce((acc, day) => {
    const dayAverage = day.spots.reduce((spotAcc, spot) => spotAcc + spot.rating, 0) / day.spots.length;
    return acc + dayAverage;
  }, 0) / tripPlan.days.length;

  const openDayModal = (day: TripDay) => {
    setSelectedDay(day);
  };

  return (
    <>
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center flex items-center gap-2 justify-center">
            <Calendar className="w-6 h-6 text-blue-600" />
            {tripPlan.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Trip Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/80 rounded-lg p-3">
              <div className="text-2xl font-bold text-blue-600">{tripPlan.days.length}</div>
              <div className="text-sm text-gray-600">일</div>
            </div>
            <div className="bg-white/80 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-600">{totalSpots}</div>
              <div className="text-sm text-gray-600">장소</div>
            </div>
            <div className="bg-white/80 rounded-lg p-3">
              <div className="text-2xl font-bold text-purple-600">{Math.floor(totalDuration / 60)}h</div>
              <div className="text-sm text-gray-600">총 시간</div>
            </div>
            <div className="bg-white/80 rounded-lg p-3">
              <div className="text-2xl font-bold text-yellow-600 flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-current" />
                {averageRating.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">평점</div>
            </div>
          </div>

          {/* Location & Duration */}
          <div className="flex items-center justify-between bg-white/60 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-500" />
              <span className="font-medium">{tripPlan.location}</span>
            </div>
            <Badge variant="secondary">{tripPlan.duration}</Badge>
          </div>

          {/* Daily Overview */}
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-800 mb-3">일정 요약</h4>
            <div className="grid gap-2">
              {tripPlan.days.map((day) => (
                <Button
                  key={day.day}
                  variant="outline"
                  className="h-auto p-3 justify-between hover:bg-blue-50"
                  onClick={() => openDayModal(day)}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      {day.day}
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Day {day.day}</div>
                      <div className="text-sm text-gray-600">
                        {day.spots.slice(0, 2).map(spot => spot.name).join(', ')}
                        {day.spots.length > 2 && ` 외 ${day.spots.length - 2}곳`}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    {Math.floor(day.totalDuration / 60)}h {day.totalDuration % 60}m
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Map Button */}
          <Button
            variant="outline"
            className="w-full flex items-center gap-2"
            onClick={() => setShowMap(true)}
          >
            <Navigation className="w-4 h-4" />
            지도에서 동선 확인하기
          </Button>
        </CardContent>
      </Card>

      {/* Day Detail Modal */}
      <Dialog open={!!selectedDay} onOpenChange={() => setSelectedDay(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Day {selectedDay?.day} 상세 일정
            </DialogTitle>
            <DialogDescription>
              총 {Math.floor((selectedDay?.totalDuration || 0) / 60)}시간 {(selectedDay?.totalDuration || 0) % 60}분 일정
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedDay?.spots.map((spot, index) => (
              <div key={spot.id} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-lg">{spot.name}</h4>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{spot.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">{spot.description}</p>
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
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Map Modal */}
      <Dialog open={showMap} onOpenChange={setShowMap}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>여행 동선 지도</DialogTitle>
            <DialogDescription>
              {tripPlan.location} 여행 코스의 전체 동선을 확인하세요
            </DialogDescription>
          </DialogHeader>
          <div className="h-96">
            <Map location={tripPlan.location} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TripSummaryCard;
