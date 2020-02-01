import './style.css';

const form = document.getElementById('form');
const input = document.getElementById('input__question');
const button = document.getElementById('submit__btn');

form.addEventListener('submit', submitFormHandler);

function submitFormHandler(event) {
  event.preventDaefault();
}
