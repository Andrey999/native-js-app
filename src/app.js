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
    console.log('question: ', question);
    input.value = '';
    input.className = '';
    // async request to server question
  }
}
