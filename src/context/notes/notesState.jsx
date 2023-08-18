import React from "react";
import { useEffect,useRef } from "react";
import var1 from "./noteContext"
import { useState } from "react";


const NoteState = (props) =>{



  const host = "https://my-notes-backend-wwql.onrender.com";
    const a = {
        "name" : "AKSHIT",
        "class" : "5D"
    }
    
 const ref = useRef(false);
 const load = useRef("");
//this note shoulde get included in MyWork.js ----> if we declare a function inside the component and calls it again in useEffect then react thinks 
//this function is created again and it again re-renders this component then again useEffect() will run this function call inside it . 
//this keeps on happening again and again  
//in scenario series of stdeps are :----->
/**
 * 
 * 1st time function is declared and useeffect calls it 
 * 2nd time component is rendering this happens when we give dependency array 
 * //again function is declared again
 * //and useffect is called for it  
 * //it keeps on going and going 
 */

const [employee, setemployee] = useState([]);
const [user, setuser] = useState({name:"",email:"",epost:"",doj:""});
const [mode, setmode] = useState("light");

const notesInitial = [
]

const [mail, setmail] = useState(localStorage.getItem('mail'));

const[task,settask] = useState([]);
  const [notes, setnotes] = useState(notesInitial);


  useEffect(() => {


  
  }, [task])
  

  // useEffect(() => {
   
  // }, [notes])

const getNotes = async (mail)=>{

  await createUser(mail);

    const response = await fetch( `${host}/api/notes/fetchallnotes`, {
      method: 'POST',
      headers:{
        'Content-Type':'application/json',
        
       
      },
      body: JSON.stringify({email:mail})
    });

const json = await response.json();

 setnotes(json);
 //console.log("i am running"+notes.length);
}



const getTask = async ()=>{
  
  const response = await fetch( `${host}/api/sendwork/fetchalltask`, {
    method: 'PUT',
    headers:{
      'Content-Type':'application/json',
      
     'authToken' :localStorage.getItem('token'),
    },
    body: JSON.stringify({taskFind:mail})
  });

const json = await response.json();
settask(json);
//console.log("task chal rhi bhai "+user.email+" email yeh hai ");


}
const workInitia = []
const [accomp, setaccomp] = useState(workInitia);
const getAccomp = async ()=>{
  
  const response = await fetch( `${host}/api/sendwork/fetchallacc`, {
    method: 'PUT',
    headers:{
      'Content-Type':'application/json',
      
    //  'authToken' :localStorage.getItem('token'),.
    },
    body: JSON.stringify({email:mail})
  });

const json = await response.json();
//console.log("length iis "+json.length);
setaccomp(json);
//console.log("accomop chal rhi bhai ");
//console.log(accomp);


}

const sendmail=async(hrs,min,sec)=>{
const response = await fetch(`${host}/api/scheduler/schedulesms`,{
  method:'GET',
  headers:{
    'Content-Type':'application/json',

    
   
  },
  body: JSON.stringify({hrs,min,sec})
});
const json = await response.json();
//console.log(json);
}

const mailing=async(mail,subject,description)=>{
  
  const response = await fetch(`${host}/api/notes/sendmail`,{
    method:'PUT',
    headers:{
      'Content-Type':'application/json',
  
      
     
    },
    body: JSON.stringify({mail,subject,description})
   
  });
  const json = await response.json();
}




const getUser=async()=>{
  const response = await fetch(`${host}/api/auth/getuser`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'authToken':localStorage.getItem('token')
    },
    });
  // const json1 = await response.json();
  const json1 =  response.json();
  json1.then((json1)=>{
  
    setuser({name:json1.name,email:json1.email,epost:json1.epost,doj:json1.date});
    //console.log("user is this "+user);
  });
 }





  //ADDING A NOTE 
  const addNote = async (title,description,tag,email)=>{

    await createUser(email);
    //console.log("PARAMETERS OF ADD NOTE"+title+" "+description+" "+tag);


    const response = await fetch( `${host}/api/notes/addnote`, {
      method: 'POST',
      headers:{
        'Content-Type':'application/json',
       
      },
      body: JSON.stringify({title,description,tag,email})
    });

    const json = await response.json(title,description,tag);//original
    //console.log("ADDED NOTE IS THIS "+json.title);


   
// const json = await response.json();



 const   note= json ;
setnotes(notes.concat(note));

  }



















  //deleting a note 
  const deleteNote =async (id,email)=>{
 const response = await fetch( `${host}/api/notes/delete/${id}`, {
      method: 'DELETE',
      headers:{
        'Content-Type':'application/json',
       
       
      },
      body: JSON.stringify({email})
    });
    const json = await response.json();
    //console.log("BECHARA DELETED HUA KA RESPONSE JSON ")
    //console.log(json);
    





//console.log("DELETING A NOTE WITH ID "+id)
const newNotes =  notes.filter((note)=>{ return note._id!==id})
setnotes(newNotes);

  }



  const createUser = async (email)=>{

      
  
    
    const response = await fetch( `https://my-notes-backend-wwql.onrender.com/api/auth/createUser`, {
      method: 'POST',
      headers:{
        'Content-Type':'application/json',
        
      },
      body: JSON.stringify({email:email})
    });

    const json = await response.json();
    
    if(json.success===true){
      console.log("chaldiya mai");
     
     }
    else
    {
      //console.log(json.error);
    alert("INTERNAL SERVER ERROR");
    
    
    // navigate("/sign-up");
    }

}




  //edit a note 
  const editNote  = async(id,title,description,tag,email)=>{
//console.log("PARAMETERS in frontend ARE : "+id+title+description+tag);

await createUser(email);
    const response = await fetch( `${host}/api/notes/update/${id}`, {
      method: 'PUT',
      headers:{
        'Content-Type':'application/json',
       
      },


     
      
      body: JSON.stringify({id,title,description,tag,email})
    });
    const json =await  response.json(id,title,description,tag);
    //console.log("KYA TUM PROMISE HO")
    //console.log(json);
    
    
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      //console.log("ALL OK ");
      if(element._id === id){
        notes[index].title=title;
        notes[index].description=description;
        notes[index].tag=tag;
        
      }
      else{
        //console.log("eroooor ");
      }
       
    }
    //console.log("YEH HUA H UPDATION MAI NOTES ")
    //console.log(notes);
    const newNotes = notes;
    setnotes(newNotes);
    
    
    }









    const workInitial = []
    const [work, setwork] = useState(workInitial);


    const getAllWork = async ()=>{
      

        const response = await fetch( `${host}/api/sendwork/fetchallwork`, {
          method: 'GET',
          headers:{
            'Content-Type':'application/json',
            
           'authToken' :localStorage.getItem('token'),
          },
          
        });
      
      const json = await response.json();
      //console.log("i am running");
      setwork(json);
      }






      const addWork = async (title,description,tag,epost,erank,empemail,empname,empdoj)=>{

        //console.log("PARAMETERS OF ADD WORK "+title+" "+description+" "+tag+" "+epost+" "+erank+" "+empemail+" "+empname+" "+empdoj);
    
    
        const response = await fetch( `${host}/api/sendwork/addwork`, {
          method: 'POST',
          headers:{
            'Content-Type':'application/json',
           'authToken' :localStorage.getItem('token'),
          },
          body: JSON.stringify({title,description,tag,epost,erank,empemail,empname,empdoj})
        });
    
        const json = await response.json();
        //console.log("isne bc dimaak khrab krdiya ");
        //console.log(json);
        if(json.success=== false ){
         
     alert(json.error);
        }
        else{
         
          //console.log("ADDED NOTE IS THIS "+json.title);
          const   wrk = json ;
          setwork(work.concat(wrk));
        }
       
    
    
       
    
    
    
    
    
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
        const json =await response.json();
        //console.log("BECHARA DELETED HUA KA RESPONSE JSON ")
        //console.log(json);
        
      
      
      
      
      
      //console.log("DELETING A NOTE WITH ID "+id)
      const newWork = work.filter((wrk)=>{ return wrk._id!==id})
      setwork(newWork);
      
      }






      const editWork  = async(id,title,description,tag,epost,erank,empemail,chat)=>{
{/*editWork(modalWork.id, modalWork.eTitle, modalDesc, modalWork.eTag, modalWork.Upost, erank, modalWork.Umail,modalWork.chat); */}


        //console.log("PARAMETERS in frontend ARE : "+id+title+description+tag+empemail+" "+chat);
            const response = await fetch( `${host}/api/sendwork/update/${id}`, {
              method: 'PUT',
              
              headers:{
                'Content-Type':'application/json',
               'authToken' :localStorage.getItem('token'),
              },
        
        
             
              
              body: JSON.stringify({id,title,description,tag,epost,erank,empemail,chat})
            });
            const json =await response.json(id,title,description,tag);
            //console.log("KYA TUM PROMISE HO")
            //console.log(json);
            
            
            for (let index = 0; index < work.length; index++) {
              const element = work[index];
              //console.log("ALL OK ");
              if(element._id === id){
                work[index].title=title;
                work[index].description=description;
                work[index].tag=tag;
                work[index].epost=epost;
                work[index].erank=erank;
                work[index].empemail=empemail;
                
              }
              else{
                //console.log("eroooor ");
              }
               
            }
            //console.log("YEH HUA H UPDATION MAI work ")
            //console.log(work);
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
            //console.log(json);
            setemployee(json);
            //console.log("i am employee"+employee.length);

            }
       








//user database is there ----> do update database required:true , default :sde , as emppost 
//update fetch employee api 
//do add my work databse calls complete my-work component  with  chats 
// at home resolve jodit error 
//make work distributer routes 
//add profile section 
//resolve alarm component 
//add other requests to make app informative 
//add styling and deploy 


    return (

        <var1.Provider value={{a,getUser,accomp,createUser,setaccomp,getAccomp,settask,mode,setmode,user,employee,ref,setemployee,getTask,notes,getAllEmp,setnotes,addNote,deleteNote,editNote,getNotes,task,mail,setmail,mailing,addWork,deleteWork,editWork,getAllWork,work,setwork}}>
            {props.children}
        </var1.Provider>
    )
}

export default NoteState;