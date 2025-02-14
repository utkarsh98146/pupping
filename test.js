// const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// console.log(typeof (nums))

// const filterNum = nums.filter((num) => num > 6)
// console.log(typeof (filterNum))

// const mapNum = nums.map((num) => { num > 8 })
// console.log(mapNum)

// console.log(typeof (mapNum))

const myNums = [1, 2, 3, 1]

const totalNum = myNums.reduce((total, curr) => total + curr, 20)
console.log(totalNum)