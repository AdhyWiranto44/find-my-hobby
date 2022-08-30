import axios from 'axios'
import domain from '../../constants/domain'
import headersMultipartFormData from '../../constants/headersMultipartFormData'


// export const uploadFile = async (file = {}) => await axios.post(`${domain}/uploadFile`, file, {
//   onUploadProgress: progressEvent => {
//     const percentCompleted = Math.round(
//       (progressEvent.loaded * 100) / progressEvent.total
//     );
//     console.log(`upload process: ${percentCompleted}%`);
//   }
// })
export const uploadFile = async (file = {}) => await axios.post(`${domain}/uploadFile`, file, headersMultipartFormData)