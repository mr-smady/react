import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import "./App.css"
import Home from "./components/home"
import Layout from "./components/layout"
import Users from "./components/users/users"
import EditOrCreateUser from "./components/users/edit_create_user"
import Login from "./components/login"
import { useSelector } from "react-redux"
import { loggedInSelect } from "./login_slice"
import { useTranslation } from "react-i18next"
import './i18n'

// function App() {

//   const [counter, setCounter] = useState(() => {
//     const count = window.localSession.getItem('counter')
//     return count ?? 0
//   })

//   useEffect(() => {
//     console.log('');
//   }, [counter])


//   const loggedIn = useSelector(loggedInSelect);
//   const { t, i18n } = useTranslation();

//   useEffect(() => {
//     i18n.changeLanguage('fr')
//   }, [i18n])

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Home />}></Route>
//           <Route path="users" element={<Users />}></Route>
//           {loggedIn ? (
//             <>
//               <Route
//                 path="edit-create-user/:id"
//                 element={<EditOrCreateUser />}
//               ></Route>
//               <Route
//                 path="edit-create-user"
//                 element={<EditOrCreateUser />}
//               ></Route>
//             </>
//           ) : (
//             <>
//               <Route path="login" element={<Login />}></Route>
//             </>
//           )}
//         </Route>
//         <Route
//           path="*"
//           element={
//             <>
//               <h1>{t('Welcome to React')}</h1>
//               <h1>Not found</h1>
//               <Link to={"/"}>go to Home</Link>
//             </>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }


// function App() {
//   const [inputValue, setInputValue] = useState("");
//   // const count = useRef(0);
//   const count = useRef(0)

//   useEffect(() => {
//     // count.current = inputValue.length;
//     count.current = count.current + 1
//   }, [count, inputValue]);

//   return (
//     <>
//       <input
//         type="text"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//       />
//       <h1>Render Count: {count.current}</h1>
//     </>
//   );
// }


// const initialTodos = [

// ];

// const reducer = (state, newState) => {
//   while (newState > 359) {
//     newState -= 360
//   }
//   while (newState < 0) {
//     newState += 360
//   }
//   return newState
// };

// function App() {
//   const [angle, setAngle] = useReducer(reducer, 0)
//   const [count, setCount] = useReducer((state, newState) => {
//     if (newState >= 0) {
//       return newState
//     }
//     return state
//   }, 0)

//   return (
//     <>
//       <h3>{angle}</h3>
//       <h3>{count}</h3>
//       <button onClick={() => {
//         setAngle(-30)
//         setCount(100)
//       }}>setAngle</button>
//     </>
//   )
// }


// Hook
function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}



// const App = () => {
//   const [count, setCount] = useState(0);
//   const [todos, setTodos] = useState([]);
//   // const [num, setNumber] = useState(0)

//   // useEffect(() => {
//   //   console.log('useEffect');
//   //   setNumber(expensiveCalculation(count))
//   // }, [count])

//   const calculation = useMemo(() => expensiveCalculation(count), [count]);

//   const increment = () => {
//     setCount((c) => c + 1);
//   };
//   const addTodo = () => {
//     setTodos((t) => [...t, "New Todo"]);
//   };

//   return (
//     <div>
//       <div>
//         <h2>My Todos</h2>
//         {todos.map((todo, index) => {
//           return <p key={index}>{todo}</p>;
//         })}
//         <button onClick={addTodo}>Add Todo</button>
//       </div>
//       <hr />
//       <div>
//         Count: {count}
//         <button onClick={increment}>+</button>
//         <h2>Expensive Calculation</h2>
//         {calculation}
//         {/* {num} */}
//       </div>
//     </div>
//   );
// };

// const expensiveCalculation = (num) => {
//   console.log("Calculating...");
//   for (let i = 0; i < 1000000000; i++) {
//     num += 1;
//   }
//   return num;
// };

function useEvenCounter(initCounter) {
  const [count, setInternalCount] = useState(() => {
    return initCounter % 2 === 0 ? initCounter : initCounter + 1
  })

  const setCount = (value) => {
    if (value % 2 === 0) {
      setInternalCount(value)
    } else {
      setInternalCount(value + 1)
    }
  }

  return [count, setCount]
}

function App() {
  const [counter, setCounter] = useEvenCounter(1)
  return (
    <>
      <h3>{counter}</h3>
      <button onClick={() => {
        setCounter(counter + 1)
      }}>Add One</button>
    </>
  )
}

export default App;
