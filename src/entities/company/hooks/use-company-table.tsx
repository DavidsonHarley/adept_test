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
import { CompanyForm } from "../model/types/company-types";
import { Dispatch, SetStateAction } from "react";

export function useCompanyTable() {
  const dispatch = useAppDispatch();
  const handleInputAdd = (
    e: React.ChangeEvent<HTMLInputElement>,
    setAddFormCompany: Dispatch<SetStateAction<CompanyForm>>,
    addFormCompany: CompanyForm,
  ) => {
    const { name, value } = e.target;
    setAddFormCompany({ ...addFormCompany, [name]: value });
  };

  const handleInputEdit = (
    e: React.ChangeEvent<HTMLInputElement>,
    setEditForm: Dispatch<SetStateAction<CompanyForm>>,
    editForm: CompanyForm,
  ) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    addFormCompany: CompanyForm,
    setEditForm: Dispatch<SetStateAction<CompanyForm>>,
    setAddFormCompany: Dispatch<SetStateAction<CompanyForm>>,
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
  const handleSaveChanges = (
    id: number,
    editForm: CompanyForm,
    setEditId: Dispatch<SetStateAction<number>>,
    setEditForm: Dispatch<SetStateAction<CompanyForm>>,
  ) => {
    dispatch(
      updateCompanyThunk({
        id: id,
        name: editForm.name,
        address: editForm.address,
      }),
    )
      .then(() => {
        toast.success("Компания успешно обновлена");
        setEditId(0);
        setEditForm({ name: "", address: "" });
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
