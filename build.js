const colors = require("colors/safe");

// the below should fail with RTE
(function () {
  fs.read();
})();

console.log(colors.green("WPE BUILD START"));
console.log("MY_SECRET: ", colors.magenta(process.env.MY_SECRET));
console.log("ALL ENVS: ", colors.blue(process.env));

console.error(colors.red("This is just a sample error during build"));

console.log(colors.green("WPE BUILD END"));
