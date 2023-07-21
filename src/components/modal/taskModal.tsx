import { IoMdClose } from "react-icons/io";

interface Props {
  useApi: () => void;
  title: string;
  useDescription: boolean;
  onClose: () => void;
  onChangeFirstInput: (event: any) => void;
  onChangeSecondInput: (event: any) => void;
  firstInputValue: string;
  secondInputValue: string | number;
  useRef: any;
}

export const ModalComponent = (props: Props) => {
  const { useRef, useApi, title, useDescription, onClose, onChangeFirstInput, onChangeSecondInput, firstInputValue, secondInputValue } = props;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none modal-container focus:outline-none">
        <div className="relative w-auto max-w-3xl mx-auto my-6">
          <div ref={useRef} className="relative w-[42vh] flex flex-col bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
            <div className="flex items-center justify-center px-6 py-4 border-solid rounded-t border-slate-200">
              <div className="flex flex-row items-center justify-between w-full">
                <h3 className="text-lg text-3xl font-semibold">{title}</h3>
                <IoMdClose className="text-xl text-bold hover:cursor-pointer " onClick={() => onClose()} />
              </div>
            </div>
            <div className="relative flex-auto p-6">
              <p className="mb-3">{useDescription ? "Title" : "Task Name"}</p>
              {firstInputValue.length <= 0 ? (
                <input
                  onChange={(e: any) => onChangeFirstInput(e.target.value)}
                  type="text"
                  placeholder="Type Your Task"
                  className="relative w-full px-3 py-3 text-sm placeholder-gray-400 bg-white border-2 border-[#E0E0E0] rounded outline-none text-slate-800 focus:outline-none focus:border-primary focus:border-2 placeholder:text-slate-600"
                />
              ) : (
                <input
                  onChange={(e: any) => onChangeFirstInput(e.target.value)}
                  type="text"
                  placeholder="Type Your Task"
                  value={firstInputValue}
                  className="relative w-full px-3 py-3 text-sm placeholder-gray-400 bg-white border-2 border-[#E0E0E0] rounded outline-none text-slate-800 focus:outline-none focus:border-primary focus:border-2 placeholder:text-slate-600"
                />
              )}
              {!useDescription ? (
                <>
                  {secondInputValue === 0 ? (
                    <>
                      <p className="mt-3 mb-3">Progress</p>
                      <input
                        onChange={(e) => {
                          onChangeSecondInput(e.target.value);
                        }}
                        type="number"
                        placeholder="70%"
                        className="relative w-[50%] px-3 py-3 text-sm placeholder-gray-400 bg-white border-2 border-[#E0E0E0] rounded outline-none text-slate-800 focus:outline-none focus:border-primary focus:border-2 placeholder:text-slate-600"
                      />
                    </>
                  ) : (
                    <>
                      <p className="mt-3 mb-3">Progress</p>
                      <input
                        onChange={(e) => {
                          onChangeSecondInput(e.target.value);
                        }}
                        type="number"
                        placeholder="70%"
                        value={secondInputValue}
                        className="relative w-[50%] px-3 py-3 text-sm placeholder-gray-400 bg-white border-2 border-[#E0E0E0] rounded outline-none text-slate-800 focus:outline-none focus:border-primary focus:border-2 placeholder:text-slate-600"
                      />
                    </>
                  )}
                </>
              ) : (
                <>
                  <>
                    <p className="mt-3 mb-3">Description</p>
                    <textarea
                      onChange={(e) => {
                        onChangeSecondInput(e.target.value);
                      }}
                      placeholder="Description here..."
                      className="relative w-full h-[10vh] content-start px-3 pt-2 text-sm placeholder-gray-400 bg-white border-2 border-[#E0E0E0] rounded outline-none text-slate-800 focus:outline-none focus:border-primary focus:border-2 placeholder:text-slate-600"
                    />
                  </>
                </>
              )}
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
                className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-white capitalize transition-all duration-150 ease-linear rounded shadow outline-none bg-primary active:bg-primary hover:shadow-lg focus:outline-none"
                type="button"
                onClick={useApi}
              >
                {useDescription ? "Submit" : "Save Task"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-50 modal-shadow" onClick={(e) => console.log("EVENT", e.currentTarget.classList.contains("modal-shadow"))}></div>
    </>
  );
};
