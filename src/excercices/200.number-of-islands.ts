import { expect } from 'earljs';

/*
Given an m x n 2D binary grid grid which represents a map of '1's (land) and
'0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands
horizontally or vertically. You may assume all four edges of the grid are all
surrounded by water.

Example 1:

Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
Example 2:

Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 300
grid[i][j] is '0' or '1'.
*/

/*
This solution visits all the nodes within the grid and keeps a counter
with the number of islands it encounters.
When it encounters a new island (element whose value is '1'), it increases
the counter and inmediately after uses DFS to convert all the land positions
belonging to that island to '0' (sinks the island). This is relatively simple
for each node we visit during the sinking process, we check which of its adjacent
nodes (top, down, left, right) are sinkable (inside the boundaries and not water)
and it continues sinking all adjacent nodes recursively until the island is gone.

I assumed it was ok to use an in-place algorithm (meaning I am mutating the original
grid structure). I did it like this in order to keep the space complexity constant.

But in a production case situation, I wouldn't mutate the original 2d grid and I think
it would lead to unpredictability and bugs.

Time complexity: O(n * m) n -> num of rows and m -> num of columns
Space complexity: O(1)
*/
function numIslands(grid: string[][]): number {
    let islandCount = 0;
    let n = grid.length;
    let m = grid[0].length;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (grid[i][j] === '1') {
                islandCount++;
                sinkLand(grid, i, j);
            }
        }
    }


    return islandCount;
};

function sinkLand(grid: string[][], row: number, col: number) {
    if (grid[row][col] === '0') return;

    grid[row][col] = '0';

    if (row > 0) sinkLand(grid, row - 1, col);
    if (row < grid.length - 1) sinkLand(grid, row + 1, col);
    if (col > 0) sinkLand(grid, row, col - 1);
    if (col < grid[0].length - 1) sinkLand(grid, row, col + 1);
}

/*
This is an alternative solution, very similar to the above one but instead of
mutating the original grid to swtich '1's to '0's when visiting them, it uses an
auxiliary visited grid. We use visited[][] to control the nodes we have already
visited so that we don´t evaluate them again. Every time it finds a new island
it marks all its land blocks and water borders as visited.

Time complexity: O(n * m) n -> num of rows and m -> num of columns
Space complexity: O(n * m) from the additional 2d array
*/
function numIslandsPure(grid: string[][]): number {
    let islandCount = 0;
    let n = grid.length;
    let m = grid[0].length;
    let visited = buildVisitedMatrix(n, m);

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (grid[i][j] === '1' && !visited[i][j]) {
                islandCount++;
                updateVisitedMatrix(grid, visited, i, j);
            }
        }
    }


    return islandCount;
}

function buildVisitedMatrix(n: number, m: number): boolean[][] {
    let arr = [];

    for (let i = 0; i < n; i++) {
        let inner = [];
        for (let j = 0; j < m; j++) {
            inner.push(false);
        }
        arr.push([...inner]);
    }

    return arr;

    // Fill does not work here because it uses reference objects which leads to
    // unwanted mutations.
    //return Array.from({ length: n }).fill([...Array.from({ length: m }).fill(false)]) as boolean[][];
}

function updateVisitedMatrix(grid: string[][], visited: boolean[][], row: number, col: number) {
    if (row < 0 || col < 0 || row > grid.length - 1 || col > grid[0].length - 1 || visited[row][col])
        return;

    visited[row][col] = true;

    if (grid[row][col] !== '0') {
        updateVisitedMatrix(grid, visited, row - 1, col);
        updateVisitedMatrix(grid, visited, row + 1, col);
        updateVisitedMatrix(grid, visited, row, col - 1);
        updateVisitedMatrix(grid, visited, row, col + 1);
    }
}

const grid1 = [["1", "1", "0", "0", "0"], ["1", "1", "0", "0", "0"], ["0", "0", "1", "0", "0"], ["0", "0", "0", "1", "1"]];
const grid2 = [["0", "1", "0"], ["1", "0", "1"], ["0", "1", "0"]];

expect(numIslands(grid1)).toEqual(3)
expect(numIslands(grid2)).toEqual(4)

/*
grid1
[
["1","1","0","0","0"],
["1","1","0","0","0"],
["0","0","1","0","0"],
["0","0","0","1","1"]]
*/
