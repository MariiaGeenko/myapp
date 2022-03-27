import cls from "classnames";
import styles from "./message.module.css";

export function Message({ message }) {
  return (
    <div
      className={cls(styles.message, {
        [styles.currentMessage]: message.autor === "User",
      })}
    >
      <h3> {message.autor} </h3>
      <p> {message.message} </p>
      <p> {message.date} </p>
    </div>
  );
}
