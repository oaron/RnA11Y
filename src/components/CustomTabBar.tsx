import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  AccessibleTabBar,
  useAccessibleTabProps,
} from 'react-native-accessibility-tabs';

interface TabProps {
  label: string;
  index: number;
  total: number;
  selected: boolean;
  onPress: () => void;
}

function Tab({ label, index, total, selected, onPress }: TabProps) {
  const a11yProps = useAccessibleTabProps({ index, total, selected, label });
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.tab, selected && styles.tabSelected]}
      {...a11yProps}
    >
      <Text
        style={[styles.tabLabel, selected && styles.tabLabelSelected]}
        accessible={false}
        importantForAccessibility="no"
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const total = state.routes.length;

  return (
    <AccessibleTabBar
      label="Tab bar"
      debug
      style={[styles.tabBar, { paddingBottom: Math.max(insets.bottom, 10) }]}
    >
      <View style={styles.tabRow}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            typeof options.title === 'string' && options.title.length > 0
              ? options.title
              : route.name;
          const isSelected = index === state.index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isSelected && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <Tab
              key={route.key}
              label={label}
              index={index}
              total={total}
              selected={isSelected}
              onPress={onPress}
            />
          );
        })}
      </View>
    </AccessibleTabBar>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
    paddingTop: 8,
  },
  tabRow: { flexDirection: 'row' },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    minHeight: 44,
  },
  tabSelected: {
    borderTopWidth: 2,
    borderTopColor: '#007AFF',
    marginTop: -1,
  },
  tabLabel: { fontSize: 14, color: '#888', fontWeight: '500' },
  tabLabelSelected: { color: '#007AFF', fontWeight: '700' },
});
