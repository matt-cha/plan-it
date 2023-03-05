import React, { useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import '@reach/combobox/styles.css';
export default function Location({ control }) {

  const [selected, setSelected] = useState({ lat: 40.785091, lng: -73.968285 });
  const libraries = useMemo(() => ['places'], []);

  const mapContainerStyle = {
    width: '100%',
    height: '300px',
    borderRadius: '.25rem'
  };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAdLGV4RzzLD1SC8fVAshEm_92pcAUgg8s',
    libraries
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <div className='gmaps'>
        <p className='pl-2 text-[#0d2137] text-lg font-medium'>Location</p>
      </div>
      <div className='my-2'>
        <Controller
          name="location"
          control={control}
          render={({ field }) =>
            <PlacesAutoComplete onSelect={(latLng, address) => {
              setSelected(latLng);
              field.onChange(address);
            }}
            />
          }
        />
      </div>
      <div className='w-full '>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={10}
          center={selected}
          className='h-1/4 p-11 object-contain my-2'
          mapContainerClassName='w-full h-1/2 rounded'
        >
          <Marker position={selected} />
        </GoogleMap>
      </div>
    </>
  );
}

const PlacesAutoComplete = ({ onSelect }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions
  } = usePlacesAutocomplete();

  const handleSelect = async address => {
    setValue(address, false);
    clearSuggestions();
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      onSelect({ lat, lng }, address);
    } catch (error) {
      console.error('Error!:', error);
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
          {status === 'OK' && data.map(({ placeId, description }, index) => (
            <ComboboxOption key={index} value={description} />
          ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
