const { createContext, useReducer } = require("react")

const initialState = {
  currentUser: {
    id: "",
    name: "",
    role: "",
  },
  status: "pending",
}

const StateContext = createContext(initialState)

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return { ...state, currentUser: { ...action.payload } }
    case "REMOVE_CURRENT_USER":
      return { ...state, currentUser: { ...initialState.currentUser } }
    case "SET_STATUS":
      return { ...state, status: action.payload }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const StateProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <StateContext.Provider value={[state, dispatch]}>{props.children}</StateContext.Provider>
}
export { StateProvider, StateContext }
