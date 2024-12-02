import React, { useState, useEffect } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";

const Home = () => {
  const [position, setPosition] = useState({ lat: 33.450701, lng: 126.570667 });
  const [isOpen, setIsOpen] = useState(false);
  const [memo, setMemo] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting current position:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleSave = () => {
    console.log("Saved memo:", memo);
    setIsOpen(false);
  };

  const handleDragEnd = (marker) => {
    setPosition({
      lat: marker.getPosition().getLat(),
      lng: marker.getPosition().getLng(),
    });
  };

  const handleMapClick = (_t, mouseEvent) => {
    setPosition({
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    });
    setIsOpen(false);
  };

  return (
    <Map 
      center={position}
      style={{ width: "100%", height: "100%" }}
      level={3}
      onClick={handleMapClick}
    >
      <MapMarker 
        position={position}
        onClick={() => setIsOpen(true)}
        draggable={true}
        onDragEnd={(marker) => handleDragEnd(marker)}
      />
      {isOpen && (
        <CustomOverlayMap 
          position={position}
          yAnchor={1.2}
        >
          <div style={{ 
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "20px", 
            background: "#fafafa", 
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            width: "300px",
            fontFamily: "Arial, sans-serif",
            color: "#333"
          }}>
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              marginBottom: "15px"
            }}>
              <h3 style={{ margin: 0, fontSize: "18px" }}>메모</h3>
              <button 
                onClick={() => setIsOpen(false)}
                style={{ 
                  background: "none", 
                  border: "none", 
                  fontSize: "20px", 
                  cursor: "pointer",
                  color: "#999",
                  marginRight: "0px",  // 오른쪽 마진을 음수값으로 설정하여 위치 조정
                  padding: "0",          // 패딩 제거
                  width: "30px",         // 버튼 너비 고정
                  textAlign: "right"     // 텍스트 오른쪽 정렬
                }}
              >
                ×
              </button>
            </div>
            <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="메모를 입력하세요"
            style={{ 
              width: "100%", 
              minHeight: "120px", 
              marginBottom: "15px",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              fontSize: "14px",
              resize: "vertical",
              boxSizing: "border-box",
              margin: "0"  // 마진 초기화
            }}
          />
            <div style={{
              display: "flex",
              justifyContent: "center",
              width: "100%"
            }}>
              <button 
                onClick={handleSave}
                style={{
                  padding: "8px 15px",
                  background: "#266CA9",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "bold",
                  width: "100px"
                }}
              >
                저장
              </button>
            </div>
          </div>
        </CustomOverlayMap>
      )}
    </Map>
  );
}

export default Home;