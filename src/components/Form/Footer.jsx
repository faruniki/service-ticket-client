import "../../style.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-left">
        <span style={{ fontWeight: 600, color: "#1d1d1d" }}>
          Copyright © {currentYear}{" "}
          <span style={{ color: "#3cbc4d" }}>
            Starcore Analytics
          </span>
        </span>{" "}
        <span style={{ color: "1d1d1d" }}>All rights reserved.</span>
      </div>{" "}
      <div className="footer-right">
        <p>Version 1.0</p>
      </div>
    </footer>
  );
}
