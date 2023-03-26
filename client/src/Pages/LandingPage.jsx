import React, { useEffect, useState } from "react";
import NavbarMain from "../Components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "../Styles/Landingpage.css";
import Button from "react-bootstrap/esm/Button";
import AddSprintModal from "../Components/AddSprintModal";
import ChangeTaskModal from "../Components/ChangeTaskModal";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const [list, setList] = useState([]);
  const [users, setusers] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [activeSprint, setActiveSprint] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [statusModalShow, setStatusModalShow] = React.useState(false);
  const [todos, setTodos] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [doneTasks, setDoneTaks] = useState([]);
  const isAuth = useSelector((store) => store.reducer.isAuth);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}sprints`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setList(res);
      })
      .catch((err) => {
        setList([]);
      });

    fetch(`${process.env.REACT_APP_API_URL}tasks`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setTaskList(res);
      })
      .catch((err) => {
        setTaskList([]);
      });

    fetch(`${process.env.REACT_APP_API_URL}users`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setusers(res);
      })
      .catch((err) => {
        setusers([]);
      });
  }, [activeSprint]);

  useEffect(() => {
    let tasks_list = taskList.filter((el) => {
      return el.sprintId === activeSprint;
    });

    let todos_list = tasks_list.filter((el) => {
      return el.status === "todo";
    });

    let inprogress_list = tasks_list.filter((el) => {
      return el.status === "inprogress";
    });

    let done_list = tasks_list.filter((el) => {
      return el.status === "done";
    });

    setTodos(todos_list);
    setInprogress(inprogress_list);
    setDoneTaks(done_list);
  }, [activeSprint]);

  useEffect(() => {
    toast.success("Click on Sprint to continue");
  }, []);

  if (isAuth == false) {
    toast.warn("Not Logged In");
    return (
      <>
        <NavbarMain />
        <div className="NOT_LOGGED_IN">
          <div>Login To Continue</div>
        </div>
        <ToastContainer position="bottom-right" theme="dark" autoClose={1500} />
      </>
    );
  }

  return (
    <>
      <NavbarMain />
      <div className="main_parent_div">
        <div className="sprints">
          <Button
            variant="light"
            style={{ width: "80%", marginLeft: "10%", marginTop: "5%" }}
            onClick={() => setModalShow(true)}
          >
            Create Sprint
          </Button>
          <ul
            style={{
              listStyleType: "disc",
              border: "1px solid #fff",
              width: "80%",
              marginLeft: "10%",
              marginTop: "5%",
            }}
          >
            {list.map((el) => {
              return (
                <li
                  key={el._id}
                  className={activeSprint === el._id ? "active" : "none"}
                  onClick={() => {
                    setActiveSprint(el._id);
                  }}
                  style={{
                    cursor: "pointer",
                    borderBottom: "1px solid #fff",
                    padding: "10px",
                  }}
                >
                  {el.title}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="todo">
          <div className="todo_task" style={{ fontWeight: "400" }}>
            TODO TASKS
          </div>
          {todos.length > 0 ? (
            todos.map((el) => {
              return (
                <div key={el._id} className="todo_task">
                  <h5 style={{ marginTop: "5px", marginBottom: "10px" }}>
                    {el.title}
                  </h5>
                  <p>
                    <span style={{ marginRight: "10px" }}>
                      <img
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                        }}
                        src={el.assigneeAvatar}
                        alt=""
                      />
                    </span>
                    {el.assigneeName}
                  </p>
                  <button
                    className={
                      el.type === "bug"
                        ? "bug_type"
                        : el.type === "feature"
                        ? "feature_type"
                        : "story_type"
                    }
                  >
                    {el.type}
                  </button>
                  <div className="btn_updates_tasks">
                    <Button
                      className="change_status"
                      variant="warning"
                      onClick={() => setStatusModalShow(true)}
                    >
                      Edit
                    </Button>
                    <ChangeTaskModal
                      show={statusModalShow}
                      taskdata={el}
                      onHide={() => setStatusModalShow(false)}
                    />
                    <Button className="change_status" variant="danger">
                      Delete
                    </Button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="todo_task">
              {" "}
              <p>No Tasks Found</p>
            </div>
          )}
        </div>
        <div className="inprogress">
          <div className="todo_task" style={{ fontWeight: "400" }}>
            IN PROGRESS TASKS
          </div>
          {inprogress.length > 0 ? (
            inprogress.map((el) => {
              return (
                <div key={el._id} className="todo_task">
                  <h5 style={{ marginTop: "5px", marginBottom: "10px" }}>
                    {el.title}
                  </h5>
                  <p>
                    <span style={{ marginRight: "10px" }}>
                      <img
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                        }}
                        src={el.assigneeAvatar}
                        alt=""
                      />
                    </span>
                    {el.assigneeName}
                  </p>
                  <button
                    className={
                      el.type === "bug"
                        ? "bug_type"
                        : el.type === "feature"
                        ? "feature_type"
                        : "story_type"
                    }
                  >
                    {el.type}
                  </button>
                  <div className="btn_updates_tasks">
                    <Button
                      className="change_status"
                      variant="warning"
                      onClick={() => setStatusModalShow(true)}
                    >
                      Edit
                    </Button>
                    <ChangeTaskModal
                      show={statusModalShow}
                      taskdata={el}
                      onHide={() => setStatusModalShow(false)}
                    />
                    <Button className="change_status" variant="danger">
                      Delete
                    </Button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="todo_task">
              {" "}
              <p>No Tasks Found</p>
            </div>
          )}
        </div>
        <div className="done">
          <div className="todo_task" style={{ fontWeight: "400" }}>
            DONE TASKS
          </div>
          {doneTasks.length > 0 ? (
            doneTasks.map((el) => {
              return (
                <div key={el._id} className="todo_task">
                  <h5 style={{ marginTop: "5px", marginBottom: "10px" }}>
                    {el.title}
                  </h5>
                  <p>
                    <span style={{ marginRight: "10px" }}>
                      <img
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                        }}
                        src={el.assigneeAvatar}
                        alt=""
                      />
                    </span>
                    {el.assigneeName}
                  </p>
                  <button
                    className={
                      el.type === "bug"
                        ? "bug_type"
                        : el.type === "feature"
                        ? "feature_type"
                        : "story_type"
                    }
                  >
                    {el.type}
                  </button>
                  <div className="btn_updates_tasks">
                    <Button
                      className="change_status"
                      variant="warning"
                      onClick={() => setStatusModalShow(true)}
                    >
                      Edit
                    </Button>
                    <ChangeTaskModal
                      show={statusModalShow}
                      taskdata={el}
                      onHide={() => setStatusModalShow(false)}
                    />
                    <Button className="change_status" variant="danger">
                      Delete
                    </Button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="todo_task">
              {" "}
              <p>No Tasks Found</p>
            </div>
          )}
        </div>
      </div>
      <AddSprintModal show={modalShow} onHide={() => setModalShow(false)} />
      <ToastContainer position="bottom-right" theme="dark" autoClose={1500} />
    </>
  );
};

export default LandingPage;
