const Latters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "A", "B", "C", "D", "E", "F", "G", "H", "I"];
var RandomLatterArray = [];
var counter = 0;
var click = 0;
var firstClickedElement = null;
var secondClickedElement = null;
var matchesFound = 0;

function RandomLatter() {
    //randon latter arrary.
    while (Latters.length) {
        const randomIndex = Math.floor(Math.random() * Latters.length);
        const letter = Latters.splice(randomIndex, 1)[0];
        RandomLatterArray.push(letter);
    }
}

function create() {
    if (counter <16) {
        //create rectangle.
        for (var i = 0; i <3; i++) {
            var NewRect = document.createElement("section");
            var FatherOfNew = document.getElementById("memory-game");
            FatherOfNew.appendChild(NewRect);
            NewRect.style.width = 80 + (counter * 20) + "px";
            NewRect.style.height = 80 + (counter * 20) + "px";
            let latter = document.createElement("h1")
            latter.innerHTML = RandomLatterArray[counter];
            latter.style.visibility = "hidden";
            counter++;
            NewRect.appendChild(latter);
            NewRect.setAttribute('data-letter', RandomLatterArray[counter - 1]);
            NewRect.addEventListener('click', handleClick);
            NewRect.className = "BackRect";
        }
    }
}

function createRectangles() {
    RandomLatter();
    //first function.
    var newobj = document.getElementById("button");
    newobj.onclick = function () {
        create();
    }
}

function handleClick() {
    if (click === 2 || this === firstClickedElement) {
        // if two elements have already been clicked or the same element has been clicked twice.
        return;
    }
    click++;
    let h1 = this.querySelector("h1");
    h1.style.visibility = "visible";
    if (firstClickedElement === null) {
        firstClickedElement = this;
    } else {
        secondClickedElement = this;
        if (firstClickedElement.getAttribute("data-letter") === secondClickedElement.getAttribute("data-letter")) {
            // if two elements have the same letter.
            firstClickedElement.style.backgroundColor = "#ffffff";
            secondClickedElement.style.backgroundColor = "#ffffff";
            firstClickedElement.removeEventListener("click", handleClick);
            secondClickedElement.removeEventListener("click", handleClick);
            firstClickedElement = null;
            secondClickedElement = null;
            click = 0;
            matchesFound++;
            if (matchesFound === 9) {
                alert("Congratulations! You found all matches!");
            }
        } else {
            // if two elements have different letters.
            setTimeout(() => {
                let h1First = firstClickedElement.querySelector("h1");
                let h1Second = secondClickedElement.querySelector("h1");
                h1First.style.visibility = "hidden";
                h1Second.style.visibility = "hidden";
                firstClickedElement = null;
                secondClickedElement = null;
                click = 0;
            }, 1000);
        }
    }
}

createRectangles();