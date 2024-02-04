import { createContext, useState } from "react";

export const CustomerContext = createContext();

const CustomerProvider = (props) => {
    const [customerData, setCustomerData] = useState([]);
    const [searchData, setSearchData] = useState([]);

    return (
        <CustomerContext.Provider
            value={
                {
                    customerData,
                    setCustomerData,
                    searchData,
                    setSearchData
                }
            }
        >
            {props.children}
        </CustomerContext.Provider>
    )
}

export default CustomerProvider;