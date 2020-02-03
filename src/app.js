import   { Question }    from './question.js';
import  { isValid } from './utils.js';
import './style.css';

const form = document.getElementById('form');
const input = document.getElementById('input__question');
const button = document.getElementById('submit__btn');

form.addEventListener('submit', submitFormHandler);
input.addEventListener('input', () => {
  button.disabled = !isValid(input.value);
});

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
