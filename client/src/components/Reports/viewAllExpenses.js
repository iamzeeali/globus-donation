import React, { Fragment, useEffect, useState } from "react";
import { getExpenses } from "../../_actions/expenseAction";
import { getAllUsers } from "../../_actions/authAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import ReactToExcel from "react-html-table-to-excel";

const ViewAllExpenses = ({ getExpenses, expenses, getAllUsers, users }) => {
  useEffect(() => {
    getExpenses();
    getAllUsers();
    //eslint-disable-next-line
  }, [getExpenses, getAllUsers]);

  //----SORTING--------------

  const [state, setState] = useState({
    sortDate: [],
    sortAmount: [],
    isToggle: true,
    isAmntToggle: true,
  });
  const { isToggle, isAmntToggle } = state;

  const datesort1 = (e) => {
    let newDateSort = expenses;
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
    let newAmntSort = expenses;
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
      <div className="container-fluid  pb-4 mb-4">
        <section className="mt-2  justify-content-center ">
          <div className="container">
            <h2 className="text-center pt-2">View All Expenses </h2>

            <div className="row justify-content-center animated fadeIn">
              <div className="col-lg-12 col-md-10 align-item-center">
                <div className="row">
                  <table
                    className="table table-hover table-responsive-md mt-2"
                    id="table-exp"
                  >
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">Cause</th>
                        <th scope="col" onClick={amntsort}>
                          Amount(INR)
                        </th>
                        <th scope="col" onClick={datesort}>
                          Date
                        </th>

                        <th scope="col">Expensed by</th>
                        <th scope="col">Purpose</th>
                        <th scope="col">Recipt</th>
                        <th scope="col">Added By</th>
                      </tr>
                    </thead>

                    <tbody>
                      {expenses.map((expense) => (
                        <tr key={expense._id}>
                          <td>{!expense.cause ? "NA" : expense.cause.cause}</td>
                          <td>₹{`${expense.amount}`}</td>
                          <td>{moment(expense.date).format("DD-MM-YYYY")}</td>
                          <td>{!expense.expensor ? "NA" : expense.expensor}</td>
                          <td>{`${expense.purpose}`}</td>
                          <td>
                            <a
                              href={`${process.env.PUBLIC_URL}/uploads/${expense.image}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={`${process.env.PUBLIC_URL}/uploads/${expense.image}`}
                                alt={expense.image}
                                className="profileImg"
                              ></img>
                            </a>
                          </td>
                          <td>{`${expense.user.username}`}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <ReactToExcel
                    className=" btn btn-danger "
                    table="table-exp" // id of table which you want to export
                    filename={`exp-${Date.now()}`} // name of the file
                    sheet="sheet"
                    buttonText="Export Table" // button name
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

ViewAllExpenses.propTypes = {
  getExpenses: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  expenses: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.expense.expenses,
  filtered: state.expense.filtered,
  loading: state.expense.loading,
  users: state.auth.users,
});
export default connect(mapStateToProps, { getExpenses, getAllUsers })(
  ViewAllExpenses
);
