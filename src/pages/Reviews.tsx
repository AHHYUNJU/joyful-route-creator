
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageSquare, MapPin, Calendar } from "lucide-react";

const sampleReviews = [
  {
    id: 1,
    user: {
      name: "자연힐링러",
      avatar: "",
      type: "자연 힐링파"
    },
    location: "제주도",
    date: "2024년 6월",
    title: "한라산 백록담, 새벽 등반 후기",
    content: "새벽 4시에 시작해서 일출을 백록담에서 봤는데 정말 감동적이었어요! 6월이라 날씨도 좋고 야생화들이 예뻤습니다. 다만 새벽에는 정말 추우니 따뜻한 옷 꼭 챙기세요.",
    tags: ["등산", "일출", "자연"],
    likes: 24,
    helpful: 18,
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff"
  },
  {
    id: 2,
    user: {
      name: "미식탐험가",
      avatar: "",
      type: "미식집착파"
    },
    location: "부산",
    date: "2024년 5월",
    title: "해운대 맛집 투어 3박4일",
    content: "부산 3박4일 내내 먹기만 했네요 😅 특히 광안리 쭈꾸미와 해운대 할매복국이 최고였어요! 11시 오픈인데 10시 30분에 가서 줄 서는 걸 추천드려요.",
    tags: ["맛집", "해산물", "현지음식"],
    likes: 31,
    helpful: 27,
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be"
  },
  {
    id: 3,
    user: {
      name: "감성스냅러",
      avatar: "",
      type: "감성 스냅러"
    },
    location: "경주",
    date: "2024년 4월",
    title: "벚꽃시즌 경주 대릉원",
    content: "4월 첫째 주에 갔는데 벚꽃이 만개해서 정말 예뻤어요! 하지만 사람이 너무 많아서 인증샷 찍기가 힘들었네요. 평일 오전 일찍 가시는 걸 추천해요.",
    tags: ["벚꽃", "사진", "역사"],
    likes: 45,	
    helpful: 32,
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22"
  }
];

const Reviews = () => {
  const [filter, setFilter] = useState("all");

  const filteredReviews = filter === "all" 
    ? sampleReviews 
    : sampleReviews.filter(review => review.user.type.includes(filter));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            여행자 후기
          </h1>
          <p className="text-gray-600">실제 여행자들의 생생한 후기와 팁을 확인해보세요</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            전체
          </Button>
          <Button
            variant={filter === "자연" ? "default" : "outline"}
            onClick={() => setFilter("자연")}
          >
            🌲 자연 힐링
          </Button>
          <Button
            variant={filter === "도시" ? "default" : "outline"}
            onClick={() => setFilter("도시")}
          >
            🏙️ 도시 탐험
          </Button>
          <Button
            variant={filter === "미식" ? "default" : "outline"}
            onClick={() => setFilter("미식")}
          >
            🍜 미식 탐방
          </Button>
          <Button
            variant={filter === "감성" ? "default" : "outline"}
            onClick={() => setFilter("감성")}
          >
            📸 감성 스냅
          </Button>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6">
          {filteredReviews.map((review) => (
            <Card key={review.id} className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* Review Image */}
                <div className="lg:w-1/3">
                  <img 
                    src={review.image} 
                    alt={review.title}
                    className="w-full h-48 lg:h-full object-cover"
                  />
                </div>
                
                {/* Review Content */}
                <div className="lg:w-2/3 p-6">
                  <CardHeader className="p-0 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-400 text-white text-sm">
                            {review.user.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{review.user.name}</p>
                          <Badge variant="secondary" className="text-xs">
                            {review.user.type}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {review.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {review.date}
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{review.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="p-0 space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      {review.content}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {review.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex gap-4 text-sm text-gray-600">
                        <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                          <Heart className="w-4 h-4" />
                          {review.likes}
                        </button>
                        <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                          <MessageSquare className="w-4 h-4" />
                          도움됨 {review.helpful}
                        </button>
                      </div>
                      <Button size="sm" variant="outline">
                        상세보기
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            더 많은 후기 보기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
