import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import CustomerForm from '../components/CustomerForm';
import LogoutButton from '../components/Common/LogoutButton';

const UpdateCustomer = () => {
    // for saving old data of customer for auto filling the update form
    const [oldData, setOldData] = useState({});
    const { email } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // check if user logged in or not
        if (localStorage.getItem("loginCredentials") === null) {
            alert("You've to login first!");

            // if not logged in then navigate to login page
            navigate("/", { replace: true });
        } else if (email) {
            updateCustomer();
        }
    }, [])


    async function updateCustomer() {
        // check the customer already present or not in the database
        const res = await fetch(`http://127.0.0.1:8080/customer/get/${email}`);
        const data = await res.json();

        // if already present then get the data for auto filling the update form
        if (res.status == 200) {
            setOldData(data);
        } else {
            alert(data.message);
        }
    }

    return (
        <div>
            <CustomerForm update={true} oldData={oldData} />
            <LogoutButton />
        </div>
    )
}

export default UpdateCustomer