import { Question } from './question.js';
import { isValid, createModal } from './utils.js';
import { getAuthForm, authWithEmailAndPassword } from './auth.js';
import './style.css';


const form = document.getElementById('form');
const input = document.getElementById('input__question');
const button = document.getElementById('submit__btn');
const modalBtn = document.getElementById('modal__btn');
////////////////////////////////////////////
modalBtn.addEventListener('click', openModal)
window.addEventListener('load', Question.renderList)
form.addEventListener('submit', submitFormHandler);
input.addEventListener('input', () => {
  button.disabled = !isValid(input.value);
});
/////////////////////////////////////////
function submitFormHandler(event) {
  event.preventDefault();
  
  if(isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON()
    }

    // async request to server question and clear all 
    Question.create(question).then(() => {
      input.value = '';
      input.className = '';
      button.disabled = true;
    })
  }
}
//////////////////////////////////////////
function openModal() {
  createModal('Авторизация', getAuthForm())
  document.getElementById('auth__form').addEventListener('submit', authFormHAndler);
}
///////////////////////////////////////
function authFormHAndler(event) {
  event.preventDefault();

  const email = document.getElementById('input__email').value;
  const password = document.getElementById('input__password').value;
  authWithEmailAndPassword(email, password)
  .then(Question.fetchData)
  .then(renderModalAfterAuth)
}
////////////////////////////////////////////
function renderModalAfterAuth(content) {
  if(typeof content === 'string') {
    createModal('Ошибка', content);
  } else {
    createModal('Список вопросов', Question.allQuestionToHtml(content));
  } 
}