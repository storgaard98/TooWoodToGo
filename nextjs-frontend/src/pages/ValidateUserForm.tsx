import { SetStateAction, useState } from "react";

interface ValidateUserFormProps {
  nodeUrl: string | undefined;
}

const ValidateUserForm = ({ nodeUrl }: ValidateUserFormProps) => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${nodeUrl}/users/validateByUsername`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        }
      );
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        console.log("User validated successfully:", userData);
      } else {
        console.error("Failed to validate user");
      }
    } catch (error) {
      console.error("Error validating user:", error);
    }
  };

  return (
    <div>
      <h3>Validate User</h3>
      <h3>{nodeUrl} url pelas</h3>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={username}
        onChange={handleChange}
      />
      <button type="submit">Validate User</button>
      {user && (
        <div>
          <h3>User Data:</h3>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      )}
    </form>
    </div>
  );
};

export default ValidateUserForm;
