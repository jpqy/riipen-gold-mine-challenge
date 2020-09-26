# Notes and thoughts about the gold-mine problem

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Initial thoughts](#initial-thoughts)
  - [Greedy algorithm](#greedy-algorithm)
    - [Algorithm time complexity](#algorithm-time-complexity)
    - [Problems with this simple greedy algorithm](#problems-with-this-simple-greedy-algorithm)
  - [Greedy-algorithm with _x_ moves lookahead](#greedy-algorithm-with-_x_-moves-lookahead)
    - [Problems with _x_ move lookahead](#problems-with-_x_-move-lookahead)
  - [Brute-force approach](#brute-force-approach)
    - [Problems with the brute-force approach](#problems-with-the-brute-force-approach)
- [Towards a better algorithm](#towards-a-better-algorithm)
  - [Initial ideal for a better algorithm](#initial-ideal-for-a-better-algorithm)
  - [1. Calculating the sum of the next column](#1-calculating-the-sum-of-the-next-column)
  - [2. Storing direction info and iterating](#2-storing-direction-info-and-iterating)
  - [3. Final iteration and working backwards](#3-final-iteration-and-working-backwards)
  - [Coding the algorithm](#coding-the-algorithm)
    - [Coding plan](#coding-plan)

<!-- /code_chunk_output -->

## Initial thoughts

### Greedy algorithm

An initial, simple algorithm that comes to mind is a "greedy" algorithm that doesn't think far ahead and simply goes with the most immediate gain (i.e. square with the most gold) each time. A pseudocode for this algorithm would look as follows:

1. In the first column, find the row with the highest gold and start there.
2. Look at the three (maybe 2 if starting on edge of mine) possible squares in the next column and compare the number of gold in each.
3. Move to the square with the highest gold and keep track of the direction of the move.
4. Taking into account the previous move, look at the two (maybe one if starting on edge) squares that can be legally moved into and compare the gold in each.
5. Move to the square with the higher gold and keep track of the direction of the move.
6. Repeat steps 4-5 until the X position is outside of the mine.

#### Algorithm time complexity

Adding a new column would mean the algorithm has to make only one more decision. Therefore the time complexity is _O_(_n_), where _n_ is the number of columns in the mine. (The number of rows only matters for the first decision and is therefore a constant time)

#### Problems with this simple greedy algorithm

- Because of its shortsightedness, this algorithm can easily be manipulated by mines such as the following:

  |       |       |
  | ----- | ----- |
  | 5     | 9     |
  | 6     | 9     |
  | 7     | **0** |
  | **9** | **0** |

  Here, the algorithm would choose to start at the 9 position and be stuck with 0 gold for its next move due its shortsightedness.

Therefore, any good solution to the gold-mine problem must look further than one move ahead.

### Greedy-algorithm with _x_ moves lookahead

A smarter greedy-algorithm would employ some kind of lookahead before deciding one which course to take. In the above example, instead of looking only at the highest value of the first column only (9), a 1-move lookahead algorithm would try to find the highest sum that can be made with the first 2 columns. It would find that 7+9 gives the highest sum of all, and avoid starting at the 9 as the simple greedy algorithm would have done.

#### Problems with _x_ move lookahead

- In the _x_ move lookahead, any value of _x_ lower than the total columns of the mine is an approximate approach, as there can always be a tricky mine constructed in a way that gives you a different, suboptimal solution when your lookahead is _x_ instead of _x+1_.

### Brute-force approach

What if you set your _x_ to be the total columns of the mine? Then the algorithm will consider every possible move and is guaranteed to make the correct choice each time. A recursive algorithm could be designed that calculated the sum of every possible route through the mine, which allows us to get the path that led to the highest sum.

#### Problems with the brute-force approach

- The algorithm's time performance is unacceptable when the number of columns is large. In particular, we know that the algorithm in general needs to make a binary decision at each column (although it can make 3 possible moves, one is always restricted), so the time complexity becomes _O_(2^n), where n is the number of columns.

  - There is no pragmatic considerations about which branches are promising and should be explored, and which branches can be considered "dead" and left alone.
  - Since there is no attempt to globally store information about the mine, there are a lot of duplicate and unnecessary calculations.

## Towards a better algorithm

A better algorithm can be developed that provides a reasonable runtime and good (maybe perfect) accuracy by addressing this point:

> - Since there is no attempt to globally store information about the mine, there are a lot of duplicate and unnecessary calculations.

Instead of recursively exploring each path, this algorithm would ideally look at the mine as a whole and calculate each square once.

### Initial ideal for a better algorithm

This idea came when staring at a 2D array of numbers like the one below:

|     |     |     |     |
| --- | --- | --- | --- |
| 1   | 2   | 2   | 4   |
| 6   | 9   | 8   | 7   |
| 6   | 1   | 0   | 1   |
| 9   | 5   | 4   | 7   |

What if we did a sweep of the mine from left to right and kept adding the numbers? We would add the numbers from the first and second columns and store it in the second column. Since the second column can legally make a sum with up to 3 numbers in the first column, it would obviously choose the highest number. For example, 2 would choose to sum with 6 instead of 1. We can thus calculate the second column like so:

### 1. Calculating the sum of the next column

|     |       |     |     |
| --- | ----- | --- | --- |
| 1   | 2 + 6 | 2   | 4   |
| 6   | 9 + 6 | 8   | 7   |
| 6   | 1 + 9 | 0   | 1   |
| 9   | 5 + 9 | 4   | 7   |

|     |        |     |     |
| --- | ------ | --- | --- |
| 1   | **8**  | 2   | 4   |
| 6   | **15** | 8   | 7   |
| 6   | **10** | 0   | 1   |
| 9   | **14** | 4   | 7   |

### 2. Storing direction info and iterating

For the third column, we need to make sure each square is legally able to sum with the second column. In the above example, the **10** was achieved by an upward move and thus the 8 in the third column cannot combine with it as that would be two upward moves in a row. We can take care of this by also including a direction flag of the move that it took to get to each square, like so, where **u, r, d** means an upward, right, or downward move was made to reach the square.

|     |          |     |     |
| --- | -------- | --- | --- |
| 1   | **8u**   | 2   | 4   |
| 6   | **15ur** | 8   | 7   |
| 6   | **10u**  | 0   | 1   |
| 9   | **14r**  | 4   | 7   |

Now, when the 8 in the third column is considering which square in the second column to sum with, it knows it cannot sum with **10u** because that would mean 2 upwards moves in a row. In this case, it sums with **15ur**. The **ur** multiflag indicates that **15ur** can be reached from two directions, so it actually has no restrictions on its next move. The next column is thus calculated like so:

|     |          |              |     |
| --- | -------- | ------------ | --- |
| 1   | **8u**   | 2 + **15ur** | 4   |
| 6   | **15ur** | 8 + **15ur** | 7   |
| 6   | **10u**  | 0 + **15ur** | 1   |
| 9   | **14r**  | 4 + **10u**  | 7   |

_Note: 4 cannot combine with **14r** due to its flag_

|     |          |         |     |
| --- | -------- | ------- | --- |
| 1   | **8u**   | **17u** | 4   |
| 6   | **15ur** | **23r** | 7   |
| 6   | **10u**  | 0       | 1   |
| 9   | **14r**  | **14d** | 7   |

_Note: landing on a 0 square actually stops the mining so we need to set the sum to 0 to reflect that it should be avoided_

### 3. Final iteration and working backwards

And finally, we do the last calculation:

|     |          |         |             |
| --- | -------- | ------- | ----------- |
| 1   | **8u**   | **17u** | 4 + **23r** |
| 6   | **15ur** | **23r** | 7 + **17u** |
| 6   | **10u**  | 0       | 1 + **23r** |
| 9   | **14r**  | **14d** | 7 + **14d** |

|     |          |         |         |
| --- | -------- | ------- | ------- |
| 1   | **8u**   | **17u** | **27u** |
| 6   | **15ur** | **23r** | **24d** |
| 6   | **10u**  | 0       | **24d** |
| 9   | **14r**  | **14d** | **21r** |

We now can see that the **27u** ended up with the highest gold. As a bonus, we can use the direction flags to retrace the path that was taken. For example, we know **27u** was reached from an upwards move, so we know **23r** was the previous square. Going backwards, we get:

`27u > 23r > 15u > 6 (the third row square)`

Working backwards again, we now know the optimal path starts at the 6 in the third row, then goes up, right, then up.

_Note: when deciding between 15u and 15r, we know 15r is impossible because it is preceded by 23r and there can be no back-to-back repeated directions. Thus, we reject 15r as a possibility._

### Coding the algorithm

The challenge requires modification of a `move` function that accepts an array representing the mine, a tuple representing the current position, and must return a tuple representing the next move.

Since the proposed algorithm calculate the optimal path once, it needs to be run once when a new mine is given, and store the optimal path outside of the `move` function. The `move` function would then need to access the data about the optimal path produced by the algorithm.

Depending on how `index.js` is set up, logic may need to be added to detect when the mine is changed to ensure the algorithm is re-run for a new mine.

#### Coding plan

1. Write a function that takes an array representing the first column, an array representing the second column, and returns an array representing the "summed" second column with a direction flag

2. Write a function that takes a 2D array representing the mine and uses the above function to produce a 2D array similar to [the final table](#3-final-iteration-and-working-backwards)

3. Write a function that takes an array produced by the function above and works backwards to return the best path, maybe just in string form (i.e. "RDURDURDR")

4. Make the `move` function read from the directions and return appropriate positions
