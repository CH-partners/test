import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="page">
      <div className="card">
        <h2>MainPage</h2>
        <p>로그인 성공 후 접근 가능한 페이지입니다.</p>

        <button onClick={handleLogout}>로그아웃</button>
      </div>
    </div>
  );
}

export default MainPage;