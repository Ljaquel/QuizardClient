import { useState } from "react";

export const useForm = (form, onSubmit = null) => {
  const [fields, setFields] = useState(form);
  const handleChange = (e) => {
    setFields({
      ...fields,
      [e.target.id]: e.target.value,
    });
  };
  return [fields, handleChange];
};
