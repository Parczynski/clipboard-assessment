# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

Basically what I did is split the original function to smaller functions, each one of which is responsible for its own job. Trying to follow the single responsibility rule.
getKey - is responsible for what has to be the key depending on deterministicPartitionKey's input and presence of partitionKey in the input. It does not care about restrictions.
sanitizeKey - on the other hand is responsible to make the key fit the requirements. It does not care about the event object.
hashKey - I've also extracted a hashing algorithm to a separate function so we don't need to repeat it in multiple places. If we decide to change the hashing function in the future we can do it in one place also.
I think this code is more clean and readable because with such separation of concerns we need to maintain small blocks of code responsible for atomic tasks.
We could also write separate tests for smaller functions too and mock them when testing deterministicPartitionKey. But I did not because in this case the original code will not pass the tests.
We also could pass values for MAX_PARTITION_KEY_LENGTH and TRIVIAL_PARTITION_KEY by wrapping deterministicPartitionKey to a higher order function that accepts those constants as arguments. But in this case we need to change the module interface and we won't be able to use common tests for old code and the new one.
