import React, { useState } from 'react';
import styles from './Group.module.css';
import moreIcon from '../../assets/images/more.png';

interface Member {
  id: string;
  name: string;
  isLeader: boolean;
}

interface Group {
  id: string;
  name: string;
  detail: string;
  members: Member[];
  isUserLeader: boolean;
  createdAt: string;
}

const Group = () => {
  const [groups, setGroups] = useState<Group[]>([
    {
      id: "1",
      name: "여행 동호회",
      detail: "제주도 여행 계획 공유 그룹입니다.",
      members: [
        { id: "1", name: "김철수", isLeader: true },
        { id: "2", name: "이영희", isLeader: false },
        { id: "3", name: "박지성", isLeader: false },
        { id: "4", name: "최유나", isLeader: false },
        { id: "5", name: "정민호", isLeader: false },
        { id: "6", name: "강서연", isLeader: false },
        { id: "7", name: "윤재호", isLeader: false },
        { id: "8", name: "송미란", isLeader: false },
        { id: "9", name: "임현우", isLeader: false },
        { id: "10", name: "한지은", isLeader: false },
      ],
      isUserLeader: true,
      createdAt: "2024-01-01"
    },
    {
      id: "2",
      name: "맛집 동호회",
      detail: "대구 맛집 공유 그룹입니다.",
      members: [
        { id: "1", name: "김철수", isLeader: true },
        { id: "2", name: "이영희", isLeader: false },
        { id: "3", name: "박지성", isLeader: false },
        { id: "4", name: "최유나", isLeader: false },
        { id: "5", name: "정민호", isLeader: false },
        { id: "6", name: "강서연", isLeader: false },
        { id: "7", name: "윤재호", isLeader: false },
        { id: "8", name: "송미란", isLeader: false },
        { id: "9", name: "임현우", isLeader: false },
        { id: "10", name: "한지은", isLeader: false },
      ],
      isUserLeader: true,
      createdAt: "2024-01-01"
    },
    {
      id: "3",
      name: "자전거 동호회",
      detail: "자전거 타는 그룹입니다.",
      members: [
        { id: "1", name: "김철수", isLeader: true },
        { id: "2", name: "이영희", isLeader: false },
        { id: "3", name: "박지성", isLeader: false },
        { id: "4", name: "최유나", isLeader: false },
        { id: "5", name: "정민호", isLeader: false },
        { id: "6", name: "강서연", isLeader: false },
        { id: "7", name: "윤재호", isLeader: false },
        { id: "8", name: "송미란", isLeader: false },
        { id: "9", name: "임현우", isLeader: false },
        { id: "10", name: "한지은", isLeader: false },
      ],
      isUserLeader: true,
      createdAt: "2024-01-01"
    },
    {
      id: "4",
      name: "경북대 컴학",
      detail: "컴학 그룹",
      members: [
        { id: "1", name: "김철수", isLeader: true },
        { id: "2", name: "이영희", isLeader: false },
        { id: "3", name: "박지성", isLeader: false },
        { id: "4", name: "최유나", isLeader: false },
        { id: "5", name: "정민호", isLeader: false },
        { id: "6", name: "강서연", isLeader: false },
        { id: "7", name: "윤재호", isLeader: false },
        { id: "8", name: "송미란", isLeader: false },
        { id: "9", name: "임현우", isLeader: false },
        { id: "10", name: "한지은", isLeader: false },
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
        if (group.id === changingLeaderGroupId) {
          const updatedMembers = group.members.map(member => ({
            ...member,
            isLeader: member.id === newLeaderId
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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>내 그룹</h2>
        <button className={`${styles.button} ${styles.addButton}`}>+ 새 그룹 만들기</button>
      </div>
      <div className={styles.groupGrid}>
        {groups.map(group => (
          <div key={group.id} className={styles.groupCard}>
            <div className={styles.groupHeader}>
              <h3 className={styles.groupName}>{group.name}</h3>
              <button className={styles.moreButton} onClick={(e) => handleMoreClick(e, group.id)}>
                <img src={moreIcon} alt="더보기" />
              </button>
              {activeDropdown === group.id && (
                <div className={styles.dropdown}>
                  <button onClick={() => handleEditClick(group)}>그룹 수정</button>
                  {group.isUserLeader && (
                    <>
                      <button onClick={() => handleMemberManage(group.id)}>멤버 관리</button>
                      <button onClick={() => handleChangeLeader(group.id)}>방장 변경</button>
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
                  <div key={member.id} className={styles.memberItem}>
                    {managingGroupId === group.id && !member.isLeader && (
                      <input
                        type="checkbox"
                        checked={selectedMembers.includes(member.id)}
                        onChange={() => handleMemberSelect(member.id)}
                      />
                    )}
                    {changingLeaderGroupId === group.id && !member.isLeader && (
                      <input
                        type="radio"
                        checked={newLeaderId === member.id}
                        onChange={() => setNewLeaderId(member.id)}
                      />
                    )}
                    <span>{member.name}</span>
                    {member.isLeader && <span className={styles.leaderBadge}>방장</span>}
                  </div>
                ))}
              </div>
              {managingGroupId === group.id && (
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
              {changingLeaderGroupId === group.id && (
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
                value={activeGroup.name}
                onChange={(e) => setActiveGroup({ ...activeGroup, name: e.target.value })}
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
