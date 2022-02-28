(async () => {
  // Maps on which you can collect resources
  // 1 — Mining
  // 2 — Chiken
  // 3 — Plant
  // 4 — Cow
  const availableMaps = [1, 2, 3, 4];
  // Delay between moving to the next map [min, max]
  const delayNextMap = [10 * 1000, 15 * 1000];
  // Delay after map selection [min, max]
  const delayAfterMapSelect = [5 * 1000, 10 * 1000];
  // Delay after mine [min, max]
  const delayAfterMine = [15 * 1000, 20 * 1000];
  // Delay after repair [min, max]
  const delayAfterRepair = [10 * 1000, 15 * 1000];

  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  setInterval(() => {
    const buttonClosePopup = document.querySelector(
      ".modal .plain-button.short"
    );

    if (buttonClosePopup) {
      console.log("Closing popup, modal .plain-button.short");
      buttonClosePopup.click();
    }
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
    try {
      // For each map
      for (let mapId = 0; mapId < 4; ++mapId) {
        if (!availableMaps.includes(mapId + 1)) continue;

        await new Promise((res) => setTimeout(res, random(...delayNextMap)));

        const map = document.querySelectorAll(".map-container-bg")[mapId];

        if (map.style.filter === "grayscale(1)") continue;

        map.click();
        console.log("I Switched to map: " + mapId);

        await new Promise((res) =>
          setTimeout(res, random(...delayAfterMapSelect))
        );

        // For each NFT in the vertical carousel
        for (const [, item] of document
          .querySelectorAll(".vertical-carousel-container img")
          .entries()) {

          // Restore energy start
          const currentFish = Math.floor(
            +document.querySelectorAll(".resource-number")[2].innerText
          );
          const [currentEnergy, maxEnergy] = document
            .querySelectorAll(".resource-number")[3]
            .textContent.split("/")
            .map(Number);

          if (currentEnergy < 400 && currentFish > 1) {
            const countEnergyClicks = Math.min(
              currentFish,
              Math.floor((maxEnergy - currentEnergy) / 5)
            );

            if (countEnergyClicks > 0) {
              document.querySelector(".resource-energy img").click();
              await new Promise((res) => setTimeout(res, random(1, 2) * 1000));

              for (let i = 0; i++ < countEnergyClicks; ) {
                document
                  .querySelector(".image-button[alt='Plus Icon']")
                  .click();
                await new Promise((res) =>
                  setTimeout(res, 50)
                );
              }
              console.log("*** Restoring energy from " + currentEnergy);
              document.querySelector(".modal-wrapper .plain-button").click();
              await new Promise((res) =>
                setTimeout(res, random(15, 15) * 1000)
              );
            }
          }
          // Restore energy end

          item.click();

          await new Promise((res) => setTimeout(res, random(1, 2) * 1000));

          const cardName = document.querySelector(
                ".info-section .info-title-name").innerText;
          const buttonMine = document.querySelector(
            ".info-section .plain-button"
          );
          const timeToEnd = document.querySelector(
            ".info-section .info-time"
          ).innerText;

          console.log("Looking at card: " + cardName);

          // Repair tool if needed
          if (mapId === 0) {
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

          // Skip if disabled
          if ([...buttonMine.classList].includes("disabled")) {
            console.log("Mine button disabled, skipping");
            continue;
          }

          if (mapId === 0) {
            // Handle mining tools / member cards
            const mineLevelDiv = document.querySelector(
              ".info-section .info-title-level"
            );
            if (!mineLevelDiv) {
              console.log("Member NFT click: " + document.querySelector(
              ".info-section .info-title-name").innerText);
              buttonMine.click();
            } else {
              const mineLevels = mineLevelDiv.innerText.split("/");
              if (mineLevels[0] === mineLevels[1]) {
                console.log("CLICK Tool NFT: " + document.querySelector(
                            ".info-section .info-title-name").innerText
                            + ", mineLevels: " + mineLevels);
                buttonMine.click();
              } else {
                console.log("Skipping Tool: " + document.querySelector(
                            ".info-section .info-title-name").innerText
                            + ", mineLevels: " + mineLevels);
                continue;
              }
            }
          } else if (timeToEnd === "00:00:00") {
            console.log("00:00:00 time left, time to click");
            buttonMine.click();
          } else {
            console.log("Not ready to click, skipping"); // TODO: probably can't get here
          }
          await new Promise((res) =>
            setTimeout(res, random(...delayAfterMine))
          );
        }

        mapBtn.click();
      }
    } catch (e) {
      mapBtn.click();
    }
  }
})();

