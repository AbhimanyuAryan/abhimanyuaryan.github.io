---
layout: post
title: Getting Started with Deep Learning in Swift and TensorFlow
date: 2019-11-22 09:56:23
description: TensorFlow is now available in Swift for Deep Learning. This post helps you get started with Google Colab and the command line.
tags: deep-learning swift tensorflow
categories: machine-learning
thumbnail: assets/img/posts/deeplearning-with-swift-and-tensorflow/swift.jpg
---

There are 3 ways to get started coding with Swift & TensorFlow:

- **Google Colab** _(Basic: Windows/Mac/Linux)_
- **Command Line** _(Advanced: Mac/Linux)_
- **REPL Playground XCode** _(Basic: Mac — Coming Soon)_

> Note: I'll cover the first two approaches today — Google Colab & command line. The 3rd approach (XCode Playground) will be a separate post.

---

## 1. Google Colab

First, create an empty `swift.ipynb` notebook:

```bash
touch swift.ipynb
code swift.ipynb
```

Open it in VSCode and paste this JSON to make it a Swift kernel notebook:

```json
{
  "nbformat": 4,
  "nbformat_minor": 0,
  "metadata": {
    "colab": {
      "name": "swift_notebook.ipynb",
      "version": "0.3.2",
      "provenance": [],
      "collapsed_sections": []
    },
    "kernelspec": {
      "name": "swift",
      "display_name": "Swift"
    }
  },
  "cells": [
    {
      "metadata": {
        "id": "icDfXRlHRYvE",
        "colab_type": "code"
      },
      "cell_type": "code",
      "source": ["let x = 2\n", "let y = 2\n", "print(\"Hello world, this is Swift! \\(x + y)\")"],
      "execution_count": 0,
      "outputs": []
    }
  ]
}
```

Then go to [colab.research.google.com](https://colab.research.google.com/notebooks/welcome.ipynb) → **File > Upload Notebook** → upload your `Swift.ipynb`. You can now write Swift & TensorFlow in Colab!

---

## 2. Command Line

Download Swift-TensorFlow for Mac or Ubuntu from [the official installation guide](https://github.com/tensorflow/swift/blob/master/Installation.md).

Once set up, create `basics.swift`:

```swift
print("Tensorflow Basics Tutorial")

import TensorFlow

let x = Tensor<Float>([[2, 2], [2, 2]])
print(x)
```

Compile and run:

```bash
swift basics.swift
```

Output:

```
Tensorflow Basics Tutorial
[[2.0, 2.0], [2.0, 2.0]]
```

Swift also has a Python-like **REPL** since it's built on the LLVM infrastructure.

---

### What's Next?

- Why TensorFlow & Swift?
- Swift Compiler Technology — how it compares to the competition
- Using Python libraries with Swift-TensorFlow
