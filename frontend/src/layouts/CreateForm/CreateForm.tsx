// React
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MuiTelInput } from "mui-tel-input";
// Api
import { getCampusBranchRequest, getTeamRequest } from "@api";
// Types
import {
  Activity,
  CampusBranch,
  Career,
  Field,
  FormData,
  Team,
} from "@enumerables";
// Hooks
import { DropdownList } from "@components";
import { useResponseToast } from "@hooks";
import dayjs from "dayjs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Request = (...args: any[]) => Promise<any>;

interface CreateFormProps {
  initialData: FormData;
  fields: Field[];
  createButtonText: string;
  request: Request;
  layoutTitle: string;
  getRequest?: Request;
  routeToGo?: string;
}

interface DropdownOptions {
  campusBranches: CampusBranch[];
  careers: Career[];
  teams: Team[];
  activities: Activity[];
}

const CreateForm = ({
  initialData,
  fields,
  request,
  createButtonText,
  layoutTitle,
  getRequest,
  routeToGo,
}: CreateFormProps) => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [showPassword, setShowPassword] = useState(false);
  const [isCareerDisabled, setIsCareerDisabled] = useState(true);
  const [dropdownOptions, setDropdownOptions] = useState<DropdownOptions>({
    campusBranches: [],
    careers: [],
    teams: [],
    activities: [],
  });
  const [phones, setPhones] = useState<{ [key: string]: string }>({});
  // Hooks
  const toast = useResponseToast();
  const navigation = useNavigate();
  const { id } = useParams();

  /**
   * This set of functions is used to get the enumerable data from the API
   */
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

  const getTeams = async () => {
    const teams = await getTeamRequest();
    setDropdownOptions((prevOptions) => ({
      ...prevOptions,
      teams,
    }));
  };

  /**
   * This set of functions is used to handle the changes in the form fields
   */
  const handleChange = (id: string, value: string | string[]) => {
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

  useEffect(
    () => {
      // @ts-expect-error - Esto no debería ser necesario
      if (formData.career && formData.career.length === 0) {
        setIsCareerDisabled(true);
      } else {
        setIsCareerDisabled(false);
      }
    },
    // @ts-expect-error - Esto no debería ser necesario
    [formData.career]
  );

  const handleAddCoordinatorRole = (state: boolean) => {
    // @ts-expect-error - Esto no debería ser necesario
    const isCoordinator = formData.roles.includes("Coordinator");
    if (state) {
      if (!isCoordinator) {
        // Si no está ya en la lista, lo añadimos
        setFormData({
          ...formData,
          // @ts-expect-error - Esto no debería ser necesario
          roles: [...formData.roles, "Coordinator"],
        });
      }
    } else {
      if (isCoordinator) {
        // Si está en la lista y desmarcamos la casilla, lo eliminamos
        setFormData({
          ...formData,
          // @ts-expect-error - Esto no debería ser necesario
          roles: formData.roles.filter((role) => role !== "Coordinator"),
        });
      }
    }
  };

  const handlePhoneChange = (id: string, value: string) => {
    setPhones((prevPhones) => ({
      ...prevPhones,
      [id]: value,
    }));
  };

  useEffect(() => {
    const newPhones: { [key: string]: string } = {};
    fields.forEach((field) => {
      if (field.type === "tel") {
        newPhones[field.id] = formData[field.id as keyof FormData] || "";
      }
    });
    setPhones(newPhones);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () => {
      // crea un array de strings con los teléfonos
      const phonesArray = Object.values(phones);
      setFormData({
        ...formData,
        phones: phonesArray,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [phones]
  );

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
              console.log(error);
              toast(500, ["Error al obtener los datos"]);
            });
        } else {
          setFormData(initialData);
        }
        toast(200, response.message);
        routeToGo && navigation(routeToGo);
      })
      .catch((error) => {
        console.log(error);
        toast(500, ["Error al guardar los datos"]);
      });
  };

  useEffect(() => {
    getCampusBranches();
    getTeams();
    if (getRequest) {
      getRequest(id)
        .then((response) => {
          setFormData(response);
        })
        .catch((error) => {
          toast(error.status, error.message);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(formData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const renderField = (field: Field) => {
    const {
      id,
      type,
      options,
      validation,
      helperText,
      label,
      required,
      fullWidth,
    } = field;

    const optionsArray = options
      ? options
      : id === "campusBranch"
      ? dropdownOptions.campusBranches.map((branch) => ({
          value: branch._id,
          label: branch.name,
        }))
      : id === "career"
      ? dropdownOptions.careers.map((career) => ({
          value: career._id,
          label: career.name,
        }))
      : id === "team"
      ? dropdownOptions.teams.map((team) => ({
          value: team._id,
          label: team.name,
        }))
      : id === "activities"
      ? dropdownOptions.activities.map((activity) => ({
          value: activity._id,
          label: activity.name,
        }))
      : [];

    const recognizedFields = [
      "campusBranch",
      "career",
      "roles",
      "active",
      "team",
      "activities",
      "startDate",
      "endDate",
      "personal",
      "office",
    ];
    const handleChangeFunctions = {
      campusBranch: (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => handleCampusBranchChange(event.target.value),
      career: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        handleCareerChange(event.target.value),
      roles: (event: ChangeEvent<HTMLInputElement>) =>
        handleAddCoordinatorRole(event.target.checked),
      active: (event: ChangeEvent<HTMLInputElement>) =>
        handleChange(id, event.target.checked as unknown as string),
      team: (event: ChangeEvent<HTMLInputElement>) =>
        handleChange(id, event.target.value),
      activities: (list: string[]) => handleChange(id, list),
      personal: (value: string) => handlePhoneChange(id, value),
      office: (value: string) => handlePhoneChange(id, value),
      startDate: (date: Date | null) =>
        handleChange(id, date?.toISOString() || ""),
      endDate: (date: Date | null) =>
        handleChange(id, date?.toISOString() || ""),
      default: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        handleChange(id, event.target.value),
    };

    const changeFunctionSelector = (id: string) => {
      // @ts-expect-error - Esto no debería ser necesario
      return handleChangeFunctions[
        recognizedFields.includes(id) ? id : "default"
      ];
    };

    const handleCheckedFunctions = {
      // @ts-expect-error - Esto no debería ser necesario
      roles: () => formData.roles.includes("Coordinator"),
      // @ts-expect-error - Esto no debería ser necesario
      active: () => (formData.active ? true : false),
    };

    switch (type) {
      case "number":
        return (
          <TextField
            {...field}
            className={styles.formField}
            value={formData[id as keyof FormData] || ""}
            onChange={changeFunctionSelector(id)}
          />
        );
      case "password":
        return (
          <TextField
            {...field}
            className={styles.formField}
            type={showPassword ? "text" : type}
            value={formData[id as keyof FormData] || ""}
            onChange={changeFunctionSelector(id)}
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
            onChange={changeFunctionSelector(id)}
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
            required={formData[id as keyof FormData] === "" ? true : false}
          />
        );
      case "dropdown":
        return (
          <TextField
            {...field}
            select
            disabled={id === "career" && isCareerDisabled}
            className={styles.formField}
            onChange={changeFunctionSelector(id)}
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
            onChange={changeFunctionSelector(id)}
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
            onChange={changeFunctionSelector(id)}
          />
        );
      case "checkbox":
        return (
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                checked={
                  // @ts-expect-error - Esto no debería ser necesario
                  handleCheckedFunctions[id]()
                }
                className={styles.formField}
                value={formData[id as keyof FormData] || ""}
                onChange={changeFunctionSelector(id)}
              />
            }
            label={
              label
                ? label
                : formData[id as keyof FormData]
                ? "Activo"
                : "Inactivo"
            }
          />
        );
      case "tel":
        return (
          <MuiTelInput
            {...field}
            value={phones[id] || ""}
            onChange={changeFunctionSelector(id)}
          />
        );
      case "date":
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              {...field}
              onChange={changeFunctionSelector(id)}
              sx={fullWidth ? { width: "100%" } : {}}
              minDate={dayjs()}
              slotProps={{
                textField: {
                  required,
                },
              }}
            />
          </LocalizationProvider>
        );
      case "dropdown-list":
        return (
          <DropdownList
            options={optionsArray}
            // @ts-expect-error - is an string[]
            selectedOptions={formData[id]}
            setSelectedOptions={changeFunctionSelector(id)}
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
