import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import style from "./style.module.css";
import { useContext, useEffect, useState } from 'react';
import { CustomerContext } from '../../../context/CustomerContext';

const SearchBar = ({ searchType }) => {
    const [searchValue, setSearchValue] = useState("");

    // get the customer data from the context
    const { customerData, setSearchData } = useContext(CustomerContext);

    // as many time value changes in searchbar this is called
    useEffect(() => {
        setSearchData(customerData.filter((customer) => {
            if (searchType.length == 0) {
                // if no search type is selected then match with all values
                return (customer.first_name + customer.last_name + customer.street + customer.address + customer.city
                    + customer.state + customer.email + customer.phone).toLowerCase().includes(searchValue.toLowerCase());
            } else {
                // match with required type
                return customer[searchType].toLowerCase().includes(searchValue.toLowerCase());
            }
        }))
    }, [searchValue]);


    return (
        <div className={style.search_bar}>
            <input type="text" placeholder="Search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            <SearchRoundedIcon />
        </div>
    )
}

export default SearchBar;