import './Seasons.scss'
import AccordionGroup from "@/components/AccordionGroup";

import Accordion from "@/components/Accordion";
import seasonItems from "@/components/Seasons/seasonItems";
import EpisodeCard from "@/components/EpisodeCard";


const Seasons = (props) => {
    const {
        className,
    } = props

    return (
      <AccordionGroup
          classname='seasons'
          mode='dark'
          isOrderedList={false}
      >
          {seasonItems.map(({title, subtitle, episodes}, index) => (
                <Accordion
                    title={title}
                    tittleLevel = 'h4'
                    subtitle={subtitle}
                    id={`seasons-${index}`}
                    name='seasons'
                    isOpen={index === 0}
                    key={index}
                    isArrowButton
                >
                   <ul className="seasons__list">
                       {episodes.map((episode, index) => (
                           <li className="seasons__item" key={index}>
                               <EpisodeCard {...episode}/>
                           </li>
                       ))}
                   </ul>
                </Accordion>
          ))}
      </AccordionGroup>
    )
}

export default Seasons