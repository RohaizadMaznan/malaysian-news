import Link from "next/link";
import { Toolbar } from "../components/toolbar";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className="page-container">
      <div className={styles.main}>
        <p className="text-4xl font-bold mb-2">Next.js Malaysian News App</p>

        <p>Your one stop shop for the latest news articles</p>

        <Link href="/feed/1">
          <div className="px-10 py-4 bg-blue-600 text-white rounded cursor-pointer mt-5 hover:shadow-lg">
            Get news
          </div>
        </Link>
      </div>
    </div>
  );
}
