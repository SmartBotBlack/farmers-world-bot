(async () => {
  // Maps on which you can collect resources
  // 1 — Mining
  // 2 — Chiken
  // 3 — Plant
  // 4 — Cow
  const availableMaps = [1, 2, 3, 4];
  // Delay between moving to the next map [min, max] [5sec, 15sec]
  const delayNextMap = [5 * 1000, 15 * 1000];
  // Delay after map selection [min, max] [5sec, 15sec]
  const delayAfterMapSelect = [5 * 1000, 15 * 1000];
  // Delay after mine [min, max] [10sec, 25sec]
  const delayAfterMine = [10 * 1000, 25 * 1000];
  // Delay before repair begins [min, max] [8sec, 15sec]
  const delayBeforeRepair = [8 * 1000, 15 * 1000];
  // Delay after repair begins [min, max] [1sec, 3sec]
  const delayAfterRepair = [1 * 1000, 3 * 1000];

  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  setInterval(() => {
    const buttonClosePopup = document.querySelector(
      ".modal .plain-button.short"
    );

    if (buttonClosePopup) buttonClosePopup.click();
  }, random(1, 2) * 1000);

  setInterval(() => {
    const buttonCloseCPUPopup = document.querySelector(
      ".modal-stake .modal-stake-close img"
    );

    if (buttonCloseCPUPopup) buttonCloseCPUPopup.click();
  }, random(1, 2) * 1000);

  const mapBtn = document.querySelector(".navbar-group--icon[alt='Map']");
  mapBtn.click();

  while (1) {
    for (let mapId = 0; mapId < 4; ++mapId) {
      if (!availableMaps.includes(mapId + 1)) continue;

      await new Promise((res) => setTimeout(res, random(...delayNextMap)));

      const map = document.querySelectorAll(".map-container-bg")[mapId];

      if (map.style.filter === "grayscale(1)") continue;

      map.click();

      await new Promise((res) =>
        setTimeout(res, random(...delayAfterMapSelect))
      );

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

          if (countEnergyClicks > 0) {
            document.querySelector(".resource-energy img").click();
            await new Promise((res) => setTimeout(res, random(1, 2) * 1000));

            for (let i = 0; i++ < countEnergyClicks; ) {
              document.querySelector(".image-button[alt='Plus Icon']").click();
              await new Promise((res) => setTimeout(res, random(2, 10) * 100));
            }
            document.querySelector(".modal-wrapper .plain-button").click();
            await new Promise((res) => setTimeout(res, random(15, 15) * 1000));
          }
        }
        // Restore energy end

        item.click();

        await new Promise((res) => setTimeout(res, random(1, 2) * 1000));

        const buttonMine = document.querySelector(
          ".info-section .plain-button"
        );
        const timeToEnd = document.querySelector(
          ".info-section .info-time"
        ).innerText;

        if (
          ![...buttonMine.classList].includes("disabled") &&
          (timeToEnd === "00:00:00" || mapId === 0)
        ) {
          buttonMine.click();

          await new Promise((res) =>
            setTimeout(res, random(...delayAfterMine))
          );

          // If map with mining
          if (mapId === 0) {
            await new Promise((res) =>
              setTimeout(res, random(...delayBeforeRepair))
            );

            // Repair instruments
            const buttonRepair = document.querySelectorAll(
              ".info-section .plain-button"
            )[1];
            if (buttonRepair) {
              const quality = eval(
                document.querySelector(".card-number").innerText
              );
              if (
                ![...buttonRepair.classList].includes("disabled") &&
                quality < 0.5
              ) {
                buttonRepair.click();
                await new Promise((res) =>
                  setTimeout(res, random(...delayAfterRepair))
                );
              }
            }
          }
        }
      }

      mapBtn.click();
    }
  }
})();
