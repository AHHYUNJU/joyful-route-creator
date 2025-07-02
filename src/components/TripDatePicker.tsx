
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { ko } from "date-fns/locale";

interface TripDatePickerProps {
  onDateChange: (startDate: Date | undefined, endDate: Date | undefined, returnTime?: string) => void;
  onDurationChange: (duration: string) => void;
}

const TripDatePicker = ({ onDateChange, onDurationChange }: TripDatePickerProps) => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [returnTime, setReturnTime] = useState("18:00");
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);

  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date);
    if (date && endDate && date > endDate) {
      setEndDate(undefined);
    }
    updateDuration(date, endDate);
    onDateChange(date, endDate, returnTime);
    setIsStartOpen(false);
  };

  const handleEndDateChange = (date: Date | undefined) => {
    setEndDate(date);
    updateDuration(startDate, date);
    onDateChange(startDate, date, returnTime);
    setIsEndOpen(false);
  };

  const handleReturnTimeChange = (time: string) => {
    setReturnTime(time);
    onDateChange(startDate, endDate, time);
  };

  const updateDuration = (start: Date | undefined, end: Date | undefined) => {
    if (start && end) {
      const days = differenceInDays(end, start);
      if (days === 0) {
        onDurationChange("당일치기");
      } else {
        onDurationChange(`${days}박${days + 1}일`);
      }
    }
  };

  const quickSelectDuration = (duration: string) => {
    const today = new Date();
    let endDate: Date;
    
    switch (duration) {
      case "당일치기":
        setStartDate(today);
        setEndDate(today);
        onDateChange(today, today, returnTime);
        break;
      case "1박2일":
        endDate = new Date(today);
        endDate.setDate(today.getDate() + 1);
        setStartDate(today);
        setEndDate(endDate);
        onDateChange(today, endDate, returnTime);
        break;
      case "2박3일":
        endDate = new Date(today);
        endDate.setDate(today.getDate() + 2);
        setStartDate(today);
        setEndDate(endDate);
        onDateChange(today, endDate, returnTime);
        break;
      case "3박4일":
        endDate = new Date(today);
        endDate.setDate(today.getDate() + 3);
        setStartDate(today);
        setEndDate(endDate);
        onDateChange(today, endDate, returnTime);
        break;
    }
    onDurationChange(duration);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-green-500" />
          여행 일정 선택
        </CardTitle>
        <CardDescription>
          여행 날짜를 직접 선택하거나 빠른 선택을 이용하세요
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Selection */}
        <div>
          <Label className="text-sm font-medium mb-3 block">빠른 선택</Label>
          <div className="flex gap-2 flex-wrap">
            {["당일치기", "1박2일", "2박3일", "3박4일"].map((period) => (
              <Button
                key={period}
                variant="outline"
                size="sm"
                onClick={() => quickSelectDuration(period)}
                className="text-sm"
              >
                {period}
              </Button>
            ))}
          </div>
        </div>

        {/* Date Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>출발일</Label>
            <Popover open={isStartOpen} onOpenChange={setIsStartOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "yyyy년 MM월 dd일", { locale: ko }) : "날짜 선택"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={handleStartDateChange}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>종료일</Label>
            <Popover open={isEndOpen} onOpenChange={setIsEndOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "yyyy년 MM월 dd일", { locale: ko }) : "날짜 선택"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={handleEndDateChange}
                  disabled={(date) => date < new Date() || (startDate && date < startDate)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Return Time for Last Day */}
        {startDate && endDate && (
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              마지막 날 귀가 시간
            </Label>
            <Input
              type="time"
              value={returnTime}
              onChange={(e) => handleReturnTimeChange(e.target.value)}
              className="w-full sm:w-auto"
            />
            <p className="text-sm text-gray-500">
              마지막 날은 {returnTime}까지의 일정을 추천해드립니다
            </p>
          </div>
        )}

        {/* Selected Duration Display */}
        {startDate && endDate && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="font-medium text-blue-800">
              선택된 일정: {format(startDate, "MM월 dd일", { locale: ko })} ~ {format(endDate, "MM월 dd일", { locale: ko })}
            </p>
            <p className="text-sm text-blue-600">
              총 {differenceInDays(endDate, startDate) + 1}일 여행
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TripDatePicker;
