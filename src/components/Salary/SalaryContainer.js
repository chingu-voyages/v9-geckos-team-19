import React from 'react';
import teleport from '../../api/teleport';
import Salary from './Salary';

class SalaryContainer extends React.Component {
    state = { jobTitles: [],  loadedCityURL: '', loadSuccess: false}

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
        if (this.props.city && this.state.loadedCityURL !== this.props.city) {
            this.salaryDetails(this.props.city);
        }

        let showJobInfo = null;

        if(this.state.loadSuccess) {
            showJobInfo = (
                <div className="card shadow-sm">
                        <Salary 
                            jobs={this.state.jobTitles}
                            city={this.props.city}
                        />
                    </div>
                )
        }

        return <div>{showJobInfo}</div>
    }
}

export default SalaryContainer;