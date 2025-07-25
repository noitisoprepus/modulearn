import { useSpeechStore } from "@/store/speechStore";
import { colors } from "@/styles/colors";
import { splitTextIntoChunks } from "@/utils/speechUtils";
import * as Speech from "expo-speech";
import { useEffect, useRef } from "react";
import IconButton from "./IconButton";

type TextToSpeechButtonProps = {
	text: string;
};

export default function TextToSpeechButton({ text }: TextToSpeechButtonProps) {
	const { isSpeaking, setIsSpeaking } = useSpeechStore();
	const chunksRef = useRef<string[]>([]);
  const indexRef = useRef<number>(0);
	
	// Re-split text when `text` prop changes
  useEffect(() => {
    chunksRef.current = splitTextIntoChunks(text, Speech.maxSpeechInputLength - 100);
		indexRef.current = 0;
  }, [text]);
	
	const speakNext = async () => {
		const chunks = chunksRef.current;
    const index = indexRef.current;

		if (index >= chunks.length) {
			// Reset speech
			setIsSpeaking(false);
			indexRef.current = 0;
			return;
		}

		Speech.speak(chunks[index], {
			onDone: () => {
				indexRef.current++;
				speakNext();
			},
			onStopped: () => setIsSpeaking(false)
		});
	};

	const toggleTTS = async () => {
    const speaking = await Speech.isSpeakingAsync();

		// expo-speech currently does not support pause/resume for Android.
		// We'll only do play/stop, for now.
    if (speaking) {
      Speech.stop();
      setIsSpeaking(false);
    } else {
			if (!text.trim()) return;

      setIsSpeaking(true);
      speakNext();
    }
  };

	return (
		<IconButton 
			icon={isSpeaking ? "stop" : "play-arrow"}
			iconColor={colors.surface}
			backgroundColor={colors.secondary} 
			onPress={toggleTTS} 
		/>
	);
}