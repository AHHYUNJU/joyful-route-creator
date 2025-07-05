
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Plus, Trash2, ArrowLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";

interface CourseSpot {
  id: string;
  name: string;
  location: string;
  description: string;
  duration: number;
  photos: string[];
}

interface CourseDay {
  day: number;
  spots: CourseSpot[];
}

const CourseCreate = () => {
  const navigate = useNavigate();
  const [courseTitle, setCourseTitle] = useState("");
  const [courseLocation, setCourseLocation] = useState("");
  const [courseDuration, setCourseDuration] = useState("1박2일");
  const [days, setDays] = useState<CourseDay[]>([
    { day: 1, spots: [] }
  ]);

  const addDay = () => {
    setDays(prev => [...prev, { day: prev.length + 1, spots: [] }]);
  };

  const removeDay = (dayIndex: number) => {
    if (days.length > 1) {
      setDays(prev => prev.filter((_, index) => index !== dayIndex));
    }
  };

  const addSpot = (dayIndex: number) => {
    const newSpot: CourseSpot = {
      id: `spot-${Date.now()}`,
      name: "",
      location: "",
      description: "",
      duration: 60,
      photos: []
    };

    setDays(prev => prev.map((day, index) => 
      index === dayIndex 
        ? { ...day, spots: [...day.spots, newSpot] }
        : day
    ));
  };

  const removeSpot = (dayIndex: number, spotIndex: number) => {
    setDays(prev => prev.map((day, index) => 
      index === dayIndex 
        ? { ...day, spots: day.spots.filter((_, sIndex) => sIndex !== spotIndex) }
        : day
    ));
  };

  const updateSpot = (dayIndex: number, spotIndex: number, field: keyof CourseSpot, value: any) => {
    setDays(prev => prev.map((day, dIndex) => 
      dIndex === dayIndex 
        ? {
            ...day,
            spots: day.spots.map((spot, sIndex) => 
              sIndex === spotIndex 
                ? { ...spot, [field]: value }
                : spot
            )
          }
        : day
    ));
  };

  const handleSubmit = () => {
    if (!courseTitle.trim() || !courseLocation.trim()) {
      alert("코스 제목과 여행지를 입력해주세요.");
      return;
    }

    // 실제로는 서버에 저장
    console.log("코스 저장:", {
      title: courseTitle,
      location: courseLocation,
      duration: courseDuration,
      days
    });

    alert("코스가 등록되었습니다!");
    navigate("/courses");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/courses">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              목록으로
            </Button>
          </Link>
          <Button onClick={handleSubmit} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            코스 등록
          </Button>
        </div>

        <div className="space-y-6">
          {/* Course Basic Info */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-500" />
                기본 정보
              </CardTitle>
              <CardDescription>
                여행 코스의 기본 정보를 입력해주세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">코스 제목</Label>
                <Input
                  id="title"
                  placeholder="예: 제주도 힐링 여행 코스"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="location">여행지</Label>
                <Input
                  id="location"
                  placeholder="예: 제주도"
                  value={courseLocation}
                  onChange={(e) => setCourseLocation(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="duration">여행 기간</Label>
                <select
                  id="duration"
                  value={courseDuration}
                  onChange={(e) => setCourseDuration(e.target.value)}
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="당일">당일</option>
                  <option value="1박2일">1박2일</option>
                  <option value="2박3일">2박3일</option>
                  <option value="3박4일">3박4일</option>
                  <option value="4박5일">4박5일</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Daily Itinerary */}
          {days.map((day, dayIndex) => (
            <Card key={day.day} className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full">
                      Day {day.day}
                    </div>
                    <span className="text-sm text-gray-500">
                      {day.spots.length}개 장소
                    </span>
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addSpot(dayIndex)}
                      className="flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      장소 추가
                    </Button>
                    {days.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeDay(dayIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {day.spots.map((spot, spotIndex) => (
                  <div key={spot.id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                          {spotIndex + 1}
                        </div>
                        <span className="font-medium">장소 {spotIndex + 1}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSpot(dayIndex, spotIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>장소명</Label>
                        <Input
                          placeholder="예: 성산일출봉"
                          value={spot.name}
                          onChange={(e) => updateSpot(dayIndex, spotIndex, 'name', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>위치</Label>
                        <Input
                          placeholder="예: 제주도 서귀포시"
                          value={spot.location}
                          onChange={(e) => updateSpot(dayIndex, spotIndex, 'location', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <Label>설명 및 후기</Label>
                      <Textarea
                        placeholder="이 장소에 대한 설명이나 여행 후기를 작성해주세요"
                        value={spot.description}
                        onChange={(e) => updateSpot(dayIndex, spotIndex, 'description', e.target.value)}
                        className="mt-1"
                        rows={3}
                      />
                    </div>

                    <div className="mt-4">
                      <Label>머문 시간 (분)</Label>
                      <Input
                        type="number"
                        placeholder="60"
                        value={spot.duration}
                        onChange={(e) => updateSpot(dayIndex, spotIndex, 'duration', parseInt(e.target.value) || 0)}
                        className="mt-1 w-32"
                      />
                    </div>

                    {/* Photo Upload Placeholder */}
                    <div className="mt-4">
                      <Label>사진 업로드</Label>
                      <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <div className="text-gray-400 mb-2">📸</div>
                        <p className="text-sm text-gray-500">사진을 드래그하여 업로드하거나 클릭하여 선택하세요</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          사진 선택
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {day.spots.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>아직 추가된 장소가 없습니다</p>
                    <Button
                      variant="outline"
                      onClick={() => addSpot(dayIndex)}
                      className="mt-4"
                    >
                      첫 번째 장소 추가하기
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {/* Add Day Button */}
          <div className="text-center">
            <Button
              variant="outline"
              onClick={addDay}
              className="flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              하루 더 추가
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCreate;
