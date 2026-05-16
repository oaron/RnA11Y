import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type AccessibilityProps,
} from 'react-native';
import {
  AccessibleTabBar,
  useAccessibleTabProps,
} from 'react-native-accessibility-tabs';

const TABS = [
  { key: 'one', label: 'First', body: 'This is the first tab. Switch between tabs using the bar at the bottom.' },
  { key: 'two', label: 'Second', body: 'Second tab content. With VoiceOver on, focus enters the tab bar and announces "Tab bar".' },
  { key: 'three', label: 'Third', body: 'Third tab content. Each tab should announce as "Tab, N of 3".' },
] as const;

export default function TabsExample() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = TABS[activeIndex];

  return (
    <View style={styles.flex}>
      <View style={styles.body}>
        <Text accessibilityRole="header" style={styles.heading}>
          {active.label}
        </Text>
        <Text style={styles.text}>{active.body}</Text>
      </View>

      <AccessibleTabBar label="Tab bar" style={styles.tabBar}>
        <View style={styles.tabRow}>
          {TABS.map((tab, index) => (
            <Tab
              key={tab.key}
              label={tab.label}
              index={index}
              total={TABS.length}
              selected={index === activeIndex}
              onPress={() => setActiveIndex(index)}
            />
          ))}
        </View>
      </AccessibleTabBar>
    </View>
  );
}

interface TabProps {
  label: string;
  index: number;
  total: number;
  selected: boolean;
  onPress: () => void;
}

function Tab({ label, index, total, selected, onPress }: TabProps) {
  const a11yProps: AccessibilityProps = useAccessibleTabProps({
    index,
    total,
    selected,
    label,
  });
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

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#f5f5f7' },
  body: { flex: 1, padding: 24, justifyContent: 'center' },
  heading: { fontSize: 28, fontWeight: '700', marginBottom: 12 },
  text: { fontSize: 16, color: '#333', lineHeight: 22 },
  tabBar: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingBottom: 24,
  },
  tabRow: { flexDirection: 'row' },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  tabSelected: {
    borderTopWidth: 2,
    borderTopColor: '#007AFF',
    marginTop: -1,
  },
  tabLabel: { fontSize: 14, color: '#888', fontWeight: '500' },
  tabLabelSelected: { color: '#007AFF', fontWeight: '700' },
});
