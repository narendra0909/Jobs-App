import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
// import {Link} from 'react-router-dom'
import JobListDetails from '../JobListDetails'
import Profile from '../Profile'
import FilterGroup from '../FilterGroup'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobsDetails extends Component {
  state = {
    jobsList: [],
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    activeEmploymentTypeId: employmentTypesList[0].employmentTypeId,
    activeSalaryRangeId: salaryRangesList[0].salaryRangeId,
    // activeEmploymentTypeId: '',
    // activeSalaryRangeId: '',
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {
      activeSalaryRangeId,
      activeEmploymentTypeId,
      searchInput,
    } = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentTypeId}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      // console.log(data)
      const updatedData = data.jobs.map(eachJobDetail => ({
        id: eachJobDetail.id,
        companyLogoUrl: eachJobDetail.company_logo_url,
        employmentType: eachJobDetail.employment_type,
        description: eachJobDetail.job_description,
        packagePerAnnum: eachJobDetail.package_per_annum,
        rating: eachJobDetail.rating,
        title: eachJobDetail.title,
        location: eachJobDetail.location,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
      // console.log(updatedData)
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeEmploymentType = activeEmploymentTypeId => {
    this.setState({activeEmploymentTypeId}, this.getJobDetails)
    // console.log(activeEmploymentTypeId)
  }

  changeSalaryRange = activeSalaryRangeId => {
    this.setState({activeSalaryRangeId}, this.getJobDetails)
    // console.log(activeSalaryRangeId)
  }

  clearFilters = () => {
    this.setState(
      {
        searchInput: '',
        activeEmploymentTypeId: '',
        activeSalaryRangeId: '',
      },
      this.getJobDetails,
    )
  }

  renderLoadingView = () => (
    <div className="jobs-details-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onRetryJobsView = () => {
    this.getJobDetails()
  }

  renderFailureView = () => (
    <div className="job-details-error-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="error-view-image"
      />
      <h1 className="job-not-found-heading">Oops! Something Went Wrong</h1>

      <p className="failure-paragraph">
        We cannot seem to find the page you are looking for
      </p>

      <button type="button" className="button" onClick={this.onRetryJobsView}>
        Retry
      </button>
    </div>
  )

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSubmitSearchInput = () => {
    this.getJobDetails()
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobDetails()
    }
  }

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="job-search-input"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
          onKeyDown={this.onEnterSearchInput}
        />
        <button
          testid="searchButton"
          className="search-dv"
          type="submit"
          onClick={this.onSubmitSearchInput}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderJobDetailsView = () => {
    const {jobsList, activeEmploymentTypeId, activeSalaryRangeId} = this.state
    const shouldShowJobsList = jobsList.length > 0
    // console.log(shouldShowJobsList)

    return shouldShowJobsList ? (
      <div className="job-app-container">
        <ul className="job-lists">
          {jobsList.map(data => (
            <JobListDetails
              jobData={data}
              activeEmploymentTypeId={activeEmploymentTypeId}
              //   changeEmploymentType={this.changeEmploymentType}
              changeSalaryRange={this.changeSalaryRange}
              activeSalaryRangeId={activeSalaryRangeId}
              key={data.id}
            />
          ))}
        </ul>
      </div>
    ) : (
      <div className="job-details-error-view-container">
        <img
          alt="no jobs"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="error-view-image"
        />
        <h1 className="job-not-found-heading">No jobs found</h1>
        <p className="failure-paragraph">
          We could not find any jobs. Try other filters.
        </p>

        <button type="button" className="button" onClick={this.onRetryJobsView}>
          Retry
        </button>
      </div>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    const {
      activeEmploymentTypeId,
      activeSalaryRangeId,
      searchInput,
    } = this.state
    return (
      <div className="all-jobs-profile-container">
        <div className="profile-filters-container">
          <Profile />

          <FilterGroup
            searchInput={searchInput}
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            changeSalaryRange={this.changeSalaryRange}
            activeSalaryRangeId={activeSalaryRangeId}
            changeEmploymentType={this.changeEmploymentType}
            activeEmploymentTypeId={activeEmploymentTypeId}
            clearFilters={this.clearFilters}
          />
        </div>
        <div className="">
          {this.renderSearchInput()}
          {this.renderJobDetails()}
        </div>
      </div>
    )
  }
}
export default JobsDetails
