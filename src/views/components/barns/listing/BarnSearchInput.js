import { withPermission } from "../../../../app/hooks/with-permission";

const BarnSearchInput = (props) => {
  return (
    <form className="barns__search-form">
      <i className="icon icon-search"></i>
      <input
        className="barns__search-input"
        type="search"
        placeholder="Search Barns"
        onInput={props.handleChange}
      />
    </form>
  );
};

export default withPermission(BarnSearchInput, "search-barn");