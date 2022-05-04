import { FormControl, InputGroup } from "react-bootstrap";
const Search = ({ onChangeVal }) => {
  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Search"
        aria-label="Search"
        onChange={(e) => onChangeVal(e.target.value)}
      />
    </InputGroup>
  );
};

export default Search;
