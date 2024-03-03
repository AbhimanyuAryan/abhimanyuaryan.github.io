---
title: "Genetic Algorithm"
date: "2024-02-27"
author: "Aryan"
---

# Genetic Algorithm and it's implementation in Python

1. The algorithm begins by creating random population
2. Thea algorithm then creates a sequence of new populations. A each step, the algorithm uses the individuals in current generation to create the next population. To create a new population, the algorithm performs the following steps:
    - Score each member of the current population by computing its fitness value. The values are called the raw fitness scores
    - Scales the raw fitness scores to convert them into a more usable range of values. These scaled values are called expected values
    - Selects members, called parents, based on their expectation
    - Some of the individuals in the current population that have lower fitness are chosen as elite. These elite individuals are passed to the next population.
    - Produces children from the parents. Children are produced either by making random changes to a single parent - mutation - or by combining the vector entries of a pair of parents - crossover
    - Replaces the current population with the children to form the next generation
3. The algorithm stops when one of the stopping criteria is met.
4. The algorithm takes modified steps for linear and integer constraints.
5. The algorithm is further modified for nonlinear constraints.


### Creating the Next Generation

At each step, the genetic algorithm uses the current population to create the children that make up the next generation. The algorithm selects a group of individuals in the current population, called parents, who contribute their genes - the entries of their vectors - to their children. The algorithm usually selects individuals that have better fitness values as parents.

The genetic algorithm creates three types of children for the next generation:

- Elite children are the individuals in the current generation with the best fitness values. These individuals automatically survive to the next generation.
- Crossover children are created by combining the vectors of a pair of parents.
- Mutation children are created by introducing random changes, or mutations, to a single parent.

![next generation](multi-agents/next-gen.png)


## Python Implementation

WIP 🚧