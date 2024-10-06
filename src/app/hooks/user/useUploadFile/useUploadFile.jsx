import { supabase } from 'app/lib/supabaseClient'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

export const useUploadFile = () => {
  const [error, setError] = useState(null)
  const { userAuth } = useSelector((state) => state.auth)
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()

  const uploadFile = async ({ file }) => {
    try {
      setIsLoading(true)
      setError('')

      if (localStorage.getItem('photo_path')) {
        const { data, error } = await supabase.storage
          .from('avatars')
          .update(localStorage.getItem('photo_path'), file, {
            cacheControl: '3600',
            upsert: true,
          })
        if (data) {
          localStorage.setItem('photo_path', data.path)
          toast.success(t("Su'rat taxrirlandi"), { theme: 'dark' })
        }
        if (error) {
          setError(error.message)
          toast.warning(error.message, { theme: 'dark' })
          return
        }
      } else {
        const { data, error } = await supabase.storage
          .from('avatars')
          .upload(`public/${userAuth.user.id}`, file, {
            cacheControl: '3600',
            upsert: false,
          })
        if (data) {
          localStorage.setItem('photo_path', data.path)
          toast.success(t("Su'rat qo'shildi"), { theme: 'dark' })
        }

        if (error) {
          setError(error.message)
          toast.warning(t("Surat qo'shishda xatolik"), { theme: 'dark' })
          return
        }
      }
    } catch (error) {
      setError(error.message)
      toast.error(error.message, { theme: 'dark' })
    } finally {
      setIsLoading(false)
    }
  }

  return { uploadFile, isLoading, error }
}
