
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    id: 1,
    question: "이상적인 휴가 스타일은?",
    options: [
      { value: "nature", label: "🌲 자연 속에서 힐링하기", type: "자연 힐링파" },
      { value: "city", label: "🏙️ 도시의 활기를 만끽하기", type: "도시탐험파" },
      { value: "food", label: "🍜 맛집 탐방하기", type: "미식집착파" },
      { value: "photo", label: "📸 감성적인 사진 찍기", type: "감성 스냅러" }
    ]
  },
  {
    id: 2,
    question: "여행 중 가장 중요한 것은?",
    options: [
      { value: "rest", label: "🛌 충분한 휴식과 여유", type: "자연 힐링파" },
      { value: "activity", label: "🎯 다양한 액티비티 체험", type: "도시탐험파" },
      { value: "taste", label: "😋 현지 음식 맛보기", type: "미식집착파" },
      { value: "memory", label: "💝 특별한 추억 만들기", type: "감성 스냅러" }
    ]
  },
  {
    id: 3,
    question: "여행 숙소를 선택할 때 가장 중요한 건?",
    options: [
      { value: "quiet", label: "🤫 조용하고 평화로운 분위기", type: "자연 힐링파" },
      { value: "location", label: "📍 접근성이 좋은 위치", type: "도시탐험파" },
      { value: "restaurant", label: "🍽️ 주변 맛집이 많은 곳", type: "미식집착파" },
      { value: "unique", label: "✨ 독특하고 감성적인 공간", type: "감성 스냅러" }
    ]
  }
];

const PersonalityTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    const typeCount: Record<string, number> = {};
    
    Object.values(answers).forEach(answer => {
      const question = questions.find(q => q.options.some(opt => opt.value === answer));
      const option = question?.options.find(opt => opt.value === answer);
      if (option) {
        typeCount[option.type] = (typeCount[option.type] || 0) + 1;
      }
    });

    const dominantType = Object.entries(typeCount).reduce((a, b) => 
      typeCount[a[0]] > typeCount[b[0]] ? a : b
    )[0];

    setResult(dominantType);
  };

  const getTypeDescription = (type: string) => {
    const descriptions: Record<string, string> = {
      "자연 힐링파": "🌿 당신은 자연의 평화로움을 사랑하는 힐링 여행자입니다. 조용한 산이나 바다에서 마음의 안정을 찾으세요.",
      "도시탐험파": "🏙️ 당신은 도시의 역동적인 에너지를 즐기는 모험가입니다. 새로운 장소와 문화를 적극적으로 탐험하세요.",
      "미식집착파": "🍽️ 당신은 여행의 참된 즐거움을 음식에서 찾는 미식가입니다. 현지의 특별한 맛을 놓치지 마세요.",
      "감성 스냅러": "📷 당신은 아름다운 순간을 포착하는 감성적인 여행자입니다. 특별한 장소에서 소중한 추억을 만드세요."
    };
    return descriptions[type] || "";
  };

  if (result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-white/90 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              당신의 여행 성향
            </CardTitle>
            <CardDescription className="text-lg mt-4">
              <span className="text-2xl font-bold text-gray-800">{result}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              {getTypeDescription(result)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                onClick={() => navigate('/trip-planner')}
              >
                맞춤 여행 코스 만들기
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => {
                  setCurrentQuestion(0);
                  setAnswers({});
                  setResult(null);
                }}
              >
                다시 테스트하기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white/90 backdrop-blur-sm shadow-2xl">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <CardTitle className="text-2xl">여행 성향 테스트</CardTitle>
            <span className="text-sm text-gray-500">
              {currentQuestion + 1} / {questions.length}
            </span>
          </div>
          <Progress value={progress} className="w-full h-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <CardDescription className="text-xl font-medium text-gray-800">
            {questions[currentQuestion].question}
          </CardDescription>
          
          <RadioGroup 
            value={answers[questions[currentQuestion].id] || ""} 
            onValueChange={(value) => handleAnswer(questions[currentQuestion].id, value)}
          >
            {questions[currentQuestion].options.map((option) => (
              <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="text-lg cursor-pointer flex-1">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-between pt-4">
            <Button 
              variant="outline" 
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
            >
              이전
            </Button>
            <Button 
              onClick={nextQuestion}
              disabled={!answers[questions[currentQuestion].id]}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              {currentQuestion === questions.length - 1 ? '결과 보기' : '다음'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalityTest;
