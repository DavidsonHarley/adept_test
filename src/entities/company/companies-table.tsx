/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../shared/lib/store";
import { useCompanyTable } from "./hooks/use-company-table";
import { Table } from "./ui/table/table";
import { HeaderActions } from "./ui/header-actions/header-actions";
import { fetchCompanyThunk } from "./model/thunk/company-thunk";
import cls from "../company/styles/companies-table.module.scss";

export function CompaniesTable() {
  const [addFormCompany, setAddFormCompany] = useState({
    name: "",
    address: "",
  });
  const [editForm, setEditForm] = useState({
    name: "",
    address: "",
  });
  const [edit, setEditId] = useState<number>(0);
  const loader = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const { data, loading, error, selectedCompanies, currentPage, hasMore } =
    useAppSelector((state) => state.company);
  const {
    handleSaveChanges,
    handleInputAdd,
    handleInputEdit,
    handleSubmit,
    handleDeleteCompany,
    handleDeleteAllCompanies,
    handleToggleSelectAll,
    handleToggleSelect,
  } = useCompanyTable();

  useEffect(() => {
    dispatch(fetchCompanyThunk(1));
  }, []);

  useEffect(() => {
    if (loader.current) {
      const options = {
        root: null,
        rootMargin: "20px",
        threshold: 1.0,
      };

      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          dispatch(fetchCompanyThunk(currentPage + 1));
          if (loader.current) {
            loader.current.scrollIntoView({ behavior: "smooth", block: "end" });
          }
        }
      }, options);

      observer.observe(loader.current);
    }
  }, [currentPage, loading, hasMore, dispatch]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div className={cls.content}>
      <HeaderActions
        handleDeleteAllCompanies={handleDeleteAllCompanies}
        handleInputAdd={handleInputAdd}
        handleSubmit={handleSubmit}
        addFormCompany={addFormCompany}
        setAddFormCompany={setAddFormCompany}
        disabled={selectedCompanies.length < 2}
        setEditForm={setEditForm}
        editForm={editForm}
      />
      <Table
        data={data}
        selectedCompanies={selectedCompanies}
        handleToggleSelect={handleToggleSelect}
        handleDeleteCompany={handleDeleteCompany}
        handleSaveChanges={handleSaveChanges}
        handleInputEdit={handleInputEdit}
        editForm={editForm}
        setEditForm={setEditForm}
        edit={edit}
        setEditId={setEditId}
        handleToggleSelectAll={handleToggleSelectAll}
      />
      <div ref={loader}></div>
    </div>
  );
}
