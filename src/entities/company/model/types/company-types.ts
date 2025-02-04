export type Company = {
    id: number,
    name: string,
    address: string,
};


export type CompanyState = {
    data: Company[];
    loading: boolean;
    error: string | null;
    selectedCompanies: number[];
    currentPage: number;
    hasMore: boolean;
};


export type CompanyForm = {
    name: string,
    address: string
}