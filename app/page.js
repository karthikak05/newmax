import styles from "./page.module.scss";
import Hero from "@/components/home/Hero/Hero";
import Stat from "@/components/home/Stats/Stat";
import Products from "@/components/home/Products/Products";
import Testimonials from "@/components/home/Testimonials/Testimonials";
import Companies from "@/components/home/Companies/Companies";
import Whatsapp from "@/components/home/Whatsapp/Whatsapp";

export default function Home() {
  return (
    <div className={styles.page}>
      
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

        <div className={styles.whatsapp}>
        <Whatsapp/>
        </div>

      </main>
    </div>
  );
}

