import React from 'react';
import useState from 'react';
import './App.css';
import { IntlProvider, FormattedMessage, FormattedDate } from 'react-intl';

const Welcome = (props) => {

    const messages = {
        en: {
            heading: 'Welcome'
        },
        fi: {
            heading: 'Tervetuloa'
        },
    }

    const [locale, setLocale] = useState('en')

    const handleChange = (e) => {
        setLocale(e.target.value)
    }

    return (
        <div className="welcome">
            <IntlProvider locale={locale} messages={messages[locale]} >
                <div className="item">
                    <FormattedMessage id="heading"
                        defaultMessage="Tervetuloa"
                        value={{ locale }}>
                    </FormattedMessage>
                </div>
                <div className="item">
                    <FormattedDate year="numeric" month="long" day="numeric" weekday="long" value={props.date}></FormattedDate>
                </div>
                <div className="item">
                    <select onChange={handleChange} defaultValue={locale}>
                        {['fin', 'en'].map((x) => (
                            <option key={x}>{x}</option>
                        ))}
                    </select>
                </div>
            </IntlProvider>
        </div>
    )
}

export default Welcome;