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


    componentDidMount = async () => {
        this.onProfessionSelect(0);
    }

    onProfessionSelect = async (index) => {
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
        let {currentProfession, lowerTier, avgPercentile, higherTier, loadedCityURL, isLoading} = this.state;
        const {city, jobs} = this.props;
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

        if(loadedCityURL !== city) {
            this.onProfessionSelect(0);
        }

        loadedContent = (
            <div className="card-body">
                <div className="card-title">
                    <Row>
                        <Col >
                            <h2>SALARY</h2>
                        </Col>
                    </Row>
                    <Row className="selectProfessionForWage">
                        <p><span className="salarySpan"> Select Your Profession for Average City Salary Pay </span></p>
                    </Row>
                    <Row>
                        <FontAwesomeIcon className="suitcase-style" icon={faBriefcase} />
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
                    </Row>
                </div>
                <hr></hr>
                <div className="card-text">
                    <Row>
                        <Col>
                            <p>
                                <span className="salarySpan">Median Salary:</span> 
                                <span className="salaryResultsSpan">${avgPercentile} USD</span>
                            </p>
                            <p>
                                <span className="salarySpan">Lower 25th Percentile Earnings: </span> 
                                <span className="salaryResultsSpan">${lowerTier} USD</span></p>
                            <p>
                                <span className="salarySpan">Higher 75th Percentile Earnings: </span> 
                                <span className="salaryResultsSpan">${higherTier} USD</span></p>
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