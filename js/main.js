(function(){
      // click on the start button
        const startButton = document.getElementById('button');
        const stats = document.getElementById('stats');
        const input = document.getElementById('input');
        const textDisplay = document.getElementById('text-display');
        const timeDisplay = document.getElementById('time-display');
        const scoreDisplay = document.getElementById('score-display');
        const wpm = document.getElementById('wpm-display');
        const form = document.getElementById('form');
        const mainContent = document.getElementById('main-content');
        const highScoreBtn = document.getElementById('heighscore');
        const mainHeading = document.getElementById('main-heading');
        const state = {
            currentWord: '',
            score: 0,
            timeElapsed: 0,
            gameLength: 30, // 30 seconds
        }
        form.addEventListener('submit', function(event){
            event.preventDefault();
            // is user input correct
            const userInput = input.value;
            if(userInput === '') {
                return;
            } else {
                const isCorrect = userInput === state.currentWord;
                let span;
                if(isCorrect) {
                    createWordSpan()
                    // if correct add word to the list and add a green background
                    span = createWordSpan('limegreen', userInput);
                    // add 1 to score
                    state.score += 1;
                } else {
                    // if wrong add a red background
                    span = createWordSpan('red', userInput)
                }
                // clear input
                input.value = '';
                // append span
                mainContent.appendChild(span);
                // call getNextWord()
                getNextWord();
            }
        });

        function createWordSpan(color, content) {
            const span = document.createElement('span');
            span.style.setProperty('background-color', color);
            span.style.setProperty('padding', '15px');
            span.style.setProperty('display', 'inline-block');
            span.textContent = content;
            return span;
        }

        // show the word
        let array = alice.split(" ");
        // console.log(array[3]);
        function getRandomWord() {
            return array[Math.floor(Math.random() * array.length)];
        }
        // console.log(getRandomWord());
        function getNextWord() {
            const word = getRandomWord();
            textDisplay.textContent = word;
            state.currentWord = word;
        }
        startButton.addEventListener('click', function(event) {
            event.preventDefault();
            console.log('clicked');
            // hide the button
            startButton.className = 'hide';
            // show the word
            textDisplay.className = '';
            // show the stats
            stats.className = ''
            // hide highscore button
            highScoreBtn.className = 'hide';
            // hide main heading when game starts
            mainHeading.className = 'hide';
            // show the input field
            input.className = '';
            // focus input
            input.focus();
            // start clock
            startClock();
            // show the next word
            getNextWord();
        });

      // clear the user input
        input.value = '';
      // for every sec calc stats and check if games has ended
    function startClock() {
        console.log('running');
        setInterval(function (){
            state.timeElapsed += 1;
            renderStats();
            // check if game is over
            if(state.timeElapsed ===  state.gameLength) {
                alert (`Game is over...WPM is, ${wpm.textContent}`);
                // add to high score list
                const scores = JSON.parse(localStorage.getItem('highscores')) || [];
                scores.push(wpm.textContent);
                scores.sort();
                if(scores.length > 10) {
                    scores.shift();
                }
                // store new high score
                localStorage.setItem('highscores', JSON.stringify(scores));
                // refresh the page
                window.location.reload();
            }
        }, 1000);
    }
    // render stats
        function renderStats() {
            //time remaining
            timeDisplay.textContent = state.gameLength - state.timeElapsed;
            // score
            scoreDisplay.textContent = state.score;
            // wpm
            wpm.innerHTML = Math.floor(state.score / (state.timeElapsed / 60));
        }
    // when game is over show WPM
})();
