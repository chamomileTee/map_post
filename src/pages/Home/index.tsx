import { useState, useEffect } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import styles from './Home.module.css';

const Home = () => {
  const [position, setPosition] = useState({ lat: 33.450701, lng: 126.570667 });
  const [center, setCenter] = useState({ lat: 33.450701, lng: 126.570667 });
  const [isOpen, setIsOpen] = useState(false);
  const [memo, setMemo] = useState("");
  const [title, setTitle] = useState("");
  const [map, setMap] = useState<kakao.maps.Map>();

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

  const handleSave = () => {
    console.log("Saved memo:", memo);
    setIsOpen(false);
  };

  const handleDragEnd = (marker: kakao.maps.Marker) => {
    setPosition({
      lat: marker.getPosition().getLat(),
      lng: marker.getPosition().getLng(),
    });
  };

  const handleMapClick = (_t: kakao.maps.Map, mouseEvent: kakao.maps.event.MouseEvent) => {
    setPosition({
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    });
    setIsOpen(false);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setPosition(newPosition);
          setCenter(newPosition);

          map.panTo(new kakao.maps.LatLng(newPosition.lat, newPosition.lng));
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
        center={center}
        className={styles.map}
        level={3}
        onClick={handleMapClick}
        onCreate={setMap}
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
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목"
                    className={styles.memoTitlearea}
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                  />
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