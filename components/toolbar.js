import styles from "../styles/Toolbar.module.css";
import Link from "next/link";

export const Toolbar = () => {
  return (
    <div className={styles.main}>
      <div>
        <Link href="/">Home</Link>
      </div>
      <div>
        <Link href="/feed/1">Feed</Link>
      </div>
      <div>
        <Link href="/author">Author</Link>
      </div>
      <div>
        <Link href="https://twitter.com/rohaizadmaznan">Twitter</Link>
      </div>
    </div>
  );
};
