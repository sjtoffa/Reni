import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, SafeAreaView,
} from 'react-native';
import Svg, { Path, Circle, Line, Polyline } from 'react-native-svg';

const PILLS = ['All', 'Self-Love', 'Symptoms', 'Treatments', 'Questions', 'Experiences', 'Tracking', 'Resources', 'Birth Control', 'Medication', 'Research', 'Other'];

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  Experience:  { bg: '#F2E2E0', text: '#A86860' },
  Question:    { bg: '#E8F3EE', text: '#3E8A68' },
  Treatment:   { bg: '#E8EEF7', text: '#3A6BAA' },
  'Self-Love': { bg: '#FEF3C7', text: '#92600A' },
};

const POSTS = [
  {
    id: '1', author: 'maya_l', tag: 'Experience', time: '2h',
    title: 'Finally found something that actually helps with brain fog',
    body: "Three months in and I'm starting to see real patterns. The week before really is different...",
    likes: 24, comments: 8, liked: true,
  },
  {
    id: '2', author: 'serene_k', tag: 'Question', time: '5h',
    title: 'Anyone tried agnus castus / vitex?',
    body: 'Doctor mentioned it as a possibility. Curious if anyone here has experience with herbal options...',
    likes: 11, comments: 17, liked: false,
  },
  {
    id: '3', author: 'lena_r', tag: 'Treatment', time: '1d',
    title: '6 months on SSRIs — here\'s what changed',
    body: 'I genuinely didn\'t think this day would come. Sharing because I want others to know it\'s possible.',
    likes: 61, comments: 22, liked: false,
  },
  {
    id: '4', author: 'noor_h', tag: 'Experience', time: '1d',
    title: 'Telling my partner about PMDD — how it actually went',
    body: 'I was so scared of this conversation. But having the language to explain it made all the difference...',
    likes: 48, comments: 19, liked: false,
  },
  {
    id: '5', author: 'zara_m', tag: 'Self-Love', time: '2d',
    title: 'Small things that get me through the luteal phase',
    body: 'Hot water bottle, no social plans, one good show. Building a toolkit that actually works for me.',
    likes: 33, comments: 12, liked: false,
  },
];

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <Svg width={13} height={13} viewBox="0 0 24 24" fill={filled ? '#BE7B74' : 'none'} stroke={filled ? '#BE7B74' : '#6B7280'} strokeWidth={2}>
      <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </Svg>
  );
}

function CommentIcon() {
  return (
    <Svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2} strokeLinecap="round">
      <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </Svg>
  );
}

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <Svg width={13} height={13} viewBox="0 0 24 24" fill={filled ? '#BE7B74' : 'none'} stroke={filled ? '#BE7B74' : '#6B7280'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </Svg>
  );
}

function ConnectionIcon() {
  return (
    <Svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="12" cy="3.5" r="2" />
      <Circle cx="19" cy="16" r="2" />
      <Circle cx="5" cy="16" r="2" />
      <Path d="M14.91 4.01 A8.5 8.5 0 0 1 20.37 13.48" />
      <Path d="M17.46 18.51 A8.5 8.5 0 0 1 6.54 18.51" />
      <Path d="M3.63 13.48 A8.5 8.5 0 0 1 9.09 4.01" />
    </Svg>
  );
}

export default function DiscoverScreen() {
  const [activePill, setActivePill] = useState('All');
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>(
    Object.fromEntries(POSTS.map(p => [p.id, p.liked]))
  );
  const [savedPosts, setSavedPosts] = useState<Record<string, boolean>>({});

  function toggleLike(id: string) {
    setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }));
  }

  function toggleSave(id: string) {
    setSavedPosts(prev => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Discover</Text>
        <View style={styles.searchBar}>
          <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#B0B7C3" strokeWidth={2} strokeLinecap="round">
            <Circle cx="11" cy="11" r="8" />
            <Line x1="21" y1="21" x2="16.65" y2="16.65" />
          </Svg>
          <Text style={styles.searchText}>Search posts...</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillsScroll} contentContainerStyle={styles.pillsContent}>
          {PILLS.map(pill => (
            <TouchableOpacity
              key={pill}
              style={[styles.pill, activePill === pill && styles.pillActive]}
              onPress={() => setActivePill(pill)}
            >
              <Text style={[styles.pillText, activePill === pill && styles.pillTextActive]}>{pill}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Feed */}
      <ScrollView style={styles.feed} showsVerticalScrollIndicator={false}>
        {POSTS.map(post => {
          const tagStyle = TAG_COLORS[post.tag] ?? { bg: '#F3F4F6', text: '#6B7280' };
          return (
            <TouchableOpacity key={post.id} style={styles.post} activeOpacity={0.7}>
              <View style={styles.postMeta}>
                <View style={styles.avatar} />
                <Text style={styles.author}>{post.author}</Text>
                <ConnectionIcon />
                <View style={[styles.tag, { backgroundColor: tagStyle.bg }]}>
                  <Text style={[styles.tagText, { color: tagStyle.text }]}>{post.tag}</Text>
                </View>
                <Text style={styles.time}>{post.time}</Text>
              </View>
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.postBody} numberOfLines={2}>{post.body}</Text>
              <View style={styles.postActions}>
                <TouchableOpacity style={styles.action} onPress={() => toggleLike(post.id)}>
                  <HeartIcon filled={likedPosts[post.id]} />
                  <Text style={[styles.actionCount, likedPosts[post.id] && { color: '#BE7B74' }]}>
                    {post.likes + (likedPosts[post.id] && !post.liked ? 1 : !likedPosts[post.id] && post.liked ? -1 : 0)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.action}>
                  <CommentIcon />
                  <Text style={styles.actionCount}>{post.comments}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionRight} onPress={() => toggleSave(post.id)}>
                  <BookmarkIcon filled={!!savedPosts[post.id]} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}
        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F7F4' },
  header: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8, backgroundColor: '#F8F7F4' },
  title: { fontSize: 22, fontWeight: '700', color: '#1C1C1E', marginBottom: 10 },
  searchBar: {
    height: 38, backgroundColor: '#EBEBEB', borderRadius: 10,
    flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 12, marginBottom: 10,
  },
  searchText: { fontSize: 13, color: '#B0B7C3' },
  pillsScroll: { marginHorizontal: -20 },
  pillsContent: { paddingHorizontal: 20, gap: 6 },
  pill: {
    height: 28, paddingHorizontal: 12, borderRadius: 14,
    backgroundColor: '#FFFFFF', borderWidth: 1.5, borderColor: '#EBEBEB',
    justifyContent: 'center',
  },
  pillActive: { backgroundColor: '#BE7B74', borderColor: '#BE7B74' },
  pillText: { fontSize: 11, fontWeight: '500', color: '#6B7280' },
  pillTextActive: { color: '#FFFFFF' },
  feed: { flex: 1 },
  post: {
    backgroundColor: '#FFFFFF', marginHorizontal: 16, marginTop: 10,
    borderRadius: 14, padding: 14, borderWidth: 1, borderColor: '#EBEBEB',
  },
  postMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  avatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#F2E2E0' },
  author: { fontSize: 12, fontWeight: '600', color: '#1C1C1E', flex: 1 },
  tag: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 6 },
  tagText: { fontSize: 10, fontWeight: '600' },
  time: { fontSize: 11, color: '#9CA3AF' },
  postTitle: { fontSize: 14, fontWeight: '600', color: '#1C1C1E', marginBottom: 4, lineHeight: 20 },
  postBody: { fontSize: 12, color: '#6B7280', lineHeight: 18, marginBottom: 10 },
  postActions: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  action: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  actionCount: { fontSize: 11, color: '#6B7280' },
  actionRight: { marginLeft: 'auto' },
});
