import { toast } from 'react-hot-toast'
const url = process.env.REACT_APP_SERVER_URL || 'http://localhost:8000' ; 
// const url = 'http://localhost:8000' ; 

console.log(url)

export const register =async (formData)=>{
    return await fetch(`${url}/api/auth/register`, {
        method: 'POST',
        body: formData
      })
}

export const getAllUsers = async () => {
    
  const toastloading = toast.loading("Loading...");
  try {
      const res = await fetch(`${url}/api/auth/get-all-user`, {
          method: 'GET',
          headers: {
              "Content-Type": "application/json",
              auth_token: localStorage.getItem("auth_token"),
          },
      })
      const json = await res.json()

      let toastErrorId;
      if (json.msg === "jwt expired") {
          toast.error("Seasion expire", {
              id: toastloading,
          });
      }
      else if (!json.success) {
          toastErrorId = toast.error(json.msg, {
              id: toastloading,
          });
      }

      toast.dismiss(toastErrorId);

      return json;

  } catch (error) {
      console.log(error);
      toast.error("network error, unable to fetch the user", {
          id: toastloading,
      });

  }
}

export const getConversation = async (data) => {
    try {
        const res = await fetch(`${url}/api/conversation/get`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        )
        const json = await res.json()
        return json;
    } catch (err) {
        toast.error('network error')
    }
}

export const setConversion = async (data) => {
    try {
        const res = await fetch(`${url}/api/conversation/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        )
        const json = await res.json();
        return json;
    } catch (error) {
        console.log("error using setConversion", error)
    }
}
export const getAllMessages = async (id)=>{
    try{
        let res = await fetch(`${url}/api/message/get/${id}`,{
            method:"POST"
        })

        const json = await res.json();
        return json
    }
    catch(error){
        toast.error('unable to get message please try again')
    }
}
export const newMessage = async(data)=>{
    try{

        const res = await fetch(`${url}/api/message/add`,{
            method: "POST",
          body: data
          })

          const json = await res.json();
          return json;
        
    }catch(err){
        toast.error('unable to send the message , please try again')
    }
}

export const LogOut = ()=>{
    localStorage.clear();
    if(!localStorage.getItem('auth_token')){
      toast.success("Logout successfuly")
      
      return {success: true};

    }
    else{
      return {success: false}
    }
}