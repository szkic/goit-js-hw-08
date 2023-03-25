const throttle = require('lodash.throttle');

const emailMessageEls = document.querySelector('form');
const emailEl = document.querySelector('input[name="email"]');
const messageEl = document.querySelector('textarea[name="message"]');
const LOCALSTORAGE_KEY = 'feedback-form-state';

const data = {
  email: '',
  message: '',
};

const getData = () => {
  data.email = emailEl.value;
  data.message = messageEl.value;

  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
};

const updateOutput = () => {
  const parsedData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

  if (parsedData) {
    emailEl.value = parsedData.email;
    messageEl.value = parsedData.message;
    data.email = parsedData.email;
    data.message = parsedData.message;
  } else {
    emailEl.value = '';
    messageEl.value = '';
  }
};

const resetData = e => {
  e.preventDefault();
  console.log(data);
  emailMessageEls.reset();
  localStorage.clear();
};

updateOutput();
emailMessageEls.addEventListener('input', throttle(getData, 500));
emailMessageEls.addEventListener('submit', resetData);
