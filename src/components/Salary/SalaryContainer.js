import React from 'react';
import teleport from '../../api/teleport';
import Salary from './Salary';

class SalaryContainer extends React.Component {
    state = { jobTitles: [], lowestPercentile: [], averagePercentile: [], highestPercentile: [], loadedCityURL: '' }

    salaryDetails = async (city) => {
        const chosenCity = city;

        let cityDetails = await teleport.get(chosenCity);
        cityDetails = cityDetails.data["_links"]["ua:salaries"]["href"];

        const salaryData = await teleport.get(cityDetails);
        const occupations = salaryData.data["salaries"];
        const occupationList = occupations.map(x => x["job"]["title"]);

        const jobSalary = salaryData.data["salaries"];
        const bottomPercentile = jobSalary.map(x => x["salary_percentiles"]["percentile_25"].toFixed(2));
        const mediumPercentile = jobSalary.map(x => x["salary_percentiles"]["percentile_50"].toFixed(2));
        const highPercentile = jobSalary.map(x => x["salary_percentiles"]["percentile_75"].toFixed(2));

        this.setState(
            {
                jobTitles: occupationList,
                lowestPercentile: bottomPercentile,
                averagePercentile: mediumPercentile,
                highestPercentile: highPercentile,
                loadedCityURL: chosenCity
            }
        )
    }

    render() {
        if (this.props.city && this.state.loadedCityURL !== this.props.city) {
            this.salaryDetails(this.props.city);
        }

        let showCalculator = null;

        if (this.state.loadSuccess) {
            showCalculator = (<div className="card"><Salary /></div>)
        }

        return <div>{showCalculator}</div>
    }
}

export default SalaryContainer;