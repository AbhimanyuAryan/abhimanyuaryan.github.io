---
layout: post
title: Introduction to Active Learning
date: 2019-08-26 09:56:23
description: What is active learning, how does it relate to semi-supervised learning, and why is it useful?
tags: deep-learning machine-learning active-learning
categories: machine-learning
---

Active Learning was introduced by [Burr Settles](http://burrsettles.com/) at the University of Wisconsin.

According to Wikipedia, **Active Learning** is a sub-field of Semi-Supervised Learning. Let's understand Semi-Supervised Learning in simple terms:

> *"The ability to get a large number of images makes this a great candidate for semi-supervised learning."*

A very simple approach to semi-supervised learning:

1. Capture **11,000 images**
2. Label **100 images** and train `model_1`
3. Use `model_1` to label the other **10,900 images**
4. Train `model_2` with the "labeled" 10,000 images

…results in a `model_2` that does **better** than `model_1`.

This is the core idea — you use a model's own predictions to generate pseudo-labels for unlabeled data, then retrain on that larger labeled set. Active learning takes this a step further by **choosing which samples to label** intelligently (e.g., the ones the model is most uncertain about), making each human annotation count more.
