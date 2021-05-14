const fs = require('fs').promises;


async function getData(path) {
  const file = await fs.readFile(path, 'utf8');
  const lines = file.split('\n');
  return lines;
}

async function addUser(user, path) {

  console.log('\nAdding a new user...')
  
  const { name, age, city } = user;
  
  await fs.writeFile(path, `\n${name};${age};${city}`, { flag: 'a' });
  
  console.log('User added ✅\n')
}

async function showData(path) {
  const users = await getData(path);

  console.log(`📦 Our database have ${users.length} users.\n`);
  
  users.forEach((user) => {
    const [ name, age, city ] = user.split(';');
    console.log(`➜ 👤 ${name} has ${age} years old and live in ${city}`);
  })
}

async function main() {

  const path = './users.txt';

  await showData(path);

  const newUser = {
    name: 'Neymar',
    age: 28,
    city: 'Paris'
  }

  await addUser(newUser, path);
  await showData(path);
  
  console.log('\n');
}

main()