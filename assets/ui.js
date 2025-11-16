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
          "This view will show how each 2-second window is classified by quality based on noise, drift, motion artefacts and other metrics."
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
          "Здесь будет показано, как каждое 2-секундное окно классифицируется по качеству на основе шума, дрейфа, артефактов движения и других метрик."
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
          "Deze weergave laat zien hoe elk 2-seconden venster wordt geclassificeerd op basis van ruis, baselinedrift, bewegingsartefacten en andere kwaliteitsparameters."
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
    footer: {
      disclaimer:
        "Deze demo is geen medisch hulpmiddel en levert geen diagnostische conclusies."
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  let currentLang = "en";
  let currentTab = "live";

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

    let title = "";
    let description = "";

    if (currentTab === "live") {
      title = t.tabs.live.title;
      description = t.tabs.live.description;
    } else if (currentTab === "quality") {
      title = t.tabs.quality.title;
      description = t.tabs.quality.description;
    } else if (currentTab === "leads") {
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
