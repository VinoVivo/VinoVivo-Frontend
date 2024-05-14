import { FC } from "react";

import styles from "./title.module.css";

interface TitleProps {
  title?: string;
}
export const Title: FC<TitleProps> = ({ title }) => {
  return (
    <>
      <h2 className={styles.typography_title}>{title}</h2>
    </>
  );
};
