export function computeDeviationScore(param, delta, evidence, abruptness, morphR) {
  // param: "HR" | "QTc" | "Axis" | "HRV"
  // delta: numeric delta (signed)
  // evidence: "high" | "medium" | "low"
  // abruptness: "minimal" | "expected" | "sudden"
  // morphR: correlation (0..1)

  // Normalize each parameter to "impact"
  let baseImpact = 0;
  switch (param) {
    case "HR":
      baseImpact = Math.min(Math.abs(delta) / 25, 1) * 70;
      break;
    case "QTc":
      baseImpact = Math.min(Math.abs(delta) / 25, 1) * 100;
      break;
    case "Axis":
      baseImpact = Math.min(Math.abs(delta) / 40, 1) * 60;
      break;
    case "HRV":
      baseImpact = Math.min(Math.abs(delta) / 30, 1) * 80;
      break;
  }

  // Evidence weight (less data → reduce severity)
  const evidenceFactor = evidence === "high" ? 1 : evidence === "medium" ? 0.7 : 0.4;

  // Abruptness factor (sudden → stronger deviation)
  const abruptFactor = abruptness === "sudden" ? 1.3 : abruptness === "expected" ? 1.0 : 0.8;

  // Morphology penalty (if morphology changed strongly → raise severity)
  const morphFactor = morphR < 0.75 ? 1.3 : morphR < 0.9 ? 1.1 : 1.0;

  // Final score 0–100
  let score = baseImpact * evidenceFactor * abruptFactor * morphFactor;

  if (score > 100) score = 100;
  if (score < 0) score = 0;

  return Math.round(score);
}
