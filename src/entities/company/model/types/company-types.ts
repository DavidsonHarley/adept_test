export type Company = {
    id: number,
    name: string,
    address: string,
}


export interface CompanyState {
    data: Company[];
  loading: boolean;
  error: string | null;
  selectedCompanies: number[];
  currentPage: number;
  hasMore: boolean;
}