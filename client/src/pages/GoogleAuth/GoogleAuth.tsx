import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const GoogleAuth = () => {

    const { accessToken } = useParams();
    console.log(accessToken);
    console.log('asdasdasd');

    // useEffect(() => {
    //
    // },[])
  
  
  
    return (
        <div>
      
        </div>
    );
};

export default GoogleAuth;