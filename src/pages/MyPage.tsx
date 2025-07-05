
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, Heart, Eye, Edit, Trash2, Plus } from "lucide-react";

// Mock data for user's courses
const myCourses = [
  {
    id: "my-1",
    title: "제주도 감성 카페 투어",
    location: "제주도",
    duration: "2박3일",
    createdAt: "2024-06-15",
    views: 89,
    likes: 12,
    status: "published"
  },
  {
    id: "my-2", 
    title: "부산 맛집 순례",
    location: "부산",
    duration: "1박2일",
    createdAt: "2024-05-22",
    views: 156,
    likes: 28,
    status: "published"
  }
];

const savedCourses = [
  {
    id: "saved-1",
    title: "경주 역사 문화 탐방",
    location: "경주",
    duration: "2박3일",
    author: "역사러버",
    likes: 45,
    savedAt: "2024-06-10"
  },
  {
    id: "saved-2",
    title: "강릉 바다 힐링 여행",
    location: "강릉", 
    duration: "1박2일",
    author: "바다조아",
    likes: 67,
    savedAt: "2024-06-08"
  }
];

const MyPage = () => {
  const [activeTab, setActiveTab] = useState("my-courses");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Profile Header */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-400 text-white text-2xl">
                  김
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">김여행</h1>
                <p className="text-gray-600 mb-4">감성 여행을 좋아하는 20대 직장인</p>
                <div className="flex gap-6 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-lg text-blue-600">{myCourses.length}</div>
                    <div className="text-gray-500">내 코스</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg text-purple-600">{savedCourses.length}</div>
                    <div className="text-gray-500">저장 코스</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg text-green-600">
                      {myCourses.reduce((acc, course) => acc + course.likes, 0)}
                    </div>
                    <div className="text-gray-500">받은 좋아요</div>
                  </div>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500">
                프로필 수정
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="my-courses">내 코스</TabsTrigger>
            <TabsTrigger value="saved-courses">저장한 코스</TabsTrigger>
          </TabsList>

          {/* My Courses Tab */}
          <TabsContent value="my-courses" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">내가 만든 코스</h2>
              <Link to="/course/create">
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  새 코스 만들기
                </Button>
              </Link>
            </div>

            {myCourses.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {myCourses.map((course) => (
                  <Card key={course.id} className="bg-white/80 backdrop-blur-sm shadow-lg">
                    <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-400 relative">
                      <div className="absolute top-4 right-4">
                        <Badge 
                          variant={course.status === 'published' ? 'default' : 'secondary'}
                          className="bg-white/20 text-white border-white/20"
                        >
                          {course.status === 'published' ? '공개' : '비공개'}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-bold text-lg mb-1">{course.title}</h3>
                        <div className="flex items-center gap-2 text-white/90 text-sm">
                          <MapPin className="w-4 h-4" />
                          <span>{course.location}</span>
                          <Badge variant="secondary" className="bg-white/20 text-white border-white/20">
                            {course.duration}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{course.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            <span>{course.likes}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{course.createdAt}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link to={`/course/${course.id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">
                            보기
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Edit className="w-4 h-4" />
                          수정
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <MapPin className="w-16 h-16 mx-auto mb-4" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">아직 만든 코스가 없습니다</h3>
                <p className="text-gray-500 mb-6">첫 번째 여행 코스를 만들어보세요!</p>
                <Link to="/course/create">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500">
                    코스 만들기
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>

          {/* Saved Courses Tab */}
          <TabsContent value="saved-courses" className="space-y-6">
            <h2 className="text-xl font-semibold">저장한 코스</h2>

            {savedCourses.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {savedCourses.map((course) => (
                  <Card key={course.id} className="bg-white/80 backdrop-blur-sm shadow-lg">
                    <div className="h-48 bg-gradient-to-r from-green-400 to-teal-400 relative">
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-bold text-lg mb-1">{course.title}</h3>
                        <div className="flex items-center gap-2 text-white/90 text-sm">
                          <MapPin className="w-4 h-4" />
                          <span>{course.location}</span>
                          <Badge variant="secondary" className="bg-white/20 text-white border-white/20">
                            {course.duration}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm text-gray-600">
                          by <span className="font-medium">{course.author}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            <span>{course.likes}</span>
                          </div>
                          <span>{course.savedAt}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link to={`/course/${course.id}`} className="flex-1">
                          <Button size="sm" className="w-full">
                            코스 보기
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Heart className="w-16 h-16 mx-auto mb-4" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">저장한 코스가 없습니다</h3>
                <p className="text-gray-500 mb-6">마음에 드는 코스를 저장해보세요!</p>
                <Link to="/courses">
                  <Button className="bg-gradient-to-r from-green-500 to-teal-500">
                    코스 둘러보기
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyPage;
