import './About.scss';

export default function AboutPage() {

  return (
    <div className="modal-content">
      <div className='about-content'>
        <h2 className='about-heading'>About Us</h2>
        <p className='about-text'>
          <p>We are the Students of Lighthouse Labs, and this is our final project.
          India, Luna, Jeremy, and Taylor created this project as part of the June 12, 2023 cohort of the Lighthouse Labs Web Development Flex Program.</p>
          <img src={process.env.PUBLIC_URL + "/GitHub_logo.png"}alt="Github Logo" /><a href="https://github.com/lunamoonmoon/listful" target="_blank">GitHub Repo</a> <br/>
          <img src={process.env.PUBLIC_URL + "/lighthouselabs_logo.png"}alt="Lighthouse Labs Logo" /><a href="https://www.lighthouselabs.ca/" target="_blank">Lighthouse Labs</a>
        </p>
      </div>
    </div>
  );
}
