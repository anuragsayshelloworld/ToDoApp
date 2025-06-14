function DisplayAllTask({state}){
    return <div>
           <ul>
            {state.tasklist.map((item, index)=>{
                return <li key={index}>{item.date}</li>
            })}
           </ul> 
           </div>
}
export default DisplayAllTask;