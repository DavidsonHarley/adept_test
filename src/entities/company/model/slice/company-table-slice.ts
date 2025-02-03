 
import { createSlice } from "@reduxjs/toolkit";
import { CompanyState } from "../types/company-types";
import { addCompanyThunk, deleteAllCompaniesThunk, deleteCompanyThunk, fetchCompanyThunk, updateCompanyThunk } from "../thunk/company-thunk";

const initialState: CompanyState = {
    data: [],
    loading: false,
    error: null,
    selectedCompanies: [],
    currentPage: 1,
    hasMore: true,
};

export const companyTableSlice = createSlice({
    name: "companyTable",
    initialState,
    reducers: {
        toggleSelectCompany: (state, action) => {
            const id = action.payload;
            if (state.selectedCompanies.includes(id)) {
                state.selectedCompanies = state.selectedCompanies.filter((el) => el !== id);
            } else {
                state.selectedCompanies.push(id);
            }
        },
        toggleSelectAllCompanies: (state) => {
            if (state.selectedCompanies.length === state.data.length) {
                state.selectedCompanies = [];
            } else {
                state.selectedCompanies = state.data.map((el) => el.id);
            }
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchCompanyThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchCompanyThunk.fulfilled, (state, action) => {
            state.loading = false;
        
            // Получаем новые данные
            const newCompanies = action.payload;
        
            // Фильтруем только те, которых еще нет в state.data
            const filteredCompanies = newCompanies.filter(
                (company) => !state.data.some((existingCompany) => existingCompany.id === company.id)
            );
        
            // Добавляем только новые компании
            state.data = [...state.data, ...filteredCompanies];
        
            // Обновляем состояние для пагинации
            state.currentPage += 1;
            state.hasMore = filteredCompanies.length === 10; // Если загружено меньше 50, значит больше нет данных
        })
        
          .addCase(fetchCompanyThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Something went wrong';
          })
          .addCase(deleteCompanyThunk.fulfilled, (state, action) => {
              state.data = state.data.filter((el) => el.id !== action.payload)
              state.selectedCompanies = state.selectedCompanies.filter((el) => el !== action.payload)
          })
          .addCase(deleteCompanyThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Something went wrong';
          })
          .addCase(deleteAllCompaniesThunk.fulfilled, (state, action: any) => {
            state.data = state.data.filter((company) => !action.payload.includes(company.id))
            state.selectedCompanies = [];
          })
          .addCase(deleteAllCompaniesThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Something went wrong';
          })
          .addCase(addCompanyThunk.fulfilled, (state, action) => {
            state.data.push(action.payload)
          })
          .addCase(addCompanyThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Something went wrong';
          })
          .addCase(updateCompanyThunk.fulfilled, (state, action) => {
            const updatedCompany = action.payload;
            state.data = state.data.map(company =>
              company.id === updatedCompany.id ? updatedCompany : company
            );
            state.loading = false;
          })
          .addCase(updateCompanyThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Ошибка при обновлении компании';
          })
          .addCase(updateCompanyThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
          });
        }
})

export const { toggleSelectCompany, toggleSelectAllCompanies } = companyTableSlice.actions;

export default companyTableSlice.reducer