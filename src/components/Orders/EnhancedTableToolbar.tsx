import { Search } from "@mui/icons-material";
import { Dispatch, SetStateAction } from "react";

interface EnhancedTableToolbarProps {
  heading: string;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  numOrders: number;
}

export const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { heading, setSearch, search, numOrders = 0 } = props;

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex justify-between items-center mb-6">
      {
        <div className="flex items-center gap-4">
          <div className="text-primary text-2xl font-semibold">
            {heading} ({numOrders})
          </div>
        </div>
      }
      <div className="border border-secondary py-1 rounded text-base text-secondary">
        <Search className="text-inherit mx-1.5" fontSize="small" />
        <input
          type="text"
          className="outline-none"
          placeholder={`Search in ${heading}`}
          value={search}
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};
