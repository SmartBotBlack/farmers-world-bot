(async () => {
  // Maps on which you can collect resources
  // 1 — Mining
  // 2 — Chiken
  // 3 — Plant
  // 4 — Cow
  const availableMaps = [1, 2, 3, 4];
  // Delay between moving to the next map (5sec)
  const delayNextMap = 5 * 1000;
  // Delay after map selection (5sec)
  const delayAfterMapSelect = 5 * 1000;
  // Delay after mine (1sec)
  const delayAfterMine = 1 * 1000;
  // Delay before repair begins (10sec)
  const delayBeforeRepair = 10 * 1000;
  // Delay after repair begins (1sec)
  const delayAfterRepair = 1 * 1000;

  setInterval(() => {
    const buttonClosePopup = document.querySelector(
      ".modal .plain-button.short"
    );

    if (buttonClosePopup) buttonClosePopup.click();
  }, 1 * 1000);

  const mapBtn = document.querySelector(".navbar-group--icon[alt='Map']");
  mapBtn.click();

  while (1) {
    for (let mapId = 0; mapId < 4; ++mapId) {
      if (!availableMaps.includes(mapId + 1)) continue;

      await new Promise((res) => setTimeout(res, delayNextMap));

      const map = document.querySelectorAll(".map-container-bg")[mapId];

      if (map.style.filter === "grayscale(1)") continue;

      map.click();

      await new Promise((res) => setTimeout(res, delayAfterMapSelect));

      for (const [, item] of document
        .querySelectorAll(".vertical-carousel-container img")
        .entries()) {
        // Restore energy start
        const currentFish =
          +document.querySelectorAll(".resource-number")[2].innerText;
        const [currentEnergy, maxEnergy] = document
          .querySelectorAll(".resource-number")[3]
          .textContent.split("/")
          .map(Number);

        if (maxEnergy - currentEnergy > 100) {
          const countEnergyClicks = Math.min(
            currentFish,
            Math.floor((maxEnergy - currentEnergy) / 5)
          );
          console.log("countEnergyClicks", countEnergyClicks);

          if (countEnergyClicks > 0) {
            document.querySelector(".resource-energy img").click();
            await new Promise((res) => setTimeout(res, 1e3));

            for (let i = 0; i++ < countEnergyClicks; ) {
              document.querySelector(".image-button[alt='Plus Icon']").click();
              await new Promise((res) => setTimeout(res, 5e2));
            }
            document.querySelector(".modal-wrapper .plain-button").click();
            await new Promise((res) => setTimeout(res, 2e4));
          }
        }
        // Restore energy end

        item.click();

        await new Promise((res) => setTimeout(res, 1e3));

        const buttonMine = document.querySelector(
          ".info-section .plain-button"
        );
        const timeToEnd = document.querySelector(
          ".info-section .info-time"
        ).innerText;
        await new Promise((res) => setTimeout(res, 10000));
        if (
          ![...buttonMine.classList].includes("disabled") &&
          timeToEnd === "00:00:00"
        ) {
          buttonMine.click();

          await new Promise((res) => setTimeout(res, delayAfterMine));

          // If map with mining
          if (mapId === 0) {
            await new Promise((res) => setTimeout(res, delayBeforeRepair));

            // Repair instruments
            const buttonRepair = document.querySelectorAll(
              ".info-section .plain-button"
            )[1];
            const quality = eval(
              document.querySelector(".card-number").innerText
            );
            if (
              ![...buttonRepair.classList].includes("disabled") &&
              quality < 0.5
            ) {
              buttonRepair.click();
              await new Promise((res) => setTimeout(res, delayAfterRepair));
            }
          }
        }
      }

      mapBtn.click();
    }
  }
})();
