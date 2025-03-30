import { FC, useEffect, useState } from 'react'

const App: FC = () => {
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section')
      const viewportHeight = window.innerHeight
      const scrollPosition = window.scrollY + viewportHeight / 3

      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        const sectionBottom = sectionTop + sectionHeight

        if (scrollPosition >= sectionTop - viewportHeight / 4 && scrollPosition < sectionBottom - viewportHeight / 4) {
          setActiveSection(index)
        }
      })
    }

    let ticking = false
    const scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [])

  // Handle indicator dot clicks
  const handleIndicatorClick = (index: number) => {
    const sections = document.querySelectorAll('section')
    const targetSection = sections[index] as HTMLElement
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="app">
      {/* Social Links Bar */}
      <div className="social-links">
        <a href="https://github.com/DonasNave" target="_blank" rel="noopener noreferrer" className="social-link">
          <i className="fab fa-github"></i>
        </a>
        <a href="https://linkedin.com/in/noe-svanda-164166295" target="_blank" rel="noopener noreferrer" className="social-link">
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="https://x.com/svandanoe" target="_blank" rel="noopener noreferrer" className="social-link">
          <i className="fab fa-x-twitter"></i>
        </a>
      </div>

      {/* Section Indicators */}
      <div className="section-indicator">
        {[
          { index: 0, name: 'Intro' },
          { index: 1, name: 'Experience' },
          { index: 2, name: 'Education' },
          { index: 3, name: 'Projects' }
        ].map(({ index, name }) => (
          <div key={index} className={`indicator-group ${activeSection === index ? 'active' : ''}`}>
            <div
              className={`indicator-dot ${activeSection === index ? 'active' : ''}`}
              onClick={() => handleIndicatorClick(index)}
            />
            <span className="indicator-label">{name}</span>
          </div>
        ))}
      </div>

      {/* Header/Introduction Section */}
      <section className="section section-intro">
        <div className="content-wrapper">
          <h1 className="title">Noe Svanda</h1>
          <h2 className="subtitle">Software Engineer</h2>
          <p className="description">
            Uherské Hradiště, Zlín Region, Czech Republic
          </p>
        </div>
      </section>

      {/* Work Experience Section */}
      <section className="section section-experience">
        <div className="content-wrapper">
          <h2 className="section-title">Experience</h2>
          <div className="cards-container">
            <div className="card">
              <h3 className="card-title">ŠKODA Digital</h3>
              <p className="card-subtitle">Software Engineer</p>
              <p className="card-text">August 2023 - Present (1 year 8 months)</p>
              <p className="card-text">Ostrava, Moravia-Silesia, Czech Republic</p>
            </div>

            <div className="card">
              <h3 className="card-title">TESCO SW a.s.</h3>
              <p className="card-subtitle">Software Engineer</p>
              <p className="card-text">May 2023 - August 2023 (4 months)</p>
              <p className="card-text">Software Engineer</p>
              <p className="card-text">October 2021 - April 2023 (1 year 7 months)</p>
              <p className="card-text">Olomouc, Olomouc Region, Czech Republic</p>
            </div>

            <div className="card">
              <h3 className="card-title">nopShop Solutions</h3>
              <p className="card-subtitle">Software Developer</p>
              <p className="card-text">January 2023 - July 2023 (7 months)</p>
            </div>

            <div className="card">
              <h3 className="card-title">Centrum dopravního výzkumu, v. v. i.</h3>
              <p className="card-subtitle">Software Programmer</p>
              <p className="card-text">September 2022 - July 2023 (11 months)</p>
              <p className="card-text">Brno, South Moravia, Czech Republic</p>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="section section-education">
        <div className="content-wrapper">
          <h2 className="section-title">Education</h2>
          <div className="cards-container">
            <div className="card">
              <h3 className="card-title">Tomas Bata University in Zlín</h3>
              <p className="card-subtitle">Master of Engineering (Ing.), Software Engineering</p>
              <p className="card-text">July 2022 - June 2024</p>
            </div>

            <div className="card">
              <h3 className="card-title">Palacký University Olomouc</h3>
              <p className="card-subtitle">Bachelor's degree, Applied Informatics</p>
              <p className="card-text">August 2018 - May 2022</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section section-projects">
        <div className="content-wrapper">
          <h2 className="section-title">Projects</h2>
          <div className="projects-grid">
            <div className="card">
              <h3 className="card-title">Personal Website</h3>
              <p className="card-subtitle">React + TypeScript + Tailwind CSS</p>
              <p className="card-text">
                A modern, responsive personal website with retro gaming aesthetics.
                Features smooth scrolling, section indicators, and pixel-perfect design.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
