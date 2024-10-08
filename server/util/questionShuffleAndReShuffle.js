// Function to shuffle an array using Fisher-Yates algorithm
exports.shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }
  
  // Function to rearrange the original values based on the shuffled order
 exports.rearrangeArray = (originalArray,shuffledArray) =>  {
    const rearrangedArray = [];
    for (let i = 0; i < originalArray.length; i++) {
        rearrangedArray.push(shuffledArray[originalArray.indexOf(i)])
    }
    return rearrangedArray;
  }
  

//   // Example usage
//   const originalArray = [1, 2, 3, 4, 5];
//   const shuffledArray = [...originalArray]; // Create a copy to shuffle
  
//   shuffleArray(shuffledArray);
  
//   console.log('Original Array:', originalArray);
//   console.log('Shuffled Array:', shuffledArray);
  
//   const rearrangedArray = rearrangeArray(originalArray, shuffledArray);
//   console.log('Rearranged Array:', rearrangedArray);