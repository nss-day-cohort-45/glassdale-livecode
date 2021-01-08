import { WitnessHTMLConverter } from "./Witness.js";
import { getWitnesses, useWitnesses } from "./WitnessProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector("#statementsContainer")


eventHub.addEventListener("showStatmentsClicked", (evt) => {
  if (evt.detail.btnAction === "show") {
    contentTarget.classList.remove("is-hidden")
    WitnessList()
  } else {
    contentTarget.classList.add("is-hidden")
  }
})

export const WitnessList = () => {
  getWitnesses()
  .then(() => {
      const allWitnessStatements = useWitnesses()
      render(allWitnessStatements)
  })
}

const render = (witnessStatements) => {
  const witnessStatementsHTML = witnessStatements.map(
    (witnessStatement) => WitnessHTMLConverter(witnessStatement)
  ).join('')
  contentTarget.innerHTML = witnessStatementsHTML
}
