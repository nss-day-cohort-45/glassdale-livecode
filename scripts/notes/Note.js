export const NoteHTMLConverter = (noteObject) => {
  return `
      <section class="note">
          <div class="note__title">Suspect: ${ noteObject.criminalName }</div>
          <div class="note__text">${ noteObject.text }</div>
          <div class="note__author">Author: ${ noteObject.author }</div>
          <div class="note__timestamp">Timestamp: ${ new Date(noteObject.timestamp).toLocaleDateString('en-US')  }</div>
      </section>
  `
}


// TODO: Change suspect text input to dropdown select of API criminals
// Make a select element and poplate it with all of the crimimals
    // Fetch call to get all the criminals ( maybe )
// Change the HTML representation of our form
// Event listener to listen for dropdown change/select ( maybe )
// Change how the note is saved, to capture the criminalId

// Modules to refactor:
// NoteForm
// Note
// NoteList
