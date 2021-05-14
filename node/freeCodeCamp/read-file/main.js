const fs = require('fs').promises;


async function getData(path) {
  const file = await fs.readFile(path, 'utf8');
  const lines = file.split('\n');
  return lines;
}

async function showData(path) {
  const users = await getData(path);
  
  console.log(`Our database have ${users.length} users.\n`);
  
  users.forEach((user) => {
    const [ name, age, city ] = user.split(';');
    console.log(`${name} has ${age} years old and live in ${city}`);
  })
}


showData('./users.txt')