import style from "./style.module.css";

const SearchType = ({ searchType, setSearchType }) => {


  return (
    <select className={style.select_btn} value={searchType} onChange={(e) => setSearchType(e.target.value)}>
      <option value="">Search By</option>
      <option value="first_name">First Name</option>
      <option value="city">City</option>
      <option value="email">Email</option>
      <option value="phone">Phone</option>
    </select>
  );
}

export default SearchType;