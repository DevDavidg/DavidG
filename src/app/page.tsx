import { DeviceProvider } from '@/app/context/deviceContext';
import Index from '@/app/pages/index';
import { ThemeProvider } from '@/app/context/darkLightModeContext';

export default function Home() {
  return (
    <main>
      <DeviceProvider>
        <ThemeProvider>
          <Index />
        </ThemeProvider>
      </DeviceProvider>
    </main>
  );
}
