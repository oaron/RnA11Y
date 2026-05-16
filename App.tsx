import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RotorExample from './src/RotorExample';
import TabsExample from './src/TabsExample';

type Screen = 'home' | 'rotor' | 'tabs';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      {screen !== 'home' && (
        <View style={styles.header}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Back"
            onPress={() => setScreen('home')}
            style={styles.back}
          >
            <Text style={styles.backText}>‹ Back</Text>
          </TouchableOpacity>
        </View>
      )}
      {screen === 'home' && <Home onSelect={setScreen} />}
      {screen === 'rotor' && <RotorExample />}
      {screen === 'tabs' && <TabsExample />}
    </SafeAreaView>
  );
}

function Home({ onSelect }: { onSelect: (s: Screen) => void }) {
  return (
    <View style={styles.home}>
      <Text accessibilityRole="header" style={styles.title}>
        RN Accessibility examples
      </Text>
      <TouchableOpacity
        accessibilityRole="button"
        onPress={() => onSelect('rotor')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Rotor example</Text>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityRole="button"
        onPress={() => onSelect('tabs')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Tabs example</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f5f5f7' },
  header: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#d0d0d0',
    backgroundColor: '#fff',
  },
  back: { padding: 8 },
  backText: { fontSize: 17, color: '#007AFF' },
  home: { flex: 1, padding: 24, gap: 16, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 24, textAlign: 'center' },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 17, fontWeight: '600' },
});
