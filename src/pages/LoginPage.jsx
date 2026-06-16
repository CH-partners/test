import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력하세요.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail || "로그인 실패");
        return;
      }

      localStorage.setItem("token", data.access_token);
      navigate("/main");
    } catch (error) {
      alert("서버 연결 실패");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>로그인</h2>

        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>로그인</button>

        <button className="sub" onClick={() => navigate("/")}>
          처음으로
        </button>
      </div>
    </div>
  );
}

export default LoginPage;