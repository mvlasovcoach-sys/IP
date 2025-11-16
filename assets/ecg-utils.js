function sampleIndexToX(index, totalSamples, width) {
  return (index / Math.max(totalSamples - 1, 1)) * width;
}

function drawIntervalOverlay(svgEl, boundaries, totalSamples) {
  if (!svgEl || !boundaries) return;
  clearIntervalOverlay(svgEl);

  const viewBox = (svgEl.getAttribute("viewBox") || "0 0 0 0").split(" ");
  const width = Number(viewBox[2]) || svgEl.clientWidth || 500;
  const height = Number(viewBox[3]) || svgEl.clientHeight || 120;
  const samples = totalSamples || boundaries.sampleCount || 1;

  const ns = "http://www.w3.org/2000/svg";
  const group = document.createElementNS(ns, "g");
  group.classList.add("ecg-overlay-group");

  const positions = [
    { key: "pOn" },
    { key: "pOff" },
    { key: "qrsOn" },
    { key: "qrsOff" },
    { key: "tOn" },
    { key: "tOff" }
  ];

  positions.forEach((pos) => {
    const idx = boundaries[pos.key];
    if (typeof idx !== "number") return;
    const x = sampleIndexToX(idx, samples, width);
    const line = document.createElementNS(ns, "line");
    line.setAttribute("x1", x);
    line.setAttribute("x2", x);
    line.setAttribute("y1", 4);
    line.setAttribute("y2", height - 4);
    line.classList.add("ecg-overlay-line");
    group.appendChild(line);
  });

  if (Array.isArray(boundaries.rPeaks)) {
    boundaries.rPeaks.forEach((idx) => {
      const x = sampleIndexToX(idx, samples, width);
      const marker = document.createElementNS(ns, "circle");
      marker.setAttribute("cx", x);
      marker.setAttribute("cy", height / 2);
      marker.setAttribute("r", 2.8);
      marker.classList.add("ecg-overlay-line");
      group.appendChild(marker);
    });
  }

  const labels = [
    { text: "P", from: "pOn", to: "pOff" },
    { text: "PR", from: "pOn", to: "qrsOn" },
    { text: "QRS", from: "qrsOn", to: "qrsOff" },
    { text: "ST", from: "qrsOff", to: "tOn" },
    { text: "QT", from: "qrsOn", to: "tOff" }
  ];

  labels.forEach(({ text, from, to }) => {
    const start = boundaries[from];
    const end = boundaries[to];
    if (typeof start !== "number" || typeof end !== "number") return;
    const midX = sampleIndexToX((start + end) / 2, samples, width);
    const label = document.createElementNS(ns, "text");
    label.textContent = text;
    label.setAttribute("x", midX);
    label.setAttribute("y", 12);
    label.setAttribute("text-anchor", "middle");
    label.classList.add("ecg-overlay-label");
    group.appendChild(label);
  });

  svgEl.appendChild(group);
}

function clearIntervalOverlay(svgEl) {
  if (!svgEl) return;
  svgEl.querySelectorAll(".ecg-overlay-group").forEach((g) => g.remove());
}

function createAxisSvg(axisDeg = 0) {
  const width = 80;
  const height = 80;
  const center = 40;
  const radius = 28;
  const axesDeg = [30, 90, 150, 210, 270, 330];

  const lines = axesDeg
    .map((deg) => {
      const rad = (deg * Math.PI) / 180;
      const x2 = center + radius * Math.cos(rad);
      const y2 = center - radius * Math.sin(rad);
      return `<line x1="${center}" y1="${center}" x2="${x2}" y2="${y2}" />`;
    })
    .join("");

  const arrowRad = (axisDeg * Math.PI) / 180;
  const arrowX = center + radius * Math.cos(arrowRad);
  const arrowY = center - radius * Math.sin(arrowRad);

  return `
    <svg class="axis-svg" viewBox="0 0 ${width} ${height}" aria-hidden="true">
      ${lines}
      <line class="axis-arrow" x1="${center}" y1="${center}" x2="${arrowX}" y2="${arrowY}" marker-end="url(#axis-arrowhead)" />
      <circle class="axis-center" cx="${center}" cy="${center}" r="3" />
      <defs>
        <marker id="axis-arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L6,3 z" fill="#059669" />
        </marker>
      </defs>
    </svg>
  `;
}

function renderAxisWidget(container, axisDeg) {
  if (!container) return;
  container.innerHTML = createAxisSvg(axisDeg);
}

function computePnn50(rr = []) {
  if (!Array.isArray(rr) || rr.length < 2) return 0;
  let count = 0;
  for (let i = 0; i < rr.length - 1; i++) {
    if (Math.abs(rr[i + 1] - rr[i]) > 50) count++;
  }
  const pct = (count / (rr.length - 1)) * 100;
  return Number(pct.toFixed(1));
}

function renderPoincareSvg(rr = []) {
  if (!Array.isArray(rr) || rr.length < 2) return "";
  const pairs = rr.slice(0, -1).map((v, i) => [v, rr[i + 1]]);
  const values = pairs.flat();
  const min = Math.min(...values);
  const max = Math.max(...values);
  const padding = (max - min || 1) * 0.1;
  const scaleMin = min - padding;
  const scaleMax = max + padding;
  const width = 100;
  const height = 80;

  const toX = (v) => ((v - scaleMin) / (scaleMax - scaleMin)) * width;
  const toY = (v) => height - ((v - scaleMin) / (scaleMax - scaleMin)) * height;

  const dots = pairs
    .map(([x, y]) => `<circle cx="${toX(x).toFixed(1)}" cy="${toY(y).toFixed(1)}" r="2.2" fill="#0ea5e9" />`)
    .join("");

  const meanX = pairs.reduce((sum, [x]) => sum + x, 0) / pairs.length;
  const meanY = pairs.reduce((sum, [, y]) => sum + y, 0) / pairs.length;
  const ellipse = `<ellipse cx="${toX(meanX).toFixed(1)}" cy="${toY(meanY).toFixed(1)}" rx="18" ry="12" fill="rgba(14,165,233,0.08)" stroke="#0ea5e9" stroke-width="1" />`;

  return `
    <svg class="poincare-plot" viewBox="0 0 ${width} ${height}" aria-hidden="true">
      ${ellipse}
      ${dots}
    </svg>
  `;
}
