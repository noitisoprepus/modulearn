import { useSpeechStore } from "@/store/speechStore";
import { splitTextIntoChunks } from "@/utils/speechUtils";
import * as Speech from "expo-speech";
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import { useCallback, useEffect, useRef } from "react";

type CommandHandler = (recognizedCommand: string) => void;

type UseVoiceCommandsOptions = {
  commands: string[];
  onCommand: CommandHandler;
  promptMessage: string;
};

export function useVoiceCommands({ commands, onCommand, promptMessage }: UseVoiceCommandsOptions) {
  const { setIsSpeaking, setIsRecognizing } = useSpeechStore();
  const isMounted = useRef(true);
  // TTS refs
  const chunksRef = useRef<string[]>([]);
  const indexRef = useRef<number>(0);

  const speakNext = useCallback(() => {
    const chunks = chunksRef.current;
    const index = indexRef.current;

    if (index >= chunks.length) {
      // Reset speech
      setIsSpeaking(false);
      indexRef.current = 0;

      // Start voice recognition
      if (isMounted.current) startRecognition();

      return;
    }

    Speech.speak(chunks[index], {
      onDone: () => {
        indexRef.current++;
        speakNext();
      }
    });
  }, [setIsSpeaking]);
  
  const speakPromptAndListen = useCallback(() => {
    const fullPrompt = `${promptMessage} To repeat the instructions, please say "repeat".`;
    chunksRef.current = splitTextIntoChunks(fullPrompt, Speech.maxSpeechInputLength - 100);
    indexRef.current = 0;
    speakNext();
  }, [promptMessage, speakNext]);

  const startRecognition = async () => {
    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      console.warn("Permissions not granted", result);
      return;
    }

    ExpoSpeechRecognitionModule.start({
      lang: "en-US",
      interimResults: true,
      continuous: false,
      androidIntentOptions: {
        EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS: 3000,
      },
    });
  };

  const handleResult = (event: any) => {
    const transcript = event.results?.[0]?.transcript?.toLowerCase().trim();
    
    if (!transcript) return retry();

    const matched = commands.find(command => transcript.includes(command.toLowerCase()));
    
    if (matched) {
      onCommand(matched);
    } else if (transcript.includes("repeat")) {
      speakPromptAndListen();
    } else {
      retry();
    }
  };

  const retry = () => {
    Speech.speak("I didn't catch that. Please try again.", {
      onDone: () => {
        if (isMounted.current) startRecognition();
      },
    });
  };

  // Event handlers
  useSpeechRecognitionEvent("start", () => setIsRecognizing(true));
  useSpeechRecognitionEvent("end", () => setIsRecognizing(false));
  useSpeechRecognitionEvent("result", handleResult);
  useSpeechRecognitionEvent("error", (event) => {
    console.warn("Speech error:", event.message);
    retry();
  });

  useEffect(() => {
    speakPromptAndListen();

    return () => {
      isMounted.current = false;
      ExpoSpeechRecognitionModule.stop();
    };
  }, [speakPromptAndListen]);
}
