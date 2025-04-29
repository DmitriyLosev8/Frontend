import Section from "@/layouts/Section";
import './Banner.scss'
import Button from "@/components/Button";



const Banner = () => {
    const titleId = 'banner-title'

    return (
        <Section
            className='banner container'
            aria-label={titleId}
        >
          <div className="banner__inner">
             <div className="banner__body">
                 <h2 className="banner__totle" id={titleId}>Start your free trial today!</h2>
                 <div className="banner__description">
                     <p>This is a clear and concise call to action that encourages users to sign up for a free trial of StreamVibe.</p>
                 </div>
             </div>
              <Button
              className="banner__button"
              label="Start a Free Trail"
              href='/subsriptions'
              />
          </div>
        </Section>
    )
}

export default Banner