
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Share2, Copy, MapPin, Heart, Camera, Mountain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface PersonalityTestResultProps {
  result: string;
  answers: Record<number, string>;
  onRestart: () => void;
}

const PersonalityTestResult = ({ result, answers, onRestart }: PersonalityTestResultProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSharing, setIsSharing] = useState(false);

  const getTypeDetails = (type: string) => {
    const typeDetails = {
      "자연 힐링파": {
        icon: <Mountain className="w-8 h-8 text-green-500" />,
        color: "from-green-400 to-emerald-500",
        keywords: ["자연", "힐링", "평화", "휴식", "산책"],
        recommendations: ["제주도", "강릉", "속초", "경주"],
        description: "🌿 당신은 자연의 평화로움을 사랑하는 힐링 여행자입니다. 조용한 산이나 바다에서 마음의 안정을 찾으세요.",
        interests: ["nature", "quiet"],
        percentage: 85
      },
      "도시탐험파": {
        icon: <MapPin className="w-8 h-8 text-blue-500" />,
        color: "from-blue-400 to-purple-500",
        keywords: ["도시", "탐험", "문화", "활동", "모험"],
        recommendations: ["서울", "부산", "대구", "인천"],
        description: "🏙️ 당신은 도시의 역동적인 에너지를 즐기는 모험가입니다. 새로운 장소와 문화를 적극적으로 탐험하세요.",
        interests: ["culture", "activity", "shopping"],
        percentage: 78
      },
      "미식집착파": {
        icon: <Heart className="w-8 h-8 text-red-500" />,
        color: "from-red-400 to-pink-500",
        keywords: ["맛집", "미식", "현지음식", "요리", "체험"],
        recommendations: ["전주", "부산", "제주도", "서울"],
        description: "🍽️ 당신은 여행의 참된 즐거움을 음식에서 찾는 미식가입니다. 현지의 특별한 맛을 놓치지 마세요.",
        interests: ["food", "culture"],
        percentage: 92
      },
      "감성 스냅러": {
        icon: <Camera className="w-8 h-8 text-purple-500" />,
        color: "from-purple-400 to-pink-500",
        keywords: ["사진", "감성", "추억", "예술", "인생샷"],
        recommendations: ["제주도", "강릉", "여수", "경주"],
        description: "📷 당신은 아름다운 순간을 포착하는 감성적인 여행자입니다. 특별한 장소에서 소중한 추억을 만드세요.",
        interests: ["photo", "cafe", "quiet"],
        percentage: 88
      }
    };
    return typeDetails[type as keyof typeof typeDetails];
  };

  const details = getTypeDetails(result);

  const handleShare = async () => {
    setIsSharing(true);
    const shareText = `나의 여행 성향은 "${result}"! 뚝딱뚝딱 나의 여행지에서 테스트해보세요!`;
    const shareUrl = window.location.origin + '/personality-test';

    if (navigator.share) {
      try {
        await navigator.share({
          title: '나의 여행 성향 테스트 결과',
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        console.log('Sharing cancelled');
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      toast({
        title: "링크가 복사되었습니다!",
        description: "친구들과 공유해보세요.",
      });
    }
    setIsSharing(false);
  };

  const handlePlanTrip = () => {
    // Store personality data for trip planning
    localStorage.setItem('personalityResult', JSON.stringify({
      type: result,
      interests: details?.interests || [],
      recommendations: details?.recommendations || []
    }));
    navigate('/trip-planner');
  };

  if (!details) return null;

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <Card className="bg-white/90 backdrop-blur-sm shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            {details.icon}
          </div>
          <CardTitle className={`text-3xl bg-gradient-to-r ${details.color} bg-clip-text text-transparent`}>
            {result}
          </CardTitle>
          <CardDescription className="text-lg mt-4 text-gray-700 leading-relaxed">
            {details.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Personality Percentage */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>성향 일치도</span>
              <span className="font-semibold">{details.percentage}%</span>
            </div>
            <Progress value={details.percentage} className="h-3" />
          </div>

          {/* Keywords */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-800">나의 여행 키워드</h4>
            <div className="flex flex-wrap gap-2">
              {details.keywords.map((keyword, index) => (
                <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                  #{keyword}
                </Badge>
              ))}
            </div>
          </div>

          {/* Recommended Destinations */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-800">추천 여행지</h4>
            <div className="grid grid-cols-2 gap-2">
              {details.recommendations.map((destination, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
                  <MapPin className="w-4 h-4 mx-auto mb-1 text-gray-600" />
                  <span className="text-sm font-medium">{destination}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              size="lg" 
              className={`flex-1 bg-gradient-to-r ${details.color} hover:opacity-90`}
              onClick={handlePlanTrip}
            >
              성향 맞춤 여행 코스 만들기
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleShare}
              disabled={isSharing}
              className="flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              결과 공유하기
            </Button>
          </div>

          <Button 
            variant="ghost" 
            size="lg"
            onClick={onRestart}
            className="w-full"
          >
            다시 테스트하기
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalityTestResult;
