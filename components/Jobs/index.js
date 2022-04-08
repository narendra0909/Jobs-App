import Header from '../Header'
// import JobsSection from '../JobsSection'
import JobsDetails from '../JobsDetails'
import './index.css'

const Jobs = () => (
  <>
    <Header />
    <div className="jobs-container">
      {/* <JobsSection /> */}
      <JobsDetails />
    </div>
  </>
)

export default Jobs
