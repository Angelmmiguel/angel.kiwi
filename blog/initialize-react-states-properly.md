---
layout: blog.njk
title: Initialize React states properly
tags:
  - post
  - dev
  - frontend
  - react
category: dev
date: 2022-01-12
updated: 2022-01-12
picture: /static/images/blog/virender-singh-hE0nmTffKtM-unsplash.webp
pictureBy: Virender Singh
pictureUrl: https://unsplash.com/photos/hE0nmTffKtM
---

One of the most important aspects about performance in React applications is how your components _react to changes_. After introducing [hooks](https://reactjs.org/docs/hooks-intro.html) in [2019](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html), the definition of components using functions became the new norm.

They came with an interesting side effect: **the entire function is executed any time React detects a potential change in your component**. Before, components defined with classes only executed certain methods like the lifecycle ones (`componentDidMount`, etc) and the well known `render` method.

To manage it, React added the amazing [`useEffect` hook](https://reactjs.org/docs/hooks-effect.html). However, it's important to keep in mind that functions executes all the code inside when they are called.

# Initialize a state in React

You can initialize a state in React using the [`useState` hook](https://reactjs.org/docs/hooks-reference.html#usestate):

```javascript
import { useState } from "react";

const MyComponent = () => {
  const [counter, setCounter] = useState(0);

  // Increment the given counter
  const incrementCounter = () => setCounter(counter + 1);

  return <section aria-label="Counter">
    <button onClick={incrementCounter}>Increment</button>
    <output>{counter}</output>
  </section>
}
```

`MyComponent` defines a new state to manage the current counter value. Following the previous statement, **any time React detects a potential change, it calls `MyComponent` function** and compares the result of the execution with the previous state of the application. 

Now, taking a deep look to this function, there are multiple calls and defintions:

* Call to `useState`
* Define the `incrementCounter` function
* Call JSX method under the hood

Apart from that, there's a tiny detail that is usually forgotten. `0` is also evaluated. So, **what happens if you need to call a function to calculate the initial state value?**

## Lazy initial state

Now, let's check the following code:

``` jsx
import { useState } from "react";
import { initState } from "./utils";

const MyComponent = () => {
  const [value, setValue] = useState(initState());

  // ...
}
```

In this case, `useState` doesn't receive a static value but a function result as parameter. **Note that the `initState` function is called any time React calls `MyComponent`**. However, ` useState` only use the the result once. After its mounted, next executions of the component will discard the `initState` result. 

Depending on the complexity of `initState`, it may cause some performance issues in `MyComponent` even after the first initialization. To avoid it, **React allows you to pass a function that will be executed just once**:

``` jsx
import { useState } from "react";
import { initState } from "./utils";

const MyComponent = () => {
  const [value, setValue] = useState(() => initState());

  // ...
}
```

This trick is called [_lazy state initialization_](https://reactjs.org/docs/hooks-reference.html#lazy-initial-state).

# You don't need to be lazy by default

Let's be fair. Fortunately, states are initialized with static values most of the times. Not all applications will benefit from this `useState` feature. However, this is one of those difficult performance issues to detect and the solution is quite simple.

**Just keep it in mind when you need to call a function to initialize a state**. And think it twice if it's a requirement because your component will still need to wait for the result when it's mounted.