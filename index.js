(async () => {
  const mapBtn = document.querySelector(".navbar-group--icon[alt='Map']");
  mapBtn.click();

  while (1) {
    for (let mapId = 0; mapId < 4; ++mapId) {
      await new Promise((res) => setTimeout(res, 5e3));

      const map = document.querySelectorAll(".map-container-bg")[mapId];

      if (map.style.filter === "grayscale(1)") continue;

      map.click();

      await new Promise((res) => setTimeout(res, 5e3));

      for (const item of document.querySelectorAll(
        ".vertical-carousel-container img"
      )) {
        item.click();

        await new Promise((res) => setTimeout(res, 1e3));

        const buttonMine = document.querySelector(".plain-button");
        if (![...buttonMine.classList].includes("disabled")) {
          const buttonMine = document.querySelector(".plain-button");

          if (![...buttonMine.classList].includes("disabled")) {
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
          }

          await new Promise((res) => setTimeout(res, 3e3));
        }
      }

      mapBtn.click();
    }
  }
})();
