import cls from "./styles/add-form.module.scss";

export function AddForm({ children, onSubmit }: any) {
  return (
    <form className={cls.form} onSubmit={onSubmit}>
      {children}
    </form>
  );
}
