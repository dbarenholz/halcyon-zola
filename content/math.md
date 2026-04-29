---
title: "Math"
---

## Inline Math

This page exercises MathJax rendering for inline expressions like $a^2 + b^2 = c^2$, $e^{i\pi} + 1 = 0$, and $\frac{d}{dx} \sin(x) = \cos(x)$.

## Display Math

$$
\int_{-\infty}^{\infty} e^{-x^2} \, dx = \sqrt{\pi}
$$

$$
\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}
$$

## Algebra

$$
\begin{aligned}
(x + y)^3 &= x^3 + 3x^2y + 3xy^2 + y^3 \\
ax^2 + bx + c &= 0 \\
x &= \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
\end{aligned}
$$

## Matrices

$$
A = \begin{bmatrix}
1 & 2 & 3 \\
0 & 1 & 4 \\
5 & 6 & 0
\end{bmatrix}
$$

$$
\det(A) = 1(1 \cdot 0 - 4 \cdot 6) - 2(0 \cdot 0 - 4 \cdot 5) + 3(0 \cdot 6 - 1 \cdot 5) = 1
$$

## Piecewise Functions

$$
f(x) =
\begin{cases}
x^2 & \text{if } x \ge 0 \\
-x & \text{if } x < 0
\end{cases}
$$

## Calculus

$$
\nabla \cdot \vec{E} = \frac{\rho}{\varepsilon_0}
$$

$$
\lim_{h \to 0} \frac{f(x + h) - f(x)}{h} = f'(x)
$$

## Greek And Symbols

$$
\alpha, \beta, \gamma, \Gamma, \Delta, \lambda, \Lambda, \omega, \Omega
$$

$$
\forall x \in X, \exists y \in Y : x \le y \iff x \ne y
$$

## Markdown Around Math

- Inline math inside lists: $\sigma^2 = \mathrm{Var}(X)$.
- Emphasis still works around math: *$\theta$ is the parameter of interest*.
- Code stays literal: `\int_0^1 x^2 dx`.

| Quantity | Expression |
| -- | -- |
| Mean | $\mu = \frac{1}{n}\sum_{i=1}^{n} x_i$ |
| Standard deviation | $\sigma = \sqrt{\frac{1}{n}\sum_{i=1}^{n}(x_i - \mu)^2}$ |
