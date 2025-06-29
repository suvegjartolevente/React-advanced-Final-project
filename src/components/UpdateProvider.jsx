import { createContext, useContext, useEffect, useReducer } from "react";

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
    case "EDIT_EVENT":
      return {
        ...state,
        events: state.events.map((evt) =>
          evt.id === action.payload.id ? action.payload : evt
        ),
      };
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

  const editEvent = async (eventToEdit) => {
    const { id, ...payload } = eventToEdit;
    const res = await fetch(`http://localhost:3000/events/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    dispatch({ type: "EDIT_EVENT", payload: data });
    return data;
  };

  return (
    <UpdateContext.Provider
      value={{ events: state.events, addEvent, editEvent }}
    >
      {children}
    </UpdateContext.Provider>
  );
};

export const useEvents = () => useContext(UpdateContext);
