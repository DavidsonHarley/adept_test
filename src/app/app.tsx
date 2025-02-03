import { Bounce, ToastContainer } from "react-toastify";
import { CompaniesTable } from "../entities/company/companies-table";

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <CompaniesTable />
    </>
  );
}

export default App;
