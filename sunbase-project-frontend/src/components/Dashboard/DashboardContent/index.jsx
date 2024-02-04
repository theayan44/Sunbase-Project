import { NavLink } from "react-router-dom";
import Button from "../../Common/Button"
import SearchBar from "../../Common/SearchBar";
import CustomerTable from "../CustomerTable"
import SearchType from "../SearchType"
import style from "./style.module.css";
import { useState } from "react";


const DashboardContent = () => {
    const [searchType, setSearchType] = useState("");

    async function handleSyncData() {
        // useing try catch for handling server error
        try {

            // first we have to get the bearer token
            // prepare data for passing in fetch
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

            // check if we got the bearer token or not
            if (tokenData.access_token != undefined) {
                // if we get the bearer token, now prepare extra configuration and set in fetch to get customer datas from api
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

                // after we got the data loop on each data and check for updation or new addition
                syncData.map(async (item) => {
                    // api call for checking the email id already exist in database or not
                    const res = await fetch(`http://127.0.0.1:8080/customer/get/${item.email}`);

                    // prepare the data object for sending in fetch with the api call
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
                        // if reponse is OK, means email already exist, so update the data
                        const requestOptions = {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(dataObject)
                        };
                        await fetch("http://127.0.0.1:8080/customer/update", requestOptions);
                    } else {
                        //if not exist, then add new data
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
            // if any server error occured during api call, then show the error message
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