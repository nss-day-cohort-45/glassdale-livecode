import { getCriminals, useCriminals } from './CriminalProvider.js'
import { Criminal } from './Criminal.js'
import { useConvictions } from "../convictions/ConvictionProvider.js"
import { useOfficers } from "../officers/OfficerProvider.js"
import { AssociatesDialog } from "./AssociatesDialog.js"

const criminalElement = document.querySelector("#criminalsContainer")
const eventHub = document.querySelector(".container")

const render = (criminals) => {
  let criminalCards = []
  for (const perp of criminals) {
    criminalCards.push(Criminal(perp))
  }

  criminalElement.innerHTML = `${criminalCards.join("")} ${AssociatesDialog()}`
}

// Listen for the custom event you dispatched in ConvictionSelect
eventHub.addEventListener('crimeChosen', event => {

  // Use the property you added to the event detail.
  if (event.detail.crimeThatWasChosen !== "0"){
      /*
          Filter the criminals application state down to the people that committed the crime
      */
      console.log('crime', event.detail);
      const crimes = useConvictions()
      const crime = crimes.find( (crime) => crime.id === parseInt(event.detail.crimeThatWasChosen) )

      const criminals = useCriminals()
      const matchingCriminals = criminals.filter( (criminal) => criminal.conviction === crime.name)

      render(matchingCriminals)
  }
})

eventHub.addEventListener('officerChosen', event => {

  // Use the property you added to the event detail.
  if (event.detail.officerThatWasChosen !== "0"){
      /*
          Filter the criminals application state down to the people that were arrested by the chosen officer
      */
      const officers = useOfficers()
      const officer = officers.find( (officer) => officer.id === parseInt(event.detail.officerThatWasChosen) )

      const criminals = useCriminals()
      const matchingCriminals = criminals.filter( (criminal) => criminal.arrestingOfficer === officer.name)

      render(matchingCriminals)
  }
})

export const CriminalList = () => {
    getCriminals().then( () => {
      let perps = useCriminals()
      render(perps)
    })
}
