import Navbar from "@/components/Navbar/Navbar";
import styles from "./page.module.scss";
import Hero from "@/components/Hero/Hero";
import Stat from "@/components/Stats/Stat";
import Products from "@/components/Products/Products";
import Testimonials from "@/components/Testimonials/Testimonials";
import Companies from "@/components/Companies/Companies";

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
          <Companies/>
          <Testimonials/>
        </section>

      </main>
    </div>
  );
}

