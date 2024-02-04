import style from "./style.module.css";
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { useContext, useEffect } from "react";
import { CustomerContext } from "../../../context/CustomerContext";
import { NavLink } from "react-router-dom";

const CustomerTable = () => {

    const { searchData } = useContext(CustomerContext);

    async function deleteCustomer(e, email) {
        if (window.confirm("Are you sure want to delete!")) {
            const requestOptions = {
                method: 'DELETE'
            };
            const res = await fetch(`http://127.0.0.1:8080/customer/delete/${email}`, requestOptions);
            const data = await res.json();
            alert(data.message);

            if (res.status == 200) {
                window.location.reload();
            }
        }
    }


    return (
        <table className={style.customer_table}>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Street</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th className={style.icon_td}>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    searchData.map((customer, idx) => (
                        <tr key={idx} style={{ backgroundColor: idx % 2 == 0 ? "var(--black)" : "var(--darkgrey)" }}>
                            <td>{customer.first_name}</td>
                            <td>{customer.last_name}</td>
                            <td>{customer.street}</td>
                            <td>{customer.address}</td>
                            <td>{customer.city}</td>
                            <td>{customer.state}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td className={style.icon_td}>
                                <RemoveRoundedIcon onClick={(e) => deleteCustomer(e, customer.email)} className={style.delete_icon} />
                                <NavLink to={`/update/${customer.email}`}><EditRoundedIcon className={style.edit_icon} /></NavLink>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default CustomerTable;
