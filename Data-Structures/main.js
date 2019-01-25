
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
    while (array[currIndex] > currElement) {
        array[currIndex + 1] = array[currIndex];
        currIndex--;
    }
    array[currIndex + 1] = currElement;
    return array;
}

const insertAtRightPosition = (array, currElement, minElementIndex) => {
    let currIndex = minElementIndex;
    while (array[currIndex] < currElement) {
        array[currIndex + 1] = array[currIndex];
        currIndex++;
    }
    array[currIndex - 1] = currElement;
    return array;
}

const findPositionToInsert = (array, currElement) => {
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] < currElement && array[i + 1] > currElement && array[i] != -1) {
            return i + 1;
        }
        if (array[i] > currElement && array[i + 1] < currElement && array[i] != -1) {
            return i;
        }
    }
}

inputArray = [25, 57, 37, 48, 12, 92, 86, 33];
// inputArray = [1,2,3,4,5];
if (hasNegativeElements(inputArray)) {
    return new Error('invalid input: Input has negative elements');
} else if (hasDuplicates(inputArray)) {
    return new Error('invalid input: Input has duplicate elements');
}
let resultArray = Array(inputArray.length).fill(-1);

let minElementIndex = -1, maxElementIndex = -1;

for (let i = 0; i < inputArray.length; i++) {
    let currentNumber = inputArray[i];
    if (minElementIndex === -1 && maxElementIndex === -1) {
        resultArray[0] = currentNumber;
        minElementIndex = -1;
        maxElementIndex = 0;
    } else if (currentNumber > resultArray[maxElementIndex]) {
        resultArray[maxElementIndex + 1] = currentNumber;
        maxElementIndex++;
    } else if (currentNumber < resultArray[0] && minElementIndex === -1) {
        resultArray[resultArray.length - 1] = currentNumber;
        minElementIndex = inputArray.length - 1;
    } else if (currentNumber < resultArray[minElementIndex]) {
        resultArray[minElementIndex - 1] = currentNumber;
        minElementIndex--;
    } else {
        let pos = findPositionToInsert(resultArray, currentNumber);
        if (pos <= maxElementIndex) {
            if (maxElementIndex - pos <  pos) {
                resultArray = insertAtLeftPosition(resultArray, currentNumber, maxElementIndex);
                maxElementIndex++;
            } else {
                for (let j = 0; j < pos; j++) {
                    let index = resultArray.indexOf(-1);
                    if (index > -1) {
                        resultArray.splice(index, 1);
                    }
                }
                resultArray = rotateRightFromPosition(resultArray, pos);
                resultArray.unshift(currentNumber);
            }
        } else {
            if (pos - minElementIndex < inputArray.length - pos) {
                resultArray = insertAtRightPosition(resultArray, currentNumber, minElementIndex);
                minElementIndex--;
            } else {
                for (let j = 0; j < pos; j++) {
                    let index = resultArray.indexOf(-1);
                    if (index > -1) {
                        resultArray.splice(index, 1);
                    }
                }
                resultArray = rotateLeftFromPosition(resultArray, pos);
                resultArray.push(currentNumber);
            }
        }
    }

    // if(Math.min(Math.abs(maxElementIndex-pos), Math.abs(array.length-maxElementIndex-pos)) < Math.min(Math.abs(minElementIndex-pos), Math.abs(array.length-minElementIndex-pos))) {
    //     resultArray = insertAtLeftPosition(resultArray, currentNumber, maxElementIndex);
    //     maxElementIndex++;
    // }
};
console.log(resultArray);

//module.exports = { testFunction };