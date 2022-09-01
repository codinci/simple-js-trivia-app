// console.log('I can see the index.js');
// const category = [
//   {
//     name: 'Science: Computers',
//     id: 18
//   },
//   {
//     name: 'General Knowledge',
//     id: 9
//   },
//   {
//     name: 'Entertainment: Video Games',
//     id: 15
//   }
// ]
const question = document.getElementById('quiz_question');
const score = document.getElementById('correct-score');
const noOfQuestions = document.getElementById('total-questions');
const verifyAnswer = document.getElementById('check-answer');
const replay = document.getElementById('play-again');
const quizOptions = document.querySelector('.quiz-options');
const result = document.getElementById('result');
const gameButtons = document.querySelectorAll('#category-container button');

let correctAnswer = "";
let correctScore = askedCount = 0;
let totalQuestions = 10;

function eventListeners() {
  Array.from(gameButtons).forEach(gameButton => {
    gameButton.addEventListener('click', () => {
      let categoryId = parseInt(gameButton.getAttribute('data-id'))
      fetchQuestions(categoryId);
    });
  }
  )
  verifyAnswer.addEventListener('click', checkAnswer);
  replay.addEventListener('click', restartGame);
}

function fetchQuestions(id) {
  return fetch(`https://opentdb.com/api.php?amount=10&category=${id}&difficulty=medium&type=multiple`)
  .then(resp => resp.json())
  .then(result => showQuestions(result.results[0]))
}

document.addEventListener('DOMContentLoaded', () => {
  eventListeners();
  fetchQuestions();
  score.textContent = correctScore;
  noOfQuestions.textContent = `/${totalQuestions}`;
})

function showQuestions(data) {
  correctAnswer = data.correct_answer;
  let incorrectAnswer = data.incorrect_answers;
  let optionsList = incorrectAnswer;
  optionsList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);

  question.textContent = `${data.question}`;
  quizOptions.innerHTML = `
        ${optionsList.map((option, index) => `
            <li> ${index + 1}. <span>${option}</span> </li>
        `).join('')}
    `;
    selectOption();
}

function selectOption() {
  quizOptions.querySelectorAll('li').forEach(
    option => option.addEventListener('click', () => {
      // console.log('Option clicked');
      if (quizOptions.querySelector('.selected')) {
        const activeOption = quizOptions.querySelector('.selected');
        activeOption.classList.remove('selected');
      }
      option.classList.add('selected');
    })
  )
}

function checkAnswer() {
  console.log('Checking Answer...');
}

function restartGame() {
  console.log('Restarting game...');
}

// var counter = document.getElementById('counter').getContext('2d');
// var no = 10;
// var pointToFill = 4.72;
// var cw = counter.canvas.width;
// var ch = counter.canvas.height;
// var diff;

// function fillCounter() {
//     diff = ((no / 10) * Math.PI * 2 * 10);
//     counter.clearRect(0, 0, cw, ch);
//     counter.lineWidth = 15;
//     counter.fillStyle = '#000';
//     counter.strokeStyle = '#F5E0A9';
//     counter.textAlign = 'center';
//     counter.font = "25px monospace";
//     counter.fillText(no + 'sec', 100, 110);
//     counter.beginPath();
//     counter.arc(100, 100, 90, pointToFill, diff / 10 + pointToFill);
//     counter.stroke();

//     if (no == 0) {
//         clearTimeout(fill);
//         counter.fillStyle = '#FFF';
//         counter.fillRect(0, 0, cw, ch);
//         counter.fillStyle = '#000';
//         counter.fillText('Times up', 100, 110);
        
//     }
//     no--;
// }

// var fill = setInterval(fillCounter, 1000);