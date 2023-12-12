// runPythonScript.js
const { exec } = require("child_process");

// Function to run Python script
function runPythonScript(scriptName) {
  exec(`python -u ${scriptName}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`Python script output: ${stdout}`);
  });
}
lids = "backend/dev_lids_gui.py";
lids_d = './backend/dev_lids_d_gui.py';
// Run the first Python script
//runPythonScript(lids);

// Run the second Python script
runPythonScript(lids_d);
