import { useAppDispatch } from "../../../shared/lib/store";
import { toast } from "react-toastify";
import {
  toggleSelectAllCompanies,
  toggleSelectCompany,
} from "../model/slice/company-table-slice";
import {
  addCompanyThunk,
  deleteCompanyThunk,
  deleteAllCompaniesThunk,
  updateCompanyThunk,
} from "../model/thunk/company-thunk";

export function useCompanyTable() {
  const dispatch = useAppDispatch();
  const handleInputAdd = (
    e: React.ChangeEvent<HTMLInputElement>,
    setAddFormCompany: any,
    addFormCompany: any,
  ) => {
    const { name, value } = e.target;
    setAddFormCompany({ ...addFormCompany, [name]: value });
  };

  const handleInputEdit = (
    e: React.ChangeEvent<HTMLInputElement>,
    setEditForm: any,
    editForm: any,
  ) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    addFormCompany: any,
    setEditForm: any,
    setAddFormCompany: any,
  ) => {
    e.preventDefault();
    dispatch(addCompanyThunk(addFormCompany));
    setEditForm({ name: "", address: "" });
    setAddFormCompany({
      name: "",
      address: "",
    });

    toast.success("Компания Добавлена");
  };

  const handleDeleteCompany = (id: number) => {
    dispatch(deleteCompanyThunk(id));
    toast.success("Компания удалена");
  };

  const handleDeleteAllCompanies = () => {
    dispatch(deleteAllCompaniesThunk());
    toast.success("Компании удалены");
  };
  const handleSaveChanges = (id: number, editForm: any, setEditId: any) => {
    dispatch(
      updateCompanyThunk({
        id: id,
        name: editForm.name,
        address: editForm.address,
      }),
    )
      .then(() => {
        toast.success("Компания успешно обновлена");
        setEditId(0); // Закрытие режима редактирования
      })
      .catch((error: any) => {
        toast.error(error || "Ошибка при обновлении компании");
      });
  };

  const handleToggleSelectAll = () => {
    dispatch(toggleSelectAllCompanies());
  };

  const handleToggleSelect = (id: number) => {
    dispatch(toggleSelectCompany(id));
  };

  return {
    handleSaveChanges,
    handleInputAdd,
    handleInputEdit,
    handleSubmit,
    handleDeleteCompany,
    handleDeleteAllCompanies,
    handleToggleSelectAll,
    handleToggleSelect,
  };
}
