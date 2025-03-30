import { FC, useEffect, useState } from 'react'

const App: FC = () => {
  const [activeSection, setActiveSection] = useState(0)

  // Function to calculate and format duration
  const calculateDuration = (startDate: Date, endDate: Date | null = null) => {
    const now = endDate || new Date()
    const diff = now.getTime() - startDate.getTime()
    
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365))
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30))
    
    let duration = ''
    if (years > 0) {
      duration += `${years} year${years !== 1 ? 's' : ''} `
    }
    if (months > 0) {
      duration += `${months} month${months !== 1 ? 's' : ''}`
    }
    
    return duration.trim()
  }

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
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={`indicator-dot ${activeSection === index ? 'active' : ''}`}
            onClick={() => handleIndicatorClick(index)}
          />
        ))}
      </div>

      {/* Header/Introduction Section */}
      <section className="section section-intro">
        <div className="content-wrapper">
          <h1 className="title">Noe Švanda</h1>
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
              <p className="card-text">August 2023 - Present ({calculateDuration(new Date('2023-08-01'))})</p>
              <p className="card-text">Ostrava, Moravia-Silesia, Czech Republic</p>
            </div>

            <div className="card">
              <h3 className="card-title">TESCO SW a.s.</h3>
              <p className="card-subtitle">Software Engineer</p>
              <p className="card-text">October 2021 - July 2023 (1 year 10 months)</p>
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
              <p className="card-subtitle">React + TypeScript + CSS</p>
              <p className="card-text">
                A modern, responsive personal website with retro gaming aesthetics.
                Features smooth scrolling, section indicators, and pixel-perfect design.
                Built with React and TypeScript, styled with pure CSS for optimal performance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
