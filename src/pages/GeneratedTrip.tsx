
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users } from "lucide-react";
import { TripPlan } from "@/data/mockTripData";
import TripPlanDisplay from "@/components/TripPlanDisplay";
import TripSummaryCard from "@/components/TripSummaryCard";
import OtherUsersTrips from "@/components/OtherUsersTrips";

const GeneratedTrip = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showOtherTrips, setShowOtherTrips] = useState(false);
  
  const tripData = location.state?.tripData;
  const formData = location.state?.formData;

  useEffect(() => {
    if (!tripData || !formData) {
      navigate('/trip-planner');
    }
  }, [tripData, formData, navigate]);

  if (!tripData || !formData) {
    return null;
  }

  const handleBackToPlanner = () => {
    navigate('/trip-planner');
  };

  const handleRestartPlanning = () => {
    navigate('/trip-planner', { 
      state: { 
        resetForm: true 
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              onClick={handleBackToPlanner}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              다시 코스 생성하기
            </Button>
            <Button
              variant="outline"
              onClick={handleRestartPlanning}
              className="flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              새로 짜기
            </Button>
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            당신만의 여행 코스
          </h1>
          <p className="text-gray-600">AI가 생성한 맞춤형 여행 계획입니다</p>
        </div>

        <div className="space-y-6">
          <TripSummaryCard tripPlan={tripData} />
          <TripPlanDisplay tripPlan={tripData} onRestart={handleRestartPlanning} />
          
          {/* 다른 사람들의 코스 보기 버튼 */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="pt-6">
              <Button
                variant="outline"
                size="lg"
                className="w-full flex items-center gap-2"
                onClick={() => setShowOtherTrips(!showOtherTrips)}
              >
                <Users className="w-5 h-5" />
                {showOtherTrips ? '다른 사람들의 코스 숨기기' : '다른 사람들의 코스 보기'}
              </Button>
            </CardContent>
          </Card>

          {/* 다른 사람들의 코스 (토글 방식) */}
          {showOtherTrips && (
            <OtherUsersTrips 
              selectedLocation={formData.location}
              selectedDuration={formData.duration}
              selectedInterests={formData.selectedInterests}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneratedTrip;
