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
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      content: "정말 맛있어 보이는 카페네요! 꼭 가보고 싶어요.",
      author: { id: "user2", name: "이영희" },
      createdAt: "2024-01-02T10:30:00Z"
    },
    {
      id: "2",
      content: "저도 얼마 전에 다녀왔는데 커피가 정말 맛있었어요.",
      author: { id: "user1", name: "김철수" },
      createdAt: "2024-01-02T11:15:00Z"
    },
    {
      id: "3",
      content: "다음에 갈 때는 디저트도 꼭 먹어보세요!",
      author: { id: "user1", name: "김철수" },
      createdAt: "2024-01-02T14:45:00Z"
    }
  ]);
  const currentUserId = 'user1';
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null);
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

  const handleDeleteComment = (commentId: string) => {
    setDeletingCommentId(commentId);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteComment = () => {
    if (deletingCommentId) {
      setComments(comments.filter(c => c.id !== deletingCommentId));
      setShowDeleteConfirm(false);
      setDeletingCommentId(null);
    }
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
                <div className={styles.commentMetadata}>
                  {comment.author.id === currentUserId && (
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className={styles.deleteCommentButton}
                    >
                      삭제
                    </button>
                  )}
                  <span className={styles.commentDate}>
                    {new Date(comment.createdAt).toLocaleString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false
                    })}
                  </span>
                </div>
              </div>
              <p className={styles.commentContent}>{comment.content}</p>
            </div>
          ))}
        </div>
      </div>

      {showDeleteConfirm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>댓글 삭제</h3>
            <p>정말 삭제하시겠습니까?</p>
            <div className={styles.modalActions}>
              <button onClick={() => setShowDeleteConfirm(false)} className={`${styles.button} ${styles.cancelButton}`}>
                취소
              </button>
              <button onClick={confirmDeleteComment} className={`${styles.button} ${styles.dangerButton}`}>
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoDetail;