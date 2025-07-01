
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Clock, Heart } from "lucide-react";

const TripPlanner = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [duration, setDuration] = useState("2박3일");
  const [location, setLocation] = useState("");

  const interests = [
    { id: "nature", label: "자연/산책", emoji: "🌲" },
    { id: "culture", label: "문화유산", emoji: "🏛️" },
    { id: "food", label: "맛집탐방", emoji: "🍜" },
    { id: "cafe", label: "트렌디카페", emoji: "☕" },
    { id: "shopping", label: "쇼핑", emoji: "🛍️" },
    { id: "nightlife", label: "야경/야시장", emoji: "🌃" },
    { id: "activity", label: "액티비티", emoji: "🎯" },
    { id: "quiet", label: "조용한 힐링", emoji: "🧘" }
  ];

  const toggleInterest = (interestId: string) => {
    setSelectedInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const generateTrip = () => {
    // TODO: Implement trip generation logic
    console.log("Generating trip with:", { location, duration, selectedInterests });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            여행 계획 만들기
          </h1>
          <p className="text-gray-600">당신만의 완벽한 여행을 설계해보세요</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Trip Configuration */}
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  여행지 선택
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="location">어디로 떠나고 싶으신가요?</Label>
                  <Input 
                    id="location"
                    placeholder="예: 제주도, 부산, 서울 등"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>여행 기간</Label>
                  <div className="flex gap-2 mt-2">
                    {["당일치기", "1박2일", "2박3일", "3박4일"].map((period) => (
                      <Button
                        key={period}
                        variant={duration === period ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDuration(period)}
                      >
                        {period}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-500" />
                  관심사 선택
                </CardTitle>
                <CardDescription>
                  관심 있는 여행 테마를 선택해주세요 (복수 선택 가능)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {interests.map((interest) => (
                    <Button
                      key={interest.id}
                      variant={selectedInterests.includes(interest.id) ? "default" : "outline"}
                      className="h-auto p-3 flex flex-col items-center gap-1"
                      onClick={() => toggleInterest(interest.id)}
                    >
                      <span className="text-xl">{interest.emoji}</span>
                      <span className="text-sm">{interest.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button 
              size="lg" 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              onClick={generateTrip}
              disabled={!location || selectedInterests.length === 0}
            >
              맞춤 여행 코스 생성하기 ✨
            </Button>
          </div>

          {/* Right Panel - Preview/Map */}
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-500" />
                  선택된 여행 정보
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">목적지:</span>
                  <span>{location || "미선택"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">기간:</span>
                  <span>{duration}</span>
                </div>
                <div>
                  <span className="font-medium">관심사:</span>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedInterests.map((interestId) => {
                      const interest = interests.find(i => i.id === interestId);
                      return (
                        <Badge key={interestId} variant="secondary" className="text-xs">
                          {interest?.emoji} {interest?.label}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>지도 미리보기</CardTitle>
                <CardDescription>
                  여행지를 선택하면 지도에서 확인할 수 있습니다
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>지도가 여기에 표시됩니다</p>
                    <p className="text-sm">여행지를 선택해주세요</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;
