export const AddEventForm = () => {
  // const { addBook } = useLibrary();
  const submitForm = (event) => {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const description = event.target.elements.description.value;
    const image = event.target.elements.image.value;
    const startTime = event.target.elements.startTime.value;
    const endTime = event.target.elements.endTime.value;
    const category = event.target.elements.category.value;
    const host = event.target.elements.host.value;

    addEvent({ title, description, image, category, startTime, endTime,host });
  };

  return (
    <>
      <form onSubmit={submitForm}>
        <label>title</label>
        <input type="text" name="title"></input>
        <label>description</label>
        <input type="text" name="description"></input>
        <label>image URL</label>
        <input type="text" name="image" ></input>
        <label>Start time</label>
        <input type="datetime-local" name="startTime"></input>
        <label>End time</label>
        <input type="datetime-local" name="endTime"></input>
        <label>Category</label>
        <select name="category">
        <option value="1">sports</option>
        <option value="2">games</option>
        <option value="3">relaxation</option>
        </select>
        <label>host</label>
        <select name="host">
        <option value="1">Michael Turner</option>
        <option value="2">Sophia Collins</option>
        <option value="3">Emily Carter</option></select>

        <button type="submit">Add Event</button>
      </form>
    </>
  );
};
