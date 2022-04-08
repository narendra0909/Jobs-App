import {Link} from 'react-router-dom'
import {GoLocation} from 'react-icons/go'
import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import './index.css'

const JobListDetails = props => {
  const {jobData} = props

  const {
    id,
    companyLogoUrl,
    employmentType,
    description,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobData

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-item">
        <div className="jobs-list-container">
          <div className="section-one">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="thumbnail"
            />
            <div className="rating-img">
              <h2 className="title">{title}</h2>
              <BsStarFill className="star" />

              <p className="rating">{rating}</p>
            </div>
          </div>
          <div className="section-two">
            <p className="location">
              {' '}
              <GoLocation />
              {location}
            </p>
            <p className="employ-type">
              {' '}
              <BsFillBriefcaseFill /> {employmentType}
            </p>
            <div>
              <p className="package"> {packagePerAnnum}</p>{' '}
            </div>
          </div>
          <hr className="hr-line" />
          <div className="section-three">
            <h1 className="description-heading">Description</h1>
            <p className="description-matter">{description}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default JobListDetails
