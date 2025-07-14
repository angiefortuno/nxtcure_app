import React, { useState } from 'react';
import { ScrollView, View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import CustomText from '@/components/CustomText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const feelings = ['Happy', 'Hopeful', 'Neutral', 'Sad', 'Angry'];
const visibilityOptions = ['Public', 'Group only', 'Friends'];
const tagOptions = ['Cancer', 'Treatment', 'Side Effects', 'Support', 'Clinical Trials'];

const CreatePostScreen = () => {
  const router = useRouter();
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  const pickMedia = async (mediaTypes: ImagePicker.MediaTypeOptions) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes,
      quality: 1,
      allowsEditing: false,
    });

    if (!result.canceled) {
      setSelectedMedia(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.headerIcon} onPress={() => router.push('/groups')}>
          <Ionicons name="close" size={26} color="#0D141C" />
        </TouchableOpacity>
        <CustomText style={styles.headerTitle}>Share with Community</CustomText>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* What's on your mind */}
        <CustomText style={styles.sectionLabel}>What’s on your mind?</CustomText>
        <View style={styles.inputBox}>
          <TextInput
            multiline
            placeholderTextColor="#9CA3AF"
            style={styles.textArea}
          />
        </View>

        {/* Photo / Video Buttons */}
        <View style={styles.mediaRow}>
          <TouchableOpacity style={styles.mediaButtonWrapper} onPress={() => pickMedia(ImagePicker.MediaTypeOptions.Images)}>
            <View style={styles.mediaButtonIcon}>
              <Ionicons name="image-outline" size={20} color="#0D141C" />
            </View>
            <CustomText style={styles.mediaButtonLabel}>Photo</CustomText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.mediaButtonWrapper} onPress={() => pickMedia(ImagePicker.MediaTypeOptions.Videos)}>
            <View style={styles.mediaButtonIcon}>
              <Ionicons name="videocam-outline" size={20} color="#0D141C" />
            </View>
            <CustomText style={styles.mediaButtonLabel}>Video</CustomText>
          </TouchableOpacity>
        </View>

        {/* Show selected media */}
        {selectedMedia && (
          <Image source={{ uri: selectedMedia }} style={styles.selectedMedia} resizeMode="cover" />
        )}

        {/* Feelings */}
        <CustomText style={styles.sectionLabel}>How are you feeling?</CustomText>
        <View style={styles.optionRow}>
          {feelings.map((item, idx) => (
            <TouchableOpacity key={idx} style={styles.optionButton}>
              <CustomText style={styles.optionText}>{item}</CustomText>
            </TouchableOpacity>
          ))}
        </View>

        {/* Visibility */}
        <CustomText style={styles.sectionLabel}>Who can see this post?</CustomText>
        <View style={styles.optionRow}>
          {visibilityOptions.map((item, idx) => (
            <TouchableOpacity key={idx} style={styles.optionButton}>
              <CustomText style={styles.optionText}>{item}</CustomText>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tags */}
        <CustomText style={styles.sectionLabel}>Tag relevant topics</CustomText>
        <View style={styles.optionRow}>
          {tagOptions.map((item, idx) => (
            <TouchableOpacity key={idx} style={styles.optionButtonGray}>
              <CustomText style={styles.optionTextGray}>{item}</CustomText>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Save Draft & Share Post */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.draftButton}>
          <CustomText style={styles.draftButtonText}>Save Draft</CustomText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton}>
          <CustomText style={styles.shareButtonText}>Share Post</CustomText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreatePostScreen;

export const options = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 16,
    marginBottom: 10,
  },
  headerIcon: {
    position: 'absolute',
    paddingLeft: 16,
    paddingRight: 16,
    left: 0,
    top: 0
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#0D141C',
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0D141C',
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: 8,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    minHeight: 130,
  },
  textArea: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-Regular',
    color: '#0D141C',
    textAlignVertical: 'top',
  },
  mediaRow: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 24,
  },
  mediaButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mediaButtonIcon: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 50,
    marginBottom: 4,
  },
  mediaButtonLabel: {
    fontSize: 13,
    color: '#0D141C',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  selectedMedia: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 24,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#fff',
  },
  optionText: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-Regular',
    color: '#0D141C',
  },
  optionButtonGray: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  optionTextGray: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-Regular',
    color: '#0D141C',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  draftButton: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 999,
    backgroundColor: '#F3F4F6',
  },
  draftButtonText: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-Bold',
    color: '#0D141C',
  },
  shareButton: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 999,
    backgroundColor: '#908DDC',
  },
  shareButtonText: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-Bold',
    color: '#fff',
  },
});
