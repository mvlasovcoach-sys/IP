const SAMPLE_RATE = typeof ecgDemoData !== "undefined" ? ecgDemoData.sampleRateHz : 250;
const SEGMENT_LENGTH = SAMPLE_RATE * 2; // 2 seconds

function pickLeadValues() {
  if (typeof ecgDemoData === "undefined") return [];
  const lead = (ecgDemoData.channels || []).find((ch) => ch.id === "II") || ecgDemoData.channels?.[0];
  return lead?.values ? lead.values.slice() : [];
}

function pickWindowBounds(totalLength) {
  if (typeof ecgDemoData === "undefined") {
    return { start: 0, end: Math.min(SEGMENT_LENGTH, totalLength) };
  }
  const windows = ecgDemoData.windows || [];
  const candidate =
    windows.find((w) => w.quality === "green" && w.endIndex <= totalLength) ||
    windows.find((w) => w.endIndex <= totalLength) ||
    null;

  if (!candidate) {
    const start = Math.max(0, totalLength - SEGMENT_LENGTH);
    return { start, end: start + Math.min(SEGMENT_LENGTH, totalLength) };
  }

  const start = Math.max(0, Math.min(candidate.startIndex, totalLength - SEGMENT_LENGTH));
  const end = Math.min(start + SEGMENT_LENGTH, totalLength);
  return { start, end };
}

function movingAverage(values, radius) {
  const result = new Array(values.length).fill(0);
  for (let i = 0; i < values.length; i++) {
    let sum = 0;
    let count = 0;
    for (let j = i - radius; j <= i + radius; j++) {
      if (j >= 0 && j < values.length) {
        sum += values[j];
        count++;
      }
    }
    result[i] = count ? sum / count : values[i];
  }
  return result;
}

function createProcessedSegment(values) {
  if (!values.length) return [];
  const baseline = movingAverage(values, 25);
  const highPassed = values.map((v, idx) => v - baseline[idx]);
  const smoothed = movingAverage(highPassed, 2);
  const mean = smoothed.reduce((acc, val) => acc + val, 0) / smoothed.length;
  return smoothed.map((v) => Number((v - mean).toFixed(6)));
}

const leadValues = pickLeadValues();
const bounds = pickWindowBounds(leadValues.length);
const rawSegment = leadValues.slice(bounds.start, bounds.end);
const processedSegment = createProcessedSegment(rawSegment);

export const RAW_ECG_SEGMENT = rawSegment;
export const PROCESSED_ECG_SEGMENT = processedSegment;
