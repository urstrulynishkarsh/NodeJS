const yargs=require('yargs')
const notes=require('./note')
// const command=process.argv[2]
// console.log(process.argv)

// if(command==="add")
// {
//     console.log("adding Notes")
// }
// else if(command==='remove'){
//     console.log("removing notes")
// }

// yargs.version('1.1.1.1')

// console.log(process.argv)
// console.log(yargs.argv)



// customize yargs
yargs.version('1.1.1.1')

// add,remove,read,list

// create add yargs.command 

// yargs.command({
//     command:'add',
//     describe:'Add a new notes',
//     handler:function(){
//         console.log("adding a new notes")
//     }
// })


yargs.command({
    command:'add',
    describe:'Add a new notes',
    builder:{
        title:{
            describe:'Note Title',
            // compulsary tittle giveen
            demandOption:true,
            // conver into string if you have number 
            type:'string'
        },
        body:{
            describe:'Note Title',
            // compulsary tittle giveen
            demandOption:true,
            // conver into string if you have number 
            type:'string'
        }
    },
    // handler:function(argv){
    //     console.log("adding a new notes",argv)
    // }
    handler(argv){
        // console.log("title:"+argv.title)
        // console.log("body:"+argv.body)
        notes.addNote(argv.title,argv.body)

    }
})

yargs.command({
    command:'remove',
    describe:'remove a notes',
    builder:{
        title:{
            describe:'Note Title',
            // compulsary tittle giveen
            demandOption:true,
            // conver into string if you have number 
            type:'string'
        }
    },
    handler(argv){
        // console.log('removing the notes',argv)
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command:'read',
    describe:'read a notes',
    builder:{
        title:{
            describe:'Note Title',
            // compulsary tittle giveen
            demandOption:true,
            // conver into string if you have number 
            type:'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
        // console.log('reading the notes')
    }
})

yargs.command({
    command:'list',
    describe:'list the notes',
    handler(){
        notes.ListNote()
        // console.log('listing the notes')
    }
})

// console.log(yargs.argv)
yargs.parse()
