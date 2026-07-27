import React, { useContext, useEffect, useState } from "react"
import { price } from "../../data/Data"
import { AppContext } from "../../../context/AppContext"
import { getPricingPlans } from "../../../api/pricingPlan"

const PriceCard = () => {
  const { setActiveModal, setSelectedPlan } = useContext(AppContext)
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await getPricingPlans();

        console.log("response ----------------", response);

        setPlans(response.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchPlans();
  }, []);
  console.log("plans", plans);
  return (
    <>
      <div className="content flex mtop">
        {plans.map((item) => (
          <div className="box shadow" key={item.id}>
            {item.badge && (
              <div className="topbtn">
                <button className="btn3">{item.badge}</button>
              </div>
            )}

            <h3>{item.plan_name}</h3>

            <h1>
              <span>$</span>
              {parseFloat(item.price)}
            </h1>

            <p>{item.description}</p>

            <ul>
              {item.features.map((feature, index) => (
                <li key={index}>
                  <label
                    style={{
                      background: feature.available
                        ? "#27ae601f"
                        : "#dc35451f",
                      color: feature.available
                        ? "#27ae60"
                        : "#dc3848",
                    }}
                  >
                    {feature.available ? (
                      <i className="fa-solid fa-check"></i>
                    ) : (
                      <i className="fa-solid fa-x"></i>
                    )}
                  </label>

                  <p>{feature.text}</p>
                </li>
              ))}
            </ul>

            <button
              className="btn5"
              style={{
                background:
                  item.plan_name === "Standard" ? "#27ae60" : "#fff",
                color:
                  item.plan_name === "Standard" ? "#fff" : "#27ae60",
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedPlan(item);
                setActiveModal("checkout");
              }}
            >
              Start {item.plan_name}
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default PriceCard
