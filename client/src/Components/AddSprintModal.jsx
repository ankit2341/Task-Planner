import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";

const AddSprintModal = (props) => {
   
  const handleCreateSprint=(e)=>{
    e.preventDefault();
    const payload="";
    if(payload==""){
      return toast.warn("Fill all the fields!")
    }
    // fetch(`${process.env.REACT_APP_API_URL}sprints`,{
    //   method:"POST",
    //   headers:{
    //     "Content-type":"application/json"
    //   },
    //   body:JSON.stringify(payload)
    // })
    // .then((res) => {
    //   return res.json();
    // })
    // .then((res) => {
    //    if(res.msg==="Sprint Added"){
    //     toast.success("Sprint Added");
    //    }
    //    else{
    //     toast.error("Failed To Add")
    //    }
    // })
    // .catch((err) => {
    //   toast.error("Failed To Add")
    // });
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Sprint
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name Of Sprint</Form.Label>
            <Form.Control type="text" placeholder="Name Of Sprint" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Start Date</Form.Label>
            <Form.Control type="date" placeholder="Enter Start Date" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>End Date</Form.Label>
            <Form.Control type="date" placeholder="Enter End Date" />
          </Form.Group>
          <Button variant="dark" style={{ width: "100%" }} onClick={(e)=>{handleCreateSprint(e)}} type="submit">
            Create Sprint
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddSprintModal;
