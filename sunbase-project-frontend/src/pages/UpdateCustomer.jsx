import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import CustomerForm from '../components/CustomerForm';
import LogoutButton from '../components/Common/LogoutButton';

const UpdateCustomer = () => {
    const [oldData, setOldData] = useState({});
    const { email } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("loginCredentials") === null) {
            alert("You've to login first!");
            navigate("/", { replace: true });
        } else if (email) {
            updateCustomer();
        }
    }, [])


    async function updateCustomer() {
        const res = await fetch(`http://127.0.0.1:8080/customer/get/${email}`);
        const data = await res.json();

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