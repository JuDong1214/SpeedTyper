const typeDiv = document.getElementById("typing");
console.log(typeDiv);
var resBut = document.getElementById('restart');
        resBut.style.display = 'none';

const words = new Array("my", "name", "julian",  "probably", "people", "guest",
                        "move", "large", "program", "high", "against", "own", "only", "feel", "same", 
                        "more", "a", "look", "regard", "down", "such", "must", "feet", "face", "lie", 
                        "quick", "zebra", "monkey", "the","of","and","a","to","in","is","you","that",
                        "it","he","was","for","on","are","as","with","his","they","at","be","this",
                        "have","from","or","one","had","by","word","but","not","what","all","were","we",
                        "when","your","can","said","there","use","an","each","which","she","do","how","their",
                        "if","will","up","other","about","out","many","then","them","these","so","some","her",
                        "would","make","like","him","into","time","has","look","two","more","write","go","see",
                        "number","no","way","could","people","my","than","first","water","been","call","who","oil",
                        "its","now","find","long","down","day","did","get","come","made","may","part", "pizza","select",
                        "fired", "cracker", "allocate", "phone", "present", "develop", "write", "around", "creep");

let number = 0;
let sentence = "";

//Paragraph generator
for(let i = 0; i < 30; ++i){
    number = Math.floor(Math.random() * words.length);
    if (i == 0){
        sentence = words[number];
    }
    number = Math.floor(Math.random() * words.length);
    sentence = sentence + " " + words[number];
}

spanGenerator();
displayClock();
keyDown();








function spanGenerator(){
    //Span Generator
    //let wordsSplit = sentence.split(" ");
    let type = sentence.split("");
    for(let i = 0; i < type.length; ++i){
        let span = document.createElement("span");
        let letter = "";
        span.id = i;
        for (let j in type[i]){
            letter = type[i];
        } 
        span.innerText = letter;
        typeDiv.appendChild(span);
    }
}


function displayClock(){
    //Initial Display of Clock
    var futureDate = new Date().getTime() + 10000;
    var now = new Date().getTime();
    var timeLeft = Math.floor((futureDate - now)/1000);
    document.getElementById("sec").innerHTML = timeLeft;    
}


function keyDown(){
    let i = 0;
    let j = 0;
    var typeChar = document.getElementById(i);
    typeChar.classList.add("cursor");
    let type = sentence.split("");

    document.addEventListener('keydown', ({key}) => {
        console.log(key);
        typeChar = document.getElementById(i);
        typeChar.classList.add("cursor");
        
        if(key == typeChar.innerText){
            typeChar.classList.remove("cursor"); 
            typeChar.classList.add("correct");
            ++i;
            if(i == type.length){
                done();
            }
            typeChar = document.getElementById(i);
            typeChar.classList.add("cursor");   
        }
        else if (key == 'Backspace'){
            if(i != 0){
                typeChar.classList.remove("cursor"); 
                --i;
                typeChar = document.getElementById(i);
                typeChar.classList.remove("correct", "wrong"); 
                typeChar.classList.add("cursor");
            }
        }
        else if (key != typeChar.innerText){
            typeChar.classList.remove("cursor"); 
            typeChar.classList.add("wrong");
            ++i;
            if(i == type.length){
                done();
            }
            typeChar = document.getElementById(i);
            typeChar.classList.add("cursor");   
        }

        startTimer10(j);
        ++j;
    });
}


function startTimer10(j){
    //start timer
    let type = sentence.split("");
    if(j == 0){
        var futureDate = new Date().getTime() + 10000;
        let k = 0;
        var myfunc = setInterval(function() {
            var now = new Date().getTime();
            var timeLeft = Math.floor((futureDate - now)/1000);
            if (timeLeft >= 0){
                document.getElementById("sec").innerHTML = timeLeft;
            }
            if ((timeLeft == 0 && k == 0)){
                done();
                ++k;
            }
        })
    }
}


function done(){
    var txt = document.getElementById('typing');
        txt.style.display = 'none';
        document.getElementById("sec").style.display = 'none';
    document.getElementById('results').innerHTML = "Words Per Minute : " + calculate10();
    restartButton();
}

function calculate10(){
    let count = 0;
    let type = sentence.split("");
    for(let i = 0; i < type.length; ++i){
        if(document.getElementById(i).classList.contains('correct')){
            ++count;
        }
    }
    let cpm = count * 6;
    let wpm = Math.floor(cpm / 4.7);
    return wpm;
}

function restartButton(){
    resBut.style.display = 'block';
}





