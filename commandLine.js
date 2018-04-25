function open(program,filename) {
  console.log('Command Line');
  const { exec } = require('child_process');
  exec(`${program} ${filename}`, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return;
    }
    // the *entire* stdout and stderr (buffered)
    // console.log(`stdout: ${stdout}`);
    // console.log(`stderr: ${stderr}`);
    return;
  });
}



module.exports.open = open;
