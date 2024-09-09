class MinHeap {
  constructor() {
      this.heap = [];
  }

  // 获取父节点索引
  getParentIndex(index) {
      return Math.floor((index - 1) / 2);
  }

  // 获取左子节点索引
  getLeftChildIndex(index) {
      return index * 2 + 1;
  }

  // 获取右子节点索引
  getRightChildIndex(index) {
      return index * 2 + 2;
  }

  // 交换数组中两个元素的位置
  swap(i, j) {
      [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  // 向下调整堆，确保以 index 为根节点的子树满足最小堆的性质
  minHeapify(index) {
      const leftChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);
      let smallest = index;

      // 与左子节点比较
      if (leftChildIndex < this.heap.length && this.heap[leftChildIndex].val < this.heap[smallest].val) {
          smallest = leftChildIndex;
      }

      // 与右子节点比较
      if (rightChildIndex < this.heap.length && this.heap[rightChildIndex].val < this.heap[smallest].val) {
          smallest = rightChildIndex;
      }

      // 如果最小值不是当前节点，则交换并继续向下调整
      if (smallest !== index) {
          this.swap(index, smallest);
          this.minHeapify(smallest);
      }
  }

  // 插入元素到堆中
  insert(node) {
      this.heap.push(node);
      let currentIndex = this.heap.length - 1;

      // 向上调整堆
      while (currentIndex !== 0 && this.heap[currentIndex].val < this.heap[this.getParentIndex(currentIndex)].val) {
          this.swap(currentIndex, this.getParentIndex(currentIndex));
          currentIndex = this.getParentIndex(currentIndex);
      }
  }

  // 从堆中删除并返回最小元素
  extractMin() {
      if (this.heap.length === 0) {
          return null;
      }

      if (this.heap.length === 1) {
          return this.heap.pop();
      }

      const minNode = this.heap[0];
      this.heap[0] = this.heap.pop();
      this.minHeapify(0);
      return minNode;
  }

  // 获取堆顶元素（最小元素）
  peek() {
      return this.heap[0];
  }

  // 获取堆的大小
  size() {
      return this.heap.length;
  }
}

function sortNearlySortedArray(arr, k) {
  const result = [];
  const minHeap = new MinHeap();

  // 将前 k+1 个元素加入堆中
  for (let i = 0; i <= k && i < arr.length; i++) {
      minHeap.insert({ val: arr[i], index: i });
  }

  let nextIndexToRead = k + 1;

  // 依次取出堆顶元素，加入结果数组，并将下一个元素加入堆中
  while (minHeap.size() > 0) {
      const minNode = minHeap.extractMin();
      result.push(minNode.val);

      if (nextIndexToRead < arr.length) {
          minHeap.insert({ val: arr[nextIndexToRead], index: nextIndexToRead });
          nextIndexToRead++;
      }
  }

  return result;
}

// 示例
const arr = [2, 6, 3, 12, 56, 8];
const k = 3;
const sortedArray = sortNearlySortedArray(arr, k);
console.log("有序数组：", sortedArray); // 输出：[2, 3, 6, 8, 12, 56]