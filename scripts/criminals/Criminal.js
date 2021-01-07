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

// Now Criminal also has a paramenter for the criminal's facilities
export const Criminal = (criminalObj, facilities) => {
  return `
    <article class="criminal">
      <h2>${criminalObj.name}</h2>
      <div>Crime: ${criminalObj.conviction}</div>
      <div>Term Start: ${new Date(criminalObj.incarceration.start).toLocaleDateString('en-US')}</div>
      <div>Term End: ${new Date(criminalObj.incarceration.end).toLocaleDateString('en-US')}</div>

      <div>
        <h2>Facilities</h2>
        <ul>
            ${facilities.map(f => `<li>${f.facilityName}</li>`).join("")}
        </ul>
      </div>

      <button id="associates--${criminalObj.id}">Associate Alibis</button>
    </article>
  `
}
