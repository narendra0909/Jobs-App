import './index.css'

const Skills = props => {
  const {skillDetails} = props
  const {name, imageUrl} = skillDetails
  return (
    <li className="skill-item">
      <img src={imageUrl} className="skills-img" alt={`${name}`} />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default Skills
