import React, { useEffect, useState } from "react";
import NavbarMain from "../Components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "../Styles/Landingpage.css";
import Button from "react-bootstrap/esm/Button";
import AddSprintModal from "../Components/AddSprintModal";

const LandingPage = () => {
  const [list, setList] = useState([]);
  const [users, setusers] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [activeSprint, setActiveSprint] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [todos, setTodos] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [doneTasks, setDoneTaks] = useState([]);

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
    console.log(activeSprint);
    let tasks_list = taskList.filter((el) => {
      return el.sprintId === activeSprint;
    });

    let todos_list = tasks_list.filter((el) => {
      return el.status === "todo";
    });

    let inprogress_list = tasks_list.filter((el) => {
      return el.status == "inprogress";
    });

    let done_list = tasks_list.filter((el) => {
      return el.status == "done";
    });

    setTodos(todos_list);
    setInprogress(inprogress_list);
    setDoneTaks(done_list);
  }, [activeSprint]);

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
              listStyleType: "none",
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
          {todos.length > 0 ? (
            todos.map((el) => {
              return (
                <div key={el._id} className="todo_task">
                  <h5 style={{marginTop:"5px",marginBottom:"10px"}}>{el.title}</h5>
                  <p>
                    <span style={{marginRight:"10px"}}>
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
                  <Button className="change_status" variant="warning">Edit</Button>
                  <Button className="change_status" variant="danger">Delete</Button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>to tasks found</p>
          )}
        </div>
        <div className="inprogress">
          {inprogress.length > 0 ? (
            inprogress.map((el) => {
              return (
                <div key={el._id} className="todo_task">
                <h5 style={{marginTop:"5px",marginBottom:"10px"}}>{el.title}</h5>
                <p>
                  <span style={{marginRight:"10px"}}>
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
                <Button className="change_status" variant="warning">Edit</Button>
                <Button className="change_status" variant="danger">Delete</Button>
                </div>
              </div>
              );
            })
          ) : (
            <p>to tasks found</p>
          )}
        </div>
        <div className="done">
          {doneTasks.length > 0 ? (
            doneTasks.map((el) => {
              return (
                <div key={el._id} className="todo_task">
                <h5 style={{marginTop:"5px",marginBottom:"10px"}}>{el.title}</h5>
                <p>
                  <span style={{marginRight:"10px"}}>
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
                <Button className="change_status" variant="warning">Edit</Button>
                <Button className="change_status" variant="danger">Delete</Button>
                </div>
              </div>
              );
            })
          ) : (
            <p>no taks found</p>
          )}
        </div>
      </div>
      <AddSprintModal show={modalShow} onHide={() => setModalShow(false)} />
      <ToastContainer />
    </>
  );
};

export default LandingPage;
