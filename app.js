/**
 * Example store structure
 */
const store = {
    // 5 or more questions are required
    questions: [
      {
        question: 'What is the capital of California?',
        answers: [
          'Los Angeles',
          'Sacramento',
          'San Francisco',
          'San Diego'
        ],
        correctAnswer: 'Sacramento'
      },
      {
        question: 'What is the capital of Texas?',
        answers: [
          'Austin',
          'Houston',
          'Dallas',
          'San Antonio'
        ],
        correctAnswer: 'Austin'
      },
      {
        question: 'What is the capital of New York?',
        answers: [
          'New York',
          'Buffalo',
          'Rochester',
          'Albany'
        ],
        correctAnswer: 'Albany'
      },
      {
        question: 'What is the capital of Florida?',
        answers: [
          'Orlando',
          'Miami',
          'Tallahassee',
          'Jacksonville'
        ],
        correctAnswer: 'Tallahassee'
      },
      {
        question: 'What is the capital of Arizona?',
        answers: [
          'Tucson',
          'Phoenix',
          'Scottsdale',
          'Grand Canyon Village'
        ],
        correctAnswer: 'Phoenix'
      },
    ],
    quizStarted: false,
    questionNumber: 0,
    score: 0
  };
  
  /**
   * 
   * Technical requirements:
   * 
   * Your app should include a render() function, that regenerates the view each time the store is updated. 
   * See your course material and access support for more details.
   *
   * NO additional HTML elements should be added to the index.html file.
   *
   * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
   *
   * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
   * 
   */

   function renderFirstPage () {
       let firstPage = 
        `<div class="content">
        <h2>Here you GO!!</h2>
        <p>Are You Ready?</p>
        <button id="start">Get Started</button> 
        </div>`;
        
        return firstPage;
   }

   function handleStartQuiz () {
    $('main').on('click', '#start', function () {
        store.quizStarted = true;
        render();
    });
   }

   function questionPage () {
       if (store.questionNumber === store.questions.length) {
           return renderFinalPage();
       }
       let currentQuestion = store.questions[store.questionNumber];
       let questionPage = `
            <div class="content">
                <h2>Question ${store.questionNumber+1}: ${currentQuestion.question}</h2>
                <p>Your score: ${store.score}/5</p>
                <form>
                    <input type="radio" id="answer" name="answer" value="${currentQuestion.answers[0]}" required>
                    <label>${currentQuestion.answers[0]}</label><br>
                    <input type="radio" id="answer" name="answer" value="${currentQuestion.answers[1]}" required>
                    <label>${currentQuestion.answers[1]}</label><br>
                    <input type="radio" id="answer" name="answer" value="${currentQuestion.answers[2]}" required>
                    <label>${currentQuestion.answers[2]}</label><br>
                    <input type="radio" id="answer" name="answer" value="${currentQuestion.answers[3]}" required>
                    <label>${currentQuestion.answers[3]}</label><br>
                    <button id="submit">Submit</button>
                </form>
            </div>`;
       
        return questionPage;
   }
  

   function handleAnswerSubmit () {
       $('main').on('submit', 'form', function (event) {
           event.preventDefault();

           let answer = $(`input[name='answer']:checked`).val();
           let currentCorrectAnswer = store.questions[store.questionNumber].correctAnswer;

           if (answer === currentCorrectAnswer) {
               store.score++;
               $('main').html(renderCorrectAnswerPage());
           } else {
               $('main').html(renderIncorrectAnswerPage());
           }
           store.questionNumber++;
       });
       render();
   }

   function renderCorrectAnswerPage () {
       let correctAnswerPage = `<div class="content"><h2>Correct!!</h2> <p>Your score: ${store.score}/5</p><form> <button id="next-question">Next Question</button> </form> </div>`;
       return correctAnswerPage;
   }

   function renderIncorrectAnswerPage () {
    let incorrectAnswerPage = `<div class="content">
    <h2>Sorry Bud</h2> <p>The correct answer was ${store.questions[store.questionNumber].correctAnswer}. Better luck next time!</p> <p>Your score: ${store.score}/5</p><form> <button id="next-question">Next Question</button> </form> </div>`
    return incorrectAnswerPage;
   }

   function handleNextQuestion () {
       $('main').on('click', '#next-question', function (event) {
           event.preventDefault();
           $('main').html(store.questions[store.questionNumber]);
           render();
       });
   }


   function handleFinalPage () {
    let finalPage = `<div class="content">
    <h2>Fin</h2> <img src="images/end-quiz.gif" alt="Cars driving, split off at fork" /><p>Your final score is ${store.score}/5... hope you are proud of yourself</p>
     <button id="restart">Restart</button> </div>`
    return finalPage;
   }

   function handleFinalPage () {
       $('main').on('click', '#restart', function () {
           store.quizStarted = false;
           store.questionNumber = 0;
           store.score = 0;
           render();
       });
   }

   function render () {
       if (store.quizStarted === false) {
           $('main').html(renderFirstPage());
       } else if (store.quizStarted) {
           $('main').html(questionPage());
       }
   }

   function main () {
       render();
       handleStartQuiz();
       handleAnswerSubmit();
       handleNextQuestion();
       handleFinalPage();
   }

   $(main);
  /********** TEMPLATE GENERATION FUNCTIONS **********/
  
  // These functions return HTML templates
  
  /********** RENDER FUNCTION(S) **********/
  
  // This function conditionally replaces the contents of the <main> tag based on the state of the store
  
  /********** EVENT HANDLER FUNCTIONS **********/
  
  // These functions handle events (submit, click, etc)