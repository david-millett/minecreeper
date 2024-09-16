# minecreeper


watch the lesson to see how to style


Experimented with a few ways of generating the gameboard while also creating an array to help identify the squares.
Initially using a set sized square and skeleton number. Later on will create a difficulty setting to dynamically change this - will also later on create a landing page from which the board can be generated.
Settled on a method of generating the board. Created a function to randomly generate numbers and assign these cells as skeletons. Unsure at this stage whether the best way to identify square types is via assigning classes or using boolean elements. At this stage, both are being used to see which is more useful further down the line.

Added an array of neighbours to each cell object, which enabled simpler, more efficient code for some of the other functions.
Implemented a game over function. Struggling a bit more to identify a win condition.