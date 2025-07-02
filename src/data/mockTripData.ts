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
    },
    {
      id: "busan-4",
      name: "감천문화마을",
      category: "culture",
      description: "알록달록한 집들이 예쁜 문화마을",
      location: "부산광역시 사하구",
      duration: 120,
      rating: 4.5
    },
    {
      id: "busan-5",
      name: "태종대",
      category: "nature",
      description: "절벽과 바다 경치가 아름다운 자연공원",
      location: "부산광역시 영도구",
      duration: 180,
      rating: 4.4
    }
  ],
  "서울": [
    {
      id: "seoul-1",
      name: "경복궁",
      category: "culture",
      description: "조선시대 대표 궁궐",
      location: "서울특별시 종로구",
      duration: 150,
      rating: 4.6
    },
    {
      id: "seoul-2",
      name: "명동",
      category: "shopping",
      description: "서울의 대표 쇼핑가",
      location: "서울특별시 중구",
      duration: 180,
      rating: 4.2
    },
    {
      id: "seoul-3",
      name: "홍대",
      category: "nightlife",
      description: "젊음의 거리, 클럽과 �ub이 많은 곳",
      location: "서울특별시 마포구",
      duration: 240,
      rating: 4.3
    },
    {
      id: "seoul-4",
      name: "북촌한옥마을",
      category: "culture",
      description: "전통 한옥이 잘 보존된 마을",
      location: "서울특별시 종로구",
      duration: 120,
      rating: 4.4
    },
    {
      id: "seoul-5",
      name: "남산타워",
      category: "nature",
      description: "서울 전경을 볼 수 있는 타워",
      location: "서울특별시 중구",
      duration: 150,
      rating: 4.5
    },
    {
      id: "seoul-6",
      name: "이태원 맛집거리",
      category: "food",
      description: "다양한 세계 음식을 맛볼 수 있는 곳",
      location: "서울특별시 용산구",
      duration: 120,
      rating: 4.1
    }
  ]
};

// 기본 스팟들 (지역이 없을 때 사용)
export const defaultTripSpots: TripSpot[] = [
  {
    id: "default-1",
    name: "관광명소 A",
    category: "nature",
    description: "아름다운 자연 경관을 감상할 수 있는 곳",
    location: "미정",
    duration: 120,
    rating: 4.0
  },
  {
    id: "default-2",
    name: "맛집 B",
    category: "food",
    description: "현지 특색 음식을 맛볼 수 있는 맛집",
    location: "미정",
    duration: 90,
    rating: 4.2
  },
  {
    id: "default-3",
    name: "문화시설 C",
    category: "culture",
    description: "지역 문화를 체험할 수 있는 장소",
    location: "미정",
    duration: 150,
    rating: 4.1
  },
  {
    id: "default-4",
    name: "카페 D",
    category: "cafe",
    description: "휴식을 취할 수 있는 분위기 좋은 카페",
    location: "미정",
    duration: 60,
    rating: 3.9
  }
];

export const generateTripPlan = (location: string, duration: string, interests: string[]): TripPlan => {
  console.log("여행 생성 시작:", { location, duration, interests });
  
  // 1. 해당 지역의 스팟 가져오기 (없으면 기본 스팟 사용)
  let availableSpots = mockTripSpots[location] || defaultTripSpots;
  console.log("사용 가능한 스팟:", availableSpots.length);
  
  // 2. 관심사 필터링
  let filteredSpots = availableSpots;
  if (interests.length > 0) {
    filteredSpots = availableSpots.filter(spot => interests.includes(spot.category));
    console.log("관심사 필터링 후:", filteredSpots.length);
    
    // 관심사 필터링 후 스팟이 없으면 모든 스팟 사용
    if (filteredSpots.length === 0) {
      filteredSpots = availableSpots;
      console.log("필터링된 스팟이 없어서 모든 스팟 사용");
    }
  }
  
  // 3. 최소 스팟 보장 (적어도 2개는 있어야 함)
  if (filteredSpots.length < 2 && availableSpots.length >= 2) {
    filteredSpots = availableSpots.slice(0, 2);
  } else if (filteredSpots.length === 0) {
    filteredSpots = defaultTripSpots.slice(0, 2);
  }
  
  // 4. 날짜 수 계산
  const daysCount = duration === "당일치기" ? 1 : parseInt(duration.charAt(0));
  console.log("여행 일수:", daysCount);
  
  // 5. 각 날짜별 스팟 분배
  const days: DayPlan[] = [];
  const spotsPerDay = Math.max(1, Math.floor(filteredSpots.length / daysCount));
  
  for (let day = 1; day <= daysCount; day++) {
    let daySpots: TripSpot[] = [];
    
    if (day === daysCount) {
      // 마지막 날은 남은 모든 스팟
      daySpots = filteredSpots.slice((day - 1) * spotsPerDay);
    } else {
      // 일반적인 날은 정해진 수만큼
      daySpots = filteredSpots.slice((day - 1) * spotsPerDay, day * spotsPerDay);
    }
    
    // 각 날짜마다 최소 1개의 스팟은 보장
    if (daySpots.length === 0 && filteredSpots.length > 0) {
      const spotIndex = (day - 1) % filteredSpots.length;
      daySpots = [filteredSpots[spotIndex]];
    }
    
    const totalDuration = daySpots.reduce((sum, spot) => sum + spot.duration, 0);
    console.log(`Day ${day}: ${daySpots.length}개 스팟, 총 ${totalDuration}분`);
    
    days.push({
      day,
      spots: daySpots,
      totalDuration
    });
  }
  
  const tripPlan = {
    title: `${location} ${duration} 맞춤 여행`,
    duration,
    location,
    interests,
    days
  };
  
  console.log("생성된 여행 계획:", tripPlan);
  return tripPlan;
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
  },
  {
    id: "trip-3",
    userId: "user-3",
    userName: "도시탐험가 수현",
    userType: "도심러버",
    tripPlan: {
      title: "서울 문화유산 탐방",
      duration: "2박3일",
      location: "서울",
      interests: ["culture", "food"],
      days: [
        {
          day: 1,
          spots: [
            mockTripSpots["서울"][0], // 경복궁
            mockTripSpots["서울"][3], // 북촌한옥마을
          ],
          totalDuration: 270
        },
        {
          day: 2,
          spots: [
            mockTripSpots["서울"][1], // 명동
            mockTripSpots["서울"][5], // 이태원 맛집거리
          ],
          totalDuration: 300
        }
      ]
    },
    reviews: [
      {
        id: "review-4",
        userId: "reviewer-4",
        userName: "역사애호가",
        rating: 5,
        comment: "경복궁 수문장 교대식 꼭 보세요! 북촌한옥마을도 사진찍기 좋아요.",
        date: "2024-06-20",
        helpful: 20
      }
    ],
    likes: 32,
    createdAt: "2024-06-10"
  },
  {
    id: "trip-4",
    userId: "user-4",
    userName: "야경사진작가 현우",
    userType: "사진작가",
    tripPlan: {
      title: "서울 야경 투어",
      duration: "1박2일",
      location: "서울",
      interests: ["nightlife", "nature"],
      days: [
        {
          day: 1,
          spots: [
            mockTripSpots["서울"][4], // 남산타워
            mockTripSpots["서울"][2], // 홍대
          ],
          totalDuration: 390
        }
      ]
    },
    reviews: [
      {
        id: "review-5",
        userId: "reviewer-5",
        userName: "사진매니아",
        rating: 5,
        comment: "남산타워에서 본 서울 야경은 정말 장관이에요! 홍대도 밤에 가니 더 활기차더라고요.",
        date: "2024-05-25",
        helpful: 18
      }
    ],
    likes: 28,
    createdAt: "2024-05-15"
  },
  {
    id: "trip-5",
    userId: "user-5",
    userName: "바다사랑 지혜",
    userType: "바다매니아",
    tripPlan: {
      title: "부산 해변 힐링 코스",
      duration: "2박3일",
      location: "부산",
      interests: ["nature", "nightlife"],
      days: [
        {
          day: 1,
          spots: [
            mockTripSpots["부산"][0], // 해운대 해수욕장
            mockTripSpots["부산"][1], // 광안리 해변
          ],
          totalDuration: 210
        },
        {
          day: 2,
          spots: [
            mockTripSpots["부산"][4], // 태종대
            mockTripSpots["부산"][2], // 자갈치시장
          ],
          totalDuration: 330
        }
      ]
    },
    reviews: [
      {
        id: "review-6",
        userId: "reviewer-6",
        userName: "바다여행러",
        rating: 4,
        comment: "광안리 야경이 정말 예뻐요! 태종대에서 보는 절벽 풍경도 인상적이었습니다.",
        date: "2024-06-05",
        helpful: 14
      }
    ],
    likes: 22,
    createdAt: "2024-05-20"
  },
  {
    id: "trip-6",
    userId: "user-6",
    userName: "문화탐방가 은영",
    userType: "문화애호가",
    tripPlan: {
      title: "부산 문화 체험 여행",
      duration: "1박2일",
      location: "부산",
      interests: ["culture", "food"],
      days: [
        {
          day: 1,
          spots: [
            mockTripSpots["부산"][3], // 감천문화마을
            mockTripSpots["부산"][2], // 자갈치시장
          ],
          totalDuration: 270
        }
      ]
    },
    reviews: [
      {
        id: "review-7",
        userId: "reviewer-7",
        userName: "문화체험러",
        rating: 5,
        comment: "감천문화마을 정말 예뻐요! 알록달록한 집들 사이를 걸으며 사진도 많이 찍었어요.",
        date: "2024-05-30",
        helpful: 16
      }
    ],
    likes: 25,
    createdAt: "2024-05-25"
  }
];
