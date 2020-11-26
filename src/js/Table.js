/* eslint-disable no-tabs */
export default class Table {
  constructor(data) {
    this.data = data;
    this.container = null;
    this.sort = true;
  }

  init() {
    this.drawTable();
  }

  bindToDom(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }

    this.container = container;
  }

  drawTable(atr) {
    this.container.innerHTML = '';
    const table = document.createElement('table');
    const th = '<tr><th>id</th><th>title</th><th>year</th><th>imdb</th></tr>';
    table.innerHTML = th;

    this.data.forEach((elem) => {
      const {
        id, title, imdb, year,
      } = elem;
      const tr = `
			<tr data-id="${id}" data-title="${title}" data-year="${year}" data-imdb="${imdb.toFixed(2)}">
			<td>${id}</td><td>${title}</td><td>(${year})</td><td>imdb: ${imdb.toFixed(2)}</td>
			</tr>
			`;
      table.innerHTML += tr;
    });

    this.container.append(table);
    this.addArrow(atr);
  }

  addArrow(atr) {
    const up = '\u{2191}';
    const down = '\u{2193}';
    const th = this.container.querySelectorAll('th');
    th.forEach((e) => {
      if (e.textContent === atr && this.sort) {
        e.textContent += down;
        this.sort = false;
      } else if (e.textContent === atr && !this.sort) {
        e.textContent += up;
        this.sort = true;
      }
    });
  }

  getSort(atr) {
    if (this.sort) {
      if (atr === 'title') {
        this.data.sort((a, b) => {
          if (a.title > b.title) return 1;
          if (a.title < b.title) return -1;
          return 0;
        });
      } else {
        this.data.sort((a, b) => a[atr] - b[atr]);
      }
    }
    if (!this.sort) {
      if (atr === 'title') {
        this.data.sort((a, b) => {
          if (a.title > b.title) return -1;
          if (a.title < b.title) return 1;
          return 0;
        });
      } else {
        this.data.sort((a, b) => b[atr] - a[atr]);
      }
    }
    this.drawTable(atr);
  }
}
