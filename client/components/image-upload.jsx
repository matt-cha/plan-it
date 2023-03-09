/* import React, {  useState } from 'react';
import { useForm } from 'react-hook-form';

export default function ImageUpload({ register, onChange }) {

  const [imageUrl, setImageUrl] = useState();

  const handleFileChange = event => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
    onChange(file);
  };
  return (
    <label htmlFor="file-upload-button" className="pl-2 rounded max-w-min text-[#0d2137]  ">
      <span className="text-lg font-medium">Cover Photo</span>
      <div className='my-2'>
        <input
            {...register('image')}
            required
            type="file"
            onChange={handleFileChange}
            className="sr-only"
            id='file-upload-button'
            accept=".png, .jpg, .jpeg, .gif, .webp" />
        <div className='relative w-full'>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" />
          <div className="cursor-pointer inline-block py-2 px-4 border rounded-md shadow-sm text-sm font-medium border-[#f2dec8] bg-[#f2dec8] hover:bg-[#e8c59f] hover:border-[#e8c59f] transition-colors duration-300">
            Choose file
          </div>
        </div>
      </div>
      <div className='cursor-pointer h-96 min-w-min max-w-3xl mx-auto rounded bg-gradient-to-b my-2 from-[#f2dec8] to-[#C8F2DE] hover:from-[#e8c59f] hover:to-[#94e8bf] transition-all duration-300'>
        {imageUrl
          ? (<img className="object-contain rounded h-full w-full" src={imageUrl} />)
          : (<div className="flex items-center justify-center h-full w-full text-gray-400">Choose a file</div>
            )} </div>
    </label>

  );
}
 */
