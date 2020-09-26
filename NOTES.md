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

What if you set your _x_ to be the total columns of the mine? Then the algorithm will consider every possible move and is guaranteed to make the correct choice each time.

#### Problems with the brute-force approach

- The algorithm's time performance is unacceptable when the number of columns is large. In particular, we know that the algorithm in general needs to make a binary decision at each column (although it can make 3 possible moves, one is always restricted), so the time complexity becomes _O_(2^n), where n is the number of columns.

  - There is no pragmatic considerations about which branches are promising and should be explored, and which branches can be considered "dead" and left alone.
  - Since there is no attempt to globally store information about the mine, there are a lot of duplicate and unnecessary calculations.
