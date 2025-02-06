import { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../shared/lib/store";
import { useCompanyTable } from "./hooks/use-company-table";
import { Table } from "./ui/table/table";
import { HeaderActions } from "./ui/header-actions/header-actions";
import { fetchCompanyThunk } from "./model/thunk/company-thunk";
import { Layout } from "./ui/layout/layout";

export function CompaniesTable() {
  const [addFormCompany, setAddFormCompany] = useState({
    name: "",
    address: "",
  });
  const [editForm, setEditForm] = useState({
    name: "",
    address: "",
  });
  const [loadedPages, setLoadedPages] = useState(new Set());
  const [isFetching, setIsFetching] = useState(false);
  const [edit, setEditId] = useState<number>(0);
  const loader = useRef<HTMLDivElement | null>(null);
  const prevScrollY = useRef(0);
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
    if (!loader.current || isFetching) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !loading &&
          hasMore &&
          !loadedPages.has(currentPage + 1)
        ) {
          setIsFetching(true);
          prevScrollY.current = window.scrollY;
          dispatch(fetchCompanyThunk(currentPage + 1))
            .then(() => {
              setLoadedPages((prev) => new Set(prev).add(currentPage + 1));
              setIsFetching(false);
              requestAnimationFrame(() => {
                window.scrollTo(0, prevScrollY.current);
              });
            })
            .catch(() => {
              setIsFetching(false);
            });
        }
      },
      { root: null, rootMargin: "20px", threshold: 1.0 },
    );

    observer.observe(loader.current);

    return () => observer.disconnect();
  }, [currentPage, loading, hasMore, dispatch, loadedPages, isFetching]);

  if (error) return <div>Error: {error}</div>;

  return (
    <Layout loader={loader} loading={loading}>
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
    </Layout>
  );
}
