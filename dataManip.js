const fs       = require('fs');
// const readFile = require('fs-readfile-promise');

const sourceDir = './redbkmon'

fs.readdir(sourceDir, (err, files) => {
  let colTitles;
  let body;

  const contents = files.map((file) => {
    return fs.readFileSync(sourceDir + '/' + file, 'utf-8');
  });

  contents.forEach((contents) => {
    const csv = contents.split('\n');
    const rawMeta = csv.slice(0, 8);
    const head = csv.slice(9, 25);

    // strip and clean meta keys & vals
    const metaKeys = [];
    const metaVals = [];
    for (let i=0; i<rawMeta.length; i++) {
      const cleanMeta = rawMeta[i].replace(/[":]/g, '').trim().split(',');
      metaKeys.push(cleanMeta[0]);
      metaVals.push(cleanMeta[1]);
    }

    // clean column titles
    let orginalColTitles = [];
    for (let i=0; i<head.length; i++) {
      const colTitle = head[i].slice(11).slice(0, -1);
      orginalColTitles.push(colTitle.replace(/[,]/g, ''));
    }

    // build body portion from each file
    const fileBody = csv.slice(26)
      .map((row) => (
        // join meta vals with orginal row data
        metaVals.join(',') + ',' + row + '\n'
      ))
      .join('');

    // build final doc
    colTitles = metaKeys.join(',') + ',' + orginalColTitles.join(',') + '\n';
    body += fileBody;
  })

  console.log('🍕', colTitles)
  const doc = colTitles + body;

  const targetFile = 'data.csv';
  fs.writeFile(targetFile, doc, (err) => {
    if (err) throw err;
    console.log(`${targetFile} saved! 🎊😀`);
  })
});
