import React, { useState, useEffect } from "react";

import Instruction from "../components/instruction";
import Test from "../components/test";


export default function Home() {

   const [showTest, setShowTest] = useState(false);


   return (
      <>
         <div className=" w-full h-screen bg-white  ">
            {
               !showTest ?
                  <Instruction
                     onStart={() => setShowTest(true)}
                  /> :
                  <Test
                  onReset={() => setShowTest(false)}
                  />
            }
         </div>
      </>
   );
}
