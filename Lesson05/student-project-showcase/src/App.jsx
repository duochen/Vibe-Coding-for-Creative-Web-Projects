import { useState } from 'react'
import './App.css'

function App() {
  const [showPlan, setShowPlan] = useState(false)

  const title = 'AI Recycling Helper'
  const description =
    'A student-built web app that helps people learn whether an item belongs in recycling, compost, trash, or special disposal.'
  const category = 'Environmental Tech'

  const skills = [
    'React',
    'JavaScript',
    'UI Design',
    'Environmental Science',
    'AI Prompting',
  ]

  const milestones = [
    'Build the recycling category database',
    'Design the user search interface',
    'Add AI-powered sorting suggestions',
  ]

  const planWeeks = [
    'Week 1: Research the problem',
    'Week 2: Build the first prototype',
    'Week 3: Test with users',
    'Week 4: Improve the design and prepare a demo',
  ]

  function handleViewPlan() {
    setShowPlan((current) => !current)
  }

  return (
    <div className="app">
      <div className="hero-card">
        <header>
          <p className="app-name">Student Project Showcase</p>
          <h1>{title}</h1>
          <p className="category">{category}</p>
        </header>

        <section className="description">
          <h2>About This Project</h2>
          <p>{description}</p>
        </section>

        <section className="skills">
          <h2>Skills Used</h2>
          <ul>
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="progress">
        <h2>Progress</h2>
        <ol className="milestone-list">
          {milestones.map((milestone, index) => (
            <li key={milestone} className="milestone-card">
              <span className="milestone-number">{index + 1}</span>
              <span className="milestone-text">{milestone}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="actions">
        <button
          type="button"
          className="primary-button"
          onClick={handleViewPlan}
          aria-expanded={showPlan}
        >
          {showPlan ? 'Hide Project Plan' : 'View Project Plan'}
        </button>

        {showPlan && (
          <section className="project-plan">
            <h2>Project Plan</h2>
            <ul className="plan-list">
              {planWeeks.map((week, index) => (
                <li key={week} className="plan-week-card">
                  <span className="milestone-number">{index + 1}</span>
                  <span className="milestone-text">{week}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}

export default App
