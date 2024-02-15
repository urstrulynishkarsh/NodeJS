const fs=require("fs")
const chalk=require('chalk')


const getNotes=()=>{
    return 'Your notes'
}

const addNote=(title,body)=>{
    const notes=loadNotes()

    // const duplicateNotes=notes.filter((note)=>{
    //     return note.title===title
    // })
    // console.log(duplicateNotes)

    const duplicateNotes=notes.find((note)=>note.title===title)

    if(duplicateNotes===undefined) //(!duplicateNotes)
    {
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes)
        console.log("New Note Added")
    }
    else{
        console.log("Note title already taken")
    }
   
}

const saveNotes=(notes)=>{
    const dataJSON=JSON.stringify(notes);
   fs.writeFileSync("notes.json",dataJSON)
}

const loadNotes=()=>{
    try{
        const dataBuffer=fs.readFileSync('notes.json')
        const dataJSON=dataBuffer.toString();
        const parseData=JSON.parse(dataJSON);
        return parseData;
    }catch(e){
        return []
    }
}

const removeNote=(title)=>{
    const notes=loadNotes()
    const notesKeep=notes.filter((note)=>{
        return note.title!==title
    })
    if(notes.length>notesKeep.length)
    {
         console.log(chalk.blue.inverse("Note removed successfully"))
         saveNotes(notesKeep)
    }
    else{
        console.log(chalk.red.inverse("NO! Note Found"))
    }
}

const ListNote=()=>{
    const notes=loadNotes()
    // console.log(notes)
    notes.forEach((note)=>{
        console.log(chalk.green.inverse(note.title))
    })
}

const readNote=(title)=>{
    const notes=loadNotes()
    const note=notes.find((note)=>note.title===title)

    if(note)
    {
        console.log(chalk.red.green(note.title))
        console.log(note.body)
    }
    else{
        console.log(chalk.red.inverse("note not found"))
    }
}

module.exports={
    getNotes:getNotes,
    addNote:addNote,
    removeNote:removeNote,
    ListNote:ListNote,
    readNote:readNote
}