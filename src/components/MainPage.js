import React, { useState , useEffect } from 'react'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPencil,  faPlus} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import axios from 'axios'

function MainPage() {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      setError('no access token');
      return;
    }
    const fetchPrivateData = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authentication': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      };

      try {
        const response = await axios.get('https://userpanel-instaboost-backend.onrender.com/getData', config);
        const newData = response.data.data;

          setData(newData);
          console.log(newData)

      } catch (err) {
          setError(err.message);
          console.log(err.message)
      }
    };
    fetchPrivateData();
  }, []);



  const handleLogout = ()=>{
    localStorage.removeItem('accessToken')
    window.location.reload()
  }

  return (
    <>
      {error ? (
        <p className='main-page-error-container'>
          Unauthorized <Link to={'/login'}>login</Link>
        </p>
      ) : (
        <>
          <NavBar>
            <h3 className='logo'>
              user panel <FontAwesomeIcon className='logo-icon' icon={faPencil} />
            </h3>
            <div className='right'>
            <button onClick={()=>{handleLogout()}}>log out</button>
            <span>Total data : {data.length}</span>
            </div>
          </NavBar>

          <Main>
          { data.length === 0 ? (
                <p>No Data found</p>
              ) : (
               data.map((e,key) => (
                  <div>
                    <p key={key}>email : {e.email}</p>
                    <p key={key}>password : {e.password}</p>
                  </div>
                ))
              )}
          </Main>
        </>
       )}
    </>
  );
}

export default MainPage;

const NavBar = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:1rem;
    box-shadow:1px 1px 10px 3px rgba(173, 173, 173, 0.733);
    width:100%;
    background:white;

    .right{
      margin-right:1rem;
    }
    button{
      padding:.3rem 1rem ;
      margin:0 1rem ;
      background:red;
      color:white;
      border:none;
      cursor:pointer;
    }
`

const Main = styled.div`
width:100%
height:100vh;
margin:auto;
padding-top:5rem;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
div{
  width:min(400px, 100%);
  background:rgba(0, 34, 255, 0.072);

  margin:1rem 0;
  display:flex;
  align-items:left;
  flex-direction:column;
  justify-content:center;
  padding:1.5rem;
}
div p{
  margin:.5rem 0;
}


`

