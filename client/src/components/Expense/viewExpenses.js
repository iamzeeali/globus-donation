import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getExpenses,
  deleteExpense,
  setCurrentExpense,
} from "../../_actions/expenseAction";
import moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ExpenseMaster = ({
  getExpenses,
  deleteExpense,
  setCurrentExpense,
  expenses,
}) => {
  useEffect(() => {
    getExpenses();
    //eslint-disable-next-line
  }, [getExpenses]);

  const onDeleteHandler = (id) => {
    deleteExpense(id);
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
      <div className="container-fluid">
        <section className="container-fluid mt-4  justify-content-center ">
          <div className="container">
            <div className="row justify-content-center animated fadeIn">
              <div className="col-lg-12 col-md-10 align-item-center">
                <h2 className="text-center pt-2"> All Expenses </h2>
                <br />
                <div className="row">
                  <table className="table table-hover table-responsive-md mt-2">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col" onClick={amntsort}>
                          Amount(INR)
                        </th>
                        <th scope="col" onClick={datesort}>
                          Date
                        </th>
                        <th scope="col">Expense by</th>
                        <th scope="col">Purpose</th>
                        <th scope="col">Recipt</th>
                        <th scope="col" className="text-right">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {expenses.map((expense) => (
                        <tr key={expense._id}>
                          <td>₹{`${expense.amount} `}</td>

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
                          <td className="text-right">
                            <Link
                              to={`/admin/editExpense/${expense._id}`}
                              onClick={() => setCurrentExpense(expense)}
                            >
                              <i className="fa fa-edit fa-lg mr-4"></i>
                            </Link>
                            <Link
                              title="Delete"
                              to="#!"
                              onClick={() => onDeleteHandler(expense._id)}
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

ExpenseMaster.propTypes = {
  getExpenses: PropTypes.func.isRequired,
  deleteExpense: PropTypes.func.isRequired,
  setCurrentExpense: PropTypes.func.isRequired,
  expenses: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.expense.expenses,
  filtered: state.expense.filtered,
  loading: state.expense.loading,
});
export default connect(mapStateToProps, {
  getExpenses,
  deleteExpense,
  setCurrentExpense,
})(ExpenseMaster);
