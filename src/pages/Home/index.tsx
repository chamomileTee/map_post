import { useState, useEffect } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import styles from './Home.module.css';

const Home = () => {
  const [position, setPosition] = useState({ lat: 33.450701, lng: 126.570667 });
  const [center, setCenter] = useState({ lat: 33.450701, lng: 126.570667 });
  const [isOpen, setIsOpen] = useState(false);
  const [memo, setMemo] = useState("");
  const [viewMemo, setViewMemo] = useState(null)
  const [nearbyMemos, setNearbyMemos] = useState([]);


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setPosition(newPosition);
          setCenter(newPosition);
        },
        (error) => {
          console.error("Error getting current position:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleSave = async () => {
    const dataToSave = {
      memo: memo,
      position: position,
    };
  
    console.log("Saving data:", dataToSave);
  
    try {
      const response = await fetch("http://localhost:8080/api/memos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSave),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Data saved successfully:", data);
  
        alert("메모가 성공적으로 저장되었습니다.");
      } else {

        const errorData = await response.json();
        alert(errorData.message || "메모 저장에 실패하였습니다.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("서버 오류가 발생하였습니다. 다시 시도해주세요.");
    }

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

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setPosition(newPosition);
          setCenter(newPosition);
        },
        (error) => {
          console.error("Error getting current position:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const fetchNearbyMemos = async () => {
    // try {
    //   const range = 0.05;
    //   const response = await fetch(
    //     `http://localhost:8080/api/nearby-memos?lat=${position.lat}&lng=${position.lng}&range=${range}`
    //   );
    //   if (response.ok) {
    //     const data = await response.json();
    //     return data;
    //   } else {
    //     console.error("Failed to fetch nearby memos:", response.statusText);
    //     return [];
    //   }
    // } catch (error) {
    //   console.error("Error fetching nearby memos:", error);
    //   alert("서버 오류가 발생하였습니다. 다시 시도해주세요.");
    //   return [];
    // }

    // 더미데이터
    const mockData = [
      { lat: 35.880626, lng: 128.623641, memo: "메모 1" },
      { lat: 35.882213, lng: 128.615107, memo: "메모 2" },
      { lat: 35.881215, lng: 128.619108, memo: "메모 3" },
      { lat: 35.880212, lng: 128.616324, memo: "메모 4" },
      { lat: 35.870214, lng: 128.612614, memo: "메모 5" },
      { lat: 35.885210, lng: 128.613754, memo: "메모 6" },
      { lat: 35.884211, lng: 128.621614, memo: "메모 7" },
      { lat: 35.883212, lng: 128.613334, memo: "메모 8" },
      { lat: 35.875212, lng: 128.589341, memo: "메모 9" },
      { lat: 35.873216, lng: 128.609324, memo: "메모 0" },
    ];
  
    // 현재 위치를 기준으로 가장 가까운 5개 정렬
    const sortedMemos = mockData
      .map((memo) => ({
        ...memo,
        distance:
          Math.abs(memo.lat - position.lat) +
          Math.abs(memo.lng - position.lng),
      }))
      .sort((a, b) => a.distance - b.distance) 
      .slice(0, 5); 

    return sortedMemos; 
  };  

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Map 
        center={center}
        className={styles.map}
        level={3}
        onClick={handleMapClick}
      >
        <MapMarker 
          position={position}
          onClick={() => {
            setIsOpen(true);
            setViewMemo(null);
          }}
          draggable={true}
          onDragEnd={(marker) => handleDragEnd(marker)}
        />
        {nearbyMemos.map((memo, index) => (
          <MapMarker
            key={index}
            position={{ lat: memo.lat, lng: memo.lng }}
            onClick={() => {
              setViewMemo(memo);
              setIsOpen(false); 
            }}
          />
        ))}
        {isOpen && (
          <CustomOverlayMap 
            position={position}
            yAnchor={1.2}
          >
            <div 
              className={styles.memoContainer}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            >
              <div className={styles.memoHeader}>
                <h3 className={styles.memoTitle}>메모</h3>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className={styles.closeButton}
                >
                  ×
                </button>
              </div>
              <textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="메모를 입력하세요"
                className={styles.memoTextarea}
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
              />
              <div className={styles.buttonContainer}>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSave();
                  }}
                  className={styles.saveButton}
                >
                  저장
                </button>
              </div>
            </div>
          </CustomOverlayMap>
        )}
        {viewMemo && (
          <CustomOverlayMap position={{ lat: viewMemo.lat, lng: viewMemo.lng }} yAnchor={1.2}>
            <div className={styles.memoContainer}>
              <div className={styles.memoHeader}>
                <h3 className={styles.memoTitle}>메모 보기</h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewMemo(null);
                  }}
                  className={styles.closeButton}
                >
                  ×
                </button>
              </div>
              <textarea
                value={viewMemo.memo}
                readOnly
                className={`${styles.memoTextarea} ${styles.readOnlyTextarea}`}
              />
            </div>
          </CustomOverlayMap>
        )}
      </Map>
      <button 
        onClick={getCurrentLocation}
        className={styles.currentLocationButton}
      >
        현재 위치
      </button>
      <button 
        onClick={async () => {
          const memos = await fetchNearbyMemos();
          setNearbyMemos(memos);
        }}
        className={styles.fetchMemosButton}
      >
        새로고침
      </button>
    </div>
  );
}

export default Home;