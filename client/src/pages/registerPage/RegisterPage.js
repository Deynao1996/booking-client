import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik'
import { CustomField } from '../loginPage/LoginPage'
import swal from 'sweetalert'
import { createAccount } from '../../utils/service-utils'
import { showError } from '../../utils/show-error-utils'
import { modalOptions } from '../../data/modalOptions'

import './_registerPage.scss'

const initialValues = {
  name: '',
  lastName: '',
  userName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const RegisterPage = () => {
  const { registerModalInfo } = modalOptions
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Required field')
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field'),
    lastName: Yup.string()
      .required('Required field')
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field'),
    userName: Yup.string().required('Required field'),
    email: Yup.string()
      .required('Required field')
      .email('Invalid email format'),
    password: Yup.string().required('Required field'),
    confirmPassword: Yup.string()
      .required('Required field')
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
  })

  async function handleSubmit(values, actions) {
    const { name, email, lastName, userName, password } = values
    const user = {
      name,
      lastName,
      userName: userName.toLowerCase(),
      email: email.toLowerCase(),
      password
    }

    try {
      const res = await createAccount(user)
      if (res.data) {
        swal(...registerModalInfo)
        actions.resetForm()
      }
    } catch (error) {
      showError()
    } finally {
      actions.setSubmitting(false)
    }
  }

  return (
    <div className="create">
      <div className="create__title">CREATE AN ACCOUNT</div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="create__form">
            <div className="create__form-input">
              <CustomField
                type="text"
                placeholder="name"
                name="name"
                id="name"
              />
            </div>
            <div className="create__form-input">
              <CustomField
                type="text"
                placeholder="last name"
                name="lastName"
                id="lastName"
              />
            </div>
            <div className="create__form-input">
              <CustomField
                type="text"
                placeholder="username"
                name="userName"
                id="userName"
              />
            </div>
            <div className="create__form-input">
              <CustomField
                type="email"
                placeholder="email"
                name="email"
                id="email"
              />
            </div>
            <div className="create__form-input">
              <CustomField
                type="password"
                placeholder="password"
                name="password"
                id="password"
              />
            </div>
            <div className="create__form-input">
              <CustomField
                type="password"
                placeholder="confirm password"
                name="confirmPassword"
                id="confirmPassword"
              />
            </div>
            <span>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </span>
            <button
              type="submit"
              name="button"
              className="button-usuall button-usuall__auth button-usuall_br-0 button-usuall_m-0"
              disabled={isSubmitting}
            >
              CREATE
            </button>
            <div className="create__form-links">
              <Link to="/">Home page</Link>
              <Link to="../login">Sign in</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default RegisterPage
