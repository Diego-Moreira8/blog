export function AlertMessage({ children }) {
  return (
    <p
      className="mx-auto my-8 w-fit rounded-sm border-2 border-yellow-500 bg-yellow-50 p-2 text-center text-sm"
      role="alert"
    >
      {children}
    </p>
  );
}
