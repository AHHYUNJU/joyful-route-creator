
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import PersonalityTestResult from "@/components/PersonalityTestResult";

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

  const restartTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
  };

  if (result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <PersonalityTestResult 
            result={result} 
            answers={answers}
            onRestart={restartTest}
          />
        </div>
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
