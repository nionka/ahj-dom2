import Table from './Table';

const data = require('./data.json');

const table = new Table(data);
table.bindToDom(document.querySelector('.container'));
table.init();

const param = ['id', 'id', 'title', 'title', 'year', 'year', 'imdb', 'imdb'];
let index = 0;

setInterval(() => {
  table.getSort(param[index]);
  index += 1;
  if (index === param.length) index = 0;
}, 2000);
