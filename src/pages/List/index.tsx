import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './List.module.css';

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
  is_hidden: number;
}

const List = () => {
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  // 예시 데이터
  const [memos, setMemos] = useState<Memo[]>([
    {
      id: "1",
      title: "강남 맛집 탐방dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
      content: "강남역 3번 출구 앞 새로 생긴 카페. 분위기도 좋고 커피도 맛있어요.ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
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
      groupName: "맛집 탐방",
      is_hidden: 0
    },
    {
      id: "2",
      title: "홍대 벽화 거리",
      content: "홍대입구역 9번 출구에서 5분 거리에 있는 벽화 거리. 사진 찍기 좋은 장소예요.",
      author: {
        id: "user2",
        name: "이영희"
      },
      createdAt: "2024-01-02T14:30:00Z",
      location: {
        lat: 37.557527,
        lng: 126.923596
      },
      groupId: "group2",
      groupName: "서울 명소",
      is_hidden: 1
    }
  ]);

  const handleToggleHidden = async (memoId: string) => {
    try {
      const updatedMemos = memos.map(memo => {
        if (memo.id === memoId) {
          return { ...memo, is_hidden: memo.is_hidden === 0 ? 1 : 0 };
        }
        return memo;
      });
      setMemos(updatedMemos);
    } catch (error) {
      console.error('메모 상태 업데이트 실패:', error);
    }
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
        {memos.map((memo) => (
          <div key={memo.id} className={`${styles.memoItem} ${memo.is_hidden === 1 ? styles.hiddenMemo : ''}`}>
            <div className={styles.memoHeader}>
              <Link to={`/list/${memo.id}`} className={styles.memoTitle}>
                <span>{memo.title}</span>
              </Link>
              <div className={styles.memoActions}>
                <button 
                  className={styles.toggleButton}
                  onClick={() => handleToggleHidden(memo.id)}
                >
                  {memo.is_hidden === 0 ? '숨기기' : '복원'}
                </button>
                {memo.is_hidden === 0 && (
                  <Link 
                    to={`/Home?lat=${memo.location.lat}&lng=${memo.location.lng}`} 
                    className={styles.mapLink}
                  >
                    지도에서 보기
                  </Link>
                )}
              </div>
            </div>
            <p className={styles.memoContent}>{memo.content}</p>
            <div className={styles.memoFooter}>
              <span>{memo.groupName} ({memo.author.name})</span>
              <span>{new Date(memo.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
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