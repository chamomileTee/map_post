import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import down from '../../assets/images/down.png'
import styles from './List.module.css';

interface GroupResponse {
  id: string;
  name: string;
}

interface Memo {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
  };
  group: {
    id: string;
    name: string;
  };
  createdAt: string;
  location: {
    lat: number;
    lng: number;
  };
  is_hidden: number;
}

const List = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [groups, setGroups] = useState<GroupResponse[]>([
      { id: 'all', name: '전체 메모' },
      { id: 'mine', name: '나만의 메모' }
    ]);
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getGroups = async (): Promise<GroupResponse[]> => {
    // API 호출을 시뮬레이션하는 임시 코드
    return [
      { id: '1', name: '그룹 1' },
      { id: '2', name: '경북대 컴학' }
    ];
  };

  const handleGroupSelect = async (groupId: string) => {
    setSelectedGroup(groupId);
    setIsDropdownOpen(false);
    
    try {
      const response = await getGroups();
      const allGroups = [
        { id: 'all', name: '전체 메모' },
        { id: 'mine', name: '나만의 메모' },
        ...response
      ];
      setGroups(allGroups);
    } catch (error) {
      console.error('Failed to fetch groups:', error);
    }
  };

  useEffect(() => {
    const initializeGroups = async () => {
      try {
        const response = await getGroups();
        const allGroups = [
          { id: 'all', name: '전체 메모' },
          { id: 'mine', name: '나만의 메모' },
          ...response
        ];
        setGroups(allGroups);
      } catch (error) {
        console.error('Failed to initialize groups:', error);
      }
    };
  
    initializeGroups();
  }, []);

  // 예시 데이터
  const [memos, setMemos] = useState<Memo[]>([
    {
      id: "1",
      title: "경북대 북문 맛집",
      content: "북문 앞 새로 생긴 돈까스 맛집 발견! 가성비 좋고 특히 소스가 맛있어요.",
      author: {
        id: "1",
        name: "김철수"
      },
      group: {
        id: "1",
        name: "맛집 탐방"
      },
      createdAt: "2024-01-01T09:00:00Z",
      location: {
        lat: 35.890626,
        lng: 128.613641
      },
      is_hidden: 0
    },
    {
      id: "2",
      title: "홍대 벽화 거리",
      content: "홍대입구역 9번 출구에서 5분 거리에 있는 벽화 거리. 사진 찍기 좋은 장소예요.",
      author: {
        id: "2",
        name: "이영희"
      },
      group: {
        id: "2",
        name: "서울 명소"
      },
      createdAt: "2024-01-02T14:30:00Z",
      location: {
        lat: 37.557527,
        lng: 126.923596
      },
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
          <button 
            className={styles.dropdownButton}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {groups.find(g => g.id === selectedGroup)?.name}
            <img src={down} alt="down" className={styles.dropdownIcon} />
          </button>
          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              {groups.map((group) => (
                <button
                  key={group.id}
                  className={styles.dropdownItem}
                  onClick={() => handleGroupSelect(group.id)}
                >
                  {group.name}
                </button>
              ))}
            </div>
          )}
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
                    to={`/Home?id=${memo.id}`} 
                    className={styles.mapLink}
                  >
                    지도에서 보기
                  </Link>
                )}
              </div>
            </div>
            <p className={styles.memoContent}>{memo.content}</p>
            <div className={styles.memoFooter}>
              <span>{memo.group.name} ({memo.author.name})</span>
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