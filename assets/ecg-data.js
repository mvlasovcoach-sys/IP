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

function generateTemplateBeat(numSamples, noiseLevel = 0.006) {
  const data = [];

  for (let i = 0; i < numSamples; i++) {
    const phase = i / (numSamples - 1 || 1);
    let value = 0;

    // P wave
    if (phase > 0.14 && phase < 0.22) {
      value += 0.09 * Math.sin(((phase - 0.14) / 0.08) * Math.PI);
    }

    // QRS complex
    if (phase > 0.26 && phase < 0.30) {
      value -= 0.55 * Math.exp(-((phase - 0.28) ** 2) / 0.00035);
    }
    if (phase > 0.29 && phase < 0.33) {
      value += 1.18 * Math.exp(-((phase - 0.31) ** 2) / 0.00030);
    }

    // T wave
    if (phase > 0.42 && phase < 0.60) {
      value += 0.18 * Math.sin(((phase - 0.42) / 0.18) * Math.PI);
    }

    // small baseline wander and noise
    value += 0.02 * Math.sin(i / 520);
    value += (Math.random() - 0.5) * noiseLevel;

    data.push(value);
  }

  return data;
}

const numSamples = 250 * 22; // 22 seconds @ 250 Hz
const lead2 = generateSyntheticEcg(numSamples, 0.02);
const lead1 = lead2.map((v, i) => v * 0.95 + 0.01 * Math.sin(i / 60));
const lead3 = lead2.map((v, i) => v - lead1[i]);
const aVR = lead1.map((v, i) => -0.5 * (v + lead2[i]));
const aVL = lead1.map((v, i) => v - 0.5 * lead2[i]);
const aVF = lead2.map((v, i) => v - 0.5 * lead1[i]);
const v1 = lead2.map((v, i) => v * 1.1 - 0.02 * Math.cos(i / 45));
const baseChannel = lead2;

// eslint-disable-next-line no-undef
ecgDemoData = {
  sampleRateHz: 250,
  channels: [
    { id: "I", label: "Lead I", values: lead1 },
    { id: "II", label: "Lead II", values: lead2 },
    { id: "III", label: "Lead III", values: lead3 },
    { id: "aVR", label: "aVR", values: aVR },
    { id: "aVL", label: "aVL", values: aVL },
    { id: "aVF", label: "aVF", values: aVF },
    { id: "V1", label: "V1", values: v1 }
  ],
  leads12: [
    { id: "I", label: "Lead I", values: baseChannel, confidence: 0.94, isRecorded: true },
    {
      id: "II",
      label: "Lead II",
      values: baseChannel.map((v, i) => v * 1.02 + 0.01 * Math.sin(i / 40)),
      confidence: 0.91,
      isRecorded: true
    },
    {
      id: "III",
      label: "Lead III",
      values: baseChannel.map((v, i) => v * 0.97 - 0.01 * Math.cos(i / 60)),
      confidence: 0.89,
      isRecorded: true
    },
    {
      id: "aVR",
      label: "aVR",
      values: baseChannel.map((v) => -v * 0.8),
      confidence: 0.83,
      isRecorded: true
    },
    {
      id: "aVL",
      label: "aVL",
      values: baseChannel.map((v, i) => v * 0.85 + 0.005 * Math.sin(i / 35)),
      confidence: 0.88,
      isRecorded: true
    },
    {
      id: "aVF",
      label: "aVF",
      values: baseChannel.map((v, i) => v * 1.05 - 0.005 * Math.cos(i / 45)),
      confidence: 0.86,
      isRecorded: true
    },
    {
      id: "V1",
      label: "V1",
      values: baseChannel.map((v) => v * 1.1),
      confidence: 0.93,
      isRecorded: true
    },
    { id: "V2", label: "V2", values: baseChannel.map((v) => v * 1.15), confidence: 0.9, isRecorded: false },
    { id: "V3", label: "V3", values: baseChannel.map((v) => v * 1.08), confidence: 0.87, isRecorded: false },
    { id: "V4", label: "V4", values: baseChannel.map((v) => v * 1.02), confidence: 0.81, isRecorded: false },
    {
      id: "V5",
      label: "V5",
      values: baseChannel.map((v) => v * 0.95),
      confidence: 0.76,
      isRecorded: false
    },
    {
      id: "V6",
      label: "V6",
      values: baseChannel.map((v) => v * 0.92),
      confidence: 0.72,
      isRecorded: false
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

const templateBeatValues = generateTemplateBeat(360, 0.005);
const templateBeatValuesLoad = generateSyntheticEcg(300, 0.015).map((v) => v * 1.05);
const greenWindowsCount = ecgDemoData.windows.filter((w) => w.quality === "green").length;
const yellowWindowsCount = ecgDemoData.windows.filter((w) => w.quality === "yellow").length;
const redWindowsCount = ecgDemoData.windows.filter((w) => w.quality === "red").length;
const totalWindowsCount = ecgDemoData.windows.length || 1;

ecgDemoData.profiles = {
  rest: {
    id: "rest",
    label: "Resting profile",
    meta: {
      createdAt: "2025-01-01T12:00:00Z",
      durationSeconds: 20 * 60,
      windowsUsed: greenWindowsCount,
      geometryId: "T-shirt-M",
      version: 1
    },
    templateBeat: {
      values: templateBeatValues,
      sampleRateHz: 250
    },
    intervals: {
      hrBpm: 68,
      prMs: 160,
      qrsMs: 92,
      qtMs: 380,
      qtcMs: 410
    },
    axis: {
      frontalPlaneDeg: 35
    },
    hrv: {
      sdnnMs: 65,
      rmssdMs: 52
    },
    qualityMap: {
      greenPct: Number(((greenWindowsCount / totalWindowsCount) * 100).toFixed(1)),
      yellowPct: Number(((yellowWindowsCount / totalWindowsCount) * 100).toFixed(1)),
      redPct: Number(((redWindowsCount / totalWindowsCount) * 100).toFixed(1))
    }
  },
  load: {
    id: "load",
    label: "Post-load profile",
    meta: {
      createdAt: "2025-01-01T12:30:00Z",
      durationSeconds: 10 * 60,
      windowsUsed: Math.round(greenWindowsCount * 0.9),
      geometryId: "T-shirt-M",
      version: 1
    },
    templateBeat: {
      values: templateBeatValuesLoad,
      sampleRateHz: 250
    },
    intervals: {
      hrBpm: 92,
      prMs: 150,
      qrsMs: 94,
      qtMs: 390,
      qtcMs: 420
    },
    axis: {
      frontalPlaneDeg: 18
    },
    hrv: {
      sdnnMs: 40,
      rmssdMs: 30
    },
    qualityMap: {
      greenPct: 78.0,
      yellowPct: 16.0,
      redPct: 6.0
    }
  }
};
