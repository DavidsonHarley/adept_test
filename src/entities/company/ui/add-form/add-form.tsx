import Button from "../../../../shared/ui/Buton/button";
import cls from "./styles/add-form.module.scss";

export function AddForm({ children, onSubmit }: any) {
  return (
    <form className={cls.form} onSubmit={onSubmit}>
      {children}
      <Button variant="add">Добавить</Button>
    </form>
  );
}
