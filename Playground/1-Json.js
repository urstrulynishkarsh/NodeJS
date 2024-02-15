const print=console.log

const fs=require("fs")
const Book={
    title:"The NodeJs World",
    author:"Nishkarsh"
}

// it will return in json format we can't easilt find property
const bookJson=JSON.stringify(Book);
print(bookJson)

fs.writeFileSync('1-Json.json',bookJson)

// it will return original objetc so we can find easily property
const bookparse=JSON.parse(bookJson);
print(Object.keys(bookparse))
print(Object.values(bookparse))

key=Object.keys(bookparse);
values=Object.values(bookparse)

print(key)
print(values)

