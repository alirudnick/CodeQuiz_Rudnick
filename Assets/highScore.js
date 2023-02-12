var userScore = localStorage.getItem("highScore");
var parseUserScore = JSON.parse(userScore);

for(var i = 0; i < parseUserScore.length; i++){

    document.getElementById('storedScore').innerHTML +=
    `<br>Initials: ${parseUserScore[i].initials}
     <br>Scores: ${parseUserScore[i].score}
    `
}

var clearEl = document.querySelector('.high-clear-btn');
var backEl = document.querySelector('.high-back-btn');

clearEl.addEventListener('click', () => {
    localStorage.clear();
    storedScore.textContent = '';
});

backEl.addEventListener('click', () => {
    window.history.go(-1);
});