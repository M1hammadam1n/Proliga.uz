'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useSignUp } from 'app/hooks/auth/useSignUp/useSignUp'
import { PhoneInput } from 'components/PhoneInput'
import { useUpdateUserTable } from 'app/hooks/auth/useUpdateUserTable/useUpdateUserTable'
import { useTranslation } from 'react-i18next'
import OTPConfirmationModal from 'components/OTPConfirmationModal'

const SignUpForm = ({ onClick }) => {
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [active, setActive] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { signUp, data, error, isLoading } = useSignUp()
  const { userAuth, userTable } = useSelector((store) => store.auth)
  const {
    isLoading: tableIsLoading,
    error: tableError,
    data: tableData,
    updateUserTable,
  } = useUpdateUserTable()

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setActive(true)
    await signUp({ email, password, confirmPassword })
  }

  useEffect(() => {
    if (userAuth?.user && active && phone && !error && !isLoading && data) {
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
    }
  }, [userAuth, active, phone, isLoading, error])

  useEffect(() => {
    if (userAuth && userTable && active) {
      setTimeout(() => router.push('/championships'), 250)
      setActive(false)
    }
  }, [active, router, userAuth, userTable])

  const { t } = useTranslation()

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-4 rounded-xl bg-neutral-950 px-6 py-8 shadow shadow-neutral-500 md:p-8"
    >
      <h2 className="mb-2 text-xl font-bold md:mb-4 md:text-2xl">
        {t("Ro'yxatdan o'tish")}
      </h2>
      <div className="relative flex flex-col gap-1">
        <label
          htmlFor="username"
          className="text-xs text-neutral-400 md:text-base"
        >
          {t('Telefon raqam')}:
        </label>
        <PhoneInput
          placeholder={t('Telefon raqam')}
          defaultCountry="UZ"
          className="h-10 bg-neutral-950 text-white"
          value={phone}
          onChange={setPhone}
        />
      </div>
      <div className="relative flex flex-col gap-1">
        <label
          htmlFor="username"
          className="text-xs text-neutral-400 md:text-base"
        >
          {t('Elektron pochta')}:
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
        <label
          htmlFor="password"
          className="text-xs text-neutral-400 md:text-base"
        >
          {t('Parol')}:
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          name="confirmPassword"
          id="confirmPassword"
          placeholder={t('Parol')}
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
        <label
          htmlFor="password"
          className="text-xs text-neutral-400 md:text-base"
        >
          {t('Parol tasdiqlash')}:
        </label>
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          name="password"
          id="password"
          placeholder={t('Parol')}
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
      <button
        type="button"
        onClick={onClick}
        className={`my-2 self-start text-sm text-neutral-300 transition-colors hover:text-neutral-100 hover:underline`}
      >
        {t('Akkauntingiz bormi ?')}
      </button>
      <button
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
          t('Akkaunt Ochish')
        )}
      </button>
    </form>
  )
}

export default SignUpForm
