import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Button, ScrollView, Text, useColorScheme, View } from 'react-native';

import { SongList } from '@/model';

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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>song not found</Text>
      </View>
    );
  }

  const title = `${song.name}`;
  const lastPlay = `${lastSession?.date ? formatDate(lastSession?.date) : 'Not played yet'}`;
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 80 }}>
      <Stack.Screen options={{ title }} />

      <ScrollView>
        <View style={{ paddingTop: 16, paddingLeft: 16, paddingBottom: 16, paddingRight: 16 }}>
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{`${title} by ${song.artist}`}</Text>
            <Button
              onPress={() => setIsFavourite(!isFavourite)}
              style={{ fontSize: 18 }}
              title={isFavourite ? '⭐' : '☆'}
            />
          </View>

          <Text
            style={{
              fontSize: 14,
              color: colorScheme === 'dark' ? '#999' : '#666',
              marginTop: 16,
            }}>
            {lastPlay}
          </Text>
        </View>
        <View style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 92 }}>
          <Text>{song.lyrics}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

function formatDate(isoDate: string) {
  // return new Date(isoDate).toLocaleDateString(['de-DE', 'en-US']);
  return isoDate.split('T')[0];
}
