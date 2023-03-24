import styles from './page.module.sass';
import Index from './pages';

export default function Home() {
  return (
    <main className={styles.main}>
      <Index />
    </main>
  );
}
