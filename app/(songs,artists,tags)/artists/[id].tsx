import { Host, Text, VStack } from '@expo/ui/swift-ui';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useColorScheme, useWindowDimensions } from 'react-native';

import { SongList } from '@/model';
import { frame, padding } from '@expo/ui/swift-ui/modifiers';

export default function ArtistDetails() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const { width: windowWidth } = useWindowDimensions();

  const artist = SongList.find((item) => item.id === Number(id));

  if (!artist) {
    return (
      <Host style={{ flex: 1 }} colorScheme={colorScheme}>
        <VStack modifiers={[padding({ top: 16, leading: 16, bottom: 16, trailing: 16 })]}>
          <Text>Artist not found</Text>
        </VStack>
      </Host>
    );
  }
  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerLargeStyle: {
            backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
          },
        }}
      />
      <Host style={{ flex: 1 }} colorScheme={colorScheme}>
        <VStack alignment="leading">
          <VStack
            modifiers={[
              padding({ top: 16, leading: 16, bottom: 16, trailing: 16 }),
              frame({ maxWidth: windowWidth, alignment: 'leading' }),
            ]}
            alignment="leading"
            spacing={4}
            backgroundColor={colorScheme === 'dark' ? 'black' : 'white'}>
            <Text size={28}>{artist.name}</Text>
          </VStack>
        </VStack>
      </Host>
    </>
  );
}
