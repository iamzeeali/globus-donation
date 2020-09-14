import React, { Fragment, useEffect, useState } from "react";
import {
  getInvestments,
  fetchInvestment,
  setCurrentInvestment,
  deleteInvestment,
} from "../../_actions/investmentAction";
import { getAllUsers } from "../../_actions/authAction";
import moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactToExcel from "react-html-table-to-excel";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const ViewAllInvestment = ({
  getInvestments,
  investments,
  fetchInvestment,
  getAllUsers,
  setCurrentInvestment,
  deleteInvestment,
  loading,
}) => {
  const [scroll, setScroll] = useState({
    limit: 9,
    page: 1,
  });

  useEffect(() => {
    let { limit, page } = scroll;
    getInvestments(limit, page);
    getAllUsers();
    //eslint-disable-next-line
  }, [getInvestments, getAllUsers]);

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

  const onDeleteHandler = (id) => {
    deleteInvestment(id);
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
                      <th scope="col">Country</th>
                      <th scope="col">Receipt</th>
                      <th scope="col">Added by</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {investments.map((investment) => (
                      <tr key={investment._id}>
                        <td>
                          {!investment.cause ? "NA" : investment.cause.cause}
                        </td>
                        <td>₹{`${investment.amount}`}</td>
                        <td>{moment(investment.date).format("DD-MM-YYYY")}</td>
                        <td>
                          {!investment.investor
                            ? "Hidden"
                            : investment.investor}
                        </td>
                        <td>{!investment.country ? "" : investment.country}</td>
                        <td>
                          <a
                            href={`/uploads/${investment.image}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={`/uploads/${investment.image}`}
                              alt={investment.image}
                              className="profileImg"
                            ></img>
                          </a>
                        </td>

                        <td>{`${investment.user.username}`}</td>
                        <td className="text-right">
                          <Link
                            to={`/admin/editInvestment/${investment._id}`}
                            onClick={() => setCurrentInvestment(investment)}
                          >
                            <i className="fa fa-edit fa-lg mr-4"></i>
                          </Link>
                          <Link
                            title="Delete"
                            to="#!"
                            onClick={() => onDeleteHandler(investment._id)}
                          >
                            <i className="fa fa-trash text-danger fa-lg"></i>
                          </Link>
                        </td>
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
            <ReactToExcel
              className=" btn btn-danger "
              table="table-inv" // id of table which you want to export
              filename={`Inv-${Date.now()}`} // name of the file
              sheet="sheet"
              buttonText="Export Table" // button name
            />
          </div>
        </section>
      </div>
    </Fragment>
  );
};

ViewAllInvestment.propTypes = {
  getInvestments: PropTypes.func.isRequired,
  fetchInvestment: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  investments: PropTypes.array.isRequired,
  setCurrentInvestment: PropTypes.func.isRequired,
  deleteInvestment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  filtered: state.investment.filtered,
  loading: state.investment.loading,
  users: state.auth.users,
  investments: state.investment.investments,
});
export default connect(mapStateToProps, {
  getInvestments,
  getAllUsers,
  fetchInvestment,
  setCurrentInvestment,
  deleteInvestment,
})(ViewAllInvestment);

//{`${Math.round((investment.amount / 785) * 10) / 10}Kit`}
//Website devloped & donated by Globuslabs
//Bank Branch
// Whatsapp
