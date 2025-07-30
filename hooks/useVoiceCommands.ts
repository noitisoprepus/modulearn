import { useSpeechStore } from "@/store/speechStore";
import { speakChunks } from "@/utils/speechUtils";
import { useFocusEffect } from "@react-navigation/native";
import * as Speech from "expo-speech";
import { ExpoSpeechRecognitionModule } from "expo-speech-recognition";
import { useCallback, useRef } from "react";

export function useVoiceCommands() {
  const { shouldRecognize } = useSpeechStore();
  const isMounted = useRef(true);
  
  const startRecognition = useCallback(async () => {
    if (useSpeechStore.getState().isRecognizing) {
      ExpoSpeechRecognitionModule.stop();
    }

    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      console.warn("Permissions not granted", result);
      return;
    }

    ExpoSpeechRecognitionModule.start({
      lang: "en-US",
      interimResults: false,
      continuous: false,
      androidIntentOptions: {
        EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS: 3000,
      },
    });
  }, []);

  const speakPromptAndListen = useCallback(() => {
    if (!useSpeechStore.getState().voicePrompt || useSpeechStore.getState().voiceCommands.length === 0 || !useSpeechStore.getState().commandCallback) return;

    const fullPrompt = `${useSpeechStore.getState().voicePrompt} To repeat the instructions, please say "repeat".`;
    useSpeechStore.getState().setIsSpeaking(true);
    speakChunks({
      text: fullPrompt,
      onComplete: () => {
        useSpeechStore.getState().setIsSpeaking(false);
        if (isMounted.current) startRecognition();
      },
    });
  }, [startRecognition]);

  const retry = useCallback(() => {
    Speech.speak("I didn't catch that. Please try again.", {
      onDone: () => {
        if (isMounted.current) startRecognition();
      },
    });
  }, [startRecognition]);

  const handleResult = useCallback((event: any) => {
    if (useSpeechStore.getState().isRecognizing) {
      ExpoSpeechRecognitionModule.stop();
    }

    const transcript = event.results?.[0]?.transcript?.toLowerCase().trim();
    if (!transcript) return retry();

    if (transcript.includes("repeat")) {
      speakPromptAndListen();
      return;
    }

    const matched = useSpeechStore.getState().voiceCommands.find(command => transcript.includes(command.toLowerCase()));
    if (matched) {
      const callback = useSpeechStore.getState().commandCallback;
      if (!callback) {
        console.error("No voice command callback provided.");
        return;
      }
      callback(matched);
    } else {
      retry();
    }
  }, [retry, speakPromptAndListen]);

  useFocusEffect(
    useCallback(() => {
      if (shouldRecognize) {
        speakPromptAndListen();
        useSpeechStore.getState().setShouldRecognize(false);
      }
    }, [shouldRecognize, speakPromptAndListen])
  );

  useFocusEffect(useCallback(() => {
    isMounted.current = true;

    const startListener = ExpoSpeechRecognitionModule.addListener("start", () => useSpeechStore.getState().setIsRecognizing(true));
    const endListener = ExpoSpeechRecognitionModule.addListener("end", () => useSpeechStore.getState().setIsRecognizing(false));
    const resultListener = ExpoSpeechRecognitionModule.addListener("result", handleResult);
    const errorListener = ExpoSpeechRecognitionModule.addListener("error", (event) => {
      console.warn("ExpoSpeechRecognition:", event.message);
      retry();
    });

    return () => {
      isMounted.current = false;

      startListener.remove();
      endListener.remove();
      resultListener.remove();
      errorListener.remove();
    };
  }, [handleResult, retry]));
}
