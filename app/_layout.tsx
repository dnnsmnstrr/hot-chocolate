import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import { StatusBar } from 'expo-status-bar';

import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <NativeTabs>
        <NativeTabs.Trigger name="(songs)">
          <Icon sf={{ default: 'music.mic.circle', selected: 'music.mic.circle.fill' }} />
          <Label>Songs</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="(tags)">
          <Icon sf={{ default: 'tag.circle', selected: 'tag.circle.fill' }} />
          <Label>Tags</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="(settings)">
          <Icon sf={{ default: 'gear.circle', selected: 'gear.circle.fill' }} />
          <Label>Settings</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
