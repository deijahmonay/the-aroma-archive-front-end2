import { useParams } from "react-router-dom"
import * as perfumeService from '../../services/perfumeService'

const PerfumeDetails = (props) => {
  const {perfumeId} = useParams()

  return <main>Perfume Details</main>
}

export default PerfumeDetails