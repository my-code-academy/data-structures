const testObj = require('./main');

describe('testFunction()', () => {
    it('input array should have only positive numbers', () => {
        expect(testObj.testFunction([2,3,4,-5,6])).toThrow('invalid input: Input has negative elements');
    });
    xit('input array should have only positive numbers', () => {
        expect(testObj.testFunction([2,3,5,5,6])).toThrow('invalid input: Input has duplicate elements');
    });
})