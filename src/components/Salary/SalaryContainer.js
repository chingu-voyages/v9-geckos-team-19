import React from 'react';
import teleport from '../../api/teleport';
import Salary from './Salary';

class SalaryContainer extends React.Component {
    state = { jobTitles: [], loadedCityURL: '', loadSuccess: false }

    salaryDetails = async (city) => {
        const chosenCity = city;

        let cityDetails = await teleport.get(chosenCity);
        cityDetails = cityDetails.data["_links"]["ua:salaries"]["href"];

        const salaryData = await teleport.get(cityDetails);
        const occupations = salaryData.data["salaries"];
        const occupationList = occupations.map(x => x["job"]["title"]);

        this.setState(
            {
                jobTitles: occupationList,
                loadedCityURL: chosenCity,
                loadSuccess: true
            }
        )
    }

    render() {
        let {loadedCityURL, loadSuccess, jobTitles} = this.state
        let showJobInfo;
        if (this.props.city && loadedCityURL !== this.props.city) {
            this.salaryDetails(this.props.city);
        }

        if (loadSuccess) {
            showJobInfo = (
                <div className="card shadow-sm">
                    <Salary
                        jobs={jobTitles}
                        city={this.props.city}
                    />
                </div>
            )
        }

        return <div>{showJobInfo}</div>
    }
}

export default SalaryContainer;