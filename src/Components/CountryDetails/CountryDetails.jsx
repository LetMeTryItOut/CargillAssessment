import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    countryHeader: {
        'height': '20px',
        'backgroundColor': 'lightgray',
        'font-weight': 'bold'
    },
    countryDetails: {
        'width': '100%',
        'border': '2px grey solid'
    },
    commonRowParent: {
        'display': 'inline-flex',
        'width': '100%',
        'margin': '5px 5px 5px 5px'
    },
    countryRowsLabel: {
        'width': '50%'
    },
    countryRowsValue: {
        'width': '50%',
        'display': 'inline-flex'
    },
});

function CountryDetails() {

    const styles = useStyles();
    const params = useParams();
    const [countryDetail, setCountryDetail] = useState([]);

    useEffect(() => {
        axios.get("https://restcountries.eu/rest/v2/name/" + params.name)
            .then(response => {
                if (response.data !== undefined && response.data.length > 0) {
                    if (!response.data.length > 1)
                        setCountryDetail(response.data[0]);
                    else {
                        let results = response.data.filter(a => a.name === params.name);
                        setCountryDetail(results[0]);
                    }
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    let data = [];
    if (countryDetail.hasOwnProperty("capital")) {
        data.push(
            <div data-testid="countryDetails">
                <div className={styles.countryHeader}>Below are {params.name} details:</div>
                <div key="country" className={styles.countryDetails}>
                    <div className={styles.commonRowParent}>
                        <div className={styles.countryRowsLabel}>
                            Capital City:
                    </div>
                        <div className={styles.countryRowsValue}>
                            {countryDetail.capital}
                        </div>
                    </div>
                    <div className={styles.commonRowParent}>
                        <div className={styles.countryRowsLabel}>
                            Language:
                    </div>
                        <div className={styles.countryRowsValue} >
                            {countryDetail.languages.map((item, index) => {
                                return (<div>
                                    {item.name + ","}
                                </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className={styles.commonRowParent}>
                        <div className={styles.countryRowsLabel}>
                            Currency:
                    </div>
                        <div className={styles.countryRowsValue}>
                            {countryDetail.currencies.map((item, index) => {
                                return (<div>
                                    {item.code + ","}
                                </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
            {data}
        </>
    )
}
export default CountryDetails;