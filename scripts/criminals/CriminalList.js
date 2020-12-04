import { getCriminals, useCriminals } from './CriminalProvider.js'
import { Criminal } from './Criminal.js'

const criminalElement = document.querySelector("#criminalsContainer")

export const CriminalList = () => {
    let criminalCards = []
    getCriminals().then( () => {
      let perps = useCriminals()

      for (const perp of perps) {
        criminalCards.push(Criminal(perp))
      }

      criminalElement.innerHTML = criminalCards.join("")
    })
}
