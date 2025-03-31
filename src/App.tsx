import { FC, useEffect, useState } from 'react'

const App: FC = () => {
  const [activeSection, setActiveSection] = useState(0)
  const [expandedItems, setExpandedItems] = useState<number[]>([])

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

  const toggleExpand = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
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

      {/* PDF Download Button */}
      <button className="pdf-download-button" onClick={() => window.print()}>
        <i className="fas fa-file-pdf"></i>
        <span>Download PDF</span>
      </button>

      {/* Section Indicators */}
      <div className="section-indicator">
        {[0, 1, 2, 3, 4, 5].map((index) => (
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

      <div className="section-spacer" />

      {/* Bio Section */}
      <section className="section section-bio">
        <div className="content-wrapper">
          <h2 className="section-title">About Me</h2>
          <div className="bio-content">
            <div className="bio-text">
              <p className="card-text">
                I'm a passionate software engineer with a focus on building robust and scalable solutions. 
                My journey in software development is driven by a desire to create efficient, maintainable, 
                and user-friendly applications that solve real-world problems.
              </p>
              <p className="card-text">
                With experience in both frontend and backend development, I specialize in creating 
                comprehensive solutions with robust architecture. I'm particularly interested in distributed systems, microservices architecture, and building internal frameworks that enhance development efficiency.
              </p>
              <p className="card-text">
                My goal is to continue developing innovative solutions while sharing knowledge and 
                contributing to the developer community. I believe in writing clean, maintainable code 
                and following best practices to create sustainable software solutions.
              </p>
            </div>
            <div className="bio-highlights">
              <div className="highlight-item">
                <span className="highlight-label">Focus</span>
                <span className="highlight-value">Full-stack Development</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-label">Passion</span>
                <span className="highlight-value">System Architecture</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-label">Goal</span>
                <span className="highlight-value">Innovative Solutions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-spacer" />

      {/* Skills Section */}
      <section className="section section-skills">
        <div className="content-wrapper">
          <h2 className="section-title">Skills</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3 className="skill-category-title">Development</h3>
              <ul className="skill-list">
                <li>Internal Framework Development</li>
                <li>Solution Architecture</li>
                <li>Big Data Processing</li>
                <li>Transportation Systems</li>
                <li>E-commerce</li>
              </ul>
            </div>

            <div className="skill-category">
              <h3 className="skill-category-title">Databases</h3>
              <ul className="skill-list">
                <li>PostgreSQL</li>
                <li>MSSQL</li>
                <li>SQLite</li>
                <li>MongoDB</li>
                <li>InfluxDB</li>
                <li>ClickHouse</li>
                <li>Redis</li>
              </ul>
            </div>

            <div className="skill-category">
              <h3 className="skill-category-title">Communication</h3>
              <ul className="skill-list">
                <li>RabbitMQ</li>
                <li>Kafka</li>
                <li>gRPC</li>
                <li>REST</li>
              </ul>
            </div>

            <div className="skill-category">
              <h3 className="skill-category-title">Infrastructure</h3>
              <ul className="skill-list">
                <li>Jenkins CI</li>
                <li>Docker Swarm</li>
                <li>Nginx</li>
                <li>Envoy Proxy</li>
                <li>YARP</li>
              </ul>
            </div>

            <div className="skill-category">
              <h3 className="skill-category-title">Frontend</h3>
              <ul className="skill-list">
                <li>Blazor</li>
                <li>React</li>
                <li>Django</li>
                <li>Ruby on Rails</li>
              </ul>
            </div>

            <div className="skill-category">
              <h3 className="skill-category-title">Authentication</h3>
              <ul className="skill-list">
                <li>Custom OIDC Implementation</li>
                <li>Keycloak</li>
                <li>MS Entra</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="section-spacer" />

      {/* Work Experience Section */}
      <section className="section section-experience">
        <div className="content-wrapper">
          <h2 className="section-title">Experience</h2>
          <div className="cards-container">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">ŠKODA Digital</h3>
                <button 
                  className={`expand-button ${expandedItems.includes(0) ? 'expanded' : ''}`}
                  onClick={() => toggleExpand(0)}
                >
                  <i className={`fas ${expandedItems.includes(0) ? 'fa-minus' : 'fa-plus'}`}></i>
                </button>
              </div>
              <p className="card-subtitle">Software Engineer</p>
              <p className="card-text">August 2023 - Present ({calculateDuration(new Date('2023-08-01'))})</p>
              <p className="card-text">Ostrava, Moravia-Silesia, Czech Republic</p>
              {expandedItems.includes(0) && (
                <div className="card-details">
                  <p className="card-text">• Architecture and development of internal frameworks (frontend and backend)</p>
                  <p className="card-text">• Developing microservice applications for Railway Operations</p>
                  <p className="card-text">• Implementing CI/CD, Auth and Monitoring solutions</p>
                  <p className="card-text">• Big Data Processing</p>
                  <p className="card-text">• .NET, Blazor, PostgreSQL, Redis, InfluxDB, Kafka, Docker Swarm, OpenTelemetry, Grafana Stack, Jenkins, Envoy Proxy, YARP</p>
                </div>
              )}
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="card-title">TESCO SW a.s.</h3>
                <button 
                  className={`expand-button ${expandedItems.includes(1) ? 'expanded' : ''}`}
                  onClick={() => toggleExpand(1)}
                >
                  <i className={`fas ${expandedItems.includes(1) ? 'fa-minus' : 'fa-plus'}`}></i>
                </button>
              </div>
              <p className="card-subtitle">Software Engineer</p>
              <p className="card-text">October 2021 - July 2023 (1 year 10 months)</p>
              <p className="card-text">Olomouc, Olomouc Region, Czech Republic</p>
              {expandedItems.includes(1) && (
                <div className="card-details">
                  <p className="card-text">• Worked on housing and finance systems</p>
                  <p className="card-text">• Created Power BI reports</p>
                  <p className="card-text">• Developed internal tool for rewriting old code</p>
                  <p className="card-text">• .NET, MSSQL, SSRS</p>
                </div>
              )}
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="card-title">nopShop Solutions</h3>
                <button 
                  className={`expand-button ${expandedItems.includes(2) ? 'expanded' : ''}`}
                  onClick={() => toggleExpand(2)}
                >
                  <i className={`fas ${expandedItems.includes(2) ? 'fa-minus' : 'fa-plus'}`}></i>
                </button>
              </div>
              <p className="card-subtitle">Software Developer</p>
              <p className="card-text">January 2023 - July 2023 (7 months)</p>
              {expandedItems.includes(2) && (
                <div className="card-details">
                  <p className="card-text">• Worked on nopShop e-commerce platform</p>
                  <p className="card-text">• Created custom plugins and extensions</p>
                  <p className="card-text">• .NET, MSSQL</p>
                </div>
              )}
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="card-title">CDV - Transport Research Centre</h3>
                <button 
                  className={`expand-button ${expandedItems.includes(3) ? 'expanded' : ''}`}
                  onClick={() => toggleExpand(3)}
                >
                  <i className={`fas ${expandedItems.includes(3) ? 'fa-minus' : 'fa-plus'}`}></i>
                </button>
              </div>
              <p className="card-subtitle">Software Programmer</p>
              <p className="card-text">September 2022 - July 2023 (11 months)</p>
              <p className="card-text">Brno, South Moravia, Czech Republic</p>
              {expandedItems.includes(3) && (
                <div className="card-details">
                  <p className="card-text">• Worked on smart city solutions</p>
                  <p className="card-text">• Integration of open data sources</p>
                  <p className="card-text">• Django, AWS, Docker, PostgreSQL</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="section-spacer" />

      {/* Education Section */}
      <section className="section section-education">
        <div className="content-wrapper">
          <h2 className="section-title">Education</h2>
          <div className="cards-container">
            <div className="card">
              <h3 className="card-title">Tomas Bata University in Zlín</h3>
              <p className="card-subtitle">Master of Engineering, Software Engineering</p>
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

      <div className="section-spacer" />

      {/* Projects Section */}
      <section className="section section-projects">
        <div className="content-wrapper">
          <h2 className="section-title">Personal Projects</h2>
          <div className="projects-grid">
            <div className="card">
              <h3 className="card-title">CV Web</h3>
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
