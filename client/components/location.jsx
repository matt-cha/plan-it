import React, { useMemo, useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import '@reach/combobox/styles.css';

export default function Location({ control, errors }) {
  useEffect(() => {
    if (errors?.name?.message) {
      document.getElementById('show-error').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [errors]);
  const [selected, setSelected] = useState({ lat: 40.785091, lng: -73.968285 });
  /* value is only computed once when component is first mounted */
  const libraries = useMemo(() => ['places'], []);

  const mapContainerStyle = {
    width: '100%',
    height: '300px',
    borderRadius: '.25rem'
  };
  /*  the useLoadScript hook loads the Google Maps API with the API key and libraries and returns a boolean isLoaded */
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAJLGWvLWeYKVsgd32M_O4rxJSnR0slNNs',
    libraries
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div className='gmaps my-2'>
      <label className='cursor-pointer pl-2 my-2 text-xl font-medium'>Location
        <div className='my-2'>
          <Controller
          name="location"
          control={control}
          rules={{ required: 'Please select a location.' }}
          render={({ field }) =>
            <PlacesAutoComplete onSelect={(latLng, address) => {
              setSelected(latLng);
              field.onChange(address);
            }}
            />
          }
        />
        </div>
        {errors.location && (
          <span id='show-error' className="text-red-500">{errors.location.message}</span>
        )}

        <div className='w-full my-4'>
          {/* selected will be the lat and long set by the use state hook from selecting an address that positions the map and its marker */}
          <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={10}
          center={selected}
          className='object-contain my-2 '
          mapContainerClassName='w-full h-1/2 rounded'
        >
            <Marker position={selected} />
          </GoogleMap>
        </div>
      </label>
    </div>
  );
}

const PlacesAutoComplete = ({ onSelect }) => {
  const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete();

  /**
   * handles selection of the address from the autocomplete results
   * @param {string} address - selected option
   */
  const handleSelect = async address => {
    setValue(address, false);
    clearSuggestions();
    try {
      /* wait for each line of code to finish because asynchronous functions */
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      onSelect({ lat, lng }, address);
    } catch (error) {
      if (error instanceof TypeError) {
        console.error('Error: Invalid address input');
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={event => setValue(event.target.value)}
        disabled={!ready}
        className='pl-2 w-full mx-auto rounded-md  shadow-sm py-2 px-3 border border-[#f2dec8] placeholder-gray-400 focus:outline-none focus:ring-[#C8F2DE] focus:border-[#C8F2DE]'
        placeholder='Central Park, New York, NY, USA' />
      <ComboboxPopover className='rounded '>
        <ComboboxList>
          {/* only when request is successful, status prop allows the data from search result to be mapped to a Combobox Option or search result with the name of the location   */}
          {status === 'OK' && data.map(({ placeId, description }, index) => (
            <ComboboxOption key={index} value={description} />
          ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
