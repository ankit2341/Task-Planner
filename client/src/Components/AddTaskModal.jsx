import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";

const AddTaskModal = (props) => {
  const handleCreateTask = () => {};
  const res = JSON.parse(localStorage.getItem("res")) || "";
  const [usersList, setUsersList] = useState([]);
  const [sprintList, setSprintList] = useState([]);

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

  return (
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
        {/* title:String,
    type:String,
    assigneeId:String,
    assigneeName:String,
    assigneeAvatar:String,
    sprintId:String,
    status:String */}
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name Of Task</Form.Label>
            <Form.Control type="text" placeholder="Name Of Task" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Type Of Task</Form.Label>
            <Form.Select aria-label="Default select example">
              <option value="bug">Bug</option>
              <option value="feature">Feature</option>
              <option value="story">Story</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Task Assign</Form.Label>
            <Form.Select aria-label="Default select example">
              {usersList.map((el) => {
                return (
                  <option value={el._id}>
                    <img
                      style={{
                        width: "30px",
                        borderRadius: "50%",
                        marginRight: "10px",
                        height: "30px",
                      }}
                      src={el.avatar}
                      alt=""
                    />
                    {el.username}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Sprint Assign</Form.Label>
            <Form.Select aria-label="Default select example">
              {sprintList.map((el) => {
                return (
                  <option value={el._id}>
                    {el.title} From :- {el.startDate} To :-{el.endDate}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Status</Form.Label>
            <Form.Control type="date" placeholder="Enter Status" />
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
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTaskModal;
