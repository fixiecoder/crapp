const getInput = (question) => new Promise((resolve, reject) => {
  rl.question(`${question}: `, (answer) => {
    resolve(answer)
  });
});

modules.exports = {
  getInput,
};
