import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import style from "./style.module.css";
import { useContext, useEffect, useState } from 'react';
import { CustomerContext } from '../../../context/CustomerContext';

const SearchBar = ({ searchType }) => {
    const [searchValue, setSearchValue] = useState("");

    const { customerData, setSearchData } = useContext(CustomerContext);

    useEffect(() => {
        setSearchData(customerData.filter((customer) => {
            if (searchType.length == 0) {
                return (customer.first_name + customer.last_name + customer.street + customer.address + customer.city
                    + customer.state + customer.email + customer.phone).toLowerCase().includes(searchValue.toLowerCase());
            } else {
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