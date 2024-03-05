---
title: "Introduction to NLP"
date: "2024-03-3"
author: "Aryan"
---

We see texts as a sequence of words, but computers see them as a sequence of numbers. This is the first step in understanding how NLP works. In this article, we will learn about the basics of NLP and how it works.

Texts are converted into numeric vectors, where words (or other types of tokens) are encoded as numbers. This is done using a technique called tokenization. Once the text is tokenized, it can be used as input to machine learning models.

Most commonly used representation for words: One-hot encoding and Word embeddings.

Vocabulary: The set of unique words in a text.

One-hot encoding: Each word is represented as a vector of 0s and 1s. The length of the vector is equal to the size of the vocabulary. The vector has 1 at the index of the word in the vocabulary and 0s elsewhere.

Lets say if the vocabulary is ["I", "am", "happy"], then the word "I" will be represented as [1, 0, 0], "am" as [0, 1, 0] and "happy" as [0, 0, 1].

"I" is represented as one-hot encoding because it is the first word in the vocabulary, "am" is the second word and "happy" is the third word.

![rnns](/deep-learning/introduction-to-nlp/NLP.png)
