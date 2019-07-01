import './Salary.css';
import React from 'react';
import SalaryDetails from './SalaryDetails';
import teleport from '../../api/teleport';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase } from '@fortawesome/free-solid-svg-icons'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

class Salary extends React.Component {
    state = {currentProfession: 0, 
            lowerTier: 0,
            avgPercentile: 0, 
            higherTier: 0,
            loadedCityURL: '', 
            isLoading: true}


    componentDidMount = async (jobIndex) => {
        this.onProfessionSelect(0);
    }

    onProfessionSelect = async (index) => {
        debugger;
        const { city, jobs } = this.props;
        const jobIndex = index;
        let cityDetails, salaryData, jobSalary;
        
        cityDetails = await teleport.get(city);
        salaryData = await teleport.get(cityDetails.data["_links"]["ua:salaries"]["href"]);
        jobSalary = salaryData.data["salaries"];

        const numberWithCommas = (x) => {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        const lowPay = numberWithCommas(jobSalary[jobIndex]["salary_percentiles"]["percentile_25"].toFixed(2));
        const mediumPay = numberWithCommas(jobSalary[jobIndex]["salary_percentiles"]["percentile_50"].toFixed(2));
        const highPay = numberWithCommas(jobSalary[jobIndex]["salary_percentiles"]["percentile_75"].toFixed(2));

        this.setState ({
            currentProfession: jobs[jobIndex],
            lowerTier: lowPay,
            avgPercentile: mediumPay,
            higherTier: highPay,
            loadedCityURL: city,
            isLoading: false
        })
    }

    render() {
        let {currentProfession, lowerTier, avgPercentile, higherTier, isLoading} = this.state;
        const {jobs} = this.props;
        let loadedContent;

        const menuDisplay = 
            <div>
                {jobs.map((job, index) => {
                    return <SalaryDetails 
                                job={job}
                                key={index}
                                select={() => this.onProfessionSelect(index)}
                            />
                })}
            </div>

        if(isLoading) {
            loadedContent = (
                <div>
                    <p>is Loading</p>
                </div>
            )
        }

        loadedContent = (
            <div className="card-body">
                <div className="card-title">
                    <Row>
                        <Col >
                            <h2>SALARY</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Select Your Profession for Average City Salary Pay </p>
                            <Dropdown>
                                <DropdownButton
                                    onClick={this.displayProfessionList}
                                    variant="salary"
                                    title={currentProfession ? currentProfession : 'Select a profession'}
                                >
                                    <Dropdown.Item className='salaryDropDownMenu'>
                                        {menuDisplay}
                                    </Dropdown.Item>
                                </DropdownButton>
                            </Dropdown>
                        </Col>
                    </Row>
                </div>
                <div className="card-text">
                    <Row>
                        <Col>
                            <div className="job-style">
                                <FontAwesomeIcon className="suitcase-style" icon={faBriefcase} />
                                <h4>{currentProfession}</h4>
                            </div>
                        </Col>
                        <Col>
                            <p>Median Salary: <span>${avgPercentile} USD</span></p>
                            <p> Lower 25th Percentile Earnings: <span>{lowerTier}</span></p>
                            <p> Higher 75th Percentile Earnings: <span>{higherTier}</span></p>
                        </Col>
                    </Row>
                </div>   
            </div>
        )

        return (
            <div >
                {loadedContent}
            </div>
        )
    }
}

export default Salary;