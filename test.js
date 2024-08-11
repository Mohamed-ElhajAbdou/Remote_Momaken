const dfd = require("danfojs-node");

// Create a DataFrame
const data = {
  'A': [1, 2, 3, 4],
  'B': [5, 6, 7, 8],
  'C': [9, 10, 11, 12]
};

const df = new dfd.DataFrame(data);

// Display the DataFrame
df.print();

// Perform some operations
const df2 = df.add(5);
df2.print();

