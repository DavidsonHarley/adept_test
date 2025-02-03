import Button from "../../../../shared/ui/Buton/button";
import { Input } from "../../../../shared/ui/Input/Input";
import cls from "../../ui/table-row/styles/table-row.module.scss";

export function TableRow({
  el,
  selectedCompanies,
  handleToggleSelect,
  handleDeleteCompany,
  handleSaveChanges,
  handleInputEdit,
  editForm,
  setEditForm,
  edit,
  setEditId,
}: any) {
  return (
    <div className={cls.row_items}>
      <div className={cls.item}>
        <Input
          type="checkbox"
          onChange={() => handleToggleSelect(el?.id)}
          checked={selectedCompanies.includes(el?.id)}
        />
      </div>
      {el?.id === edit ? (
        <>
          <Input
            name="name"
            value={editForm.name || el.name}
            onChange={(e: any) => handleInputEdit(e, setEditForm, editForm)}
            placeholder={el.name}
            type="text"
          />
          <Input
            name="address"
            value={editForm.address || el.address}
            onChange={(e: any) => handleInputEdit(e, setEditForm, editForm)}
            placeholder={el.address}
            type="text"
          />
          <div className={cls.action_button}>
            <Button
              variant="add"
              onClick={() => handleSaveChanges(el?.id, editForm, setEditId)}
            >
              Сохранить
            </Button>
            <Button variant="cancel" onClick={() => setEditId(0)}>
              Отмена
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className={cls.item}> {el?.name}</div>
          <div className={cls.item}> {el?.address}</div>
          <div className={cls.action_button}>
            <Button variant="edit" onClick={() => setEditId(el?.id)}>
              Изменить
            </Button>
            <Button
              variant="delete"
              disabled={!selectedCompanies.includes(el?.id)}
              onClick={() => handleDeleteCompany(el?.id)}
            >
              Удалить
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
