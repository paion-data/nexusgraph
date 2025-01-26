---
sidebar_position: 2
title: Managing App States
---

FastUI uses [Redux state management][Redux]
[![Redux Badge](https://img.shields.io/badge/Redux-764ABC?logo=redux&logoColor=white&style=for-the-badge)][Redux]
instead of [React state management][useState] for a much more maintainable decoupling of React components.

The template has already been configured with 2 states

1. a string variable named `myState1`
2. a boolean variable called `myState2`

```typescript
import { selectMyState1, setMyState1, setMyState2 } from "fast-ui-redux";

function MyComponent(): JSX.Element {
  const myState1 = useAppSelector(selectMyState1);
  const myState2 = useAppSelector(selectMyState2);

  console.log(setMyState1);

  const dispatch = useAppDispatch();
  dispatch(setMyState2(false));
}

export default App;
```

[Redux]: https://react-redux.qubitpi.org/
[useState]: https://react.qubitpi.org/reference/react/useState
