import { colors } from "@/styles/colors";
import * as Speech from "expo-speech";
import { useState } from "react";
import IconButton from "./IconButton";

export default function TextToSpeechButton() {
	const [isSpeaking, setIsSpeaking] = useState(false);
	
	const toggleTTS = async () => {
    const speaking = await Speech.isSpeakingAsync();
		const thingsToSay = "Hello there. Welcome to ModuLearn!"

		// TODO: Implement a handler for dividing module text content 
		// into chunks (that meets Speech.maxSpeechInputLength) and 
		// serve each chunk ito the TTS module. 

		// expo-speech currently does not support pause/resume for Android.
		// We'll only do play/stop, for now.
    if (speaking) {
      Speech.stop();
      setIsSpeaking(false);
    } else {
      Speech.speak(thingsToSay, {
        onDone: () => setIsSpeaking(false),
        onStopped: () => setIsSpeaking(false),
      });
      setIsSpeaking(true);
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