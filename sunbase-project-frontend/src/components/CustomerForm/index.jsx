import { useEffect, useState } from "react";
import Button from "../Common/Button";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";

const CustomerForm = ({ update, oldData }) => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [street, setStreet] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (update) {
            setFname(oldData.first_name);
            setLname(oldData.last_name);
            setStreet(oldData.street);
            setAddress(oldData.address);
            setCity(oldData.city);
            setState(oldData.state);
            setEmail(oldData.email);
            setPhone(oldData.phone);
        }
    }, [oldData])

    // operation on submitting the form
    async function handleClick(e) {
        e.preventDefault();

        // check for all values are entered or not
        if (fname.trim().length == 0 || lname.trim().length == 0 || street.trim().length == 0
            || address.trim().length == 0 || city.trim().length == 0 || state.trim().length == 0
            || email.trim().length == 0 || phone.trim().length == 0) {
            // if all values are not entered then show error message
            alert("Error: All field are mandatory!");
            return;
        } else {
            // prepare the data for sending through api in fetch
            const dataObject = {
                "first_name": fname,
                "last_name": lname,
                "address": address,
                "street": street,
                "city": city,
                "state": state,
                "email": email,
                "phone": phone
            };

            //prepare the extra configuration
            const requestOptions = {
                method: update ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataObject)
            };

            let res;

            //now check we going to do update or add new data
            if (update) {
                res = await fetch("http://127.0.0.1:8080/customer/update", requestOptions);
            } else {
                res = await fetch("http://127.0.0.1:8080/customer/add", requestOptions);
            }
            const data = await res.json();
            alert(data.message);

            //if all ok then navigate to dashboard for rendering updated data from database
            if (res.status == 201) {
                navigate("/dashboard", { replace: true });
            }
        }

    }

    return (
        <div className={style.form_div}>
            <h2 className={style.heading}>Customer Details</h2>

            <form onSubmit={(e) => handleClick(e)}>
                <div className={style.customer_form}>
                    <div className={style.input_group}>
                        <label htmlFor="">First Name</label>
                        <input required type="text" value={fname} onChange={(e) => setFname(e.target.value)} />
                    </div>

                    <div className={style.input_group}>
                        <label htmlFor="">Last Name</label>
                        <input required type="text" value={lname} onChange={(e) => setLname(e.target.value)} />
                    </div>

                    <div className={style.input_group}>
                        <label htmlFor="">Street</label>
                        <input required type="text" value={street} onChange={(e) => setStreet(e.target.value)} />
                    </div>

                    <div className={style.input_group}>
                        <label htmlFor="">Address</label>
                        <input required type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>

                    <div className={style.input_group}>
                        <label htmlFor="">City</label>
                        <input required type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>

                    <div className={style.input_group}>
                        <label htmlFor="">State</label>
                        <input required type="text" value={state} onChange={(e) => setState(e.target.value)} />
                    </div>

                    <div className={style.input_group}>
                        <label htmlFor="">Email</label>
                        <input disabled={update} required type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className={style.input_group}>
                        <label htmlFor="">Phone</label>
                        <input required type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                </div>

                <div className={style.btn_div}><Button text={"Submit"} ></Button></div>

            </form>

        </div>
    )
}

export default CustomerForm