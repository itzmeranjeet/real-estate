import React, { useState, useEffect } from "react"
import Heading from "../../common/Heading"
import { team } from "../../data/Data"
import "./team.css"
import { getAgents } from "../../../api/agents"

const Team = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {

    const fetchAgents = async () => {
      try {
        const response = await getAgents();
        setAgents(response.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchAgents();
  }, []);
  return (
    <>
      <section className="team background">
        <div className="container">
          <Heading
            title="Our Featured Agents"
            subtitle="Meet our experienced real estate professionals who are committed to helping you buy, sell, and rent properties with confidence and personalized service."
          />

          <div className="content mtop grid3">
            {agents.map((agent) => (
              <div className="box" key={agent.id}>
                <button className="btn3">
                  {agent.total_listings} Listings
                </button>

                <div className="details">
                  <div className="img">
                    <img src={agent.cover} alt={agent.name} />
                    <i className="fa-solid fa-circle-check"></i>
                  </div>

                  <i className="fa fa-location-dot"></i>
                  <label>{agent.address}</label>

                  <h4>{agent.name}</h4>

                  <ul>
                    <li>
                      <i className="fa-brands fa-facebook-f"></i>
                    </li>
                    <li>
                      <i className="fa-brands fa-linkedin-in"></i>
                    </li>
                    <li>
                      <i className="fa-brands fa-twitter"></i>
                    </li>
                    <li>
                      <i className="fa-brands fa-instagram"></i>
                    </li>
                  </ul>

                  <div className="button flex">
                    <button>
                      <i className="fa fa-envelope"></i>
                      Message
                    </button>

                    <button className="btn4">
                      <i className="fa fa-phone-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Team
