"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import CalenderComponent from "@/app/components/CalenderComponent";
import { bookingAction } from "../serverActions/bookingAction";
import { Circles } from "react-loader-spinner";

const DynamicProduct = () => {
  const [record, setRecord] = useState("");

  const [selecetedDates, setSelectedDates] = useState(null);

  const params = useParams();

  const { id } = params;

  console.log("dynamic ClientId:", id);

  const dynamicProductHandler = async () => {
    const response = await fetch(
      `http://localhost:3000/api/admin/product/${id}`
    );
    const newData = await response.json();

    console.log("dynaic data:", newData);
    setRecord(newData.data);
  };

  useEffect(() => {
    dynamicProductHandler();
  }, []);

  const bookingHandler = async () => {
    if (!selecetedDates) {
      alert("Please select booking dates");
      return;
    }

    const bookingDetails = { record, selecetedDates };
    try {
      const response = await bookingAction(bookingDetails);
      if (response.success) {
        alert("Booking Successfull");
      }
    } catch (error) {}
  };

  const handleDateSelect = (dates) => {
    setSelectedDates(dates);
    console.log("dates coming from calenderComp:", dates);
  };

  return (
    <div>
      <CalenderComponent onDatesSelect={handleDateSelect} />
      <br></br>

      {record ? (
        <div className="">
          <div className="singleSection">
            <div className="singleLeft">
              <div className="">
                <center>
                  <h2>{record.title}</h2>
                </center>
                <br></br>
              </div>
              <img
                src={record.image}
                alt={record.title}
                className="singleImage"
              />
            </div>
            <div className="singleCenter">
              <h2>{record.title}</h2>
              <br></br>
              <p className="singleDesc" style={{ fontSize: "20px" }}>
                {record.desc}
              </p>
              <br></br>
              <div className="singlePrice"> Price : Rs.{record.price}</div>

              <br></br>
              <div className="">
                <h2>Facilities:</h2>
                {record.amen.map((item, i) => {
                  return (
                    <div className="singleAmen" key={i}>
                      <p style={{ fontSize: "18px" }}>
                        <span>*</span> {item}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="offer">
                <span>*</span>
                <button> Discount - {record.offer}</button>
              </div>
              <div className="singleBtn">
                <button className="" onClick={bookingHandler}>
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1 style={{ position: "absolute", top: "50%", left: "50%" }}>
          {" "}
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </h1>
      )}
    </div>
  );
};

export default DynamicProduct;
