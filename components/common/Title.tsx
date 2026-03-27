import { useState } from "react";

export default function Title({
  normalText = "Featured",
  boldText = "Designers",
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <p
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        fontSize: "var(--font-size-2xl)",
        margin: 0,
        cursor: "pointer",
      }}
    >
      <span
        style={{
          margin: "0px 10px",
          backgroundColor: isHovered ? "red" : "black",
          borderRadius: "50%",
          width: "6px",
          height: "6px",
          display: "inline-block",
          verticalAlign: "middle",
          transition: "background-color 0.3s ease",
        }}
      />
      {normalText} <strong style={{ fontWeight: 600 }}>{boldText}</strong>
    </p>
  );
}