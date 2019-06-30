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
            loadSuccess: false}


    onInitialCityLoad = async (job) => {
        let firstJob = job;
        firstJob = firstJob[0];

        const chosenCity = this.props.city;

        let cityDetails = await teleport.get(chosenCity);
        cityDetails = cityDetails.data["_links"]["ua:salaries"]["href"];

        const salaryData = await teleport.get(cityDetails);
        const jobSalary = salaryData.data["salaries"];

        const numberWithCommas = (x) => {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        const lowPay = numberWithCommas(jobSalary[0]["salary_percentiles"]["percentile_25"].toFixed(2));
        const mediumPay = numberWithCommas(jobSalary[0]["salary_percentiles"]["percentile_50"].toFixed(2));
        const highPay = numberWithCommas(jobSalary[0]["salary_percentiles"]["percentile_75"].toFixed(2));

        this.setState({
            currentProfession: firstJob,
            lowerTier: lowPay,
            avgPercentile: mediumPay,
            higherTier: highPay,
            loadedCityURL: chosenCity, 
            loadSuccess: true
        })

    }

    onProfessionSelect = async (index) => {
        const jobIndex = index;
        const chosenCity = this.props.city;

        const selectedJob = this.props.jobs[jobIndex];

        let cityDetails = await teleport.get(chosenCity);
        cityDetails = cityDetails.data["_links"]["ua:salaries"]["href"];

        const salaryData = await teleport.get(cityDetails);
        const jobSalary = salaryData.data["salaries"];

        const numberWithCommas = (x) => {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        const lowPay = numberWithCommas(jobSalary[jobIndex]["salary_percentiles"]["percentile_25"].toFixed(2));
        const mediumPay = numberWithCommas(jobSalary[jobIndex]["salary_percentiles"]["percentile_50"].toFixed(2));
        const highPay = numberWithCommas(jobSalary[jobIndex]["salary_percentiles"]["percentile_75"].toFixed(2));

        this.setState ({
            currentProfession: selectedJob,
            lowerTier: lowPay,
            avgPercentile: mediumPay,
            higherTier: highPay,
            loadedCityURL: chosenCity
        })
    }

    render() {
        let {currentProfession, lowerTier, avgPercentile, higherTier, loadedCityURL, loadSuccess} = this.state;
        const {jobs, city} = this.props;
        let loadedContent = null;

        if(!loadSuccess) {
            loadedContent = (
                <div className="card-body">
                    <p>Is loading </p>
                </div>
            )
        }

        if(jobs && city !== loadedCityURL) {
            this.onInitialCityLoad(jobs);
        }

        const displayCurrentProfession = currentProfession;

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

        if(loadSuccess) {
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
                                        title={displayCurrentProfession ? displayCurrentProfession : 'Select a profession'}
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
                                    <h4>{displayCurrentProfession}</h4>
                                </div>
                            </Col>
                            <Col>
                                <p>Median Salary: <span>${avgPercentile} USD</span></p>
                            </Col>
                        </Row>
                        <Row>
                            <Col></Col>
                            <Col>
                                <p> Lower 25th Percentile Earnings: <span>{lowerTier}</span></p>
                                <p> Higher 75th Percentile Earnings: <span>{higherTier}</span></p>
                            </Col>  
                        </Row>
                    </div>   
                </div>
            )
        }

        return (
            <div >
                {loadedContent}
            </div>
        )
    }
}

export default Salary;