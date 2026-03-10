import React, { useRef } from 'react';
import {
  View,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { PencilLine } from 'lucide-react-native';

interface WorryInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const MAX_CHARS = 1000;

export function WorryInput({ value, onChangeText, onSubmit, isLoading }: WorryInputProps) {
  const inputRef = useRef<TextInput>(null);

  const handleChangeText = (text: string) => {
    if (text.length <= MAX_CHARS) {
      onChangeText(text);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="px-6 mb-8"
    >
      <View
        className="rounded-[32px] p-6 bg-white"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.05,
          shadowRadius: 20,
          elevation: 5,
          borderWidth: 1,
          borderColor: '#F0F9FF',
        }}
      >
        <View className="flex-row items-center mb-4 opacity-40">
          <PencilLine size={14} color="#164E63" className="mr-2" />
          <Text className="text-cyan950 text-xs font-bold tracking-tight">
            당신의 이야기를 들려주세요
          </Text>
        </View>
        
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={handleChangeText}
          placeholder="여기에 고민을 적어주세요. 따뜻한 위로를 준비할게요..."
          placeholderTextColor="#94A3B8"
          multiline
          numberOfLines={6}
          className="text-cyan950 text-lg leading-7 min-h-[140px]"
          style={{ 
            fontFamily: Platform.OS === 'ios' ? 'Pretendard' : 'System', 
            textAlignVertical: 'top' 
          }}
          editable={!isLoading}
        />
        
        <View className="flex-row justify-between items-center mt-6 pt-4 border-t border-cyan50">
          <Text className="text-cyan600 opacity-40 text-xs font-bold">
            {value.length} / {MAX_CHARS}
          </Text>
          <TouchableOpacity
            onPress={onSubmit}
            disabled={!value.trim() || isLoading}
            activeOpacity={0.7}
            className={`px-8 py-3 rounded-2xl shadow-sm ${
              value.trim() && !isLoading ? 'bg-cyan600' : 'bg-cyan100'
            }`}
          >
            <Text
              className={`text-sm font-bold ${
                value.trim() && !isLoading ? 'text-white' : 'text-cyan600 opacity-40'
              }`}
            >
              조제 시작하기
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
