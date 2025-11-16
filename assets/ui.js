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
          "This view will present a reconstructed 12-lead ECG layout, using the fixed geometry of textile electrodes and per-lead confidence scores."
      },
      profile: {
        title: "Digital Heart Profile – aggregated metrics",
        description:
          "This view will visualise the Digital Heart Profile: median P–QRS–T complexes, intervals (PR, QRS, QT, QTc), electrical axis and HRV metrics."
      },
      compare: {
        title: "Compare Profiles – rest vs after load",
        description:
          "This view will compare two profiles (for example, rest vs after load) and highlight changes in axis, intervals and HRV."
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
          "Здесь будет представлен реконструированный 12-канальный вид ЭКГ с учётом фиксированной геометрии текстильных электродов и показателей достоверности по каждому отведению."
      },
      profile: {
        title: "Цифровой профиль сердца – агрегированные параметры",
        description:
          "Здесь будет визуализирован Цифровой Профиль Сердца: медианные комплексы P–QRS–T, интервалы (PR, QRS, QT, QTc), электрическая ось и показатели вариабельности ритма."
      },
      compare: {
        title: "Сравнение профилей – покой и нагрузка",
        description:
          "Здесь будут сравниваться два профиля (например, покой и после нагрузки) с выделением изменений оси, интервалов и показателей HRV."
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
          "Deze weergave toont een gereconstrueerde 12-kanaals ECG-layout, gebruikmakend van de vaste geometrie van textiele elektroden en een betrouwbaarheidsscore per afleiding."
      },
      profile: {
        title: "Digitaal Hartprofiel – geaggregeerde parameters",
        description:
          "Deze weergave visualiseert het Digitale Hartprofiel: mediane P–QRS–T-complexen, intervallen (PR, QRS, QT, QTc), elektrische as en HRV-metingen."
      },
      compare: {
        title: "Profielen vergelijken – rust versus belasting",
        description:
          "Deze weergave vergelijkt twee profielen (bijvoorbeeld rust versus na belasting) en markeert de veranderingen in as, intervallen en HRV."
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

    let title = "";
    let description = "";

    if (currentTab === "leads") {
      title = t.tabs.leads.title;
      description = t.tabs.leads.description;
    } else if (currentTab === "profile") {
      title = t.tabs.profile.title;
      description = t.tabs.profile.description;
    } else if (currentTab === "compare") {
      title = t.tabs.compare.title;
      description = t.tabs.compare.description;
    }

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

  function renderLiveEcgView(container, lang) {
    const t = translations[lang];
    const channels = ecgDemoData.channels.slice(0, 3);
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
