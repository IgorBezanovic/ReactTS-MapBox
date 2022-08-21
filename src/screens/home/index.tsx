import React, { useState, useEffect } from 'react';
import '../../App.css';
import axios, { AxiosError } from 'axios';
import Autocomplete from '../../component/Autocomplite/Autocomplite';
import AlertBox from "../../component/AlertBox/AlertBox";
import { Addresses } from "../../types/addresses.model";
import { ErrorMessage } from "../../types/errorMessage.model";
import { 
    BUILDING_INFORMATION,
    ADDRESSES_INFORMATION
} from "../../common/constants/constants";

function Home(): JSX.Element {
  const API_KEY = process.env.REACT_APP_X_API_KEY;
  const [addresses, setAddresses] = useState<string[]>([]);
  const [value, setValue] = useState<string | null>('');

  let [error, setError] = useState<ErrorMessage>({
    openAlert: false,
    code: 0,
    message: '',
  });

  const errorHandling = (error: unknown, titleOfError: string) => {
    if (error instanceof AxiosError) {
        setError({
          openAlert: true,
          code: error?.response?.status,
          message: `${titleOfError} ${error?.response?.statusText}`,
        })
        setTimeout(() => setError({openAlert: false, code: 0,message: ''}), 3000);
      }
  }

  const getBuildingForPopup = async () => {
    try {
        const response = await axios.get(`/geo-prod/Geo/Buildings/ByEgid/1314478`);
        console.log(response)
    } catch (error) {
        errorHandling(error, BUILDING_INFORMATION);
      }
  }

  const getAddresses = async () => {
    const body = {
      "text": "Sonnrain 4, ",
      "maxItemCount": 6,
      "type": [6]
    }

    try {
      const response = await axios.put(`/geo-prod/Geo/Query`, body, { headers: {"x-api-key": API_KEY!}})
      let addressesResponse : string[] = response.data.map((item: Addresses) => item.highlight);
      const result = addressesResponse.map(item => item.replaceAll('<em>','').replaceAll('</em>',''))
      setAddresses(result);
    } catch (error: unknown) {
        errorHandling(error, ADDRESSES_INFORMATION);
    }
  };
  

  useEffect(() => {
    getAddresses();
    getBuildingForPopup();
     //eslint-disable-next-line
  }, []);

  return (
    <div className="App">
        <Autocomplete 
            addresses={addresses!}
            onChange={(event: React.SyntheticEvent<Element, Event>, value: string | null) => setValue(value)}
            />
        {error.openAlert && <AlertBox error={error}/>} 
    </div>
  );
}

export default Home;
