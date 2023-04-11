import React, { useState, useEffect } from 'react'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'
const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'
function App() {

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('name');
  const [value, setValue] = useState('John Doe');

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      // 正确的 destructure 方法：使用 ES6
      const user = data.results[0];
      const {email, phone} = user;
      const {large: image} = user.picture;
      const {age} = user.dob;
      const {login: {password}} = user;
      const {first, last} = user.name;
      const {name, number} = user.location.street;
      // 放入一个新的 object
      const newUser = {
        image, 
        phone, 
        email, 
        password, 
        age, 
        street: `${number} ${name}`,
        name: `${first} ${last}`
      }
      setUser(newUser);
      // 设置初始值, 将初始的 title & title value 也放上去。
      setTitle('name');
      setValue(newUser.name);

    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  // 设置一个 handleHover 来 handle mouseOver event，
  // 当鼠标滑到特定 button 上时, invoke 这个 function.
    // 而 event.target 将对准这个 tag，也可以由此接触到 data-label
  const handleHover = (e) => {
    // console.log(e.target);
    // 每次 hover 之后，发现会产生多个 e.target.
    // 正确的 target: <button className='icon' data-label='name'
    // 如何 query 到正确的 target？先寻找 classList 中是否包含 icon！

    if (e.target.classList.contains('icon')){
      const newTag = e.target.dataset.label; // 取得目前 hover 的 tag 的 data-label
      // console.log(newValue);
      console.log(user.newTag); 
      // 此处的 newTag 储存了一个 string，
      // 因此不可以用 user.newValue 的形式提取 properties，会变成 user."newTag"
      // 应该采用 user[newValue]
      setTitle(newTag);
      setValue(user[newTag]);
    }
  }

  useEffect(() => {
    fetchUser();
  },[])

  return <main>
    <div className='block bcg-black'></div>
    <div className='block'>
      <div className='container'>
        {/* 当 user 为正时则显示 user.image, 若 user 不存在则显示 defaultImage */}
        <img className='user-img' src={(user && user.image) || defaultImage} alt='random user'></img>
        <p className='user-title'>my {title} is</p>
        <p className='user-value'>{value}</p>
        <div className='values-list'>
          {/* 设置一个 hover listener，即 onMouseOver，传导 data-label */}
          <button className='icon' data-label='name' onMouseOver={handleHover}><FaUser /></button>
          <button className='icon' data-label='email' onMouseOver={handleHover}><FaEnvelopeOpen /></button>
          <button className='icon' data-label='age' onMouseOver={handleHover}><FaCalendarTimes /></button>
          <button className='icon' data-label='street' onMouseOver={handleHover}><FaMap /></button>
          <button className='icon' data-label='phone' onMouseOver={handleHover}><FaPhone /></button>
          <button className='icon' data-label='password' onMouseOver={handleHover}><FaLock /></button>
        </div>
        <button className='btn' type='button' onClick={fetchUser}>{loading ? 'loading...' :'random user'}</button>
      </div>
    </div>
  </main>
}

export default App

// You can also access properties with a string value stored in a variable. 
// The variable must be passed in bracket notation. In the example above, 
// the variable str held "myString" and it is "myString" that is the property name. 
// Therefore, myObj.str will return as undefined.

// str = "myString";
// myObj[str] = "This key is in variable str";

// console.log(myObj.str); // undefined

// console.log(myObj[str]); // 'This key is in variable str'
// console.log(myObj.myString); // 'This key is in variable str'