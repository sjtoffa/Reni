import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, Dimensions, Animated,
} from 'react-native';
import Svg, { Path, Circle, Rect, Line } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const POSTS = [
  { id: '1', title: 'Winter PMDD is a different beast entirely', tag: 'Experiences', tagColor: '#A86860', tagBg: '#F2E2E0', cardBg: '#F2E2E0', likes: 24, comments: 8, saves: 12, time: '2 days ago' },
  { id: '2', title: '5 things that actually helped my luteal phase', tag: 'Treatments', tagColor: '#3D7A60', tagBg: '#E8F3EE', cardBg: '#E8F3EE', likes: 41, comments: 15, saves: 27, time: '5 days ago' },
  { id: '3', title: 'Has anyone tried continuous SSRIs for PMDD?', tag: 'Questions', tagColor: '#2E6FA8', tagBg: '#EEF7FF', cardBg: '#EEF7FF', likes: 18, comments: 22, saves: 9, time: '1 week ago' },
  { id: '4', title: 'Reminder: your feelings in luteal are valid', tag: 'Self-Love', tagColor: '#A86860', tagBg: '#F2E2E0', cardBg: '#F2E2E0', likes: 63, comments: 31, saves: 44, time: '2 weeks ago' },
  { id: '5', title: 'New study on progesterone sensitivity', tag: 'Resources', tagColor: '#2E6FA8', tagBg: '#EEF7FF', cardBg: '#EEF7FF', likes: 36, comments: 11, saves: 19, time: '3 weeks ago' },
];

const SAVED = [
  { id: '1', title: 'Winter PMDD is a different beast entirely', tag: 'Experiences', tagColor: '#A86860', bg: '#F2E2E0' },
  { id: '2', title: '5 things that actually helped my luteal phase', tag: 'Treatments', tagColor: '#3D7A60', bg: '#E8F3EE' },
  { id: '3', title: 'Has anyone tried continuous SSRIs?', tag: 'Questions', tagColor: '#2E6FA8', bg: '#EEF7FF' },
  { id: '4', title: 'New study on progesterone sensitivity', tag: 'Resources', tagColor: '#2E6FA8', bg: '#EEF7FF' },
  { id: '5', title: 'Reminder: your feelings in luteal are valid', tag: 'Self-Love', tagColor: '#A86860', bg: '#F2E2E0' },
  { id: '6', title: 'Seed cycling — week 3 update', tag: 'Treatments', tagColor: '#3D7A60', bg: '#E8F3EE' },
  { id: '7', title: 'The grief of losing yourself every month', tag: 'Experiences', tagColor: '#A86860', bg: '#F2E2E0' },
  { id: '8', title: 'Tracking luteal rage — my method', tag: 'Tracking', tagColor: '#2E6FA8', bg: '#EEF7FF' },
  { id: '9', title: 'First symptom-free luteal in 2 years', tag: 'Symptoms', tagColor: '#3D7A60', bg: '#E8F3EE' },
];

function SmallIcon({ d, size = 11 }: { d: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2} strokeLinecap="round">
      <Path d={d} />
    </Svg>
  );
}

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;

  function switchTab(idx: number) {
    setActiveTab(idx);
    Animated.timing(slideAnim, {
      toValue: -idx * SCREEN_WIDTH,
      duration: 280,
      useNativeDriver: true,
    }).start();
  }

  const tabWidth = SCREEN_WIDTH;

  return (
    <SafeAreaView style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Text style={styles.topTitle}>Profile</Text>
        <TouchableOpacity>
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
            <Circle cx="12" cy="12" r="3"/>
          </Svg>
        </TouchableOpacity>
      </View>

      {/* Avatar + info row */}
      <View style={styles.infoRow}>
        <View style={styles.avatarWrap}>
          <Svg width={72} height={72} viewBox="0 0 72 72">
            <Rect width="72" height="72" fill="#F2E2E0" />
            <Circle cx="36" cy="36" r="26" fill="none" stroke="#BE7B74" strokeWidth="3.5" />
            <Circle cx="36" cy="36" r="16" fill="none" stroke="#D4A09A" strokeWidth="3" />
            <Circle cx="36" cy="36" r="8" fill="#BE7B74" />
          </Svg>
          <TouchableOpacity style={styles.avatarEdit}>
            <Svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round">
              <Path d="M12 20h9" />
              <Path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </Svg>
          </TouchableOpacity>
        </View>
        <View style={styles.infoRight}>
          <Text style={styles.displayName}>Maya</Text>
          <Text style={styles.handle}>@maya_l · Toronto</Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statNum}>5</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNum}>34</Text>
              <Text style={styles.statLabel}>Connections</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Tab row */}
      <View style={styles.tabRow}>
        {['About You', 'Posts', 'Saved'].map((tab, i) => (
          <TouchableOpacity key={tab} style={styles.tabItem} onPress={() => switchTab(i)}>
            <Text style={[styles.tabLabel, activeTab === i && styles.tabLabelActive]} onPress={() => switchTab(i)}>{tab}</Text>
            {activeTab === i && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Sliding panels */}
      <View style={styles.panelContainer}>
        <Animated.View style={[styles.panelTrack, { transform: [{ translateX: slideAnim }] }]}>

          {/* Panel 0: About You */}
          <ScrollView style={[styles.panel, { width: tabWidth }]} showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About you</Text>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Bio</Text>
                <Text style={styles.fieldValue}>Living with PMDD since 2019. Advocate for better awareness.</Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Current treatments</Text>
                <Text style={styles.fieldValue}>SSRIs, seed cycling, low-sugar diet, daily walks</Text>
              </View>
              <View style={styles.locationRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.toggleLabel}>Show on globe</Text>
                  <Text style={styles.toggleSub}>City-level only · Toronto</Text>
                </View>
                <View style={styles.toggle}>
                  <View style={styles.toggleThumb} />
                </View>
              </View>
            </View>
            <View style={{ height: 32 }} />
          </ScrollView>

          {/* Panel 1: Posts */}
          <ScrollView style={[styles.panel, { width: tabWidth }]} showsVerticalScrollIndicator={false}>
            {POSTS.map(post => (
              <TouchableOpacity key={post.id} style={styles.postRow} activeOpacity={0.7}>
                <View style={[styles.postThumb, { backgroundColor: post.cardBg }]}>
                  <View style={[styles.postThumbTag, { backgroundColor: 'rgba(255,255,255,0.8)' }]}>
                    <Text style={[styles.postThumbTagText, { color: post.tagColor }]}>{post.tag}</Text>
                  </View>
                </View>
                <View style={styles.postInfo}>
                  <View style={styles.postTitleRow}>
                    <Text style={styles.postTitle} numberOfLines={2}>{post.title}</Text>
                    <Text style={styles.postTime}>{post.time}</Text>
                  </View>
                  <View style={styles.postStats}>
                    <Text style={styles.postStat}>♡ {post.likes}</Text>
                    <Text style={styles.postStat}>◻ {post.comments}</Text>
                    <Text style={styles.postStat}>⌖ {post.saves}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
            <View style={{ height: 32 }} />
          </ScrollView>

          {/* Panel 2: Saved grid */}
          <ScrollView style={[styles.panel, { width: tabWidth }]} showsVerticalScrollIndicator={false}>
            <View style={styles.savedGrid}>
              {SAVED.map(item => (
                <TouchableOpacity key={item.id} style={[styles.savedCell, { backgroundColor: item.bg }]} activeOpacity={0.7}>
                  <Text style={styles.savedTitle} numberOfLines={3}>{item.title}</Text>
                  <View style={styles.savedTagWrap}>
                    <Text style={[styles.savedTagText, { color: item.tagColor }]}>{item.tag}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <View style={{ height: 32 }} />
          </ScrollView>

        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const CELL_SIZE = (SCREEN_WIDTH - 4) / 3;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F7F4' },
  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 4, paddingBottom: 8,
  },
  topTitle: { fontSize: 18, fontWeight: '700', color: '#1C1C1E' },
  infoRow: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 16,
    paddingHorizontal: 16, paddingBottom: 12,
  },
  avatarWrap: { position: 'relative', flexShrink: 0 },
  avatarEdit: {
    position: 'absolute', bottom: 0, right: 0,
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: '#BE7B74', alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#F8F7F4',
  },
  infoRight: { flex: 1, paddingTop: 4 },
  displayName: { fontSize: 17, fontWeight: '700', color: '#1C1C1E', marginBottom: 2 },
  handle: { fontSize: 12, color: '#6B7280', marginBottom: 8 },
  statsRow: { flexDirection: 'row', gap: 14 },
  stat: { flexDirection: 'row', alignItems: 'baseline', gap: 3 },
  statNum: { fontSize: 13, fontWeight: '700', color: '#1C1C1E' },
  statLabel: { fontSize: 11, color: '#6B7280' },
  tabRow: {
    flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#EBEBEB',
    backgroundColor: '#F8F7F4',
  },
  tabItem: { flex: 1, alignItems: 'center', paddingVertical: 10 },
  tabLabel: { fontSize: 12, fontWeight: '500', color: '#6B7280' },
  tabLabelActive: { color: '#BE7B74', fontWeight: '600' },
  tabIndicator: {
    position: 'absolute', bottom: 0, height: 2,
    width: '60%', backgroundColor: '#BE7B74', borderRadius: 2,
  },
  panelContainer: { flex: 1, overflow: 'hidden' },
  panelTrack: {
    flexDirection: 'row', flex: 1,
  },
  panel: { flexShrink: 0 },

  // About You
  section: { padding: 16 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#1C1C1E', marginBottom: 12 },
  field: { marginBottom: 14 },
  fieldLabel: { fontSize: 11, fontWeight: '500', color: '#6B7280', marginBottom: 3 },
  fieldValue: { fontSize: 13, color: '#1C1C1E', lineHeight: 18 },
  locationRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFFFFF', borderRadius: 12, padding: 12,
    borderWidth: 1, borderColor: '#EBEBEB', marginTop: 4,
  },
  toggleLabel: { fontSize: 13, fontWeight: '500', color: '#1C1C1E' },
  toggleSub: { fontSize: 11, color: '#6B7280', marginTop: 1 },
  toggle: {
    width: 44, height: 26, borderRadius: 13,
    backgroundColor: '#BE7B74', justifyContent: 'center', paddingHorizontal: 2,
  },
  toggleThumb: {
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: '#FFFFFF', alignSelf: 'flex-end',
  },

  // Posts
  postRow: {
    flexDirection: 'row', gap: 12, padding: 14, paddingHorizontal: 16,
    borderBottomWidth: 1, borderBottomColor: '#F0EFED',
  },
  postThumb: {
    width: 64, height: 64, borderRadius: 10, flexShrink: 0,
    justifyContent: 'flex-end', padding: 6,
  },
  postThumbTag: { alignSelf: 'flex-start', borderRadius: 4, paddingHorizontal: 5, paddingVertical: 1 },
  postThumbTagText: { fontSize: 7, fontWeight: '700' },
  postInfo: { flex: 1, paddingTop: 2 },
  postTitleRow: { flexDirection: 'row', gap: 8, marginBottom: 6 },
  postTitle: { flex: 1, fontSize: 13, fontWeight: '600', color: '#1C1C1E', lineHeight: 18 },
  postTime: { fontSize: 10, color: '#9CA3AF', paddingTop: 2, flexShrink: 0 },
  postStats: { flexDirection: 'row', gap: 10 },
  postStat: { fontSize: 10, color: '#6B7280' },

  // Saved grid
  savedGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 2, padding: 1 },
  savedCell: {
    width: CELL_SIZE, height: CELL_SIZE,
    justifyContent: 'flex-end', padding: 7,
  },
  savedTitle: { fontSize: 8, fontWeight: '600', color: '#1C1C1E', lineHeight: 12, marginBottom: 4 },
  savedTagWrap: { backgroundColor: 'rgba(255,255,255,0.85)', borderRadius: 4, alignSelf: 'flex-start', paddingHorizontal: 5, paddingVertical: 1 },
  savedTagText: { fontSize: 7, fontWeight: '700' },
});
