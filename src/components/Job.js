import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { Button, Form} from "react-bootstrap";
import "./style.css"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Job = (props) => {
  const {
    company,
    contract,
    featured,
    id,
    languages,
    level,
    location,
    logo,

    position,
    postedAt,
    role,
    tools,
  } = props.data;

  

  let keywords = [role, level, [...languages], [...tools]];

  const [icon, setIcon] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const saveJobs = (data,id) => {
    fetch('http://localhost:8000/apply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name, // Use your own property name / key
        phone:data.phone,
        email:data.email,
        resume: data.resume,
        job_id :id,
        gender: data.gender
      }),
    })
      .then((res) => res.json())
      .then(result => {
        console.log("result",result);
        reset()
        setIsOpen(!isOpen)
        toast('Congress!!! Your have applied for the job.');
        })
      .catch((err) => console.log('error'))
  }

  const onSubmit = (data) => {
    console.log(data,id);

    saveJobs(data,id) 

};
  return (
    <div>
    <ToastContainer />
    <div
      className={
        featured ? "job-container job-container--borderLeft" : "job-container"
      }
    >
      <div className="logo">
        <img src={icon} alt="" />
      </div>
      <div className="part1">
        <div className="company">
          <span className="cname">{company}</span>
          {props.data.new && <span className="new">new!</span>}
          {props.data.featured && <span className="featured">featured</span>}
        </div>

        <div className="position" onClick={() => setIsOpen(true)}>{position}</div>

        <div className="details">
          <span>{postedAt}</span>
          <span>&nbsp;•&nbsp;</span>
          <span>{contract}</span>
          <span>&nbsp;•&nbsp;</span>
          <span>{location}</span>
        </div>
      </div>


      <div className="part2">
        {keywords.map((key, id) => (
          <span onClick={() => props.setkeywords(key)} key={id}>
            {key}
          </span>
        ))}
      </div>

    </div>
    {isOpen && (
    <div className="job-container">
      <form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mar" controlId="name">
          <Form.Label><h4>Name</h4></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            {...register("name", {
              required: "Please enter your name"
            })}
          />
          {errors.name && <p className="errorMsg">{errors.name.message}</p>}
        </Form.Group>
        <Form.Group className="mar" controlId="email">
          <Form.Label><h4>Email</h4></Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Please enter your email",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Please enter a valid email"
              }
            })}
          />
          {errors.email && <p className="errorMsg">{errors.email.message}</p>}
        </Form.Group>

        <Form.Group className="mar" controlId="phone">
          <Form.Label><h4>Name</h4></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your phone"
            {...register("phone", {
              required: "Please enter your phone number"
            })}
          />
          {errors.phone && <p className="errorMsg">{errors.phone.message}</p>}
        </Form.Group>
        <Form.Group className="mar" controlId="gender">
          <Form.Label><h4>Select Gender</h4></Form.Label>
          <Form.Check
            type="radio"
            label="Male"
            value="male"
            {...register("gender", {
              required: "Please select your gender"
            })}
          />
          <Form.Check
            type="radio"
            label="Female"
            value="female"
            {...register("gender")}
          />
          {errors.gender && <p className="errorMsg">{errors.gender.message}</p>}
        </Form.Group>

        <Form.Group className="mar" controlId="resume">
          <Form.Label><h4>Resume</h4></Form.Label>
          <Form.Control
            type="textarea"
            as="textarea" rows={8}
            placeholder="Paste your Resume"
            {...register("resume", {
              required: "Please enter your resume"
            })}
          />
          {errors.resume && <p className="errorMsg">{errors.resume.message}</p>}
        </Form.Group>


        <label></label>
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </form>

            </div>
           )}
           </div>

  );
};

export default Job;