import React, { useState } from 'react';
import styles from './Group.module.css';
import moreIcon from '../../assets/images/more.png';

interface Member {
  user_id: string;
  user_name: string;
  isLeader: boolean;
}

interface Group {
  group_id: string;
  group_name: string;
  detail: string;
  members: Member[];
  isUserLeader: boolean;
  createdAt: string;
}

const Group = () => {
  const [groups, setGroups] = useState<Group[]>([
    {
      group_id: "1",
      group_name: "여행 동호회",
      detail: "제주도 여행 계획 공유 그룹입니다.",
      members: [
        { user_id: "1", user_name: "김철수", isLeader: true },
        { user_id: "2", user_name: "이영희", isLeader: false },
        { user_id: "3", user_name: "박지성", isLeader: false },
        { user_id: "4", user_name: "최유나", isLeader: false },
        { user_id: "5", user_name: "정민호", isLeader: false },
        { user_id: "6", user_name: "강서연", isLeader: false },
        { user_id: "7", user_name: "윤재호", isLeader: false },
        { user_id: "8", user_name: "송미란", isLeader: false },
        { user_id: "9", user_name: "임현우", isLeader: false },
        { user_id: "10", user_name: "한지은", isLeader: false },
      ],
      isUserLeader: true,
      createdAt: "2024-01-01"
    },
    {
      group_id: "2",
      group_name: "맛집 동호회ddddddddddddddddddddddddddddddddddddddddd",
      detail: "대구 맛집 공유 그룹입니다.dddddddddddddddddddddddddddddddddddddddddd",
      members: [
        { user_id: "1", user_name: "김철수", isLeader: true },
        { user_id: "2", user_name: "이영희", isLeader: false },
        { user_id: "3", user_name: "박지성", isLeader: false },
        { user_id: "4", user_name: "최유나", isLeader: false },
        { user_id: "5", user_name: "정민호", isLeader: false },
        { user_id: "6", user_name: "강서연", isLeader: false },
        { user_id: "7", user_name: "윤재호", isLeader: false },
        { user_id: "8", user_name: "송미란", isLeader: false },
        { user_id: "9", user_name: "임현우", isLeader: false },
        { user_id: "10", user_name: "한지은", isLeader: false },
      ],
      isUserLeader: true,
      createdAt: "2024-01-01"
    },
    {
      group_id: "3",
      group_name: "자전거 동호회",
      detail: "자전거 타는 그룹입니다.",
      members: [
        { user_id: "1", user_name: "김철수", isLeader: true },
        { user_id: "2", user_name: "이영희", isLeader: false },
        { user_id: "3", user_name: "박지성", isLeader: false },
        { user_id: "4", user_name: "최유나", isLeader: false },
        { user_id: "5", user_name: "정민호", isLeader: false },
        { user_id: "6", user_name: "강서연", isLeader: false },
        { user_id: "7", user_name: "윤재호", isLeader: false },
        { user_id: "8", user_name: "송미란", isLeader: false },
        { user_id: "9", user_name: "임현우", isLeader: false },
        { user_id: "10", user_name: "한지은", isLeader: false },
      ],
      isUserLeader: true,
      createdAt: "2024-01-01"
    },
    {
      group_id: "4",
      group_name: "경북대 컴학",
      detail: "컴학 그룹",
      members: [
        { user_id: "1", user_name: "김철수", isLeader: true },
        { user_id: "2", user_name: "이영희", isLeader: false },
        { user_id: "3", user_name: "박지성", isLeader: false },
        { user_id: "4", user_name: "최유나", isLeader: false },
        { user_id: "5", user_name: "정민호", isLeader: false },
        { user_id: "6", user_name: "강서연", isLeader: false },
        { user_id: "7", user_name: "윤재호", isLeader: false },
        { user_id: "8", user_name: "송미란", isLeader: false },
        { user_id: "9", user_name: "임현우", isLeader: false },
        { user_id: "10", user_name: "한지은", isLeader: false },
      ],
      isUserLeader: true,
      createdAt: "2024-01-01"
    }
  ]);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [activeGroup, setActiveGroup] = useState<Group | null>(null);
  const [managingGroupId, setManagingGroupId] = useState<string | null>(null);
  const [changingLeaderGroupId, setChangingLeaderGroupId] = useState<string | null>(null);
  const [newLeaderId, setNewLeaderId] = useState<string | null>(null);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: '',
    detail: '',
    members: [] as { id: string; name: string }[]
  });
  const [searchId, setSearchId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleMoreClick = (e: React.MouseEvent, groupId: string) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === groupId ? null : groupId);
  };

  const handleEditClick = (group: Group) => {
    setActiveGroup(group);
    setShowEditModal(true);
    setActiveDropdown(null);
  };

  const handleMemberManage = (groupId: string) => {
    setManagingGroupId(managingGroupId === groupId ? null : groupId);
    setSelectedMembers([]);
    setChangingLeaderGroupId(null);
    setActiveDropdown(null);
  };

  const handleChangeLeader = (groupId: string) => {
    setChangingLeaderGroupId(changingLeaderGroupId === groupId ? null : groupId);
    setNewLeaderId(null);
    setManagingGroupId(null);
    setActiveDropdown(null);
  };

  const handleLeaderChange = () => {
    if (newLeaderId && changingLeaderGroupId) {
      const updatedGroups = groups.map(group => {
        if (group.group_id === changingLeaderGroupId) {
          const updatedMembers = group.members.map(member => ({
            ...member,
            isLeader: member.user_id === newLeaderId
          }));
          return { ...group, members: updatedMembers, isUserLeader: false };
        }
        return group;
      });
      setGroups(updatedGroups);
      setChangingLeaderGroupId(null);
      setNewLeaderId(null);
    }
  };

  const handleMemberSelect = (memberId: string) => {
    setSelectedMembers(prev =>
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleRemoveMembers = () => {
    // 멤버 제거 로직 구현
    setSelectedMembers([]);
    setManagingGroupId(null);
  };

  const handleAddMember = () => {
    // 멤버 추가 로직 구현
    setManagingGroupId(null);
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

  const handleCreateGroup = () => {
    if (window.confirm("그룹을 생성하시겠습니까?")) {
      // 그룹 생성 로직
      setShowCreateModal(false);
      setNewGroup({ name: '', detail: '', members: [] });
    }
  };

  const handleSearchUser = () => {
    if (!searchId.trim()) return;
    // 실제로는 API 호출하여 사용자 검색
    const mockUser = { id: searchId, name: `${searchId}` };
    if (!newGroup.members.find(m => m.id === mockUser.id)) {
      setNewGroup({
        ...newGroup,
        members: [...newGroup.members, mockUser]
      });
    }
    setSearchId('');
  };

  const handleRemoveMember = (memberId: string) => {
    setNewGroup({
      ...newGroup,
      members: newGroup.members.filter(m => m.id !== memberId)
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>내 그룹</h2>
        <button className={`${styles.button} ${styles.addButton}`}
        onClick={() => setShowCreateModal(true)}>
          + 새 그룹 만들기
        </button>
      </div>
      <div className={styles.groupGrid}>
        {groups.map(group => (
          <div key={group.group_id} className={styles.groupCard}>
            <div className={styles.groupHeader}>
              <h3 className={styles.groupName}>{group.group_name}</h3>
              <button className={styles.moreButton} onClick={(e) => handleMoreClick(e, group.group_id)}>
                <img src={moreIcon} alt="더보기" />
              </button>
              {activeDropdown === group.group_id && (
                <div className={styles.dropdown}>
                  <button onClick={() => handleEditClick(group)}>그룹 수정</button>
                  {group.isUserLeader && (
                    <>
                      <button onClick={() => handleMemberManage(group.group_id)}>멤버 관리</button>
                      <button onClick={() => handleChangeLeader(group.group_id)}>방장 변경</button>
                    </>
                  )}
                  <button onClick={() => setShowLeaveConfirm(true)}>나가기</button>
                </div>
              )}
            </div>
            <p className={styles.groupDetail}>{group.detail}</p>
            <div className={styles.memberListWrapper}>
              <div className={styles.memberList}>
                {group.members.map(member => (
                  <div key={member.user_id} className={styles.memberItem}>
                    {managingGroupId === group.group_id && !member.isLeader && (
                      <input
                        type="checkbox"
                        checked={selectedMembers.includes(member.user_id)}
                        onChange={() => handleMemberSelect(member.user_id)}
                      />
                    )}
                    {changingLeaderGroupId === group.group_id && !member.isLeader && (
                      <input
                        type="radio"
                        checked={newLeaderId === member.user_id}
                        onChange={() => setNewLeaderId(member.user_id)}
                      />
                    )}
                    <span>{member.user_name}</span>
                    {member.isLeader && <span className={styles.leaderBadge}>방장</span>}
                  </div>
                ))}
              </div>
              {managingGroupId === group.group_id && (
                <div className={styles.memberActions}>
                  <button className={`${styles.button} ${styles.cancelButton}`} onClick={() => setManagingGroupId(null)}>
                    취소
                  </button>
                  {selectedMembers.length > 0 ? (
                    <button className={`${styles.button} ${styles.removeButton}`} onClick={handleRemoveMembers}>
                      내보내기
                    </button>
                  ) : (
                    <button className={`${styles.button} ${styles.addButton}`} onClick={handleAddMember}>
                      멤버 추가
                    </button>
                  )}
                </div>
              )}
              {changingLeaderGroupId === group.group_id && (
                <div className={styles.memberActions}>
                  <button className={`${styles.button} ${styles.cancelButton}`} onClick={() => setChangingLeaderGroupId(null)}>
                    취소
                  </button>
                  <button
                    className={`${styles.button} ${styles.changeButton}`}
                    onClick={handleLeaderChange}
                    disabled={!newLeaderId}
                  >
                    변경하기
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {showEditModal && activeGroup && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>그룹 수정</h3>
            <div className={styles.formGroup}>
              <label>그룹명</label>
              <input
                type="text"
                value={activeGroup.group_name}
                onChange={(e) => setActiveGroup({ ...activeGroup, group_name: e.target.value })}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label>그룹 설명</label>
              <textarea
                value={activeGroup.detail}
                onChange={(e) => setActiveGroup({ ...activeGroup, detail: e.target.value })}
                className={styles.textarea}
              />
            </div>
            <div className={styles.modalActions}>
              <button className={`${styles.button} ${styles.cancelButton}`} onClick={() => setShowEditModal(false)}>
                취소
              </button>
              <button className={`${styles.button} ${styles.saveButton}`} onClick={() => setShowEditModal(false)}>
                저장
              </button>
            </div>
          </div>
        </div>
      )}
      {showLeaveConfirm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>그룹 나가기</h3>
            <p>정말 나가시겠습니까?</p>
            <div className={styles.modalActions}>
              <button className={`${styles.button} ${styles.cancelButton}`} onClick={() => setShowLeaveConfirm(false)}>취소</button>
              <button className={`${styles.button} ${styles.dangerButton}`}>나가기</button>
            </div>
          </div>
        </div>
      )}
      {showCreateModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>새 그룹 만들기</h3>
            <div className={styles.formGroup}>
              <label>그룹명</label>
              <input
                type="text"
                value={newGroup.name}
                onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                className={styles.input}
                placeholder="그룹 이름을 입력하세요"
              />
            </div>
            <div className={styles.formGroup}>
              <label>그룹 설명</label>
              <textarea
                value={newGroup.detail}
                onChange={(e) => setNewGroup({ ...newGroup, detail: e.target.value })}
                className={styles.textarea}
                placeholder="그룹 설명을 입력하세요"
              />
            </div>
            <div className={styles.formGroup}>
              <label>멤버 추가</label>
              <div className={styles.searchWrapper}>
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className={styles.input}
                  placeholder="사용자 ID를 입력하세요"
                />
                <button 
                  className={styles.searchButton}
                  onClick={handleSearchUser}
                >
                  찾기
                </button>
              </div>
            </div>
            <div className={styles.memberWrapper}>
              <div className={styles.memberList}>
                {newGroup.members.map(member => (
                  <div key={member.id} className={styles.memberItem}>
                    <span>{member.name}</span>
                    <button
                      className={styles.xButton}
                      onClick={() => handleRemoveMember(member.id)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.modalActions}>
              <button
                onClick={() => setShowCreateModal(false)}
                className={`${styles.button} ${styles.cancelButton}`}
              >
                취소
              </button>
              <button
                onClick={handleCreateGroup}
                className={`${styles.button} ${styles.saveButton}`}
                disabled={!newGroup.name || newGroup.members.length === 0}
              >
                그룹 생성
              </button>
            </div>
          </div>
        </div>
      )}
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

export default Group;
