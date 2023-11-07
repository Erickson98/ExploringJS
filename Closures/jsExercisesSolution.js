// CHALLENGE 1
function createFunction() {
  return function () {
    console.log("hello");
  };
}

const function1 = createFunction();
function1(); // => should console.log('hello');

// CHALLENGE 2
function createFunctionPrinter(input) {
  return function () {
    console.log(input);
  };
}

const printSample = createFunctionPrinter("sample");
printSample(); // => should console.log('sample');
const printHello = createFunctionPrinter("hello");
printHello(); // => should console.log('hello');

// CHALLENGE 3
function outer() {
  let counter = 0; // this variable is outside incrementCounter's scope
  function incrementCounter() {
    counter++;
    console.log("counter", counter);
  }
  return incrementCounter;
}

const willCounter = outer();
const jasCounter = outer();

willCounter();
willCounter();
willCounter();

jasCounter();
willCounter();

function addByX(x) {
  return function (num) {
    return num + x;
  };
}

const addByTwo = addByX(2);
console.log(addByTwo(1)); // => should return 3
console.log(addByTwo(2)); // => should return 4
console.log(addByTwo(3)); // => should return 5

const addByThree = addByX(3);
console.log(addByThree(1)); // => should return 4
console.log(addByThree(2)); // => should return 5

const addByFour = addByX(4);
console.log(addByFour(4)); // => should return 8
console.log(addByFour(5)); // => should return 9

// CHALLENGE 4
function once(func) {
  let called = false;
  let result;
  return function (arg) {
    if (!called) {
      result = func(arg);
      called = true;
      return result;
    }
    return result;
  };
}

const onceFunc = once(addByTwo);
console.log(onceFunc(4)); // => should log 6
console.log(onceFunc(10)); // => should log 6
console.log(onceFunc(9001)); // => should log 6

// CHALLENGE 5
function after(count, func) {
  let counter = 0;
  return function () {
    if (counter === count - 1) return func();
    counter++;
  };
}

const called = function () {
  console.log("hello");
};
const afterCalled = after(3, called);
afterCalled(); // => nothing is printed
afterCalled(); // => nothing is printed
afterCalled(); // => 'hello' is printed

// CHALLENGE 6
const calledFunc = function () {
  console.log("Function was called!");
};

function delay(func, wait) {
  return function () {
    setTimeout(() => func(), wait);
  };
}

const awaitFunc = delay(calledFunc, 50);
awaitFunc(); // should call the "func" in "wait" time

// CHALLENGE 7
function rollCall(names) {
  let counter = 0;
  return function () {
    if (counter > names.length - 1) {
      console.log("Everyone accounted for");
      counter++;

      return;
    }
    console.log(names[counter]);
    counter++;
  };
}

const rollCaller = rollCall(["Victoria", "Juan", "Ruth"]);
rollCaller(); // => should log 'Victoria'
rollCaller(); // => should log 'Juan'
rollCaller(); // => should log 'Ruth'
rollCaller(); // => should log 'Everyone accounted for'
rollCaller(); // => should log 'Everyone accounted for'

// CHALLENGE 8
function saveOutput(func, magicWord) {
  let saveOutput = {};
  return function (arg) {
    if (arg === magicWord) {
      return saveOutput;
    }
    const output = func(arg);
    saveOutput[arg] = output;
    return output;
  };
}

const multiplyBy2 = function (num) {
  return num * 2;
};
const multBy2AndLog = saveOutput(multiplyBy2, "boo");
console.log(multBy2AndLog(2)); // => should log 4
console.log(multBy2AndLog(9)); // => should log 18
console.log(multBy2AndLog("boo")); // => should log { 2: 4, 9: 18 }

// CHALLENGE 9
function cycleIterator(array) {
  let counter = -1;
  return function () {
    counter++;
    if (counter > array.length - 1) {
      counter = 0;
    }
    return array[counter];
  };
}

const threeDayWeekend = ["Fri", "Sat", "Sun"];
const getDay = cycleIterator(threeDayWeekend);
console.log(getDay()); // => should log 'Fri'
console.log(getDay()); // => should log 'Sat'
console.log(getDay()); // => should log 'Sun'
console.log(getDay()); // => should log 'Fri'

// CHALLENGE 10
function defineFirstArg(func, arg) {
  return function (num) {
    const result = func(arg, num);
    return result;
  };
}

const subtract = function (big, small) {
  return big - small;
};
const subFrom20 = defineFirstArg(subtract, 20);
console.log(subFrom20(5)); // => should log 15

// CHALLENGE 11

function getTodayDate() {
  let today = new Date();

  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();

  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  let dateStr = `${day}/${month}/${year}`;
  return dateStr;
}

function dateStamp(func) {
  return function (arg) {
    const output = func(arg);
    const date = getTodayDate();
    return { date, output };
  };
}

const stampedMultBy2 = dateStamp((n) => n * 2);
console.log(stampedMultBy2(4)); // => should log { date: (today's date), output: 8 }
console.log(stampedMultBy2(6)); // => should log { date: (today's date), output: 12 }

// CHALLENGE 12
function censor() {
  //hacer un diccionario
  let storageKey = {};
  return function (arg1, arg2) {
    if (arg1 && arg2) {
      storageKey[arg1] = arg2;
      return;
    }
    const output = arg1
      .split(/(?<=\w)([,.])|(?=[,.])|\s+/)
      .filter(Boolean)
      .map((x) => {
        console.log(typeof x);
        console.log(storageKey[`${x}`]);
        if (storageKey[x] !== undefined) {
          x = storageKey[x];
          return x;
        }
        return x;
      });
    let result = output.join(" ").replace(/ \,|\ \./g, (match) => match.trim());
    return result;
  };
  //si solamente fue uno entonces remplazar con todos con el diccionarios que coincidan
}

const changeScene = censor();
changeScene("dogs", "cats");
changeScene("quick", "slow");
console.log(changeScene("The quick, brown fox jumps over the lazy dogs.")); // => should log 'The slow, brown fox jumps over the lazy cats.'

// CHALLENGE 13
function createSecretHolder(secret) {
  let x = secret;
  return {
    setSecret: function (arg) {
      x = arg;
    },
    getSecret: function () {
      if (!x) {
        x = secret;
      }
      return x;
    },
  };
}

obj = createSecretHolder(5);
console.log(obj.getSecret()); // => returns 5
console.log(obj.setSecret(2));
console.log(obj.getSecret()); // => returns 2

// CHALLENGE 14
function callTimes() {
  let called = 0;
  return function () {
    called++;
    console.log(called);
  };
}

let myNewFunc1 = callTimes();
let myNewFunc2 = callTimes();
myNewFunc1(); // => 1
myNewFunc1(); // => 2
myNewFunc2(); // => 1
myNewFunc2(); // => 2

// CHALLENGE 15
function roulette(num) {
  let n = 1;
  return function () {
    let result = "";
    n > num
      ? (result = "pick a number to play again")
      : n === num
      ? (result = "win")
      : (result = "spin");
    n++;
    return result;
  };
}

// /*** Uncomment these to check your work! ***/
const play = roulette(3);
console.log(play()); // => should log 'spin'
console.log(play()); // => should log 'spin'
console.log(play()); // => should log 'win'
console.log(play()); // => should log 'pick a number to play again'
console.log(play()); // => should log 'pick a number to play again'

// CHALLENGE 16
function average() {
  let average = 0;
  let numAdded = 0;
  return function (arg = 0) {
    let result = 0;
    if (!arg) {
      result = (average + arg) / numAdded;
      return result;
    }
    numAdded++;
    average = average + arg;
    result = average / numAdded;
    return result;
  };
}

const avgSoFar = average();
console.log(avgSoFar()); // => should log 0
console.log(avgSoFar(4)); // => should log 4
console.log(avgSoFar(8)); // => should log 6
console.log(avgSoFar()); // => should log 6
console.log(avgSoFar(12)); // => should log 8
console.log(avgSoFar()); // => should log 8

// CHALLENGE 17
function makeFuncTester(arrOfTests) {
  return function (func) {
    for (let index = 0; index < arrOfTests.length; index++) {
      if (arrOfTests[index][1] !== func(arrOfTests[index][0])) return false;
    }
    return true;
  };
}

// /*** Uncomment these to check your work! ***/
const capLastTestCases = [];
capLastTestCases.push(["hello", "hellO"]);
capLastTestCases.push(["goodbye", "goodbyE"]);
capLastTestCases.push(["howdy", "howdY"]);
const shouldCapitalizeLast = makeFuncTester(capLastTestCases);
const capLastAttempt1 = (str) => str.toUpperCase();
const capLastAttempt2 = (str) => str.slice(0, -1) + str.slice(-1).toUpperCase();
console.log(shouldCapitalizeLast(capLastAttempt1)); // => should log false
console.log(shouldCapitalizeLast(capLastAttempt2)); // => should log true

// CHALLENGE 18
function makeHistory(limit) {
  let storage = [];
  return function (params) {
    if (params === "undo") {
      if (limit === 2) return "nothing to undo";
      let element = storage[storage.length - 1];
      element = element + " undo";
      storage.pop();
      limit++;
      return element;
    }
    if (limit === 0) {
      storage.shift();
      storage.push(params);
      return params + " done";
    }
    storage.push(params);
    limit--;
    return params + " done";
  };
}

const myActions = makeHistory(2);
console.log(myActions("jump")); // => should log 'jump done'
console.log(myActions("undo")); // => should log 'jump undone'
console.log(myActions("walk")); // => should log 'walk done'
console.log(myActions("code")); // => should log 'code done'
console.log(myActions("pose")); // => should log 'pose done'
console.log(myActions("undo")); // => should log 'pose undone'
console.log(myActions("undo")); // => should log 'code undone'
console.log(myActions("undo")); // => should log 'nothing to undo'

// CHALLENGE 19
function blackjack(array) {
  return function (arg1, arg2) {
    let sum;
    let bust = false;
    return function () {
      if (!sum) {
        sum = arg1 + arg2;
        return sum;
      }
      if (sum >= 21) {
        return "you are done!";
      }
      sum += array[0];
      array.shift();
      if (sum >= 21 && !bust) {
        bust = true;
        return "bust";
      }
      return sum;
    };
  };
}

// /*** Uncomment these to check your work! ***/

// /*** DEALER ***/
const deal = blackjack([
  2, 6, 1, 7, 11, 4, 6, 3, 9, 8, 9, 3, 10, 4, 5, 3, 7, 4, 9, 6, 10, 11,
]);

/*** PLAYER 1 ***/
const i_like_to_live_dangerously = deal(4, 5);
console.log(i_like_to_live_dangerously()); // => should log 9
console.log(i_like_to_live_dangerously()); // => should log 11
console.log(i_like_to_live_dangerously()); // => should log 17
console.log(i_like_to_live_dangerously()); // => should log 18
console.log(i_like_to_live_dangerously()); // => should log 'bust'
console.log(i_like_to_live_dangerously()); // => should log 'you are done!'
console.log(i_like_to_live_dangerously()); // => should log 'you are done!'

/*** BELOW LINES    ARE FOR THE BONUS ***/

/*** PLAYER 2 ***/
const i_TOO_like_to_live_dangerously = deal(2, 2);
console.log(i_TOO_like_to_live_dangerously()); // => should log 4
console.log(i_TOO_like_to_live_dangerously()); // => should log 15
console.log(i_TOO_like_to_live_dangerously()); // => should log 19
console.log(i_TOO_like_to_live_dangerously()); // => should log 'bust'
console.log(i_TOO_like_to_live_dangerously()); // => should log 'you are done!
console.log(i_TOO_like_to_live_dangerously()); // => should log 'you are done!

/*** PLAYER 3 ***/
const i_ALSO_like_to_live_dangerously = deal(3, 7);
console.log(i_ALSO_like_to_live_dangerously()); // => should log 10
console.log(i_ALSO_like_to_live_dangerously()); // => should log 13
console.log(i_ALSO_like_to_live_dangerously()); // => should log 'bust'
console.log(i_ALSO_like_to_live_dangerously()); // => should log 'you are done!
console.log(i_ALSO_like_to_live_dangerously()); // => should log 'you are done!
