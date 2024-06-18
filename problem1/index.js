//Using recursion (Time Complexity: O(n))
var sum_to_n_a = function (n) {
  if (n < 0) {
    return 0;
  }
  return n + sum_to_n_a(n - 1);
};

//Using formula (Time Complexity: O(1))
var sum_to_n_b = function (n) {
  // your code here
  return (n * (n + 1)) / 2;
};

//using reduce (Time Complexity: O(n))
var sum_to_n_c = function (n) {
  // your code here
  return Array.from({ length: n }, (_, i) => i + 1).reduce((a, b) => a + b, 0);
};
