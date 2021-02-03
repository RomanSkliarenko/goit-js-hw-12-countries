const _ = require('lodash');
import './styles.css';
import fetchCountries from './fetchCountries';
import markup from './templates/markup.hbs';
import markupTwo from './templates/markup_two.hbs';
import { alert } from '@pnotify/core/dist/PNotify.js';
// import '@pnotify/core/dist/Angeler.css';
import '@pnotify/core/dist/BrightTheme.css';
// import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/PNotify.css';

const refs = {
  container: document.querySelector('.container'),
  input: document.querySelector('input'),
  ul: document.querySelector('.coutries'),
};
const debounced = _.debounce(e => {
  e.preventDefault;
  refs.container.innerHTML = '';
  fetchCountries(e.target.value)
    .then(data => {
      if (data.length === 1) {
        console.log(data);
        refs.container.insertAdjacentHTML('beforeend', markup(data));
      } else if (data.length > 1 && data.length <= 10) {
        refs.container.insertAdjacentHTML('beforeend', markupTwo(data));
      } else if (data.length > 10 && data.length <= 250) {
        refs.container.insertAdjacentHTML(
          'beforeend',
          '<h1>Совпадений слишком много! Уточните!</h1>',
        );
      } else if (!data.length) {
        // refs.container.insertAdjacentHTML(
        //   'beforeend',
        //   '<h1>Такой страны нет!!!</h1>',
        // );
        alert({
          text: 'Такой страны нет!',
        });
      }
    })
    .catch(error => {
      console.log('Ooops :(');
    });
}, 1000);
refs.input.addEventListener('input', debounced);
