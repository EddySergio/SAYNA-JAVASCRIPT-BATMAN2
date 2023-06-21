const startQuizButton = document.getElementById('start-quiz-btn');
const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question-text');
const choicesContainer = document.getElementById('choices-container');
const nextQuestionButton = document.getElementById('next-question-btn');
const submitQuizButton = document.getElementById('submit-quiz-btn');
const resultContainer = document.getElementById('result-container');
const scoreText = document.getElementById('score-text');

let currentQuestionIndex = 0;
let score = 0;

const quizData = [
    {
        "question": "Quel est l’autre nom de l’Homme-Mystère ?",
        "response": [
          {
            "text": "Le Saphinx",
            "isGood": true
          },
          {
            "text": "Le Saphir",
            "isGood": true
          },
          {
            "text": "Le Joker",
            "isGood": true
          }
        ]
      },
      {
        "question": "Quelle est l’ancienne profession de Harley Quinn ?",
        "response": [
          {
            "text": "Infimière",
            "isGood": false
          },
          {
            "text": "Psychiatre",
            "isGood": true
          },
          {
            "text": "Dentiste",
            "isGood": false
          }
        ]
      },
      {
        "question": "Quel est l’objet fétiche de Double Face ?",
        "response": [
          {
            "text": "Une pièce",
            "isGood": true
          },
          {
            "text": "Un livre",
            "isGood": false
          },
          {
            "text": "Un couteau",
            "isGood": false
          }
        ]
      },
      {
        "question": "Quelle ville Batman défend-il ?",
        "response": [
          {
            "text": "Gotham City",
            "isGood": true
          },
          {
            "text": "Starling City",
            "isGood": false
          },
          {
            "text": "Tananarive",
            "isGood": false
          }
        ]
      },
      {
        "question": "Tim Burtin a réalisé deux Batman, qui jouait Batman ?",
        "response": [
          {
            "text": "Georges Clooney",
            "isGood": false
          },
          {
            "text": "Val Kilmer",
            "isGood": false
          },
          {
            "text": "Mickael Keaton",
            "isGood": false
          }
        ]
      },
      {
        "question": "Quel est le prénom des parents du jeune Bruce Wayne ?",
        "response": [
          {
            "text": "Matina et Adam",
            "isGood": false
          },
          {
            "text": "Elaine et Georges",
            "isGood": true
          },
          {
            "text": "Martha et James",
            "isGood": false
          }
        ]
      },
      {
        "question": "Dans son premier Batman (1989) Jack Nicholson jouait :",
        "response": [
          {
            "text": "Le Pingouin",
            "isGood": false
          },
          {
            "text": "L'Homme mystère",
            "isGood": true
          },
          {
            "text": "Le Geek",
            "isGood": false
          }
        ]
      },
      {
        "question": " Qui interprète le Joker en 2008 ?",
        "response": [
          {
            "text": "Heath Legder",
            "isGood": false
          },
          {
            "text": "Haeth Ledger",
            "isGood": false
          },
          {
            "text": "Heath Ledger",
            "isGood": true
          }
        ]
      },
      {
        "question": "En quelle année Robin fait il sa première apparition ?",
        "response": [
          {
            "text": "1940",
            "isGood": true
          },
          {
            "text": "1936",
            "isGood": false
          },
          {
            "text": "1941",
            "isGood": false
          }
        ]
      },
      {
        "question": "Qui est la fille de Batman et Catwoman (Earth - 2) ?",
        "response": [
          {
            "text": "Oracle Huntress",
            "isGood": true
          },
          {
            "text": "Black Canary",
            "isGood": false
          },
          {
            "text": "L'Epouvantail",
            "isGood": false
          }
        ]
      },
      {
        "question": "Batman c’est aussi le nom d’une ville en...",
        "response": [
          {
            "text": "Islande",
            "isGood": false
          },
          {
            "text": "Turquie",
            "isGood": true
          },
          {
            "text": "Allemagne",
            "isGood": false
          }
        ]
      },
      {
        "question": "Qui a realisé Batman en 1966 ?",
        "response": [
          {
            "text": "Stanley Kubrick",
            "isGood": false
          },
          {
            "text": "Andy Warhol",
            "isGood": false
          },
          {
            "text": "Leslie Martinson",
            "isGood": true
          }
        ]
      },
];

startQuizButton.addEventListener('click', startQuiz);
nextQuestionButton.addEventListener('click', showNextQuestion);
submitQuizButton.addEventListener('click', submitQuiz);

function startQuiz() {
    quizContainer.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    loadQuestion(currentQuestionIndex);
}

function loadQuestion(questionIndex) {
    const questionData = quizData[questionIndex];
    questionText.textContent = questionData.question;
    choicesContainer.innerHTML = '';

    questionData.response.forEach((response) => {
        const choice = document.createElement('div');
        choice.classList.add('choice');
        choice.innerHTML = `
            <input type="checkbox" id="choice-${questionIndex}-${response.text}">
            <label for="choice-${questionIndex}-${response.text}">${response.text}</label>
        `;
        choicesContainer.appendChild(choice);
    });

    nextQuestionButton.classList.add('hidden');
    submitQuizButton.classList.add('hidden');

    if (currentQuestionIndex === quizData.length - 1) {
        submitQuizButton.classList.remove('hidden');
    } else {
        nextQuestionButton.classList.remove('hidden');
    }
}

function showNextQuestion() {
    const checkedChoices = Array.from(choicesContainer.querySelectorAll('input[type="checkbox"]:checked'));
    checkedChoices.forEach((choice) => {
        const response = choice.id.split('-')[2];
        const questionData = quizData[currentQuestionIndex];
        if (questionData.response.some((r) => r.text === response && r.isGood)) {
            score++;
        }
    });

    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion(currentQuestionIndex);
    } else {
        questionContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        scoreText.textContent = `Score : ${score}/${quizData.length}`;
    }
}

function submitQuiz() {
    showNextQuestion();
}
