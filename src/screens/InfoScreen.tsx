import { StyleSheet, Text, View } from 'react-native';

export default function InfoScreen() {
  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.heading}>
        Infó
      </Text>
      <Text style={styles.body}>
        Itt találod az alkalmazás információs oldalát. VoiceOver bekapcsolva a
        lap sor "Tab bar" névvel kerül bejelentésre.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f7',
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  body: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    textAlign: 'center',
  },
});
