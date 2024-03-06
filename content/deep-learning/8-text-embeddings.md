---
title: "Textual Embeddings"
date: "2024-03-6"
author: "Aryan"
---

## Word Embedding

#### Example of word embeddings

| Word  | Dimension 1 | Dimension 2 | Dimension 3 |
|-------|-------------|-------------|-------------|
| cat   | 0.8         | -0.1        | 0.3         |
| dog   | 0.7         | -0.2        | 0.4         |
| pet   | 0.9         | 0.1         | 0.2         |
| purr  | 0.5         | -0.8        | -0.1        |
| bark  | 0.1         | -0.9        | 0.5         |


```python
from tensorflow.keras.datasets import imdb
from tensorflow.keras import preprocessing
from tensorflow.keras.models import Sequential 
from tensorflow.keras.layers import Flatten, Dense
from tensorflow.keras.layers import Embedding

max_features = 10000
maxlen = 20

(x_train, y_train), (x_test, y_test) = imdb.load_data(num_words=max_features)

x_train = preprocessing.sequence.pad_sequences(x_train, maxlen=maxlen)
x_test = preprocessing.sequence.pad_sequences(x_test, maxlen=maxlen)

print(x_train.shape)
print(y_train.shape)

print(x_test.shape)
print(y_test.shape)

print(x_train[1])
print(y_train[1])

# print x_train word embedding matrix
word_index = imdb.get_word_index()
reverse_word_index = dict([(value, key) for (key, value) in word_index.items()])
decoded_review = ' '.join([reverse_word_index.get(i - 3, '?') for i in x_train[1]])
print(decoded_review)

print(x_train[0])
decoded_review_2 = ' '.join([reverse_word_index.get(i - 3, '?') for i in x_train[0]])
print(decoded_review_2)
```

#### Output:

```
(25000, 20)
(25000,)
(25000, 20)
(25000,)
[  23    4 1690   15   16    4 1355    5   28    6   52  154  462   33
   89   78  285   16  145   95]
0
on the disaster that was the 80's and have a good old laugh at how bad everything was back then
[  65   16   38 1334   88   12   16  283    5   16 4472  113  103   32
   15   16 5345   19  178   32]
story was so lovely because it was true and was someone's life after all that was shared with us all
```

#### Some debugging to see what words means

```python
# what is 5 assigned to in decoded_review
print(reverse_word_index[5])

# what is 6 assigned to in decoded_review
print(reverse_word_index[6])

# what is "bad" assigned to in decoded_review
print(word_index['bad'])

# what is "good" assigned to in decoded_review
print(word_index['good'])
```

#### Output:

```
to
is
75
49
```

#### Training the model

```python
model = Sequential()
model.add(Embedding(10000, 8, input_length=maxlen))
model.add(Flatten())
model.add(Dense(1, activation='sigmoid'))

model.compile(optimizer='rmsprop', loss='binary_crossentropy', metrics=['acc']) 
model.summary()

history = model.fit(x_train, y_train, epochs=10, batch_size=32, validation_split=0.2)
results = model.evaluate(x_test, y_test, verbose = 0)
```

### Properties of Word Embeddings

- help us understand what text means eg. man to women is king to queen

![embedding_example](/deep-learning/text-embeddings/embeddings.png)