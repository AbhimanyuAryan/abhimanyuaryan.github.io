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

And the threshold is, let's say, 6. You see, even if conditions 2 and 1 are true, which is weight_of_two x input_of_two + weight_of_one x input_of_one, i.e., 3x1 + 2x1, it still doesn't cut the threshold; it's less or equal to 6, so the model is gonna predict 0, which means I won't end up getting married lol.

But if the 3rd condition is true, i.e., 1x7 = 7, which is higher than 6, so I'll end up getting married. This is so stupid, but it is what it is lmao. The model is gonna end up predicting 1. I'll get married.

### Sigmoid Neurons : Vamos cavar fundo

Small changes in weight and bias should make small changes in output. However that's not the case in single perceptron a small change in w/b can cause the output to completely predict wrong value. To resolve this issue we introduced sigmoid neurons. Sigmoid neurons are similar to perceptrons, but modified so that small changes in w/b cause only a small change output i.e.

Also, unlike perceptron a sigmoid neuron can output probabilities so not just just 0 and 1. The output of a sigmoid function is defined by σ(z).

The output of a sigmoid neuron is mathematically represented by applying the sigmoid activation function to the weighted sum of its inputs plus a bias term. The sigmoid function, $\sigma(z)$, is defined as:

$$ \sigma(z) = \frac{1}{1 + e^{-z}} $$

The weighted sum, $z$, that is input to the sigmoid function is calculated as:

$$ z = \sum_{j} w_j x_j + b $$

where:
- $w_j$ are the weights associated with each input $x_j$,
- $x_j$ are the input values to the neuron,
- $b$ is the bias term,
- $e$ is the base of the natural logarithm, approximately equal to 2.71828.

Combining these, the output of a sigmoid neuron, $y$, can be expressed as:

$$ y = \sigma\left(\sum_{j} w_j x_j + b\right) = \frac{1}{1 + e^{-(\sum_{j} w_j x_j + b)}} $$

This equation captures the entire process of calculating the output of a sigmoid neuron, from combining inputs with their weights, adding a bias, and passing the result through the sigmoid function to produce an output in the range (0, 1). This output can be interpreted as a probability in the context of binary classification problems, making sigmoid neurons particularly useful for such tasks.

In general, Sigmoid Neural behaves exactly like perceptron except that with small changes in input sigmoid produces small changes in output

The smoothness of σ means that small changes Δwj in the weights and Δb in the bias will produce a small change Δoutput in the output from the neuron. In fact, calculus tells us that Δoutput is well approximated by

$$ \Delta \text{output} \approx \sum_{j} \frac{\partial \text{output}}{\partial w_j} \Delta w_j + \frac{\partial \text{output}}{\partial b} \Delta b, $$

Lastly the biggest difference between perceptron and sigmoid is that output of sigmoid can be any real number between 0 and 1. ie. 0.16 and 0.68

Code Coming Soon 🚧