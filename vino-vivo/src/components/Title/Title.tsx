import { FC } from "react";

import styles from "./title.module.css";

interface TitleProps {
  title: string;
  color: "violeta" | "beige" | "labelAdminColor";
  letterSpacing?: string;
}
export const Title: FC<TitleProps> = ({ title, color, letterSpacing = "widest" }) => {
  let bgColor;
  switch (color) {
    case "violeta":
      bgColor = "after:bg-violeta before:bg-violeta";
      break;
    case "beige":
      bgColor = "after:bg-beige before:bg-beige";
      break;
    case "labelAdminColor":
      bgColor = "after:bg-labelAdminColor before:bg-labelAdminColor";
      break;
    default:
      bgColor = "after:bg-beige before:bg-beige";
  }
  const titleStyle = `${styles.typography_title} text-${color} ${bgColor} tracking-${letterSpacing}`;

  return (
    <h2 className={titleStyle}>
      {title}
    </h2>
  );
};
