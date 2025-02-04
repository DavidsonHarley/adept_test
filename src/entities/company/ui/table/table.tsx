import { Input } from "../../../../shared/ui/Input/Input";
import { TableRow } from "../table-row/table-row";
import cls from "../table/styles/table.module.scss";

export function Table({
  data,
  selectedCompanies,
  handleToggleSelect,
  handleDeleteCompany,
  handleSaveChanges,
  handleInputEdit,
  editForm,
  setEditForm,
  edit,
  setEditId,
  handleToggleSelectAll,
}: any) {
  return (
    <div className={cls.table}>
      <div className={cls.row_header}>
        <div>
          <Input
            checked={
              selectedCompanies.length === data.length && data.length > 0
            }
            type="checkbox"
            onChange={() => handleToggleSelectAll()}
          />
        </div>
        <div className={cls.item_header}>Название компании</div>
        <div className={cls.item_header}>Адрес</div>
        <div className={cls.item_header}>Событие</div>
      </div>
      {data ? (
        data?.map((el: any) => (
          <TableRow
            key={el.id}
            el={el}
            selectedCompanies={selectedCompanies}
            handleToggleSelect={handleToggleSelect}
            handleDeleteCompany={handleDeleteCompany}
            handleSaveChanges={handleSaveChanges}
            handleInputEdit={handleInputEdit}
            editForm={editForm}
            setEditForm={setEditForm}
            edit={edit}
            setEditId={setEditId}
            cls={cls}
          />
        ))
      ) : (
        <div>Компании не найдены</div>
      )}
    </div>
  );
}
