import * as Speech from "expo-speech";
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import { useCallback, useEffect, useRef, useState } from "react";

type CommandHandler = (recognizedCommand: string) => void;

type UseVoiceCommandsOptions = {
  commands: string[];
  onCommand: CommandHandler;
  promptMessage: string;
};

export function useVoiceCommands({ commands, onCommand, promptMessage }: UseVoiceCommandsOptions) {
  const [isRecognizing, setIsRecognizing] = useState(false);
  const isMounted = useRef(true);

  const speakPromptAndListen = useCallback(() => {
    if (!promptMessage) return startRecognition();

    Speech.speak(promptMessage, {
      onDone: () => {
        if (isMounted.current) startRecognition();
      },
    });
  }, [promptMessage]);

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
