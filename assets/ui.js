const translations = {
  en: {
    tabs: {
      live: {
        title: "Live ECG – multi-channel stream",
        description:
          "This view simulates a live multi-channel ECG feed. The signal is segmented into 2-second windows and will later be color-coded by quality (green/yellow/red).",
        segmentationToggleOn: "Hide 2-second windows",
        segmentationToggleOff: "Show 2-second windows",
        segmentationHint:
          "Vertical lines and colored bands show how the ECG is segmented into 2-second windows for quality analysis."
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
    signalQuality: {
      infoButton: "How quality is calculated",
      drawerTitle: "How we calculate signal quality",
      drawerIntro:
        "SPA2099 evaluates ECG in 2-second windows and assigns each window a quality level. Green windows are used for diagnostics and baseline, yellow only for trends, red are excluded from analysis.",
      levelsTitle: "How we classify windows",
      examplesTitle: "Examples of artefacts",
      closeDrawer: "Close panel",
      indexNoiseTitle: "Q_noise — noise & mains frequency",
      indexNoiseText:
        "High-frequency noise or mains hum on top of the ECG that reduces morphology clarity.",
      indexDriftTitle: "Q_drift — baseline drift",
      indexDriftText:
        "Slow baseline shift due to movement or electrode displacement that makes the isoelectric line unstable.",
      indexImpTitle: "Q_imp — impulse artefacts",
      indexImpText:
        "Sharp spikes caused by cable motion or muscle activity that distort the QRS complexes.",
      indexReconTitle: "Q_recon — channel consistency & reconstruction quality",
      indexReconText:
        "Inconsistency between channels or reconstruction artefacts when deriving the 12-lead layout.",
      greenTitle: "Green windows",
      greenText:
        "Q* ≥ 0.75–0.85, no saturation, per-lead accuracy ≥ 0.85. Used for diagnostics, baseline and stress/burnout metrics.",
      yellowTitle: "Yellow windows",
      yellowText:
        "Q* ≈ 0.60–0.75 or moderate artifacts. Used for trend statistics only; do not affect baseline.",
      redTitle: "Red windows",
      redText:
        "Q* < 0.60 or severe artifacts (noise, drift, impulses, channel mismatch). Excluded from analysis.",
      showExamples: "Show examples",
      tooltipGreen:
        "Green windows — high-quality ECG segments used for diagnostics, baseline profile and detailed metrics.",
      tooltipYellow:
        "Yellow windows — medium-quality segments used for trend statistics only. They do not update the baseline profile.",
      tooltipRed:
        "Red windows — segments with severe artifacts (noise, drift, impulses or channel mismatch). They are excluded from analysis."
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
          "Здесь имитируется поток многоканального ЭКГ. Сигнал разбивается на 2-секундные окна, которые в дальнейшем будут подсвечиваться по качеству (зелёный/жёлтый/красный).",
        segmentationToggleOn: "Скрыть 2-секундные окна",
        segmentationToggleOff: "Показать 2-секундные окна",
        segmentationHint:
          "Вертикальные линии и цветные полосы показывают, как ЭКГ делится на 2-секундные окна для анализа качества."
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
    signalQuality: {
      infoButton: "Как определяется качество",
      drawerTitle: "Как мы определяем качество сигнала",
      drawerIntro:
        "SPA2099 оценивает ЭКГ каждые 2 секунды и присваивает каждому окну уровень качества. Зелёные окна используются для диагностики и базового профиля, жёлтые — только для трендов, красные — полностью исключаются из анализа.",
      levelsTitle: "Как мы классифицируем окна",
      examplesTitle: "Примеры артефактов",
      closeDrawer: "Закрыть панель",
      indexNoiseTitle: "Q_noise — шум и наводки",
      indexNoiseText:
        "Высокочастотный шум или сетевые наводки поверх ЭКГ, ухудшающие читаемость морфологии.",
      indexDriftTitle: "Q_drift — дрейф изолинии",
      indexDriftText:
        "Медленное смещение базовой линии из-за движения или смещения электродов, делающие изолинию нестабильной.",
      indexImpTitle: "Q_imp — импульсные артефакты",
      indexImpText:
        "Резкие всплески из-за движения кабеля или мышечной активности, искажающие комплексы QRS.",
      indexReconTitle: "Q_recon — согласованность каналов и реконструкция",
      indexReconText:
        "Несоответствие между каналами или артефакты реконструкции при формировании 12-канальной раскладки.",
      greenTitle: "Зелёные окна",
      greenText:
        "Q* ≥ 0.75–0.85, нет насыщения, per-lead accuracy ≥ 0.85. Используются для диагностики, baseline-профиля и расчёта стресса/выгорания.",
      yellowTitle: "Жёлтые окна",
      yellowText:
        "Q* ≈ 0.60–0.75 или умеренные артефакты. Используются только для трендов, не влияют на baseline.",
      redTitle: "Красные окна",
      redText:
        "Q* < 0.60 или выраженные артефакты (шум, дрейф, импульсы, рассогласование каналов). Исключаются из анализа.",
      showExamples: "Показать примеры",
      tooltipGreen:
        "Зелёные окна — качественные сегменты ЭКГ, которые используются для диагностики, baseline-профиля и детальных метрик.",
      tooltipYellow:
        "Жёлтые окна — сегменты среднего качества, которые используются только для статистики трендов и не обновляют baseline-профиль.",
      tooltipRed:
        "Красные окна — сегменты с выраженными артефактами (шум, дрейф, импульсы, рассогласование каналов). Исключаются из анализа."
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
          "Deze weergave simuleert een live meerkanaals ECG-signaal. Het signaal wordt opgesplitst in vensters van 2 seconden, die later op kwaliteit worden ingekleurd (groen/geel/rood).",
        segmentationToggleOn: "2-seconden vensters verbergen",
        segmentationToggleOff: "2-seconden vensters tonen",
        segmentationHint:
          "Verticale lijnen en gekleurde banden tonen hoe het ECG in 2-seconden vensters wordt opgedeeld voor kwaliteitsanalyse."
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
    signalQuality: {
      infoButton: "How quality is calculated",
      drawerTitle: "How we calculate signal quality",
      drawerIntro:
        "SPA2099 evaluates ECG in 2-second windows and assigns each window a quality level. Green windows are used for diagnostics and baseline, yellow only for trends, red are excluded from analysis.",
      levelsTitle: "How we classify windows",
      examplesTitle: "Examples of artefacts",
      closeDrawer: "Close panel",
      indexNoiseTitle: "Q_noise — noise & mains frequency",
      indexNoiseText:
        "High-frequency noise or mains hum on top of the ECG that reduces morphology clarity.",
      indexDriftTitle: "Q_drift — baseline drift",
      indexDriftText:
        "Slow baseline shift due to movement or electrode displacement that makes the isoelectric line unstable.",
      indexImpTitle: "Q_imp — impulse artefacts",
      indexImpText:
        "Sharp spikes caused by cable motion or muscle activity that distort the QRS complexes.",
      indexReconTitle: "Q_recon — channel consistency & reconstruction quality",
      indexReconText:
        "Inconsistency between channels or reconstruction artefacts when deriving the 12-lead layout.",
      greenTitle: "Green windows",
      greenText:
        "Q* ≥ 0.75–0.85, no saturation, per-lead accuracy ≥ 0.85. Used for diagnostics, baseline and stress/burnout metrics.",
      yellowTitle: "Yellow windows",
      yellowText:
        "Q* ≈ 0.60–0.75 or moderate artifacts. Used for trend statistics only; do not affect baseline.",
      redTitle: "Red windows",
      redText:
        "Q* < 0.60 or severe artifacts (noise, drift, impulses, channel mismatch). Excluded from analysis.",
      showExamples: "Show examples",
      tooltipGreen:
        "Green windows — high-quality ECG segments used for diagnostics, baseline profile and detailed metrics.",
      tooltipYellow:
        "Yellow windows — medium-quality segments used for trend statistics only. They do not update the baseline profile.",
      tooltipRed:
        "Red windows — segments with severe artifacts (noise, drift, impulses or channel mismatch). They are excluded from analysis."
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

let liveSegmentationEnabled = false;
let isQualityDrawerOpen = false;
let scrollToExamplesAfterOpen = false;

function getSignalQualityStrings(lang) {
  const base = translations.en.signalQuality;
  const current = translations[lang]?.signalQuality;
  return { ...base, ...(current || {}) };
}

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
    if (tab !== "quality") {
      closeQualityDrawer();
    }
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

  function createEcgExample(type) {
    const width = 280;
    const height = 80;

    const base = [
      [0, 50],
      [30, 48],
      [50, 52],
      [70, 30],
      [90, 65],
      [110, 40],
      [140, 55],
      [170, 45],
      [190, 50],
      [220, 42],
      [240, 65],
      [260, 50],
      [280, 52]
    ];

    function toPolyline(points) {
      return points
        .map(([x, y]) => `${x},${y}`)
        .join(" ");
    }

    const overlays = {
      noise: toPolyline(
        base.map(([x, y], idx) => [x, y + Math.sin(idx * 2) * 3 + (idx % 2 === 0 ? 2 : -2)])
      ),
      drift: toPolyline(base.map(([x, y]) => [x, y + (x / width) * 10 - 5])),
      impulses: toPolyline(
        [...base].map(([x, y]) => {
          if (x === 140 || x === 200) return [x, y - 25];
          return [x, y];
        })
      ),
      recon: toPolyline(
        base.map(([x, y], idx) => [x, y + (idx > 6 && idx < 9 ? (idx % 2 === 0 ? 10 : -10) : 0)])
      )
    };

    const primaryLine = toPolyline(base);
    const overlayLine = overlays[type] || primaryLine;

    return `
      <svg viewBox="0 0 ${width} ${height}" class="ecg-example" aria-hidden="true">
        <rect x="0" y="0" width="${width}" height="${height}" fill="#0b1120" rx="8" />
        <polyline
          points="${primaryLine}"
          fill="none"
          stroke="#22c55e"
          stroke-width="2"
          stroke-linejoin="round"
          stroke-linecap="round"
        />
        <polyline
          points="${overlayLine}"
          fill="none"
          stroke="${type === "drift" ? "#f59e0b" : "#f87171"}"
          stroke-width="1.6"
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-dasharray="${type === "recon" ? "5,4" : ""}"
        />
      </svg>
    `;
  }

  function ensureQualityDrawerContainer() {
    if (!document.getElementById("quality-drawer-root")) {
      const el = document.createElement("div");
      el.id = "quality-drawer-root";
      document.body.appendChild(el);
    }
  }

  function renderQualityDrawer(lang) {
    ensureQualityDrawerContainer();
    const tSignal = getSignalQualityStrings(lang);
    const root = document.getElementById("quality-drawer-root");
    if (!root) return;

    root.innerHTML = `
      <div class="quality-drawer-overlay ${isQualityDrawerOpen ? "open" : ""}" id="quality-drawer-overlay"></div>
      <aside class="quality-drawer ${isQualityDrawerOpen ? "open" : ""}" id="quality-drawer" aria-hidden="${!isQualityDrawerOpen}">
        <div class="quality-drawer-header">
          <h3 class="quality-drawer-title">${tSignal.drawerTitle}</h3>
          <button class="drawer-close-btn" id="quality-drawer-close" aria-label="${tSignal.closeDrawer}">×</button>
        </div>
        <div class="quality-drawer-content">
          <div class="drawer-section">
            <strong>${tSignal.drawerTitle}</strong>
            <p>${tSignal.drawerIntro}</p>
          </div>
          <div class="drawer-section" id="quality-drawer-examples">
            <div style="font-weight:600;">${tSignal.examplesTitle}</div>
            <div class="artefact-grid">
              <div class="artefact-card">
                <h4>${tSignal.indexNoiseTitle}</h4>
                <div class="artefact-example">${createEcgExample("noise")}</div>
                <p>${tSignal.indexNoiseText}</p>
              </div>
              <div class="artefact-card">
                <h4>${tSignal.indexDriftTitle}</h4>
                <div class="artefact-example">${createEcgExample("drift")}</div>
                <p>${tSignal.indexDriftText}</p>
              </div>
              <div class="artefact-card">
                <h4>${tSignal.indexImpTitle}</h4>
                <div class="artefact-example">${createEcgExample("impulses")}</div>
                <p>${tSignal.indexImpText}</p>
              </div>
              <div class="artefact-card">
                <h4>${tSignal.indexReconTitle}</h4>
                <div class="artefact-example">${createEcgExample("recon")}</div>
                <p>${tSignal.indexReconText}</p>
              </div>
            </div>
          </div>
          <div class="drawer-section">
            <div style="font-weight:600;">${tSignal.levelsTitle}</div>
            <div class="classification-cards">
              <div class="classification-card green">
                <h4>${tSignal.greenTitle}</h4>
                <p>${tSignal.greenText}</p>
              </div>
              <div class="classification-card yellow">
                <h4>${tSignal.yellowTitle}</h4>
                <p>${tSignal.yellowText}</p>
              </div>
              <div class="classification-card red">
                <h4>${tSignal.redTitle}</h4>
                <p>${tSignal.redText}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    `;

    const overlay = document.getElementById("quality-drawer-overlay");
    const closeBtn = document.getElementById("quality-drawer-close");
    if (overlay) overlay.onclick = () => closeQualityDrawer();
    if (closeBtn) closeBtn.onclick = () => closeQualityDrawer();

    if (isQualityDrawerOpen && scrollToExamplesAfterOpen) {
      setTimeout(() => {
        const target = document.getElementById("quality-drawer-examples");
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        scrollToExamplesAfterOpen = false;
      }, 80);
    }
  }

  function openQualityDrawer(options = {}) {
    isQualityDrawerOpen = true;
    scrollToExamplesAfterOpen = !!options.scrollToExamples;
    renderQualityDrawer(currentLang);
  }

  function closeQualityDrawer() {
    isQualityDrawerOpen = false;
    scrollToExamplesAfterOpen = false;
    renderQualityDrawer(currentLang);
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

  function setupSegmentationToggle() {
    const btn = document.getElementById("segmentation-toggle");
    if (!btn) return;
    btn.addEventListener("click", () => {
      liveSegmentationEnabled = !liveSegmentationEnabled;
      renderTabContent();
    });
  }

  function renderSegmentationOverlay() {
    const overlays = document.querySelectorAll(".live-ecg-overlay");
    if (!overlays.length) return;

    if (!liveSegmentationEnabled) {
      overlays.forEach((ov) => (ov.innerHTML = ""));
      return;
    }

    const sampleRate = ecgDemoData.sampleRateHz || 250;
    const durationSeconds = 4;
    const sliceLength = sampleRate * durationSeconds;
    const totalSamples = ecgDemoData.channels[0].values.length;
    const sliceStart = Math.max(0, totalSamples - sliceLength);
    const sliceEnd = totalSamples;

    const bands = [];

    ecgDemoData.windows.forEach((w) => {
      const wStart = w.startIndex;
      const wEnd = w.endIndex;
      if (wEnd <= sliceStart || wStart >= sliceEnd) return;

      const visibleStart = Math.max(wStart, sliceStart);
      const visibleEnd = Math.min(wEnd, sliceEnd);

      const startPct = ((visibleStart - sliceStart) / sliceLength) * 100;
      const endPct = ((visibleEnd - sliceStart) / sliceLength) * 100;

      bands.push({
        quality: w.quality,
        startPct,
        endPct
      });
    });

    const overlayHtml = bands
      .map((b) => {
        return `
        <div class="live-ecg-seg-band ${b.quality}"
             style="left: ${b.startPct}%; width: ${b.endPct - b.startPct}%;"></div>
        <div class="live-ecg-seg-line" style="left: ${b.startPct}%;"></div>
      `;
      })
      .join("");

    overlays.forEach((ov) => {
      ov.innerHTML = overlayHtml;
    });
  }

  function renderQualityView(container, lang) {
    const t = translations[lang].tabs.quality;
    const tSignal = getSignalQualityStrings(lang);
    const stats = ecgDemoData.qualityStats;
    const windows = ecgDemoData.windows;

    const statsHtml = `
      <div class="quality-stats">
        <div class="quality-stat-item tooltip-wrapper" tabindex="0">
          <div>${t.statsGreen}</div>
          <h2>${stats.greenPct}%</h2>
          <div class="stat-sub">${stats.greenCount} / ${stats.total}</div>
          <div class="tooltip-bubble">${tSignal.tooltipGreen}</div>
        </div>
        <div class="quality-stat-item tooltip-wrapper" tabindex="0">
          <div>${t.statsYellow}</div>
          <h2>${stats.yellowPct}%</h2>
          <div class="stat-sub">${stats.yellowCount} / ${stats.total}</div>
          <div class="tooltip-bubble">${tSignal.tooltipYellow}</div>
        </div>
        <div class="quality-stat-item tooltip-wrapper" tabindex="0">
          <div>${t.statsRed}</div>
          <h2>${stats.redPct}%</h2>
          <div class="stat-sub">${stats.redCount} / ${stats.total}</div>
          <div class="tooltip-bubble">${tSignal.tooltipRed}</div>
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

    const actionsHtml = `
      <div class="quality-actions">
        <button class="ghost-button" id="quality-show-examples">${tSignal.showExamples}</button>
      </div>
    `;

    container.innerHTML = `
      <div class="tab-title-row">
        <h1 class="tab-title">${t.title}</h1>
        <div class="tab-title-actions">
          <button class="info-button" id="quality-info-btn">
            <span class="icon">i</span>
            <span>${tSignal.infoButton}</span>
          </button>
        </div>
      </div>
      <p class="tab-description">${t.description}</p>
      <div class="quality-layout">
        <div>
          <h3>${t.statsTitle}</h3>
          ${statsHtml}
        </div>
        ${chartHtml}
        ${distHtml}
        ${actionsHtml}
      </div>
    `;

    renderQualityDrawer(lang);

    const infoBtn = document.getElementById("quality-info-btn");
    if (infoBtn) {
      infoBtn.onclick = () => openQualityDrawer();
    }

    const examplesBtn = document.getElementById("quality-show-examples");
    if (examplesBtn) {
      examplesBtn.onclick = () => openQualityDrawer({ scrollToExamples: true });
    }
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
    const liveT = t.tabs.live;
    const channels = ecgDemoData.channels;
    const windows = ecgDemoData.windows;

    const toggleLabel = liveSegmentationEnabled
      ? liveT.segmentationToggleOn
      : liveT.segmentationToggleOff;

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
            <div class="live-ecg-channel-plot">
              <div class="live-ecg-channel-plot-inner" data-channel-id="${ch.id}">
                ${svg}
                <div class="live-ecg-overlay"></div>
              </div>
            </div>
          </div>
        `;
      })
      .join("");

    container.innerHTML = `
      <h1 class="tab-title">${liveT.title}</h1>
      <p class="tab-description">${liveT.description}</p>

      <div class="live-ecg-toolbar">
        <button id="segmentation-toggle" class="segmentation-toggle-btn ${
          liveSegmentationEnabled ? "active" : ""
        }">
          ${toggleLabel}
        </button>
        <span>${liveT.segmentationHint}</span>
      </div>

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

    setupSegmentationToggle();
    renderSegmentationOverlay();
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
