// Types
import { Option } from "@enumerables";
// Components
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Autocomplete, IconButton, TextField } from "@mui/material";

interface DropdownListProps {
  options: Option[];
  selectedOptions: string[];
  setSelectedOptions: (string: string | string[]) => void;
}

const DropdownList = ({
  options,
  selectedOptions,
  setSelectedOptions,
}: DropdownListProps) => {
  const handleDelete = (optionToDelete: string) => {
    const newSelectedOptions = selectedOptions.filter(
      (option) => option !== optionToDelete
    );
    setSelectedOptions(newSelectedOptions);
  };

  return (
    <Autocomplete
      multiple
      id="tags-outlined"
      onChange={(_event, options) => {
        setSelectedOptions(options.map((option) => option.value));
      }}
      options={options}
      value={options.filter((option) => selectedOptions.includes(option.value))}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select activities"
          placeholder="Favorites"
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
