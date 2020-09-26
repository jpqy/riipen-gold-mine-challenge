# Notes and thoughts about the gold-mine problem

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Initial thoughts](#initial-thoughts)
  - [Greedy algorithm](#greedy-algorithm)
    - [Algorithm time complexity](#algorithm-time-complexity)
    - [Problems with this simple greedy algorithm](#problems-with-this-simple-greedy-algorithm)

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
