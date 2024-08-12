const chokidar = require('chokidar');
const { exec } = require('child_process');

// Initialize the watcher
const watcher = chokidar.watch('whatsapp.txt', {
  persistent: true
});

// Define the function to run the Python script
const runPythonScript = () => {
  exec('python3 run.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error}`);
      return;
    }
    if (stderr) {
      console.error(`Python script error: ${stderr}`);
      return;
    }
    console.log(`Python script output: ${stdout}`);
  });
};

// Watch for changes in the file
watcher.on('change', path => {
  console.log(`${path} has been modified`);
  runPythonScript();
});

console.log('Watching for changes in whatsapp.txt...');
