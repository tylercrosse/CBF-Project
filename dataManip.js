const fs = require('fs');
const readStream = fs.readFile('redbkmon/03103.txt', 'utf-8', (err, contents) => {
  const csv = contents.split('\n');
  const rawMeta = csv.slice(0, 8);
  const head = csv.slice(9, 25);

  // strip and clean meta keys & vals
  const metaKeys = [];
  const metaVals = [];
  for (let i=0; i<rawMeta.length; i++) {
    const cleanMeta = rawMeta[i].replace(/["]/g, '').trim().split(',');
    metaKeys.push(cleanMeta[0]);
    metaVals.push(cleanMeta[1]);
  }

  // clean column titles
  let colTitles = [];
  for (let i=0; i<head.length; i++) {
    const colTitle = head[i].slice(11).slice(0, -1);
    colTitles.push(colTitle.replace(',', ''));
  }

  // build body
  const body = csv.slice(26)
    .map((row) => (
      // join meta vals with orginal row data
      metaVals.join(',') + ',' + row + '\n'
    ))
    .join('');

  // build final doc
  const doc = metaKeys.join(',') + ',' + colTitles.join(',') + '\n' + body;

  fs.writeFile('test.csv', doc, (err) => {
    if (err) throw err;
    console.log('It saved! 🎊😀');
  })
});
