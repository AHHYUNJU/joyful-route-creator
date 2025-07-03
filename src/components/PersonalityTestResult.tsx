
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Share2, Copy, MapPin, Heart, Camera, Mountain, Users, DollarSign } from "lucide-react";
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
        recommendations: [
          { 
            name: "제주도", 
            image: "🏝️", 
            description: "푸른 바다와 오름이 어우러진 자연의 섬"
          },
          { 
            name: "강릉", 
            image: "🌊", 
            description: "바다와 산이 만나는 힐링 도시"
          },
          { 
            name: "속초", 
            image: "⛰️", 
            description: "설악산의 웅장함과 바다의 평온함"
          },
          { 
            name: "경주", 
            image: "🏛️", 
            description: "천년 고도의 역사와 자연이 공존"
          }
        ],
        description: "🌿 당신은 자연의 평화로움을 사랑하는 힐링 여행자입니다. 조용한 산이나 바다에서 마음의 안정을 찾으세요.",
        interests: ["nature", "quiet"],
        percentage: 85,
        travelStyle: "자연 중심",
        companion: "혼자 또는 소수 인원",
        budget: "중간 예산"
      },
      "도시탐험파": {
        icon: <MapPin className="w-8 h-8 text-blue-500" />,
        color: "from-blue-400 to-purple-500",
        keywords: ["도시", "탐험", "문화", "활동", "모험"],
        recommendations: [
          { 
            name: "서울", 
            image: "🏙️", 
            description: "전통과 현대가 공존하는 역동적인 수도"
          },
          { 
            name: "부산", 
            image: "🌉", 
            description: "바다와 도시가 어우러진 항구 도시"
          },
          { 
            name: "대구", 
            image: "🏢", 
            description: "패션과 문화의 중심지"
          },
          { 
            name: "인천", 
            image: "✈️", 
            description: "국제적 감각과 근대 문화유산"
          }
        ],
        description: "🏙️ 당신은 도시의 역동적인 에너지를 즐기는 모험가입니다. 새로운 장소와 문화를 적극적으로 탐험하세요.",
        interests: ["culture", "activity", "shopping"],
        percentage: 78,
        travelStyle: "도심 중심",
        companion: "친구들과 함께",
        budget: "높은 예산"
      },
      "미식집착파": {
        icon: <Heart className="w-8 h-8 text-red-500" />,
        color: "from-red-400 to-pink-500",
        keywords: ["맛집", "미식", "현지음식", "요리", "체험"],
        recommendations: [
          { 
            name: "전주", 
            image: "🍜", 
            description: "한국 전통 음식의 성지, 비빔밥의 고향"
          },
          { 
            name: "부산", 
            image: "🦀", 
            description: "신선한 해산물과 독특한 음식 문화"
          },
          { 
            name: "제주도", 
            image: "🐷", 
            description: "흑돼지와 신선한 해산물의 천국"
          },
          { 
            name: "서울", 
            image: "🥘", 
            description: "전국 맛집이 모인 미식의 중심지"
          }
        ],
        description: "🍽️ 당신은 여행의 참된 즐거움을 음식에서 찾는 미식가입니다. 현지의 특별한 맛을 놓치지 마세요.",
        interests: ["food", "culture"],
        percentage: 92,
        travelStyle: "맛집 중심",
        companion: "가족 또는 친구",
        budget: "중상 예산"
      },
      "감성 스냅러": {
        icon: <Camera className="w-8 h-8 text-purple-500" />,
        color: "from-purple-400 to-pink-500",
        keywords: ["사진", "감성", "추억", "예술", "인생샷"],
        recommendations: [
          { 
            name: "제주도", 
            image: "🌺", 
            description: "카페거리와 벚꽃이 유명한 감성 도시"
          },
          { 
            name: "강릉", 
            image: "☕", 
            description: "바다 뷰 카페와 감성적인 골목길"
          },
          { 
            name: "여수", 
            image: "🌃", 
            description: "아름다운 야경과 낭만적인 바다"
          },
          { 
            name: "경주", 
            image: "🏮", 
            description: "한옥과 전통문화가 어우러진 포토존"
          }
        ],
        description: "📷 당신은 아름다운 순간을 포착하는 감성적인 여행자입니다. 특별한 장소에서 소중한 추억을 만드세요.",
        interests: ["photo", "cafe", "quiet"],
        percentage: 88,
        travelStyle: "감성 중심",
        companion: "연인 또는 혼자",
        budget: "중간 예산"
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
      recommendations: details?.recommendations?.map(r => r.name) || [],
      travelStyle: details?.travelStyle,
      companion: details?.companion,
      budget: details?.budget
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

          {/* Travel Profile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <MapPin className="w-4 h-4 text-blue-500" />
              <div>
                <div className="text-xs text-gray-500">여행 스타일</div>
                <div className="font-medium text-sm">{details.travelStyle}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Users className="w-4 h-4 text-green-500" />
              <div>
                <div className="text-xs text-gray-500">이상적 동반자</div>
                <div className="font-medium text-sm">{details.companion}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <DollarSign className="w-4 h-4 text-yellow-500" />
              <div>
                <div className="text-xs text-gray-500">예산 성향</div>
                <div className="font-medium text-sm">{details.budget}</div>
              </div>
            </div>
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

          {/* Recommended Destinations with Images */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-800">추천 여행지</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {details.recommendations.map((destination, index) => (
                <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{destination.image}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">{destination.name}</div>
                      <div className="text-sm text-gray-600 mt-1">{destination.description}</div>
                    </div>
                  </div>
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
