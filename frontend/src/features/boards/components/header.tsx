import type { MouseEventHandler,Dispatch,SetStateAction } from "react";
import SearchIcon from "../../../components/icons/searchIcon";
import AddIcon from "../../../components/icons/addIcon";

const Header = ({
  handleOpen,
  search,
  setSearch
}: {
  handleOpen: MouseEventHandler;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>
}) => {
  return (
    <header className="border-b pb-7 flex items-center">
      <h1 className="text-4xl font-bold">My Boards</h1>
      <button
        onClick={handleOpen}
        className="cursor-pointer ml-auto mr-5 border rounded-lg p-1 text-green-300"
      >
        <AddIcon width={30} height={30} />
      </button>
      <div className="flex items-center">
        <button className="mr-2 cursor-pointer">
          <SearchIcon height={30} width={30}/>
        </button>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg p-1 "
          placeholder="Search here..."
        ></input>
      </div>
    </header>
  );
};

export default Header;
