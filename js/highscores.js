(function(){
    // get ul
    const highScores = document.querySelector('ul');
    // get highscore from localstorage if they exist
    let scores = JSON.parse(localStorage.getItem('highscores')) || [];
    // sort scores in reverse
    scores = scores.sort().reverse();
    // helper function
    function createListItem(content) {
        const li = document.createElement('li');
        li.textContent = content;
        return li;
    }
    // for each highscore
    for (let i = 0; i < scores.length; i++) {
        const score = scores[i];
        // create a list item
        const li = createListItem(String(i +1) + ') ' + score);
        // append them to ul
        highScores.appendChild(li);
    }
})();
