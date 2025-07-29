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