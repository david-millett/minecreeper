# minecreeper


watch the lesson to see how to style


Description

Minecreeper

The game 'Minecreeper' is a minesweeper-style game substituing mines for undead skeletons.

Upon opening the game, players are met with a modal menu detailing the game's story and instructions on how to play.

After pressing play, they can click to reveal squares on the graveyard. If a square with no adjacent skeletons is selected, the game will also reveal all nearby squares. The first click is set to always implement this function so that the player always gets a good start and to make playing the game more fun.

PLayers right-click to set down a tombstone to mark where they believe a skeleton is hiding.

For me, especially when playing on higher difficulties, I think having the ability to double click on a revealed square to reveal nearby squares when you have set down the required number of tombstones makes the game much more fun and fast paced - so I am happy to include this feature in Minecreeper.

Upon winning or losing the game, the player is greeted with an appropriate sound effect and visual changes to the 'sky' above the graveyard.


Deployment link



Timeframe and working team

This project was completely solo over a few days.


Technologies used

The game was made in VS Code and image editing was done in Procreate.


Brief

This project was compeleted in response to a brief to create a browser-based game as part of a software engineering course at General Assembly. It is the first project I have made using HTML, CSS, and JavaScript.


Planning

Before embarking on the project, I wrote a comprehensive plan including the necessary steps to code the project in JavaScript and desiging a mock-up/wire frame in Figma.


Build/code process


Experimented with a few ways of generating the gameboard while also creating an array to help identify the squares.
Initially using a set sized square and skeleton number. Later on will create a difficulty setting to dynamically change this - will also later on create a landing page from which the board can be generated.
Settled on a method of generating the board. Created a function to randomly generate numbers and assign these cells as skeletons. Unsure at this stage whether the best way to identify square types is via assigning classes or using boolean elements. At this stage, both are being used to see which is more useful further down the line.

Added an array of neighbours to each cell object, which enabled simpler, more efficient code for some of the other functions.
Implemented a game over function. Struggling a bit more to identify a win condition.

the main issue I had was implementing the ability to replay and change difficulty
by necessity, the reset variables function was created and the create event listeners to stop the game breaking
dynamically changing the size of the grid and ensuring that the grid displayed properly was the hardest part of the project for me personally

I am proud of the double click functionality

My step-by-step process was to make a functioning game first, using only basic CSS that demonstrated my code was behaving as intended.
There were several major steps
First init - all the steps needed to initilise the game were created, then compiled into the init() function
Then there were three major ways to interact with the game - clicking, right clicking, and double clicking
Then I worked on the bulk of the styling in CSS, and added things around the main game functions, such as the modal menu


Challenges

The parts of the project that I anticipated to be the sticking points - this and this - ended up going quite smoothly. Instead, later 
insert the challenge above here

Missing event listeners was the most game-breaking moment

creating the neighbours array is my least favourite part - could be done neater


Wins

parts I am most proud of - bring that part down

Creating the array of neighbours was a big moment that enabled many of the future features of the game


Key learnings/takeaways


Bugs

The game performs as intended in Chrome, but some sound and visual effects may not perform properly in other browsers.


Future improvements

