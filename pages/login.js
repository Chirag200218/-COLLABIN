import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

function login() {

    const {register,handleSubmit,formState: { errors }} = useForm();
    const onSubmit = async(data) => {
      try {
        // const res = await axios.get(`http://localhost:3000/api/details/user?name=${data.name}&email=${data.email}&password=${data.password}`);
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <div>
       <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Name:
          <input type="text" name="name" {...register("name",{required: true})} />
          {errors.name && errors.name.type === "required" && (
            <p className="errorMsg">name is required.</p>
          )}
        </label>
        <label>
          email:
          <input type="email" name="email" {...register("email",{required: true,pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/})}/>
          {errors.email && errors.email.type === "required" && (
            <p className="errorMsg">Email is required.</p>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <p className="errorMsg">Email is not valid.</p>
          )}
        </label>
        <label>
          password:
          <input type="password" name="password" {...register("password",{required: true,minLength: 6})} />
          {errors.password && errors.password.type === "required" && (
            <p className="errorMsg">password is required.</p>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <p className="errorMsg">password is not valid.</p>
          )}
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default login