const DEFAULT_SAMPLE_RATE = typeof ecgDemoData !== "undefined" ? ecgDemoData.sampleRateHz : 250;

function sliceSegment(values, sampleRate, durationSeconds) {
  if (!Array.isArray(values) || !values.length) return [];
  if (!durationSeconds || durationSeconds <= 0 || !sampleRate) {
    return values.slice();
  }
  const sliceLength = Math.max(1, Math.min(values.length, Math.floor(sampleRate * durationSeconds)));
  return values.slice(values.length - sliceLength);
}

export function renderEcgStrip(values = [], options = {}) {
  const sampleRate = options.sampleRate ?? DEFAULT_SAMPLE_RATE;
  const segment = sliceSegment(values, sampleRate, options.durationSeconds);
  const data = segment.length ? segment : Array.isArray(values) ? values.slice() : [];

  if (!data.length) {
    const placeholder = options.emptyLabel || "No ECG data";
    return `<div class="ecg-strip-placeholder">${placeholder}</div>`;
  }

  const width = options.width ?? 800;
  const height = options.height ?? 60;
  const color = options.color || "#22c55e";
  const strokeWidth = options.strokeWidth ?? 1.4;
  const padding = options.padding ?? 2;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((value, index) => {
      const x = (index / Math.max(data.length - 1, 1)) * width;
      const y = height - ((value - min) / range) * (height - padding * 2) - padding;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  const classes = ["ecg-lead-strip", options.className].filter(Boolean).join(" ");

  return `
    <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" class="${classes}">
      <polyline
        points="${points}"
        fill="none"
        stroke="${color}"
        stroke-width="${strokeWidth}"
        stroke-linejoin="round"
        stroke-linecap="round"
      />
    </svg>
  `;
}
