# Chess Timer
Programming challenge submission. Written for the browser in ES6 Javascript with no external dependencies. Compilation with Gulp, Babel, and Webpack.

## Build Instructions

```
npm install
gulp build
```

Open `dist/index.html` in your browser.

## Rules
### Business Requirements
You are apart of a brand new startup that specializes in chess! You've been assigned a task to make a speed timer when a game of chess is happening. The business requirements are as follows:
- There needs to be two clocks, one for each player.
- Each clock has one button.
- By pressing your button you start the other players clock and stop yours if it's counting down (the opposite of this is also true).
- Each clock starts at 4 minutes and counts down until one of them reaches 0.
- When the application loads, no clocks will be active (each clock will be at 4 minutes).
- When a clock reaches 0, reset each clock back to 4 minutes and award the game to the other player (you can use an alert or console logging).
- There is a reset button that can reset both clocks back to 4 minutes and set the buttons back to their original state.

### Technical Requirements
- Make sure that the code are as reusable as possible.
- You are not allowed to use any libraries or frameworks. This project should be done in vanilla Javascript.
- If you use ES6 you must supply us with your own compilation script.
- Feel free to use Git if you'd like.
- There should be one index.html file for us to load.
