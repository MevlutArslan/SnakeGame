

//Database things ------>
function Player(name,score){
    this.name = name;
    this.score = score;
}


//Get information from the DateBase

database.collection("HighScores").get().then((snapshot) =>{
    snapshot.docs.forEach(doc =>{
        let player = new Player(doc.data().name,doc.data().points)
        renderTable(player);
    })
})
let scores = [];
const scoreList = document.getElementById("scoreList");

function renderTable(player){
    scores.push(player);
    scoreList.innerHTML = "";
    scores.sort(sortScores);
    for(let i = 0; i < scores.length; i ++){
        let name = scores[i].name;
        let scor = scores[i].score;

        


        let li = document.createElement("li");
        let nameDisplay = document.createElement("span");
        let scoreDisplay = document.createElement("span");

        nameDisplay.textContent = name;
        scoreDisplay.textContent = scor;

        li.appendChild(nameDisplay);
        li.appendChild(scoreDisplay);

        scoreList.appendChild(li);

    }
}
console.log(scores);

function sortScores(a,b){
    return b.score - a.score;
}
