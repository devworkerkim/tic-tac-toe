# Tic-Tac-Toe - The Odin Project

This is the repo for the Tic-Tac-Toe project in the JavaScript course from The Odin Project

## What I Learned

I really haven't done a lot of work on object-oriented programming (OOP), so this was a challenge for me.  I made the effort to learn something new and try to code in OOP as I would default normally to funcitonal programming.  For a game like Tic-Tac-Toe, the logic makes functional sense to me and I think would have been easier to implement.  It's unfamiliar territory, and programming a game in OOP takes a little bit more thought, but the benefits of using OOP were surprising.

### Maintaining The Code

As I was building the objects in the game, I had to think which object a certain action should be placed in and how to handle their inputs/outputs.  We were taught how to use factory functions and modules to build these actions in our objects.  Knowing how we implemented our objects we can freely insert and remove any variables and functions with ease.  We can easily find things we need to change because our object prototypes help organize the code.  Things seem like they are easy to find and maintain.

### Private Variables

With the way variables are scoped within our objects, we are able to keep our variables private.  When we return our objects, we have the choice to make certain variables accessible to the global environment.  For any game, this prevents users from cheating and manipulating things.  For our Tic-Tac-Toe game, I only allowed access to starting a new game, making moves, and checking if there is a winner.  We can keep our logic private so users couldn't do something like manipulate whose move it is or change what's been played on the board.