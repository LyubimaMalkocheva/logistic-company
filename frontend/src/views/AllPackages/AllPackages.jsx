import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AllPackages.css";
// import ReactPaginate from "react-paginate";
import { Package } from "../Package/Package";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllPackages,
  selectAllPackagesStatus,
} from "../../redux/reducers/packageReducer";
import { getAllPackagesAsync } from "../../redux/reducers/packageReducer";
import { selectUserData } from "../../redux/reducers/userDataReducer";

export const AllPackages = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [filteredPackages, setFilteredPackages] = useState();
  const userData = useSelector(selectUserData);

  const packagesData = useSelector(selectAllPackages);
  const packagesDataStatus = useSelector(selectAllPackagesStatus);

  console.log("packagesData", packagesData);
  useEffect(() => {
    if (packagesDataStatus === "idle") {
      dispatch(getAllPackagesAsync());
    }
    if (packagesDataStatus === "fulfilled") {
      if (userData.type === "customer") {
        const filteredArray = packagesData.filter(
          (packageData) =>
            packageData.receiver.email === userData.email ||
            packageData.sender.email === userData.email
        );
        setFilteredPackages(filteredArray);
      }
    }
  }, [dispatch, packagesDataStatus, packagesData, userData.type, userData.email]);

  const currentPageData = (allPackagesData) =>
    allPackagesData?.map((packageData) => (
      <div className="each-package">
        <Package packageData={packageData} />
      </div>
    ));

  return (
    <div className="All-packages">
      <div className="head-all-packages">
        <div className="title-all-packages">
          <h2>All packages: {packagesData?.length ?? 0}</h2>
        </div>

        <div className="all-packages-count">
          {/* <MdListAlt className="list-packages-icon" /> */}

          {/* <div className="post-number">{filterArr.length}</div> */}
        </div>
      </div>

      {/* <div className="body-all-post"> */}
      <div className="body-all-packages">
        {packagesData === null || packagesData?.length === 0 ? (
          <p>No posts to show.</p>
        ) : (
          <>
            {currentPageData(filteredPackages ?? packagesData)}
            {/* <ReactPaginate
                  breakLabel="..."
                  nextLabel="next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={PER_PAGE}
                  pageCount={Math.ceil(filterArr.length / PER_PAGE)}
                  previousLabel="< previous"
                  renderOnZeroPageCount={null}
                  containerClassName={'pagination'}
                  previousLinkClassName={'pagination-link'}
                  nextLinkClassName={'pagination-link'}
                  disabledClassName={'pagination-disabled'}
                  activeClassName={'pagination-active'}
                /> */}
          </>
        )}
      </div>
      {/* </div> */}
    </div>
  );
};
