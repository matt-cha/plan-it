import React from 'react';

export default function Loader() {

  return (
    <div className='justify-center items-center fixed z-50 inset-0 w-full h-full bg-[#000000] opacity-70 flex flex-wrap'>
      <div className="lds-default loader ">
        <div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div />
      </div>
    </div>
  );
}
