import { Search } from "@mui/icons-material";
import { Dispatch, SetStateAction } from "react";

interface EnhancedTableToolbarProps {
  numSelected?: number;
  allowSelection?: boolean;
  setAllowSelection?: Dispatch<SetStateAction<boolean>>;
  heading: string;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, allowSelection, setAllowSelection } = props;

  const handleSearch = (e) => {
    props.setSearch(e.target.value);
  };

  return (
    <div className="flex justify-between items-center mb-6">
      {
        <div className="flex items-center gap-4">
          <div className="text-primary text-2xl font-semibold">
            {props.heading}
          </div>
          {setAllowSelection && (
            <div
              onClick={() => setAllowSelection((prev) => !prev)}
              className={`${
                numSelected
                  ? "text-blue border-blue"
                  : "text-secondary border-secondary"
              } border rounded px-2 cursor-pointer text-lg font-medium`}
            >
              Select {allowSelection && `(${numSelected})`}
            </div>
          )}
        </div>
      }
      <div className="border border-secondary py-1 rounded text-base text-secondary">
        <Search className="text-inherit mx-1.5" fontSize="small" />
        <input
          type="text"
          className="outline-none"
          placeholder={`Search in ${props.heading}`}
          value={props.search}
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};
