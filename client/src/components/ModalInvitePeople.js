import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const ModalInvitePeople = (props) => {

    const dispatch = useDispatch();
    
    const [email, setEmail] = useState(null);

    const [members, setMembers] = useState([]);

    const [errMSG, setErr] = useState(null);
    // console.log('Props:',props);

    useEffect(() => {
        axios.get(`http://localhost:3002/api/users/calendars/${props.calendar._id}`,{ withCredentials: true })
        .then(response => {
            // console.log(response);
            setMembers(response.data);
        });
    }, [props.calendar]);

    const handleChange = (e) => {
        setEmail(e.target.value);
        setErr(null);
        // console.log(e.target.value);
    }

    const inviteFriend = () => {
        if(email.length > 0)
        {
            axios.post(`http://localhost:3002/api/users/invite`,{email: email, id_calendar: props.calendar._id},{ withCredentials: true })
            .then(response => {
                console.log(response.data);
                if(!response.data.success)
                {
                    setErr(response.data.message);
                } else
                {
                    props.cancelClick();
                }
            })
        }
        
    }

    return (
        <div className=" text-white justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-slate-600 bg-opacity-50">
            <div className="relative my-3 mx-auto w-1/4">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-600 outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-3 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-2xl pl-4 font-semibold text-gray-300">
                            Inviting people
                        </h3>
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-3 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={props.cancelClick}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-7 h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    {/*body*/}
                    <div className="relative py-5 px-8 flex flex-col">
                        <label className='text-slate-200'>Members of calendar:</label>
                        {members.map(member => {
                            return(
                                <div className='p-1 border' key={member._id}>{member._id}</div>
                            )
                        })}
                        <input className='m-2 p-2 outline-none rounded-lg text-black border-2 focus:border-indigo-500' type="email" 
                            name="email" placeholder='Type email of your friend ...' onChange={handleChange} />
                        {
                            errMSG && 
                            <div className='text-xl text-red-600'>{errMSG}</div>
                        }
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-3 border-t border-solid border-slate-200 rounded-b">
                        <button
                            className="text-pink-700 background-transparent font-bold uppercase px-3 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                        onClick={props.cancelClick}
                        >Cancel
                        </button>
                        <button
                            className="bg-emerald-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 hover:bg-emerald-500 transition duration-500 hover:ease-in"
                            type="button"
                            onClick={inviteFriend}
                        >Invite
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalInvitePeople;
