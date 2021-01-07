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
  debugger
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
