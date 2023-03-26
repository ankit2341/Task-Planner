import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";

const ChangeTaskModal = (props) => {
  const { taskdata } = props;
  const [usersList, setUsersList] = useState([]);
  const [sprintList, setSprintList] = useState([]);
  const [nameOfTask, setNameOfTask] = useState(taskdata.title);
  const [typeOfTask, setTypeOfTask] = useState(taskdata.type);
  const [taskAssign, setTaskAssign] = useState(taskdata.assigneeId);
  const [sprintAssign, setSprintAssign] = useState(taskdata.sprintId);
  const [statusOfTask, setStatusOfTask] = useState(taskdata.status);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}sprints`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setSprintList(res);
      })
      .catch((err) => {
        setSprintList([]);
      });

    fetch(`${process.env.REACT_APP_API_URL}users`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setUsersList(res);
      })
      .catch((err) => {
        setUsersList([]);
      });
  }, []);

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (
      nameOfTask === "" ||
      typeOfTask === "" ||
      taskAssign === "" ||
      sprintAssign === "" ||
      statusOfTask === ""
    ) {
      toast.warn("Please fill all fields!");
    } else {
      const assigneeData = usersList.filter((el) => {
        return el._id === taskAssign;
      });

      const payload = {
        title: nameOfTask,
        type: typeOfTask,
        assigneeId: assigneeData[0]._id,
        assigneeName: assigneeData[0].username,
        assigneeAvatar: assigneeData[0].avatar,
        sprintId: sprintAssign,
        status: statusOfTask,
      };
      fetch(`${process.env.REACT_APP_API_URL}tasks/${taskdata._id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.msg === "Task updated") {
            toast.success("Task Updated Successfully!");
            props.onHide();
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          } else {
            toast.error("Failed to update task");
          }
        })
        .catch((err) => {
          toast.error("Failed to update task");
        });
    }
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name Of Task</Form.Label>
              <Form.Control
                value={nameOfTask}
                onChange={(e) => {
                  setNameOfTask(e.target.value);
                }}
                type="text"
                placeholder="Name Of Task"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Type Of Task</Form.Label>
              <Form.Select
                value={typeOfTask}
                onChange={(e) => {
                  setTypeOfTask(e.target.value);
                }}
                aria-label="Default select example"
              >
                <option value="">Select type of task</option>
                <option value="bug">Bug</option>
                <option value="feature">Feature</option>
                <option value="story">Story</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Task Assign</Form.Label>
              <Form.Select
                value={taskAssign}
                onChange={(e) => {
                  setTaskAssign(e.target.value);
                }}
                aria-label="Default select example"
              >
                <option value="">Select user to assign task</option>
                {usersList.map((el) => {
                  return (
                    <option key={el._id} value={el._id}>
                      {el.username}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Sprint Assign</Form.Label>
              <Form.Select
                value={sprintAssign}
                onChange={(e) => {
                  setSprintAssign(e.target.value);
                }}
                aria-label="Default select example"
              >
                <option value="">Select sprint to assign task</option>
                {sprintList.map((el) => {
                  return (
                    <option key={el._id} value={el._id}>
                      {el.title} From :- {el.startDate} To :-{el.endDate}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={statusOfTask}
                onChange={(e) => {
                  setStatusOfTask(e.target.value);
                }}
                aria-label="Default select example"
              >
                <option value="">Select status of task</option>
                <option value="todo">Todo</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
              </Form.Select>
            </Form.Group>
            <Button
              variant="dark"
              style={{ width: "100%" }}
              onClick={(e) => {
                handleCreateTask(e);
              }}
              type="submit"
            >
              Create Task
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ChangeTaskModal;
