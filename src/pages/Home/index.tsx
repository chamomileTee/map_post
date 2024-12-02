import { useEffect, useRef, useState } from "react";
import styles from "./Home.module.css"; 

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

declare global {
  interface Window {
    kakao: any;
  }
}

const Home: React.FC = () => {
  const mapRef = useRef<any>(null); // 지도를 참조하기 위한 ref
  const overlayRef = useRef<any>(null); // 커스텀 오버레이를 참조하기 위한 ref
  const contentRef = useRef<HTMLDivElement | null>(null); // 커스텀 오버레이 콘텐츠를 참조하기 위한 ref
  const [memoContent, setMemoContent] = useState<string>("");

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
          level: 4,
        };

        mapRef.current = new window.kakao.maps.Map(container, options);

        // 커스텀 오버레이 생성
        const content = document.createElement("div");
        content.className = styles.overlay; // CSS 모듈 클래스 적용
        content.innerHTML = `
          <div class="${styles.overlayButtons}">
            <button class="${styles.overlayButton}" onClick="handleAddMemo()">o</button>
            <button class="${styles.overlayButton}" onClick="handleCloseMemo()">v</button>
            <button class="${styles.overlayButton}" onClick="handleCloseMemo()">x</button>
          </div>
          <textarea 
            class="${styles.overlayTextarea}"
            placeholder="메모를 입력하세요..."
            value="${memoContent}"
            onInput="handleMemoChange(event)"
          ></textarea>
        `;
        contentRef.current = content;

        const position = new window.kakao.maps.LatLng(33.450701, 126.570667);

        overlayRef.current = new window.kakao.maps.CustomOverlay({
          map: mapRef.current,
          content: content,
          position: position,
        });

        // 위치좌표 변수
        let startX: number, startY: number, startOverlayPoint: any;

        const onMouseDown = (e: MouseEvent) => {
          // 커서가 텍스트 영역에 있을 때는 지도 드래그 방지
          window.kakao.maps.event.preventMap();
          const target = e.target as HTMLElement;

          if (target.tagName.toLowerCase() === "textarea") {
            return;
          }

          if (target.tagName.toLowerCase() === "button" && target.classList.contains(styles.overlayButton)) {
            e.preventDefault();
            const proj = mapRef.current.getProjection();
            const overlayPos = overlayRef.current.getPosition();

            startX = e.clientX;
            startY = e.clientY;

            startOverlayPoint = proj.containerPointFromCoords(overlayPos);
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
          }
        };

        const onMouseMove = (e: MouseEvent) => {
          e.preventDefault();
          const proj = mapRef.current.getProjection();
          const deltaX = startX - e.clientX;
          const deltaY = startY - e.clientY;

          const newPoint = new window.kakao.maps.Point(
            startOverlayPoint.x - deltaX,
            startOverlayPoint.y - deltaY
          );

          const newPos = proj.coordsFromContainerPoint(newPoint);
          overlayRef.current.setPosition(newPos);
        };

        const onMouseUp = () => {
          document.removeEventListener("mousemove", onMouseMove);
          document.removeEventListener("mouseup", onMouseUp);
        };

        content.addEventListener("mousedown", onMouseDown);
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [memoContent]);

  // 메모 내용 업데이트 함수
  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemoContent(e.target.value);
  };

  // 지도 중심으로 이동. panTo는 부드럽게
  const panTo = () => {
    if (mapRef.current) {
      const moveLatLon = new window.kakao.maps.LatLng(33.452613, 126.570888);
      mapRef.current.panTo(moveLatLon);
    }
  };

  return (
    <div>
      <div id="map" className={styles.map}></div>
      <button className={styles.centerButton} onClick={panTo}>
      지도 
      </button>
    </div>
  );
};

export default Home;
