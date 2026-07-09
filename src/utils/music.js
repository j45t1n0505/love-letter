export function createAmbientTrackUrl(seed = 0) {
  const sampleRate = 22050;
  const duration = 2.4;
  const frameCount = sampleRate * duration;
  const amplitude = 0.18;
  const buffer = new ArrayBuffer(44 + frameCount * 2);
  const view = new DataView(buffer);

  const writeString = (offset, string) => {
    for (let i = 0; i < string.length; i += 1) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + frameCount * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, frameCount * 2, true);

  for (let i = 0; i < frameCount; i += 1) {
    const t = i / sampleRate;
    const baseFreq = 220 + seed * 30 + Math.sin(t * 0.6) * 18;
    const sparkle = Math.sin(t * baseFreq * 2 * Math.PI) * 0.5 + Math.sin(t * baseFreq * 3 * Math.PI) * 0.25;
    const value = amplitude * (sparkle + Math.sin(t * baseFreq * Math.PI * 2) * 0.35);
    const sample = Math.max(-1, Math.min(1, value));
    view.setInt16(44 + i * 2, sample * 0x7fff, true);
  }

  const bytes = Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, '0')).join('');
  return `data:audio/wav;base64,${btoa(bytes.match(/.{1,2}/g).map((byte) => String.fromCharCode(parseInt(byte, 16))).join(''))}`;
}
