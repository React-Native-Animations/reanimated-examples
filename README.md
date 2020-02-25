

1. CodeExperiment.js
[Introduction to Reanimated in React Native
](https://www.youtube.com/watch?v=KnQ6xcVgJec&t=7s)

* Example: [Code](https://github.com/software-mansion/react-native-reanimated/blob/master/Example/code/index.js)

* Events from `onGestureEvent={this.onGestureEvent}`

`
-"isDefaultPrevented": [Function functionThatReturnsFalse],
-  "isPropagationStopped": [Function functionThatReturnsFalse],
-  "isTrusted": undefined,
-  "nativeEvent": Object {
-    "absoluteX": 258.5,
-    "absoluteY": 215,
-    "handlerTag": 1,
-    "numberOfPointers": 1,
-    "state": 4,
-    "target": 9,
-    "translationX": -87.5,
-    "translationY": 106,
-    "velocityX": 0,
-    "velocityY": 15.537210865135997,
-    "x": -88.5,
-    "y": 115,
-  },
-  "target": 9,
-  "timeStamp": 1582537814914,
-  "type": undefined,
-}
-SyntheticEvent {
-  "_dispatchInstances": FiberNode {
-    "tag": 5,
-    "key": null,
-    "type": "RCTView",
-  },
-  "_dispatchListeners": [Function anonymous],
-  "_targetInst": FiberNode {
-    "tag": 5,
-    "key": null,
-    "type": "RCTView",
-  },
-  "bubbles": undefined,
-  "cancelable": undefined,
-  "currentTarget": 9,
-  "defaultPrevented": undefined,
-  "dispatchConfig": Object {
-    "registrationName": "onGestureHandlerEvent",
-  },
-  "eventPhase": undefined,
-`

[Event handling with reanimated nodes](https://github.com/software-mansion/react-native-reanimated/blob/master/docs/pages/10.event.md)

    `react-native-reanimated`'s new syntax is possible to be used with Animated.event. Instead of providing only a mapping from event fields to animated nodes, it is allowed to write a function that takes reanimated values map as an input and return a block (or any other reanimated function) that will be then used to handle the event.


2. [PanRotateAndZoom](https://github.com/software-mansion/react-native-reanimated/blob/master/Example/PanRotateAndZoom/index.js)

- `Blocks`

    Blocks are just arrays of nodes that are being evaluated in a particular order and **return the value of the last node**. It can be created using block command but also when passed as an argument to other nodes the block command can be omitted and we can just pass a nodes array directly. See an example below:

`block(
  set(tmp, a), 
  set(a, b), 
  set(b, tmp)
);`

Passing array directly is equivalent to wrapping it with the block command.

- `set`
    
`set(valueToBeUpdated, sourceNode);`
   
    When evaluated, it will assign the value of `sourceNode` to the Animated.Value passed as a first argument. In other words, it performs an assignment operation from the `sourceNode` to `valueToBeUpdated` value node and also returns a node that represents this value.

- `add`

`add(nodeOrNumber1, nodeOrNumber2, ...)`
   
    Takes two or more animated nodes or values, and when evaluated, returns their sum.

- `cond`

`cond(conditionNode, ifNode, [elseNode]);`
    
    If `conditionNode` evaluates to "truthy" value the node evaluates `ifNode` node and returns its value, otherwise it evaluates `elseNode` and returns its value. **elseNode is optional**.

- `eq`

`eq(nodeOrValueA, nodeOrValueB);`
    
    Returns 1 if the value of both nodes are equal. Otherwise returns 0.

- [Refs and the DOM](https://reactjs.org/docs/refs-and-the-dom.html)
- [Simultaneous recognition](https://github.com/software-mansion/react-native-gesture-handler/blob/master/docs/interactions.md)

- `simultaneousHandlers`

    Accepts a react ref object or an array of refs to other handler components (refs should be created using [`React.createRef()`](https://reactjs.org/docs/refs-and-the-dom.html)). When set the handler will be allowed to [activate](state.md#active) even if one or more of the handlers provided by their refs are [active](state.md#active). It will also prevent the provided handlers from [cancelling](state.md#cancelled) current handler when they [activate](state.md#active). Read more in the [cross handler interaction](interactions.md#simultaneous-recognition) section.

- [PinchGestureHandler](https://github.com/software-mansion/react-native-gesture-handler/blob/master/docs/handler-pinch.md)
- Check the rest of simultanious Handlers in the `Simultaneous recognition` link above.



--------------------
* Packages installed:
- expo install react-native-reanimated react-native-gesture-handler