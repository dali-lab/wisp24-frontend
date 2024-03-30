import React, { useState } from 'react';
import "./feed.css";

const Filter = () =>{
    const[filterStatus,setStatus] = useState(false);


    return(
        <div>
            

            {filterStatus ? 
           
            <div className='filter-containter'>
                    <div className='major-container'>
                        <input></input>
                    </div>
                    <div className='minor-container'>

                    </div>
                    <div className='year-container'>

                    </div>
                    <div className='class-container'>
                </div>
                <button id='filter-btn-on' onClick={()=> setStatus(!filterStatus)}>
                        <img src='./assets/filter-btn.png' alt='Filter'/>
                </button>
             </div>

       
            :
            <button id='filter-btn-off' onClick={()=> setStatus(!filterStatus)}>
            <img src='./assets/filter-btn.png' alt='Filter'/>
            </button>
        }
           
        </div>
    )


};
export default Filter;