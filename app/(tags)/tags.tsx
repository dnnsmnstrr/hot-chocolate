import { Button, HStack, Host, Image, List, Picker, Spacer, Text } from '@expo/ui/swift-ui';
import { fixedSize, frame, padding } from '@expo/ui/swift-ui/modifiers';
import { Link, Stack } from 'expo-router';
import { useState } from 'react';
import { useColorScheme } from 'react-native';

export default function Tags() {
  const colorScheme = useColorScheme();
  const [filter, setFilter] = useState({
    search: '',
    sortBy: 'name',
    direction: 'asc',
    favorites: false,
  });

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Tags',
          headerLargeTitle: true,
          headerSearchBarOptions: {
            hideWhenScrolling: true,
          },
          headerRight: () => {
            return (
              <Host matchContents>
                <HStack
                  modifiers={[
                    // iOS 26 header buttons have height of 36,
                    // so we set it to 36 so it aligns vertically center
                    frame({
                      height: 36,
                      width: 220,
                    }),
                    // Picker has a default padding left and right so we add padding left here
                    // to make it look horizontally center
                    padding({ leading: 12 }),
                    fixedSize(),
                  ]}
                  alignment="center">
                  <Text>Sort by:</Text>
                  <Picker
                    variant="menu"
                    label="Sort by:"
                    options={['Name', 'Count']}
                    selectedIndex={0}
                    onOptionSelected={({ nativeEvent: { index } }) => {
                      setFilter({ ...filter, sortBy: index === 0 ? 'name' : 'count' });
                    }}
                  />
                </HStack>
              </Host>
            );
          },
        }}
      />
      <Host style={{ flex: 1 }} colorScheme={colorScheme}>
        <List scrollEnabled>
          {[{ id: 'favorites', name: 'Favorites' }].map((item) => (
            <Link href={`/tags/${item.id}`} asChild key={item.id}>
              <Button>
                <HStack spacing={8}>
                  <Text size={14} color="primary">{`${item.name}`}</Text>
                  <Spacer />
                  <Text size={14} color="secondary">
                    More coming soon...
                  </Text>
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
