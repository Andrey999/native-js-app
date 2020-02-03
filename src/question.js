export class Question {

  static create(question) {
    return fetch('https://question-me-ec248.firebaseio.com/questions.json', {
      method: 'POST',
      body: JSON.stringify(question),
      headers: {
        'Content-Type': 'application/json'
      } 
     }).then(response => response.json())
      .then(response => {
        question.id = response.name;
        return question;
      })
      .then(addToLocaleStorage)
  }
}

function addToLocaleStorage(question) {
  let store = getItemFromStorage();
  console.log(store);
  
  store.push(question);
  localStorage.setItem('question', JSON.stringify(store));
}

function getItemFromStorage() {
  return JSON.parse(localStorage.getItem('question') || '[]');
}