import Button from "../../../../shared/ui/Button/button";
import { Input } from "../../../../shared/ui/Input/Input";
import { AddForm } from "../add-form/add-form";
import cls from "./styles/header-actions.module.scss";

export function HeaderActions({
  handleDeleteAllCompanies,
  handleInputAdd,
  handleSubmit,
  addFormCompany,
  setAddFormCompany,
  setEditForm,
  disabled,
}: any) {
  return (
    <div className={cls.header_actions}>
      <div className={cls.ctnDeleteAll}>
        <Button
          variant="delete"
          onClick={() => handleDeleteAllCompanies()}
          disabled={disabled}
        >
          Удалить все компании
        </Button>
      </div>
      <AddForm
        onSubmit={(e: any) =>
          handleSubmit(e, addFormCompany, setEditForm, setAddFormCompany)
        }
      >
        <Input
          state={addFormCompany}
          value={addFormCompany.name}
          activeState={setAddFormCompany}
          handleInput={handleInputAdd}
          name="name"
          type="text"
        />
        <Input
          handleInput={handleInputAdd}
          activeState={setAddFormCompany}
          value={addFormCompany.address}
          state={addFormCompany}
          name="address"
          type="text"
        />
        <Button variant="add">Добавить компанию</Button>
      </AddForm>
    </div>
  );
}
