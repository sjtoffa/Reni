import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CommunityScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Community</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F7F4', alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 18, color: '#1C1C1E', fontWeight: '600' },
});
