setInterval(async () => {
  for (const timer of document.querySelectorAll(".satellite__card-time")) {
    // console.log("last time", timer.innerText);
    if (timer.innerText === "00:00:00") {
      for (const item of document.querySelectorAll(
        ".vertical-carousel-container img"
      )) {
        item.click();

        await new Promise((res) => setTimeout(res, 2e3));

        const buttonMine = document.querySelector(".plain-button");
        if (![...buttonMine.classList].includes("disabled")) {
          buttonMine.click();

          await new Promise((res) => setTimeout(res, 1e3));

          while (
            !document.querySelector(".modal__button-group .plain-button")
          ) {
            await new Promise((res) => setTimeout(res, 2e3));
          }

          await new Promise((res) => setTimeout(res, 5e3));

          document.querySelector(".modal__button-group .plain-button").click();

          await new Promise((res) => setTimeout(res, 2e3));
        }

        await new Promise((res) => setTimeout(res, 2e3));
      }
    }
  }
}, 1e4);

//
