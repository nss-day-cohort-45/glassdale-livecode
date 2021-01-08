const contentTarget = document.querySelector(".witnessStatmentsBtn")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    const witnessBtn = clickEvent.target

    if (clickEvent.target.id === "showWitnessStatements") {
        let btnAction = ""
        if (witnessBtn.innerText === "Witnesses Statements") {
          btnAction = "show"
          witnessBtn.innerText = "Show Criminals"
        } else {
          btnAction = "hide"
          witnessBtn.innerText = "Witnesses Statements"
        }

        const customEvent = new CustomEvent("showStatmentsClicked", {
          detail: { btnAction: btnAction }
        })
        eventHub.dispatchEvent(customEvent)
    }
})

export const ShowWitnessStatmentsBtn = () => {
    contentTarget.innerHTML = "<button id='showWitnessStatements'>Witnesses Statements</button>"
}
