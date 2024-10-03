const generateRandomNumber = () => {
  return Math.floor(Math.random() * 100 + 1)
}

const greet = () => 'Hello'

// console.log(generateRandomNumber());

module.exports = { generateRandomNumber, greet };