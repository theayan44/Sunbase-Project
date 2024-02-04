import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../Common/Button"
import SearchBar from "../../Common/SearchBar";
import CustomerTable from "../CustomerTable"
import SearchType from "../SearchType"
import style from "./style.module.css";
import { useState } from "react";


const DashboardContent = () => {
    const [searchType, setSearchType] = useState("");
    const { navigate } = useNavigate();

    async function handleSyncData() {
        try {
            const dataObject = {
                "login_id": "test@sunbasedata.com",
                "password": "Test@123"
            };

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataObject)
            };
            const tokenResponse = await fetch("https://qa.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp", requestOptions);
            const tokenData = await tokenResponse.json();

            if (tokenData.access_token != undefined) {
                const requestOptionsForSyncData = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${tokenData.access_token}`,
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                    }
                };
                const syncResponse = await fetch("https://qa.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp", requestOptionsForSyncData);
                const syncData = await syncResponse.json();

                syncData.map(async (item) => {
                    const res = await fetch(`http://127.0.0.1:8080/customer/get/${item.email}`);

                    const dataObject = {
                        "first_name": item.first_name,
                        "last_name": item.last_name,
                        "address": item.address,
                        "street": item.street,
                        "city": item.city,
                        "state": item.state,
                        "email": item.email,
                        "phone": item.phone
                    };

                    if (res.status == 200) {
                        // update data
                        const requestOptions = {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(dataObject)
                        };
                        await fetch("http://127.0.0.1:8080/customer/update", requestOptions);
                    } else {
                        //add new data
                        const requestOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(dataObject)
                        };
                        await fetch("http://127.0.0.1:8080/customer/add", requestOptions);
                    }
                });
                window.location.reload();
            }
        } catch (error) {
            alert("Sorry facing server issue while sync data!");
        }
    }

    return (
        <div className={style.dashboard_content}>
            <h2 className={style.heading}>Customer List</h2>
            <div className={style.btn_div}>
                <NavLink to="/add"><Button text={"Add Customer"}></Button></NavLink>
                <SearchType searchType={searchType} setSearchType={setSearchType} />
                <SearchBar searchType={searchType} />
                <p onClick={(e) => handleSyncData()} className={style.sync}>Sync</p>
            </div>
            <CustomerTable />
        </div>
    )
}

export default DashboardContent