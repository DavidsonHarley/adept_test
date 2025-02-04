import { createAsyncThunk } from "@reduxjs/toolkit"
import { Company, CompanyState } from "../types/company-types"
import { jsonApiInstance } from "../../../../shared/api/api-instance"

export const fetchCompanyThunk = createAsyncThunk(
    'companyTable/fetchCompany',
    async (page: number) => {
      const response = await jsonApiInstance<{data: Company[]}>(
        `/companies?_page=${page}&_per_page=50`
      );
      return response.data;
    }
  );

export const deleteCompanyThunk = createAsyncThunk(
    'companyTable/deleteCompany',
    async (id: number, {rejectWithValue}) => {
        try {
         await jsonApiInstance<Response>(`/companies/${id}`, {method: 'DELETE'})
            return id   
        } catch (error) {
            return rejectWithValue(error)
        };
         
    },
);

export const deleteAllCompaniesThunk = createAsyncThunk(
    "companyTable/deleteAllCompanies",
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState() as { company: CompanyState };
            const { selectedCompanies } = state.company;
            if (!selectedCompanies || selectedCompanies.length === 0) {
                throw new Error("Нет выбранных компаний для удаления");
            }
            const deletedIds: number[] = [];
            for (const id of selectedCompanies) {
                 await jsonApiInstance<Response>(`/companies/${id}`, {
                    method: "DELETE",
                });
                deletedIds.push(id);
            };
            return deletedIds;
        } catch (error: any) {
            console.error("Ошибка при удалении:", error.message);
            return rejectWithValue(error.message || "Не удалось удалить все компании");
        }
    },
);

export const addCompanyThunk = createAsyncThunk(
    'companyTable/addCompany',
    async (newCompany: Omit<Company, "id">, {rejectWithValue}) => {
        try {
            const response = await jsonApiInstance<Company>('/companies', {
                method: 'POST',
                json: newCompany
            });
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || "Не удалось добавить компанию")
        };
    },
);

export const updateCompanyThunk = createAsyncThunk<Company, Company>(
    'companyTable/updateCompany',
    async (company, { rejectWithValue} ) => {
        try {
            const response = await jsonApiInstance<Company>(`/companies/${company.id}`, {
                method: 'PATCH',
                json: company
            })
            return response
        } catch (error: any) {
            return rejectWithValue(error.message || "Не удалось обновить компанию")
        };
    },
);