import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();

  const menus = [
    { id: 1, title: "권리분석" },
    { id: 2, title: "등본관리" },
    { id: 3, title: "엑셀업로드" },
    { id: 4, title: "사용자관리" },
    { id: 5, title: "게시판" },
    { id: 6, title: "설정" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="main-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-title">
            <span className="firm-name">법무법인</span>
            <span className="brand-name">淸賢</span>
          </div>
          <div className="sidebar-subtitle">
            CH Partners
          </div>
        </div>

        <nav className="sidebar-menu">
        {menus.map((menu) => (
          <button className="sidebar-menu-item" key={menu.id}>
            {menu.title}
          </button>
        ))}
      </nav>

        <div className="sidebar-user">
          <div className="profile-box">
            <div className="profile-avatar">관</div>

            <div className="profile-info">
              <strong>관리자</strong>
              <span>로그인 중</span>
            </div>
          </div>

          <button onClick={handleLogout}>로그아웃</button>
        </div>
      </aside>

      <main className="main-content">
        <div className="content-header">
          <h1>대시보드</h1>
          <p>업무 메뉴를 선택하세요.</p>
        </div>

        <div className="dashboard-grid">
          {menus.map((menu) => (
            <div className="dashboard-card" key={menu.id}>
              <div className="card-icon">{menu.icon}</div>
              <h3>{menu.title}</h3>
              <p>{menu.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default MainPage;