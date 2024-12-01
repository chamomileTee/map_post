import { useEffect, useRef } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

declare global {
  interface Window {
    kakao: any;
  }
}


const Home: React.FC = () => {
  const mapRef = useRef<any>(null); // 지도를 참조하기 위한 ref

  useEffect(() => {
    // 카카오맵 스크립트를 HTML에 동적으로 추가
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    // 스크립트가 로드된 후 실행
    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 4
        };

        mapRef.current = new window.kakao.maps.Map(container, options);
      });
    };

    // 컴포넌트 언마운트 시 스크립트 제거
    return () => {
      document.head.removeChild(script);
    };
  }, []);

    // 지도 중심 이동
    const panTo = () => {
      if (mapRef.current) {
        const moveLatLon = new window.kakao.maps.LatLng(33.452613, 126.570888);
        mapRef.current.panTo(moveLatLon);
      }
    };  

    return (
      <div>
        <h1>Kakao Map Example</h1>
        <div id="map" style={{ width: "100vw", height: "70vh" }}></div>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button onClick={panTo}>지도 중심</button>
        </div>
      </div>
    );
};

export default Home;
