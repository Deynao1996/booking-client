import React from 'react'
import Lightbox from 'react-image-lightbox'

const CustomLightBox = ({ data, boxState, setBoxState }) => {
  return (
    <Lightbox
      mainSrc={data?.data.photos[boxState.photoIndex]}
      nextSrc={
        data?.data.photos[(boxState.photoIndex + 1) % data?.data.photos.length]
      }
      prevSrc={
        data?.data.photos[
          (boxState.photoIndex + data?.data.photos.length - 1) %
            data?.data.photos.length
        ]
      }
      onCloseRequest={() =>
        setBoxState((boxState) => ({ ...boxState, isOpen: false }))
      }
      onMovePrevRequest={() =>
        setBoxState((boxState) => ({
          ...boxState,
          photoIndex:
            (boxState.photoIndex + data?.data.photos.length - 1) %
            data?.data.photos.length
        }))
      }
      onMoveNextRequest={() =>
        setBoxState((boxState) => ({
          ...boxState,
          photoIndex: (boxState.photoIndex + 1) % data?.data.photos.length
        }))
      }
    />
  )
}

export default CustomLightBox
