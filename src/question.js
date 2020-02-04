export class Question {
///////////////////////////
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
      .then(Question.renderList)
  }
//////////////////////////
  static renderList() {
    const questions = getItemFromStorage();
    const html = questions.length > 0 ? 
    questions.map(toCard).join('')
    : `<div class="mui--text-headline">Вопросов нет</div>`;

    const list = document.getElementById('list');
    list.innerHTML = html;
  }
///////////////////////////
  static fetchData(token) { 
    if(!token){
      return Promise.resolve('<p class="error>В доступе отказано</p>')
    }
   return fetch(`https://question-me-ec248.firebaseio.com/questions.json?auth=${token}`)
    .then(response => response.json())
    .then(response => {
      if(response && response.error) {
        return `<p class="error>${response.error}</p>`
      }
 
      return response ? Object.keys(response).map(item => ({
        ...response[item],
        id: item
      })) : []
    })
  }
///////////////////////////
  static allQuestionToHtml(question) {
    return question.length > 0 ? question.map(question => {
      return `
      <div>${question.text}</div>
      `;
    }) 
    : `<p>Вопросов нет</p>`;
  }
}
////////////////////////////////////////////////////////////////////////
function addToLocaleStorage(question) {
  const store = getItemFromStorage();
  store.push(question);
  localStorage.setItem('question', JSON.stringify(store));
}
//////////////////////////////////////////////////////////////////////////
function getItemFromStorage() {
  return JSON.parse(localStorage.getItem('question') || '[]');
}
//////////////////////////////////////////////////////////////////////
function toCard(question) {
  return `
        <div class="mui--text-black-54">${new Date(question.date).toLocaleDateString()} ${new Date(question.date).toLocaleTimeString()}</div>
        <div>${question.text}</div>
        <br>`;
}