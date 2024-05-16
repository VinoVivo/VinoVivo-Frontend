import { FC } from "react";

import styles from "./title.module.css";

interface TitleProps {
  title?: string;
  color?: string;
}
export const Title: FC<TitleProps> = ({ title, color }) => {
  let bgColor =
    color == "violeta"
      ? "after:bg-violeta before:bg-violeta"
      : "after:bg-beige before:bg-beige";
  return (
    <>
      <h2 className={`${styles.typography_title} text-${color} ${bgColor}`}>
        {title}
      </h2>
    </>
  );
};
