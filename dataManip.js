const fs = require('fs');
const readStream = fs.readFile('redbkmon/03103.txt', 'utf-8', (err, contents) => {
  // console.log(contents);
  const csv = contents.split('\n');
  const head = csv.slice(0, 26);

  let tmp = [];
  for (let i=9; i<25; i++) {
    tmp.push(head[i]);
  }

  const body = csv.slice(26)
    .map((row) => (
      row + '\n'
    ))
    .join('');
  console.log(tmp[0].slice(0,-1));
  // const doc = tmp.concat(['\n']).concat(body);
  //
  // fs.writeFile('test.csv', doc, (err) => {
  //   if (err) throw err;
  //   console.log('It saved! 🎊😀');
  // })
})
// const readStream = fs.createReadStream('redbkmon/03103.txt')
//   .on('data', (doc) => {
//     console.log(doc);
//   })
