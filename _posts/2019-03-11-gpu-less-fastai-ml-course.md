---
layout: post
title: Getting Setup with Fast.ai for Machine Learning (No GPU Required)
date: 2019-03-11 09:56:23
description: How to run the Fast.ai ML course on Kaggle, Google Colab, and AWS — even without a good GPU or fast internet
tags: machine-learning fastai python
categories: machine-learning
---

Howdy! This post is for people who own laptops without good GPU specs, have a poor internet connection, and still want to learn ML from fast.ai.

Setting up a dev environment can feel like a waste of time. If you're one of those people, this post should help.

## Free Options

- **Kaggle**
- **Google Colab + GitHub**

## Paid Options

- **AWS**

---

### Kaggle

Kaggle is amazing if you want to start quickly — no downloading datasets. Datasets range from GBs to TBs, so not having to download them locally is a huge win.

To use the fast.ai library, run in a Kaggle notebook:

```python
!pip install fastai==0.7.0
```

📓 [Sample Kaggle Notebook - NYC Taxi Fare Prediction](https://www.kaggle.com/abhimanyuaryan/new-york-city-taxi-fare-prediction/)

By default your dataset gets added to the input directory:

```python
PATH = "../input/"
df_raw = pd.read_csv(f'{PATH}train.csv', nrows=50_000_000)
```

---

### Google Colab

Google Colab provides a **free GPU**. Here's how to use it with GitHub:

1. Create a `.ipynb` notebook locally
2. Push it to GitHub
3. Go to [colab.research.google.com](https://colab.research.google.com) and load your repo

#### Ways to download datasets in Colab:

**Curl:**

```bash
curl <link_to_dataset>
```

_(as shown in [Jeremy's video](https://youtu.be/CzdWqFTmn0Y?t=969))_

**Kaggle API:**

```python
# Step 1: Upload Kaggle API key
from google.colab import files
files.upload()

# Step 2: Install Kaggle API client
!pip install -q kaggle
```

---

### AWS (Last Resort)

Jeremy has an [AWS starter video](https://course.fast.ai/lessons/aws.html). AWS p2 instances cost around **$0.9/hr** — decide for yourself!
