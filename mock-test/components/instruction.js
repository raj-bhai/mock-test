import React, { useState } from "react";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import * as questionAction from '../redux/action/question';
import {useSelector, useDispatch} from 'react-redux'


const Instruction = ({ onStart }) => {

    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = async() => {
       await dispatch(questionAction.getQuestion())
       onStart()
        // setOpen(true);
    };



    return (
        <>
            <div className=" w-[100%] h-[100%] sm:flex " >
                <div className=" sm:w-[40%] sm:h-[100%] h-[50%] border flex flex-col justify-start sm:py-[100px] py-[20px] sm:px-[100px] px-[10px] sm:gap-[100px] gap-[50px] h-[100%] " >
                    <div className=" text-[#000] flex flex-col items-start " >
                        <p  >IQUANTA LOGO</p>
                    </div>
                    <div className=" text-[#000] flex flex-col items-start  " >
                        <p>Heyy Rajkiran Kalowar</p>
                        <p className=" text-[30px] font-bold " >Wecome to IQUANTA Mock Test</p>
                    </div>
                    <div className="text-[#000] flex justify-start gap-[20px] text-center leading-0" >
                        <div  >
                            <p>Test Duration</p>
                            <p>5 minute</p>
                        </div>
                        <div  >
                            <p>No. of question</p>
                            <p>5</p>
                        </div>
                    </div>
                </div>
                <div className=" sm:w-[60%] sm:h-[100%] h-[50%] border bg-[#D5D8DC] flex flex-col justify-center  " >
                    <div className=" text-[#000] ml-[50px] pr-[50px] " >
                        <h1 className=" text-[35px] font-semibold " >Instructions</h1>
                        <p>1.This is a timed test. Please make sure you are not interrupted during the test, as the timer cannot be paused once started.</p>
                        <p>2. Please ensure you have a stable internet connection.</p>
                        <p>2. Correct answer means +3, incorrect answer means -1. No marks will be deducted incase not attempted</p>
                        <button className=" bg-[#16A085] w-[150px] h-[40px] mt-[30px] "
                            onClick={handleOpen}
                        >
                            Start Test
                        </button> 
                    </div>
                </div>
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

export default Instruction