import React from "react";
import './style.css'

const BucketList = ({ list }) => {
    const my_lists = list;
    const my_wrap = React.useRef(null);

    return (
        <div ref={my_wrap}>
            {my_lists.map((list, index) => {
                return 
                    <div className='list-item' key={index}>
                        {list} 
                    </div>;
            })}
        </div>
    );
};

export default BucketList;