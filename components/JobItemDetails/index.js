import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import {GoLocation} from 'react-icons/go'

import Header from '../Header'
import Skills from '../Skills'
import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    JobsData: {},
    skillsData: [],
    lifeAtCompany: {},
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsData()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,

    id: data.id,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    title: data.title,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    imageUrl: data.image_url,
    name: data.name,
    rating: data.rating,
    description: data.description,
  })

  getJobsData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      // console.log(fetchedData)
      const updatedData = this.getFormattedData(fetchedData.job_details)
      const skillsUpdatedData = fetchedData.job_details.skills.map(eachSkill =>
        this.getFormattedData(eachSkill),
      )
      // console.log(skillsUpdatedData)
      const lifeAtCompanyData = this.getFormattedData(
        fetchedData.job_details.life_at_company,
      )
      // console.log(lifeAtCompanyData)

      const updatedSimilarJobsData = fetchedData.similar_jobs.map(
        eachSimilarJob => this.getFormattedData(eachSimilarJob),
      )
      console.log(updatedSimilarJobsData)

      this.setState({
        JobsData: updatedData,
        skillsData: skillsUpdatedData,
        lifeAtCompany: lifeAtCompanyData,
        similarJobsData: updatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="jobs-details-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  retryJobDetails = () => {
    this.getJobsData()
  }

  renderFailureView = () => (
    <div className="job-details-error-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        className="error-view-image"
      />
      <h1 className="job-not-found-heading">Oops! Something Went Wrong</h1>
      <p className="job-not-found-description">
        We cannot seem to find the page you are looking for
      </p>

      <button type="button" className="button" onClick={this.retryJobDetails}>
        Retry
      </button>
    </div>
  )

  renderJobsDetailsView() {
    const {JobsData, skillsData, lifeAtCompany, similarJobsData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,

      employmentType,
      jobDescription,
      title,
      location,
      packagePerAnnum,
      rating,
    } = JobsData

    const {imageUrl, description} = lifeAtCompany

    return (
      <div className="jobs-section">
        <div className="job-id-container">
          <div className="jobs-list-container">
            <div className="section-one">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
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
            <div className="section-two">
              <p className="location">
                {' '}
                <GoLocation /> {location}
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
              <div className="description-companyUrl">
                <h1 className="description-heading">Description</h1>
                <a
                  href={companyWebsiteUrl}
                  className="hyperlink"
                  rel="style"
                  target="#"
                >
                  <span className="hyperlink">Visit</span>
                  <FiExternalLink />
                </a>
              </div>
              <p className="description-matter">{jobDescription}</p>
            </div>
          </div>
          <div className="skills-section">
            <h1 className="skills-heading">Skills</h1>
            <ul className="skills-ul">
              {skillsData.map(eachSkill => (
                <Skills skillDetails={eachSkill} key={eachSkill.id} />
              ))}
            </ul>
          </div>
          <div className="life-at-company">
            <h1 className="life-at-company-heading">Life at Company</h1>
            <div className="life-at-company-section">
              <p className="life-at-company-description">{description}</p>
              <img
                src={imageUrl}
                alt="life at company"
                className="life-at-company-img"
              />
            </div>
          </div>
        </div>
        <div className="similar-jobs">
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-jobs-list">
            {similarJobsData.map(eachSimilarJob => (
              <SimilarJobItem
                jobDetails={eachSimilarJob}
                key={eachSimilarJob.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-container">
          {this.renderJobDetails()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
