import { ImageList, ImageListItem, useMediaQuery } from '@mui/material'
import { useThemeProvider } from '../../contexts/ThemeContext'

const HotelImageList = ({ images, setBoxState }) => {
  const { theme } = useThemeProvider()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  function setImagePosition(i) {
    const defaultPos = {
      cols: 1,
      rows: 1
    }
    if (isMobile) return defaultPos
    if (i === 0) {
      return {
        cols: 2,
        rows: 2
      }
    } else if (i === 3 || i === 4 || i === 5) {
      return {
        cols: 2,
        rows: 1
      }
    } else {
      return defaultPos
    }
  }

  return (
    <ImageList
      sx={{ width: '100%' }}
      variant="quilted"
      cols={isMobile ? 1 : 4}
      rowHeight={250}
    >
      {images.map((item, i) => (
        <ImageListItem
          onClick={() => setBoxState({ isOpen: true, photoIndex: i })}
          key={i}
          sx={{ cursor: 'pointer' }}
          {...setImagePosition(i)}
        >
          <img src={item} alt="hotel" loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  )
}

export default HotelImageList
