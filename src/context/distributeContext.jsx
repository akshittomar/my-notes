import React from 'react'
import { createContext } from "react";

import { useState } from "react";
const distributer = React.createContext();
const Distribute=(props)=> {
  const host = "http://localhost:5000";
 const workInitial = []
    const [work, setwork] = useState(workInitial);
    const [employee, setemployee] = useState([]);

    const getAllWork = async ()=>{
      

        const response = await fetch( `${host}/api/sendwork/fetchallwork`, {
          method: 'GET',
          headers:{
            'Content-Type':'application/json',
            
           'authToken' :localStorage.getItem('token'),
          },
          
        });
      
      const json = await response.json();
      console.log("i am running");
      setwork(json);
      }





      const addWork = async (title,description,tag)=>{

        console.log("PARAMETERS OF ADD WORK "+title+" "+description+" "+tag);
    
    
        const response = await fetch( `${host}/api/sendwork/addwork`, {
          method: 'POST',
          headers:{
            'Content-Type':'application/json',
           'authToken' :localStorage.getItem('token'),
          },
          body: JSON.stringify({title,description,tag})
        });
    
        const json = response.json(title,description,tag);
        console.log("ADDED NOTE IS THIS "+json.title);
    
    
       
    
    
    
    
     const   wrk = json ;
    setwork(work.concat(wrk));
    
      }




      const deleteWork =async (id)=>{
        const response = await fetch( `${host}/api/sendwork/delete/${id}`, {
          method: 'DELETE',
          headers:{
            'Content-Type':'application/json',
           'authToken' :localStorage.getItem('token'),
           
          },
          body: JSON.stringify()
        });
        const json = response.json();
        console.log("BECHARA DELETED HUA KA RESPONSE JSON ")
        console.log(json);
        
      
      
      
      
      
      console.log("DELETING A NOTE WITH ID "+id)
      const newWork = work.filter((wrk)=>{ return wrk._id!==id})
      setwork(newWork);
      
      }






      const editWork  = async(id,title,description,tag)=>{
        console.log("PARAMETERS in frontend ARE : "+id+title+description+tag);
            const response = await fetch( `${host}/api/sendwork/update/${id}`, {
              method: 'PUT',
              headers:{
                'Content-Type':'application/json',
               'authToken' :localStorage.getItem('token'),
              },
        
        
             
              
              body: JSON.stringify({id,title,description,tag})
            });
            const json = response.json(id,title,description,tag);
            console.log("KYA TUM PROMISE HO")
            console.log(json);
            
            
            for (let index = 0; index < work.length; index++) {
              const element = work[index];
              console.log("ALL OK ");
              if(element._id === id){
                work[index].title=title;
                work[index].description=description;
                work[index].tag=tag;
                
              }
              else{
                console.log("eroooor ");
              }
               
            }
            console.log("YEH HUA H UPDATION MAI work ")
            console.log(work);
            const newwork = work;
            setwork(newwork);
            
            
            }


            const getAllEmp = async (epostFind)=>{
      

              const response = await fetch( `${host}/api/sendwork/fetchallepm`, {
                method: 'PUT',
                headers:{
                  'Content-Type':'application/json',
                  
                 'authToken' :localStorage.getItem('token'),
                },
                body: JSON.stringify({epostFind})
              });
            
            const json = await response.json();
            console.log(json);
            setemployee(json);
            console.log("i am employee"+employee.length);

            }
       






    return (

        <distributer.Provider value={{addWork,deleteWork,editWork,employee,setemployee,getAllWork,work,setwork}}>
            {props.children}
        </distributer.Provider>
    )
  
}

export default distributer;