import React, { memo } from 'react'
import AddressTemplate from '../settings/AddressTemplate';

const DefaultAddress =memo(function DefaulAdd({data}){
  
    if (!data?.length) return null;
    return <> 
    { 
      data.map((address) =>
      address.is_default ? <AddressTemplate key={1} address={address}  hide={true} styles={'bg-schemes-light-surface text-schemes-light-onSurface'} /> : null
    )}
    </>
  });

export default DefaultAddress