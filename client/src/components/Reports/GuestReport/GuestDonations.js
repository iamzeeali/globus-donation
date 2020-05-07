import React, { Fragment, useEffect, useState } from "react";
import {
  getGuestDonations,
  fetchInvestment,
} from "../../../_actions/investmentAction";
import moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactToExcel from "react-html-table-to-excel";
import Skeleton from "react-loading-skeleton";

const GuestDonations = ({
  getGuestDonations,
  investments,
  fetchInvestment,
  loading,
  match,
}) => {
  const [scroll, setScroll] = useState({
    limit: 9,
    page: 1,
  });

  useEffect(() => {
    let { limit, page } = scroll;
    getGuestDonations(limit, page, match.params.handle);
    //eslint-disable-next-line
  }, [getGuestDonations]);

  const fetch = () => {
    let { limit, page } = scroll;
    setScroll({ ...scroll, page: ++page });
    fetchInvestment(limit, page);
  };

  //----SORTING--------------

  const [state, setState] = useState({
    sortDate: [],
    sortAmount: [],
    isToggle: true,
    isAmntToggle: true,
  });
  const { isToggle, isAmntToggle } = state;

  const datesort1 = (e) => {
    let newDateSort = investments;
    if (isToggle) {
      newDateSort.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    } else {
      newDateSort.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    }
    setState({
      sortDate: newDateSort,
    });
  };

  const amntsort1 = (e) => {
    let newAmntSort = investments;
    if (isAmntToggle) {
      newAmntSort.sort((a, b) => a.amount - b.amount);
    } else {
      newAmntSort.sort((a, b) => b.amount - a.amount);
    }
    setState({
      sortAmount: newAmntSort,
    });
  };

  const datesort = (e) => {
    datesort1();
    setState({
      isToggle: !isToggle,
    });
  };
  const amntsort = (e) => {
    amntsort1();
    setState({
      isAmntToggle: !isAmntToggle,
    });
  };

  return (
    <Fragment>
      <div className="container-fluid pb-4 mb-4">
        <section className="mt-2  justify-content-center ">
          <div className="container ">
            <h2 className="text-center pt-2"> View All Donations </h2>
          </div>

          <br />

          <div className="container justify-content-center animated fadeIn">
            <InfiniteScroll
              dataLength={investments.length}
              next={fetch}
              hasMore={true}
              loader={<p>Loading..</p>}
            >
              {investments !== null && !loading ? (
                <table className="table table-hover mt-2" id="table-inv">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col" onClick={amntsort}>
                        Cause
                      </th>
                      <th scope="col" onClick={amntsort}>
                        Amount(INR)
                      </th>
                      <th scope="col" onClick={datesort}>
                        Date
                      </th>
                      <th scope="col">Donated By</th>
                      <th scope="col">Recipt</th>
                      <th scope="col">Added by</th>
                    </tr>
                  </thead>

                  <tbody>
                    {investments.map((investment) => (
                      <tr key={investment._id}>
                        <td>
                          {!investment.cause ? "NA" : investment.cause.cause}
                        </td>
                        <td>
                          ₹{`${investment.amount}`}
                          <br />
                          <small className="text-danger">{`${
                            Math.round((investment.amount / 785) * 10) / 10
                          } Kit`}</small>
                        </td>
                        <td>{moment(investment.date).format("DD-MM-YYYY")}</td>
                        <td>
                          {!investment.investor
                            ? "Hidden"
                            : investment.investor}
                        </td>

                        <td>
                          <a
                            href={`${process.env.PUBLIC_URL}/uploads/${investment.image}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={`${process.env.PUBLIC_URL}/uploads/${investment.image}`}
                              alt={investment.image}
                              className="profileImg"
                            ></img>
                          </a>
                        </td>

                        <td>{`${investment.user.username}`}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div class="container">
                  <Skeleton count={10} height={40} />
                </div>
              )}
            </InfiniteScroll>
            {/*<ReactToExcel
              className=" btn btn-danger "
              table="table-inv" // id of table which you want to export
              filename={`Inv-${Date.now()}`} // name of the file
              sheet="sheet"
              buttonText="Export Table" // button name
            /> */}
          </div>
        </section>
      </div>
    </Fragment>
  );
};

GuestDonations.propTypes = {
  getGuestDonations: PropTypes.func.isRequired,
  fetchInvestment: PropTypes.func.isRequired,
  investments: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  filtered: state.investment.filtered,
  loading: state.investment.loading,
  users: state.auth.users,
  investments: state.investment.investments,
});
export default connect(mapStateToProps, {
  getGuestDonations,
  fetchInvestment,
})(GuestDonations);

//{`${Math.round((investment.amount / 785) * 10) / 10}Kit`}
//Website devloped & donated by Globuslabs
//Bank Branch
// Whatsapp
