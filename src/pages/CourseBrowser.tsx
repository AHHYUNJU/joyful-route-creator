
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Calendar, Heart, Eye, Search, Filter } from "lucide-react";
import { mockOtherUserTrips } from "@/data/mockTripData";

const regions = ["전체", "서울", "부산", "제주도", "경주", "강릉", "여수", "전주"];

const CourseBrowser = () => {
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [likedCourses, setLikedCourses] = useState<Set<string>>(new Set());

  const toggleLike = (courseId: string) => {
    setLikedCourses(prev => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
      } else {
        newSet.add(courseId);
      }
      return newSet;
    });
  };

  const filteredCourses = mockOtherUserTrips.filter(course => {
    const matchesRegion = selectedRegion === "전체" || course.tripPlan.location.includes(selectedRegion);
    const matchesSearch = course.tripPlan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.tripPlan.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            코스로그
          </h1>
          <p className="text-gray-600">진짜 여행자들의 생생한 코스를 확인해보세요</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="코스 이름이나 지역을 검색하세요..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              필터
            </Button>
          </div>

          {/* Region Filter */}
          <div className="flex flex-wrap gap-2">
            {regions.map((region) => (
              <Button
                key={region}
                variant={selectedRegion === region ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRegion(region)}
              >
                {region}
              </Button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              {/* Course Image */}
              <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-400 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-4 right-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleLike(course.id)}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                  >
                    <Heart 
                      className={`w-4 h-4 ${
                        likedCourses.has(course.id) 
                          ? 'text-red-500 fill-current' 
                          : 'text-white'
                      }`} 
                    />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg mb-1">{course.tripPlan.title}</h3>
                  <div className="flex items-center gap-2 text-white/90 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{course.tripPlan.location}</span>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/20">
                      {course.tripPlan.duration}
                    </Badge>
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                {/* Author Info */}
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-400 text-white text-sm">
                      {course.userName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">{course.userName}</div>
                    <Badge variant="outline" className="text-xs">
                      {course.userType}
                    </Badge>
                  </div>
                </div>

                {/* Course Preview */}
                <div className="mb-4">
                  <div className="text-sm font-medium mb-2">Day 1 일정</div>
                  <div className="text-sm text-gray-600">
                    {course.tripPlan.days[0]?.spots.slice(0, 3).map((spot, index) => (
                      <span key={spot.id}>
                        {spot.name}
                        {index < Math.min(course.tripPlan.days[0].spots.length, 3) - 1 && " → "}
                      </span>
                    ))}
                    {course.tripPlan.days[0]?.spots.length > 3 && " ..."}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{course.likes + (likedCourses.has(course.id) ? 1 : 0)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>124</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{course.createdAt}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link to={`/course/${course.id}`} className="flex-1">
                    <Button className="w-full" size="sm">
                      자세히 보기
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm">
                    저장
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MapPin className="w-16 h-16 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">검색 결과가 없습니다</h3>
            <p className="text-gray-500 mb-6">다른 지역이나 키워드로 검색해보세요</p>
            <Link to="/course/create">
              <Button>
                첫 번째 코스 등록하기
              </Button>
            </Link>
          </div>
        )}

        {/* Floating Action Button */}
        <div className="fixed bottom-6 right-6">
          <Link to="/course/create">
            <Button size="lg" className="rounded-full w-14 h-14 shadow-lg bg-gradient-to-r from-blue-500 to-purple-500">
              <span className="text-xl">+</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseBrowser;
