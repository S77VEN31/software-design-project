// React
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Styles
import styles from "./CreateForm.module.css";
// Components
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, MenuItem, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MuiTelInput } from "mui-tel-input";
// Api
import {
  getActivityRequest,
  getCampusBranchRequest,
  getCampusBranchTeachersRequest,
  getStudentRequest,
  getTeacherRequest,
  getTeamRequest,
} from "@api";
// Types
import {
  Activity,
  CampusBranch,
  Career,
  Field,
  FormData,
  Role,
  Student,
  Teacher,
  TeamOverview,
} from "@enumerables";
// Hooks
import { DropdownList } from "@components";
import { useResponseToast } from "@hooks";
import { formatDate } from "@utils";
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
  teams: TeamOverview[];
  activities: Activity[];
  teachers: Teacher[];
  coordinators: Teacher[];
  students: Student[];
  organizers: Teacher[];
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
  const [disabledOptions, setDisabledOptions] = useState({
    teachers: true,
    career: true,
    coordinator: true,
  });
  /*
   * This function is used to set the disabled options from the fields
   * It is used to set the disabled options from the fields when the component mounts
   */
  const setDisabledOptionsFromFields = () => {
    fields.forEach((field) => {
      setDisabledOptions((prevOptions) => ({
        ...prevOptions,
        [field.id]: field.disabled || false,
      }));
    });
  };
  const isInDisabledOptions = (id: string) => {
    return Object.prototype.hasOwnProperty.call(disabledOptions, id)
      ? disabledOptions[id as keyof typeof disabledOptions]
      : false;
  };
  const toggleDisabledOptions = (id: string, state: boolean) => {
    setDisabledOptions((prevOptions) => ({
      ...prevOptions,
      [id]: state,
    }));
  };
  const [dropdownOptions, setDropdownOptions] = useState<DropdownOptions>({
    campusBranches: [],
    careers: [],
    teams: [],
    activities: [],
    teachers: [],
    coordinators: [],
    students: [],
    organizers: [],
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

  const getStudents = async () => {
    const students = await getStudentRequest();
    setDropdownOptions((prevOptions) => ({
      ...prevOptions,
      students,
    }));
  };

  const getTeams = async () => {
    const teams = await getTeamRequest();
    setDropdownOptions((prevOptions) => ({
      ...prevOptions,
      teams,
    }));
  };

  const getOrganizers = async () => {
    const organizers = await getTeacherRequest();
    setDropdownOptions((prevOptions) => ({
      ...prevOptions,
      organizers,
    }));
  };

  const getActivities = async () => {
    const activities = await getActivityRequest();
    setDropdownOptions((prevOptions) => ({
      ...prevOptions,
      activities,
    }));
  };
  /**
   * This use effect is used to get the teachers and coordinators from the API when the campus branch changes
   * It also enables the disabled options for teachers, coordinator and career when the campus branch is selected
   **/
  useEffect(
    () => {
      // @ts-expect-error - Its existence is optional
      if (formData.campusBranch) {
        // @ts-expect-error - Its existence is already checked
        if (formData.campusBranch.length > 0) {
          // @ts-expect-error - Its existence is already checked
          getTeachersAndCoordinators(formData.campusBranch[0]);
          toggleDisabledOptions("teachers", false);
          toggleDisabledOptions("career", false);
          toggleDisabledOptions("coordinator", false);
          toggleDisabledOptions("organizers", false);
        }
      } else {
        toggleDisabledOptions("teachers", true);
        toggleDisabledOptions("career", true);
        toggleDisabledOptions("coordinator", true);
        toggleDisabledOptions("organizers", true);
      }
    },
    // @ts-expect-error - Its existence is optional
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formData.campusBranch]
  );

  const getTeachersAndCoordinators = async (id: string) => {
    const teachers = await getCampusBranchTeachersRequest(id);
    // Filtered teachers are those that are not coordinators
    const filteredTeachers = teachers.filter(
      (teacher: Teacher) => !teacher.roles.includes("Coordinator")
    );
    // Coordinators are those that are not coordinators and are not already in the form data teachers list
    const coordinators = teachers.filter(
      (teacher: Teacher) =>
        teacher.roles.includes("Coordinator") &&
        // @ts-expect-error - Its existence is optional
        !formData.teachers.includes(teacher._id)
    );
    setDropdownOptions((prevOptions) => ({
      ...prevOptions,
      teachers: filteredTeachers,
      coordinators,
    }));
  };
  /**
   * This use effect is used to re render the coordinators and teachers list when the coordinators or teachers list changes
   * It takes the campus branch id in consideration to get the teachers and coordinators of the selected campus branch
   **/
  useEffect(
    () => {
      // @ts-expect-error - Its existence is optional
      if (formData.campusBranch) {
        // @ts-expect-error - Its existence is already checked
        if (formData.campusBranch.length > 0) {
          // @ts-expect-error - Its existence is already checked
          getTeachersAndCoordinators(formData.campusBranch[0]);
        }
      }
    },
    // @ts-expect-error - Its existence is optional
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formData.teachers, formData.coordinator]
  );

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
    if (selectedBranch) {
      setDropdownOptions((prevOptions) => ({
        ...prevOptions,
        careers: selectedBranch.careers,
      }));
    }
    setFormData({
      ...formData,
      // @ts-expect-error - Its existence is optional
      campusBranch: selectedBranch ? [selectedBranch._id] : [""],
    });
  };

  const handleCareerChange = (careerId: string) => {
    setFormData({
      ...formData,
      // @ts-expect-error - Its existence is optional
      career: [careerId],
    });
  };

  const handleAddRoles = (role: Role) => {
    setFormData({
      ...formData,
      // @ts-expect-error - Its existence is optional
      roles: [role],
    });
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
        // @ts-expect-error - Its existence is optional
        phones: phonesArray,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [phones]
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    /*
     * This function is used to send the data to the API
     * It also resets the form data when the request is successful
     * If there are numbers in the form data, they are converted to strings
     */
    const formDataCopy = { ...formData };
    Object.keys(formDataCopy).forEach((key) => {
      // @ts-expect-error - Its existence is optional
      if (typeof formDataCopy[key] === "number") {
        // @ts-expect-error - Its existence is optional
        formDataCopy[key] = formDataCopy[key].toString();
      }
    });
    console.log(formDataCopy);

    request(formDataCopy, id ? id : null)
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
        console.log(error.response.data.message);
        toast(500, error.response.data.message);
      });
  };

  useEffect(() => {
    getCampusBranches();
    getTeams();
    getStudents();
    setDisabledOptionsFromFields();
    getOrganizers();
    getActivities();
    if (getRequest) {
      getRequest(id)
        .then((response) => {
          console.log(response);
          setFormData(response);
        })
        .catch((error) => {
          toast(error.status, error.message);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      : id === "teams"
      ? dropdownOptions.teams.map((team) => ({
          value: team._id,
          label: team.name,
        }))
      : id === "activities"
      ? dropdownOptions.activities.map((activity) => ({
          value: activity._id,
          label: activity.name,
        }))
      : id === "teachers"
      ? dropdownOptions.teachers.map((teacher) => ({
          value: teacher._id,
          label: teacher.name,
        }))
      : id === "coordinator"
      ? dropdownOptions.coordinators.map((coordinator) => ({
          value: coordinator._id,
          label: coordinator.name,
        }))
      : id === "students"
      ? dropdownOptions.students.map((student) => ({
          value: student._id,
          label: student.name,
        }))
      : id === "organizers"
      ? dropdownOptions.organizers.map((organizer) => ({
          value: organizer._id,
          label: organizer.name,
        }))
      : [];

    const recognizedFields = [
      "campusBranch",
      "career",
      "roles",
      "teams",
      "activities",
      "dateTime",
      "startDate",
      "endDate",
      "personal",
      "office",
      "organizers",
      "year",
      "teachers",
      "coordinator",
      "students",
    ];

    const handleChangeFunctions = {
      campusBranch: (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => handleCampusBranchChange(event.target.value),
      career: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        handleCareerChange(event.target.value),
      roles: (event: ChangeEvent<HTMLInputElement>) =>
        handleAddRoles(event.target.value as Role),
      teams: (event: ChangeEvent<HTMLInputElement>) =>
        handleChange(id, [event.target.value]),
      activities: (list: string[]) => handleChange(id, list),
      teachers: (list: string[]) => handleChange(id, list),
      students: (list: string[]) => handleChange(id, list),
      organizers: (list: string[]) => handleChange(id, list),
      coordinator: (event: ChangeEvent<HTMLInputElement>) =>
        handleChange(id, [event.target.value]),
      personal: (value: string) => handlePhoneChange(id, value),
      office: (value: string) => handlePhoneChange(id, value),
      startDate: (date: Date | null) =>
        handleChange(id, date?.toISOString() || ""),
      endDate: (date: Date | null) =>
        handleChange(id, date?.toISOString() || ""),
      dateTime: (date: Date | null) =>
        handleChange(id, date?.toISOString() || ""),
      year: (date: Date | null) =>
        handleChange(
          id,
          dayjs(date as Date)
            .year()
            .toString() || ""
        ),
      default: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        handleChange(id, event.target.value),
    };

    const changeFunctionSelector = (id: string) => {
      // @ts-expect-error - Esto no debería ser necesario
      return handleChangeFunctions[
        recognizedFields.includes(id) ? id : "default"
      ];
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
            disabled={isInDisabledOptions(id)}
            className={styles.formField}
            onChange={changeFunctionSelector(id)}
            value={formData[id as keyof FormData]}
          >
            {optionsArray && optionsArray.length > 0 ? (
              optionsArray.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled value="">
                No hay opciones disponibles
              </MenuItem>
            )}
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
              label={formatDate(formData[id as keyof FormData]) || label}
              sx={fullWidth ? { width: "100%" } : {}}
              slotProps={{
                textField: {
                  required,
                },
              }}
              minDate={dayjs()}
            />
          </LocalizationProvider>
        );
      case "dropdown-list":
        return (
          <DropdownList
            {...field}
            disabled={isInDisabledOptions(id)}
            // @ts-expect-error - is a { value: string; label: string }[]
            options={optionsArray}
            // @ts-expect-error - is an string[]
            selectedOptions={formData[id]}
            setSelectedOptions={changeFunctionSelector(id)}
          />
        );
      case "year":
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              minDate={dayjs().year(1971)}
              maxDate={dayjs().year(new Date().getFullYear() + 1)}
              views={["year"]}
              openTo="year"
              sx={fullWidth ? { width: "100%" } : {}}
              label={formData[id as keyof FormData] || label}
              onChange={changeFunctionSelector(id)}
              slotProps={{
                textField: {
                  required,
                },
              }}
            />
          </LocalizationProvider>
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
