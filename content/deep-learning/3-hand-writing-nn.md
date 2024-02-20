---
title: "Reconhecimento de dígitos usando rede neural"
date: "2024-02-14"
author: "Aryan"
---

# Introduction

We will be using MNIST Dataset for hand written digit recognition for this task. Each image is 28x28 pixel so the number of input neurons is 784. The output will be predicting what number seen on the image i.e. 0-9

![digit recognition](hand-writing-nn/hand-writing.png)

It's a three layer neural network with 15 neurons hidden layer. Input pixels are grayscale, 0.0 represents white, a value of 1.0 represents black