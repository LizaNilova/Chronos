import React from 'react'

export default function ModalDeleteConfirm(props) {
  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-slate-600 bg-opacity-60">
    <div className="relative w-auto my-3 mx-auto max-w-2xl">
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-600 outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-3 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-2xl font-semibold text-red-400">
                    Confirm action
                </h3>
                <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-3 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => props.setOpen(false)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>

                </button>
            </div>
            {/*body*/}
            <div className="relative p-3 flex-auto">
                <p className="my-2 text-slate-300 text-lg leading-relaxed">Are you sure you want to delete this calendar?</p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-3 border-t border-solid border-slate-200 rounded-b">
                <button
                    className="text-emerald-500 background-transparent font-bold uppercase px-3 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => props.setOpen(false)}
                >Cancel
                </button>
                <button
                    className="bg-pink-800 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 hover:bg-pink-700 transition duration-500 hover:ease-in"
                    type="button"
                    onClick={() => props.confirm()}
                >Delete
                </button>
            </div>
        </div>
    </div>
</div>
  )
}
