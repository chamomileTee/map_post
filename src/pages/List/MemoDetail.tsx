import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backIcon from '../../assets/images/back.png';
import moreIcon from '../../assets/images/more.png';
import sendIcon from '../../assets/images/send.png';
import styles from './MemoDetail.module.css';

interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
  };
  createdAt: string;
}

const MemoDetail = () => {
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const currentUserId = 'user1';
  const [showDropdown, setShowDropdown] = useState(false);
  const [memo, setMemo] = useState({
    id: "1",
    title: "강남 맛집 탐방ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
    content: "강남역 3번 출구 앞 새로 생긴 카페.분위기도 좋고 커피도 맛있어요.dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddss",
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
  });

  const handleMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const handleToggleHidden = async () => {
    try {
      const newHiddenValue = memo.is_hidden === 0 ? 1 : 0;
      setMemo({ ...memo, is_hidden: newHiddenValue });
      setShowDropdown(false);
    } catch (error) {
      console.error('메모 상태 업데이트 실패:', error);
    }
  };

  const handleEdit = () => {
    // 수정 로직 구현
    setShowDropdown(false);
  };

  const handleDelete = () => {
    // 삭제 로직 구현
    setShowDropdown(false);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = {
      id: Date.now().toString(),
      content: comment,
      author: {
        id: currentUserId,
        name: "김철수"
      },
      createdAt: new Date().toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    };

    setComments([...comments, newComment]);
    setComment('');
  };

  return (
    <div className={styles.container}>
      <img 
        src={backIcon} 
        alt="뒤로가기"
        className={styles.backButton}
        onClick={() => navigate(-1)}
      />
      <div className={`${styles.memoCard}`}>
        <div className={styles.memoHeader}>
          <div className={styles.titleSection}>
            <h2 className={styles.memoTitle}>{memo.title}</h2>
          </div>
          <div className={styles.memoActions}>
            <button 
              className={styles.moreButton}
              onClick={handleMoreClick}
            >
              <img src={moreIcon} alt="더보기" />
            </button>
            {showDropdown && (
              <div className={styles.dropdown}>
                {memo.author.id === currentUserId && memo.is_hidden === 0 && (
                  <>
                    <button onClick={handleEdit}>수정</button>
                    <button onClick={handleDelete}>삭제</button>
                  </>
                )}
                {memo.author.id === currentUserId && (
                  <button onClick={handleToggleHidden}>
                    {memo.is_hidden === 0 ? '숨기기' : '복원'}
                  </button>
                )}
                {memo.is_hidden === 0 && (
                  <Link to={`/Home?lat=${memo.location.lat}&lng=${memo.location.lng}`}>
                    지도에서 보기
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className={styles.memoContent}>
          <p>{memo.content}</p>
        </div>

        <div className={styles.memoFooter}>
          <span>{memo.groupName} ({memo.author.name})</span>
          <span>{new Date(memo.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className={styles.commentSection}>
        <h3 className={styles.commentTitle}>댓글</h3>
        <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
          <div className={styles.commentInputWrapper}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="댓글을 입력하세요"
              className={styles.commentInput}
            />
            <button type="submit" className={styles.sendButton}>
             <img src={sendIcon} alt="댓글 작성" />
            </button>
          </div>
        </form>
        <div className={styles.commentList}>
          {comments.map((comment) => (
            <div key={comment.id} className={styles.commentItem}>
              <div className={styles.commentHeader}>
                <span className={styles.commentAuthor}>{comment.author.name}</span>
                <span className={styles.commentDate}>
                  {comment.createdAt}
                </span>
              </div>
              <p className={styles.commentContent}>{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemoDetail;