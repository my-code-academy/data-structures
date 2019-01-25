
const hasDuplicates = (array) => {
    return (new Set(array)).size !== array.length;
}

const hasNegativeElements = (array) => {
    return array.some(x => x < 0);
}

const rotateRightFromPosition = (array, pos) => {
    return array.splice(pos).concat(array);
}

const rotateLeftFromPosition = (array, pos) => {
    return array.splice(-pos).concat(array);
}

const insertAtLeftPosition = (array, currElement, maxElementIndex) => {
    let currIndex = maxElementIndex;
    while(array[currIndex] > currElement) {
        array[currIndex+1] = array[currIndex];
        currIndex--;
    }
    array[currIndex+1] = currElement;
    return array;
}

const insertAtRightPosition = (array, currElement, minElementIndex) => {
    let currIndex = minElementIndex;
    while(array[currIndex] < currElement) {
        array[currIndex+1] = array[currIndex];
        currIndex++;
    }
    array[currIndex-1] = currElement;
    return array;
}

const testFunction = (inputArray) => {
    inputArray = [25, 57, 37, 48, 12, 92, 86, 33];
    // inputArray = [1,2,3,4,5];
    if (hasNegativeElements(inputArray)) {
        return new Error('invalid input: Input has negative elements');
    } else if(hasDuplicates(inputArray)) {
        return new Error('invalid input: Input has duplicate elements');
    }
    let resultArray = [-1, -1, -1, -1, -1, -1, -1];

    let minElementIndex = -1, maxElementIndex  = -1;

    for(let i = 0; i < inputArray.length; i++) {
        let currentNumber = inputArray[i];
        if (minElementIndex === -1 && maxElementIndex === -1) {
            resultArray[0] = currentNumber;
            minElementIndex = -1;
            maxElementIndex = 0;
        } else if(currentNumber > resultArray[maxElementIndex] && minElementIndex === -1) {
            resultArray[maxElementIndex+1] = currentNumber;
            maxElementIndex++;
        } else if(currentNumber < resultArray[0] && minElementIndex === -1) {
            resultArray[resultArray.length-1] = currentNumber;
            minElementIndex = inputArray.length-1;
        } else if(currentNumber < resultArray[minElementIndex]) {
            resultArray[minElementIndex-1] = currentNumber;
            minElementIndex--;
        } else if(currentNumber < resultArray[maxElementIndex] && minElementIndex === -1) {
            resultArray = insertAtLeftPosition(resultArray, currentNumber, maxElementIndex);
            maxElementIndex++;
        } 
    };
    
    console.log(resultArray);
}

testFunction([4,5]);

//console.log(insertAtRightPosition([12,14,-1,-1,6,7], 3, 4));
//testFunction([2,3,4,-5,6]);

module.exports = {testFunction};