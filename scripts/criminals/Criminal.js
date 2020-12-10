const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", (event) => {
  if (event.target.id.includes("associates--")) {
    const customEvent = new CustomEvent("associatesBtnClicked", {
      detail: {
        clickedCriminalId: event.target.id.split("--")[1]
      }
    })
    eventHub.dispatchEvent(customEvent)
  }
})


export const Criminal = (criminalObj) => {
  return `
    <article class="criminal">
      <h2>${criminalObj.name}</h2>
      <div>Crime: ${criminalObj.conviction}</div>
      <div>Term Start: ${new Date(criminalObj.incarceration.start).toLocaleDateString('en-US')}</div>
      <div>Term End: ${new Date(criminalObj.incarceration.end).toLocaleDateString('en-US')}</div>
      <button id="associates--${criminalObj.id}">Associate Alibis</button>
    </article>
  `
}
