import Navbar from "@/components/Navbar/Navbar";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar/>
    </div>
  );
}

