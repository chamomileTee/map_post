import { useState } from 'react';
import styles from './User.module.css';

interface UserInfo {
  nickname: string;
  email: string;
}

const User = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    nickname: "김철수",
    email: "user@example.com"
  });
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newNickname, setNewNickname] = useState(userInfo.nickname);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNicknameSubmit = () => {
    setUserInfo({ ...userInfo, nickname: newNickname });
    setIsEditingNickname(false);
  };

  const handlePasswordSubmit = () => {
    // 비밀번호 변경 로직
    setIsEditingPassword(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className={styles.container}>
      <h2>계정 설정</h2>
      
      <div className={styles.settingSection}>
        <div className={styles.settingItem}>
          <div className={styles.settingLabel}>닉네임</div>
          {isEditingNickname ? (
            <div className={styles.editForm}>
              <input
                type="text"
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
                className={styles.input}
              />
              <div className={styles.buttonGroup}>
                <button 
                  className={styles.cancelButton}
                  onClick={() => setIsEditingNickname(false)}
                >
                  취소
                </button>
                <button 
                  className={styles.saveButton}
                  onClick={handleNicknameSubmit}
                >
                  저장
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.settingValue}>
              {userInfo.nickname}
              <button 
                className={styles.editButton}
                onClick={() => setIsEditingNickname(true)}
              >
                변경
              </button>
            </div>
          )}
        </div>

        <div className={styles.settingItem}>
          <div className={styles.settingLabel}>이메일</div>
          <div className={styles.settingValue}>
            {userInfo.email}
          </div>
        </div>

        <div className={styles.settingItem}>
          <div className={styles.settingLabel}>비밀번호</div>
          {isEditingPassword ? (
            <div className={styles.editForm}>
              <input
                type="password"
                placeholder="현재 비밀번호"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={styles.input}
              />
              <input
                type="password"
                placeholder="새 비밀번호"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={styles.input}
              />
              <input
                type="password"
                placeholder="새 비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.input}
              />
              <div className={styles.buttonGroup}>
                <button 
                  className={styles.cancelButton}
                  onClick={() => setIsEditingPassword(false)}
                >
                  취소
                </button>
                <button 
                  className={styles.saveButton}
                  onClick={handlePasswordSubmit}
                >
                  저장
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.settingValue}>
              ••••••••
              <button 
                className={styles.editButton}
                onClick={() => setIsEditingPassword(true)}
              >
                변경
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;