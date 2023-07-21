import { IoMdClose } from "react-icons/io";
import { PiWarning } from "react-icons/pi";

interface Props {
  useApi: () => void;
  onClose: () => void;
}

export const DeleteModalComponent = ({ useApi, onClose }: Props) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-auto max-w-3xl mx-auto my-6">
          <div className="relative w-[50vh] flex flex-col bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
            <div className="flex items-center justify-center px-6 py-4 border-solid rounded-t border-slate-200">
              <div className="flex flex-row items-center justify-between w-full">
                <div className="flex flex-row items-center justify-center">
                  <PiWarning className="text-lg text-3xl font-bold text-[#E11428]" />
                  <h3 className="ml-2 text-lg text-3xl font-semibold">Delete Task</h3>
                </div>
                <IoMdClose className="text-xl text-bold hover:cursor-pointer" onClick={() => onClose()} />
              </div>
            </div>
            <div className="relative flex-auto p-6">
              <p>Are you sure want to delete this task? your action can’t be reverted.</p>
            </div>
            <div className="flex items-center justify-end px-5 py-2 border-solid rounded-b border-slate-200">
              <button
                className="px-6 py-2 mb-1 mr-2 text-sm font-bold text-gray-700 capitalize transition-all duration-150 ease-linear bg-white border-2 border-[#E0E0E0] rounded  outline-none hover:shadow-lg focus:outline-none"
                type="button"
                onClick={() => onClose()}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-white capitalize transition-all duration-150 ease-linear rounded shadow outline-none bg-[#E11428] active:bg-[#E11428] hover:shadow-lg focus:outline-none"
                type="button"
                onClick={useApi}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-50"></div>
    </>
  );
};
