import React, { useEffect, useState } from "react";
import "./Contacts.css";
import { MdAlternateEmail } from "react-icons/md";
export const Contacts = () => {
  return (
    <div className="Contacts">
      <h1 className="contacts-title">Here are our best employees for 2022</h1>
      <hr className="contacts-line"></hr>
      <hr className="contacts-line"></hr>
      <div className="cards-body">
        <div className="person-card">
          <img
            src={require("../../image/YoannaY.jpg")}
            alt="home page"
            width={"75%"}
          />
          <div className="person-card-info">
            <div>Yoanna Yordanova</div>
            <div>
              <MdAlternateEmail /> ioannaiordanova0150@gmail.com
            </div>
          </div>
        </div>

        <div className="person-card">
          <img
            src={require("../../image/GeorgiD.jpg")}
            alt="home page"
            width="80%"
            height="70%"
          />
          <div className="person-card-info">
            <div>Georgi Donchev</div>
            <div>
              <MdAlternateEmail /> gvdonchev@gmail.com
            </div>
          </div>
        </div>

        <div className="person-card">
          <img
            src={require("../../image/lubima.jpg")}
            alt="home page"
            width="80%"
            height="70%"
          />
          <div className="person-card-info">
            <div>Lubima Malkocheva</div>
            <div>
              <MdAlternateEmail /> lubimarmalkochevau@abv.bg
            </div>
          </div>
        </div>

        <div className="person-card">
          <img
            src={require("../../image/GeorgiSh.JPG")}
            alt="home page"
            width="80%"
            height="75%"
          />
          <div className="person-card-info">
            <div>Georgi Shishiniov</div>
            <div>
              <MdAlternateEmail /> g.shishinyov@gmail.com
            </div>
          </div>
        </div>

        <div className="person-card">
          <img
            src={require("../../image/YoannaSh.png")}
            alt="home page"
            width="85%"
            height="72%"
          />
          <div className="person-card-info">
            <div>Yoanna Shishiniova</div>
            <div>
              <MdAlternateEmail /> yoanna.sh66@gmail.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
