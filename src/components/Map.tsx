
import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

interface MapProps {
  location?: string;
}

const Map = ({ location }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('Map updated for location:', location);
  }, [location]);

  return (
    <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center relative overflow-hidden">
      {location ? (
        <div className="text-center">
          <MapPin className="w-12 h-12 mx-auto mb-2 text-blue-500" />
          <p className="text-lg font-semibold text-gray-700">{location}</p>
          <p className="text-sm text-gray-500">지도에서 위치를 확인하세요</p>
          {/* 간단한 지도 시뮬레이션 */}
          <div className="mt-4 grid grid-cols-3 gap-2 max-w-xs mx-auto">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className={`w-16 h-12 rounded ${
                  i === 4 ? 'bg-blue-400' : 'bg-gray-200'
                } ${i === 4 ? 'animate-pulse' : ''}`}
              >
                {i === 4 && (
                  <div className="flex items-center justify-center h-full">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>지도가 여기에 표시됩니다</p>
          <p className="text-sm">여행지를 선택해주세요</p>
        </div>
      )}
    </div>
  );
};

export default Map;
