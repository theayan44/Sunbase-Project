import { useContext, useEffect } from "react";
import DashboardContent from "../components/Dashboard/DashboardContent";
import { CustomerContext } from "../context/CustomerContext";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/Common/LogoutButton";

const Dashboard = () => {
    const { setCustomerData, setSearchData } = useContext(CustomerContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("loginCredentials") === null) {
            alert("You've to login first!");
            navigate("/", { replace: true });
        } else {
            fetchData();
        }
    }, [])

    async function fetchData() {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            }
        };
        const res = await fetch("http://127.0.0.1:8080/customer/get/all", config);
        const data = await res.json();
        setCustomerData(data);
        setSearchData(data);
    }

    return (
        <div className="dashboard-page">
            <DashboardContent />
            <LogoutButton />
        </div>
    )
}

export default Dashboard;