import { useNavigate } from "react-router-dom";

function StartPage() {
  const navigate = useNavigate();
  const systemText = "Rights Analysis System";

  return (
    <div className="splash-page">
      <div className="splash-logo-wrap">
        <div className="main-logo">
          <span className="law-text">法務法人</span>

          <span className="big-logo-wrap">
            <span className="big-logo">淸</span>
            <span className="big-logo">賢</span>
          </span>
        </div>

        <div className="partners-text">CH Partners</div>

        <div className="system-text">
          {systemText.split("").map((char, index) => (
            <span
              key={index}
              style={{ animationDelay: `${0.5 + index * 0.05}s` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>

        <div className="button-area">
          <button onClick={() => navigate("/login")}>로그인</button>
          <button className="sub" onClick={() => navigate("/signup")}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default StartPage;