---
title: "Deep Neural Network"
date: "2024-02-14"
author: "Aryan"
---

# Deep Neural Network (Rede Neural Profunda)

## Perceptron

The perceptron was invented by Frank Rosenblatt in 1957. Perceptrons are important in deep learning because they laid the foundation for more complex neural networks. Concept of the perceptron was inspired by the understanding of the human brain, specifically mimicking the way neurons function

![perceptron](/deep-learning/perceptron.png)

Rosenblatt proposed a simple rule to calculate output. Here $x_i$ denote input features and $w_j$ denote weights associated with each input feature, and the summation $\sum_j w_jx_j$ is over all input features j.


$$
output = 
\begin{cases} 
0 & \text{if } \sum_j w_j x_j \leq \text{threshold} \\
1 & \text{if } \sum_j w_j x_j > \text{threshold}
\end{cases}
$$

So, the perceptron can act as a binary classifier. The threshold is basically what decides the output of neural network.

### How a Perceptron Works: Vou explicar com exemplo

Imagine if you want to marry a girl. There are three conditions to it:

1. Occasionally, she does stupid things.
2. She doesn't have a pet.
3. She is either Dutch or German.

Now, we can represent these as $x_1$, $x_2$, $x_3$

- So, doing stupid things is 1. Not doing stupid things is 0.
- Having a pet is 1. Not having a pet is 0.
- Being Dutch or German is 1. Other nationalities are 0.

Now, you can have weights associated with these priorities. So, let's say:

```
3 has weight 7
2 has weight 3
1 has weight 2
```

And the threshold is, let's say, 6. You see, even if conditions 2 and 1 are true, which is weight_of_two x input_of_two + weight_of_one x input_of_one, i.e., 3x1 + 2x1, it still doesn't cut the threshold; it's less than 6, so the model is gonna predict 0, which means I won't end up getting married lol.

But if the 3rd condition is true, i.e., 1x7 = 7, which is higher than 6, so I'll end up getting married. This is so stupid, but it is what it is lmao. The model is gonna end up predicting 1. I'll get married.


wip .... 🚧