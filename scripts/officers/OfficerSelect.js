/*
 *   OfficerSelect component that renders a select HTML element
 *   which lists all officers in the Glassdale PD API
 */
// listen for the selection of an oficer and capture the chosen value
// send out a message ( customEvent) via the eventHub

import { useOfficers, getOfficers } from "./OfficerProvider.js"

// Get a reference to the DOM element where the <select> will be rendered
const contentTarget = document.querySelector(".filters__officer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("change", event => {

  // Only do this if the `crimeSelect` element was changed
  if (event.target.id === "officerSelect") {
      // Create custom event. Provide an appropriate name.
      const customEvent = new CustomEvent("officerChosen", {
          detail: {
              officerThatWasChosen: event.target.value
          }
      })

      // Dispatch to event hub
      eventHub.dispatchEvent(customEvent)
  }
})


export const OfficerSelect = () => {
    // Trigger fetching the API data and then loading it into application state
    getOfficers()
    .then( () => {
      // Get all officers from application state
      const officers = useOfficers()
      render(officers)
    })
}

const render = officersCollection => {
    /*
        Use interpolation here to invoke the map() method on
        the officerssCollection to generate the option elements.
        Look back at the example provided above.
    */
    contentTarget.innerHTML = `
        <select class="dropdown" id="officerSelect">
            <option value="0">Please select an arresting officer...</option>
            ${
                officersCollection.map((cop) => `
                  <option value=${cop.id}>
                    ${cop.name}
                  </option>
                `)
            }
        </select>
    `
}
