import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

type TableRow = {
  name: string;
  age: string;
  subject: string;
  status: string;
};

type EditFormProps = {
  form: TableRow;
  setForm: React.Dispatch<React.SetStateAction<TableRow>>;
  onSubmit: () => void;
  onCancel: () => void;
  mode: "add" | "edit";
};

const EditForm: React.FC<EditFormProps> = ({
  form,
  setForm,
  onSubmit,
  onCancel,
  mode,
}) => {
  const handleChange = (field: keyof TableRow, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="border rounded shadow p-4 bg-light">
            <h3 className="text-center mb-4">
              {mode === "edit" ? "Update Student" : "Add Student"}
            </h3>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={form.name}
                  placeholder="Enter name"
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formAge">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  value={form.age}
                  placeholder="Enter age"
                  onChange={(e) => handleChange("age", e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formSubject">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  value={form.subject}
                  placeholder="Enter subject"
                  onChange={(e) => handleChange("subject", e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formAttendance">
                <Form.Label>Attendance</Form.Label>
                <Form.Select
                  value={form.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                >
                  <option>Select status</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </Form.Select>
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Button variant="secondary" onClick={onCancel}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  {mode === "edit" ? "Update" : "Add"}
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EditForm;
