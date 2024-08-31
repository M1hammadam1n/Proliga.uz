'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSignUp } from '../../hooks/auth/useSignUp/useSignUp'
import { PhoneInput } from '../../../components/PhoneInput'
import { useUpdateUserTable } from 'app/hooks/auth/useUpdateUserTable/useUpdateUserTable'
import { supabase } from 'app/lib/supabaseClient'
import { useSelector } from 'react-redux'

const SignUp = () => {
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { signUp, data, error, isLoading } = useSignUp()
  const { userAuth } = useSelector((store) => store.auth)
  const {
    isLoading: tableIsLoading,
    error: tableError,
    data: tableData,
    updateUserTable,
  } = useUpdateUserTable()

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signUp({ email, password, confirmPassword })
  }

  useEffect(() => {
    if (userAuth.user) {
      const fetch = async () => {
        await updateUserTable({
          id: userAuth.user.id,
          email: userAuth.user.email,
          phone,
        })
      }
      fetch()
      setPhone('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')

      if (!error || (!tableError && !isLoading && !tableIsLoading)) {
        setTimeout(() => router.push('/championships'), 250)
      }
    }
  }, [userAuth])

  return (
    <main className="z-10 mt-16 flex min-h-svh items-center justify-center bg-neutral-800 py-4 text-neutral-200 lg:min-h-[45rem] 2xl:min-h-[100vh]">
      <form className="auth-container">
        <h2 className="mb-2 text-center text-xl font-bold md:mb-4 md:text-2xl">
          Ro&apos;yxatdan o&apos;tish
        </h2>
        <div className="relative flex flex-col gap-1">
          <label htmlFor="username" className="text-xs md:text-base">
            Telefon raqam:
          </label>
          <PhoneInput
            placeholder="Telefon raqam"
            defaultCountry="UZ"
            className="h-10 bg-neutral-950 text-white"
            value={phone}
            onChange={setPhone}
          />
        </div>
        <div className="relative flex flex-col gap-1">
          <label htmlFor="username" className="text-xs md:text-base">
            Elektron pochta:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="auth-input pl-9"
            placeholder="example@xyz.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Image
            src="/icons/mail.svg"
            alt="mail"
            width={20}
            height={20}
            className="filter-neutral-400 absolute bottom-2.5 left-2"
          />
        </div>
        <div className="relative flex flex-col gap-1">
          <label htmlFor="password" className="text-xs md:text-base">
            Parol:
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Parol"
            className="auth-input pl-9"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="absolute bottom-2 right-2 cursor-pointer select-none"
            onClick={() => setShowPassword(!showPassword)}
            type="button"
          >
            {showPassword ? (
              <Image src="/icons/eye.svg" alt="eye" width={24} height={24} />
            ) : (
              <Image
                src="/icons/eye-hidden.svg"
                alt="eye"
                width={24}
                height={24}
              />
            )}
          </button>
          <Image
            src="/icons/lock.svg"
            alt="password"
            width={20}
            height={20}
            className="filter-neutral-400 absolute bottom-2.5 left-2 size-5"
          />
        </div>
        <div className="relative flex flex-col gap-1">
          <label htmlFor="password" className="text-xs md:text-base">
            Parol tasdiqlash:
          </label>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="password"
            id="password"
            placeholder="Parol"
            className="auth-input pl-9"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            className="absolute bottom-2 right-2 cursor-pointer select-none"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            type="button"
          >
            {showConfirmPassword ? (
              <Image src="/icons/eye.svg" alt="eye" width={24} height={24} />
            ) : (
              <Image
                src="/icons/eye-hidden.svg"
                alt="eye"
                width={24}
                height={24}
                className="size-6"
              />
            )}
          </button>
          <Image
            src="/icons/lock.svg"
            alt="password"
            width={20}
            height={20}
            className="filter-neutral-400 absolute bottom-2.5 left-2 size-5"
          />
        </div>
        <Link
          href="/login"
          className={`my-2 text-sm text-neutral-500 transition-colors hover:text-neutral-400 hover:underline`}
        >
          Akkauntingiz bormi?
        </Link>
        <button
          onClick={handleSubmit}
          type="submit"
          disabled={isLoading || tableIsLoading}
          className="w-full rounded-sm border border-primary bg-neutral-900 py-3 font-semibold transition-all hover:bg-black"
        >
          {isLoading || tableIsLoading ? (
            <Image
              src="/icons/loading.svg"
              width={24}
              height={24}
              alt="loading"
              className="mx-auto size-6 animate-spin"
            />
          ) : (
            'Kirish'
          )}
        </button>
      </form>
    </main>
  )
}

export default SignUp
