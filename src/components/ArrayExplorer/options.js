// examples
import {
  spliceExample,
  spliceExampleOutput,
  spliceSecondExample,
  spliceSecondExampleOutput,
  pushExample,
  pushExampleOutput,
  unshiftExample,
  unshiftExampleOutput,
  concatExample,
  concatExampleOutput,
  popExample,
  popExampleOutput,
  shiftExample,
  shiftExampleOutput,
  sliceExample,
  sliceExampleOutput,
  includesExample,
  includesExampleOutput,
  indexOfExample,
  indexOfExampleOutput,
  lastIndexOfExample,
  lastIndexOfExampleOutput,
  findExample,
  findExampleOutput,
  findIndexExample,
  findIndexExampleOutput,
  reduceExample,
  reduceExampleOutput,
  reduceRightExample,
  reduceRightExampleOutput,
  filterExample,
  filterExampleOutput,
  everyExample,
  everyExampleOutput,
  someExample,
  someExampleOutput,
  forEachExample,
  forEachExampleOutput,
  mapExample,
  mapExampleOutput,
  entriesExample,
  entriesExampleOutput,
  joinExample,
  joinExampleOutput,
  toStringExample,
  toStringExampleOutput,
  toLocaleStringExample,
  toLocaleStringExampleOutput,
  reverseExample,
  reverseExampleOutput,
  sortExample,
  sortExampleOutput,
  lengthExample,
  lengthExampleOutput,
  fillExample,
  fillExampleOutput,
  copyWithinExample,
  copyWithinExampleOutput,
} from "./codeExamples";

export const options = [
  {
    secondSelectText: "I need to add",
    label: "add items or other arrays",
    secondOptions: [
      {
        label: "elements/s to an array",
        helper: "Array.splice()",
        helperDescription: "Adds and/or removes elements from an array.",
        usage: spliceExample,
        output: spliceExampleOutput,
      },
      {
        label: "elements/s to the end of an array",
        helper: "Array.push()",
        helperDescription:
          "Adds one or more elements to the end of an array and returns the new length of the array.",
        usage: pushExample,
        output: pushExampleOutput,
      },
      {
        label: "elements/s to the front of an array",
        helper: "Array.unshift()",
        helperDescription:
          "Adds one or more elements to the front of an array and returns the new length of the array.",
        usage: unshiftExample,
        output: unshiftExampleOutput,
      },
      {
        label: "this array to other array(s) and/or value(s)",
        helper: "Array.concat()",
        helperDescription:
          "Returns a new array comprised of this array joined with other array(s) and/or value(s).",
        usage: concatExample,
        output: concatExampleOutput,
      },
    ],
  },
  {
    secondSelectText: "I need to remove",
    label: "remove items",
    secondOptions: [
      {
        label: "elements/s from an array",
        helper: "Array.splice()",
        helperDescription: "Adds and/or removes elements from an array.",
        usage: spliceSecondExample,
        output: spliceSecondExampleOutput,
      },
      {
        label: "the last element of the array",
        helper: "Array.pop()",
        helperDescription:
          "Removes the last element from an array and returns that element.",
        usage: popExample,
        output: popExampleOutput,
      },
      {
        label: "the first element of an array",
        helper: "Array.shift()",
        helperDescription:
          "Removes the first element from an array and returns that element.",
        usage: shiftExample,
        output: shiftExampleOutput,
      },
      {
        label: "one or more elements in order for use, leaving the array as is",
        helper: "Array.slice()",
        helperDescription: `The slice() method returns a shallow copy of a portion of an array into a new array object. You can specify either just the beginning element 
(where end will default to the arrays length) or both the beginning and the end, comma-separated. The original array will not be modified.`,
        usage: sliceExample,
        output: sliceExampleOutput,
      },
    ],
  },
  {
    secondSelectText: `I'm trying to find`,
    label: "find items",
    secondOptions: [
      {
        thirdSelectText: `I need to find`,
        label: "one item",
        thirdOptions: [
          {
            label: `out if a certain element exists`,
            helper: "Array.includes()",
            helperDescription:
              "Determines whether an array contains a certain element, returning true or false as appropriate.",
            usage: includesExample,
            output: includesExampleOutput,
          },
          {
            label: `the first index of a particular item`,
            helper: "Array.indexOf()",
            helperDescription:
              "Returns the first index at which a given element can be found in the array, or -1 if it is not present.",
            usage: indexOfExample,
            output: indexOfExampleOutput,
          },
          {
            label: `the last index of a particular item`,
            helper: "Array.lastIndexOf()",
            helperDescription:
              "Returns the last (greatest) index of an element within the array equal to the specified value, or -1 if none is found.",
            usage: lastIndexOfExample,
            output: lastIndexOfExampleOutput,
          },
          {
            label: `the first element that satisfies a condition`,
            helper: "Array.find()",
            helperDescription:
              "Returns the found value in the array, if an element in the array satisfies the provided testing function or undefined if not found. Similar to findIndex(), but it returns the item instead of the index.",
            usage: findExample,
            output: findExampleOutput,
          },
          {
            label: `the first index of an item that satisfies a condition`,
            helper: "Array.findIndex()",
            helperDescription:
              "Returns the index of the first element in the array that satisfies the provided testing function. Otherwise -1 is returned. Similar to find(), but it returns the index instead of the item.",
            usage: findIndexExample,
            output: findIndexExampleOutput,
          },
          {
            label: `a value by reducing the Array, start to finish`,
            helper: "Array.reduce()",
            helperDescription:
              "Apply a function against an accumulator and each value of the array (from left-to-right) as to reduce it to a single value.",
            usage: reduceExample,
            output: reduceExampleOutput,
          },
          {
            label: `a value by reducing the Array, finish to start`,
            helper: "Array.reduceRight()",
            helperDescription:
              "Apply a function against an accumulator and each value of the array (from right-to-left) as to reduce it to a single value.",
            usage: reduceRightExample,
            output: reduceRightExampleOutput,
          },
        ],
      },
      {
        thirdSelectText: `I need to find`,
        label: "one or many items",
        thirdOptions: [
          {
            label: `values based on a condition I create`,
            helper: "Array.filter()",
            helperDescription:
              "Creates a new array with all of the elements of this array for which the provided filtering function returns true.",
            usage: filterExample,
            output: filterExampleOutput,
          },
          {
            label: `whether or not every item satisfies a condition`,
            helper: "Array.every()",
            helperDescription:
              "Returns true if every element in this array satisfies the provided testing function.",
            usage: everyExample,
            output: everyExampleOutput,
          },
          {
            label: `whether or not at least one item satisfies a condition`,
            helper: "Array.some()",
            helperDescription:
              "Returns true if at least one element in this array satisfies the provided testing function.",
            usage: someExample,
            output: someExampleOutput,
          },
        ],
      },
    ],
  },
  {
    secondSelectText: "I need to iterate by",
    label: "walk over items",
    secondOptions: [
      {
        label: `executing a function I will create for each element`,
        helper: "Array.forEach()",
        helperDescription:
          "The forEach() method executes a provided function once for each array element.",
        usage: forEachExample,
        output: forEachExampleOutput,
      },
      {
        label: `creating a new array from each element with a function I create`,
        helper: "Array.map()",
        helperDescription:
          "Creates a new array with the results of calling a provided function on every element in this array.",
        usage: mapExample,
        output: mapExampleOutput,
      },
      {
        label: `creating an interator object`,
        helper: "Array.entries()",
        helperDescription:
          "Returns a new Array Iterator object that contains the key/value pairs for each index in the array. There are a lot of uses for iterators, as well as other methods used with it in conjuction, like values and keys",
        usage: entriesExample,
        output: entriesExampleOutput,
      },
    ],
  },
  {
    secondSelectText: "I need to",
    label: "return a string",
    secondOptions: [
      {
        label: `executing a function I will create for each element`,
        helper: "Array.join()",
        helperDescription:
          "Joins all elements of an array into a string. You can join it together as is or with something in between, elements.join(" -
          ") gives you foo-bar",
        usage: joinExample,
        output: joinExampleOutput,
      },
      {
        label: `return a string representing the array`,
        helper: "Array.toString()",
        helperDescription:
          "Returns a string representing the array and its elements.",
        usage: toStringExample,
        output: toStringExampleOutput,
      },
      {
        label: `return a localized string representing the array`,
        helper: "Array.toLocaleString()",
        helperDescription:
          "Returns a localized string representing the array and its elements. This is very useful for dates and currency and has some strange native abstractions, so best to consult the docs when using it",
        usage: toLocaleStringExample,
        output: toLocaleStringExampleOutput,
      },
    ],
  },
  {
    secondSelectText: "I need to",
    label: "order an array",
    secondOptions: [
      {
        label: `reverse the order of the array`,
        helper: "Array.reverse()",
        helperDescription:
          "Reverses the order of the elements of an array in place - the first becomes the last, and the last becomes the first.",
        usage: reverseExample,
        output: reverseExampleOutput,
      },
      {
        label: `sort the items of the array`,
        helper: "Array.sort()",
        helperDescription: `Sorts the elements of an array in place and returns the array.

Important note: If compareFunction is not supplied, elements are sorted by converting them to strings and comparing strings in Unicode code point order. 
For example, "Banana" comes before "cherry". In a numeric sort, 9 comes before 80, but because numbers are converted to strings, "80" comes before "9" in Unicode order. The docs have more information to clarify.
        `,
        usage: sortExample,
        output: sortExampleOutput,
      },
    ],
  },
  {
    secondSelectText: "I need to",
    label: "something else",
    secondOptions: [
      {
        label: `find the length of the array`,
        helper: "Array.length",
        helperDescription: "Returns the number of elements in that array.",
        usage: lengthExample,
        output: lengthExampleOutput,
      },
      {
        label: `fill all the elements of the array with a static value`,
        helper: "Array.fill()",
        helperDescription:
          "Fills all the elements of an array from a start index to an end index with a static value.",
        usage: fillExample,
        output: fillExampleOutput,
      },
      {
        label: `copy a sequence of array elements within the array`,
        helper: "Array.copyWithin()",
        helperDescription: `Copies a sequence of array elements within the array. You can specify either just the ending element (where begin will default to zero) 
or both the beginning and the end, comma-separated.`,
        usage: copyWithinExample,
        output: copyWithinExampleOutput,
      },
    ],
  },
];
