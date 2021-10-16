(async () => {
  const result = [];

  const mapBtn = document.querySelector(".navbar-group--icon[alt='Map']");
  mapBtn.click();

  while (1) {
    for (let mapId = 0; mapId < 4; ++mapId) {
      if (typeof result[mapId] === "undefined") result[mapId] = [];

      await new Promise((res) => setTimeout(res, 5e3));

      const map = document.querySelectorAll(".map-container-bg")[mapId];

      if (map.style.filter === "grayscale(1)") continue;

      map.click();

      await new Promise((res) => setTimeout(res, 5e3));

      for (const [indexItem, item] of document
        .querySelectorAll(".vertical-carousel-container img")
        .entries()) {
        if (typeof result[mapId][indexItem] === "undefined")
          result[mapId][indexItem] = 0;

        item.click();

        await new Promise((res) => setTimeout(res, 1e3));

        const buttonMine = document.querySelector(".plain-button");
        if (
          ![...buttonMine.classList].includes("disabled") &&
          --result[mapId][indexItem] <= 0
        ) {
          buttonMine.click();

          await new Promise((res) => setTimeout(res, 1e3));

          if (mapId === 0) {
            while (
              !document.querySelector(".modal__button-group .plain-button")
            ) {
              await new Promise((res) => setTimeout(res, 5e3));
            }

            await new Promise((res) => setTimeout(res, 5e3));

            document
              .querySelector(".modal__button-group .plain-button")
              .click();

            await new Promise((res) => setTimeout(res, 1e3));
          }

          await new Promise((res) => setTimeout(res, 1e4));

          const currentEnergy = +document.querySelectorAll(
            ".resource-number div"
          )[3].innerText;
          const currentFish =
            +document.querySelectorAll(".resource-number")[2].innerText;
          if (currentEnergy < 100 && currentFish > 20) {
            document.querySelector(".resource-energy img").click();
            await new Promise((res) => setTimeout(res, 1e3));

            for (let i = 0; i++ < 20; ) {
              document.querySelector(".image-button[alt='Plus Icon']").click();
              await new Promise((res) => setTimeout(res, 5e2));
            }

            document.querySelector(".modal-wrapper .plain-button").click();

            await new Promise((res) => setTimeout(res, 3e3));
          }

          result[mapId][indexItem] = 99;
        }
      }

      mapBtn.click();
    }
  }
})();
