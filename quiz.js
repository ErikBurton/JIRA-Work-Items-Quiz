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
    },
    // Add other questions similarly
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let userName = '';
  let highestScore = 0;
  let userScores = [];
  
  const questionElement = document.getElementById('question');
  const optionsElement = document.getElementById('options');
  const resultElement = document.getElementById('result');
  const scoreElement = document.getElementById('score');
  const nextButton = document.getElementById('nextButton');
  const userNameInput = document.getElementById('userNameInput');
  const startButton = document.getElementById('startButton');
  const highestScoreElement = document.getElementById('highestScore');
  const topScoresElement = document.getElementById('topScores');
  
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
    optionButtons.forEach(button => {
      button.disabled = true; // disable all options after an answer is chosen
      if (button.textContent === currentQuestion.answer) {
        button.classList.add('correct-answer'); // add class to correct answer
      } else if (button.textContent === selectedOption) {
        button.classList.add('wrong-answer'); // add class to wrong answer
      }
    });
    
    if (selectedOption === currentQuestion.answer) {
      score += 10;
      resultElement.textContent = "Correct!";
    } else {
      resultElement.textContent = "Wrong! The correct answer is: " + currentQuestion.answer;
    }
    scoreElement.textContent = "Score: " + score;
    nextButton.style.display = 'block';
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
      resultElement.textContent = '';
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
    showTopScores();
    questionElement.textContent = "Quiz Completed!";
    optionsElement.innerHTML = '';
    resultElement.textContent = '';
    scoreElement.textContent = "Final Score: " + score;
  }
  
  function showTopScores() {
    topScoresElement.innerHTML = '<h3>Top 10 Scores:</h3>';
    userScores.forEach((user, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${index + 1}. ${user.name}: ${user.score}`;
      topScoresElement.appendChild(listItem);
    });
  }
  
  function startQuiz() {
    userName = userNameInput.value.trim();
    if (userName === '') {
      alert('Please enter your name to start the quiz.');
      return;
    }
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
    scoreElement.textContent = "Score: " + score;
  }
  
  function resetQuiz() {
    userNameInput.value = '';
    userName = '';
    score = 0;
    currentQuestionIndex = 0;
    loadQuestion();
    resultElement.textContent = '';
    scoreElement.textContent = "Score: " + score;
  }
  
  // Load userScores from localStorage if available
  const storedScores = localStorage.getItem('userScores');
  if (storedScores) {
    userScores = JSON.parse(storedScores);
    showTopScores();
  }
  
  startButton.addEventListener('click', startQuiz);
  nextButton.addEventListener('click', nextQuestion);
