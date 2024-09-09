let arrs =[23,22,1123,11,23213,4,3234343,1111,1009]

function sort(arr) {
  if(arr.length<=1){
    return arr
  }
  let left = []
  let right = []
  let pivot
  pivot = Math.floor(arr.length/2)
  for (let i = 0; i < arr.length; i++) {
    if (i === pivot) {
      continue;
    }
    if(arr[i]<arr[pivot]){
      left.push(arr[i])
    }else{
      right.push(arr[i])
    }
  }
  return [...sort(left),arr[pivot],...sort(right)]
}

console.log(sort(arrs));