// React
import { useState } from "react";
// Styles
import "./CreateUserForm.module.css";
// Material UI Components
import { MenuItem, TextField } from "@mui/material";

interface Field {
  id: string;
  label: string;
  options?: { value: string; label: string }[]; // Opciones para dropdowns
  type: string; // Tipo de componente, ej. 'text'
}

interface FormData {
  [key: string]: string | number | undefined | string[];
}

interface CreateUserFormProps {
  initialData: FormData;
  fields: Field[];
}

const CreateUserForm = ({ initialData, fields }: CreateUserFormProps) => {
  const [formData, setFormData] = useState<FormData>(initialData);

  const handleChange = (id: string, value: string) => {
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submitted Form:", formData);
  };

  const renderField = (field: Field) => {
    const { id, type, label, options } = field;
    switch (type) {
      case "text":
        return (
          <TextField
            label={label}
            value={formData[id] || ""}
            onChange={(e) => handleChange(id, e.target.value)}
            fullWidth
            margin="normal"
          />
        );
      case "dropdown":
        return (
          <TextField
            select
            label={label}
            value={formData[id] || ""}
            placeholder="Select an option"
            onChange={(e) => handleChange(id, e.target.value)}
            fullWidth
            margin="normal"
          >
            {options?.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        );
      default:
        return <div>Unsupported field type</div>;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {fields.map((field, index) => (
        <div key={index} className="form-field">
          {renderField(field)}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};
export default CreateUserForm;
