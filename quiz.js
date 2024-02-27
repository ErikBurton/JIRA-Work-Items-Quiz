const questions = [
    {
      question: "What is the primary purpose of linking a bug to a parent Epic in Jira?",
      options: ["To assign responsibility to the Product Owners", "To ensure proper tracking and classification", "To prioritize the bug for immediate fixing", "To create visibility for developers' work"],
      answer: "To ensure proper tracking and classification"
    },
    {
      question: "Which classification codes can be assigned to an Epic?",
      options: ["BAU, DQM, or BPP", "QA, DRM, or BPP", "BAU, DRM, or BPP", "QA, DQM, or BPP"],
      answer: "BAU, DRM, or BPP"
    },
    {
      question: "In Jira, how should the component field of a Story be filled out?",
      options: ["It should match the Assignee's team", "It should match the Epic's classification", "It should be left blank", "It should match the Product Owner's team"],
      answer: "It should match the Assignee's team"
    }
    // Add other questions similarly
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  const questionElement = document.getElementById('question');
  const optionsElement = document.getElementById('options');
  const resultElement = document.getElementById('result');
  const scoreElement = document.getElementById('score');
  const nextButton = document.getElementById('nextButton');
  const userNameInput = document.getElementById('userNameInput');
  const startButton = document.getElementById('startButton');
  
  function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = '';
    currentQuestion.options.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option;
      button.classList.add('option');
      button.addEventListener('click', () => checkAnswer(option));
      optionsElement.appendChild(button);
    });
  }
  
  function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    const optionButtons = document.querySelectorAll('.option');
    
    // Disable all options
    optionButtons.forEach(button => {
      button.disabled = true;
    });
  
    if (selectedOption === currentQuestion.answer) {
      score += 10;
      // Show correct answer in green box
      resultElement.innerHTML = `<div class="correct-answer">Correct! ${currentQuestion.answer}</div>`;
    } else {
      // Show selected answer in red box
      optionButtons.forEach(button => {
        if (button.textContent === selectedOption) {
          button.classList.add('wrong-answer');
        }
      });
      resultElement.innerHTML = `<div class="wrong-answer">Wrong!</div>`;
    }
    
    scoreElement.textContent = "Score: " + score;
    nextButton.style.display = 'block';
  }
  
  
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
      resultElement.textContent = '';
      // Reset option styles
      document.querySelectorAll('.option').forEach(button => {
        button.classList.remove('correct-answer', 'wrong-answer');
        button.disabled = false;
      });
      nextButton.style.display = 'none';
    } else {
      endQuiz();
    }
  }

  function endQuiz() {
    if (score > highestScore) {
      highestScore = score;
      highestScoreElement.textContent = "Highest Score: " + highestScore;
    }
    userScores.push({ name: userName, score });
    userScores.sort((a, b) => b.score - a.score);
    if (userScores.length > 10) {
      userScores.pop();
    }
    localStorage.setItem('userScores', JSON.stringify(userScores));
    showTopScores(); // Display top 10 highest scores
    questionElement.textContent = "Quiz Completed!";
    optionsElement.innerHTML = '';
    resultElement.textContent = '';
    scoreElement.textContent = "Final Score: " + score;
    nextButton.style.display = 'none'; // Hide the next button
  }
  
//   function endQuiz() {
//     questionElement.textContent = "Quiz Completed!";
//     optionsElement.innerHTML = '';
//     resultElement.textContent = '';
//     scoreElement.textContent = "Final Score: " + score;
//     // Additional actions at the end of the quiz (if any)
//   }
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
    scoreElement.textContent = "Score: " + score;
  }
  
  startButton.addEventListener('click', startQuiz);
  nextButton.addEventListener('click', nextQuestion);
  