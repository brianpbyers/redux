<!--
Creator: Ilias Tsangaris
Market: SF
-->

<!--1:35 5 minutes -->

<!--Hook: Alright, now we know the basics of React.  We had a brief introduction of state with React, but only scratched the surface.  As you can imagine, once our apps grow considerably large with multiple components, it becomes hard to manage state.  That's where Redux comes in. -->

![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)

# Redux

### Why is this important?
<!-- framing the "why" in big-picture/real world examples -->
*This workshop is important because:*

Keeping track of an application's state is hard. Redux's patterns help our data stay in sync when our users take asynchronous actions.

### What are the objectives?
<!-- specific/measurable goal for students to achieve -->
*After this workshop, developers will be able to:*

* **Illustrate** Redux's data-flow
* **Keep track** of your application's state with a *store* 
* **Define** and **emit** *actions* to update your state
* **Calculate** diffs to your state with *reducers*
* **Integrate** Redux into a React component

### Where should we be now?
<!-- call out the skills that are prerequisites -->
*Before this workshop, developers should already be able to:*

* **Write** JavaScript
* **Build** a simple application with React

<!--1:40 5 minutes -->

## Philosophy

[Redux](https://github.com/reactjs/redux)'s main purpose is to **manage the state of an application**. Its patterns are expressly inspired by [Flux](https://github.com/facebook/flux), Facebook's recommended way to manage state among React components and [Elm](https://github.com/elm-lang), a functional programming language.

### Three Principles

Redux has three very important design choices:

* **Single source of truth**: The entire state of your application is stored as an object within your application's store. More specifically this object is a state tree, an object that contains other objects, representing the application's state.
* **State is read-only**: The *only* way to mutate your application's state is to emit an action and create a *new* state object. All actions are dispatched to a centralized location, which helps make your state easier to keep track of.
* **Changes are made with pure functions**: Changes to your state are determined by reducers, which are pure functions that take in the previous state and an action. Using this information, it determines the updated state. Your application may start with a single reducer, but as the application grows, different reducers can manage different parts of the application's state.

### Redux Architecture

![redux-architecture](https://camo.githubusercontent.com/83fef7601c50c8b025953579e5c5be3aa47ee51d/687474703a2f2f692e696d6775722e636f6d2f30756e68744e512e6a7067)

<!--1:45 20 minutes -->

## Redux Like Button

Let's take a look at implementing a simple `like` button to see how actions, reducers, and a store may work together to maintain state.

In `starter-code` run `npm install` to install all the dependencies and get your gulp task running. In a separate tab run `npm start` to get your server started on port 3000.

First, let's create a like button in our `index.html` in addition to a place where we can see the total likes. Giving them both `id`s will help us reference them later.

```html
<h3 id="total-likes"></h3>
<button id="like-button">Like</button>
```

Now in our `index.jsx` (we'll use actual JSX later) let's select these elements.

```js
const likeButton = document.getElementById("like-button")
const totalLikes = document.getElementById("total-likes")
```

Now we're going to create a reducer, which we'll later register with a store and start dispatching actions to it!

```js
const likes = (state = 0, action) => {
  switch(action.type) {
    case 'LIKE':
      return state + 1
    default:
      return state
  }
}
```

The above store's state defaults to 0. If it is passed an action of type "LIKE", then it increments its state by 1. Otherwise it does nothing.

Now, using this reducer, we can create a store for our application. At the top of our file, let's import Redux.

```js
import { createStore } from 'redux'
```

What is this syntax? It's how we [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) a specific member (distinct piece) of the Redux module (library).

>Note: If you do want to import everything that can be done with the syntax, `import * as Redux from 'redux'`. Then you could access its `createStore` member with `Redux.createStore`. However, we're going to prefer the above syntax.

Now let's use Redux's `createStore` method to create a store for our application. This store will contain the applications state and know how to update it appropriately because we will give it our reducer.

```js
// create a store, where the state lives
const store = createStore(likes);
```

Now we can get our application's state at any time by calling `store.getState()`. We know we're going to want the number of likes in our store reflected on the section of our html page, `#total-likes`. To display the current state to our user, we'll have to update the view everytime the state changes. It will be helpful to have a function that can do this for us.

```js
// update the DOM with the new state
const renderView = () => {
  totalLikes.innerText = store.getState();
}
```

Everytime this function is run it will update our view to display the latest state.

How many times is `renderView` being called at the moment? None. Let's call it once so that on page load the initial state is shown as being `0`, which our reducer has defined for us in the line: `const likes = (state = 0, action) => {...}`.

```js
// called once for initialization
renderView()
```

But how does the view know to update (render) when changes to the store are made? It doesn't. Because of that, we have to `subscribe` functions to the store. Any function that is subscribed to the store will get run any time the store is updated. Nifty!

```js
// re-render every time the store is updated
store.subscribe(renderView)
```

Lastly we need to dispatch a "LIKE" event to our reducer when the user clicks the `#like-button`.

```js
// make the like button dispatch a "LIKE" action
likeButton.addEventListener('click', () => {
  store.dispatch({type: 'LIKE'})
})
```

Try it out!

<details>
<summary>Example Code</summary>

```js
"use strict"
import {createStore} from 'redux'
const likeButton = document.getElementById("like-button")
const totalLikes = document.getElementById("total-likes")

// reducer for the like button
const likes = (state = 0, action) => {
  switch(action.type) {
    case 'LIKE':
      return state + 1
    default:
      return state
  }
}

// create a store, where the state lives
const store = createStore(likes);

// update the DOM with the new state
const renderView = () => {
  totalLikes.innerText = store.getState();
}

// re-render every time the store is updated
store.subscribe(renderView)

// called once for initialization
renderView()

// make the like button dispatch an action
likeButton.addEventListener('click', () => {
  store.dispatch({type: 'LIKE'})
})
```

</details>

<!--2:05 10 minutes -->

## Challenge: Dislike!

On your own create a `dislike` button that trigger a `DISLIKE` action and decrements the state by 1 each time it is clicked.  

In other words, update the reducer to include a new "DISLIKE" action type that decrements the state by 1.

Then, make a dislike button.

Then, target the button.

Finally, add an event listener to your dislike button that triggers a DISLIKE action.

<!--Example solution
const likes = (state = 0, action) => {
  switch(action.type) {
    case 'LIKE':
      return state + 1
    case 'DISLIKE':
      return state - 1
    default:
      return state
  }
}

--dislike button:

```html
<button id="dislike-button">Dislike</button>
```

--Target the button:

```js
const dislikeButton = document.getElementById("dislike-button")
```

--Add an event to your dislike button that triggers a DISLIKE action.

```js
dislikeButton.addEventListener('click', () => {
  store.dispatch({type: 'DISLIKE'})
})
```

-->

<!--2:15 15 minutes -->

## Integrating React

Let's refactor our JavaScript by introducing a React component called `LikeCounter`. We'll remove any code that's concerned with updating our view, and import React to take care of it:

```js
"use strict"
import React from 'React'
import ReactDOM from 'React'
import {createStore} from 'redux'
const totalLikes = document.getElementById("total-likes")

// reducer for the like button
const likes = (state = 0, action) => {
  switch(action.type) {
    case 'LIKE':
      return state + 1
    case 'DISLIKE':
      return state - 1
    default:
      return state
  }
}

// create a store, where the state lives
const store = createStore(likes);

// update the DOM with the new state
const renderView = () => {
  totalLikes.innerText = store.getState();
}

// re-render every time the store is updated
store.subscribe(renderView)

// called once for initialization
renderView()
```

Let's create a `LikeCounter` component in `index.jsx`:

```js
const LikeCounter = React.createClass({
  like() {
    store.dispatch({type: 'LIKE'})
  },
  render() {
    return (
      <div>
        <h3>{store.getState()}</h3>
        <button onClick={this.like}>Like</button>
      </div>
    )
  }
})
```

This component will get passed the `likeCount` as a prop. Additionally it has a function `like` that when triggered dispatches a `LIKE` action to our reducer.

Now our `renderView` function can get updated to re-render our react component and pass our store's state into it as a prop, `likeCount`.

```js
const renderView = () => {
  ReactDOM.render(
    <LikeCounter/>,
    document.getElementById("like-counter")
  )
}
```

Don't forget to make a place on your HTML page for the component to live.

```html
<div id="like-counter"></div>
```

Then clear out all the older HTML elements (buttons and the total-likes heading).

Also, just like before, ensure that `renderView` gets called once initially and is also called anytime the state is updated.

```js
// render every time the store is updated
store.subscribe(renderView)

// called once for initialization
renderView();
```

<!--2:30 10 minutes -->

## Challenge: Dislike it again!

Make a `dislike` method for your `LikeCounter` component that dispatches a `'DISLIKE'` action when the dislike button is clicked.

First, add the `Dislike` button.  Then, have a look at where the `{{this.like}}` function is.  Put the `dislike()` function in the same place.

<!--Example solution 
const LikeCounter = React.createClass({
  like() {
    store.dispatch({type: 'LIKE'})
  },
  dislike() {
    store.dispatch({type: 'DISLIKE'})
  },
  render() {
    return (
      <div>
        <h3>{store.getState().likes}</h3>
        <button onClick={this.like}>Like</button>
        <button onClick={this.dislike}>Dislike</button>
      </div>
    )
  }
})

-->

<!--2:40 10 minutes -->

## Helpful Redux Middleware & Complementary Modules

>Note: Redux has middleware for it, to extend its behavior.

* If you want to dispatch actions asynchronously checkout [thunk](https://github.com/gaearon/redux-thunk)
* [React-redux](https://github.com/reactjs/react-redux) can dry up some of your code, guide [here](http://redux.js.org/docs/basics/UsageWithReact.html)
* [Writing tests](http://redux.js.org/docs/recipes/WritingTests.html)
* Ensure your state is never mutated with [immutable](https://facebook.github.io/immutable-js/)
* Going back in time in Redux with [UndoHistory](http://redux.js.org/docs/recipes/ImplementingUndoHistory.html)

## More Videos & Blog Posts

* Nice [video tutorial](https://egghead.io/series/getting-started-with-redux) by the creator
* Another [getting started](http://www.jchapron.com/2015/08/14/getting-started-with-redux/) tutorial
* A [cartoon intro](https://code-cartoons.com/a-cartoon-intro-to-redux-3afb775501a6#.wcukeamlp) to redux
* [Redux way of doing things](http://www.theodo.fr/blog/2016/03/getting-started-with-react-redux-and-immutable-a-test-driven-tutorial-part-1/)
* [Full-stack Redux](http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html)
* [3REE](http://blog.workshape.io/the-3ree-stack-react-redux-rethinkdb-express-js/) Stack (React, Redux, RethinkDB, Express)

## Final Questions

<details>
<summary>What are Redux's: Three Priciples?</summary>

* The entire state of your application is stored in a **single object**.
* This object is **never mutated** but instead used to create a state object each time an action is taken.
* Reducers are **pure functions**, meaning that provided with a specific input they will always return an expected output.

</details>

<details><summary>What is the Purpose of a Reducer?</summary>

A reducer takes in an **original state** and an **action type** to decide what the **updated state** of the application will become.

</details>

<details><summary>Why do Redux and React play well together? Can you use Redux with other client-side frameworks?</summary>

React **displays the state** (view), while Redux **manages the state** (model) of the application.

</details>
