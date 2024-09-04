'use client'

import { useState } from 'react'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

const Auth = () => {
  const [currentTab, setCurrentTab] = useState(tabs.login)

  const active = 'bg-black text-primary opacity-100 font-bold'
  const passive = 'bg-transparent text-neutral-600'

  console.log(active)

  return (
    <main className="flex min-h-screen w-full justify-center">
      <section className="mx-4 mb-8 mt-24 flex w-full max-w-[28rem] flex-col gap-4 bg-black sm:mx-0">
        <div className="flex rounded bg-neutral-900 p-1">
          <button
            className={`flex-1 select-none rounded py-1.5 text-sm font-medium transition-all ${currentTab === tabs.login ? active : passive}`}
            onClick={() => setCurrentTab(tabs.login)}
          >
            Login
          </button>
          <button
            className={`flex-1 select-none rounded py-1.5 text-sm font-medium transition-all ${currentTab === tabs.signup ? active : passive}`}
            onClick={() => setCurrentTab(tabs.signup)}
          >
            Sign Up
          </button>
        </div>
        {currentTab === 'login' && <LoginForm />}
        {currentTab === 'signup' && <SignUpForm />}
        {/* <LoginForm /> */}
        {/* <SignUpForm /> */}
      </section>
    </main>
  )
}

const tabs = {
  login: 'login',
  signup: 'signup',
}
export default Auth
