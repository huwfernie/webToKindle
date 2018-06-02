function open(program,filename) {
  console.log('Command Line');
  const { exec } = require('child_process');
  exec(`${program} ${filename}`, (err, stdout, stderr) => {
    if (err) {
      console.log('node couldn\'t execute the command\n');
      console.log(err);
      return;
    }
    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    return;
  });
}

// var exec = require('child_process').exec;
// var cmd = 'kindlegen ./output/index.opf';
// // var cmd = 'atom ./output/index.opf';
//
// exec(cmd, function(error, stdout, stderr) {
//   // command output is in stdout
// });

open('KindleGenFolder/kindlegen', './output/index.opf')

module.exports.open = open;
