import { CriminalList } from "./criminals/CriminalList.js"
import { ConvictionSelect } from "./convictions/ConvictionSelect.js"
import { OfficerSelect } from "./officers/OfficerSelect.js"
import { NoteForm } from "./notes/NoteForm.js"
import { ShowNotesButton } from "./notes/ShowNotesButton.js"
import "./notes/NoteList.js"


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
