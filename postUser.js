const nameInput = document.querySelector('#newName');
const userNameInput = document.querySelector('#newUserName');
const emailInput = document.querySelector('#newEmail');
const websiteInput = document.querySelector('#newWebsite');
const formInput = document.querySelector('#addNewUser');
const formBtn = document.querySelector('#modal-btn');
const form = document.querySelector('#form');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  let data = {
    name: nameInput.value,
    username: userNameInput.value,
    email: emailInput.value,
    website: websiteInput.value,
  };
  fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(response => response.json())
    .then(user => {
      usersContainer.insertAdjacentHTML('beforeend', userMarkup(user));
    });
});
