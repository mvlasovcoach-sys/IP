function generateSyntheticEcg(numSamples, noiseLevel = 0.02) {
  const data = [];
  const heartRate = 72; // bpm
  const sampleRate = 250;
  const samplesPerBeat = Math.floor((60 / heartRate) * sampleRate);

  for (let i = 0; i < numSamples; i++) {
    const phase = (i % samplesPerBeat) / samplesPerBeat;
    let value = 0;

    // P wave
    if (phase > 0.08 && phase < 0.16) {
      value += 0.08 * Math.sin(((phase - 0.08) / 0.08) * Math.PI);
    }

    // QRS complex: Q dip and sharp R spike
    if (phase > 0.18 && phase < 0.22) {
      value -= 0.55 * Math.exp(-((phase - 0.20) ** 2) / 0.00045);
    }
    if (phase > 0.21 && phase < 0.26) {
      value += 1.15 * Math.exp(-((phase - 0.235) ** 2) / 0.00035);
    }

    // T wave
    if (phase > 0.33 && phase < 0.50) {
      value += 0.16 * Math.sin(((phase - 0.33) / 0.17) * Math.PI);
    }

    // small baseline wander and noise
    value += 0.03 * Math.sin(i / 1800);
    value += (Math.random() - 0.5) * noiseLevel;

    data.push(value);
  }

  return data;
}

const numSamples = 250 * 22; // 22 seconds @ 250 Hz
const baseChannel = generateSyntheticEcg(numSamples, 0.02);

// eslint-disable-next-line no-undef
ecgDemoData = {
  sampleRateHz: 250,
  channels: [
    { id: "ch1", label: "Lead I", values: baseChannel },
    {
      id: "ch2",
      label: "Lead II",
      values: baseChannel.map((v, i) => v * 1.05 + 0.02 * Math.sin(i / 48))
    },
    {
      id: "ch3",
      label: "Lead V1",
      values: baseChannel.map((v, i) => v * 0.92 - 0.015 * Math.cos(i / 72))
    }
  ],
  leads12: [
    { id: "I", label: "Lead I", values: baseChannel, confidence: 0.94 },
    {
      id: "II",
      label: "Lead II",
      values: baseChannel.map((v, i) => v * 1.02 + 0.01 * Math.sin(i / 40)),
      confidence: 0.91
    },
    {
      id: "III",
      label: "Lead III",
      values: baseChannel.map((v, i) => v * 0.97 - 0.01 * Math.cos(i / 60)),
      confidence: 0.89
    },
    { id: "aVR", label: "aVR", values: baseChannel.map((v) => -v * 0.8), confidence: 0.83 },
    {
      id: "aVL",
      label: "aVL",
      values: baseChannel.map((v, i) => v * 0.85 + 0.005 * Math.sin(i / 35)),
      confidence: 0.88
    },
    {
      id: "aVF",
      label: "aVF",
      values: baseChannel.map((v, i) => v * 1.05 - 0.005 * Math.cos(i / 45)),
      confidence: 0.86
    },
    { id: "V1", label: "V1", values: baseChannel.map((v) => v * 1.1), confidence: 0.93 },
    { id: "V2", label: "V2", values: baseChannel.map((v) => v * 1.15), confidence: 0.9 },
    { id: "V3", label: "V3", values: baseChannel.map((v) => v * 1.08), confidence: 0.87 },
    { id: "V4", label: "V4", values: baseChannel.map((v) => v * 1.02), confidence: 0.81 },
    {
      id: "V5",
      label: "V5",
      values: baseChannel.map((v) => v * 0.95),
      confidence: 0.76
    },
    {
      id: "V6",
      label: "V6",
      values: baseChannel.map((v) => v * 0.92),
      confidence: 0.72
    }
  ],
  windows: []
};

// build windows with 2-second length, 1-second step
(function buildWindows() {
  const step = ecgDemoData.sampleRateHz; // 1 second
  const length = ecgDemoData.sampleRateHz * 2; // 2 seconds
  const total = numSamples;
  let id = 1;

  for (let start = 0; start + length <= total; start += step) {
    const end = start + length;
    let quality = "green";

    if (id % 7 === 0) quality = "red";
    else if (id % 4 === 0) quality = "yellow";

    ecgDemoData.windows.push({
      id,
      startIndex: start,
      endIndex: end,
      quality
    });
    id++;
  }
})();

ecgDemoData.qualityStats = (function () {
  const g = ecgDemoData.windows.filter((w) => w.quality === "green").length;
  const y = ecgDemoData.windows.filter((w) => w.quality === "yellow").length;
  const r = ecgDemoData.windows.filter((w) => w.quality === "red").length;
  const total = ecgDemoData.windows.length;

  return {
    greenCount: g,
    yellowCount: y,
    redCount: r,
    total,
    greenPct: ((g / total) * 100).toFixed(1),
    yellowPct: ((y / total) * 100).toFixed(1),
    redPct: ((r / total) * 100).toFixed(1)
  };
})();
