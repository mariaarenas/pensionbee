# PensionBee - Static Content challenge - mid-level

## General info

Node.js application to display HTML pages at matching URLs with folders and sub-folders. The content of these pages comes from a combination of a template HTML file and a markdown file.

## Technologies

Project is created with:

- node.js
- express.js
- ejs (Embedded JavaScript templating)
- markdown-it
- Testing libraries (jest, supertest)

## Setup

To run this project:

- to run the server:

```
$ clone repository
$ cd pensionbee
$ npm install
$ node app.js
```

with the server running go to http://localhost:3000/instructions to render the readme.md

- To run the tests:

```
$ cd pensionbee
$ npm run test
```

## Features

- Error handling, returning 404 when url not found.
- open source libraries to convert md to html.
- use of ejs (Embedded JavaScript templating) to simple generate HTML markup with plain JavaScript template tags.
- Use of promises.
- Added instructions folder to test the ability to add new folders without breaking the functionality of the program.
- Testing of different user cases.
- Added styling (check http://localhost:3000/instructions to see more proper results)
- To execute the program in codesandbox use this link https://codesandbox.io/s/github/mariaarenas/pensionbee

## Code Review

I can see several problems here:

- The size of the loop has to be taken from the array length, not based in magic numbers (3). Anyway, I would use a for...of loop to iterate over elements of an iterative object as it is simpler and more readable and doesn’t need an extra variable to iterate.
- You need to pass the arg[0] as a parameter in the function, otherwise it will throw a ReferenceError: args is not defined
- The if statement needs to be === to compare type and value, otherwise you are assigning value (=) or only comparing values(==)
- Return the value item.favefood as soon as it is found in the array, otherwise it will iterate the whole array even when we just found the desirable result.
- In case the value is not found I will throw an Error or null. I do prefer an error to be able to identify and differentiate from undefined or null values. The exception will be caught when calling the function using a try/catch

- Here it is what I would write instead:

for loop:

```
exports.findAnimal = function (title) {
  for (x = 0; x < animalData.length; x++) {
    if (animalData[x].title === title) return animalData[x].faveFood;
  }
  throw new Error("title " + title + " not found");
};
```

for...of:

```
exports.findAnimal = function (title) {
  for (const animal of animalData) {
    if (animal.title === title) return animal.faveFood;
  }
  throw new Error("title " + title + " not found");
};
```
