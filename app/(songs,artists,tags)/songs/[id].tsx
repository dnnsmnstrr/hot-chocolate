import { HStack, Host, Image, Spacer, Text, VStack } from '@expo/ui/swift-ui';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useColorScheme } from 'react-native';

import { SongList } from '@/model';
import { padding } from '@expo/ui/swift-ui/modifiers';

const sessions = [
  {
    songId: '1',
    date: '2024-01-15T10:00:00Z',
    duration: 300,
  },
  {
    songId: '2',
    date: '2024-02-20T14:30:00Z',
    duration: 250,
  },
];

export default function SongDetails() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();

  const song = SongList.find((item) => String(item.id) === String(id));
  const lastSession = sessions.findLast((session) => session.songId === id);
  const [isFavourite, setIsFavourite] = useState(false);

  if (!song) {
    return (
      <Host style={{ flex: 1 }} colorScheme={colorScheme}>
        <VStack modifiers={[padding({ top: 16, leading: 16, bottom: 16, trailing: 16 })]}>
          <Text>song not found</Text>
        </VStack>
      </Host>
    );
  }

  const title = `${song.name}`;
  const lastPlay = `${lastSession?.date ? formatDate(lastSession?.date) : 'Not played yet'}`;
  return (
    <>
      <Stack.Screen options={{ title }} />
      <Host style={{ flex: 1 }} colorScheme={colorScheme}>
        <VStack
          modifiers={[padding({ top: 16, leading: 16, bottom: 16, trailing: 16 })]}
          spacing={16}
          alignment="leading">
          <HStack spacing={8}>
            <Text size={24} weight="bold">
              {title}
            </Text>
            <Image
              systemName={isFavourite ? 'star.fill' : 'star'}
              size={18}
              color={isFavourite ? '#FFD700' : 'secondary'}
              onPress={() => setIsFavourite(!isFavourite)}
            />
          </HStack>

          <Text size={14} color="secondary">
            {lastPlay}
          </Text>

          <Text size={16}>{song.lyrics}</Text>
          <Spacer />
        </VStack>
      </Host>
    </>
  );
}

function formatDate(isoDate: string) {
  // return new Date(isoDate).toLocaleDateString(['de-DE', 'en-US']);
  return isoDate.split('T')[0];
}
