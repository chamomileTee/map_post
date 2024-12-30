import searchIcon from "../../assets/images/search.png"
import { useState, useEffect } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import styles from './Home.module.css';

const Home = () => {
  const [position, setPosition] = useState({ lat: 33.450701, lng: 126.570667 });
  const [center, setCenter] = useState({ lat: 33.450701, lng: 126.570667 });
  const [isOpen, setIsOpen] = useState(false);
  const [memo, setMemo] = useState("");
  const [title, setTitle] = useState("");
  const [keyword, setKeyword] = useState("");
  const [places, setPlaces] = useState<kakao.maps.services.PlacesSearchResult>([]);
  const [map, setMap] = useState<kakao.maps.Map>();
  const [ps, setPs] = useState<kakao.maps.services.Places>();
  const [isSearchListVisible, setIsSearchListVisible] = useState(false);

  useEffect(() => {
    setPs(new kakao.maps.services.Places());
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

  const searchPlaces = () => {
    if (!ps) {
      console.error("Places service is not initialized");
      return;
    }

    ps.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setPlaces(data);
        setIsSearchListVisible(true);

        const bounds = new kakao.maps.LatLngBounds();
        for (let i = 0; i < data.length; i++) {
          bounds.extend(new kakao.maps.LatLng(
            parseFloat(data[i].y), 
            parseFloat(data[i].x)
          ));
        }
        map?.setBounds(bounds);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 중 오류가 발생했습니다.');
      }
    });
  };

  const handlePlaceSelect = (place: kakao.maps.services.PlacesSearchResultItem) => {
    const newPosition = {
      lat: parseFloat(place.y),
      lng: parseFloat(place.x)
    };
    setPosition(newPosition);
    setCenter(newPosition);
    setIsSearchListVisible(false);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div className={styles.searchContainer}>
        <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchPlaces()}
            className={styles.searchInput}
          />
        <button onClick={searchPlaces} className={styles.searchButton}>
          <img src={searchIcon} alt="Search" className={styles.searchIcon} />
        </button>
      </div>
      {isSearchListVisible && places.length > 0 && (
        <div className={styles.searchResults}>
          {places.map((place: kakao.maps.services.PlacesSearchResultItem, index) => (
            <div
              key={index}
              className={styles.searchItem}
              onClick={() => handlePlaceSelect(place)}
            >
              <h3>{place.place_name}</h3>
              <p>{place.address_name}</p>
            </div>
          ))}
        </div>
      )}
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
                placeholder="메모를 입력하세요."
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