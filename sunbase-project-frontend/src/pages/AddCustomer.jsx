import { useNavigate } from "react-router-dom";
import CustomerForm from "../components/CustomerForm";
import LogoutButton from "../components/Common/LogoutButton";
import { useEffect } from "react";

const AddCustomer = () => {

    const navigate = useNavigate();

    useEffect(() => {
        // check if user logged in or not
        if (localStorage.getItem("loginCredentials") === null) {
            alert("You've to login first!");

            // if not logged in then navigate to login page
            navigate("/", { replace: true });
        }
    }, []);


    return (
        <div>
            <CustomerForm update={false} />
            <LogoutButton />
        </div>
    )
}

export default AddCustomer;