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
    state = {currentProfession: 0, lowestPercentile: 0,
            avgPercentile: 0, highestPercentile: 0, loadedCityURL: ''}


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

        let lowestPay = jobSalary[0]["salary_percentiles"]["percentile_25"].toFixed(2);
        let mediumPay = jobSalary[0]["salary_percentiles"]["percentile_50"].toFixed(2);
        let highPay = jobSalary[0]["salary_percentiles"]["percentile_75"].toFixed(2);

        lowestPay = numberWithCommas(lowestPay);
        mediumPay = numberWithCommas(mediumPay);
        highPay = numberWithCommas(highPay);


        this.setState({
            currentProfession: firstJob,
            lowestPercentile: lowestPay,
            avgPercentile: mediumPay,
            highestPercentile: highPay, 
            loadedCityURL: chosenCity
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

        let lowestPay = jobSalary[jobIndex]["salary_percentiles"]["percentile_25"].toFixed(2);
        let mediumPay = jobSalary[jobIndex]["salary_percentiles"]["percentile_50"].toFixed(2);
        let highPay = jobSalary[jobIndex]["salary_percentiles"]["percentile_75"].toFixed(2);

        lowestPay = numberWithCommas(lowestPay);
        mediumPay = numberWithCommas(mediumPay);
        highPay = numberWithCommas(highPay);

        this.setState ({
            currentProfession: selectedJob,
            lowestPercentile: lowestPay,
            avgPercentile: mediumPay,
            highestPercentile: highPay,
            loadedCityURL: chosenCity
        })
    }

    render() {
        if(this.props.jobs && this.props.city !== this.state.loadedCityURL) {
            this.onInitialCityLoad(this.props.jobs);
        }

        const displayCurrentProfession = this.state.currentProfession;

        const menuDisplay = 
            <div>
                {this.props.jobs.map((job, index) => {
                    return <SalaryDetails 
                                job={job}
                                key={index}
                                select={() => this.onProfessionSelect(index)}
                            />
                })}
            </div>

        return (
            <div className="card-body">
                <div className="card-title">
                <Row>
                    <Col >    
                    <h2>SALARY</h2>
                    </Col>  
                    <Col md={{ span: 4, offset: 5 }}>
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
                            <p>Median Salary: <span>${this.state.avgPercentile} USD</span></p> 
                            {/* <p>Lowest 25%: <span>${this.state.lowestPercentile} USD</span></p>
                            <p>Highest 25%: <span>${this.state.highestPercentile} USD</span></p> */}
                        </Col>
                    </Row>
                </div>   
            </div>
        )
    }
}



export default Salary;