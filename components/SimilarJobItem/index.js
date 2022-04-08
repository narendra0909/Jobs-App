import {GoLocation} from 'react-icons/go'
import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import './index.css'

const SimilarJobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails

  return (
    <li className="similar-jobs">
      <div className="jobs-list-container">
        <div className="section-one">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="thumbnail"
          />
          <div className="rating-img">
            <h2 className="title">{title}</h2>
            <div className="star-rating">
              <BsStarFill className="star" />

              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="section-three">
          <h1 className="description-heading">Description</h1>
          <p className="description-matter">{jobDescription}</p>
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
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
