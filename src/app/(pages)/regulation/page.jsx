'use client'

import Gutter from 'components/Gutter'
import { supabase } from 'app/lib/supabaseClient'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { LANGUAGE } from 'app/utils/languages.util'
import './styles.css'

const Regulation = () => {
  const { lang } = useSelector((store) => store.systemLanguage)
  const [rules, setRules] = useState('')

  useEffect(() => {
    const fetchRules = async () => {
      const { data, error } = await supabase
        .from('system_language')
        .select('id, name, uz, ru')
        .eq('name', 'qoida')
        .single()
      if (error) {
        console.error('Error fetching rules:', error)
      } else {
        setRules(data)
      }
    }
    fetchRules()
  }, [])

  return (
    <Gutter>
      <div
        className="rules my-6 min-h-screen w-full rounded-xl border bg-neutral-900/75 p-4 text-sm md:p-6 xl:text-base"
        dangerouslySetInnerHTML={{
          __html: lang === LANGUAGE.uz ? rules?.uz : rules?.ru,
        }}
      />
    </Gutter>
  )
}

export default Regulation
