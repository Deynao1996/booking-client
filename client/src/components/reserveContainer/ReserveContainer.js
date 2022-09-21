import gsap from 'gsap'
import { useQueries } from '@tanstack/react-query'
import { fetchRoom } from '../../utils/service-utils'
import { useSelector } from '../../hooks/useSelector'
import Reserve from '../reserve/Reserve'
import Skeleton from '../skeleton/Skeleton'
import { useEffect } from 'react'

const CONTAINER_STYLES = {
  backgroundColor: 'white',
  padding: '0 20px',
  position: 'relative',
  overflowY: 'scroll',
  maxHeight: '80vh'
}

const ReserveContainer = ({ roomIds, setIsReserveOpen, ...props }) => {
  const results = useQueries({
    queries: roomIds.map((id) => ({
      queryKey: ['room', id],
      queryFn: () => fetchRoom(id),
      refetchOnWindowFocus: false
    }))
  })
  const [q, sectionRef] = useSelector()
  const isLoading = results.some((result) => result.isLoading)
  const data = !isLoading ? results?.map((item) => item.data?.data) : null

  const handleCloseModal = () => {
    gsap.to(q('.reserve__container'), {
      y: '-100vh',
      ease: 'back.in(1.7)',
      onComplete: () => setIsReserveOpen(false)
    })
    gsap.to(sectionRef.current, {
      backgroundColor: 'rgba(0, 0, 0, 0)'
    })
  }

  function animateIt() {
    return gsap.fromTo(
      q('.reserve__container'),
      {
        y: '-100vh'
      },
      {
        y: '0',
        ease: 'back.out(1.7)'
      }
    )
  }

  useEffect(() => {
    const animation = animateIt()
    return () => animation.kill()
  }, [])

  return (
    <div className="reserve" ref={sectionRef}>
      <div className="reserve__container" style={CONTAINER_STYLES}>
        {isLoading ? (
          <Skeleton type="reserve" count={1} />
        ) : (
          <Reserve data={data} handleCloseModal={handleCloseModal} {...props} />
        )}
      </div>
    </div>
  )
}

export default ReserveContainer
