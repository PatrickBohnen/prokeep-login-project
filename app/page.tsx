'use client'

// import { useState } from 'react'
import useLoginForm from "../hooks/useLoginForm";
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.scss'
import prokeepLogo from '../public/prokeep-logo.webp'
import loadingGif from '../public/loading.gif'
import dinoSurprise from '../public/dino-surprise.jpg'

export default function Home() {
  const { loginValues, isSubmitting, isSuccessful, handleChange, handleSubmit, handleEmailFieldChange, dismissDinos } = useLoginForm();

  return (
    <main className={styles.main}>
      <section className={styles.loginBlock} data-testid='login-block'>
        <Link data-testid='home-link' href='https://www.prokeep.com/' target='_blank' rel='noreferrer' aria-label='Home Page'>
          <Image height='47' width='188' src={prokeepLogo} alt='prokeep logo' />
        </Link>
        <h1>Login to Your Account</h1>
        <form className={`${styles.loginForm}${loginValues.showEmailErrorMsg ? ' invalidEmail' : ''}`} onSubmit={handleSubmit}>
          <label className={styles.label}>Email Address</label>
          <input
            autoComplete="off"
            className={styles.input}
            data-testid='email-field'
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
            data-testid='password-field'
            type="password"
            name="password"
            onChange={handleChange}
            value={loginValues.password}
            required
          />
          <button type="submit" data-testid='submit-button' disabled={loginValues.password.length <= 0 || !loginValues.isValidEmail && true }>
            {(isSubmitting) ? 
              <Image height='16' width='16' src={loadingGif} alt='' />
           : 
            'Login'
          }</button>
        </form>
        {/* I use a strict equals here instead of a ! operator since the default for isSuccessful is undefined */}
        {(isSuccessful === false) && 
          <p className={styles.oopsText}>Oops! Something has gone wrong.</p>
        }
      </section>
      <Image className={`${styles.dinoSurprise}${isSuccessful ? ' yayDinos' : ''}`} height='800' width='450' onClick={dismissDinos} src={dinoSurprise} alt='Dinosaurs celebrating a successful login' />
    </main>
  )
}
