import { useState } from 'react';
import styles from './List.module.css';
import { Link } from 'react-router-dom';

interface Memo {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
  };
  createdAt: string;
  location: {
    lat: number;
    lng: number;
  };
  groupId: string | null;
  groupName: string;
}

const List = () => {
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  // 예시 데이터
  const sampleMemo: Memo = {
    id: "1",
    title: "강남 맛집 탐방",
    content: "강남역 3번 출구 앞 새로 생긴 카페. 분위기도 좋고 커피도 맛있어요.",
    author: {
      id: "user1",
      name: "김철수"
    },
    createdAt: "2024-01-01T09:00:00Z",
    location: {
      lat: 37.498095,
      lng: 127.027610
    },
    groupId: "group1",
    groupName: "맛집 탐방"
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    // 임시로 최대 페이지를 5로 설정
    const maxPage = 5;
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={styles.listContainer}>
      <div className={styles.header}>
        <h2>메모 리스트</h2>
        <div className={styles.groupSelector}>
          <select 
            value={selectedGroup} 
            onChange={(e) => setSelectedGroup(e.target.value)}
            className={styles.select}
          >
            <option value="all">전체 글</option>
            <option value="group1">그룹 1</option>
            <option value="group2">그룹 2</option>
          </select>
        </div>
      </div>

      <div className={styles.memoList}>
        <div className={styles.memoItem}>
          <div className={styles.memoHeader}>
            <h3 className={styles.memoTitle}>{sampleMemo.title}</h3>
            <div className={styles.memoActions}>
              <button className={styles.actionButton}>수정</button>
              <button className={styles.deleteButton}>삭제</button>
              <Link 
                to={`/Home?lat=${sampleMemo.location.lat}&lng=${sampleMemo.location.lng}`} 
                className={styles.mapLink}
              >
                지도에서 보기
              </Link>
            </div>
          </div>
          <p className={styles.memoContent}>{sampleMemo.content}</p>
          <div className={styles.memoFooter}>
            <span>{sampleMemo.groupName} ({sampleMemo.author.name})</span>
            <span>{new Date(sampleMemo.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className={styles.pagination}>
        <button 
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={styles.pageButton}
        >
            &lt;
        </button>
        <span className={styles.pageNumbers}>
            {[1, 2, 3, 4, 5].map((number) => (
            <button
                key={number}
                className={currentPage === number ? styles.active : ''}
                onClick={() => handlePageClick(number)}
            >
                {number}
            </button>
            ))}
        </span>
        <button 
            onClick={handleNextPage}
            disabled={currentPage === 5}
            className={styles.pageButton}
        >
            &gt;
        </button>
        </div>
    </div>
  );
};

export default List;