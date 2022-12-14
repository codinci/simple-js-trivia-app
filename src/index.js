const question = document.getElementById('quiz_question');
const score = document.getElementById('correct-score');
const noOfQuestions = document.getElementById('total-questions');
const verifyAnswer = document.getElementById('check-answer');
const replay = document.getElementById('play-again');
const quizOptions = document.querySelector('.quiz-options');
const result = document.getElementById('result');
const gameButtons = document.querySelectorAll('#category-container button');
const next = document.getElementById('next');

let correctAnswer = "";
let correctScore = 0;
let totalQuestions = 10;


document.addEventListener('DOMContentLoaded', () => {
  Array.from(gameButtons).forEach(gameButton => {
    gameButton.addEventListener('click', () => {
      let categoryId = parseInt(gameButton.getAttribute('data-id'));
      correctScore = 0;
      score.textContent = correctScore;
      noOfQuestions.textContent = `/${totalQuestions}`;
      result.textContent = '';
      fetchQuestions(categoryId);
    });
  })
  verifyAnswer.addEventListener('click', checkAnswer);
})

/**
 *
 * @param {number} id
 * @param {number} counter
 * @returns response from the server
 */
function fetchQuestions(id) {

  verifyAnswer.style.display = 'block';
  next.style.display = 'block';
  replay.style.display = 'none';
  return fetch(`https://opentdb.com/api.php?amount=10&category=${id}&difficulty=medium&type=multiple`)
    .then(resp => resp.json())
    .then(req => retrievedQuestions(req.results))
    .catch(err => console.log(err))
}


function retrievedQuestions(data) {
  let i = 0;
  let question = data[i];
  displayQuestions(question);

  next.addEventListener('click', () => {
    if (!quizOptions.querySelector('.selected')) {
      next.disabled = true;
      result.innerHTML = `<p><i class="fas fa-question"></i>Please Select an Option!<p>`;
    } else {
      checkAnswer();
      if (i < data.length - 1) {
        displayQuestions(data[++i]);
      } else {
        console.log('The end...')
      }

    }
  })
}

/**
 * Returns the questions and choices for each question
 * based on its category
 * @param {object} data
 * @param {number} i
 */
function displayQuestions(data) {
  console.log(data);
  result.innerHTML = '';
  correctAnswer = data.correct_answer;
  let incorrectAnswer = data.incorrect_answers;
  let optionsList = incorrectAnswer;
  optionsList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);

  question.textContent = HTMLDecode(data.question);
  quizOptions.innerHTML = `
      ${optionsList.map((option, index) => `
          <li> ${index + 1}. <span>${option}</span> </li>
      `).join('')}
  `;
  selectOption();
}

/**
 *
 * @param {string} textString
 * @returns a valid text/html text
 */
function HTMLDecode(textString) {
  let doc = new DOMParser().parseFromString(textString, "text/html");
  return doc.documentElement.textContent;
}

/**
 * Returns a styled option
 */
function selectOption() {
  quizOptions.querySelectorAll('li').forEach(
    option => option.addEventListener('click', () => {
      if (quizOptions.querySelector('.selected')) {
        const activeOption = quizOptions.querySelector('.selected');
        activeOption.classList.remove('selected');
      }
      option.classList.add('selected');
      next.disabled = false;
    })
  )
}

/**
 * Queries the selected option and checks if its correct
 * Updates user score if the option is correct
 */
function checkAnswer() {
  // verifyAnswer.disabled = true;
  // console.log(correctAnswer);
  if (quizOptions.querySelector('.selected')) {

    let selectedAnswer = quizOptions.querySelector('.selected span').textContent;

    if (selectedAnswer == HTMLDecode(correctAnswer)) {
      correctScore++;
      // console.log(correctScore);
      score.textContent = correctScore
      result.innerHTML = `<p><i class="fas fa-check"></i>Correct!<p>`;
    } else {
      result.innerHTML = `<p><i class="fas fa-times"></i>Incorrect!<p><small><b>Correct Answer: </b>${correctAnswer}</small>`;
    }
  } else {
    result.innerHTML = `<p><i class="fas fa-question"></i>Please Select an Option!<p>`;
  }
}


function restartGame() {
  verifyAnswer.style.display = 'none';
  next.style.display = 'none';
  replay.style.display = 'block';
  result.innerHTML = `<h2>Game Ended</h2><p>Final score: ${correctScore}/ ${totalQuestions}</p>`
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