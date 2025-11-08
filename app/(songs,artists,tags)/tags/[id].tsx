import { Host, Text, VStack } from '@expo/ui/swift-ui';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useColorScheme, useWindowDimensions } from 'react-native';

import { SongList } from '@/model';
import { padding } from '@expo/ui/swift-ui/modifiers';

export default function ArtistDetails() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const { width: windowWidth } = useWindowDimensions();

  const tags = SongList.reduce((acc: any[], song) => {
    song.tags.forEach((tag) => {
      if (!acc.includes(tag)) {
        acc.push(tag);
      }
    });
    return acc;
  }, []);

  if (!tags) {
    return (
      <Host style={{ flex: 1 }} colorScheme={colorScheme}>
        <VStack modifiers={[padding({ top: 16, leading: 16, bottom: 16, trailing: 16 })]}>
          <Text>Tag not found</Text>
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
          <Text>{String(id)}</Text>
        </VStack>
      </Host>
    </>
  );
}
