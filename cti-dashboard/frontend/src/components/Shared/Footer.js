import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer>
      <a
        href="https://github.com/harshitparpe"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "#4cc9f0",
          textDecoration: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FaGithub
          style={{
            verticalAlign: "middle",
            marginRight: "6px",
          }}
        />
        @harshitparpe
      </a>
    </footer>
  );
}

export default Footer;
