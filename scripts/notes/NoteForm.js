import { saveNote } from "./NoteProvider.js"
import { useCriminals, getCriminals } from "../criminals/CriminalProvider.js"

const contentTarget = document.querySelector(".noteFormContainer")
const eventHub = document.querySelector(".container")

// Handle browser-generated click event in component
eventHub.addEventListener("click", clickEvent => {
  if (clickEvent.target.id === "saveNote") {

      // Need to gather the data from the form
      const author = document.querySelector("#author").value
      const text = document.querySelector("#text").value
      const criminalId = parseInt(document.querySelector("#suspect").value)


      // Make a new object representation of a note
      const newNote = {
        author: author,
        text: text,
        criminalId: criminalId,
        timestamp: Date.now()
      }
      // Change API state and application state
      saveNote(newNote)
  }
})

const render = () => {
    const criminalsCollection = useCriminals()

    contentTarget.innerHTML = `
      <section class="noteForm">
        <input type="text" id="author" placeholder="author name">
        <textarea id="text" placeholder="note text"></textarea>

        <select class="dropdown" id="suspect">
            <option value="0">Please select a suspect...</option>
            ${
                criminalsCollection.map(
                  (criminal) => `
                    <option value=${criminal.id}>
                      ${criminal.name}
                    </option>
                `)
            }
        </select>


        <button id="saveNote">Save Note</button>
      </section>
    `
}

export const NoteForm = () => {
    getCriminals()
    .then( () => render())
}
