import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import { useMediaQuery } from 'react-responsive'
import { useSelector } from '../../hooks/useSelector'
import { useAuthProvider } from '../../contexts/AuthContext'
import { modalOptions } from '../../data/modalOptions'
import { changeUser } from '../../utils/service-utils'
import { showError } from '../../utils/show-error-utils'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import './_newsletter.scss'

gsap.registerPlugin(ScrollTrigger)

const Newsletter = () => {
  const { currentUser, login } = useAuthProvider()
  const navigate = useNavigate()
  const location = useLocation()
  const emailRef = useRef('')
  const [q, sectionRef] = useSelector()

  const { newsletterModalInfo, passportVerificationModal } = modalOptions

  const btnContent = currentUser ? 'Subscribe' : 'Login and Subscribe'
  const isSubscribed = currentUser?.hasNewsletter

  function animateIt() {
    return gsap.to(q('.newsletter__bg'), {
      scrollTrigger: {
        trigger: sectionRef.current,
        scrub: true
      },
      yPercent: '-10',
      filter: 'blur(1px) brightness(0.3)'
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!currentUser) return navigate('/auth/login')
    if (!currentUser.isVerified) return swal(...passportVerificationModal)

    try {
      const res = await changeUser({
        userId: currentUser._id,
        changedData: { hasNewsletter: true }
      })
      if (res.data) {
        swal(...newsletterModalInfo).then((_value) => {
          login({ ...currentUser, hasNewsletter: true })
          e.target.reset()
        })
      }
    } catch (error) {
      showError()
    }
  }

  useEffect(() => {
    const animation = animateIt()
    return () => animation.kill()
  }, [location])

  return (
    <section className="newsletter" ref={sectionRef}>
      <div className="newsletter__bg">
        <img
          src="https://img2.storyblok.com/filters:quality(70)/f/81332/1920x640/dd6a1d5b22/ukraine-independence-monument-hero-1920x640.jpg"
          alt="bg"
        />
      </div>
      <h4 className="newsletter__title">Save time, save money!</h4>
      <div className="newsletter__descr">
        Sign up and we'll send the best deals to you
      </div>
      <form action="#" className="newsletter__form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required={true}
          onChange={(e) => (emailRef.current = e.target.value)}
        />
        <button
          className="button button__subscribe button_blue"
          disabled={isSubscribed}
          title={
            isSubscribed ? 'Your already have been subscribed!' : 'Subscribe'
          }
        >
          {btnContent}
        </button>
      </form>
    </section>
  )
}

export default Newsletter
