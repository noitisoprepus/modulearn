import { useSpeechStore } from "@/store/speechStore";
import * as Speech from "expo-speech";
import { splitTextIntoChunks } from "./textUtils";

type SpeakChunksOptions = {
  text: string;
  onComplete?: () => void;
  onStopped?: () => void;
  chunkSize?: number;
};

export function speakChunks({
  text,
  onComplete,
  onStopped,
  chunkSize = Speech.maxSpeechInputLength - 100,
}: SpeakChunksOptions) {
  const chunks = splitTextIntoChunks(text, chunkSize);
  let index = 0;

  const speakNext = () => {
    if (index >= chunks.length) {
      onComplete?.();
      return;
    }

    Speech.speak(chunks[index], {
      rate: useSpeechStore.getState().speechRate,
      onDone: () => {
        index++;
        speakNext();
      },
      onStopped: () => {
        onStopped?.();
      },
    });
  };

  speakNext();
}

export const numberWordsMap: Record<string, string> = {
  "one": "1",
  "two": "2",
  "three": "3",
  "four": "4",
  "five": "5",
  "six": "6",
  "seven": "7",
  "eight": "8",
  "nine": "9",
  "ten": "10",
};