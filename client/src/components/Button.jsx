import React from "react";

const Button = (props)=>{
    return(<button className="px-1 py-2 rounded-full text-left font-medium  hover:bg-gray-200 dark:hover:bg-gray-700 ">
        <img src={props.src} alt={props.name} className="w-5 h-5 mr-2 inline-block"></img>{props.name}</button>)
}
export default Button;