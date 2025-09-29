import { useState } from "react";
import { findInputError } from "../utils/findInputError";
import { isFormInvalid } from "../utils/isFormInvalid";
import { useFormContext } from "react-hook-form";
import cn from "classnames";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

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

  const [passwordVisible, setPasswordVisible] = useState(false);

  const inputErrors = findInputError(errors, name);
  const isInvalid = isFormInvalid(inputErrors);

  const isPasswordField = type === "password";

  return (
    <div className="my-4 flex flex-col">
      <label htmlFor={id}>{label}</label>

      {multiline ? (
        <textarea
          className="w-full rounded-sm border-1 border-gray-400 px-4 py-1"
          id={id}
          type={type}
          placeholder={placeholder}
          {...register(name, validation)}
        ></textarea>
      ) : (
        <div className={cn(isPasswordField && "flex gap-1")}>
          <input
            className="w-full rounded-sm border-1 border-gray-400 px-4 py-1"
            id={id}
            type={passwordVisible ? "text" : type}
            placeholder={placeholder}
            {...register(name, validation)}
          />
          {isPasswordField && (
            <button
              className="rounded-sm border-1 border-gray-400 px-4 py-1"
              type="button"
              title="Mostrar ou esconder senha"
              aria-label={passwordVisible ? "Esconder senha" : "Mostrar senha"}
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <IoMdEyeOff /> : <IoMdEye />}
            </button>
          )}
        </div>
      )}

      {isInvalid && (
        <p
          className="mt-0.5 w-fit rounded-sm bg-red-50 p-1 text-xs text-red-800"
          role="alert"
        >
          {inputErrors.error.message}
        </p>
      )}
    </div>
  );
};
