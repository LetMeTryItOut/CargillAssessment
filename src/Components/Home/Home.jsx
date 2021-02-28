import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    parentDiv: {
        'border': '2px grey solid'
    },
    HomeHeader: {
        'display': 'inline-flex', width: '100%', 'backgroundColor': 'lightgrey', 'maxHeight': '60px'
    },
    commonHeader: {
        width: '20%', 'text-align': 'center'
    },
    commonHeaderFilters: {
        width: '70%'
    },
    headerColumns: {
        'wordBreak': 'break-word', 'margin': '5px 5px 5px 5px'
    },
    countryParentDiv: {
        'display': 'inline-flex', 'marginTop': '1%', width: '100%'
    },
    commonRowStyles: {
        'width': '20%', 'wordBreak': 'break-word', 'text-align': 'center'
    },
    rowCountryName: {
        'cursor': 'Pointer', 'wordBreak': 'break-word', 'text-decoration': 'underline'
    }
});


function Home() {

    const styles = useStyles();
    const [countriesData, setCountriesData] = useState([]);
    const [displayedCountries, setDisplayedCountries] = useState(countriesData);
    const [sorting, setSorting] = useState({
        'population': 'normal'
    });
    const history = useHistory();

    useEffect(() => {
        axios.get("https://restcountries.eu/rest/v2/all")
            .then(response => {
                if (response.data !== undefined && response.data.length > 0) {
                    setCountriesData(response.data);
                    setDisplayedCountries(response.data);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    const handleOnChangeEvent = (e) => {
        debugger;
        if (e.currentTarget.getAttribute('label') === "searchByName") {
            setDisplayedCountries(countriesData.filter(country => {
                return country.name.toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) > -1 ||
                    country.alpha2Code.toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) > -1 ||
                    country.alpha3Code.toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) > -1
            }));
        }
        if (e.currentTarget.getAttribute('label') === "searchByPopulation") {
            setDisplayedCountries(countriesData.filter(country => {
                return country.population > e.currentTarget.value
            }));
        }
    }

    const handleOnSortingEvent = (e) => {
        let newSorting = { 'population': '' };
        switch (sorting.population) {
            case "normal":
                newSorting.population = "asc";
                setDisplayedCountries(countriesData.sort((a, b) => (a.population > b.population) ? 1 : -1));
                break;
            case "asc":
                newSorting.population = "desc";
                setDisplayedCountries(countriesData.sort((a, b) => (a.population < b.population) ? 1 : -1));
                break;
            case "desc":
                newSorting.population = "normal";
                setDisplayedCountries(countriesData.sort((a, b) => (a.name > b.name) ? 1 : -1));
                break;
            default:
                break;
        }
        setSorting(newSorting);
    }

    const handleOnClickEvent = (e) => {
        history.push("/country/" + e.currentTarget.textContent);
    }

    let data = [];
    data.push(
        <div key="home" className={styles.parentDiv}>
            <div key={"HomeHeader"} className={styles.HomeHeader}>
                <div className={styles.commonHeader}>
                    <h5 className={styles.headerColumns}>Name</h5>
                    <input className={styles.commonHeaderFilters} label="searchByName"
                        placeholder="search by country name or code" onChange={(e) => handleOnChangeEvent(e)} />
                </div>
                <h5 className={styles.commonHeader}>Capital</h5>
                <div className={styles.commonHeader}>
                    <h5 className={styles.headerColumns} style={{ 'cursor': 'pointer' }}
                        onClick={(e) => handleOnSortingEvent(e)}>Population (Sorting:{sorting.population})</h5>
                    <input className={styles.commonHeaderFilters} label="searchByPopulation"
                        placeholder="search by population (greater than)" onChange={(e) => handleOnChangeEvent(e)} />
                </div>
                <h5 className={styles.commonHeader}>Region</h5>
                <h5 className={styles.commonHeader}>Sub Region</h5>
            </div>
            {displayedCountries.map((item, index) => {
                return (
                    <div key={"country" + index} className={styles.countryParentDiv}>
                        <div className={styles.commonRowStyles} style={{ 'cursor': 'Pointer' }}>
                            <div className={styles.rowCountryName} onClick={(e) => handleOnClickEvent(e)}>{displayedCountries[index].name}</div>
                            <div>{"Country codes:" + displayedCountries[index].alpha2Code + "," + displayedCountries[index].alpha3Code}</div>
                        </div>
                        <div className={styles.commonRowStyles}>{displayedCountries[index].capital}</div>
                        <div className={styles.commonRowStyles}>{displayedCountries[index].population}</div>
                        <div className={styles.commonRowStyles}>{displayedCountries[index].region}</div>
                        <div className={styles.commonRowStyles}>{displayedCountries[index].subregion}</div>
                    </div>
                );
            })}
        </div>
    );
    return (
        <>
            {data}
        </>
    )
}
export default Home;