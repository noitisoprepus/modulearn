export function splitTextIntoChunks(text: string, maxChunkSize = 2048): string[] {
  // Split the given text into sentences
  const sentences = text.match(/[^.!?]+[.!?]+[\])'"`’”]*|\s*$/g) || [text];
  const chunks: string[] = [];
  let currentChunk = "";

  // Get chunks from each sentence
  for (let sentence of sentences) {
    if ((currentChunk + sentence).length <= maxChunkSize) {
      currentChunk += sentence;
    } else {
      chunks.push(currentChunk.trim());
      currentChunk = sentence;
    }
  }

  // Push any leftover text
  if (currentChunk) chunks.push(currentChunk.trim());

  return chunks;
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