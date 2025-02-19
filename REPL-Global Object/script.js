/*
⇒ REPL (Read-Eval-Print Loop) and Global Object in Node.js


1️⃣ REPL (Read-Eval-Print Loop)

Q) What is REPL?
REPL stands for:
- R → Read (Reads user input)  
- E → Evaluate (Executes the input)  
- P → Print (Prints the result)  
- L → Loop (Waits for the next input)  

It is an interactive command-line tool that allows you to execute JavaScript code directly in Node.js without creating a file.

Q) How to Start REPL?
1. Open a terminal or command prompt.
2. Type: node
3. You will see a prompt (`>`) where you can type JavaScript code.

⁕ Basic REPL Usage

> 5+10
15
> console.log("Hello, Node.js!")
Hello, Node.js!
undefined
> let x=20;
undefined
> x*2
40

# REPL Features

i) Executing Expressions:

You can perform arithmetic operations directly:
> 10 + 5
15
> 100 / 2
50

ii) Variable Declaration:

You can declare variables and use them:
> let a = 10;
undefined
> let b = 20;
undefined
> a+b
30

iii) Using Functions:

> function greet(name) {
... return "Hello, Jay Shree Krishna," + name + "!";
... }
undefined
> greet(" Smit Garala")
'Hello, Jay Shree Krishna, Smit Garala!'
> greet(Smit Garala)
greet(Smit Garala)
      ^^^^
Uncaught SyntaxError: missing ) after argument list

iv) Multiline Code Execution:

Press Enter after an opening `{` or `[`, and REPL will wait for more input:
> let age = 20;
undefined
> if(age>18){
... console.log(`You can vote ${age}`)
... }else{
... console.log(`Come Next year ${age}`)
... }
You can vote 20
undefined
> age = 15
15
> if(age>18){
... console.log(`You can vote ${age}`)
... }else{
... console.log(`Come Next year ${age}`)
... }
Come Next year 15
undefined

# Example: Saving and Loading a REPL Session

> .save savedScript.js
Session saved to: savedScript.js
> .exit
$ node
> .load mycode.js
(To Load a Script into Node.js REPL: If you're working inside the Node.js REPL (which is a Node.js interactive shell), then you can use .load to load the script. First, start the Node.js REPL by typing node in the terminal, and then use .load to load the script: >node => >.load savedScript.js)

 2️⃣ Global Object in Node.js
Q) What is the Global Object?
- The global object in Node.js is similar to `window` in the browser.
- It provides built-in functions, variables, and modules accessible from anywhere.
- In Node.js, the global object is called `global`.

Q) How to Access the Global Object?

console.log(global);

This will print all the available properties and methods inside `global`.

# Common Global Variables & Functions
 Name                       Description 
-------------------------------------------------------------------------------------
 global                   The global object itself. 
 console                  Provides methods like console.log(), console.error(), etc. 
 process                  Contains information about the Node.js process (e.g., environment variables). 
 setTimeout               Executes a function after a given delay. 
 setInterval              Executes a function repeatedly with a fixed time delay. 
 setImmediate             Executes a function immediately after I/O operations. 
 __dirname                The directory name of the current file. 
 __filename               The file name of the current script. 

# Examples of Global Variables

i) `__dirname` and `__filename`

console.log("location of the File", __filename);
console.log("location of the Directory", __dirname);

Output:
PS E:\Full Stack Development\nodejs\BeyondNodeJS\repl-global object> node script.js
location of the File E:\Full Stack Development\nodejs\BeyondNodeJS\repl-global object\script.js
location of the Directory E:\Full Stack Development\nodejs\BeyondNodeJS\repl-global object

ii) `setTimeout()` Example
Executes a function after 3 seconds:

setTimeout(() => {
  console.log("Hello after 3 seconds!");
}, 3000);

Output:
PS E:\Full Stack Development\nodejs\BeyondNodeJS\repl-global object> node script.js
Hello after 3 seconds!

iii) `setInterval()` Example
Executes a function every second:

setInterval(() => {
  console.log("This message prints every 1 second.");
}, 1000);

Output:
PS E:\Full Stack Development\nodejs\BeyondNodeJS\repl-global object> node script.js
This message prints every 1 second.
This message prints every 1 second.
This message prints every 1 second.
This message prints every 1 second.
This message prints every 1 second.
This message prints every 1 second..............

iv) `process` Example
Get information about the current Node.js process:

console.log("Node.js Version:", process.version);
console.log("Platform:", process.platform);

Output:
Node.js Version: v18.16.0
Platform: win32

--------------------------------------------------------------------------------------------------
*/

// Lets Make a Stopwatch

// let second = 0;
// let minutes = 0;
// let hour = 0;
// let day = 0;

// let stopwatch = () => {
//   second++;

//   if (second > 59) {
//     second = 0;
//     minutes++;
//   }

//   if (minutes > 59) {
//     minutes = 0;
//     hour++;
//   }
//   if (hour > 23) {
//     hour = 0;
//     day++;
//   }
//   console.log(
//     `${day} day :${hour} hour : ${minutes} minutes : ${second} second`
//   );
// };
// setInterval(stopwatch, 1000);
