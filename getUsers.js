const usersContainer = document.querySelector('#userList');
const usersDetailsOverlay = document.querySelector('.details__overlay');
const usersDetails = document.querySelector('.details');
usersContainer.addEventListener('click', modalOpen);
function usersListMarkup(list) {
  return list
    .map(({ name, username, email, website, id }) => {
      return `<ul class="catalog__list" id=${id}>
                <li class=catalog__item>
                <p class="catalog__itemName">Name</p>
                <p class="catalog__value">${name}</p>
                </li>
                <li class=catalog__item>
                <p class="catalog__itemName">Username</p>
                <p class="catalog__value">${username}</p>
                </li>
                <li class=catalog__item>
                <p class="catalog__itemName">Email</p>
                <p class="catalog__value">${email}</p>
                </li>
                <li class=catalog__item>
                <p class="catalog__itemName">Website</p>
                <p class="catalog__value">${website}</p>
                </li>
                <button type="button" class="catalog__button" id="modal-btn">Details...</button>
                </ul>`;
    })
    .join('');
}
function userMarkup(user) {
  return `<ul class="catalog__list" id=${user.id}>
                <li class=catalog__item>
                <p class="catalog__itemName">Name</p>
                <p class="catalog__value">${user.name}</p>
                </li>
                <li class=catalog__item>
                <p class="catalog__itemName">Username</p>
                <p class="catalog__value">${user.username}</p>
                </li>
                <li class=catalog__item>
                <p class="catalog__itemName">Email</p>
                <p class="catalog__value">${user.email}</p>
                </li>
                <li class=catalog__item>
                <p class="catalog__itemName">Website</p>
                <p class="catalog__value">${user.website}</p>
                </li>
                <button type="button" class="catalog__button" id="modal-btn">Details...</button>
                </ul>`;
}
function usersDetailsMarkup(list, id) {
  return `
      <ul class="details__list details__list--position" id=${id}>
              <li class=details__item>
              <p class="details__itemName">Name</p>
              <p class="details__value">${list.name}</p>
              </li>
              <li class=details__item>
              <p class="details__itemName">Company</p>
              <p class="details__value">${list.company.name}</p>
              </li>
              <li class=details__item>
              <p class="details__itemName">City</p>
              <p class="details__value">${list.address.city}</p>
              </li>
              <li class=details__item>
              <p class="details__itemName">Street</p>
              <p class="details__value">${list.address.street}</p>
              </li>
              <li class=details__item>
              <p class="details__itemName">Phone</p>
              <p class="details__value">${list.phone}</p>
              </li>
              <button type="button" class="details__button" id="detailsButton">Close</button>
              </ul>`;
}

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(list => {
    usersContainer.insertAdjacentHTML('beforeend', usersListMarkup(list));
  });

const openModalBtn = document.querySelector('#modal-btn');

async function modalOpen(event) {
  event.preventDefault();
  if (event.target.className == 'catalog') {
    return;
  }
  let userId = event.target.closest('.catalog__list').getAttribute('id');
  usersDetails.classList.add('is-open');
  await renderingDetails(userId);
  addListener();
}

async function renderingDetails(id) {
  await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(response => response.json())
    .then(user => {
      usersDetailsOverlay.insertAdjacentHTML(
        'beforeend',
        usersDetailsMarkup(user, id),
      );
    });
}

function addListener() {
  document
    .querySelector('#detailsButton')
    .addEventListener('click', modalClose);
}

function modalClose(event) {
  event.preventDefault();
  usersDetails.classList.remove('is-open');
  const closeModalBtn = document.querySelector('#detailsButton');
  closeModalBtn.removeEventListener('click', modalClose);
  addListener();
}
