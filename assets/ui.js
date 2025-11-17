import { computeDeviationScore, classifyDeviation } from "./compare-utils.js";

const dataContainerContent = {
  en: {
    flow: {
      title: "Data Flow Architecture",
      text:
        "SPA2099 collects raw ECG and motion signals from the Healthbox, pre-processes them, and stores them in a unified Data Container. All visualisations and metrics on other pages use this container as a single source of truth.",
      steps: ["Healthbox", "Pre-processing", "Data Container", "Analytics", "UI dashboards"]
    },
    inside: {
      title: "What Is Inside the Data Container?",
      description:
        "The container keeps a synchronised slice of everything needed for the Digital Heart Profile: time range, ECG, detections, motion context and quality scores.",
      bullets: [
        "Recording time range (start/end timestamps).",
        "Raw ECG with up to 12 leads plus sampling-rate metadata.",
        "Detected R-peaks and RR intervals for rhythm metrics.",
        "Aligned IMU channels (accelerometer / gyroscope).",
        "Per-window quality metadata and Q-markers.",
        "Aggregated HRV blocks and summary statistics."
      ],
      codeSample: `{
  "timestamp_start": "2025-11-16 14:22:01",
  "timestamp_end": "2025-11-16 14:24:01",
  "ecg": {
    "leads": 12,
    "sampling_rate": 500,
    "data": [ ... ]
  },
  "rpeaks": [ ... ],
  "rr_intervals": [ ... ],
  "imu": {
    "acc": [ ... ],
    "gyro": [ ... ]
  },
  "quality": {
    "Q_noise": 0.12,
    "Q_IMU": 0.03,
    "Q_baseline": 0.04
  },
  "hrv_block": {
    "sdnn": 42,
    "rmssd": 38,
    "poincare_points": 512
  }
}`
    },
    segmentation: {
      title: "Segmentation Logic",
      text:
        "For all metrics SPA2099 uses 2-second base segments in the Data Container. These base segments are then combined into longer windows (30 s, 2 min, 5 min) depending on the metric.",
      timelineLabel: "ECG timeline (2-second base segments)",
      timelineNote:
        "Each Data Container segment covers 2 seconds of ECG and IMU data. Longer analysis windows (30 s, 2 min, 5 min) are built by combining multiple 2-second segments.",
      windows: ["2 s", "2 s", "2 s", "2 s", "2 s", "2 s"],
      metrics: [
        "RR & arrhythmia metrics (30 s = 15 × 2 s segments)",
        "Quality gating (2 s base segments)",
        "HRV block (2 min = 60 × 2 s segments)",
        "Stress trend (5 min = 150 × 2 s segments)"
      ]
    },
    quality: {
      title: "Quality Scores (Q-Markers)",
      text:
        "Each segment receives Q-markers that describe the main artefacts. They drive green/yellow/red gating across the demo.",
      markers: [
        {
          id: "Q_noise",
          title: "Q_noise",
          description: "Level of noise and 50/60 Hz powerline interference."
        },
        {
          id: "Q_drift",
          title: "Q_drift",
          description: "Baseline drift caused by breathing, slow movements or contact changes."
        },
        {
          id: "Q_IMU",
          title: "Q_IMU",
          description: "Motion artefacts detected using accelerometer and gyroscope data."
        },
        {
          id: "Q_gap",
          title: "Q_gap",
          description: "Gaps or missing fragments in the signal."
        },
        {
          id: "Q_contact",
          title: "Q_contact",
          description: "Quality of electrode-to-skin contact."
        }
      ],
      legendTitle: "Quality legend",
      legendClean: "Green — clean / usable",
      legendLimited: "Yellow — limited",
      legendCritical: "Red — unusable"
    },
    beforeAfter: {
      title: "Before & After Processing",
      text:
        "Each example shows the same 2-second slice from the Data Container before and after filtering, R-peak detection and baseline normalisation.",
      cards: [
        {
          type: "raw",
          label: "Before",
          title: "Raw ECG segment (2-second slice from the Data Container)",
          description: "Unfiltered signal with baseline drift, mains noise and motion spikes."
        },
        {
          type: "processed",
          label: "After",
          title: "Processed ECG segment (same 2-second slice after filtering and R-peak detection)",
          description: "Filtered waveform with detected R-peaks and a stabilised baseline."
        }
      ],
      note: "Schematic ECG sketches for illustration only (not real patient data)."
    },
    safety: {
      title: "Data Safety & Performance",
      text:
        "This demo uses synthetic and temporary data structures so no personal information is persisted.",
      bullets: [
        "The demo never stores personal identifiers or uploads ECG to a server.",
        "The Data Container lives only in memory while you view a record.",
        "Switching a session wipes the container and clears all windows.",
        "Production deployments can add encryption, access control and audit logs."
      ]
    }
  },
  ru: {
    flow: {
      title: "Архитектура потока данных",
      text:
        "SPA2099 собирает сырые сигналы ЭКГ и движения с прибора Healthbox, выполняет предобработку и сохраняет их в едином Контейнере данных. Все визуализации и метрики используют этот контейнер как единственный источник данных.",
      steps: ["Healthbox", "Предобработка", "Контейнер данных", "Аналитика", "Интерфейсы"]
    },
    inside: {
      title: "Что находится внутри Контейнера данных?",
      description:
        "Контейнер хранит синхронизированный набор всего, что нужно для Цифрового профиля сердца: временной диапазон, ЭКГ, детекции, контекст движения и показатели качества.",
      bullets: [
        "Диапазон времени записи (начало/конец).",
        "Сырые ЭКГ по всем 12 отведениям и частота дискретизации.",
        "Обнаруженные R-пики и интервалы RR для метрик ритма.",
        "Синхронизированные каналы IMU (акселерометр / гироскоп).",
        "Метаданные по качеству каждого окна и Q-маркеры.",
        "Агрегированные блоки HRV и сводные показатели."
      ],
      codeSample: `{
  "timestamp_start": "2025-11-16 14:22:01",
  "timestamp_end": "2025-11-16 14:24:01",
  "ecg": {
    "leads": 12,
    "sampling_rate": 500,
    "data": [ ... ]
  },
  "rpeaks": [ ... ],
  "rr_intervals": [ ... ],
  "imu": {
    "acc": [ ... ],
    "gyro": [ ... ]
  },
  "quality": {
    "Q_noise": 0.12,
    "Q_IMU": 0.03,
    "Q_baseline": 0.04
  },
  "hrv_block": {
    "sdnn": 42,
    "rmssd": 38,
    "poincare_points": 512
  }
}`
    },
    segmentation: {
      title: "Логика сегментации",
      text:
        "Для всех метрик SPA2099 использует 2-секундные базовые сегменты в Контейнере данных. Из этих сегментов формируются более длинные окна (30 секунд, 2 минуты, 5 минут) в зависимости от метрики.",
      timelineLabel: "Лента ЭКГ (2-секундные базовые сегменты)",
      timelineNote:
        "Каждый сегмент Контейнера данных охватывает 2 секунды ЭКГ и данных движения. Более длинные окна анализа (30 секунд, 2 минуты, 5 минут) строятся из нескольких 2-секундных сегментов.",
      windows: ["2 с", "2 с", "2 с", "2 с", "2 с", "2 с"],
      metrics: [
        "RR и аритмии (30 с = 15 × 2-секундных сегментов)",
        "Карта качества (базовые сегменты по 2 с)",
        "Блок HRV (2 мин = 60 × 2-секундных сегментов)",
        "Тренд/стресс (5 мин = 150 × 2-секундных сегментов)"
      ]
    },
    quality: {
      title: "Показатели качества (Q-маркеры)",
      text:
        "Каждый сегмент получает Q-маркеры, описывающие основные артефакты. Они определяют зелёное/жёлтое/красное выделение во всех разделах.",
      markers: [
        {
          id: "Q_noise",
          title: "Q_noise",
          description: "Уровень шумов и сетевых помех (50/60 Гц)."
        },
        {
          id: "Q_drift",
          title: "Q_drift",
          description: "Дрейф изолинии из-за дыхания, медленных движений или изменения контакта."
        },
        {
          id: "Q_IMU",
          title: "Q_IMU",
          description: "Движенческие артефакты, выявленные по акселерометру и гироскопу."
        },
        {
          id: "Q_gap",
          title: "Q_gap",
          description: "Пропуски или отсутствующие фрагменты сигнала."
        },
        {
          id: "Q_contact",
          title: "Q_contact",
          description: "Качество контакта электродов с кожей."
        }
      ],
      legendTitle: "Легенда качества",
      legendClean: "Зелёный — чисто / допустимо",
      legendLimited: "Жёлтый — ограничено",
      legendCritical: "Красный — непригодно"
    },
    beforeAfter: {
      title: "До и после обработки",
      text:
        "Каждый пример показывает один и тот же 2-секундный срез из Контейнера данных до и после фильтрации, детекции R-пиков и нормализации изолинии.",
      cards: [
        {
          type: "raw",
          label: "До",
          title: "Фрагмент ЭКГ (2-секундный срез из Контейнера данных)",
          description: "Неотфильтрованный сигнал с дрейфом, сетевым шумом и движенческими всплесками."
        },
        {
          type: "processed",
          label: "После",
          title: "Обработанный фрагмент (тот же 2-секундный срез после фильтрации и детекции R-пиков)",
          description: "Очищенная волна с отмеченными R-пиками и стабилизированной изолинией."
        }
      ],
      note: "Схематичные эскизы ЭКГ для иллюстрации (не реальные данные пациента)."
    },
    safety: {
      title: "Безопасность и производительность",
      text:
        "В демо используются синтетические и временные структуры, поэтому персональные данные не сохраняются.",
      bullets: [
        "Демо не хранит персональные идентификаторы и не выгружает ЭКГ на сервер.",
        "Контейнер данных существует только в памяти во время просмотра записи.",
        "Смена сессии очищает контейнер и удаляет все окна.",
        "В продуктивной версии добавляются шифрование, контроль доступа и аудит."
      ]
    }
  }
};

dataContainerContent.nl = JSON.parse(JSON.stringify(dataContainerContent.en));

const translations = {
  en: {
    tabs: {
      live: {
        label: "Live ECG",
        title: "Live ECG – multi-channel stream",
        description:
          "This view simulates a live multi-channel ECG feed. The signal is segmented into 2-second windows and will later be color-coded by quality (green/yellow/red).",
        segmentationToggleOn: "Hide 2-second windows",
        segmentationToggleOff: "Show 2-second windows",
        segmentationHint:
          "Vertical lines and colored bands show how the ECG is segmented into 2-second windows for quality analysis."
      },
      quality: {
        label: "Signal Quality",
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
        label: "12-Lead View",
        title: "12-Lead View – reconstructed ECG layout",
        description:
          "This view presents a reconstructed 12-lead ECG using the fixed geometry of the textile electrodes and per-lead confidence scores.",
        gridTitle: "Reconstructed 12-lead ECG",
        confidenceLabel: "Confidence",
        lowConfidenceHint:
          "Leads with confidence < 0.80 are greyed out and not used in the Digital Heart Profile.",
        recordedGroupTitle: "Recorded leads (7-lead input)",
        reconstructedGroupTitle: "Reconstructed leads (derived from 7-lead input)",
        badgeRecorded: "Recorded",
        badgeReconstructed: "Reconstructed",
        legendRecorded: "Recorded leads are acquired directly from the device.",
        legendReconstructed:
          "Reconstructed chest leads (V2–V6) are derived from the 7-lead input and included in the Digital Heart Profile only when confidence is sufficiently high.",
        legendHigh: "High-confidence leads used in profile",
        legendLow: "Low-confidence leads (visualised but excluded from profile)",
        howComputedToggleOn: "Hide how it’s computed",
        howComputedToggleOff: "Show how it’s computed",
        howComputedHint:
          "Hover V2–V6 to see which recorded leads contribute to each reconstructed lead."
      },
      "data-container": {
        label: "Data Container",
        title: "Data Container – from device to analytics",
        description:
          "Explore how SPA2099 curates ECG, motion and quality data before visualising it across the demo."
      },
      profile: {
        label: "Digital Heart Profile",
        title: "Digital Heart Profile – aggregated metrics",
        description:
          "This view visualises the Digital Heart Profile: median P–QRS–T complexes, intervals (PR, QRS, QT, QTc), electrical axis and HRV metrics.",

        leadProvTitle: "Lead provenance",
        leadProvLegendRecorded: "Recorded",
        leadProvLegendRecon: "Reconstructed",
        leadProvLegendExcluded: "Excluded",
        leadProvConfidenceNote:
          "Profile built from recorded limb leads plus reconstructed chest leads. Only high-confidence leads are included.",

        showIntervals: "Show intervals",
        hideIntervals: "Hide intervals",
        intervalsHint:
          "Toggle interval markers to see detected P/PR/QRS/ST/QT boundaries on the median beat.",

        metricsTitle: "Key cardiac metrics",
        metricHr: "Heart rate",
        metricPr: "PR interval",
        metricQrs: "QRS duration",
        metricQt: "QT interval",
        metricQtc: "QTc (corrected QT)",
        metricAxis: "Electrical axis (frontal plane)",
        metricSdnn: "HRV SDNN",
        metricRmssd: "HRV RMSSD",
        metricSourceLabel: "Source",
        axisTitle: "Frontal electrical axis",
        hrvPnn50Label: "pNN50",

        qualityTitle: "Profile quality map",
        qualityHint:
          "Only high-quality (green) windows are used to build the profile. Yellow and red windows are excluded or down-weighted.",
        qualitySummaryWindows:
          "Windows used: Green {greenPct}% ({greenCount}/{total}), Yellow {yellowPct}%, Red {redPct}%.",
        qualitySummaryLeads:
          "Leads included in profile: {recCount} recorded + {reconCount} reconstructed (excluded: {excluded}).",

        metaTitle: "Recording summary",
        metaDuration: "Duration",
        metaWindowsUsed: "Windows used",
        metaGeometry: "Geometry ID",
        metaVersion: "Profile version"
      },
      compare: {
        label: "Compare",
        title: "Compare Profiles – rest vs after load",
        description:
          "This view compares two Digital Heart Profiles (for example, at rest and after load) and highlights changes in heart rate, intervals, electrical axis and HRV.",

        leftTitle: "Rest profile",
        rightTitle: "Post-load profile",
        evidenceTitle: "Profile evidence",
        evidenceRestLabel: "Rest profile",
        evidenceLoadLabel: "Post-load profile",
        evidenceWindows: "Windows used",
        evidenceGreen: "Green windows",
        evidenceScoreHigh: "High evidence",
        evidenceScoreMedium: "Medium evidence",
        evidenceScoreLow: "Low evidence",
        deltaTitle: "Key changes (Δ)",
        deltaHr: "Heart rate",
        deltaAxis: "Electrical axis",
        deltaQtc: "QTc interval",
        deltaSdnn: "HRV SDNN",
        deltaRmssd: "HRV RMSSD",
        zoneLegendTitle: "Zone meaning",
        zoneGreenLabel: "Green zone – normal physiological variability",
        zoneYellowLabel: "Yellow zone – noticeable deviation from baseline",
        zoneRedLabel: "Red zone – significant deviation that may require attention",
        zoneCardTitle: "Parameter deviation summary",
        zoneParamHR: "Heart rate",
        zoneParamQTc: "QTc interval",
        zoneParamAxis: "Electrical axis",
        zoneParamHRV: "HRV (SDNN/RMSSD)",
        zoneGreenShort: "Green zone",
        zoneYellowShort: "Yellow zone",
        zoneRedShort: "Red zone",
        zoneReasonLimitedData: "Based on a limited amount of data",
        zoneReasonNormalAdapt: "Within expected adaptive range",
        zoneReasonNoticeable: "Noticeable change vs baseline",
        zoneReasonSignificant: "Marked change vs baseline",
        zoneReasonAfterLoad: "Expected change after load",
        zoneReasonMorphChange: "Accompanied by morphology change",
        deviationScaleTitle: "Deviation scale",
        deviationGreen: "Green zone – normal physiological variability",
        deviationYellow: "Yellow zone – noticeable deviation",
        deviationRed: "Red zone – significant deviation",
        deviationLabelHR: "Heart rate",
        deviationLabelQTc: "QTc interval",
        deviationLabelAxis: "Electrical axis",
        deviationLabelHRV: "HRV (SDNN/RMSSD)",
        morphTitle: "Morphology difference",
        morphHigh: "High similarity",
        morphModerate: "Moderate change",
        morphMarked: "Marked change",
        abruptnessTitle: "Abruptness of change",
        abruptnessMinimal: "Minimal change",
        abruptnessExpected: "Expected adaptation (e.g. after load)",
        abruptnessSudden: "Sudden change – interpret with caution",
        confidenceHigh: "High confidence",
        confidenceMedium: "Medium confidence",
        confidenceLow: "Based on a limited amount of data",
        hint:
          "We always compare the patient with their own baseline. The resting profile serves as a stable reference; the post-load profile shows how the cardiovascular system responds."
      },
      benefits: {
        label: "Profile Benefits"
      }
    },
    profileHelp: {
      title: "What each graph and metric means",
      sections: {
        leadProvenanceTitle: "Lead provenance",
        leadProvenanceText:
          "The tags above show which leads are recorded directly by Healthbox 2 (Recorded), which chest leads are reconstructed from the 7-lead input (Reconstructed), and which leads are excluded due to low confidence. Only high-confidence leads are used when building the Digital Heart Profile.",
        medianBeatTitle: "Resting profile (median P–QRS–T complex)",
        medianBeatText:
          "This graph shows the median P–QRS–T beat built from all high-quality windows (green). It is cleaned from noise and artefacts and represents the typical electrical activity of the heart. The shape of the P wave, QRS complex and T wave reflects atrial activation, ventricular depolarization and repolarization.",
        medianBeatToggleTitle: "Show intervals button",
        medianBeatToggleText:
          "The \"Show intervals\" button adds vertical markers for automatically detected P, PR, QRS, ST and QT boundaries on the median beat. This helps to see where each interval is measured.",
        hrTitle: "Heart rate",
        hrText:
          "Average heart rate calculated from the R–R intervals of the windows that entered the profile. This is not a momentary pulse value but a stable, noise-filtered estimate.",
        prTitle: "PR interval",
        prText:
          "Time from the onset of atrial activation to the onset of ventricular activation. Changes in PR reflect how quickly impulses travel from atria to ventricles.",
        qrsTitle: "QRS duration",
        qrsText:
          "Duration of ventricular depolarization. A narrow QRS indicates fast conduction; a broader QRS may indicate intraventricular conduction delays. Typically measured in a lead with a clear QRS, such as V2 or V3.",
        qtQtcTitle: "QT and QTc intervals",
        qtQtcText:
          "The QT interval covers both ventricular depolarization and repolarization. QTc is the QT corrected for heart rate. In the profile we look not only at the absolute QTc, but also at how it deviates from the person’s own baseline.",
        axisTitle: "Electrical axis (frontal plane)",
        axisText:
          "The arrow shows the direction of the mean QRS vector in the frontal plane, and the numeric value is the angle in degrees. It reflects the spatial orientation of ventricular depolarization relative to the standard limb leads.",
        hrvTitle: "HRV metrics (SDNN, RMSSD, pNN50)",
        hrvText:
          "SDNN reflects overall heart rate variability over the recording. RMSSD is more related to parasympathetic activity. pNN50 shows the percentage of adjacent RR intervals that differ by more than 50 ms. Together they characterize the state of autonomic regulation.",
        poincareTitle: "Poincaré plot",
        poincareText:
          "Each dot is a pair of consecutive RR intervals (RR(n), RR(n+1)). The ellipse shows the average shape of the cloud. A wide ellipse indicates higher variability; a narrow one indicates reduced variability. The plot helps to see patterns and outliers in autonomic regulation.",
        summaryTitle: "Recording summary",
        summaryText:
          "Duration shows how many minutes were used to build the profile. Windows used indicates how many 2-second high-quality windows entered the calculations. Geometry ID identifies the garment/electrode configuration. Profile version shows the algorithm version used to build this profile.",
        qualityMapTitle: "Profile quality map",
        qualityMapText:
          "The colored bar at the bottom represents the sequence of windows used for the profile. Green segments entered the profile fully, yellow segments may be down-weighted or used only for trends, and red segments are excluded. This indicates how strongly the profile is supported by good-quality data."
      }
    },
    benefits: {
      label: "Profile Benefits",
      title: "Why the Digital Heart Profile is useful",
      subtitle:
        "This section shows which practical problems the Digital Heart Profile solves and how it improves the use of ECG data.",
      prereqButton: "Why we built the Digital Heart Profile",
      prereqPanelTitle: "Prerequisites",
      prereqIntro:
        "This section explains why building a Digital Heart Profile required changing the device architecture, increasing the number of electrodes, and moving beyond classical ECG norms.",
      prereqBlocks: [
        {
          title: "Single ECG ≠ personal norm",
          text:
            "A short ECG snapshot only compares a person to population norms. It cannot show what is normal for this specific individual."
        },
        {
          title: "Comparison with textbook norms produces false conclusions",
          text:
            "Intervals, morphology, axis and HRV vary strongly between individuals. Many 'abnormalities' are simply personal physiology. A personal baseline is required."
        },
        {
          title: "Previous hardware had only 3 channels",
          text:
            "Earlier device versions included only 3 ECG channels, which was not enough to analyse morphology, axis or build a stable P–QRS–T median beat."
        },
        {
          title: "Old electrode layout did not follow NEHB / Mason–Likar geometry",
          text:
            "With limited electrode placement, spatial information was insufficient for reconstructing chest leads V2–V6 or performing morphological analysis."
        },
        {
          title: "We increased the number of electrodes and channels",
          text:
            "We moved to a 5-electrode → 7-lead configuration, enabling accurate frontal leads, a real V1 and reconstruction of V2–V6."
        },
        {
          title: "Digital Profile became feasible",
          text:
            "With more channels, correct geometry and quality-gating of windows, the system can now build a stable personal Digital Heart Profile."
        }
      ],
      tableHeaders: {
        problem: "Problem in classical ECG / monitoring",
        solution: "How the Digital Heart Profile solves it",
        value: "Practical value"
      },
      rows: [
        {
          problem: "A single ECG shows only one short moment and is highly affected by artefacts.",
          solution: "The profile aggregates hundreds of clean 2-second windows into a stable median complex.",
          value: "You see a clean, noise-free 'passport' of the heart instead of a random fragment."
        },
        {
          problem: "Comparison is done only to population norms, without taking individual physiology into account.",
          solution: "The profile builds a personal baseline of intervals, axis, morphology and heart rate variability.",
          value: "You understand what is normal for this person, not just 'in general'."
        },
        {
          problem: "Trends and gradual drifts are hard to detect from separate ECG recordings.",
          solution: "Profiles can be compared over days, weeks or months.",
          value: "Meaningful changes are detected earlier."
        },
        {
          problem: "There is no clear metric for data reliability.",
          solution: "Quality gating (green / yellow / red windows) and confidence for reconstructed leads.",
          value: "It is clear how trustworthy the numerical results are."
        },
        {
          problem: "Holter recordings contain too much raw data and are time-consuming to parse.",
          solution: "The profile compresses thousands of beats into a compact set of key parameters.",
          value: "Interpretation becomes faster and easier."
        },
        {
          problem: "Physiological adaptation (load, stress) is difficult to separate from real deviations.",
          solution: "Comparison is done against the personal baseline and can take context into account.",
          value: "Normal adaptive reactions are not confused with problems."
        }
      ]
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
    },
    dataContainer: dataContainerContent.en
  },
  ru: {
    tabs: {
      live: {
        label: "Онлайн ЭКГ",
        title: "Онлайн ЭКГ – многоканальный поток",
        description:
          "Здесь имитируется поток многоканального ЭКГ. Сигнал разбивается на 2-секундные окна, которые в дальнейшем будут подсвечиваться по качеству (зелёный/жёлтый/красный).",
        segmentationToggleOn: "Скрыть 2-секундные окна",
        segmentationToggleOff: "Показать 2-секундные окна",
        segmentationHint:
          "Вертикальные линии и цветные полосы показывают, как ЭКГ делится на 2-секундные окна для анализа качества."
      },
      quality: {
        label: "Качество сигнала",
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
        label: "12-канальный вид",
        title: "12-канальный вид – реконструированное ЭКГ",
        description:
          "Здесь представлен реконструированный 12-канальный вид ЭКГ с учётом фиксированной геометрии текстильных электродов и показателей достоверности по каждому отведению.",
        gridTitle: "Реконструированное 12-канальное ЭКГ",
        confidenceLabel: "Уверенность",
        lowConfidenceHint:
          "Отведения с уверенностью < 0.80 подсвечены серым и не используются в Цифровом профиле сердца.",
        recordedGroupTitle: "Снимаемые отведения (7-канальный вход)",
        reconstructedGroupTitle: "Восстановленные отведения (на основе 7-канального входа)",
        badgeRecorded: "Измерено",
        badgeReconstructed: "Восстановлено",
        legendRecorded: "Снимаемые отведения поступают с устройства без изменений.",
        legendReconstructed:
          "Грудные отведения V2–V6 восстанавливаются по данным 7 каналов и используются в Цифровом профиле сердца только при достаточно высокой уверенности.",
        legendHigh: "Отведения с высокой уверенностью участвуют в профиле",
        legendLow: "Отведения с низкой уверенностью отображаются, но исключены из профиля",
        howComputedToggleOn: "Скрыть, как вычислено",
        howComputedToggleOff: "Показать, как вычислено",
        howComputedHint:
          "Наведите на V2–V6, чтобы увидеть вклад записанных отведений."
      },
      "data-container": {
        label: "Контейнер данных",
        title: "Контейнер данных – путь сигнала от прибора до аналитики",
        description:
          "Здесь показано, как SPA2099 собирает, структурирует и защищает ЭКГ, движения и показатели качества перед визуализацией."
      },
      profile: {
        label: "Цифровой профиль сердца",
        title: "Цифровой профиль сердца – агрегированные параметры",
        description:
          "Здесь визуализируется Цифровой Профиль Сердца: медианные комплексы P–QRS–T, интервалы (PR, QRS, QT, QTc), электрическая ось и показатели вариабельности ритма.",

        leadProvTitle: "Происхождение отведений",
        leadProvLegendRecorded: "Снято",
        leadProvLegendRecon: "Восстановлено",
        leadProvLegendExcluded: "Исключено",
        leadProvConfidenceNote:
          "Профиль формируется из снимаемых конечностных отведений и восстановленных грудных. Включаются только отведения с достаточной уверенностью.",

        showIntervals: "Показать интервалы",
        hideIntervals: "Скрыть интервалы",
        intervalsHint:
          "Переключите, чтобы увидеть границы P/PR/QRS/ST/QT, обнаруженные на медианном комплексе.",

        metricsTitle: "Ключевые кардиопараметры",
        metricHr: "Частота сердечных сокращений",
        metricPr: "Интервал PR",
        metricQrs: "Длительность QRS",
        metricQt: "Интервал QT",
        metricQtc: "QTc (корректированный QT)",
        metricAxis: "Электрическая ось (фронтальная плоскость)",
        metricSdnn: "HRV SDNN",
        metricRmssd: "HRV RMSSD",
        metricSourceLabel: "Источник",
        axisTitle: "Фронтальная электрическая ось",
        hrvPnn50Label: "pNN50",

        qualityTitle: "Карта качества профиля",
        qualityHint:
          "В профиль входят только окна высокого качества (зелёные). Жёлтые и красные окна исключены или имеют меньший вес.",
        qualitySummaryWindows:
          "Использованные окна: зелёные {greenPct}% ({greenCount}/{total}), жёлтые {yellowPct}%, красные {redPct}%.",
        qualitySummaryLeads:
          "В профиль вошли: {recCount} снимаемых + {reconCount} восстановленных (исключено: {excluded}).",

        metaTitle: "Сводка записи",
        metaDuration: "Длительность",
        metaWindowsUsed: "Использованные окна",
        metaGeometry: "ID геометрии",
        metaVersion: "Версия профиля"
      },
      compare: {
        label: "Сравнение",
        title: "Сравнение профилей – покой и нагрузка",
        description:
          "Здесь сравниваются два Цифровых Профиля Сердца (например, в покое и после нагрузки) с выделением изменений ЧСС, интервалов, электрической оси и показателей HRV.",

        leftTitle: "Профиль покоя",
        rightTitle: "Профиль после нагрузки",
        evidenceTitle: "Достоверность профилей",
        evidenceRestLabel: "Профиль покоя",
        evidenceLoadLabel: "Профиль после нагрузки",
        evidenceWindows: "Использовано окон",
        evidenceGreen: "Зелёные окна",
        evidenceScoreHigh: "Высокая достоверность",
        evidenceScoreMedium: "Средняя достоверность",
        evidenceScoreLow: "Низкая достоверность",
        deltaTitle: "Ключевые изменения (Δ)",
        deltaHr: "Частота сердечных сокращений",
        deltaAxis: "Электрическая ось",
        deltaQtc: "Интервал QTc",
        deltaSdnn: "HRV SDNN",
        deltaRmssd: "HRV RMSSD",
        zoneLegendTitle: "Значение зон",
        zoneGreenLabel: "Зелёная зона — в пределах нормальной вариабельности",
        zoneYellowLabel: "Жёлтая зона — заметное отклонение от базового профиля",
        zoneRedLabel: "Красная зона — выраженное отклонение, может требовать внимания",
        zoneCardTitle: "Сводка отклонений параметров",
        zoneParamHR: "ЧСС",
        zoneParamQTc: "Интервал QTc",
        zoneParamAxis: "Электрическая ось",
        zoneParamHRV: "ВСР (SDNN/RMSSD)",
        zoneGreenShort: "Зелёная зона",
        zoneYellowShort: "Жёлтая зона",
        zoneRedShort: "Красная зона",
        zoneReasonLimitedData: "Оценка по ограниченному объёму данных",
        zoneReasonNormalAdapt: "В пределах ожидаемой адаптации",
        zoneReasonNoticeable: "Заметное изменение относительно базового профиля",
        zoneReasonSignificant: "Выраженное изменение относительно базового профиля",
        zoneReasonAfterLoad: "Ожидаемое изменение после нагрузки",
        zoneReasonMorphChange: "Сопровождается изменением формы комплекса",
        deviationScaleTitle: "Шкала отклонений",
        deviationGreen: "Зелёная зона – физиологическая вариабельность",
        deviationYellow: "Жёлтая зона – заметное отклонение",
        deviationRed: "Красная зона – значимое отклонение",
        deviationLabelHR: "ЧСС",
        deviationLabelQTc: "Интервал QTc",
        deviationLabelAxis: "Электрическая ось",
        deviationLabelHRV: "ВСР (SDNN/RMSSD)",
        morphTitle: "Изменение формы комплекса",
        morphHigh: "Высокое сходство",
        morphModerate: "Умеренное изменение",
        morphMarked: "Выраженное изменение",
        abruptnessTitle: "Характер изменения",
        abruptnessMinimal: "Минимальные изменения",
        abruptnessExpected: "Ожидаемая адаптация (например, после нагрузки)",
        abruptnessSudden: "Резкое изменение — интерпретировать с осторожностью",
        confidenceHigh: "Высокая уверенность",
        confidenceMedium: "Средняя уверенность",
        confidenceLow: "Оценка по ограниченному объёму данных",
        hint:
          "Всегда сравниваем пациента только с его базовым уровнем. Профиль покоя — стабильная опора, профиль после нагрузки показывает реакцию сердечно-сосудистой системы."
      },
      benefits: {
        label: "Преимущества профиля"
      }
    },
    profileHelp: {
      title: "Что означает каждый график и каждая метрика",
      sections: {
        leadProvenanceTitle: "Происхождение отведений",
        leadProvenanceText:
          "Теги над графиком показывают, какие отведения сняты напрямую устройством Healthbox 2 (Recorded), какие грудные отведения восстановлены по модели (Reconstructed), а какие исключены из профиля из-за низкой уверенности. В расчётах используются только отведения с достаточной уверенностью.",
        medianBeatTitle: "Resting profile (медианный комплекс P–QRS–T)",
        medianBeatText:
          "Этот график показывает медианный комплекс P–QRS–T, построенный по всем окнам высокого качества (зелёные). Он очищен от шума и артефактов и отражает типичную электрическую активность сердца: форму P-зубца (предсердия), QRS-комплекса (деполяризация желудочков) и T-волны (реполяризация).",
        medianBeatToggleTitle: "Кнопка «Show intervals»",
        medianBeatToggleText:
          "Кнопка «Show intervals» добавляет вертикальные маркеры автоматически найденных границ P/PR/QRS/ST/QT на медианном комплексе. Это помогает визуально понять, где именно измеряются интервалы.",
        hrTitle: "Частота сердечных сокращений",
        hrText:
          "Средняя частота сердечных сокращений, рассчитанная по интервалам R–R тех окон, которые вошли в профиль. Это не моментный пульс, а устойчивое значение, очищенное от помех.",
        prTitle: "Интервал PR",
        prText:
          "Время от начала возбуждения предсердий до начала возбуждения желудочков. Изменения PR отражают скорость проведения импульса через атриовентрикулярное соединение.",
        qrsTitle: "Длительность QRS",
        qrsText:
          "Длительность деполяризации желудочков. Узкий QRS говорит о быстрой проводимости; расширение QRS может указывать на замедление проведения внутри желудочков. Обычно измеряется в отведении с чётким QRS, например V2 или V3.",
        qtQtcTitle: "Интервалы QT и QTc",
        qtQtcText:
          "Интервал QT охватывает фазу деполяризации и реполяризации желудочков. QTc — QT, скорректированный по частоте сердечных сокращений. В цифровом профиле важно не только абсолютное значение QTc, но и то, насколько оно отличается от персональной базовой величины.",
        axisTitle: "Электрическая ось (фронтальная плоскость)",
        axisText:
          "Стрелка показывает направление среднего вектора QRS в фронтальной плоскости, а число отражает угол в градусах. Это пространственная характеристика деполяризации желудочков относительно стандартных конечностных отведений.",
        hrvTitle: "Показатели вариабельности ритма (SDNN, RMSSD, pNN50)",
        hrvText:
          "SDNN отражает общую вариабельность сердечного ритма за запись. RMSSD в большей степени характеризует парасимпатическую активность. pNN50 показывает долю пар соседних RR-интервалов, различающихся более чем на 50 мс. Совместно эти показатели описывают состояние автономной регуляции.",
        poincareTitle: "Диаграмма Пуанкаре",
        poincareText:
          "Каждая точка на диаграмме — пара соседних RR-интервалов (RR(n), RR(n+1)). Эллипс показывает среднюю форму облака. Широкий эллипс означает высокую вариабельность, узкий — снижённую. Диаграмма позволяет увидеть структуру вариабельности и выбросы.",
        summaryTitle: "Сводка записи",
        summaryText:
          "Duration показывает, сколько минут записи использовано для построения профиля. Windows used — сколько 2-секундных окон высокого качества вошло в расчёты. Geometry ID задаёт тип одежды и конфигурацию электродов. Profile version — версия алгоритма построения профиля.",
        qualityMapTitle: "Карта качества профиля",
        qualityMapText:
          "Цветная полоса внизу отображает последовательность окон, использованных для профиля. Зелёные сегменты полностью вошли в профиль, жёлтые могут учитываться с меньшим весом или только для оценок тренда, красные окна исключены. Это показывает, насколько профиль опирается на надёжные данные."
      }
    },
    benefits: {
      label: "Преимущества профиля",
      title: "Почему цифровой профиль сердца важен",
      subtitle:
        "Этот раздел показывает, какие практические задачи решает цифровой профиль и чем он улучшает использование данных ЭКГ.",
      prereqButton: "Зачем мы создали цифровой профиль сердца",
      prereqPanelTitle: "Предпосылки",
      prereqIntro:
        "Этот раздел показывает, почему для создания цифрового профиля сердца потребовалось изменить архитектуру устройства, увеличить число электродов и выйти за рамки сравнения только с эталоном.",
      prereqBlocks: [
        {
          title: "Разовая ЭКГ ≠ персональная норма",
          text:
            "Короткая ЭКГ сравнивает человека только с учебной нормой. Она не показывает, что является нормой именно для этого человека."
        },
        {
          title: "Сравнение с эталоном даёт много ложных выводов",
          text:
            "Интервалы, морфология, ось и ВСР сильно различаются у разных людей. Многие 'отклонения' — это личная физиология. Нужна персональная база."
        },
        {
          title: "Старое устройство имело только 3 канала",
          text:
            "На 3 каналах невозможно анализировать морфологию, ось и построить стабильный медианный комплекс P–QRS–T."
        },
        {
          title: "Прежнее расположение электродов не соответствовало NEHB / Mason–Likar",
          text:
            "С таким расположением недостаточно пространственной информации для восстановления V2–V6 и анализа формы сигнала."
        },
        {
          title: "Мы увеличили количество электродов и каналов",
          text:
            "Переход на конфигурацию 5 электродов → 7 каналов дал возможность снимать фронтальные отведения, реальное V1 и восстанавливать V2–V6."
        },
        {
          title: "Цифровой профиль стал возможен",
          text:
            "Благодаря расширенной геометрии и отбору качественных окон стало возможно строить устойчивый персональный цифровой профиль."
        }
      ],
      tableHeaders: {
        problem: "Проблема традиционной ЭКГ / мониторинга",
        solution: "Как это решает цифровой профиль",
        value: "Практическая ценность"
      },
      rows: [
        {
          problem: "Обычная ЭКГ показывает только один короткий момент и сильно зависит от артефактов.",
          solution: "Профиль агрегирует сотни чистых 2-секундных окон в стабильный медианный комплекс.",
          value: "Отображается чистый «паспорт» сердца, а не случайный фрагмент."
        },
        {
          problem: "Сравнение выполняется только с усреднённой нормой и не учитывает индивидуальную физиологию.",
          solution: "Профиль формирует персональный базовый уровень интервалов, оси, формы комплекса и вариабельности ритма.",
          value: "Понятно, что является нормой именно для этого человека."
        },
        {
          problem: "Трудно увидеть динамику и постепенные смещения по отдельным ЭКГ.",
          solution: "Профили позволяют сравнивать состояние по дням, неделям и месяцам.",
          value: "Значимые изменения фиксируются раньше."
        },
        {
          problem: "Нет явной оценки надёжности данных.",
          solution: "Используются окна качества (зелёные/жёлтые/красные) и уверенность восстановленных отведений.",
          value: "Понятно, насколько полученным числам можно доверять."
        },
        {
          problem: "Холтер содержит слишком много необработанных данных и требует много времени на анализ.",
          solution: "Профиль превращает тысячи комплексов в компактный набор ключевых показателей.",
          value: "Анализ становится быстрее и проще."
        },
        {
          problem: "Физиологическую адаптацию (нагрузка, стресс) сложно отделить от реальных отклонений.",
          solution: "Сравнение ведётся с персональным профилем с учётом контекста.",
          value: "Нормальные реакции не путаются с проблемами."
        }
      ]
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
    },
    dataContainer: dataContainerContent.ru
  },
  nl: {
    tabs: {
      live: {
        label: "Live ECG",
        title: "Live ECG – meerkanaals signaal",
        description:
          "Deze weergave simuleert een live meerkanaals ECG-signaal. Het signaal wordt opgesplitst in vensters van 2 seconden, die later op kwaliteit worden ingekleurd (groen/geel/rood).",
        segmentationToggleOn: "2-seconden vensters verbergen",
        segmentationToggleOff: "2-seconden vensters tonen",
        segmentationHint:
          "Verticale lijnen en gekleurde banden tonen hoe het ECG in 2-seconden vensters wordt opgedeeld voor kwaliteitsanalyse."
      },
      quality: {
        label: "Signaalkwaliteit",
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
        label: "12-afleidingen",
        title: "12-afleidingen weergave – gereconstrueerd ECG",
        description:
          "Deze weergave toont een gereconstrueerd 12-kanaals ECG met de vaste geometrie van textiele elektroden en een betrouwbaarheidsscore per afleiding.",
        gridTitle: "Gereconstrueerd 12-afleidingen ECG",
        confidenceLabel: "Betrouwbaarheid",
        lowConfidenceHint:
          "Afleidingen met betrouwbaarheid < 0.80 worden grijs getoond en niet gebruikt in het Digitale Hartprofiel.",
        recordedGroupTitle: "Geregistreerde afleidingen (7-kanaals input)",
        reconstructedGroupTitle: "Gereconstrueerde afleidingen (afgeleid van 7-kanaals input)",
        badgeRecorded: "Geregistreerd",
        badgeReconstructed: "Gereconstrueerd",
        legendRecorded: "Geregistreerde afleidingen worden direct door het apparaat gemeten.",
        legendReconstructed:
          "Gereconstrueerde borstafleidingen (V2–V6) zijn afgeleid van de 7-kanaals invoer en worden alleen in het Digitale Hartprofiel opgenomen wanneer de betrouwbaarheid voldoende hoog is.",
        legendHigh: "Afleidingen met hoge betrouwbaarheid die in het profiel gaan",
        legendLow: "Afleidingen met lage betrouwbaarheid worden getoond, maar niet meegenomen",
        howComputedToggleOn: "Weergave verbergen",
        howComputedToggleOff: "Weergave tonen",
        howComputedHint: "Beweeg over V2–V6 om te zien welke gemeten leads bijdragen."
      },
      "data-container": {
        label: "Data Container",
        title: "Data Container – van device tot analytics",
        description:
          "Laat zien hoe SPA2099 ECG-, bewegings- en kwaliteitsdata bundelt voordat deze in de demo verschijnen."
      },
      profile: {
        label: "Digitaal profiel",
        title: "Digitaal Hartprofiel – geaggregeerde parameters",
        description:
          "Deze weergave visualiseert het Digitale Hartprofiel: mediane P–QRS–T-complexen, intervallen (PR, QRS, QT, QTc), elektrische as en HRV-metingen.",

        leadProvTitle: "Herkomst van afleidingen",
        leadProvLegendRecorded: "Geregistreerd",
        leadProvLegendRecon: "Gereconstrueerd",
        leadProvLegendExcluded: "Uitgesloten",
        leadProvConfidenceNote:
          "Profiel is opgebouwd uit geregistreerde extremiteitsleads en gereconstrueerde borstleads. Alleen leads met voldoende betrouwbaarheid tellen mee.",

        showIntervals: "Intervallen tonen",
        hideIntervals: "Intervallen verbergen",
        intervalsHint:
          "Schakel overlay in om de gedetecteerde P/PR/QRS/ST/QT-grenzen op het mediane complex te zien.",

        metricsTitle: "Belangrijkste cardiale metrics",
        metricHr: "Hartritme",
        metricPr: "PR-interval",
        metricQrs: "QRS-duur",
        metricQt: "QT-interval",
        metricQtc: "QTc (gecorrigeerde QT)",
        metricAxis: "Elektrische as (frontaal vlak)",
        metricSdnn: "HRV SDNN",
        metricRmssd: "HRV RMSSD",
        metricSourceLabel: "Bron",
        axisTitle: "Frontale elektrische as",
        hrvPnn50Label: "pNN50",

        qualityTitle: "Kwaliteitskaart van profiel",
        qualityHint:
          "Alleen ramen met hoge kwaliteit (groen) worden gebruikt om het profiel op te bouwen. Gele en rode ramen worden uitgesloten of lager gewogen.",
        qualitySummaryWindows:
          "Gebruikte ramen: groen {greenPct}% ({greenCount}/{total}), geel {yellowPct}%, rood {redPct}%.",
        qualitySummaryLeads:
          "Afleidingen in profiel: {recCount} geregistreerd + {reconCount} gereconstrueerd (uitgesloten: {excluded}).",

        metaTitle: "Samenvatting van de opname",
        metaDuration: "Duur",
        metaWindowsUsed: "Gebruikte ramen",
        metaGeometry: "Geometry-ID",
        metaVersion: "Profielversie"
      },
      compare: {
        label: "Profielen vergelijken",
        title: "Profielen vergelijken – rust versus belasting",
        description:
          "Deze weergave vergelijkt twee Digitale Hartprofielen (bijvoorbeeld in rust en na belasting) en laat veranderingen in hartritme, intervallen, elektrische as en HRV zien.",

        leftTitle: "Rustprofiel",
        rightTitle: "Na-belasting profiel",
        evidenceTitle: "Bewijs voor profielen",
        evidenceRestLabel: "Rustprofiel",
        evidenceLoadLabel: "Na-belasting profiel",
        evidenceWindows: "Gebruikte vensters",
        evidenceGreen: "Groene vensters",
        evidenceScoreHigh: "Sterk bewijs",
        evidenceScoreMedium: "Gemiddeld bewijs",
        evidenceScoreLow: "Beperkt bewijs",
        deltaTitle: "Belangrijkste veranderingen (Δ)",
        deltaHr: "Hartritme",
        deltaAxis: "Elektrische as",
        deltaQtc: "QTc-interval",
        deltaSdnn: "HRV SDNN",
        deltaRmssd: "HRV RMSSD",
        zoneLegendTitle: "Betekenis van zones",
        zoneGreenLabel: "Groene zone – normale fysiologische variatie",
        zoneYellowLabel: "Gele zone – merkbare afwijking van de basislijn",
        zoneRedLabel: "Rode zone – duidelijke afwijking die mogelijk aandacht vraagt",
        zoneCardTitle: "Samenvatting parameterafwijkingen",
        zoneParamHR: "Hartritme",
        zoneParamQTc: "QTc-interval",
        zoneParamAxis: "Elektrische as",
        zoneParamHRV: "HRV (SDNN/RMSSD)",
        zoneGreenShort: "Groene zone",
        zoneYellowShort: "Gele zone",
        zoneRedShort: "Rode zone",
        zoneReasonLimitedData: "Gebaseerd op een beperkt aantal gegevens",
        zoneReasonNormalAdapt: "Binnen verwacht adaptatiebereik",
        zoneReasonNoticeable: "Merkbare verandering t.o.v. basislijn",
        zoneReasonSignificant: "Duidelijke verandering t.o.v. basislijn",
        zoneReasonAfterLoad: "Verwachte verandering na belasting",
        zoneReasonMorphChange: "Gepaard met morfologische verandering",
        deviationScaleTitle: "Afwijkingsschaal",
        deviationGreen: "Groene zone – normale fysiologische variatie",
        deviationYellow: "Gele zone – merkbare afwijking",
        deviationRed: "Rode zone – significante afwijking",
        deviationLabelHR: "Hartslag",
        deviationLabelQTc: "QTc-interval",
        deviationLabelAxis: "Elektrische as",
        deviationLabelHRV: "HRV (SDNN/RMSSD)",
        morphTitle: "Verschil in morfologie",
        morphHigh: "Hoge gelijkenis",
        morphModerate: "Gematigde verandering",
        morphMarked: "Duidelijke verandering",
        abruptnessTitle: "Abruptheid van verandering",
        abruptnessMinimal: "Minimale verandering",
        abruptnessExpected: "Verwachte adaptatie (bijv. na belasting)",
        abruptnessSudden: "Plotselinge verandering – met voorzichtigheid duiden",
        confidenceHigh: "Hoge betrouwbaarheid",
        confidenceMedium: "Gemiddelde betrouwbaarheid",
        confidenceLow: "Gebaseerd op een beperkt aantal gegevens",
        hint:
          "We vergelijken de patiënt altijd met zijn of haar eigen basislijn. Het rustprofiel is het stabiele referentiepunt; het na-belasting profiel toont hoe het cardiovasculaire systeem reageert."
      },
      benefits: {
        label: "Profielvoordelen"
      }
    },
    benefits: {
      label: "Profielvoordelen",
      title: "Waarom het Digital Heart Profile nuttig is",
      subtitle:
        "In dit gedeelte zie je welke praktische problemen het profiel oplost en hoe het het gebruik van ECG-data verbetert.",
      prereqButton: "Waarom we het Digital Heart Profile hebben gebouwd",
      prereqPanelTitle: "Randvoorwaarden",
      prereqIntro:
        "Dit onderdeel legt uit waarom het bouwen van een Digital Heart Profile vroeg om een aangepaste apparaatarchitectuur, meer elektroden en het loslaten van klassieke ECG-normen.",
      prereqBlocks: [
        {
          title: "Eén ECG ≠ persoonlijke norm",
          text:
            "Een kort ECG-moment vergelijkt iemand alleen met populatienormen. Het laat niet zien wat normaal is voor deze persoon."
        },
        {
          title: "Vergelijking met boeknormen geeft valse conclusies",
          text:
            "Intervallen, morfologie, as en HRV verschillen sterk per individu. Veel 'afwijkingen' zijn gewoon persoonlijke fysiologie. Er is een persoonlijke basislijn nodig."
        },
        {
          title: "Vorige hardware had maar 3 kanalen",
          text:
            "Eerdere apparaatversies hadden slechts 3 ECG-kanalen, onvoldoende voor analyse van morfologie, as of het bouwen van een stabiele P–QRS–T-median beat."
        },
        {
          title: "Oude elektrodenlayout volgde NEHB / Mason–Likar niet",
          text:
            "Met de beperkte plaatsing was er te weinig ruimtelijke informatie om de borstafleidingen V2–V6 te reconstrueren of morfologie te analyseren."
        },
        {
          title: "We verhoogden het aantal elektroden en kanalen",
          text:
            "We stapten over op een configuratie met 5 elektroden → 7 kanalen, waardoor nauwkeurige frontale afleidingen, een echte V1 en reconstructie van V2–V6 mogelijk werden."
        },
        {
          title: "Digitaal profiel werd haalbaar",
          text:
            "Met meer kanalen, de juiste geometrie en kwaliteitsselectie kan het systeem nu een stabiel persoonlijk Digital Heart Profile opbouwen."
        }
      ],
      tableHeaders: {
        problem: "Probleem in klassieke ECG / monitoring",
        solution: "Hoe het profiel dit oplost",
        value: "Praktische waarde"
      },
      rows: [
        {
          problem: "Een enkele ECG toont slechts een kort moment en is sterk beïnvloed door artefacten.",
          solution: "Het profiel bundelt honderden schone vensters van 2 seconden tot een stabiel mediane complex.",
          value: "Je krijgt een schoon, ruisvrij 'paspoort' van het hart in plaats van een willekeurig fragment."
        },
        {
          problem: "Vergelijkingen gebeuren alleen met populatienormen en houden geen rekening met individuele fysiologie.",
          solution: "Het profiel bouwt een persoonlijke referentie op van intervallen, as, morfologie en hartslagvariabiliteit.",
          value: "Je begrijpt wat normaal is voor deze persoon en niet alleen 'gemiddeld'."
        },
        {
          problem: "Trends en geleidelijke verschuivingen zijn moeilijk te zien in losse ECG-registraties.",
          solution: "Profielen kunnen over dagen, weken of maanden worden vergeleken.",
          value: "Betekenisvolle veranderingen worden eerder gedetecteerd."
        },
        {
          problem: "Er is geen duidelijke maat voor databetrouwbaarheid.",
          solution: "Kwaliteitsselectie (groen / geel / rood) en vertrouwen voor gereconstrueerde afleidingen.",
          value: "Het is duidelijk hoe betrouwbaar de numerieke resultaten zijn."
        },
        {
          problem: "Holterregistraties bevatten te veel ruwe data en kosten veel tijd om te beoordelen.",
          solution: "Het profiel comprimeert duizenden slagen tot een compact pakket van kernparameters.",
          value: "Interpretatie gaat sneller en eenvoudiger."
        },
        {
          problem: "Fysiologische adaptatie (belasting, stress) is lastig te scheiden van echte afwijkingen.",
          solution: "Vergelijking gebeurt met de persoonlijke referentie en kan rekening houden met context.",
          value: "Normale adaptieve reacties worden niet verward met problemen."
        }
      ]
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
    },
    dataContainer: dataContainerContent.nl
  }
};

let liveSegmentationEnabled = false;
let isQualityDrawerOpen = false;
let scrollToExamplesAfterOpen = false;
let howComputedEnabled = false;

function getSignalQualityStrings(lang) {
  const base = translations.en.signalQuality;
  const current = translations[lang]?.signalQuality;
  return { ...base, ...(current || {}) };
}

function deepMerge(base = {}, override = {}) {
  const result = { ...base };
  Object.entries(override || {}).forEach(([key, value]) => {
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      typeof base[key] === "object" &&
      base[key] !== null &&
      !Array.isArray(base[key])
    ) {
      result[key] = deepMerge(base[key], value);
    } else {
      result[key] = value;
    }
  });
  return result;
}

function getDataContainerStrings(lang) {
  const base = translations.en?.dataContainer || {};
  const current = translations[lang]?.dataContainer || {};
  return deepMerge(base, current);
}

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function capitalize(str = "") {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function computeEvidenceWeight(profile = {}) {
  const windows = profile.meta?.windowsUsed || 0;
  const greenPct = profile.qualityMap?.greenPct || 0;
  let score = "high";

  if (windows < 20 || greenPct < 40) {
    score = "low";
  } else if (windows < 80 || greenPct < 70) {
    score = "medium";
  }

  return { windows, greenPct, score };
}

function computePearsonCorrelation(a = [], b = []) {
  const len = Math.min(a.length, b.length);
  if (!len) return 0;

  let sumA = 0;
  let sumB = 0;
  for (let i = 0; i < len; i++) {
    sumA += a[i];
    sumB += b[i];
  }

  const meanA = sumA / len;
  const meanB = sumB / len;

  let numerator = 0;
  let denomA = 0;
  let denomB = 0;

  for (let i = 0; i < len; i++) {
    const da = a[i] - meanA;
    const db = b[i] - meanB;
    numerator += da * db;
    denomA += da * da;
    denomB += db * db;
  }

  const denom = Math.sqrt(denomA * denomB) || 0;
  if (!denom) return 0;
  return numerator / denom;
}

function computeMorphologySimilarity(restProfile = {}, loadProfile = {}) {
  const restBeat = restProfile.templateBeat?.values || [];
  const loadBeat = loadProfile.templateBeat?.values || [];
  const r = computePearsonCorrelation(restBeat, loadBeat);

  let label = "marked";
  if (r >= 0.9) label = "high";
  else if (r >= 0.75) label = "moderate";

  return { r, label };
}

function computeChangeAbruptness(restProfile = {}, loadProfile = {}) {
  const r = restProfile.intervals || {};
  const l = loadProfile.intervals || {};
  const rHrv = restProfile.hrv || {};
  const lHrv = loadProfile.hrv || {};

  const dHr = (l.hrBpm || 0) - (r.hrBpm || 0);
  const dQtc = (l.qtcMs || 0) - (r.qtcMs || 0);
  const dSdnn = (lHrv.sdnnMs || 0) - (rHrv.sdnnMs || 0);
  const dRmssd = (lHrv.rmssdMs || 0) - (rHrv.rmssdMs || 0);

  const absHr = Math.abs(dHr);
  const absQtc = Math.abs(dQtc);

  let level = "minimal";
  if (absHr > 20 || absQtc > 20 || (dSdnn <= -20 && dRmssd <= -15)) {
    level = "sudden";
  } else if (absHr >= 10 && absHr <= 20) {
    level = "expected";
  }

  return { level };
}

function computeParamConfidence(evidenceRest, evidenceLoad, morphSim) {
  const restScore = evidenceRest?.score;
  const loadScore = evidenceLoad?.score;
  const morphLabel = morphSim?.label;

  if (restScore === "high" && loadScore === "high" && morphLabel !== "marked") {
    return "high";
  }

  if (restScore === "low" || loadScore === "low" || morphLabel === "marked") {
    return "low";
  }

  return "medium";
}

function openProfileHelpPanel(lang) {
  const help = translations[lang]?.profileHelp || translations.en.profileHelp;
  if (!help) return;

  const overlay = document.getElementById("help-overlay");
  const panel = document.getElementById("help-panel");
  const titleEl = document.getElementById("help-panel-title");
  const contentEl = document.getElementById("help-panel-content");

  if (!overlay || !panel || !titleEl || !contentEl) return;

  titleEl.textContent = help.title;
  const s = help.sections || {};
  const sectionsHtml = `
    ${renderHelpSection(s.leadProvenanceTitle, s.leadProvenanceText)}
    ${renderHelpSection(s.medianBeatTitle, s.medianBeatText)}
    ${renderHelpSection(s.medianBeatToggleTitle, s.medianBeatToggleText)}
    ${renderHelpSection(s.hrTitle, s.hrText)}
    ${renderHelpSection(s.prTitle, s.prText)}
    ${renderHelpSection(s.qrsTitle, s.qrsText)}
    ${renderHelpSection(s.qtQtcTitle, s.qtQtcText)}
    ${renderHelpSection(s.axisTitle, s.axisText)}
    ${renderHelpSection(s.hrvTitle, s.hrvText)}
    ${renderHelpSection(s.poincareTitle, s.poincareText)}
    ${renderHelpSection(s.summaryTitle, s.summaryText)}
    ${renderHelpSection(s.qualityMapTitle, s.qualityMapText)}
  `;

  contentEl.innerHTML = sectionsHtml;
  overlay.hidden = false;
  panel.hidden = false;
  panel.classList.remove("open");
  requestAnimationFrame(() => {
    panel.classList.add("open");
  });
}

function renderHelpSection(title, text) {
  if (!title && !text) return "";
  return `
    <section class="help-section">
      ${title ? `<h3 class="help-section-title">${title}</h3>` : ""}
      ${text ? `<p class="help-section-text">${text}</p>` : ""}
    </section>
  `;
}

function closeHelpPanelIfOpen() {
  const overlay = document.getElementById("help-overlay");
  const panel = document.getElementById("help-panel");
  if (!overlay || !panel) return;

  panel.classList.remove("open");
  overlay.hidden = true;
  panel.hidden = true;
}

function closeHelpPanel() {
  const overlay = document.getElementById("help-overlay");
  const panel = document.getElementById("help-panel");
  if (!overlay || !panel || panel.hidden) return;

  panel.classList.remove("open");
  setTimeout(() => {
    closeHelpPanelIfOpen();
  }, 250);
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
    const prereqOverlay = document.getElementById("prereq-panel-overlay");
    const prereqCloseButton = document.getElementById("prereq-panel-close");
    const helpOverlay = document.getElementById("help-overlay");
    const helpPanelCloseButton = document.getElementById("help-panel-close");

    function setActiveTab(tab) {
      closeHelpPanelIfOpen();
      currentTab = tab;
      tabButtons.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.tab === tab);
      });
      if (tab !== "quality") {
        closeQualityDrawer();
      }
      closePrereqPanel();
      renderTabContent();
    }

    function setActiveLanguage(lang) {
      currentLang = lang;
      langButtons.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.lang === lang);
      });
      closePrereqPanel();
      updateTabLabels();
      renderTabContent();
      renderFooter();
    }

  function getTabLabel(tabId) {
    const langTabs = translations[currentLang]?.tabs || {};
    const defaultTabs = translations.en?.tabs || {};
    if (tabId === "benefits") {
      return (
        langTabs[tabId]?.label ||
        translations[currentLang]?.benefits?.label ||
        translations.en?.benefits?.label ||
        defaultTabs[tabId]?.label ||
        defaultTabs[tabId]?.title ||
        ""
      );
    }
    return (
      langTabs[tabId]?.label ||
      langTabs[tabId]?.title ||
      defaultTabs[tabId]?.label ||
      defaultTabs[tabId]?.title ||
      ""
    );
  }

  function updateTabLabels() {
    tabButtons.forEach((btn) => {
      const tabId = btn.dataset.tab;
      if (!tabId) return;
      const label = getTabLabel(tabId);
      if (label) {
        btn.textContent = label;
      }
    });
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

    if (currentTab === "data-container") {
      renderDataContainerView(tabContent, currentLang);
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

    if (currentTab === "benefits") {
      renderBenefitsView(tabContent, currentLang);
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

  const beforeAfterShapes = {
    raw: [
      -0.4,
      0.2,
      -0.1,
      0.5,
      -0.3,
      -0.6,
      3.2,
      -1.6,
      0.4,
      -0.8,
      0.1,
      0.6,
      -0.5,
      0.9,
      -0.2,
      -0.7,
      3.5,
      -1.8,
      0.2,
      -0.9,
      0.3,
      0.4,
      -0.4,
      0.8,
      -0.3,
      -0.6,
      3.1,
      -1.5,
      0,
      -0.7,
      0.4,
      0.3,
      -0.2
    ],
    processed: [
      -0.1,
      0.15,
      -0.05,
      0.35,
      0,
      0.05,
      2.7,
      -0.9,
      0.08,
      -0.2,
      0.12,
      0.28,
      -0.08,
      0.32,
      -0.05,
      0.02,
      2.6,
      -0.85,
      0.05,
      -0.18,
      0.1,
      0.25,
      -0.07,
      0.3,
      -0.02,
      0.03,
      2.55,
      -0.8,
      0.04,
      -0.15,
      0.1,
      0.2,
      -0.05
    ]
  };

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

  function createBeforeAfterSvg(type = "raw") {
    const values = beforeAfterShapes[type] || beforeAfterShapes.raw;
    const width = 260;
    const height = 80;
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

    const stroke = type === "processed" ? "#10b981" : "#ef4444";

    return `
      <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" class="before-after-wave" aria-hidden="true">
        <polyline
          points="${points}"
          fill="none"
          stroke="${stroke}"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
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
    updateQualityInfoPulseState();
  }

  function closeQualityDrawer() {
    isQualityDrawerOpen = false;
    scrollToExamplesAfterOpen = false;
    renderQualityDrawer(currentLang);
    updateQualityInfoPulseState();
  }

  function updateQualityInfoPulseState() {
    const btn = document.getElementById("quality-info-toggle");
    if (!btn) return;
    btn.classList.toggle("demo-button-pulse", !isQualityDrawerOpen);
    btn.classList.toggle("is-active", isQualityDrawerOpen);
  }

  function openPrereqPanel(lang) {
    const overlay = document.getElementById("prereq-panel-overlay");
    const panel = document.getElementById("prereq-panel");
    const titleEl = document.getElementById("prereq-panel-title");
    const contentEl = document.getElementById("prereq-panel-content");
    if (!overlay || !panel || !titleEl || !contentEl) {
      return;
    }

    const t = translations[lang]?.benefits || translations.en?.benefits || {};
    const blocks = (t.prereqBlocks || [])
      .map(
        (b) => `
        <div class="slide-block">
          <div class="slide-block-title">${b.title}</div>
          <div class="slide-block-text">${b.text}</div>
        </div>
      `
      )
      .join("");

    titleEl.textContent = t.prereqPanelTitle || "";
    const introHtml = t.prereqIntro
      ? `<div class="slide-block-intro">${t.prereqIntro}</div>`
      : "";
    contentEl.innerHTML = `${introHtml}${blocks}`;

    panel.classList.remove("open");
    overlay.classList.remove("hidden");
    panel.classList.remove("hidden");
    requestAnimationFrame(() => {
      panel.classList.add("open");
    });
  }

  function closePrereqPanel() {
    const overlay = document.getElementById("prereq-panel-overlay");
    const panel = document.getElementById("prereq-panel");
    if (!overlay || !panel || panel.classList.contains("hidden")) {
      return;
    }

    panel.classList.remove("open");
    setTimeout(() => {
      panel.classList.add("hidden");
      overlay.classList.add("hidden");
    }, 250);
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

    const qualityInfoBtnClasses = [
      "demo-button",
      "demo-button-primary",
      isQualityDrawerOpen ? "is-active" : "demo-button-pulse"
    ]
      .filter(Boolean)
      .join(" ");

    container.innerHTML = `
      <div class="tab-title-row">
        <h1 class="tab-title">${t.title}</h1>
        <div class="tab-title-actions">
          <button class="${qualityInfoBtnClasses}" id="quality-info-toggle">
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
    updateQualityInfoPulseState();

    const infoBtn = document.getElementById("quality-info-toggle");
    if (infoBtn) {
      infoBtn.onclick = () => openQualityDrawer();
    }

    const examplesBtn = document.getElementById("quality-show-examples");
    if (examplesBtn) {
      examplesBtn.onclick = () => openQualityDrawer({ scrollToExamples: true });
    }
  }

  async function renderLeadsView(container, lang) {
    const t = translations[lang].tabs.leads;
    const leads = ecgDemoData.leads12 || [];

    const recordedLeads = leads.filter((lead) => lead.isRecorded);
    const reconstructedLeads = leads.filter((lead) => !lead.isRecorded);

    howComputedEnabled = false;

    const renderCards = (leadArray) =>
      leadArray
        .map((lead) => {
          const isLow = lead.confidence < 0.8;
          const svg = createLeadSvg(lead.values);
          const typeText = lead.isRecorded ? t.badgeRecorded : t.badgeReconstructed;
          const typeClass = lead.isRecorded ? "recorded" : "reconstructed";
          const focusAttr = lead.isRecorded ? "" : " tabindex=\"0\"";
          return `
        <div class="lead-card" data-id="${lead.id}" data-is-recorded="${lead.isRecorded}"${focusAttr}>
          <div class="lead-header">
            <span class="lead-label">
              ${lead.label}
              <span class="lead-type-badge ${typeClass}">${typeText}</span>
            </span>
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

    const legendLines = [t.legendRecorded, t.legendReconstructed, t.lowConfidenceHint]
      .filter(Boolean)
      .map((line) => `<div>${line}</div>`) // preserve order
      .join("");

    const howComputedBtnClasses = [
      "demo-button",
      "demo-button-primary",
      howComputedEnabled ? "is-active" : "demo-button-pulse"
    ]
      .filter(Boolean)
      .join(" ");

    container.innerHTML = `
      <h1 class="tab-title">${t.title}</h1>
      <p class="tab-description">${t.description}</p>
      <div class="leads-layout">
        <h3>${t.gridTitle}</h3>
        <div class="leads-toolbar">
          <button id="how-computed-toggle" class="${howComputedBtnClasses}"></button>
          <span class="leads-hint">${t.howComputedHint}</span>
        </div>
        <div id="leads-grid-wrapper" class="leads-grid-wrapper">
          <svg id="how-computed-overlay" class="how-computed-overlay" aria-hidden="true"></svg>

          <h3 class="leads-group-title">${t.recordedGroupTitle}</h3>
          <div class="leads-grid">${renderCards(recordedLeads)}</div>
          <h3 class="leads-group-title">${t.reconstructedGroupTitle}</h3>
          <div class="leads-grid">${renderCards(reconstructedLeads)}</div>
        </div>
        <div class="leads-legend">
          ${legendLines || t.lowConfidenceHint || ""}
        </div>
      </div>
    `;

    const toggleBtn = document.getElementById("how-computed-toggle");

    if (
      typeof loadReconstructionWeights !== "function" ||
      typeof getTopContributions !== "function" ||
      !toggleBtn
    ) {
      if (toggleBtn) toggleBtn.style.display = "none";
      return;
    }

    const weights = await loadReconstructionWeights();
    if (!weights || !weights.W) {
      toggleBtn.style.display = "none";
      return;
    }

    toggleBtn.style.display = "";
    setupHowComputedToggle(lang);
    attachHowComputedHover();
  }

  function setupHowComputedToggle(lang) {
    const btn = document.getElementById("how-computed-toggle");
    if (!btn) return;
    const t = translations[lang].tabs.leads;
    const setUi = () => {
      btn.textContent = howComputedEnabled ? t.howComputedToggleOn : t.howComputedToggleOff;
      btn.classList.toggle("is-active", howComputedEnabled);
      btn.classList.toggle("demo-button-pulse", !howComputedEnabled);
    };
    setUi();
    btn.onclick = () => {
      howComputedEnabled = !howComputedEnabled;
      setUi();
      clearOverlay();
      if (howComputedEnabled) {
        attachHowComputedHover();
      }
    };
  }

  function attachHowComputedHover() {
    const wrapper = document.getElementById("leads-grid-wrapper");
    const svg = document.getElementById("how-computed-overlay");
    if (!wrapper || !svg || !howComputedEnabled) return;

    const targets = wrapper.querySelectorAll('.lead-card[data-is-recorded="false"]');
    targets.forEach((card) => {
      const handler = () => drawOverlayFor(card, wrapper, svg);
      card.addEventListener("mouseenter", handler);
      card.addEventListener("mouseleave", clearOverlay);
      card.addEventListener("click", handler);
      card.addEventListener("focus", handler);
      card.addEventListener("blur", clearOverlay);
    });

    window.addEventListener("resize", clearOverlay, { once: true });
  }

  function drawOverlayFor(card, wrapper, svg) {
    if (!howComputedEnabled) return;
    if (typeof getTopContributions !== "function") return;

    clearOverlay();

    const leadId = card.getAttribute("data-id");
    const top = getTopContributions(leadId, 3);
    if (!top || !top.length) return;

    const wb = wrapper.getBoundingClientRect();
    const tb = card.getBoundingClientRect();
    const tx = tb.left - wb.left + tb.width * 0.5;
    const ty = tb.top - wb.top + 10;

    const chipOffsetX = Math.min(tx + 8, wb.width - 120);

    top.forEach((c, i) => {
      const srcEl = wrapper.querySelector(`.lead-card[data-id="${c.src}"]`);
      if (!srcEl) return;
      const sb = srcEl.getBoundingClientRect();
      const sx = sb.left - wb.left + sb.width * 0.5;
      const sy = sb.top - wb.top + sb.height - 10;

      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", sx);
      line.setAttribute("y1", sy);
      line.setAttribute("x2", tx);
      line.setAttribute("y2", ty);
      line.setAttribute("class", "hc-line");
      svg.appendChild(line);

      const mkDot = (x, y) => {
        const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        dot.setAttribute("cx", x);
        dot.setAttribute("cy", y);
        dot.setAttribute("r", 3);
        dot.setAttribute("class", "hc-dot");
        svg.appendChild(dot);
      };
      mkDot(sx, sy);
      mkDot(tx, ty);

      const chip = document.createElement("div");
      chip.className = "hc-chip";
      chip.style.left = `${chipOffsetX + i * 70}px`;
      chip.style.top = `${ty - 16}px`;
      chip.textContent = `${c.src} ${c.pct}%`;
      wrapper.appendChild(chip);
    });
  }

  function clearOverlay() {
    const svg = document.getElementById("how-computed-overlay");
    const wrapper = document.getElementById("leads-grid-wrapper");
    if (svg) svg.innerHTML = "";
    if (wrapper) wrapper.querySelectorAll(".hc-chip").forEach((n) => n.remove());
  }

  function renderDataContainerView(container, lang) {
    const tabStrings =
      translations[lang]?.tabs?.["data-container"] ||
      translations.en?.tabs?.["data-container"] ||
      {};
    const t = getDataContainerStrings(lang);

    const flowSteps = (t.flow?.steps || [])
      .map((step, idx, arr) => {
        const block = `<div class="data-flow-step">${step}</div>`;
        if (idx === arr.length - 1) return block;
        return `${block}<div class="data-flow-arrow" aria-hidden="true">→</div>`;
      })
      .join("");

    const insideBullets = (t.inside?.bullets || [])
      .map((item) => `<li>${item}</li>`)
      .join("");
    const codeSample = escapeHtml(t.inside?.codeSample || "");

    const segmentationWindows = (t.segmentation?.windows || [])
      .map((label) => `<div class="segmentation-block">${label}</div>`)
      .join("");
    const segmentationMetrics = (t.segmentation?.metrics || [])
      .map((label) => `<span class="segmentation-metric">${label}</span>`)
      .join("");

    const qualityMarkers = (t.quality?.markers || [])
      .map(
        (marker) => `
        <div class="data-quality-marker">
          <div class="data-quality-marker-id">${marker.id || marker.title}</div>
          <h4>${marker.title || ""}</h4>
          <p>${marker.description || ""}</p>
        </div>
      `
      )
      .join("");

    const beforeAfterCards = (t.beforeAfter?.cards || [])
      .map((card) => {
        const wave = createBeforeAfterSvg(card.type);
        return `
        <div class="before-after-card">
          ${card.label ? `<div class="before-after-label">${card.label}</div>` : ""}
          <h3>${card.title || ""}</h3>
          <p>${card.description || ""}</p>
          <div class="before-after-graph">${wave}</div>
        </div>
      `;
      })
      .join("");

    const safetyBullets = (t.safety?.bullets || [])
      .map((item) => `<li>${item}</li>`)
      .join("");

    container.innerHTML = `
      <h1 class="tab-title">${tabStrings.title || tabStrings.label || ""}</h1>
      <p class="tab-description">${tabStrings.description || ""}</p>
      <div class="data-container-layout">
        <section class="data-container-card data-flow-card">
          <h2>${t.flow?.title || ""}</h2>
          <p>${t.flow?.text || ""}</p>
          ${flowSteps ? `<div class="data-flow-steps">${flowSteps}</div>` : ""}
        </section>
        <section class="data-container-card data-inside-card">
          <h2>${t.inside?.title || ""}</h2>
          <p>${t.inside?.description || ""}</p>
          ${insideBullets ? `<ul class="data-container-list">${insideBullets}</ul>` : ""}
          ${codeSample ? `<pre class="data-container-code"><code>${codeSample}</code></pre>` : ""}
        </section>
        <section class="data-container-card data-segmentation-card">
          <h2>${t.segmentation?.title || ""}</h2>
          <p>${t.segmentation?.text || ""}</p>
          <div class="data-segmentation-timeline">
            <div class="segmentation-label">${t.segmentation?.timelineLabel || ""}</div>
            ${segmentationWindows ? `<div class="segmentation-track">${segmentationWindows}</div>` : ""}
            ${segmentationMetrics ? `<div class="segmentation-metrics">${segmentationMetrics}</div>` : ""}
            ${t.segmentation?.timelineNote ? `<p class="segmentation-note">${t.segmentation.timelineNote}</p>` : ""}
          </div>
        </section>
        <section class="data-container-card data-quality-card">
          <h2>${t.quality?.title || ""}</h2>
          <p>${t.quality?.text || ""}</p>
          ${qualityMarkers ? `<div class="data-quality-markers">${qualityMarkers}</div>` : ""}
          <div class="data-quality-legend">
            <strong>${t.quality?.legendTitle || ""}</strong>
            <div class="legend-entry"><span class="data-quality-dot green"></span>${t.quality?.legendClean || ""}</div>
            <div class="legend-entry"><span class="data-quality-dot yellow"></span>${t.quality?.legendLimited || ""}</div>
            <div class="legend-entry"><span class="data-quality-dot red"></span>${t.quality?.legendCritical || ""}</div>
          </div>
        </section>
        <section class="data-container-card data-before-after-card">
          <h2>${t.beforeAfter?.title || ""}</h2>
          <p>${t.beforeAfter?.text || ""}</p>
          ${beforeAfterCards ? `<div class="before-after-grid">${beforeAfterCards}</div>` : ""}
          ${t.beforeAfter?.note ? `<p class="before-after-note">${t.beforeAfter.note}</p>` : ""}
        </section>
        <section class="data-container-card data-safety-card">
          <h2>${t.safety?.title || ""}</h2>
          <p>${t.safety?.text || ""}</p>
          ${safetyBullets ? `<ul class="data-container-list">${safetyBullets}</ul>` : ""}
        </section>
      </div>
    `;
  }

  function renderProfileView(container, lang) {
    const t = translations[lang].tabs.profile;
    const help = translations[lang]?.profileHelp || translations.en.profileHelp;
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
    const boundaries = profile.intervalBoundaries;
    const rr = meta.rr || [];
    const pnn50 = hrv.pnn50Pct ?? computePnn50(rr);
    const durationMinutes = Math.round((meta.durationSeconds || 0) / 60);
    const leads = ecgDemoData.leads12 || [];
    const sources = meta.sources || {};

    const formatTemplate = (template, values) =>
      (template || "").replace(/\{(\w+?)\}/g, (_, key) => values[key] ?? "");

    const leadOrder = ["I", "II", "III", "aVR", "aVL", "aVF", "V1", "V2", "V3", "V4", "V5", "V6"];
    const leadCells = leadOrder
      .map((id) => {
        const lead = leads.find((l) => l.id === id) || { id, label: id };
        const used = lead.usedInProfile ?? lead.confidence >= 0.8;
        const typeClass = lead.isRecorded ? "recorded" : lead.isRecorded === false ? "reconstructed" : "";
        const statusClass = used ? "used" : "excluded";
        return `<div class="prov-cell ${typeClass} ${statusClass}">${lead.label}</div>`;
      })
      .join("");

    const recordedUsed = leads.filter((l) => l.isRecorded && (l.usedInProfile ?? l.confidence >= 0.8)).length;
    const reconUsed = leads.filter((l) => !l.isRecorded && (l.usedInProfile ?? l.confidence >= 0.8)).length;
    const excludedLeads = leads.filter((l) => !(l.usedInProfile ?? l.confidence >= 0.8)).map((l) => l.id);
    const leadNote = t.leadProvConfidenceNote || "";

    const metrics = [
      { key: "hr", label: t.metricHr, value: `${m.hrBpm} bpm` },
      { key: "pr", label: t.metricPr, value: `${m.prMs} ms`, source: sources.PR },
      { key: "qrs", label: t.metricQrs, value: `${m.qrsMs} ms`, source: sources.QRS },
      { key: "qt", label: t.metricQt, value: `${m.qtMs} ms`, source: sources.QT },
      { key: "qtc", label: t.metricQtc, value: `${m.qtcMs} ms`, source: sources.QTc },
      {
        key: "axis",
        label: t.metricAxis,
        value: `${axis.frontalPlaneDeg}°`,
        widget: `<div class="axis-widget" data-axis="${axis.frontalPlaneDeg}">${createAxisSvg(axis.frontalPlaneDeg)}</div>`
      },
      { key: "sdnn", label: t.metricSdnn, value: `${hrv.sdnnMs} ms` },
      { key: "rmssd", label: t.metricRmssd, value: `${hrv.rmssdMs} ms` }
    ];

    const metricsHtml = `
      <div class="profile-metric-grid">
        ${metrics
          .map((metric) => {
            const chip = metric.source
              ? `<span class="metric-source-chip">${t.metricSourceLabel}: ${metric.source}</span>`
              : "";
            const valueBlock = metric.widget
              ? `<div class="profile-metric-value">${metric.value}</div><div class="axis-widget-holder">${metric.widget}</div>`
              : `<div class="profile-metric-value">${metric.value}</div>`;
            return `
              <div class="profile-metric-card">
                ${chip}
                <div class="profile-metric-label">${metric.label}</div>
                ${valueBlock}
              </div>
            `;
          })
          .join("")}
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

    const qualitySummaryText = formatTemplate(t.qualitySummaryWindows, {
      greenPct: q.greenPct,
      yellowPct: q.yellowPct,
      redPct: q.redPct,
      greenCount: ecgDemoData.qualityStats?.greenCount || 0,
      yellowCount: ecgDemoData.qualityStats?.yellowCount || 0,
      redCount: ecgDemoData.qualityStats?.redCount || 0,
      total: ecgDemoData.qualityStats?.total || 0
    });

    const leadSummaryText = formatTemplate(t.qualitySummaryLeads, {
      recCount: recordedUsed,
      reconCount: reconUsed,
      excluded: excludedLeads.length ? excludedLeads.join(", ") : "—"
    });

    const hrvExtras = `
      <div class="hrv-extra">
        <div class="hrv-extra-row">
          <span>${t.hrvPnn50Label}:</span>
          <strong>${pnn50}%</strong>
        </div>
        ${rr.length > 1 ? renderPoincareSvg(rr) : ""}
      </div>
    `;

    const headerHtml = `
      <div class="profile-header-with-info">
        <h1 class="tab-title">
          ${t.title}
          <button class="info-icon-btn" id="profile-help-btn" aria-label="${help?.title || ""}">
            i
          </button>
        </h1>
        <p class="tab-description">${t.description}</p>
      </div>
    `;

    container.innerHTML = `
      ${headerHtml}

      <div class="profile-layout">
        <div class="profile-main">
          <div class="profile-left">
            <div class="lead-provenance">
              <div class="tab-title-row">
                <h3 class="profile-template-title" style="margin-bottom: 4px;">${t.leadProvTitle}</h3>
              </div>
              <div class="prov-grid">${leadCells}</div>
              <div class="prov-legend">${t.leadProvLegendRecorded} • ${t.leadProvLegendRecon} • ${t.leadProvLegendExcluded}</div>
              <div class="prov-legend" style="margin-top:4px;">${t.leadProvLegendRecorded} (${recordedUsed}) · ${t.leadProvLegendRecon} (${reconUsed})</div>
              ${leadNote ? `<div class="prov-legend" style="margin-top:4px;">${leadNote}</div>` : ""}
            </div>

            <div class="profile-template-card">
              <div class="tab-title-row" style="margin-bottom:6px;">
                <h3 class="profile-template-title" style="margin:0;">${profile.label}</h3>
                <button id="interval-toggle" class="btn-toggle"></button>
              </div>
              <div class="profile-template-plot">
                ${beatSvg}
              </div>
              <div class="interval-hint">${t.intervalsHint}</div>
            </div>
          </div>
          <div class="profile-right">
            <h3>${t.metricsTitle}</h3>
            ${metricsHtml}
            ${hrvExtras}
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
          <div class="quality-summary">${qualitySummaryText}</div>
          <div class="quality-summary">${leadSummaryText}</div>
        </div>
      </div>
    `;

    setupProfileHelp(lang);

    const intervalToggle = container.querySelector("#interval-toggle");
    const templateSvgEl = container.querySelector(".profile-template-plot svg");
    let overlayEnabled = false;

    const updateToggleUi = () => {
      if (!intervalToggle) return;
      intervalToggle.textContent = overlayEnabled ? t.hideIntervals : t.showIntervals;
      intervalToggle.classList.toggle("active", overlayEnabled);
    };

    const refreshOverlay = () => {
      if (!templateSvgEl) return;
      if (overlayEnabled && boundaries) {
        drawIntervalOverlay(templateSvgEl, boundaries, profile.templateBeat.values.length);
      } else {
        clearIntervalOverlay(templateSvgEl);
      }
    };

    updateToggleUi();
    refreshOverlay();

    if (intervalToggle) {
      intervalToggle.onclick = () => {
        overlayEnabled = !overlayEnabled;
        updateToggleUi();
        refreshOverlay();
      };
    }
  }

  function setupProfileHelp(lang) {
    const btn = document.getElementById("profile-help-btn");
    if (!btn) return;
    btn.addEventListener("click", () => openProfileHelpPanel(lang));
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

    const evidenceRest = computeEvidenceWeight(rest);
    const evidenceLoad = computeEvidenceWeight(load);
    const morph = computeMorphologySimilarity(rest, load);
    const abrupt = computeChangeAbruptness(rest, load);
    const overallConf = computeParamConfidence(evidenceRest, evidenceLoad, morph);

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

    const dAxisText = deltaAxis.text;
    const dHrvText = `${deltaSdnn.text} / ${deltaRmssd.text}`;

    const isLoadContext = true;

    const devHRScore = computeDeviationScore("HR", dHr, evidenceRest.score, abrupt.level, morph.r);
    const devQTcScore = computeDeviationScore("QTc", dQtc, evidenceRest.score, abrupt.level, morph.r);
    const devAxisScore = computeDeviationScore("Axis", dAxis, evidenceRest.score, abrupt.level, morph.r);
    const devHRVScore = computeDeviationScore("HRV", dSdnn, evidenceRest.score, abrupt.level, morph.r);

    const devHR = classifyDeviation(devHRScore, {
      param: "HR",
      delta: dHr,
      evidence: evidenceRest.score,
      abruptness: abrupt.level,
      morphR: morph.r,
      isLoadContext
    });
    const devQTc = classifyDeviation(devQTcScore, {
      param: "QTc",
      delta: dQtc,
      evidence: evidenceRest.score,
      abruptness: abrupt.level,
      morphR: morph.r,
      isLoadContext
    });
    const devAxis = classifyDeviation(devAxisScore, {
      param: "Axis",
      delta: dAxis,
      evidence: evidenceRest.score,
      abruptness: abrupt.level,
      morphR: morph.r,
      isLoadContext
    });
    const devHRV = classifyDeviation(devHRVScore, {
      param: "HRV",
      delta: dSdnn,
      evidence: evidenceRest.score,
      abruptness: abrupt.level,
      morphR: morph.r,
      isLoadContext
    });

    function renderZoneCard(label, deltaText, devInfo, t) {
      const zoneClass = devInfo.zone;
      const zoneLabelKey =
        devInfo.zone === "green"
          ? "zoneGreenShort"
          : devInfo.zone === "yellow"
          ? "zoneYellowShort"
          : "zoneRedShort";

      const reasonText = t[devInfo.baseReasonKey] || "";
      const morphSuffix = devInfo.morphChanged
        ? " " + (t.zoneReasonMorphChange || t.morphMarked)
        : "";

      return `
        <div class="zone-card zone-${zoneClass}">
          <div class="zone-card-header">
            <span class="zone-card-label">${label}</span>
            <span class="zone-card-delta">${deltaText}</span>
          </div>
          <div class="zone-card-zone">${t[zoneLabelKey]}</div>
          <div class="zone-card-reason">${reasonText}${morphSuffix}</div>
        </div>
      `;
    }

    const confidenceLabel =
      overallConf === "low"
        ? t.zoneReasonLimitedData
        : t[`confidence${capitalize(overallConf)}`];

    const evidenceHtml = `
      <div class="compare-evidence">
        <h3>${t.evidenceTitle}</h3>
        <div class="compare-evidence-row">
          <div class="compare-evidence-card">
            <div class="label">${t.evidenceRestLabel}</div>
            <div>${t.evidenceWindows}: ${evidenceRest.windows}</div>
            <div>${t.evidenceGreen}: ${evidenceRest.greenPct.toFixed(1)}%</div>
            <div class="score score-${evidenceRest.score}">
              ${t[`evidenceScore${capitalize(evidenceRest.score)}`]}
            </div>
          </div>
          <div class="compare-evidence-card">
            <div class="label">${t.evidenceLoadLabel}</div>
            <div>${t.evidenceWindows}: ${evidenceLoad.windows}</div>
            <div>${t.evidenceGreen}: ${evidenceLoad.greenPct.toFixed(1)}%</div>
            <div class="score score-${evidenceLoad.score}">
              ${t[`evidenceScore${capitalize(evidenceLoad.score)}`]}
            </div>
          </div>
        </div>
      </div>
    `;

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
          <span>
            <span class="compare-delta-value ${deltaHr.cls}">${deltaHr.text}</span>
            <span class="compare-conf-chip conf-${overallConf}">
              ${confidenceLabel}
            </span>
          </span>
        </div>
        <div class="compare-delta-row">
          <span class="compare-delta-label">${t.deltaAxis}</span>
          <span>
            <span class="compare-delta-value ${deltaAxis.cls}">${deltaAxis.text}</span>
            <span class="compare-conf-chip conf-${overallConf}">
              ${confidenceLabel}
            </span>
          </span>
        </div>
        <div class="compare-delta-row">
          <span class="compare-delta-label">${t.deltaQtc}</span>
          <span>
            <span class="compare-delta-value ${deltaQtc.cls}">${deltaQtc.text}</span>
            <span class="compare-conf-chip conf-${overallConf}">
              ${confidenceLabel}
            </span>
          </span>
        </div>
        <div class="compare-delta-row">
          <span class="compare-delta-label">${t.deltaSdnn}</span>
          <span>
            <span class="compare-delta-value ${deltaSdnn.cls}">${deltaSdnn.text}</span>
            <span class="compare-conf-chip conf-${overallConf}">
              ${confidenceLabel}
            </span>
          </span>
        </div>
        <div class="compare-delta-row">
          <span class="compare-delta-label">${t.deltaRmssd}</span>
          <span>
            <span class="compare-delta-value ${deltaRmssd.cls}">${deltaRmssd.text}</span>
            <span class="compare-conf-chip conf-${overallConf}">
              ${confidenceLabel}
            </span>
          </span>
        </div>
      </div>
    `;

    const deviationHtml = `
      <div class="zone-card-section">
        <h3 class="zone-card-title">${t.zoneCardTitle}</h3>

        <div class="zone-card-row">
          ${renderZoneCard(t.zoneParamHR, deltaHr.text, devHR, t)}
          ${renderZoneCard(t.zoneParamQTc, deltaQtc.text, devQTc, t)}
        </div>
        <div class="zone-card-row">
          ${renderZoneCard(t.zoneParamAxis, dAxisText, devAxis, t)}
          ${renderZoneCard(t.zoneParamHRV, dHrvText, devHRV, t)}
        </div>

        <div class="zone-legend">
          <div class="zone-legend-title">${t.zoneLegendTitle}</div>
          <div class="zone-legend-line">🟢 ${t.zoneGreenLabel}</div>
          <div class="zone-legend-line">🟡 ${t.zoneYellowLabel}</div>
          <div class="zone-legend-line">🔴 ${t.zoneRedLabel}</div>
        </div>
      </div>
    `;

    const morphText =
      morph.label === "high"
        ? t.morphHigh
        : morph.label === "moderate"
        ? t.morphModerate
        : t.morphMarked;

    const abruptText =
      abrupt.level === "minimal"
        ? t.abruptnessMinimal
        : abrupt.level === "expected"
        ? t.abruptnessExpected
        : t.abruptnessSudden;

    const secondaryHtml = `
      <div class="compare-secondary">
        <div class="compare-secondary-item">
          <div class="title">${t.morphTitle}</div>
          <div class="value">${morphText} (${morph.r.toFixed(2)})</div>
        </div>
        <div class="compare-secondary-item">
          <div class="title">${t.abruptnessTitle}</div>
          <div class="value">${abruptText}</div>
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
        ${evidenceHtml}
        ${deltaHtml}
        ${deviationHtml}
        ${secondaryHtml}
        <p style="font-size:12px; color: var(--text-muted); margin-top:4px;">
          ${t.hint}
        </p>
      </div>
    `;

  }

  function renderBenefitsView(container, lang) {
    const t = translations[lang]?.benefits || translations.en?.benefits;
    if (!t) {
      container.innerHTML = "";
      return;
    }

    const prereqButtonHtml = t.prereqButton
      ? `
    <button id="prereq-button" class="demo-button demo-button-primary demo-button-pulse">
      ${t.prereqButton}
    </button>
  `
      : "";

    const headerHtml = `
      <h1 class="tab-title">${t.title}</h1>
      <p class="tab-description">${t.subtitle}</p>
      ${prereqButtonHtml}
    `;

    const rowsHtml = (t.rows || [])
      .map(
        (row) => `
        <tr>
          <td class="benefits-cell benefits-problem">${row.problem}</td>
          <td class="benefits-cell benefits-solution">${row.solution}</td>
          <td class="benefits-cell benefits-value">${row.value}</td>
        </tr>
      `
      )
      .join("");

    const tableHtml = `
      <div class="benefits-table-wrapper">
        <table class="benefits-table">
          <thead>
            <tr>
              <th>${t.tableHeaders.problem}</th>
              <th>${t.tableHeaders.solution}</th>
              <th>${t.tableHeaders.value}</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    `;

    container.innerHTML = headerHtml + tableHtml;

    const prereqButton = document.getElementById("prereq-button");
    if (prereqButton) {
      prereqButton.addEventListener("click", () => openPrereqPanel(lang));
    }
  }

  function renderLiveEcgView(container, lang) {
    const t = translations[lang];
    const liveT = t.tabs.live;
    const channels = ecgDemoData.channels;
    const windows = ecgDemoData.windows;

    const toggleLabel = liveSegmentationEnabled
      ? liveT.segmentationToggleOn
      : liveT.segmentationToggleOff;
    const segmentationClasses = [
      "demo-button",
      "demo-button-primary",
      liveSegmentationEnabled ? "is-active" : "demo-button-pulse"
    ]
      .filter(Boolean)
      .join(" ");

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
        <button id="segmentation-toggle" class="${segmentationClasses}">
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

  if (prereqCloseButton) {
    prereqCloseButton.addEventListener("click", () => closePrereqPanel());
  }

  if (prereqOverlay) {
    prereqOverlay.addEventListener("click", () => closePrereqPanel());
  }

  if (helpPanelCloseButton) {
    helpPanelCloseButton.addEventListener("click", () => closeHelpPanel());
  }

  if (helpOverlay) {
    helpOverlay.addEventListener("click", () => closeHelpPanel());
  }

  updateTabLabels();
  renderTabContent();
  renderFooter();
});
