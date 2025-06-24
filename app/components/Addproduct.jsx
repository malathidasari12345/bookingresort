"use client";

import React, { useRef, useState } from "react";
import admin from "./components.module.css";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [offer, setOffer] = useState("");
  const [amen, setAmen] = useState("");
  const [desc, setDesc] = useState("");
  const imageRef = useRef(null);

  const recordHandler = async (e) => {
    e.preventDefault();

    const recordDetails = { title, price, offer, amen, desc };
    console.log(recordDetails);

    const data = new FormData();
    data.append("title", title);
    data.append("price", price);
    data.append("offer", offer);
    data.append("desc", desc);
    data.append("amen", amen);
    const file = imageRef.current.files[0];
    if (file) {
      data.append("image", file);
    } else {
      alert("Please select an image.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/add-product`,
        {
          method: "POST",
          body: data,
        }
      );
      const result = await response.json();
      if (result.success) {
        alert("Record Added Successfully");
        setTitle("");
        setPrice("");
        setOffer("");
        setDesc("");
        setAmen("");
        imageRef.current.value = null;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={admin.container}>
      <h1>Add Resort</h1>
      <form onSubmit={recordHandler} encType="multipart/form-data">
        <div className={admin.fields}>
          <div className="">
            <h3>Title</h3>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <h3>Price</h3>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div className={admin.fields}>
          <div className="">
            <h3>Offer</h3>
            <input
              type="number"
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
            />
          </div>
          <div className="">
            <h3>Amenities</h3>
            <input
              type="text"
              value={amen}
              onChange={(e) => setAmen(e.target.value)}
            />
          </div>
        </div>
        <div className={admin.textField}>
          <h3>Description</h3>
          <textarea
            type="text"
            rows="5"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className={admin.textField}>
          <h3>Upload Image</h3>
          <input type="file" name="image" accept="image/*" ref={imageRef} />
        </div>
        <div className={admin.submit}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
