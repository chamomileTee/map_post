import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import searchIcon from "../../assets/images/search.png";
import refreshIcon from "../../assets/images/refresh.png";
import styles from './Home.module.css';

interface Memo {
  id: string;
  title: string;
  content: string;
  author: string;
  group: string;
  createdAt: string;
  location: {
    lat: number;
    lng: number;
  };
  is_hidden: number;
}

const mockMemos: Memo[] = [
  {
    id: "1",
    title: "경북대 북문 맛집",
    content: "북문 앞 새로 생긴 돈까스 맛집 발견! 가성비 좋고 특히 소스가 맛있어요.",
    author: "김철수",
    group: "여행 동호회",
    createdAt: "2024. 01. 01. 14:30",
    location: { lat: 35.890626, lng: 128.613641 },
    is_hidden: 0
  },
  {
    id: "2",
    title: "대구 수성구 카페",
    content: "수성못 근처 분위기 좋은 카페 찾았어요. 커피가 진짜 맛있네요!",
    author:"이영희",
    group: "여행 동호회",
    createdAt: "2024. 01. 02. 15:20",
    location: { lat: 35.882213, lng: 128.615107 },
    is_hidden: 0
  },
  {
    id: "3",
    title: "칠성시장 맛집",
    content: "시장 안쪽에 있는 국밥집인데 정말 맛있어요. 특히 수육이 일품!",
    author: "박지민",
    group: "여행 동호회",
    createdAt: "2024. 01. 03. 12:00",
    location: { lat: 35.881215, lng: 128.619108 },
    is_hidden: 0
  },
  {
    id: "4",
    title: "동성로 신상 카페",
    content: "동성로 중앙에 새로 생긴 카페입니다. 디저트가 맛있어요!",
    author:"김철수",
    group: "여행 동호회",
    createdAt: "2024. 01. 04. 16:45",
    location: { lat: 35.880212, lng: 128.616324 },
    is_hidden: 0
  },
  {
    id: "5",
    title: "반월당 라멘",
    content: "반월당역 3번 출구 앞 라멘집. 진한 돈코츠 라멘이 일품입니다.",
    author: "정민수",
    group: "여행 동호회",
    createdAt: "2024. 01. 05. 18:30",
    location: { lat: 35.870214, lng: 128.612614 },
    is_hidden: 0
  },
  {
    id: "6",
    title: "중앙로 초밥집",
    content: "가성비 좋은 초밥집 발견! 점심특선이 특히 추천해요.",
    author: "최유진",
    group: "여행 동호회",
    createdAt: "2024. 01. 06. 13:15",
    location: { lat: 35.885210, lng: 128.613754 },
    is_hidden: 0
  },
  {
    id: "7",
    title: "대구 서문시장 맛집",
    content: "서문시장 칼국수 맛집입니다. 면이 쫄깃하고 국물이 끝내줘요!",
    author: "이영희",
    group: "여행 동호회",
    createdAt: "2024. 01. 07. 11:20",
    location: { lat: 35.884211, lng: 128.621614 },
    is_hidden: 0
  },
  {
    id: "8",
    title: "남산동 카페",
    content: "남산동 골목에 있는 아기자기한 카페에요. 분위기가 너무 좋습니다.",
    author: "박지민",
    group: "여행 동호회",
    createdAt: "2024. 01. 08. 15:00",
    location: { lat: 35.883212, lng: 128.613334 },
    is_hidden: 0
  },
  {
    id: "9",
    title: "대구 약령시 한방카페",
    content: "약령시장 안에 있는 한방차 전문 카페입니다. 계절차가 맛있어요.",
    author: "정민수",
    group: "여행 동호회",
    createdAt: "2024. 01. 09. 14:40",
    location: { lat: 35.875212, lng: 128.589341 },
    is_hidden: 0
  },
  {
    id: "10",
    title: "봉덕동 맛집",
    content: "봉덕동 골목에 있는 숨은 맛집이에요. 된장찌개가 정말 맛있습니다!",
    author: "최유진",
    group: "여행 동호회",
    createdAt: "2024. 01. 10. 12:30",
    location: { lat: 35.873216, lng: 128.609324 },
    is_hidden: 0
  }
];

const Home = () => {
  const NEARBY_MEMOS_LIMIT = 8;
  const navigate = useNavigate();
  const location = useLocation();
  const [position, setPosition] = useState({ lat: 33.450701, lng: 126.570667 });
  const [center, setCenter] = useState({ lat: 33.450701, lng: 126.570667 });
  const [isOpen, setIsOpen] = useState(false);
  const [memo, setMemo] = useState("");
  const [memos, setMemos] = useState(mockMemos);
  const [title, setTitle] = useState("");
  const [nearbyMemos, setNearbyMemos] = useState<Memo[]>([]);
  const [viewMemo, setViewMemo] = useState<Memo | null>(null);
  const [keyword, setKeyword] = useState("");
  const [places, setPlaces] = useState<kakao.maps.services.PlacesSearchResult>([]);
  const [map, setMap] = useState<kakao.maps.Map>();
  const [ps, setPs] = useState<kakao.maps.services.Places>();
  const [isSearchListVisible, setIsSearchListVisible] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const memoId = queryParams.get('id');

    if (memoId) {
      const memoToOpen = mockMemos.find(memo => memo.id === memoId);
      if (memoToOpen) {
        setCenter(memoToOpen.location);
        setPosition(memoToOpen.location);
        setViewMemo(memoToOpen);
      }
    } else {
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
      }
    }

    const fetchMemos = async () => {
      if (mockMemos.length >= NEARBY_MEMOS_LIMIT) {
        const memos = await fetchNearbyMemos();
        setNearbyMemos(memos);
      } else {
        setNearbyMemos(mockMemos);
      }
    };
    fetchMemos();
  }, [location]);

  const handleSave = async () => {
    const dataToSave = {
      title: title,
      memo: memo,
      position: position,
    };
    console.log("Saving data:", dataToSave);
    setIsOpen(false);
  };

  const handleDragEnd = (marker: kakao.maps.Marker) => {
    setPosition({
      lat: marker.getPosition().getLat(),
      lng: marker.getPosition().getLng(),
    });
  };

  const handleMapClick = (_t: kakao.maps.Map, mouseEvent: kakao.maps.event.MouseEvent) => {
    if (!isOpen && !viewMemo) {
      setPosition({
        lat: mouseEvent.latLng.getLat(),
        lng: mouseEvent.latLng.getLng(),
      });
      setIsOpen(true);
    } else {
      setIsOpen(false);
      setViewMemo(null);
    }
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
    const newPosition = { lat: parseFloat(place.y), lng: parseFloat(place.x) };
    setPosition(newPosition);
    setCenter(newPosition);
    setIsSearchListVisible(false);
  };

  const fetchNearbyMemos = async () => {
    const sortedMemos = memos
      .filter(memo => memo.is_hidden === 0)
      .map((memo) => ({
        ...memo,
        distance: Math.abs(memo.location.lat - center.lat) + Math.abs(memo.location.lng - center.lng),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, NEARBY_MEMOS_LIMIT);
    return sortedMemos;
  };

  const handleMapCenterChanged = (map: kakao.maps.Map) => {
    const newCenter = map.getCenter();
    setCenter({
      lat: newCenter.getLat(),
      lng: newCenter.getLng(),
    });
  };

  const handleHideMemo = (memoId: string) => {
    setMemos(prevMemos => prevMemos.map(memo => 
      memo.id === memoId ? {...memo, is_hidden: 1} : memo
    ));
    setNearbyMemos(prevMemos => prevMemos.filter(memo => memo.id !== memoId));
    setViewMemo(null);
  };

  const navigateToDetailPage = (memoId: string) => {
    navigate(`/list/${memoId}`);
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
          {places.map((place, index) => (
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
        onDragEnd={(map) => handleMapCenterChanged(map)}
      >
        <MapMarker
          position={position}
          onClick={() => setIsOpen(true)}
          draggable={true}
          onDragEnd={(marker) => handleDragEnd(marker)}
        />
        {isOpen && (
          <CustomOverlayMap position={position} yAnchor={1.18}>
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
                />
                <button
                  onClick={() => setIsOpen(false)}
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
              />
              <div className={styles.buttonContainer}>
                <button
                  onClick={handleSave}
                  className={styles.saveButton}
                >
                  저장
                </button>
              </div>
            </div>
          </CustomOverlayMap>
        )}
        {nearbyMemos.map((memo, index) => (
          <MapMarker
            key={index}
            position={memo.location}
            onClick={() => setViewMemo(memo)}
          />
        ))}
        {viewMemo && (
          <CustomOverlayMap position={viewMemo.location} yAnchor={1.18}>
            <div 
              className={styles.memoContainer}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            >
              <div className={styles.memoHeader}>
                <h3 
                  className={styles.memoTitle}
                  onClick={() => navigateToDetailPage(viewMemo.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {viewMemo.title}
                </h3>
                <button onClick={() => setViewMemo(null)} className={styles.closeButton}>
                  ×
                </button>
              </div>
              <textarea
                value={viewMemo.content}
                readOnly
                className={`${styles.memoTextarea} ${styles.readOnlyTextarea}`}
              />
              <div className={styles.memoFooter}>
                <p className={styles.memoAuthor}>{viewMemo.group} ({viewMemo.author})</p>
                <div className={styles.createdAtAndHideContainer}>
                  <p className={styles.memoCreatedAt}>{viewMemo.createdAt}</p>
                  <button
                    onClick={() => handleHideMemo(viewMemo.id)}
                    className={styles.hideButton}
                  >
                    숨기기
                  </button>
                </div>
              </div>
            </div>
          </CustomOverlayMap>
        )}
      </Map>
      <button onClick={getCurrentLocation} className={styles.currentLocationButton}>
        현재 위치
      </button>
      <button
        onClick={async () => {
          const memos = await fetchNearbyMemos(); //api 새 요청으로 수정
          setNearbyMemos(memos);
        }}
        className={styles.fetchMemosButton}
      >
        <img src={refreshIcon} alt="Refresh" className={styles.refreshIcon} />
      </button>
    </div>
  );
};

export default Home;