console.time();
function tailRecur(n, res) {
  // 终止条件
  if (n === 0) return res;
  // 尾递归调用
  return tailRecur(n - 1, res + n);
}

tailRecur(10000);
console.timeEnd();
