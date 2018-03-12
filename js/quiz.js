var questions = [
  ['How many states are in the United States?', 50],
  ['How many continents are there?', 7],
  ['How many legs does an insect have?', 6],
  ['How many pounds of grapes in a bottle of wine?', 2.6],
  ['What is missing in this link tag link href="css/styles.css" title="Main Styles"', 'rel="stylesheet"'],
  ['What is the hex value for the color white', '#FFFFFF'],
  ['How would you remove a child element from the DOM', 'node.removeChild(child);'],
  ['From the terminal, how do you create a react app', 'create-react-app'],
  ['How would you find the last value in an array that named array', 'array[array.length - 1]']
];
var correctAnswers = 0;
var question;
var answer;
var response;
var correct = [];
var wrong = [];
// Elements Selected
const button = document.querySelector('BUTTON');
const inputTag = document.querySelector('#user_input');
const labelTag = inputTag.previousElementSibling;


function print(message) {
  var outputDiv = document.getElementById('output');
  outputDiv.innerHTML = message;
}

handleQuiz = (currentQuestion) => {
  if (currentQuestion.length === 0) {
    handleEndQuiz();
  } else {
    labelTag.innerHTML = currentQuestion[currentQuestion.length - 1][0];
  }
}

handleEndQuiz = () => {
  labelTag.setAttribute('class', 'hidden');
  labelTag.previousElementSibling.innerHTML = 'Thanks for playing!';
  inputTag.setAttribute('class', 'hidden');
  button.innerHTML = 'View Results';
}

startQuiz = () => {
  button.innerHTML = 'Submit';
  inputTag.setAttribute('class', 'show');
};

handleHalfTimeBreak = (array) => {
  if (array.length === 2) {
    const h1 = labelTag.previousElementSibling;
    const div = h1.parentNode;
    h1.innerHTML = 'Half way break!';
    const pInfo = document.createElement('P');
    div.insertBefore(pInfo, labelTag);
    pInfo.innerHTML = 'You can now take a 10min break if you would like.';
    inputTag.setAttribute('disabled', true);
    inputTag.setAttribute('placeholder', 'Disabled...');
    labelTag.setAttribute('class', 'hidden');
    button.innerHTML = 'Keep Going';
  } else if (button.innerHTML === 'Keep Going') {
    const h1 = labelTag.previousElementSibling.previousElementSibling;
    const div = h1.parentNode;
    button.innerHTML = 'Submit';
    inputTag.setAttribute('placeholder', 'Answer..');
    const findP = labelTag.previousElementSibling;
    div.removeChild(findP);
    inputTag.removeAttribute('disabled', true);
    labelTag.setAttribute('class', 'show');
    h1.innerHTML = '';
  }
}

button.addEventListener('click', (e) => {
  let inputValue = inputTag.value;
  e.preventDefault();
  handleHalfTimeBreak(questions);
  if (inputValue.length > 0) {
    let qNnA = questions.pop();
    question = qNnA[0];
    answer = qNnA[1].toString().toUpperCase();
    response = inputValue.toUpperCase();
    console.log(answer, response);
    if (response === answer) {
      correctAnswers += 1;
      correct.push(question);
      handleQuiz(questions);
      inputTag.value = '';
    } else {
      wrong.push(question);
      handleQuiz(questions);
      inputTag.value = '';
    }
  } else if (e.target.textContent === 'View Results') {
    resultsDisplay();
  } else {
    handleQuiz(questions);
    startQuiz();
  }
});

function buildList(arr) {
  var listHTML = '<ol>';
  for (var i = 0; i < arr.length; i += 1) {
    listHTML += '<li>' + arr[i] + '</li>';
  }
  listHTML += '</ol>';
  return listHTML;
}

resultsDisplay = () => {
  html = "You got " + this.correctAnswers + " question(s) right."
  html += '<h2>You got these questions correct:</h2>';
  html += buildList(correct);
  html += '<h2>You got these questions wrong:</h2>';
  html += buildList(wrong);
  print(html);
}