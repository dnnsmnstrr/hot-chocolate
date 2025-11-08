import { Button, Form, Host, Section, Text, VStack } from '@expo/ui/swift-ui';
import * as Linking from 'expo-linking';
import { useColorScheme } from 'react-native';

function openWebApp() {
  Linking.openURL('https://progressions.expo.app/');
}

export default function SettingsPage() {
  const colorScheme = useColorScheme();

  return (
    <Host style={{ flex: 1 }} colorScheme={colorScheme}>
      <VStack spacing={16}>
        <Text size={22} weight="bold">
          Progressions
        </Text>

        <Form>
          <Section title="About">
            <Text size={16}>
              This is an experimental version of the Progressions app built with Expo UI.
            </Text>
          </Section>

          <Section title="Components">
            <VStack spacing={8}>
              <Text size={18} weight="semibold" color="#8B4513">
                @expo/ui/swift-ui
              </Text>
              <Text size={15} color="#666">
                Showcases SwiftUI primitive UI components and styling capabilities
              </Text>
            </VStack>
          </Section>

          <Section>
            <Button onPress={openWebApp}>Try web version</Button>
          </Section>
        </Form>
      </VStack>
    </Host>
  );
}
