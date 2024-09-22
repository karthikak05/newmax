import Navbar from "@/components/Navbar/Navbar";
import styles from "./page.module.scss";
import Hero from "@/components/Hero/Hero";
import Stat from "@/components/Stats/Stat";
import Products from "@/components/Products/Products";
import Testimonials from "@/components/Testimonials/Testimonials";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar/>
      
      <main>
        
        <section>
          <Hero/>
        </section>

        <section>
          <Stat/>
        </section>

        <section>
          <Products/>
        </section>

        <section>
          <Testimonials/>
        </section>

      </main>
    </div>
  );
}

