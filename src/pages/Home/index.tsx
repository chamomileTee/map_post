import { useState, useEffect } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import styles from './Home.module.css';

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

  const getCurrentLocation = () => {
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
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Map 
        center={position}
        className={styles.map}
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
      </Map>
      <button 
        onClick={getCurrentLocation}
        className={styles.currentLocationButton}
      >
        현재 위치
      </button>
    </div>
  );
}

export default Home;