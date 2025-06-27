import type { MouseEventHandler } from "react";
import ConfigIcon from "../../../components/icons/configIcon";
const Header = ({name,handleOpen}:{name:string,handleOpen:MouseEventHandler})=> {
    return(
        <header className="border-b pb-7 flex items-center">
        <h1 className="text-4xl font-bold">{name}</h1>
        <button
          className="cursor-pointer ml-auto border rounded-lg p-2 "
          onClick={handleOpen}
        >
          <ConfigIcon width={35} height={35} />
        </button>
      </header>
    )
};

export default Header;
