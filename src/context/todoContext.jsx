import React from 'react'
import { createContext } from "react";
import { useState } from "react";
export default function todoContext(props) {

    const [todo, settodo] = useState(second)





    const getTodo = async ()=>{

        const response = await fetch( `${host}/api/mywork/getwork`, {
          method: 'GET',
          headers:{
            'Content-Type':'application/json',
            
           'authToken' :localStorage.getItem('token'),
          },
          
        });
      
      const json = await response.json();
      console.log("i am running");
      settodo(json);
      }





      const addTodo = async (title,description,tag)=>{

        console.log("PARAMETERS OF ADD TODO"+title+" "+description+" "+tag);
    
    
        const response = await fetch( `${host}/api/mywork/addwork`, {
          method: 'POST',
          headers:{
            'Content-Type':'application/json',
           'authToken' :localStorage.getItem('token'),
          },
          body: JSON.stringify({title,description,tag})
        });
    
        const json = response.json(title,description,tag);
        console.log("ADDED TODO IS THIS "+json.title);
    
    
       
    
    
    
    
     const   pending= json ;
    settodo(todo.concat(pending));
    
      }














      const deleteTodo =async (id)=>{
      const response = await fetch( `${host}/api/mywork/delete/${id}`, {
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
      const newTODO = todo.filter((left)=>{ return left._id!==id})
      settodo(newTODO);
      
      }








      const edittodo  = async(id,title,description,tag)=>{
        console.log("PARAMETERS in frontend ARE : "+id+title+description+tag);
            const response = await fetch( `${host}/api/mywork/update/${id}`, {
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
            
            
            for (let index = 0; index < todo.length; index++) {
              const element = todo[index];
              console.log("ALL OK ");
              if(element._id === id){
                todo[index].title=title;
                todo[index].description=description;
                todo[index].tag=tag;
                
              }
              else{
                console.log("eroooor ");
              }
               
            }
            console.log("YEH HUA H UPDATION MAI todo ")
            console.log(todo);
            const newtodo = todo;
            settodo(newtodo);
            
            
            }



















  return (
    <createContext.Provider value={{addTodo,edittodo,deleteTodo,getTodo}}>
    {props.children}
</createContext.Provider>
  )
}
