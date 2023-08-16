import { ThemeProvider } from './context/darkLightModeContext';
import styles from './page.module.sass';
import Index from './pages';

export default function Home() {
  return (
    <main className={styles.main}>
      <ThemeProvider>
        <Index />
      </ThemeProvider>
    </main>
  );
}
