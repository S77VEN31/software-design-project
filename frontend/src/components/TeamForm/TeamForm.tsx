// React
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Styles
import styles from "./TeamForm.module.css";
// Components
import {
  Button,
  Checkbox,
  IconButton,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
// Api
import { getStudentRequest, getTeacherRequest } from "@api";
// Types
import { Field, Student, Teacher, Team } from "@enumerables";
// Hooks
import { useResponseToast } from "@hooks";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Request = (...args: any[]) => Promise<any>;

// Material UI Styles
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: "auto",
    },
  },
};

interface TeamFormProps {
  initialData: Team;
  fields: Field[];
  createButtonText: string;
  request: Request;
  layoutTitle: string;
  getRequest?: Request;
  routeToGo?: string;
}

interface SelectableTeacher extends Teacher {
  _id: string;
}

interface SelectableStudent extends Student {
  _id: string;
}

interface MultiSelectOptions {
  teachers: SelectableTeacher[],
  students: SelectableStudent[]
}

interface DropdownOptions {
  coordinators: SelectableTeacher[];
}

interface HandleChangeInputFunction {
  [key: string]: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

interface HandleChangeSelectFunction {
  [key: string]: (
    event: SelectChangeEvent<string>
  ) => void;
}

const TeamForm = ({
  initialData,
  fields,
  request,
  createButtonText,
  layoutTitle,
  getRequest,
  routeToGo,
}: TeamFormProps) => {
  const [formData, setFormData] = useState<Team>(initialData);
  const [dropdownOptions, setDropdownOptions] = useState<DropdownOptions>({
    coordinators: [],
  });
  const [multiSelectOptions, setMultiSelectOptions] = useState<MultiSelectOptions>({
    teachers: [],
    students: [],
  });
  const [studentText, setStudentText] = useState("");
  const [teacherText, setTeacherText] = useState("");
  // Hooks
  const toast = useResponseToast();
  const navigation = useNavigate();
  const { code } = useParams();

  const getTeachers = async () => {
    const teachers = await getTeacherRequest();
    setDropdownOptions((prevOptions) => ({
      ...prevOptions,
      coordinators: teachers
    }));
    setMultiSelectOptions((prevOptions) => ({
      ...prevOptions,
      teachers
    }))
  }

  const getStudents = async () => {
    const students = await getStudentRequest();
    setMultiSelectOptions((prevOptions) => ({
      ...prevOptions,
      students,
    }));
  };

  // const getCampusBranches = async () => {
  //   const campusBranches = await getCampusBranchRequest();
  //   setDropdownOptions((prevOptions) => ({
  //     ...prevOptions,
  //     campusBranches,
  //   }));

  //   if (campusBranches.length > 0) {
  //     setDropdownOptions((prevOptions) => ({
  //       ...prevOptions,
  //       careers: campusBranches[0].careers,
  //     }));
  //   }
  // };

  const handleStudentsChange = (studentsIds: string[]) => {
    const newSelectedStudents = multiSelectOptions.students.filter(
      (student) => studentsIds.includes(student._id)
    );
    if (newSelectedStudents) {
      setFormData({
        ...formData,
        students: newSelectedStudents ? newSelectedStudents.map(student => student._id) : formData.students
      });
      setStudentText(
        newSelectedStudents
          .map(student => student.name)
          .join(", ")
      );
    }
  };

  const handleTeachersChange = (teachersIds: string[]) => {
    const newSelectedTeachers = multiSelectOptions.teachers.filter(
      (teacher) => teachersIds.includes(teacher._id)
    );
    if (newSelectedTeachers) {
      setFormData({
        ...formData,
        teachers: newSelectedTeachers ? newSelectedTeachers.map(teacher => teacher._id) : formData.teachers
      });
      setTeacherText(
        newSelectedTeachers
          .map(student => student.name)
          .join(", ")
      );
    }
  };

  const handleCoordinatorChange = (coordinatorId: string) => {
    const newSelectedCoordinator = dropdownOptions.coordinators.find(
      (teacher) => teacher._id === coordinatorId
    );
    if (newSelectedCoordinator) {
      setFormData({
        ...formData,
        coordinator: newSelectedCoordinator ? newSelectedCoordinator._id : ""
      });
    }
  };

  const handleChange = (id: string, value: string) => {
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    request(
      code ? 
        {
          name: formData.name,
          description: formData.description,
          students: formData.students,
          teachers: formData.teachers,
          coordinator: formData.coordinator,
        } 
        : 
        formData, 
      code ? code : null
    )
      .then((response) => {
        if (getRequest) {
          getRequest(code)
            .then((response) => {
              setFormData(response);
            })
            .catch((error) => {
              console.log(error);
              toast(500, ["Error al obtener los datos del equipo"]);
            });
        } else {
          setFormData(initialData);
        }
        toast(200, response.message);
        routeToGo && navigation(routeToGo);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        toast(500, ["Error al guardar los datos"]);
      });
  };

  const handleMultiselectChange = (event: SelectChangeEvent<any>, id: string) => {
    const {
      target: { value },
    } = event;
    if (id==="students") {
      handleStudentsChange(value)
    } else {
      handleTeachersChange(value);
    }
  }

  useEffect(() => {
    getStudents();
    getTeachers();

    if (getRequest) {
      getRequest(code)
        .then((response) => {
          console.log(response)
          setFormData(response);
        })
        .catch((error) => {
          toast(error.status, error.message);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // if any formData field is "N/A" change the value to empty string

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    for (const key in formData) {
      if (formData[key as keyof Team] === "N/A") {
        setFormData({
          ...formData,
          [key]: "",
        });
      }
    }
    console.log(formData);
  }, [formData]);

  const renderField = (field: Field) => {
    const { id, type, options, validation, helperText, label } = field;

    const optionsArray = dropdownOptions.coordinators
      // .filter(teacher => teacher.roles.includes("Coordinator"))
      .map((teacher) => ({
        value: teacher._id,
        label: teacher.name,
      }));

    const multioptionsTeacherArray = multiSelectOptions.teachers.map((teacher) => ({
      value: teacher._id,
      label: teacher.name,
    }));

    const multioptionsStudentArray = multiSelectOptions.students.map((student) => ({
      value: student._id,
      label: student.name,
    }));

    // const recognizedFields = ["teachers", "coordinator", "students"];
    // const handleChangeFunctions: 
    //   | HandleChangeSelectFunction
    //   | HandleChangeInputFunction = {
    //   students: (
    //     event: SelectChangeEvent<string>
    //   ) => handleStudentsChange(event.target.value),
    //   teachers: (
    //     event: SelectChangeEvent<string>
    //   ) => handleTeachersChange(event.target.value),
    //   coordinator: (
    //     event: ChangeEvent<any>
    //   ) => handleCoordinatorChange(event.target.value),
    //   default: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    //     handleChange(id, event.target.value),
    // };

    switch (type) {
      case "number":
        return (
          <TextField
            {...field}
            className={styles.formField}
            value={formData[id as keyof Team] || ""}
            onChange={(e) => handleChange(id, e.target.value)}
          />
        );
      case "text":
        return (
          <TextField
            {...field}
            className={styles.formField}
            value={formData[id as keyof Team] || ""}
            onChange={(e) => handleChange(id, e.target.value)}
            error={
              validation &&
              !validation(formData[id as keyof Team] as string)
            }
            helperText={
              validation &&
              !validation(formData[id as keyof Team] as string)
                ? helperText
                : ""
            }
            disabled={formData[id as keyof Team] === "N/A" ? true : false}
            required={formData[id as keyof Team] === "" ? true : false}
          />
        );
      case "dropdown":
        return (
          <TextField
            {...field}
            select
            disabled={false}
            className={styles.formField}
            onChange={e => handleCoordinatorChange(e.target.value)}
            value={formData[id as keyof Team]}
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
            value={formData[id as keyof Team] || ""}
            onChange={(e) => handleChange(id, e.target.value)}
            error={
              validation &&
              !validation(formData[id as keyof Team] as string)
            }
            helperText={
              validation &&
              !validation(formData[id as keyof Team] as string)
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
            value={formData[id as keyof Team] || ""}
            onChange={(e) => handleChange(id, e.target.value)}
          />
        );
      case "multiselect":
          if (id === "students") {
            return (
              <Select
                multiple
                className={styles.formField}
                onChange={(e) => handleMultiselectChange(e, id)}
                value={formData[id as keyof Team]}
                input={<OutlinedInput label="Tag" />}
                renderValue={() => studentText}
                MenuProps={MenuProps}
              >
                {
                  multioptionsStudentArray.map((value) => {
                    return (
                      <MenuItem key={value.value} value={value.value} >
                        <Checkbox checked={formData[id as keyof Team]!.includes(value.value)} />
                        <ListItemText primary={value.label} />
                      </MenuItem>)
                  })
                }

              </Select>
            )} else  {
              return (
                <Select
                  multiple
                  className={styles.formField}
                  onChange={(e) => handleMultiselectChange(e, id)}
                  value={formData[id as keyof Team]}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={() => teacherText}
                  MenuProps={MenuProps}
                >
                  {
                    multioptionsTeacherArray.map((value) => {
                      return (
                        <MenuItem key={value.value} value={value.value} >
                          <Checkbox checked={formData[id as keyof Team]!.includes(value.value)} />
                          <ListItemText primary={value.label} />
                        </MenuItem>)
                    })
                  }
                
                </Select>
            )}
          
        //   <Select
        //     multiple
        //     className={styles.formField}
        //     onChange={(e) => handleMultiselectChange(e, id)}
        //     value={formData[id as keyof Team]}
        //     input={<OutlinedInput label="Tag" />}
        //     renderValue={(selected) => selected.concat(', ')}
        //     MenuProps={MenuProps}
        // >
        //   {
        //     id === "students" ?
        //       multioptionsStudentArray.map((value) => (
        //         <MenuItem key={value.value} value={value.value} >
        //           <Checkbox checked={formData[id as keyof Team].includes(value.value)} />
        //           <ListItemText primary={value.label} />
        //         </MenuItem>
        //       )) 
        //       :
        //       multioptionsTeacherArray.map((value) => (
        //         <MenuItem key={value.value} value={value.value}>
        //           <Checkbox checked={formData[id as keyof Team].includes(value.value)} />
        //           <ListItemText primary={value.label} />
        //         </MenuItem>
        //       )) 
        //   }
        // </Select>
        // )
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
export default TeamForm;
