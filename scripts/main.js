import { CriminalList } from "./criminals/CriminalList.js"
import { ConvictionSelect } from "./convictions/ConvictionSelect.js"
import { OfficerSelect } from "./officers/OfficerSelect.js"
import { NoteForm } from "./notes/NoteForm.js"
import { ShowNotesButton } from "./notes/ShowNotesButton.js"
import "./notes/NoteList.js"
import { Criminal } from "./criminals/Criminal.js"
import { AssociatesDialog } from "./criminals/AssociatesDialog.js"


CriminalList()
ConvictionSelect()
OfficerSelect()
NoteForm()
ShowNotesButton()



// TODO:
// What feature are we implementing?
// Filter our criminals by the crimes committed


// What tasks do we need to complete to implement the feature?
// filter the criminal data by matching the crime that has been selected

// listen for the selection of a crime and capture the chosen value
// Use the selected value to filter the criminal data
// Update the DOM with the filtered criminal data


// Which modules are involved?
// CriminalList
// ConvictionSelect

// Alibis ( ch 8 )
// Add a button to Criminal (HTML converter ) component
// Add new component to display known associates: AssociatesDisplay
//       job: create HTML rep of associates and alibis
// Dispatch custom event from Criminal.js to alert other modules that the associates btn has been clicked
// Listen for knownAssociatesClicked event on AssociatesDisplay
// Associates Display component needs to find the criminal with the matching id
// Loop over the found criminal's known_associates array and display them
