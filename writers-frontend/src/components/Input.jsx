import { findInputError } from "../utils/findInputError";
import { isFormInvalid } from "../utils/isFormInvalid";
import { useFormContext } from "react-hook-form";

export const Input = ({
  name,
  label,
  type,
  id,
  placeholder,
  validation,
  multiline = false,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputErrors = findInputError(errors, name);
  const isInvalid = isFormInvalid(inputErrors);

  return (
    <div>
      <div>
        <label htmlFor={id}>{label}</label>
        {isInvalid && <p>{inputErrors.error.message}</p>}
      </div>
      {multiline ? (
        <textarea
          id={id}
          type={type}
          placeholder={placeholder}
          {...register(name, validation)}
        ></textarea>
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register(name, validation)}
        />
      )}
    </div>
  );
};
