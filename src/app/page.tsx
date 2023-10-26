import { DeviceProvider } from '@/app/context/deviceContext';
import styles from './page.module.sass';
import Index from '@/app/pages/index';
import { ThemeProvider } from '@/app/context/darkLightModeContext';

export default function Home() {
  return (
    <main className={styles.main}>
      <DeviceProvider>
        <ThemeProvider>
          <Index />
        </ThemeProvider>
      </DeviceProvider>
    </main>
  );
}
