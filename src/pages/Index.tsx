
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Heart, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Lovable
          </h1>
          <p className="text-2xl text-gray-700 mb-2">나에게 딱 맞는 여행</p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            당신의 성향과 취향을 분석하여 완벽한 맞춤형 여행 코스를 추천해드립니다
          </p>
        </div>

        {/* Main CTA */}
        <div className="text-center mb-16">
          <Link to="/personality-test">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
              여행 성향 테스트 시작하기 ✨
            </Button>
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center mx-auto mb-2">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">성향 분석</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                간단한 질문으로 당신만의 여행 성향을 찾아드려요
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-2">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">맞춤 코스</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                AI가 당신의 취향에 맞는 완벽한 여행 경로를 설계해요
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">여행자 후기</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                실제 여행자들의 생생한 후기와 팁을 확인하세요
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">실시간 피드백</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                다른 여행자들과 경험을 공유하고 도움을 받아요
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Navigation */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/trip-planner">
            <Button variant="outline" size="lg" className="bg-white/50 hover:bg-white/80 border-2 border-blue-200 hover:border-blue-300 transition-all duration-300">
              바로 여행 계획하기
            </Button>
          </Link>
          <Link to="/reviews">
            <Button variant="outline" size="lg" className="bg-white/50 hover:bg-white/80 border-2 border-purple-200 hover:border-purple-300 transition-all duration-300">
              다른 여행자 후기 보기
            </Button>
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-pink-300 to-rose-300 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-r from-green-300 to-emerald-300 rounded-full opacity-20 animate-pulse delay-2000"></div>
    </div>
  );
};

export default Index;
