import React from 'react';
import * as Scroll from 'react-scroll';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import Salary from '../Salary/SalaryContainer';
import Education from '../Education/EducationContainer';
import Climate from '../Climate/ClimateContainer';
import Safety from '../Safety/SafetyContainer';



class Menu extends React.Component {
    state = {displayCity: '', loadedCityURL: ''}

    displayName = (city) => {
        let beforeCity = 'slug:';
        let afterCity = city.replace(new RegExp('.*' + beforeCity), '');
        const cityName = afterCity.toLowerCase()
            .split('-')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ')
            .replace('/', '');

        this.setState({
            currentCity: cityName,
            loadedCityURL: this.props.city
        })
    }

    componentDidMount = () => {
        Events.scrollEvent.register('begin', function () {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function () {
            console.log("end", arguments);
        });
    }

    scrollToTop = () => {
        scroll.scrollToTop();
    }

    scrollTo = () => {
        scroller.scrollTo('scroll-to-element', {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart'
        })
    }
    
    scrollToWithContainer = () => {

        let goToContainer = new Promise((resolve, reject) => {

            Events.scrollEvent.register('end', () => {
                resolve();
                Events.scrollEvent.remove('end');
            });

            scroller.scrollTo('scroll-container', {
                duration: 800,
                delay: 0,
                smooth: 'easeInOutQuart'
            });

        });

        goToContainer.then(() =>
            scroller.scrollTo('scroll-container-second-element', {
                duration: 800,
                delay: 0,
                smooth: 'easeInOutQuart',
                containerId: 'scroll-container'
            }));
    }
    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }

    render() {

        if (this.props.city && this.state.loadedCityURL !== this.props.city) {
            this.displayName(this.props.city);
        }

        let displayCurrent = null
        
        if (this.props.city && this.state.loadedCityURL === this.props.city) {
                displayCurrent = (<div>{this.state.currentCity}</div>);
            }


        return (
            <div className = "menu shadow-lg">
                <p>{displayCurrent}</p>
                {/* <p> <Link className="" to="">Life Quality </Link > </p>
                <p> <Link className="" to="">Cost of Living </Link > </p> */}
                <p> <Link activeClass="active" to="salary" spy={true} smooth={true} duration={500} isDynamic={true}>Salary </Link > </p>
                <p> <Link activeClass="active" to="education" spy={true} smooth={true} duration={500} isDynamic={true}>Education </Link > </p>
                <p> <Link activeClass="active" to="safety" spy={true} smooth={true} duration={500} isDynamic={true}>Safety </Link > </p>
                <p> <Link activeClass="active" to="climate" spy={true} smooth={true} duration={500} isDynamic={true}>Climate </Link > </p>
                <p onClick={this.scrollToTop}>Back To Top</p>
                {/* <p> <Link className="" to="">Population </Link > </p> */}

                <div>
                    <Element name="education" className="element">
                        <Education />
                    </Element>
                    <Element name="safety" className="element">
                        <Safety />
                    </Element>
                    <Element name="climate" className="element">
                        <Climate />
                    </Element>
                    <Element name="salary" className="element">
                        <Salary />
                    </Element>
                </div>
            </div>        
        );
    }
}

export default Menu;