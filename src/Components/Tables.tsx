import { useState } from "react";
import Table from "react-bootstrap/Table";
import EditForm from "./EditForm";

type TableRow = {
  name: string;
  age: string;
  subject: string;
  status: string;
};

type FormMode = "add" | "edit" | null;

function Tables() {
  const [data, setData] = useState<TableRow[]>([]);
  const [form, setForm] = useState<TableRow>({
    name: "",
    age: "",
    subject: "",
    status: "",
  });

  const [mode, setMode] = useState<FormMode>(null);
  const [editId, setEditId] = useState<number | null>(null);

  const handleSubmit = () => {
    if (!form.name.trim() && !form.age.trim()) return;

    if (mode === "edit" && editId !== null) {
      const updated = data.map((item, index) =>
        index === editId ? form : item
      );
      setData(updated);
    } else {
      setData([...data, form]);
    }

    resetForm();
  };

  const resetForm = () => {
    setForm({ name: "", age: "", subject: "", status: "" });
    setEditId(null);
    setMode(null);
  };

  const handleDelete = (idx: number) => {
    if (window.confirm("Are you sure you want to delete this row?")) {
      const filtered = data.filter((_, index) => index !== idx);
      setData(filtered);
    }
  };

  const handleEditClick = (index: number) => {
    setForm(data[index]);
    setEditId(index);
    setMode("edit");
  };

  return (
    <>
      {data.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Age</th>
              <th>Subject</th>
              <th>Attendance</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, id) => (
              <tr key={id}>
                <td>{id + 1}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.subject}</td>
                <td>{item.status}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEditClick(id)}
                  >
                    Edit
                  </button>{" "}
                  &nbsp;
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <div className="container1">
        {data.length === 0 && <p>No Data available</p>}
        <button
          className="btn btn-primary"
          onClick={() => {
            setMode("add");
            setForm({ name: "", age: "", subject: "", status: "" });
          }}
        >
          Click to Add Data
        </button>
      </div>

      {mode && (
        <EditForm
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
          onCancel={resetForm}
          mode={mode}
        />
      )}
    </>
  );
}

export default Tables;
