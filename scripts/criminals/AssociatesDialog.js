import { useCriminals } from "./CriminalProvider.js"

const eventHub = document.querySelector(".container")
// const dialogClose = document.querySelector("#closeDialog")

eventHub.addEventListener("click", (event) => {
  if (event.target.id === "closeDialog") {
    associatesDialog.close();
  }
})

eventHub.addEventListener("associatesBtnClicked", (event) => {
  const associatesDialog = document.querySelector("#associatesDialog")
  const dialogText = document.querySelector("#associatesDialog__text")

  console.log('event al id', event.detail.clickedCriminalId);

  const clickedCriminal = useCriminals().find(
      (criminal) => criminal.id === parseInt(event.detail.clickedCriminalId)
    )

  dialogText.innerHTML =`
    <h3>Associates of ${clickedCriminal.name}<h3></h3>
    ${clickedCriminal.known_associates.map( (associate) => `
      <h4>${associate.name}</h4>
      <div>${associate.alibi}</div>`
      ).join("")}`

  associatesDialog.showModal()

})

export const AssociatesDialog = () => {
  return `
    <dialog id="associatesDialog">
      <div id="associatesDialog__text"></div>
      <button id="closeDialog">close</button>
    </dialog>
  `
}
