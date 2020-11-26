import Table from '../Table';

test('check Table', () => {
  function checkTable() {
    const table = new Table();
    table.bindToDom(null);
  }

  expect(checkTable).toThrowError(new Error('container is not HTMLElement'));
});
