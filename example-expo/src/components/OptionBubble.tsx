import React, { FC } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
  option: string;
  selected: boolean;
  selectOption: () => void;
}

export const OptionBubble: FC<Props> = ({ option, selected, selectOption }) => {
  return (
    <View style={styles.touchable}>
      <Pressable onPress={selectOption} android_ripple={{ color: '#ddd' }}>
        <View style={[styles.item, selected && styles.itemSelected]}>
          <Text style={[styles.title, selected && styles.titleSelected]}>{option}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  item: {
    backgroundColor: '#eee',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  itemSelected: {
    backgroundColor: '#ff9800',
  },
  title: {
    color: '#1b1918',
    fontSize: 14,
    lineHeight: 18.5,
  },
  titleSelected: {
    color: '#fff',
  },
});
