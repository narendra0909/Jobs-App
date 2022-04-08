import './index.css'

const FilterGroup = props => {
  const renderEmploymentTypesFilterList = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(eachType => {
      const {changeEmploymentType} = props
      const onClickEmploymentType = event =>
        changeEmploymentType(event.target.value)

      return (
        <li className="items">
          <input
            type="checkbox"
            key={eachType.employmentTypeId}
            id={eachType.employmentTypeId}
            className="checkbox"
            value={eachType.employmentTypeId}
            onChange={onClickEmploymentType}
          />
          <label
            className="employment-label"
            htmlFor={eachType.employmentTypeId}
          >
            {eachType.label}
          </label>
        </li>
      )
    })
  }

  const renderEmploymentTypesFilter = () => (
    <div>
      <h1 className="salary-heading">Type of Employment</h1>
      <ul className="salary-list">{renderEmploymentTypesFilterList()}</ul>
    </div>
  )

  const salaryRangesFilterList = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(eachType => {
      const {changeSalaryRange} = props
      const onClickSalaryRange = event => changeSalaryRange(event.target.id)

      return (
        <li className="items">
          <input
            type="radio"
            id={eachType.salaryRangeId}
            key={eachType.salaryRangeId}
            className="radio"
            value={eachType.label}
            onChange={onClickSalaryRange}
          />
          <label className="salary-label" htmlFor={eachType.salaryRangeId}>
            {eachType.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryRangesFilter = () => (
    <div>
      <h1 className="salary-heading">Salary Range</h1>
      <ul className="salary-list">{salaryRangesFilterList()}</ul>
    </div>
  )

  return (
    <div className="filter-group">
      <div className="">
        <hr className="line" />
        {renderEmploymentTypesFilter()}
        <hr className="line-one" />
        {renderSalaryRangesFilter()}
      </div>
    </div>
  )
}

export default FilterGroup
