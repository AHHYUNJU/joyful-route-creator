
export interface TripSpot {
  id: string;
  name: string;
  category: string;
  description: string;
  location: string;
  duration: number; // minutes
  rating: number;
  image?: string;
  openTime?: string;
  closeTime?: string;
}

export interface DayPlan {
  day: number;
  spots: TripSpot[];
  totalDuration: number;
}

export interface TripPlan {
  title: string;
  duration: string;
  location: string;
  interests: string[];
  days: DayPlan[];
}

export interface TripReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface OtherUserTrip {
  id: string;
  userId: string;
  userName: string;
  userType: string;
  tripPlan: TripPlan;
  reviews: TripReview[];
  likes: number;
  createdAt: string;
}

export const mockTripSpots: Record<string, TripSpot[]> = {
  "제주도": [
    {
      id: "jeju-1",
      name: "성산일출봉",
      category: "nature",
      description: "유네스코 세계자연유산으로 지정된 제주의 대표적인 관광명소",
      location: "제주특별자치도 서귀포시 성산읍",
      duration: 120,
      rating: 4.5,
      openTime: "07:00",
      closeTime: "19:00"
    },
    {
      id: "jeju-2",
      name: "한라산 국립공원",
      category: "nature",
      description: "한국 최고봉 한라산과 아름다운 자연을 만끽할 수 있는 곳",
      location: "제주특별자치도 제주시",
      duration: 300,
      rating: 4.7,
      openTime: "05:30",
      closeTime: "18:00"
    },
    {
      id: "jeju-3",
      name: "흑돼지 맛집 - 돈사돈",
      category: "food",
      description: "제주 흑돼지 전문점으로 유명한 현지 맛집",
      location: "제주특별자치도 제주시 연동",
      duration: 90,
      rating: 4.3,
      openTime: "11:00",
      closeTime: "22:00"
    },
    {
      id: "jeju-4",
      name: "카페 델문도",
      category: "cafe",
      description: "바다가 보이는 감성적인 카페",
      location: "제주특별자치도 서귀포시 안덕면",
      duration: 60,
      rating: 4.4,
      openTime: "09:00",
      closeTime: "21:00"
    },
    {
      id: "jeju-5",
      name: "우도",
      category: "nature",
      description: "제주도 동쪽 끝에 위치한 아름다운 섬",
      location: "제주특별자치도 제주시 우도면",
      duration: 240,
      rating: 4.6,
      openTime: "08:00",
      closeTime: "18:00"
    },
    {
      id: "jeju-6",
      name: "제주 동문시장",
      category: "culture",
      description: "제주 전통 시장에서 다양한 먹거리와 쇼핑을 즐길 수 있는 곳",
      location: "제주특별자치도 제주시 일도1동",
      duration: 120,
      rating: 4.2,
      openTime: "06:00",
      closeTime: "21:00"
    },
    {
      id: "jeju-7",
      name: "중문 색달해변",
      category: "nature",
      description: "독특한 검은 모래로 유명한 해변",
      location: "제주특별자치도 서귀포시 중문동",
      duration: 90,
      rating: 4.1,
      openTime: "24시간",
      closeTime: "24시간"
    }
  ],
  "부산": [
    {
      id: "busan-1",
      name: "해운대 해수욕장",
      category: "nature",
      description: "부산의 대표적인 해수욕장",
      location: "부산광역시 해운대구",
      duration: 120,
      rating: 4.3
    },
    {
      id: "busan-2",
      name: "광안리 해변",
      category: "nightlife",
      description: "야경이 아름다운 해변가",
      location: "부산광역시 수영구",
      duration: 90,
      rating: 4.4
    },
    {
      id: "busan-3",
      name: "자갈치시장",
      category: "food",
      description: "부산의 대표적인 수산시장",
      location: "부산광역시 중구",
      duration: 150,
      rating: 4.2
    }
  ]
};

export const mockOtherUserTrips: OtherUserTrip[] = [
  {
    id: "trip-1",
    userId: "user-1",
    userName: "감성여행러 민지",
    userType: "감성 스냅러",
    tripPlan: {
      title: "제주도 힐링 여행 코스",
      duration: "2박3일",
      location: "제주도",
      interests: ["nature", "cafe"],
      days: [
        {
          day: 1,
          spots: [
            mockTripSpots["제주도"][0], // 성산일출봉
            mockTripSpots["제주도"][3], // 카페 델문도
            mockTripSpots["제주도"][4]  // 우도
          ],
          totalDuration: 420
        },
        {
          day: 2,
          spots: [
            mockTripSpots["제주도"][1], // 한라산
            mockTripSpots["제주도"][2]  // 흑돼지 맛집
          ],
          totalDuration: 390
        }
      ]
    },
    reviews: [
      {
        id: "review-1",
        userId: "reviewer-1",
        userName: "여행매니아",
        rating: 5,
        comment: "정말 힐링되는 코스였어요! 특히 카페 델문도는 일몰이 너무 예뻤습니다.",
        date: "2024-06-15",
        helpful: 12
      },
      {
        id: "review-2",
        userId: "reviewer-2",
        userName: "제주도러버",
        rating: 4,
        comment: "우도는 4월에 가니까 날씨가 좀 쌀쌀했지만 경치는 최고였어요!",
        date: "2024-04-20",
        helpful: 8
      }
    ],
    likes: 24,
    createdAt: "2024-06-01"
  },
  {
    id: "trip-2",
    userId: "user-2",
    userName: "미식탐험가 준호",
    userType: "미식집착파",
    tripPlan: {
      title: "제주도 맛집 투어",
      duration: "1박2일",
      location: "제주도",
      interests: ["food", "culture"],
      days: [
        {
          day: 1,
          spots: [
            mockTripSpots["제주도"][2], // 흑돼지 맛집
            mockTripSpots["제주도"][5], // 동문시장
            mockTripSpots["제주도"][3]  // 카페 델문도
          ],
          totalDuration: 270
        }
      ]
    },
    reviews: [
      {
        id: "review-3",
        userId: "reviewer-3",
        userName: "맛집헌터",
        rating: 5,
        comment: "돈사돈 정말 맛있어요! 11시 오픈하자마자 가는 걸 추천합니다.",
        date: "2024-05-10",
        helpful: 15
      }
    ],
    likes: 18,
    createdAt: "2024-05-01"
  }
];

export const generateTripPlan = (location: string, duration: string, interests: string[]): TripPlan => {
  const spots = mockTripSpots[location] || [];
  const filteredSpots = spots.filter(spot => 
    interests.length === 0 || interests.includes(spot.category)
  );
  
  const daysCount = duration === "당일치기" ? 1 : parseInt(duration.charAt(0)) + 1;
  const days: DayPlan[] = [];
  
  // 관심사별로 스팟을 분배
  for (let day = 1; day <= daysCount; day++) {
    const daySpots = filteredSpots.slice((day - 1) * 2, day * 2 + 1);
    const totalDuration = daySpots.reduce((sum, spot) => sum + spot.duration, 0);
    
    days.push({
      day,
      spots: daySpots,
      totalDuration
    });
  }
  
  return {
    title: `${location} ${duration} 맞춤 여행`,
    duration,
    location,
    interests,
    days
  };
};
