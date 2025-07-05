
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Heart, Users, Star, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            코스로그
          </h1>
          <p className="text-2xl text-gray-700 mb-2">나의 여행 코스를 기록하고, 다른 사람들의 여행을 엿보는 공간</p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            진짜 여행자들의 생생한 코스를 확인하고, 나만의 여행 코스를 공유해보세요
          </p>
        </div>

        {/* Main CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link to="/courses">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
              <Search className="w-5 h-5" />
              코스 둘러보기
            </Button>
          </Link>
          <Link to="/course/create">
            <Button size="lg" variant="outline" className="border-2 border-blue-300 hover:border-blue-400 px-8 py-3 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              코스 등록하기
            </Button>
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center mx-auto mb-2">
                <Search className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">코스 탐색</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                지역별로 다른 여행자들이 만든 코스를 확인해보세요
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-2">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">상세 일정</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                날짜별 장소, 사진, 후기까지 모든 정보를 확인하세요
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-2">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">코스 등록</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                나만의 여행 코스를 등록하고 다른 사람들과 공유해보세요
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-2">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">코스 저장</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                마음에 드는 코스를 저장하고 나중에 참고하세요
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Navigation */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/personality-test">
            <Button variant="outline" size="lg" className="bg-white/50 hover:bg-white/80 border-2 border-blue-200 hover:border-blue-300 transition-all duration-300">
              성향 테스트 하기
            </Button>
          </Link>
          <Link to="/trip-planner">
            <Button variant="outline" size="lg" className="bg-white/50 hover:bg-white/80 border-2 border-green-200 hover:border-green-300 transition-all duration-300">
              AI 여행 플래너
            </Button>
          </Link>
          <Link to="/reviews">
            <Button variant="outline" size="lg" className="bg-white/50 hover:bg-white/80 border-2 border-purple-200 hover:border-purple-300 transition-all duration-300">
              여행자 후기 보기
            </Button>
          </Link>
          <Link to="/my-page">
            <Button variant="outline" size="lg" className="bg-white/50 hover:bg-white/80 border-2 border-pink-200 hover:border-pink-300 transition-all duration-300">
              마이페이지
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
