import React, { useEffect, useState } from "react";
import SightInput from "./SightInput";
import { generateAxis } from "../../data/lens";
import axios from "../../config/axios";
import toast from "react-hot-toast";

const CustomerSight = ({ customer, eye }) => {
  const [submitted, setSubmitted] = useState(false);
  const axis = generateAxis();
  const side = eye === "Right Eye" ? "right" : "left";
  const [formData, setFormData] = useState({
    spherical: "",
    cylinder: "",
    axis: 0,
    addition: "",
    side: side,
  });
  const [initialFormData, setInitialFormData] = useState({
    spherical: "0.00",
    cylinder: "0.00",
    axis: 0,
    addition: "0.00",
    side: side,
  });

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
      const { data: sightData } = await axios.post(
        `/customers/addSight/${customer.customer_id}`,
        formData
      );
      if (sightData.success) {
        toast.success(sightData.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleSightInputChange = (id, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  useEffect(() => {
    const fetchSight = async () => {
      try {
        const { data } = await axios.post(
          `/customers/getSight/${customer.customer_id}`,
          { side: side }
        );
        if (data.success) {
          setInitialFormData({
            spherical: data.sight[0].spherical,
            cylinder: data.sight[0].cylinder,
            axis: data.sight[0].axis,
            addition: data.sight[0].addition,
            side: side,
          });
          setFormData({
            spherical: data.sight[0].spherical,
            cylinder: data.sight[0].cylinder,
            axis: data.sight[0].axis,
            addition: data.sight[0].addition,
            side: side,
          });
        }
      } catch (error) {
        setInitialFormData({
          spherical: "0.00",
          cylinder: "0.00",
          axis: 0,
          addition: "0.00",
          side: side,
        });
        setFormData({
          spherical: "0.00",
          cylinder: "0.00",
          axis: 0,
          addition: "0.00",
          side: side,
        });
        toast.error(error.response.data.message);
      }
    };
    fetchSight();
  }, [customer]);

  return (
    customer && (
      <div className="flex flex-col bg-gray-100 dark:bg-gray-700 w-full  p-4 rounded-xl shadow-md font-karla text-lg">
        <form className="flex flex-col gap-4 ">
          <h1 className="text-xl font-bold ">{eye}</h1>
          <div className="">
            <div className="flex flex-col w-full gap-2 ">
              <label htmlFor="spherical" className="text-lg  font-semibold">
                SPH
              </label>
              <SightInput
                id={"spherical"}
                sendData={handleSightInputChange}
                submitted={submitted}
                setSubmitted={setSubmitted}
                value={initialFormData.spherical}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="cylinder" className="text-lg  font-semibold">
                CYL
              </label>
              <SightInput
                id={"cylinder"}
                sendData={handleSightInputChange}
                submitted={submitted}
                setSubmitted={setSubmitted}
                width={"w-fit"}
                value={initialFormData.cylinder}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="axis" className="text-lg  font-semibold">
                Axis
              </label>
              <select
                name="axis"
                id="axis"
                className="border-none focus:outline outline-primary-300  rounded-xl h-full p-2 bg-white dark:bg-darkGray scrollbar-custom w-full"
                value={formData.axis}
                onChange={(e) =>
                  setFormData({ ...formData, axis: e.target.value })
                }
              >
                {axis.map((ax, _) => {
                  return (
                    <option key={_} value={ax}>
                      {ax}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="addition" className="text-lg  font-semibold">
                ADD
              </label>
              <SightInput
                id={"addition"}
                sendData={handleSightInputChange}
                submitted={submitted}
                setSubmitted={setSubmitted}
                value={initialFormData.addition}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-fit bg-primary-300 px-4 py-2 h-fit rounded-lg text-white text-lg font-semibold"
            onClick={handleSubmit}
          >
            Add {eye} sight
          </button>
        </form>
      </div>
    )
  );
};

export default CustomerSight;
