import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Svg, { Path, Circle, Line, Rect, G, ClipPath } from 'react-native-svg';

const CONVOS = [
  {
    id: '1', name: 'maya_l', preview: "I know right, it can be so hard to explain to people who...",
    time: '2m', unread: 3, avatarBg: '#F2E2E0',
  },
  {
    id: '2', name: 'nina_w', preview: "Thanks for connecting! Are you based in Toronto?",
    time: '1h', unread: 0, avatarBg: '#E8EEF7',
  },
  {
    id: '3', name: 'serene_k', preview: "Definitely worth trying, I've been on it for 3 months...",
    time: '3d', unread: 0, avatarBg: '#E8F3EE',
  },
];

function Avatar({ bg, size = 46 }: { bg: string; size?: number }) {
  return (
    <View style={[styles.avatarCircle, { width: size, height: size, borderRadius: size / 2, backgroundColor: bg }]} />
  );
}

export default function MessagesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2} strokeLinecap="round">
            <Line x1="12" y1="5" x2="12" y2="19" />
            <Line x1="5" y1="12" x2="19" y2="12" />
          </Svg>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchBar}>
        <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#B0B7C3" strokeWidth={2} strokeLinecap="round">
          <Circle cx="11" cy="11" r="8" />
          <Line x1="21" y1="21" x2="16.65" y2="16.65" />
        </Svg>
        <Text style={styles.searchText}>Search messages...</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Conversation list */}
        {CONVOS.map(convo => (
          <TouchableOpacity key={convo.id} style={styles.convItem} activeOpacity={0.7}>
            <Avatar bg={convo.avatarBg} />
            <View style={styles.convInfo}>
              <Text style={[styles.convName, convo.unread > 0 && styles.convNameUnread]}>{convo.name}</Text>
              <Text style={[styles.convPreview, convo.unread > 0 && styles.convPreviewUnread]} numberOfLines={1}>
                {convo.preview}
              </Text>
            </View>
            <View style={styles.convRight}>
              <Text style={styles.convTime}>{convo.time}</Text>
              {convo.unread > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{convo.unread}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}

        {/* Accept connection CTA */}
        <View style={styles.ctaWrap}>
          <View style={styles.ctaIcon}>
            <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#D4A09A" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <Circle cx="12" cy="3.5" r="2" />
              <Circle cx="19" cy="16" r="2" />
              <Circle cx="5" cy="16" r="2" />
              <Path d="M14.91 4.01 A8.5 8.5 0 0 1 20.37 13.48" />
              <Path d="M17.46 18.51 A8.5 8.5 0 0 1 6.54 18.51" />
              <Path d="M3.63 13.48 A8.5 8.5 0 0 1 9.09 4.01" />
            </Svg>
          </View>
          <Text style={styles.ctaText}>Accept a connection to start chatting</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F7F4' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 4, paddingBottom: 10,
  },
  title: { fontSize: 22, fontWeight: '700', color: '#1C1C1E' },
  addBtn: { width: 28, height: 28, alignItems: 'center', justifyContent: 'center' },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    marginHorizontal: 16, marginBottom: 8,
    height: 38, backgroundColor: '#EBEBEB', borderRadius: 10, paddingHorizontal: 12,
  },
  searchText: { fontSize: 13, color: '#B0B7C3' },
  convItem: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: '#F0EFED',
    backgroundColor: '#FFFFFF',
  },
  avatarCircle: {},
  convInfo: { flex: 1 },
  convName: { fontSize: 14, fontWeight: '500', color: '#1C1C1E', marginBottom: 2 },
  convNameUnread: { fontWeight: '700' },
  convPreview: { fontSize: 12, color: '#9CA3AF' },
  convPreviewUnread: { color: '#6B7280', fontWeight: '500' },
  convRight: { alignItems: 'flex-end', gap: 4 },
  convTime: { fontSize: 11, color: '#9CA3AF' },
  badge: {
    backgroundColor: '#BE7B74', borderRadius: 10,
    minWidth: 18, height: 18, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4,
  },
  badgeText: { fontSize: 10, fontWeight: '700', color: '#FFFFFF' },
  ctaWrap: { alignItems: 'center', paddingVertical: 28, paddingHorizontal: 20 },
  ctaIcon: {
    width: 48, height: 48, borderRadius: 14,
    backgroundColor: '#F2E2E0', alignItems: 'center', justifyContent: 'center', marginBottom: 10,
  },
  ctaText: { fontSize: 12, fontWeight: '500', color: '#6B7280', textAlign: 'center' },
});
