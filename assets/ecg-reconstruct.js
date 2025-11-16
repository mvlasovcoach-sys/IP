(function () {
  let W7to5 = null;
  const SOURCE_IDS = ["I", "II", "III", "aVR", "aVL", "aVF", "V1"];
  const TARGET_IDS = ["V2", "V3", "V4", "V5", "V6"];

  async function loadReconstructionWeights() {
    if (W7to5) return W7to5;
    try {
      const res = await fetch("assets/weights/w_7to5_population.json", { cache: "no-store" });
      if (!res.ok) return null;
      W7to5 = await res.json();
      return W7to5;
    } catch (e) {
      return null;
    }
  }

  function getTopContributions(targetId, k = 3) {
    if (!W7to5 || !W7to5.W) return [];
    const idx = TARGET_IDS.indexOf(targetId);
    if (idx < 0) return [];
    const row = W7to5.W[idx];
    const abs = row.map(Math.abs);
    const sum = abs.reduce((a, b) => a + b, 0) || 1;
    let contribs = abs.map((v, i) => ({ src: SOURCE_IDS[i], pct: Math.round((100 * v) / sum) }));
    contribs.sort((a, b) => b.pct - a.pct);
    contribs = contribs.slice(0, k);

    const total = contribs.reduce((a, c) => a + c.pct, 0);
    if (total > 100) contribs[0].pct -= total - 100;
    return contribs;
  }

  window.loadReconstructionWeights = loadReconstructionWeights;
  window.getTopContributions = getTopContributions;
})();
