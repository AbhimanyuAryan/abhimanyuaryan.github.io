---
title: "Exploading/Vanishing gradient"
date: "2024-03-5"
author: "Aryan"
---

## Exploding/Vanishing Gradient

Exploding gradients is a problem that occurs in backprogation the gradient can explode and become too large. This can cause numerical instability and very large updates to the weights during training

#### Why Gradient Explodes?

The gradients from the later time steps are propagated back to effect the weights in early steps. If you have very large sequence, and gadients are large, multiplying these large numbers repeatedly can cause the gradients to become too large.

ex. keep multiplying 2 with itself 100 times, the number will become very large.

(2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536, 131072, 262144, 524288, 1048576, 2097152, 4194304, 8388608, 16777216, 33554432, 67108864, 134217728, 268435456, 536870912, 1073741824, 2147483648, 4294967296, 8589934592, 17179869184, 34359738368, 68719476736, 137438953472, 274877906944, 549755813888, 1099511627776, 2199023255552, 4398046511104, 8796093022208, 17592186044416, 35184372088832, 70368744177664, 140737488355328, 281474976710656, 562949953421312, 1125899906842624, 2251799813685248, 4503599627370496, 9007199254740992, 18014398509481984, 36028797018963968, 72057594037927936, 144115188075855872, 288230376151711744, 576460752303423488, 1152921504606846976, 2305843009213693952, 4611686018427387904, 9223372036854775808, 18446744073709551616, 36893488147419103232, 73786976294838206464, 147573952589676412928, 295147905179352825856, 590295810358705651712, 1180591620717411303424, 2361183241434822606848, 4722366482869645213696, 9444732965739290427392, 18889465931478580854784, 37778931862957161709568, 75557863725914323419136, 151115727451828646838272, 302231454903657293676544)

#### Results of Exploding Gradients

- Model outputting NaNs
- Model weights reaching very large values
- Model failing to converge or even diverge. Which means the model is not learning anything.

#### Techniques used to combat Exploding Gradients

- Gradient clipping i.e. Limit the size of the gradients to a threshold value. (used for exploding gradients)

#### Vanishing Gradients

$$
c^{<t>} = \Gamma_u \ast \tilde{c}^{<t>} + (1 - \Gamma_u) \ast c^{<t-1>}
$$

![Vanishing Gradients](/deep-learning/gradient-issues-rnns/vanishing-grad.png)

Note: the last line should use \* instead of + in the given image
