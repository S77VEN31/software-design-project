// Types
import { Option } from "@enumerables";
// Components
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Autocomplete, IconButton, TextField } from "@mui/material";
// Interfaces
interface DropdownListProps {
  options: Option[];
  selectedOptions: string[];
  setSelectedOptions: (string: string | string[]) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

const DropdownList = ({
  options,
  selectedOptions,
  setSelectedOptions,
  label,
  placeholder,
  disabled,
  required,
}: DropdownListProps) => {
  const handleDelete = (optionToDelete: string) => {
    const newSelectedOptions = selectedOptions.filter(
      (option) => option !== optionToDelete
    );
    setSelectedOptions(newSelectedOptions);
  };

  return (
    <Autocomplete
      noOptionsText="No hay opciones disponibles"
      disabled={disabled}
      multiple
      id="tags-outlined"
      onChange={(_event, options) => {
        setSelectedOptions(options.map((option) => option.value));
      }}
      options={options}
      value={options.filter((option) => selectedOptions.includes(option.value))}
      filterSelectedOptions
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
          required={selectedOptions.length === 0 ? required : false}
          label={label}
          placeholder={placeholder}
          {...params}
        />
      )}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <div {...getTagProps({ index })}>
            {option.label}
            <IconButton
              onClick={() => handleDelete(option.value as string)}
              size="small"
            >
              <CloseIcon />
            </IconButton>
          </div>
        ))
      }
      renderOption={(props, option) => (
        <li {...props}>
          {option.label}
          <CheckIcon fontSize="small" />
        </li>
      )}
    />
  );
};
export default DropdownList;
