'use client'

// import { useState } from 'react'
import useLoginForm from "../hooks/useLoginForm";
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.scss'
import prokeepLogo from '../public/prokeep-logo.webp'

export default function Home() {
  const { loginValues, handleChange, handleSubmit, handleEmailFieldChange } = useLoginForm();

  return (
    <main className={styles.main}>
      <section className={styles.loginBlock}>
        <Link href='https://www.prokeep.com/' target='_blank' rel='noreferrer' aria-label='Home Page'>
          <Image height='47' width='188' src={prokeepLogo} alt='prokeep logo' />
        </Link>
        <h1>Login to Your Account</h1>
        <form className={`${styles.loginForm}${loginValues.showEmailErrorMsg ? ' invalidEmail' : ''}`}
         onSubmit={handleSubmit}
        >
          <label className={styles.label}>Email Address</label>
          <input
            autoComplete="off"
            className={styles.input}
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleEmailFieldChange}
            value={loginValues.email}
            required
          />
          <label className={styles.label}>Password</label>
          <input
            autoComplete="off"
            className={styles.input}
            type="password"
            name="password"
            onChange={handleChange}
            value={loginValues.password}
            required
          />
          <button type="submit" disabled={loginValues.password.length <= 0 || !loginValues.isValidEmail && true } className="button is-block is-info is-fullwidth">Login</button>
        </form>
      </section>
    </main>
  )
}
