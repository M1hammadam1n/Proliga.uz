'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { useLogIn } from 'app/hooks/auth/useLogIn/useLogIn'
import { useGetUserTable } from 'app/hooks/auth/useGetUserTable/useGetUserTable'
import { PhoneInput } from 'components/PhoneInput'

const LoginForm = () => {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { isLoading, logIn, error } = useLogIn()
  const { userTable, userAuth } = useSelector((state) => state.auth)
  const [active, setActive] = useState(false)
  const {
    isLoading: tableIsLoading,
    getUserTable,
    error: tableError,
  } = useGetUserTable()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setActive(true)
    await getUserTable({ phone })
    if (userTable && userAuth) {
      router.push('/championships')
    }
  }

  useEffect(() => {
    if (userTable && active) {
      const fetch = async () =>
        await logIn({ email: userTable.email, password })
      fetch()

      setPassword('')
      setPhone('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userTable])
  useEffect(() => {
    if (userAuth && active) {
      router.push('/championships')
      setActive(false)
    }
  }, [active, router, userAuth])

  return (
    <form className="flex w-full flex-col gap-4 rounded-xl bg-neutral-950 px-6 py-8 shadow shadow-neutral-500 md:p-8">
      <h2 className="mb-2 text-xl font-bold md:mb-4 md:text-2xl">
        Tizimga kirish
      </h2>
      <div className="relative flex flex-col gap-1">
        <label htmlFor="username" className="text-xs md:text-base">
          Login:
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
        <label htmlFor="password" className="text-xs md:text-base">
          Parol:
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          id="password"
          placeholder="Parol"
          className="auth-input pl-9"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Image
          src="/icons/lock.svg"
          alt="password"
          width={20}
          height={20}
          className="filter-neutral-400 absolute bottom-2.5 left-2"
        />
        <button
          type="button"
          className="absolute bottom-2 right-2 cursor-pointer select-none"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <Image src="/icons/eye.svg" width={24} height={24} alt="eye" />
          ) : (
            <Image
              src="/icons/eye-hidden.svg"
              width={24}
              height={24}
              alt="eye hidden"
            />
          )}
        </button>
      </div>
      <Link
        href="/auth"
        className={`my-2 text-sm text-neutral-500 transition-colors hover:text-neutral-400 hover:underline`}
      >
        Akkaunt ochish?
      </Link>
      <button
        onClick={handleSubmit}
        type="submit"
        disabled={isLoading || tableIsLoading}
        className="mx-auto w-full rounded-sm border border-primary bg-neutral-900 py-3 font-semibold transition-all hover:bg-black"
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
  )
}

export default LoginForm
