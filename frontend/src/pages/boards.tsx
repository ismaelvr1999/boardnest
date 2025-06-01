import BoardCard from "../features/boards/components/boardCard";
import Header from "../features/boards/components/header";
import { useBoards } from "../features/boards/boards.hook";
import Toast from "../components/toast";
import Modal from "../components/modal";
import CreateBoardForm from "../features/boards/components/createBoardForm";
import useModal from "../hooks/modal.hook";
export default function Boards() {
  const {boards,handleDelete,handleSubmit,register,onCreate} = useBoards();
  const {handleOpen,handleClose,isHidden} = useModal();
  return (
    <>
      <div className="h-full w-full  pt-7 grid grid-rows-[auto_1fr]">
        {/* Add and search */}
        <Header handleOpen={handleOpen}/>
        {/* Scroll Container */}
        <div className="pt-7 overflow-scroll">
          {/*Cards Container*/}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {
              boards && boards.map((board,index)=>{
                return (
                  <BoardCard 
                    key={index} 
                    board={board} 
                    handleDelete={handleDelete} />
                );
              })
            }
          </div>
        </div>
      </div>
      <Toast/>
      <Modal handleClose={handleClose} isHidden={isHidden}>
            <CreateBoardForm onCreate={onCreate} register={register} handleSubmit={handleSubmit}/>
      </Modal>
    </>
  );
}
