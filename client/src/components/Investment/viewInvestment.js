import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getInvestments,
  deleteInvestment,
  setCurrentInvestment,
} from "../../_actions/investmentAction";
import moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const InvestmentMaster = ({
  getInvestments,
  deleteInvestment,
  setCurrentInvestment,
  investments,
  filtered,
  loading,
  history,
}) => {
  useEffect(() => {
    getInvestments();
    //eslint-disable-next-line
  }, [getInvestments]);

  const onDeleteHandler = (id) => {
    deleteInvestment(id);
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
      <div className="container-fluid">
        <section className="container-fluid mt-4  justify-content-center ">
          <div className="container">
            <div className="row justify-content-center animated fadeIn">
              <div className="col-lg-10 col-md-10 align-item-center">
                <h2 className="text-center pt-2"> Your Added Donations </h2>
                <br />
                <div className="row">
                  <table className="table table-hover table-sm mt-2">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col" onClick={amntsort}>
                          Amount(INR)
                        </th>
                        <th scope="col" onClick={datesort}>
                          Date
                        </th>
                        <th scope="col">Investor</th>
                        <th scope="col">Receipt</th>
                        <th scope="col" className="text-right">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {investments.map((investment) => (
                        <tr key={investment._id}>
                          <td>₹{`${investment.amount}`}</td>
                          <td>
                            {moment(investment.date).format("DD-MM-YYYY")}
                          </td>
                          <td>
                            {!investment.investor ? "NA" : investment.investor}
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
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

InvestmentMaster.propTypes = {
  getInvestments: PropTypes.func.isRequired,
  deleteInvestment: PropTypes.func.isRequired,
  setCurrentInvestment: PropTypes.func.isRequired,
  investments: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  investments: state.investment.investments,
  filtered: state.investment.filtered,
  loading: state.investment.loading,
});
export default connect(mapStateToProps, {
  getInvestments,
  deleteInvestment,
  setCurrentInvestment,
})(InvestmentMaster);

// const datesort1 = (e) => {
//     let newDateSort = investments
//     if (isOldestFirst) {
//         newDateSort.sort((a, b) => a.amount - b.amount)
//     } else {
//         newDateSort.sort((a, b) => b.amount - a.amount)
//     }
//     setState({
//         isOldestFirst: false,
//         sortDate: newDateSort
//     })
// }
