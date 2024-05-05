// React
import { FormEvent, useState } from "react";
// Components
import { Button, TextField } from "@mui/material";

const CreateUser = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aquí puedes enviar los datos del formulario a tu servidor o hacer lo que necesites
    console.log("Enviando datos:", { username, email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Nombre de Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Correo Electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" type="submit">
        Crear Usuario
      </Button>
    </form>
  );
};
export default CreateUser;
