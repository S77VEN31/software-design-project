// React
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Styles
import styles from "./CreateForm.module.css";
// Components
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";
// Api
import { getCampusBranchRequest } from "@api";
// Types
import { CampusBranch, Career, Field, FormData } from "@enumerables";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Request = (...args: any[]) => Promise<any>;

interface CreateFormProps {
  initialData: FormData;
  fields: Field[];
  createButtonText: string;
  request: Request;
  layoutTitle: string;
  getRequest?: Request;
}

interface DropdownOptions {
  campusBranches: CampusBranch[];
  careers: Career[];
}

interface HandleChangeInputFunction {
  [key: string]: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

interface HandleChangeCheckboxFunction {
  [key: string]: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CreateForm = ({
  initialData,
  fields,
  request,
  createButtonText,
  layoutTitle,
  getRequest,
}: CreateFormProps) => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [showPassword, setShowPassword] = useState(false);
  const [isCareerDisabled, setIsCareerDisabled] = useState(true);
  const [dropdownOptions, setDropdownOptions] = useState<DropdownOptions>({
    campusBranches: [],
    careers: [],
  });

  const { id } = useParams();

  const getCampusBranches = async () => {
    const campusBranches = await getCampusBranchRequest();
    setDropdownOptions((prevOptions) => ({
      ...prevOptions,
      campusBranches,
    }));

    if (campusBranches.length > 0) {
      setDropdownOptions((prevOptions) => ({
        ...prevOptions,
        careers: campusBranches[0].careers,
      }));
    }
  };

  const handleChange = (id: string, value: string) => {
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleCampusBranchChange = (campusBranchId: string) => {
    const selectedBranch = dropdownOptions.campusBranches.find(
      (branch) => branch._id === campusBranchId
    );
    console.log(selectedBranch);
    if (selectedBranch) {
      setDropdownOptions((prevOptions) => ({
        ...prevOptions,
        careers: selectedBranch.careers,
      }));
      setIsCareerDisabled(false);
    }
    setFormData({
      ...formData,
      campusBranch: selectedBranch ? [selectedBranch._id] : [""],
    });
  };

  const handleCareerChange = (careerId: string) => {
    setFormData({
      ...formData,
      career: [careerId],
    });
  };

  const handleAddCoordinatorRole = (state: boolean) => {
    const isCoordinator = formData.roles.includes("Coordinator");
    if (state) {
      if (!isCoordinator) {
        // Si no está ya en la lista, lo añadimos
        setFormData({
          ...formData,
          roles: [...formData.roles, "Coordinator"],
        });
      }
    } else {
      if (isCoordinator) {
        // Si está en la lista y desmarcamos la casilla, lo eliminamos
        setFormData({
          ...formData,
          roles: formData.roles.filter((role) => role !== "Coordinator"),
        });
      }
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    request(formData, id ? id : null)
      .then((response) => {
        if (getRequest) {
          getRequest(id)
            .then((response) => {
              setFormData(response);
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          setFormData(initialData);
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCampusBranches();

    if (getRequest) {
      getRequest(id)
        .then((response) => {
          setFormData(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(formData);
    if (formData.career.length === 0) {
      setIsCareerDisabled(true);
    } else {
      setIsCareerDisabled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.career]);

  const renderField = (field: Field) => {
    const { id, type, options, validation, helperText, label } = field;

    const optionsArray =
      id === "campusBranch"
        ? dropdownOptions.campusBranches.map((branch) => ({
            value: branch._id,
            label: branch.name,
          }))
        : id === "career"
        ? dropdownOptions.careers.map((career) => ({
            value: career._id,
            label: career.name,
          }))
        : options || [];

    const recognizedFields = ["campusBranch", "career", "roles"];
    const handleChangeFunctions:
      | HandleChangeCheckboxFunction
      | HandleChangeInputFunction = {
      campusBranch: (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => handleCampusBranchChange(event.target.value),
      career: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        handleCareerChange(event.target.value),
      roles: (event: ChangeEvent<HTMLInputElement>) =>
        handleAddCoordinatorRole(event.target.checked),
      default: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        handleChange(id, event.target.value),
    };

    switch (type) {
      case "number":
        return (
          <TextField
            {...field}
            className={styles.formField}
            value={formData[id as keyof FormData] || ""}
            onChange={(e) => handleChange(id, e.target.value)}
          />
        );
      case "password":
        return (
          <TextField
            {...field}
            className={styles.formField}
            type={showPassword ? "text" : type}
            value={formData[id as keyof FormData] || ""}
            onChange={(e) => handleChange(id, e.target.value)}
            error={
              validation &&
              !validation(formData[id as keyof FormData] as string)
            }
            helperText={
              validation &&
              !validation(formData[id as keyof FormData] as string)
                ? helperText
                : ""
            }
            InputProps={{
              endAdornment: (
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
        );
      case "text":
        return (
          <TextField
            {...field}
            className={styles.formField}
            value={formData[id as keyof FormData] || ""}
            onChange={(e) => handleChange(id, e.target.value)}
            error={
              validation &&
              !validation(formData[id as keyof FormData] as string)
            }
            helperText={
              validation &&
              !validation(formData[id as keyof FormData] as string)
                ? helperText
                : ""
            }
          />
        );
      case "dropdown":
        return (
          <TextField
            {...field}
            select
            disabled={id === "career" && isCareerDisabled}
            className={styles.formField}
            onChange={
              handleChangeFunctions[
                recognizedFields.includes(id) ? id : "default"
              ]
            }
            value={formData[id as keyof FormData]}
          >
            {optionsArray!.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        );
      case "email":
        return (
          <TextField
            {...field}
            className={styles.formField}
            value={formData[id as keyof FormData] || ""}
            onChange={(e) => handleChange(id, e.target.value)}
            error={
              validation &&
              !validation(formData[id as keyof FormData] as string)
            }
            helperText={
              validation &&
              !validation(formData[id as keyof FormData] as string)
                ? helperText
                : ""
            }
          />
        );
      case "textarea":
        return (
          <TextField
            {...field}
            className={styles.formField}
            value={formData[id as keyof FormData] || ""}
            onChange={(e) => handleChange(id, e.target.value)}
          />
        );
      case "checkbox":
        return (
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                checked={formData.roles.includes("Coordinator")}
                className={styles.formField}
                value={formData[id as keyof FormData] || ""}
                onChange={
                  handleChangeFunctions[
                    recognizedFields.includes(id) ? id : "default"
                  ]
                }
              />
            }
            label={label}
          />
        );

      default:
        return <div>Unsupported field type</div>;
    }
  };

  const groupedFields = fields.reduce((acc, field) => {
    acc[field.section] = acc[field.section] || [];
    acc[field.section].push(field);
    return acc;
  }, {} as { [key: string]: Field[] });

  const renderFieldsBySection = () => {
    return Object.entries(groupedFields).map(
      ([section, fields], sectionIndex) => (
        <div key={sectionIndex} className={styles.formSection}>
          <h3>{section}</h3>
          {fields
            .reduce<Array<Array<Field>>>((rows, field, index) => {
              if (index % 2 === 0) {
                rows.push([field]);
              } else {
                rows[rows.length - 1].push(field);
              }
              return rows;
            }, [])
            .map((row, rowIndex) => (
              <div key={rowIndex} className={styles.formRow}>
                {row.map((field) => (
                  <div key={field.id} className={styles.formField}>
                    {renderField(field)}
                  </div>
                ))}
              </div>
            ))}
        </div>
      )
    );
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.header}>
        <h2>{layoutTitle}</h2>
        <Button type="submit" variant="contained">
          {createButtonText}
        </Button>
      </div>
      {renderFieldsBySection()}
    </form>
  );
};
export default CreateForm;