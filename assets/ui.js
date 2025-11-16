const translations = {
  en: {
    tabs: {
      live: {
        title: "Live ECG – multi-channel stream",
        description:
          "This view simulates a live multi-channel ECG feed. The signal is segmented into 2-second windows and will later be color-coded by quality (green/yellow/red)."
      },
      quality: {
        title: "Signal Quality – green / yellow / red windows",
        description:
          "This view will show how each 2-second window is classified by quality based on noise, drift, motion artefacts and other metrics.",
        statsTitle: "Window Quality Statistics",
        statsGreen: "High-quality (green)",
        statsYellow: "Borderline (yellow)",
        statsRed: "Artefacts (red)",
        chartTitle: "Quality Distribution",
        distributionTitle: "Window-by-window quality distribution"
      },
      leads: {
        title: "12-Lead View – reconstructed ECG layout",
        description:
          "This view presents a reconstructed 12-lead ECG using the fixed geometry of the textile electrodes and per-lead confidence scores.",
        gridTitle: "Reconstructed 12-lead ECG",
        confidenceLabel: "Confidence",
        lowConfidenceHint:
          "Leads with confidence < 0.80 are greyed out and not used in the Digital Heart Profile.",
        legendHigh: "High-confidence leads used in profile",
        legendLow: "Low-confidence leads (visualised but excluded from profile)"
      },
      profile: {
        title: "Digital Heart Profile – aggregated metrics",
        description:
          "This view visualises the Digital Heart Profile: median P–QRS–T complexes, intervals (PR, QRS, QT, QTc), electrical axis and HRV metrics.",

        metricsTitle: "Key cardiac metrics",
        metricHr: "Heart rate",
        metricPr: "PR interval",
        metricQrs: "QRS duration",
        metricQt: "QT interval",
        metricQtc: "QTc (corrected QT)",
        metricAxis: "Electrical axis (frontal plane)",
        metricSdnn: "HRV SDNN",
        metricRmssd: "HRV RMSSD",

        qualityTitle: "Profile quality map",
        qualityHint:
          "Only high-quality (green) windows are used to build the profile. Yellow and red windows are excluded or down-weighted.",

        metaTitle: "Recording summary",
        metaDuration: "Duration",
        metaWindowsUsed: "Windows used",
        metaGeometry: "Geometry ID",
        metaVersion: "Profile version"
      },
      compare: {
        title: "Compare Profiles – rest vs after load",
        description:
          "This view compares two Digital Heart Profiles (for example, at rest and after load) and highlights changes in heart rate, intervals, electrical axis and HRV.",

        leftTitle: "Rest profile",
        rightTitle: "Post-load profile",
        deltaTitle: "Key changes (Δ)",
        deltaHr: "Heart rate",
        deltaAxis: "Electrical axis",
        deltaQtc: "QTc interval",
        deltaSdnn: "HRV SDNN",
        deltaRmssd: "HRV RMSSD",
        hint:
          "We always compare the patient with their own baseline. The resting profile serves as a stable reference; the post-load profile shows how the cardiovascular system responds."
      }
    },
    liveLegendGreen: "High-quality window used for analysis",
    liveLegendYellow: "Borderline quality, used with caution",
    liveLegendRed: "Artefacts – excluded from analysis",
    footer: {
      disclaimer:
        "This demo is not a medical device and does not provide diagnostic conclusions."
    }
  },
  ru: {
    tabs: {
      live: {
        title: "Онлайн ЭКГ – многоканальный поток",
        description:
          "Здесь имитируется поток многоканального ЭКГ. Сигнал разбивается на 2-секундные окна, которые в дальнейшем будут подсвечиваться по качеству (зелёный/жёлтый/красный)."
      },
      quality: {
        title: "Качество сигнала – зелёные / жёлтые / красные окна",
        description:
          "Здесь будет показано, как каждое 2-секундное окно классифицируется по качеству на основе шума, дрейфа, артефактов движения и других метрик.",
        statsTitle: "Статистика качества окон",
        statsGreen: "Высокое качество (зелёный)",
        statsYellow: "Пограничное качество (жёлтый)",
        statsRed: "Артефакты (красный)",
        chartTitle: "Распределение качества",
        distributionTitle: "Качество по каждому окну"
      },
      leads: {
        title: "12-канальный вид – реконструированное ЭКГ",
        description:
          "Здесь представлен реконструированный 12-канальный вид ЭКГ с учётом фиксированной геометрии текстильных электродов и показателей достоверности по каждому отведению.",
        gridTitle: "Реконструированное 12-канальное ЭКГ",
        confidenceLabel: "Уверенность",
        lowConfidenceHint:
          "Отведения с уверенностью < 0.80 подсвечены серым и не используются в Цифровом профиле сердца.",
        legendHigh: "Отведения с высокой уверенностью участвуют в профиле",
        legendLow: "Отведения с низкой уверенностью отображаются, но исключены из профиля"
      },
      profile: {
        title: "Цифровой профиль сердца – агрегированные параметры",
        description:
          "Здесь визуализируется Цифровой Профиль Сердца: медианные комплексы P–QRS–T, интервалы (PR, QRS, QT, QTc), электрическая ось и показатели вариабельности ритма.",

        metricsTitle: "Ключевые кардиопараметры",
        metricHr: "Частота сердечных сокращений",
        metricPr: "Интервал PR",
        metricQrs: "Длительность QRS",
        metricQt: "Интервал QT",
        metricQtc: "QTc (корректированный QT)",
        metricAxis: "Электрическая ось (фронтальная плоскость)",
        metricSdnn: "HRV SDNN",
        metricRmssd: "HRV RMSSD",

        qualityTitle: "Карта качества профиля",
        qualityHint:
          "В профиль входят только окна высокого качества (зелёные). Жёлтые и красные окна исключены или имеют меньший вес.",

        metaTitle: "Сводка записи",
        metaDuration: "Длительность",
        metaWindowsUsed: "Использованные окна",
        metaGeometry: "ID геометрии",
        metaVersion: "Версия профиля"
      },
      compare: {
        title: "Сравнение профилей – покой и нагрузка",
        description:
          "Здесь сравниваются два Цифровых Профиля Сердца (например, в покое и после нагрузки) с выделением изменений ЧСС, интервалов, электрической оси и показателей HRV.",

        leftTitle: "Профиль покоя",
        rightTitle: "Профиль после нагрузки",
        deltaTitle: "Ключевые изменения (Δ)",
        deltaHr: "Частота сердечных сокращений",
        deltaAxis: "Электрическая ось",
        deltaQtc: "Интервал QTc",
        deltaSdnn: "HRV SDNN",
        deltaRmssd: "HRV RMSSD",
        hint:
          "Всегда сравниваем пациента только с его базовым уровнем. Профиль покоя — стабильная опора, профиль после нагрузки показывает реакцию сердечно-сосудистой системы."
      }
    },
    liveLegendGreen: "Высокое качество, окно идёт в анализ",
    liveLegendYellow: "Пограничное качество, использовать с осторожностью",
    liveLegendRed: "Артефакты — исключено из анализа",
    footer: {
      disclaimer:
        "Данная демонстрация не является медицинским изделием и не даёт диагностических заключений."
    }
  },
  nl: {
    tabs: {
      live: {
        title: "Live ECG – meerkanaals signaal",
        description:
          "Deze weergave simuleert een live meerkanaals ECG-signaal. Het signaal wordt opgesplitst in vensters van 2 seconden, die later op kwaliteit worden ingekleurd (groen/geel/rood)."
      },
      quality: {
        title: "Signaalkwaliteit – groene / gele / rode vensters",
        description:
          "Deze weergave laat zien hoe elk 2-seconden venster wordt geclassificeerd op basis van ruis, baselinedrift, bewegingsartefacten en andere kwaliteitsparameters.",
        statsTitle: "Vensterkwaliteitsstatistiek",
        statsGreen: "Hoge kwaliteit (groen)",
        statsYellow: "Grenzgeval (geel)",
        statsRed: "Artefacten (rood)",
        chartTitle: "Kwaliteitsverdeling",
        distributionTitle: "Kwaliteit per venster"
      },
      leads: {
        title: "12-afleidingen weergave – gereconstrueerd ECG",
        description:
          "Deze weergave toont een gereconstrueerd 12-kanaals ECG met de vaste geometrie van textiele elektroden en een betrouwbaarheidsscore per afleiding.",
        gridTitle: "Gereconstrueerd 12-afleidingen ECG",
        confidenceLabel: "Betrouwbaarheid",
        lowConfidenceHint:
          "Afleidingen met betrouwbaarheid < 0.80 worden grijs getoond en niet gebruikt in het Digitale Hartprofiel.",
        legendHigh: "Afleidingen met hoge betrouwbaarheid die in het profiel gaan",
        legendLow: "Afleidingen met lage betrouwbaarheid worden getoond, maar niet meegenomen"
      },
      profile: {
        title: "Digitaal Hartprofiel – geaggregeerde parameters",
        description:
          "Deze weergave visualiseert het Digitale Hartprofiel: mediane P–QRS–T-complexen, intervallen (PR, QRS, QT, QTc), elektrische as en HRV-metingen.",

        metricsTitle: "Belangrijkste cardiale metrics",
        metricHr: "Hartritme",
        metricPr: "PR-interval",
        metricQrs: "QRS-duur",
        metricQt: "QT-interval",
        metricQtc: "QTc (gecorrigeerde QT)",
        metricAxis: "Elektrische as (frontaal vlak)",
        metricSdnn: "HRV SDNN",
        metricRmssd: "HRV RMSSD",

        qualityTitle: "Kwaliteitskaart van profiel",
        qualityHint:
          "Alleen ramen met hoge kwaliteit (groen) worden gebruikt om het profiel op te bouwen. Gele en rode ramen worden uitgesloten of lager gewogen.",

        metaTitle: "Samenvatting van de opname",
        metaDuration: "Duur",
        metaWindowsUsed: "Gebruikte ramen",
        metaGeometry: "Geometry-ID",
        metaVersion: "Profielversie"
      },
      compare: {
        title: "Profielen vergelijken – rust versus belasting",
        description:
          "Deze weergave vergelijkt twee Digitale Hartprofielen (bijvoorbeeld in rust en na belasting) en laat veranderingen in hartritme, intervallen, elektrische as en HRV zien.",

        leftTitle: "Rustprofiel",
        rightTitle: "Na-belasting profiel",
        deltaTitle: "Belangrijkste veranderingen (Δ)",
        deltaHr: "Hartritme",
        deltaAxis: "Elektrische as",
        deltaQtc: "QTc-interval",
        deltaSdnn: "HRV SDNN",
        deltaRmssd: "HRV RMSSD",
        hint:
          "We vergelijken de patiënt altijd met zijn of haar eigen basislijn. Het rustprofiel is het stabiele referentiepunt; het na-belasting profiel toont hoe het cardiovasculaire systeem reageert."
      }
    },
    liveLegendGreen: "Venster van hoge kwaliteit gebruikt voor analyse",
    liveLegendYellow: "Grenzeloze kwaliteit, met voorzichtigheid gebruiken",
    liveLegendRed: "Artefacten – uitgesloten van analyse",
    footer: {
      disclaimer:
        "Deze demo is geen medisch hulpmiddel en levert geen diagnostische conclusies."
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  let currentLang = "en";
  let currentTab = "live";
  let liveActiveWindowIndex = 0;
  let liveWindowTimer = null;

  const tabButtons = document.querySelectorAll(".tab-btn");
  const langButtons = document.querySelectorAll(".lang-btn");
  const tabContent = document.getElementById("tab-content");
  const footerDisclaimer = document.getElementById("footer-disclaimer");

  function setActiveTab(tab) {
    currentTab = tab;
    tabButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tab === tab);
    });
    renderTabContent();
  }

  function setActiveLanguage(lang) {
    currentLang = lang;
    langButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
    renderTabContent();
    renderFooter();
  }

  function renderTabContent() {
    const t = translations[currentLang];

    if (currentTab === "live") {
      renderLiveEcgView(tabContent, currentLang);
      return;
    }

    if (liveWindowTimer) {
      clearInterval(liveWindowTimer);
      liveWindowTimer = null;
    }

    if (currentTab === "quality") {
      renderQualityView(tabContent, currentLang);
      return;
    }

    if (currentTab === "leads") {
      renderLeadsView(tabContent, currentLang);
      return;
    }

    if (currentTab === "profile") {
      renderProfileView(tabContent, currentLang);
      return;
    }

    if (currentTab === "compare") {
      renderCompareView(tabContent, currentLang);
      return;
    }

    let title = "";
    let description = "";

    tabContent.innerHTML = `
      <h1 class="tab-title">${title}</h1>
      <p class="tab-description">${description}</p>
    `;
  }

  function createChannelSvg(values, { sampleRate, durationSeconds }) {
    const totalSamples = values.length;
    const sliceLength = sampleRate * durationSeconds;
    const startIndex = Math.max(0, totalSamples - sliceLength);
    const slice = values.slice(startIndex);

    const width = 800;
    const height = 60;

    const min = Math.min(...slice);
    const max = Math.max(...slice);
    const range = max - min || 1;

    const points = slice
      .map((v, i) => {
        const x = (i / (slice.length - 1 || 1)) * width;
        const y = height - ((v - min) / range) * (height - 4) - 2;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");

    return `
      <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
        <polyline
          points="${points}"
          fill="none"
          stroke="#22c55e"
          stroke-width="1.4"
          stroke-linejoin="round"
          stroke-linecap="round"
        />
      </svg>
    `;
  }

  function createLeadSvg(values) {
    const sampleRate = ecgDemoData.sampleRateHz || 250;
    const durationSeconds = 3;
    const totalSamples = values.length;
    const sliceLength = sampleRate * durationSeconds;
    const startIndex = Math.max(0, totalSamples - sliceLength);
    const slice = values.slice(startIndex);

    const width = 200;
    const height = 50;

    const min = Math.min(...slice);
    const max = Math.max(...slice);
    const range = max - min || 1;

    const points = slice
      .map((v, i) => {
        const x = (i / (slice.length - 1 || 1)) * width;
        const y = height - ((v - min) / range) * (height - 4) - 2;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");

    return `
      <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
        <polyline
          points="${points}"
          fill="none"
          stroke="#22c55e"
          stroke-width="1.2"
          stroke-linejoin="round"
          stroke-linecap="round"
        />
      </svg>
    `;
  }

  function createTemplateBeatSvg(values) {
    const width = 500;
    const height = 120;

    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    const points = values
      .map((v, i) => {
        const x = (i / (values.length - 1 || 1)) * width;
        const y = height - ((v - min) / range) * (height - 8) - 4;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");

    return `
      <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
        <polyline
          points="${points}"
          fill="none"
          stroke="#22c55e"
          stroke-width="2"
          stroke-linejoin="round"
          stroke-linecap="round"
        />
      </svg>
    `;
  }

  function buildWindowsStrip(windows) {
    return windows
      .map((w, idx) => {
        return `<div class="live-ecg-window ${w.quality}" data-window-index="${idx}"></div>`;
      })
      .join("");
  }

  function highlightActiveWindow() {
    const strip = document.getElementById("live-ecg-windows-strip");
    if (!strip) return;

    const items = strip.querySelectorAll(".live-ecg-window");
    items.forEach((el, idx) => {
      el.classList.toggle("active", idx === liveActiveWindowIndex);
    });
  }

  function renderQualityView(container, lang) {
    const t = translations[lang].tabs.quality;
    const stats = ecgDemoData.qualityStats;
    const windows = ecgDemoData.windows;

    const statsHtml = `
      <div class="quality-stats">
        <div class="quality-stat-item">
          <div>${t.statsGreen}</div>
          <h2>${stats.greenPct}%</h2>
          <div class="stat-sub">${stats.greenCount} / ${stats.total}</div>
        </div>
        <div class="quality-stat-item">
          <div>${t.statsYellow}</div>
          <h2>${stats.yellowPct}%</h2>
          <div class="stat-sub">${stats.yellowCount} / ${stats.total}</div>
        </div>
        <div class="quality-stat-item">
          <div>${t.statsRed}</div>
          <h2>${stats.redPct}%</h2>
          <div class="stat-sub">${stats.redCount} / ${stats.total}</div>
        </div>
      </div>
    `;

    const chartHtml = `
      <div>
        <h3>${t.chartTitle}</h3>
        <svg class="quality-chart" viewBox="0 0 120 120" aria-label="${t.chartTitle}">
          <rect x="18" y="${100 - stats.greenPct}" width="22" height="${stats.greenPct}" rx="3" fill="rgba(16,185,129,0.8)"></rect>
          <rect x="49" y="${100 - stats.yellowPct}" width="22" height="${stats.yellowPct}" rx="3" fill="rgba(245,158,11,0.8)"></rect>
          <rect x="80" y="${100 - stats.redPct}" width="22" height="${stats.redPct}" rx="3" fill="rgba(239,68,68,0.8)"></rect>
          <text x="29" y="112" text-anchor="middle" font-size="8" fill="#6b7280">G</text>
          <text x="60" y="112" text-anchor="middle" font-size="8" fill="#6b7280">Y</text>
          <text x="91" y="112" text-anchor="middle" font-size="8" fill="#6b7280">R</text>
        </svg>
      </div>
    `;

    const distHtml = `
      <div>
        <h3>${t.distributionTitle}</h3>
        <div class="quality-distribution-strip">
          ${windows
            .map((w) => `<div class="quality-window ${w.quality}" title="#${w.id}"></div>`)
            .join("")}
        </div>
      </div>
    `;

    container.innerHTML = `
      <h1 class="tab-title">${t.title}</h1>
      <p class="tab-description">${t.description}</p>
      <div class="quality-layout">
        <div>
          <h3>${t.statsTitle}</h3>
          ${statsHtml}
        </div>
        ${chartHtml}
        ${distHtml}
      </div>
    `;
  }

  function renderLeadsView(container, lang) {
    const t = translations[lang].tabs.leads;
    const leads = ecgDemoData.leads12 || [];

    const cardsHtml = leads
      .map((lead) => {
        const isLow = lead.confidence < 0.8;
        const svg = createLeadSvg(lead.values);
        return `
        <div class="lead-card">
          <div class="lead-header">
            <span class="lead-label">${lead.label}</span>
            <span class="lead-confidence ${isLow ? "low" : ""}">
              ${t.confidenceLabel}: ${(lead.confidence * 100).toFixed(0)}%
            </span>
          </div>
          <div class="lead-plot ${isLow ? "low-confidence" : ""}">
            ${svg}
          </div>
        </div>
      `;
      })
      .join("");

    const legendLines = [t.legendHigh, t.legendLow, t.lowConfidenceHint]
      .filter(Boolean)
      .map((line) => `<div>${line}</div>`) // preserve order
      .join("");

    container.innerHTML = `
      <h1 class="tab-title">${t.title}</h1>
      <p class="tab-description">${t.description}</p>
      <div class="leads-layout">
        <h3>${t.gridTitle}</h3>
        <div class="leads-grid">
          ${cardsHtml}
        </div>
        <div class="leads-legend">
          ${legendLines || t.lowConfidenceHint || ""}
        </div>
      </div>
    `;
  }

  function renderProfileView(container, lang) {
    const t = translations[lang].tabs.profile;
    const profile = ecgDemoData.profiles?.rest;

    if (!profile) {
      container.innerHTML = `<p>No profile data available.</p>`;
      return;
    }

    const beatSvg = createTemplateBeatSvg(profile.templateBeat.values || []);
    const m = profile.intervals || {};
    const hrv = profile.hrv || {};
    const axis = profile.axis || {};
    const q = profile.qualityMap || {};
    const meta = profile.meta || {};

    const durationMinutes = Math.round((meta.durationSeconds || 0) / 60);

    const metricsHtml = `
      <div class="profile-metric-grid">
        <div class="profile-metric-card">
          <div class="profile-metric-label">${t.metricHr}</div>
          <div class="profile-metric-value">${m.hrBpm} bpm</div>
        </div>
        <div class="profile-metric-card">
          <div class="profile-metric-label">${t.metricPr}</div>
          <div class="profile-metric-value">${m.prMs} ms</div>
        </div>
        <div class="profile-metric-card">
          <div class="profile-metric-label">${t.metricQrs}</div>
          <div class="profile-metric-value">${m.qrsMs} ms</div>
        </div>
        <div class="profile-metric-card">
          <div class="profile-metric-label">${t.metricQt}</div>
          <div class="profile-metric-value">${m.qtMs} ms</div>
        </div>
        <div class="profile-metric-card">
          <div class="profile-metric-label">${t.metricQtc}</div>
          <div class="profile-metric-value">${m.qtcMs} ms</div>
        </div>
        <div class="profile-metric-card">
          <div class="profile-metric-label">${t.metricAxis}</div>
          <div class="profile-metric-value">${axis.frontalPlaneDeg}°</div>
        </div>
        <div class="profile-metric-card">
          <div class="profile-metric-label">${t.metricSdnn}</div>
          <div class="profile-metric-value">${hrv.sdnnMs} ms</div>
        </div>
        <div class="profile-metric-card">
          <div class="profile-metric-label">${t.metricRmssd}</div>
          <div class="profile-metric-value">${hrv.rmssdMs} ms</div>
        </div>
      </div>
    `;

    const qualityStripHtml = `
      <div class="profile-quality-strip">
        <div class="profile-quality-segment green" style="flex-basis: ${q.greenPct}%;"></div>
        <div class="profile-quality-segment yellow" style="flex-basis: ${q.yellowPct}%;"></div>
        <div class="profile-quality-segment red" style="flex-basis: ${q.redPct}%;"></div>
      </div>
    `;

    const metaHtml = `
      <div class="profile-meta">
        <div class="profile-meta-row">
          <span class="profile-meta-label">${t.metaDuration}:</span>
          <span>${durationMinutes} min</span>
        </div>
        <div class="profile-meta-row">
          <span class="profile-meta-label">${t.metaWindowsUsed}:</span>
          <span>${meta.windowsUsed}</span>
        </div>
        <div class="profile-meta-row">
          <span class="profile-meta-label">${t.metaGeometry}:</span>
          <span>${meta.geometryId}</span>
        </div>
        <div class="profile-meta-row">
          <span class="profile-meta-label">${t.metaVersion}:</span>
          <span>${meta.version}</span>
        </div>
      </div>
    `;

    container.innerHTML = `
      <h1 class="tab-title">${t.title}</h1>
      <p class="tab-description">${t.description}</p>

      <div class="profile-layout">
        <div class="profile-main">
          <div class="profile-left">
            <div class="profile-template-card">
              <h3 class="profile-template-title">${profile.label}</h3>
              <div class="profile-template-plot">
                ${beatSvg}
              </div>
            </div>
          </div>
          <div class="profile-right">
            <h3>${t.metricsTitle}</h3>
            ${metricsHtml}
            <h4 style="margin-top:16px;">${t.metaTitle}</h4>
            ${metaHtml}
          </div>
        </div>

        <div class="profile-quality">
          <div style="font-size:13px; margin-bottom:4px;">${t.qualityTitle}</div>
          ${qualityStripHtml}
          <div style="font-size:12px; margin-top:6px; color: var(--text-muted);">
            ${t.qualityHint}
          </div>
        </div>
      </div>
    `;
  }

  function renderCompareView(container, lang) {
    const t = translations[lang].tabs.compare;
    const rest = ecgDemoData.profiles?.rest;
    const load = ecgDemoData.profiles?.load;

    if (!rest || !load) {
      container.innerHTML = "<p>No profiles available for comparison.</p>";
      return;
    }

    const r = rest.intervals || {};
    const l = load.intervals || {};
    const rHrv = rest.hrv || {};
    const lHrv = load.hrv || {};
    const rAxis = rest.axis || {};
    const lAxis = load.axis || {};

    const dHr = (l.hrBpm || 0) - (r.hrBpm || 0);
    const dAxis = (lAxis.frontalPlaneDeg || 0) - (rAxis.frontalPlaneDeg || 0);
    const dQtc = (l.qtcMs || 0) - (r.qtcMs || 0);
    const dSdnn = (lHrv.sdnnMs || 0) - (rHrv.sdnnMs || 0);
    const dRmssd = (lHrv.rmssdMs || 0) - (rHrv.rmssdMs || 0);

    function formatDelta(value, unit, invertDirectionForLowerIsBetter = false) {
      const sign = value > 0 ? "+" : value < 0 ? "−" : "±";
      const absVal = Math.abs(value);
      const directionUp = invertDirectionForLowerIsBetter ? value < 0 : value > 0;
      const directionDown = invertDirectionForLowerIsBetter ? value > 0 : value < 0;
      let cls = "";
      if (directionUp) cls = "up";
      else if (directionDown) cls = "down";
      return { text: `${sign}${absVal}${unit}`.trim(), cls };
    }

    const deltaHr = formatDelta(dHr, " bpm", false);
    const deltaAxis = formatDelta(dAxis, "°", false);
    const deltaQtc = formatDelta(dQtc, " ms", false);
    const deltaSdnn = formatDelta(dSdnn, " ms", true);
    const deltaRmssd = formatDelta(dRmssd, " ms", true);

    const leftMetricsHtml = `
      <div class="compare-metric-list">
        <div class="compare-metric-row">
          <span class="compare-metric-label">${t.deltaHr}:</span>
          <span class="compare-metric-value">${r.hrBpm} bpm</span>
        </div>
        <div class="compare-metric-row">
          <span class="compare-metric-label">${t.deltaAxis}:</span>
          <span class="compare-metric-value">${rAxis.frontalPlaneDeg}°</span>
        </div>
        <div class="compare-metric-row">
          <span class="compare-metric-label">${t.deltaQtc}:</span>
          <span class="compare-metric-value">${r.qtcMs} ms</span>
        </div>
        <div class="compare-metric-row">
          <span class="compare-metric-label">${t.deltaSdnn}:</span>
          <span class="compare-metric-value">${rHrv.sdnnMs} ms</span>
        </div>
        <div class="compare-metric-row">
          <span class="compare-metric-label">${t.deltaRmssd}:</span>
          <span class="compare-metric-value">${rHrv.rmssdMs} ms</span>
        </div>
      </div>
    `;

    const rightMetricsHtml = `
      <div class="compare-metric-list">
        <div class="compare-metric-row">
          <span class="compare-metric-label">${t.deltaHr}:</span>
          <span class="compare-metric-value">${l.hrBpm} bpm</span>
        </div>
        <div class="compare-metric-row">
          <span class="compare-metric-label">${t.deltaAxis}:</span>
          <span class="compare-metric-value">${lAxis.frontalPlaneDeg}°</span>
        </div>
        <div class="compare-metric-row">
          <span class="compare-metric-label">${t.deltaQtc}:</span>
          <span class="compare-metric-value">${l.qtcMs} ms</span>
        </div>
        <div class="compare-metric-row">
          <span class="compare-metric-label">${t.deltaSdnn}:</span>
          <span class="compare-metric-value">${lHrv.sdnnMs} ms</span>
        </div>
        <div class="compare-metric-row">
          <span class="compare-metric-label">${t.deltaRmssd}:</span>
          <span class="compare-metric-value">${lHrv.rmssdMs} ms</span>
        </div>
      </div>
    `;

    const deltaHtml = `
      <div class="compare-delta">
        <div class="compare-delta-title">${t.deltaTitle}</div>
        <div class="compare-delta-row">
          <span class="compare-delta-label">${t.deltaHr}</span>
          <span class="compare-delta-value ${deltaHr.cls}">${deltaHr.text}</span>
        </div>
        <div class="compare-delta-row">
          <span class="compare-delta-label">${t.deltaAxis}</span>
          <span class="compare-delta-value ${deltaAxis.cls}">${deltaAxis.text}</span>
        </div>
        <div class="compare-delta-row">
          <span class="compare-delta-label">${t.deltaQtc}</span>
          <span class="compare-delta-value ${deltaQtc.cls}">${deltaQtc.text}</span>
        </div>
        <div class="compare-delta-row">
          <span class="compare-delta-label">${t.deltaSdnn}</span>
          <span class="compare-delta-value ${deltaSdnn.cls}">${deltaSdnn.text}</span>
        </div>
        <div class="compare-delta-row">
          <span class="compare-delta-label">${t.deltaRmssd}</span>
          <span class="compare-delta-value ${deltaRmssd.cls}">${deltaRmssd.text}</span>
        </div>
      </div>
    `;

    container.innerHTML = `
      <h1 class="tab-title">${t.title}</h1>
      <p class="tab-description">${t.description}</p>

      <div class="compare-layout">
        <div class="compare-main">
          <div class="compare-column">
            <div class="compare-profile-title">${t.leftTitle}</div>
            ${leftMetricsHtml}
          </div>
          <div class="compare-column">
            <div class="compare-profile-title">${t.rightTitle}</div>
            ${rightMetricsHtml}
          </div>
        </div>
        ${deltaHtml}
        <p style="font-size:12px; color: var(--text-muted); margin-top:4px;">
          ${t.hint}
        </p>
      </div>
    `;
  }

  function renderLiveEcgView(container, lang) {
    const t = translations[lang];
    const channels = ecgDemoData.channels;
    const windows = ecgDemoData.windows;

    const title = t.tabs.live.title;
    const description = t.tabs.live.description;

    const windowStripHtml = buildWindowsStrip(windows);
    const channelsHtml = channels
      .map((ch) => {
        const svg = createChannelSvg(ch.values, {
          sampleRate: ecgDemoData.sampleRateHz,
          durationSeconds: 4
        });
        return `
          <div class="live-ecg-channel">
            <div class="live-ecg-channel-label">${ch.label}</div>
            <div class="live-ecg-channel-plot">${svg}</div>
          </div>
        `;
      })
      .join("");

    container.innerHTML = `
      <h1 class="tab-title">${title}</h1>
      <p class="tab-description">${description}</p>

      <div class="live-ecg-layout">
        <div class="live-ecg-top">
          ${channelsHtml}
        </div>
        <div class="live-ecg-bottom">
          <div class="live-ecg-windows-strip" id="live-ecg-windows-strip">
            ${windowStripHtml}
          </div>
          <div class="live-ecg-legend">
            <div class="live-ecg-legend-item">
              <span class="live-ecg-legend-dot green"></span>
              <span>${t.liveLegendGreen || "High-quality window used for analysis"}</span>
            </div>
            <div class="live-ecg-legend-item">
              <span class="live-ecg-legend-dot yellow"></span>
              <span>${t.liveLegendYellow || "Borderline quality, used with caution"}</span>
            </div>
            <div class="live-ecg-legend-item">
              <span class="live-ecg-legend-dot red"></span>
              <span>${t.liveLegendRed || "Artefacts – excluded from analysis"}</span>
            </div>
          </div>
        </div>
      </div>
    `;

    if (liveWindowTimer) {
      clearInterval(liveWindowTimer);
    }

    liveActiveWindowIndex = 0;
    highlightActiveWindow();
    liveWindowTimer = setInterval(() => {
      liveActiveWindowIndex = (liveActiveWindowIndex + 1) % (windows.length || 1);
      highlightActiveWindow();
    }, 900);
  }

  function renderFooter() {
    const t = translations[currentLang];
    footerDisclaimer.textContent = t.footer.disclaimer;
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setActiveTab(btn.dataset.tab);
    });
  });

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setActiveLanguage(btn.dataset.lang);
    });
  });

  renderTabContent();
  renderFooter();
});
