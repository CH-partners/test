import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password || !passwordCheck) {
      alert("모든 항목을 입력하세요.");
      return;
    }

    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail || "회원가입 실패");
        return;
      }

      alert("회원가입 성공");
      navigate("/login");
    } catch (error) {
      alert("서버 연결 실패");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>회원가입</h2>

        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <input
          type="password"
          placeholder="비밀번호 확인"
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

        <button onClick={handleSignup}>회원가입</button>

        <button className="sub" onClick={() => navigate("/")}>
          처음으로
        </button>
      </div>
    </div>
  );
}

export default SignupPage;