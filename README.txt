#README file

This is the readme file for your project. You should use the template below to write your own readme file.
You should delete all lowercase text below and replace it with your own writing. You should include all
titles below (indicated by being all-caps) but you should remove the rest of the text and replace with
your own. The lower-case text suggests how you might focus your response to each section, but is only
a suggestion. The key thing is to ensure you conform to the demands of the assessment and marking criteria 
uploaded to Moodle. You are welcome to include additional titles and text as you desire beyond these.

A copy of this can be found on notion here: https://hughdeleuzer.notion.site/ReadMe-File-Template-190c92fdf1c680d3a3cfc06f349aff28?pvs=4

---------------------------------------------------------------------------------------------------------

PROJECT NAME: Escape Haunted the House Project - 'HER'

BY Patel and Fisho
MEMBERS: Anya Patel, 2509375 and Nathan Fisho, 2505790

LINK TO GITHUB REPO: https://github.com/anya-alyssa/2509375-2505790-FinalProject.git
LINK TO GITHUB PAGES: [insert link here]

OVERVIEW OF PROJECT
This project is a psychological horror game set in a haunted house, where players have to try and escape 
the house while maintaining their sanity, searching the house for items and navigated lcoked doors, all 
the while running from a ghost that randomly appears. The key technical features are the sanity mechanic, 
the ghost, an inventory system, item and room interaction and having multiple endings. The key themes and 
aesthetics are fear, insanity and speed.

note - sometimes using the silver key does not open the upstairs ghost bedroom door. I couldn't figure out 
why or how to fix it. it usually works if it is the only/first thing in your inventory.

note - you must be FACING an object to search it (walk into it to ensure you are facing it). since i didnt 
have time to implement different character artwork it is hard to tell where you are facing but it appears 
in console when you click space. 

Incase: 
ITEM LOCATIONS:
Study key --> bottom plant pot in living room
toolkit --> far left bookshelf in Study
cabinet key --> toilet (need toolkit)
nightstand key --> laundry basket (bathroom)
ghosts bedroom key --> kitchen cabinet
parents room key:--> ghosts room nightstand
door key --> safe (code: 6382)
code --> top most couch on the right half
missing book --> parents nightstand (need nightstand key)
teddy --> bookshelf behind chair in study (use as key to enter basement and get teddy)


INDIVIDUAL CONTRIBUTION
Anya: Job - Coding + Artwork
I was responsible for all the coding of the project, so implementing game mechanics, interactitvity and 
just the overall functioality of the game. I used the base code we started off in lectures and then made it
my own and branched off from there. I started by adding what I learnt from lectures, so added more tilemaps,
made an inventory class template and drew the grid for the inventory. As well as this I added a sanity bar 
and then attempted to create different mechanics such as the inventory system, a way ot pick up/search places 
and the safe code "puzzle", and struggled. If I found something hard I would look at the p5.js reference, 
javascript tutorials and/or other peoples p5.js projects, for example by searching "typing game p5.js" and then
adapting what I saw to fit my game or getting to grips with different ways I could go about doing it. The logic of 
things was a lot of trial and error, for example the inventory searching had to make sure there were items in the 
inventory first but I would just go straight into searching for items. Mechanics like the locket unequipping when 
the player moved took me a while because the player.isMoving wouldnt work so instead I changed it to detect the 
movemnt keys being pressed. I wasn't able to implement audio, a ghost patrolling system and a hiding system that 
I initially had hoped to include due to realising it was too ambitious to figure out in the time I had given myself.
As I got further and further into coding the game, I found myself having to look at references less and less and 
also found that it got quicker and quicker to implement things. 

In the end, I was also responsible for all of the artwork in the game. I used references of images online and 
redraw them how I wanted them to be/used them for guidance for proprtions or aesthetics. I tried to sticks to yellows 
(theme of insanity), purple (theme of fear) and red (theme of danger/urgency) and blues (sadness but also calmness).
This took up a large chunk of time and was very last minute and I was initially very ambitious with the amount of 
extra tiles I wanted to include, like paintings on the walls, carpets, broken tiles or floorboards. Including these 
would have taken a considerably longer amount of time.

Nathan: Job - Artwork
Nothing.

Each team members should write a detailed explanation of their individual contribution to the project.
Be specific: 50% of your mark will be based on your individual contributions, so your marker needs to
know exactly what you contributed. Explain your process and how you went about it. What research did
you do? How did you implement your contributions into the project? What challenges did you face? How did
you overcome these challenges (note: realising that it would be beyond the scope of your project is
not a failure! Explain what you did instead to keep in scope. Balancing your ambitions versus the
practical possibilities within the time and technical constraints is a key skill here!). This should be
detailed and clear, and include *any* contribution you made to the project.

THEMES
The main themes of the project are fear, insanity and speed. For fear, I created suspensful gameplay by
having the ghost spawn and despawn randomly, keeping the player on their toes. Not only this I used the 
chase function to make it more tense. This ties into speed as the player has to run away from the ghost 
try to escape before they go insane, which leads me into the sanity aspect. Not only does sanity decrease
just by being in the house, but it decreases faster when the ghost is nearby, chasing you or even faster
when it collides with you. On top of this, the screen starts flickering and the sanity bar chances colour 
as it gets lower. This all combined promotes the themes of fear, insanity and speed, while conforming to    
norms of traditional psychological horror games.

DESIGN
Discuss the overall mechanical aspects of the project. Think about how it connects with your themes
above if you did not already cover it there. You should also discuss how your design was informed by your
understanding of the technical systems that you were taught in class (and particular those required by
the assessment brief).

AESTHETIC DIMENSIONS
To ensure the artstyle remained the same for the project there was one artist. Colour scheme was to stick to yellows 
(theme of insanity), purple (theme of fear) and red (theme of danger/urgency) and blues (sadness but also calmness) 
and overall dark colours.

As a group, how did you ensure parity between the aesthetic, technical and thematic demands of the
project? Again, think about how your artistic and/or aesthetic choices were informed by your understanding
of the technical systems of the project.

font used: https://www.dafont.com/game-over.font?text=click+SPACE+to+start

UNREALISED ASPECTS OF PROJECT
If I had more time, I would've implemented more puzzle based interactions, for example like the saef but it would
be slotting the right key into the keyhole, dragging the book onto the bookcase, finding puzzle pieces around
the house to form an image, (maybe another ending or just for more of a narrative). These would be done similarly
to how the safe "game" was implemented: changing the gamestate and then taking user input and having a right and
wrong input. For example dragging an image of the correct book/key into the shelf space/keyhole and if the positions
match, gamestate = 1 and the action is successful and if not you try again. 

I also would have liked to implement more of a narrative/cut scenes, for example for the endings or as the ghost is 
chasing you around. Even just having more items that connote a story, like photographs that enlarge on the screen when 
equipped, simply just by printing the image when equipped (sort of like when you equip the paper with the code on it). 

I would also like to have added audio, for example eerie background music or sounds, and intense music/heartbeats for
when the ghost is chasing oyu or your sanity is low. Also interacting with objects would make sounds, for example 
opening and closing doors or unlocking something.

I would have liked for the artwork to be more detailed/the proportions of it to be more accurate, for example the walls 
or the doors. Due to time, this was difficult. Not only this I wanted some objetcs to change when unlucked or an image 
was taken/put back, for example the bookshelves had different states (found in images) but I did not have time to 
implemement this. I also would have liked the character to actually appear in the direction they were factng but did
not have time to implement this. 

Finally I would have liked to make a more in depth ghost, where it patrols around the house and has a complex path 
finding algorithm. When the ghost comes the player has to hide, which also means adding a hiding system which I would
implement by when the character approaches a table, for example, and clicks 'H' or shift their sprite disappears and 
they're in state 'hiding' which would be a state that cannot trigger the ghosts chase() function. I would also like 
to add more ghosts or the parents ghosts haunting just their room as it is a room that the main ghost cannot enter.

note - sometimes using the silver key does not open the upstairs ghost bedroom door. I couldn't figure out 
why or how to fix it. it usually works if it is the only/first thing in your inventory.

NARRATIVE
While I did not have time to complete a full narrative, the implied narrative was that the ghost is haunting her 
childhood home. It is uncovered (by finding the secret room) that she used to be locked in a basement where you can
find her teddy that was left in there. the ghost refuses to go back into the room but bringing it to her gives her 
peace. She is unable to go into her parents room as she was never allowed in there as a child (and if i implemented 
her parents as ghosts in their bedroom, teh reason was also since she locked them in their room, hence why she has 
the key hidden in her room)