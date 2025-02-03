import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import  companyTableReducer  from '../../entities/company/model/slice/company-table-slice';
import { useDispatch, useSelector } from 'react-redux';


export const store = configureStore({
	reducer: {
    company: companyTableReducer
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export type AppThunk = ThunkAction<void, RootState, unknown, Action>
