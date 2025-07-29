import { useSpeechStore } from "@/store/speechStore";
import { colors } from "@/styles/colors";
import { speakChunks } from "@/utils/speechUtils";
import * as Speech from "expo-speech";
import IconButton from "./IconButton";

type TextToSpeechButtonProps = {
	text: string;
};

export default function TextToSpeechButton({ text }: TextToSpeechButtonProps) {
	const { isSpeaking, setIsSpeaking } = useSpeechStore();
	
	const toggleTTS = async () => {
		// expo-speech currently does not support pause/resume for Android.
		// We'll only do play/stop, for now.
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    } else {
			if (!text.trim()) return;

      setIsSpeaking(true);
      speakChunks({
        text: text,
        onComplete: () => setIsSpeaking(false),
      });
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