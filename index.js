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

      for (const [indexItem, item] of document
        .querySelectorAll(".vertical-carousel-container img")
        .entries()) {
        item.click();

        await new Promise((res) => setTimeout(res, 1e3));

        const buttonMine = document.querySelector(
          ".info-section .plain-button"
        );
        const timeToEnd = document.querySelector(
          ".info-section .info-time"
        ).innerText;
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

          const currentEnergy = +document.querySelectorAll(
            ".resource-number div"
          )[3].innerText;
          const currentFish =
            +document.querySelectorAll(".resource-number")[2].innerText;
          if (currentEnergy < 200 && currentFish > 20) {
            document.querySelector(".resource-energy img").click();
            await new Promise((res) => setTimeout(res, 1e3));

            for (let i = 0; i++ < 20; ) {
              document.querySelector(".image-button[alt='Plus Icon']").click();
              await new Promise((res) => setTimeout(res, 5e2));
            }

            document.querySelector(".modal-wrapper .plain-button").click();

            await new Promise((res) => setTimeout(res, 2e4));
          }
        }
      }

      mapBtn.click();
    }
  }
})();
