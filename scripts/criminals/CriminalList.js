import { getCriminals, useCriminals } from './CriminalProvider.js'
import { Criminal } from './Criminal.js'
import { useConvictions } from "../convictions/ConvictionProvider.js"
import { useOfficers } from "../officers/OfficerProvider.js"
import { AssociatesDialog } from "./AssociatesDialog.js"
import { getFacilities, useFacilities} from "../facilities/FacilityProvider.js"
import { getCriminalFacilities, useCriminalFacilities} from "../facilities/CriminalFacilityProvider.js"

const contentTarget = document.querySelector("#criminalsContainer")
const eventHub = document.querySelector(".container")

let criminals = []
let facilities = []
let criminalFacilities = []


export const CriminalList = () => {
  getCriminals()
  .then(getFacilities)
  .then(getCriminalFacilities)
  .then(() => {
      criminals = useCriminals()
      facilities = useFacilities()
      criminalFacilities = useCriminalFacilities()

      render(criminals)
  })
}


// old version
// const render = (criminals) => {
//   let criminalCards = []
//   for (const perp of criminals) {
//     criminalCards.push(Criminal(perp))
//   }

//   criminalElement.innerHTML = `${criminalCards.join("")} ${AssociatesDialog()}`
// }

// New Version
const render = (criminalList) => {
  // Step 1 - Iterate all criminals
  contentTarget.innerHTML = criminalList.map(
      (criminalObject) => {
          // Step 2 - Filter all relationships to get only ones for this criminal
          const facilityRelationshipsForThisCriminal = criminalFacilities.filter(cf => cf.criminalId === criminalObject.id)

          // Step 3 - Convert the relationships to facilities with map()
          const matchingFacilities = facilityRelationshipsForThisCriminal.map(cf => {
              const matchingFacilityObject = facilities.find(facility => facility.id === cf.facilityId)
              return matchingFacilityObject
          })

          // Must pass the matching facilities to the Criminal component
          return Criminal(criminalObject, matchingFacilities)
      }
  ).join("")
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

      const criminalsToFilter = criminals.slice()
      const matchingCriminals = criminalsToFilter.filter( (criminal) => criminal.conviction === crime.name)

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

      const criminalsToFilter = criminals.slice()
      const matchingCriminals = criminalsToFilter.filter( (criminal) => criminal.arrestingOfficer === officer.name)

      render(matchingCriminals)
  }
})

eventHub.addEventListener("showStatmentsClicked", (evt) => {
  contentTarget.classList.toggle("is-hidden")
})



// TODO: Show witness statements in place of criminals list

// Which components do you need to create for this feature?
// provider -- get witnesses and add them to app state. Make app state available with a useWitnesses function
// HTML converter -- represent a JS object as HTML
// Button with a "click" event listener on it, with a callback that generates a custom event.
// List Component for creating 'cards' using the witness data. Listens for the custom event that signals the show witnesses button was clicked.

// Where is the data coming from in the API? Do you need a new provider?
// From the glassdale API, and yes!

// Which component is "talking" (i.e. dispatches a custom event) when a user performs an action?
// The Button component

// Which component would listen and react to that custom event?
// List Component

// Does data need to be sent along with the message?
// It depends

// Which DOM element would contain the list of witness statements? Do you need a new one, or can they go in an existing one?
// 1 ) Just put it in the same container as the criminal list!
// 2 ) Put the witnesses in their own container and just hide the criminals!

// The button should toggle between showing criminals and witnesses
// Can we change the btn text depending on the state of the displayed data?
