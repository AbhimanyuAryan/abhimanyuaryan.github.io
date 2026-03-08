---
layout: post
title: SVMs are Useless?
date: 2019-05-22 03:16:12
description: A mathematical walkthrough of Support Vector Machines — from decision boundaries to the widest street approach
tags: machine-learning mathematics svm
categories: machine-learning
---

### What are SVMs?

Support Vector Machines (SVMs) attempt to find the **optimal decision boundary** between positive and negative examples using what's called the **Widest Street Approach**.

How do we separate negative examples from positive examples? We look for the widest possible boundary (the "street") that cleanly separates the two classes.

#### Decision Rule

Let's say we have a vector **w** perpendicular to the decision boundary, and an unknown vector **u**. The decision rule is:

```
w⃗ · u⃗ + b ≥ 0  →  positive sample
```

where:
```
w⃗ = vector perpendicular to the boundary
u⃗ = unknown point vector from the median
```

For positive and negative samples:
```
w⃗ · x(positive) + b ≥ 1
w⃗ · x(negative) + b ≤ -1
```

Introducing a variable **y**:

$$y_i = +1 \text{ for positive samples}, \quad -1 \text{ for negative samples}$$

This gives us:

```
y_i (x_i · w + b) ≥ 1
y_i (x_i · w + b) - 1 ≥ 0
```

For samples on the gutter (the support vectors themselves):
```
y_i (x_i · w + b) - 1 = 0
```

#### Width of the Street

$$\text{WIDTH} = \frac{(x_+ - x_-) \cdot \vec{w}}{|\vec{w}|}$$

SVMs maximize this width — that's the core insight. So are they useless? Not even close. They remain a powerful and interpretable classification tool, especially in high-dimensional spaces with limited data.
