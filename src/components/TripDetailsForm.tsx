
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Users, DollarSign, MapPin, Heart } from "lucide-react";

interface TripDetailsFormProps {
  selectedInterests: string[];
  onInterestsChange: (interests: string[]) => void;
  budget: string;
  onBudgetChange: (budget: string) => void;
  companion: string;
  onCompanionChange: (companion: string) => void;
  travelStyle: string;
  onTravelStyleChange: (style: string) => void;
  personalityData?: any;
}

const TripDetailsForm = ({
  selectedInterests,
  onInterestsChange,
  budget,
  onBudgetChange,
  companion,
  onCompanionChange,
  travelStyle,
  onTravelStyleChange,
  personalityData
}: TripDetailsFormProps) => {
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

  const budgetOptions = [
    { value: "low", label: "5만원 미만", desc: "저예산 여행" },
    { value: "medium", label: "5-15만원", desc: "적당한 예산" },
    { value: "high", label: "15-30만원", desc: "여유로운 예산" },
    { value: "luxury", label: "30만원 이상", desc: "프리미엄 여행" }
  ];

  const companionOptions = [
    { value: "alone", label: "혼자", emoji: "👤" },
    { value: "couple", label: "연인", emoji: "💑" },
    { value: "family", label: "가족", emoji: "👨‍👩‍👧‍👦" },
    { value: "friends", label: "친구들", emoji: "👥" }
  ];

  const styleOptions = [
    { value: "nature", label: "자연 중심", emoji: "🌲" },
    { value: "urban", label: "도심 중심", emoji: "🏙️" },
    { value: "activity", label: "액티비티 중심", emoji: "🎯" },
    { value: "food", label: "맛집 중심", emoji: "🍜" },
    { value: "emotional", label: "감성 중심", emoji: "📷" }
  ];

  const toggleInterest = (interestId: string) => {
    const newInterests = selectedInterests.includes(interestId)
      ? selectedInterests.filter(id => id !== interestId)
      : [...selectedInterests, interestId];
    onInterestsChange(newInterests);
  };

  return (
    <div className="space-y-6">
      {/* 관심사 선택 */}
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-500" />
            관심사 선택
            {personalityData && (
              <Badge variant="secondary" className="text-xs">
                성향 기반 자동 선택됨
              </Badge>
            )}
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

      {/* 예상 예산 */}
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-500" />
            예상 예산 (1인 기준)
          </CardTitle>
          <CardDescription>여행 전체 기간 동안의 예상 예산을 선택해주세요</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={budget} onValueChange={onBudgetChange}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {budgetOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="cursor-pointer flex-1">
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-gray-500">{option.desc}</div>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* 동행 인원 */}
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-500" />
            동행 인원
          </CardTitle>
          <CardDescription>누구와 함께 여행하시나요?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {companionOptions.map((option) => (
              <Button
                key={option.value}
                variant={companion === option.value ? "default" : "outline"}
                className="h-auto p-3 flex flex-col items-center gap-1"
                onClick={() => onCompanionChange(option.value)}
              >
                <span className="text-xl">{option.emoji}</span>
                <span className="text-sm">{option.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 여행 스타일 */}
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-purple-500" />
            여행 스타일
          </CardTitle>
          <CardDescription>어떤 스타일의 여행을 선호하시나요?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {styleOptions.map((option) => (
              <Button
                key={option.value}
                variant={travelStyle === option.value ? "default" : "outline"}
                className="h-auto p-3 flex flex-col items-center gap-1"
                onClick={() => onTravelStyleChange(option.value)}
              >
                <span className="text-xl">{option.emoji}</span>
                <span className="text-sm">{option.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TripDetailsForm;
