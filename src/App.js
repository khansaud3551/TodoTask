import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [taskValue, setTaskValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
      setTasks(JSON.parse(tasks));
    }
  }, []);

  useEffect(() => {
    //dont run this if search function is called
    if (search) {
      return;
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskValue === "") {
      alert("Please enter a task");
      return;
    }
    setTasks([...tasks, { id: tasks.length, task: taskValue }]);

    setTaskValue("");
  };

  const deleteTask = (id) => {
    //delete tasks with unique id
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    //delete tasks from local storage
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const searchResult = (e) => {
    alert("searching");
    //filter the tasks with search value

    setTasks(
      tasks.filter((task) => {
        return task.task.toLowerCase().includes(search.toLowerCase());
      })
    );
    //if search value is empty, show all tasks
    if (search === "") {
      const tasks = localStorage.getItem("tasks");
      if (tasks) {
        setTasks(JSON.parse(tasks));
      }
    }
  };

  console.log(tasks);

  return (
    <div className="App">
      <div className="box">
        <div className="a">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
          />
          <button onClick={searchResult}>Search</button>
        </div>

        {search ? null : (
          <div className="a">
            <input
              value={taskValue}
              onChange={(e) => setTaskValue(e.target.value)}
              type="text"
            />
            <button onClick={addTask}>Add task</button>
          </div>
        )}

        {/* map through tasks */}
        {tasks
          ? tasks.map((task) => (
              <div className="task" key={task.id}>
                <h1>{task.task}</h1>

                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default App;
