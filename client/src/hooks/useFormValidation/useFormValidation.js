import { useState } from "react";

const useFormValidation = (options) => {

  const [data, setData] = useState((options?.initialState || {}));
  const [errors, setErrors] = useState({});

  const handleChange = (key) => (e) => {
      setData({
        ...data,
        [key]: e.target.value,
      });
    };

  async function handleSubmit(e) {
    e.preventDefault();

    const validations = options?.validations
    if (validations) {
      let valid = true;
      const foundErrors = {};



      for (const key in validations) {
        const value = data[key];
        const validation = validations[key];

        // validation for required field
        if (validation?.required?.value && !value) {
          valid = false;
          foundErrors[key] = validation?.required?.message;
        }
        // validation for field requiring a pattern
        const pattern = validation?.pattern;
        if (pattern?.value && !RegExp(pattern.value).test(value)) {
          valid = false;
          foundErrors[key] = pattern.message;
        }
        // custom validation for a field
        const custom = validation?.custom;
        if (custom?.isValid && !custom.isValid(value)) {
          valid = false;
          foundErrors[key] = custom.message;
        }
      }

      if (!valid){
        setErrors(foundErrors);
        return;
      }
    }

    setErrors({});

    if (options?.onSubmit) {
      options.onSubmit();
    }
  }

  return {
    data,
    errors,
    handleChange,
    handleSubmit,
    setErrors,
  };
}

export default useFormValidation;