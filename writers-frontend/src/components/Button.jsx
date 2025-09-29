import cn from "classnames";

export function Button({ type, disabled, centered = false, children }) {
  const button = (
    <button
      className={cn(
        "rounded-sm border-1 border-black px-4 py-2 font-bold hover:bg-gray-600 hover:text-white focus:bg-gray-600 focus:text-white active:bg-black",
        centered && "mx-auto block",
        disabled && "pointer-events-none opacity-50",
      )}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );

  return centered ? <div className="w-full">{button}</div> : button;
}
