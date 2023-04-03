import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoPackage } from "react-icons/go";
import {
  MdInfo,
  MdPhoneInTalk,
  MdLocationOn,
  MdLocalPostOffice,
  MdDelete,
  MdMode,
} from "react-icons/md";
import "./Package.css";
import { Button, Divider, Popover, Typography } from "@mui/material";
import { selectUserData } from "../../redux/reducers/userDataReducer";
import { deletePackageAsync } from "../../redux/reducers/packageReducer";

export const Package = ({ packageData }) => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMoreInfo = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="Package">
      <div className="package-card-header">
        <div className="card-icons-column">
          <GoPackage />
          <MdLocalPostOffice />
          <MdLocationOn />
          <MdPhoneInTalk />
        </div>
        <div className="card-data">
          <div className="package-card-name">{packageData.nameofPackage}</div>
          <div className="package-card-data">{packageData.startPoint}</div>
          <div className="package-card-data">{packageData.endPoint}</div>
          <div className="package-card-data">{packageData.receiver.phone}</div>
        </div>
        <div className="card-info-button">
          <Popover
            id="more-info-popover"
            open={openMoreInfo}
            onClose={handleClose}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography sx={{ p: 2 }} className="info-popover">
              <div className="more-info-title">More info</div>
              <Divider />
              <div className="package-more-data">
                <div className="row-data">
                  <span>Kg:</span> {packageData.kg}
                </div>
                <div className="row-data">
                  <span>Measures:</span> {packageData.measures}
                </div>
                <div className="row-data">
                  <span>Sent on:</span> {packageData.date}
                </div>
                <div className="row-data">
                  <span>Sender:</span> {packageData.sender.phone}
                  {", "}
                  {packageData.sender.first_name} {packageData.sender.last_name}
                </div>
                <div className="row-data">
                  <span>Receiver:</span> {packageData.receiver.phone} {", "}
                  {packageData.receiver.first_name}{" "}
                  {packageData.receiver.last_name}
                </div>
                {userData.type === "employee" ? (
                  <div className="row-data">
                    <span>Driver:</span> {packageData.driver?.first_name}{" "}
                    {packageData.driver?.last_name}
                  </div>
                ) : null}
                {userData.type === "employee" ? (
                  <div className="row-data">
                    <span>Employee:</span>{" "}
                    {packageData.employeeInOffice?.first_name}{" "}
                    {packageData.employeeInOffice?.last_name}
                  </div>
                ) : null}
              </div>
            </Typography>
          </Popover>
          <Button onClick={handleClick}>
            <MdInfo />
          </Button>
          <Button
            onClick={() => {
              console.log("Edit");
            }}
          >
            <MdMode />
          </Button>
          <Button
            onClick={() => {
              console.log("Delete");
              dispatch(deletePackageAsync(packageData.id));
            }}
          >
            <MdDelete />
          </Button>
        </div>
      </div>
      <div className="package-card-footer">
        <div>Price: {packageData.kg}</div>
        <div>Status: {packageData.status}</div>
      </div>
    </div>
  );
};
