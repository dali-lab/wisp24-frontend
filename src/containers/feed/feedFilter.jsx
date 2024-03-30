import React, { useState } from 'react';
import "./feed.css";

const Filter = () =>{
    const[filterStatus,setStatus] = useState(false);


    return(
        <div>

            {filterStatus ? 
             <div className='filter-containter'>
            <button id='filter-btn' onClick={()=> setStatus(!filterStatus)}>
                <img src='./assets/filter-btn.png' alt='Filter'/>
            </button>
             <div className='major-container'>
                 <input></input>
             </div>
             <div className='minor-container'>

             </div>
             <div className='year-container'>

             </div>
             <div className='class-container'>

             </div>

         </div>
            :
            <button id='filter-btn' onClick={()=> setStatus(!filterStatus)}>
            <img src='./assets/filter-btn.png' alt='Filter'/>
            </button>
        }
           
        </div>
    )


};
export default Filter;