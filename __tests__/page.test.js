import { render, fireEvent, screen } from '@testing-library/react'
import Home from '../app/page'
import '@testing-library/jest-dom'
 
describe('Home', () => {
  it('renders the initial form', () => {
    render(<Home />)

    expect(screen.getByTestId('login-block')).toBeInTheDocument()
    expect(screen.getByTestId('home-link')).toBeInTheDocument()
    expect(screen.getByText('Login to Your Account')).toBeInTheDocument()
    expect(screen.getByText('Email Address')).toBeInTheDocument()
    expect(screen.getByTestId('email-field')).toBeInTheDocument()
    expect(screen.getByText('Password')).toBeInTheDocument()
    expect(screen.getByTestId('password-field')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('the submit button remains disabled if email is invalid', () => {
    render(<Home />)
    const emailField = screen.getByTestId('email-field')
    const passwordField = screen.getByTestId('password-field')
    const submitButton = screen.getByTestId('submit-button')
    fireEvent.change(emailField, {target: {value: 'wrongEmail'}}) 
    fireEvent.change(passwordField, {target: {value: '123abc'}})

    expect(submitButton).toBeDisabled()
  })

  it('the submit button remains disabled if there is no password', () => {
    render(<Home />)
    const emailField = screen.getByTestId('email-field')
    const submitButton = screen.getByTestId('submit-button')
    fireEvent.change(emailField, {target: {value: 'correctEmail@email.com'}})

    expect(submitButton).toBeDisabled()
  })

  it('the submit button becomes enabled if a valid email is entered and there is a password', () => {
    render(<Home />)
    const emailField = screen.getByTestId('email-field')
    const passwordField = screen.getByTestId('password-field')
    const submitButton = screen.getByTestId('submit-button')
    fireEvent.change(emailField, {target: {value: 'correctEmail@email.com'}})
    fireEvent.change(passwordField, {target: {value: '123abc'}})

    expect(submitButton).not.toBeDisabled()
  })
}) 