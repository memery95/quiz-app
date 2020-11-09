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


  //Function to render first page to start the quiz
    function renderFirstPage () {
        //store the first page within a variable to return for when function is called
       let firstPage = 
        `<div class="content">
        <h2>Are you ready?</h2>
        <p>Press the button to start the quiz</p>
        <button id="start">Begin</button> 
        </div>`;
        
        return firstPage;
    }

    //Function to handle the even listener for the quiz
    function startQuiz () {
        //even listener function for the start button to be pressed 
        $('main').on('click', '#start', function () {
            store.quizStarted = true;
            render();
        });
    }

    //function to handle each question page and its html elements
    function questionPage () {
        //if statement to see if the store has reached its final question 
        if (store.questionNumber === store.questions.length) {
            return renderFinalPage();
        }
        //create variables for questionNumber and the html variables
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
        //return the variable that has html elements
        return questionPage;
    }
  
    //function to check if the submitted is correct
    function answerSubmit () {
        //even listener function for the submit button
        $('main').on('submit', 'form', function (event) {
            event.preventDefault();
            //store the submitted answer into a variable
            let answer = $(`input[name='answer']:checked`).val();
            //store correctAnswer into a variable
            let currentCorrectAnswer = store.questions[store.questionNumber].correctAnswer;
            //if statement to check if the answer equals the correct answer
            if (answer === currentCorrectAnswer) {
                //increase the score if correct
                store.score++;
                $('main').html(renderCorrectAnswerPage());
            } else {
                $('main').html(renderIncorrectAnswerPage());
            }
            //increase the questionNumber 
            store.questionNumber++;
        });
        render();
    }

    //render the correct answer page function
    function renderCorrectAnswerPage () {
        //store html elements into variables
        let correctAnswerPage = `<div class="content">
        <h2>Correct!</h2>
        <p>Your score: ${store.score}/5</p>
        <form>
        <button id="next-question">Next Question</button>
        </form>
        </div>`;
        return correctAnswerPage;
    }

    //render the incorrect answer page function
    function renderIncorrectAnswerPage () {
        //store the incorrect page html element in variables
        let incorrectAnswerPage = `<div class="content">
        <h2>Wrong Answer</h2>
        <p>The correct answer was ${store.questions[store.questionNumber].correctAnswer}.</p>
        <p>Your score: ${store.score}/5</p>
        <form> 
        <button id="next-question">Next Question</button> 
        </form> 
        </div>`;
        return incorrectAnswerPage;
    }

    //function for event listener for the next question
    function nextQuestion () {
        //even listener for next question submit form
        $('main').on('click', '#next-question', function (event) {
            event.preventDefault();
            $('main').html(store.questions[store.questionNumber]);
            render();
        });
    }

    //function to render final page 
    function renderFinalPage () {
        //variable to store html elements
        let finalPage = `<div class="content">
        <h2>Finished!</h2>
        <p>Your final score is ${store.score}/5. Press the Button below to restart the quiz!</p>
        <button id="restart">Restart</button> 
        </div>`;
        return finalPage;
    }

    //function to handle restart 
    function finalPageRestart () {
        $('main').on('click', '#restart', function () {
            store.quizStarted = false;
            store.questionNumber = 0;
            store.score = 0;
            render();
        });
    }

    //render function check if the quiz start 
    function render () {
        //if false render first page
        if (store.quizStarted === false) {
            $('main').html(renderFirstPage());
        } else if (store.quizStarted) {
            //if true render question page
            $('main').html(questionPage());
        }
    }

    //main function
    function main () {
        render();
        startQuiz();
        answerSubmit();
        nextQuestion();
        finalPageRestart();
    }

    $(main);