import Navbar from "@/components/Navbar/Navbar";
import styles from "./page.module.scss";
import Hero from "@/components/Hero/Hero";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar/>
      <main>
      <section>
        <Hero/>
      </section>
      </main>
    </div>
  );
}

