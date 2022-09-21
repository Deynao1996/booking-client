import swal from 'sweetalert'
import { modalOptions } from '../data/modalOptions'

export const showError = () => {
  const { errorModalInfo } = modalOptions
  swal(...errorModalInfo)
}
