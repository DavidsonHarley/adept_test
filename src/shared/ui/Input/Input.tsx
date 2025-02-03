import cls from "./styles/input.module.scss";

export function Input({
  state,
  activeState,
  handleInput,
  type,
  ...props
}: any) {
  return (
    <label
      className={`${cls.wrapper} ${type === "checkbox" ? cls.checkboxWrapper : ""}`}
    >
      <input
        type={type}
        className={`${cls.input} ${type === "checkbox" ? cls.checkbox : ""}`}
        onChange={(e) => handleInput(e, activeState, state)}
        {...props}
      />
      {type === "checkbox" && <span className={cls.checkmark}></span>}
    </label>
  );
}
