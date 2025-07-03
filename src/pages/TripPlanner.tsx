
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MapPin, Sparkles } from "lucide-react";
import { generateTripPlan, TripPlan } from "@/data/mockTripData";
import TripPlanDisplay from "@/components/TripPlanDisplay";
import TripSummaryCard from "@/components/TripSummaryCard";
import TripDatePicker from "@/components/TripDatePicker";
import TripDetailsForm from "@/components/TripDetailsForm";
import OtherUsersTrips from "@/components/OtherUsersTrips";
import Map from "@/components/Map";

const TripPlanner = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [duration, setDuration] = useState("2박3일");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("medium");
  const [companion, setCompanion] = useState("couple");
  const [travelStyle, setTravelStyle] = useState("nature");
  const [generatedTrip, setGeneratedTrip] = useState<TripPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [personalityData, setPersonalityData] = useState<any>(null);

  // Load personality data on component mount
  useEffect(() => {
    const stored = localStorage.getItem('personalityResult');
    if (stored) {
      const data = JSON.parse(stored);
      setPersonalityData(data);
      
      // Auto-apply personality data
      if (data.interests) {
        setSelectedInterests(data.interests);
      }
      if (data.travelStyle) {
        setTravelStyle(data.travelStyle === "자연 중심" ? "nature" : 
                     data.travelStyle === "도심 중심" ? "urban" :
                     data.travelStyle === "맛집 중심" ? "food" : 
                     data.travelStyle === "감성 중심" ? "emotional" : "nature");
      }
      if (data.companion) {
        setCompanion(data.companion === "혼자 또는 소수 인원" ? "alone" :
                    data.companion === "친구들과 함께" ? "friends" :
                    data.companion === "가족 또는 친구" ? "family" :
                    data.companion === "연인 또는 혼자" ? "couple" : "couple");
      }
      if (data.budget) {
        setBudget(data.budget === "중간 예산" ? "medium" :
                 data.budget === "높은 예산" ? "high" :
                 data.budget === "중상 예산" ? "high" : "medium");
      }
    }
  }, []);

  const generateTrip = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    console.log("Generating trip with:", { 
      location, 
      duration, 
      selectedInterests, 
      budget, 
      companion, 
      travelStyle 
    });
    
    // Simulate loading time for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const tripPlan = generateTripPlan(location, duration, selectedInterests);
    setGeneratedTrip(tripPlan);
    setIsGenerating(false);
  };

  const restartPlanning = () => {
    setGeneratedTrip(null);
    setIsGenerating(false);
  };

  const handleNewPlan = () => {
    setGeneratedTrip(null);
    setLocation("");
    setSelectedInterests(personalityData?.interests || []);
    setDuration("2박3일");
    setBudget("medium");
    setCompanion("couple");
    setTravelStyle("nature");
    setIsGenerating(false);
  };

  const handleDateChange = (startDate: Date | undefined, endDate: Date | undefined, returnTime?: string) => {
    console.log("Date changed:", { startDate, endDate, returnTime });
  };

  const handleDurationChange = (newDuration: string) => {
    setDuration(newDuration);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            뚝딱뚝딱 나의 여행지
          </h1>
          <p className="text-gray-600">당신만의 완벽한 여행을 설계해보세요</p>
          
          {personalityData && (
            <div className="mt-4 p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
              <div className="flex items-center justify-center gap-2 text-purple-700">
                <Sparkles className="w-4 h-4" />
                <span className="font-medium">{personalityData.type}</span>
                <span className="text-sm">성향이 반영되었습니다</span>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* 여행지 선택 */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-500" />
                여행지 선택
              </CardTitle>
              {personalityData?.recommendations && (
                <CardDescription>
                  <strong>{personalityData.type}</strong>에게 추천: {personalityData.recommendations.join(', ')}
                </CardDescription>
              )}
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
                {personalityData?.recommendations && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {personalityData.recommendations.map((rec: string) => (
                      <Button
                        key={rec}
                        variant="outline"
                        size="sm"
                        onClick={() => setLocation(rec)}
                        className="text-xs"
                      >
                        {rec}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 여행 일정 선택 */}
          <TripDatePicker 
            onDateChange={handleDateChange}
            onDurationChange={handleDurationChange}
          />

          {/* 상세 여행 정보 입력 */}
          <TripDetailsForm
            selectedInterests={selectedInterests}
            onInterestsChange={setSelectedInterests}
            budget={budget}
            onBudgetChange={setBudget}
            companion={companion}
            onCompanionChange={setCompanion}
            travelStyle={travelStyle}
            onTravelStyleChange={setTravelStyle}
            personalityData={personalityData}
          />

          {/* 지도 미리보기 */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle>지도 미리보기</CardTitle>
              <CardDescription>
                여행지를 선택하면 지도에서 확인할 수 있습니다
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Map location={location} />
            </CardContent>
          </Card>

          {/* 여행 코스 생성 버튼 */}
          <div className="flex gap-3">
            <Button 
              size="lg" 
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              onClick={generateTrip}
              disabled={!location.trim() || isGenerating}
            >
              {isGenerating ? "여행 코스 생성 중..." : "맞춤 여행 코스 생성하기 ✨"}
            </Button>
            {generatedTrip && (
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleNewPlan}
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                새로 짜기
              </Button>
            )}
          </div>

          {/* 생성된 여행 코스 표시 */}
          {generatedTrip && (
            <div className="space-y-6">
              <TripSummaryCard tripPlan={generatedTrip} />
              <TripPlanDisplay tripPlan={generatedTrip} onRestart={restartPlanning} />
            </div>
          )}

          {/* 다른 사람들의 코스 */}
          <OtherUsersTrips 
            selectedLocation={location}
            selectedDuration={duration}
            selectedInterests={selectedInterests}
          />
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;
