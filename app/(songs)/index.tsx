import {
  Button,
  ContextMenu,
  HStack,
  Host,
  Image,
  List,
  Spacer,
  Text,
  VStack,
} from '@expo/ui/swift-ui';
import { Link, Stack } from 'expo-router';
import { useState } from 'react';
import { useColorScheme } from 'react-native';

import { SongList } from '@/model';
import { frame } from '@expo/ui/swift-ui/modifiers';

export default function Index() {
  const colorScheme = useColorScheme();
  const [filter, setFilter] = useState({
    search: '',
    sortBy: 'name',
    direction: 'asc',
    favorites: false,
  });

  const sortingFunction = (a: any, b: any) => {
    if (!a[filter.sortBy] || !b[filter.sortBy] || filter.sortBy === 'lastPlay') {
      return 0;
    }
    if (filter.direction === 'desc') {
      return b[filter.sortBy].localeCompare(a[filter.sortBy]);
    }
    return a[filter.sortBy].localeCompare(b[filter.sortBy]);
  };
  const filterFunction = (item: any) => {
    if (filter.favorites && !item.isFavourite) {
      return false;
    }
    if (
      filter.search &&
      !item.name.toLowerCase().includes(filter.search.toLowerCase()) &&
      !item.artist.toLowerCase().includes(filter.search.toLowerCase())
    ) {
      return false;
    }
    return true;
  };
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Songs',
          headerLargeTitle: true,
          headerSearchBarOptions: {
            onChangeText: (event) => {
              const {
                nativeEvent: { text },
              } = event;
              setFilter({ ...filter, search: text });
            },
          },
          headerRight: () => {
            return (
              <Host matchContents>
                <ContextMenu>
                  <ContextMenu.Items>
                    <Button onPress={() => setFilter({ ...filter, sortBy: 'name' })}>
                      Sort by Song
                    </Button>
                    <Button onPress={() => setFilter({ ...filter, sortBy: 'artist' })}>
                      Sort by Artist
                    </Button>
                    <Button onPress={() => setFilter({ ...filter, sortBy: 'lastPlay' })}>
                      Sort by Last Play
                    </Button>
                    <Button onPress={() => setFilter({ ...filter, favorites: !filter.favorites })}>
                      {filter.favorites ? 'Show All Songs' : 'Show Favourites Only'}
                    </Button>
                  </ContextMenu.Items>
                  <ContextMenu.Trigger>
                    {/* iOS 26 header buttons have height and width of 36, so we add static width 
                    and height to keep the entire area tappable */}
                    <HStack modifiers={[frame({ width: 80, height: 36 })]}>
                      <Image systemName="line.3.horizontal.decrease.circle" size={28} />
                      <Text>{filter.sortBy}</Text>
                    </HStack>
                  </ContextMenu.Trigger>
                </ContextMenu>
              </Host>
            );
          },
        }}
      />
      <Host style={{ flex: 1 }} colorScheme={colorScheme}>
        <List>
          {SongList.filter(filterFunction)
            .sort(sortingFunction)
            .map((item, index) => (
              <Link href={`/songs/${item.id}`} asChild key={index}>
                <Button>
                  <HStack>
                    <VStack alignment="leading" spacing={4}>
                      <Text size={14} color="primary">
                        {item.name.trim()}
                      </Text>
                      <Text size={12} color="secondary">
                        {item.artist.trim()}
                      </Text>
                    </VStack>
                    <Spacer />
                    <Image systemName="chevron.right" size={14} color="secondary" />
                  </HStack>
                </Button>
              </Link>
            ))}
        </List>
      </Host>
    </>
  );
}
