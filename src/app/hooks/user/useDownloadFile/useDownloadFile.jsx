import { supabase } from "app/lib/supabaseClient"
import { useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"

export const useDownloadFile=()=>{
    const [error, setError] = useState(null)
    const [img, setImg] = useState(null)
    const { userAuth } = useSelector((state) => state.auth)
    const [isLoading, setIsLoading] = useState(false)
    const downloadFile = async () => {
        try {
            const { data, error } = await supabase.storage
              .from('avatars')
              .download(localStorage.getItem("photo_path"))
            console.log(data)
            const fr = new FileReader()
            fr.readAsDataURL(data)
            fr.onload = () => {
              setImg(fr.result)
            }
            if (error) {
              setError(error.message)
              return
            }
          } catch (error) {
            setError(error.message)
          } finally {
            setIsLoading(false)
          }
      }
      
      return {downloadFile,img}
}