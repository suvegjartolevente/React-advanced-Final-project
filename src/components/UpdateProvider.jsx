import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

const UpdateContext = createContext();

const initialState = {
  events: [],
};

function eventReducer(state, action) {
  switch (action.type) {
    case "SET_EVENTS":
      return { ...state, events: action.payload };
    case "ADD_EVENT":
      return { ...state, events: [...state.events, action.payload] };
    default:
      return state;
  }
}

export const EventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, initialState);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch(`http://localhost:3000/events`);
      const data = await res.json();
      dispatch({ type: "SET_EVENTS", payload: data });
    };
    fetchEvents();
  }, []);
  const addEvent = async (newEvent) => {
    const res = await fetch(`http://localhost:3000/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    });
    const data = await res.json();
    dispatch({ type: "ADD_EVENT", payload: data });
  };

  return (
    <UpdateContext.Provider value={{ events: state.events, addEvent }}>
      {children}
    </UpdateContext.Provider>
  );
};

export const useEvents = () => useContext(UpdateContext);
