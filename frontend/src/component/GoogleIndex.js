import {useState, useEffect} from 'react'
// import {KTCard} from '../../../../_metronic/helpers'
import './review.css'
import axios from 'axios'
// import ReactStars from 'react-rating-stars-component'

const GoogleIndex = () => {
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [visibleRowCount, setVisibleRowCount] = useState(5)
  const [visibleColumnCount, setVisibleColumnCount] = useState(2)

  const handleRatingChange = (newRating) => {
    setRating(newRating)
  }
  const showMoreRows = () => {
    setVisibleRowCount((prevCount) => prevCount + 5)

  }
  const showMoreColoumn = () => {
    setVisibleColumnCount((prevCount) => prevCount + 2)
    
  }
  const showLessColoumn = () => {
    if (visibleColumnCount > 2) {
      setVisibleColumnCount((prevCount) => prevCount - 2)
    }
  }
  function getdata() {
    axios.get('http://localhost:8000/showtab').then((res) => {
      setData(res.data)
    })
  }
  useEffect(() => {
    getdata()
  }, [])
  const handleAddReview = async (e) => {
    e.preventDefault()
    if (!name || !email || !review || !rating) {
      setError(true)
      return false
    } else {
      setLoading(true)
      try {
        const response = await axios.post(
          'http://localhost:8000/review',
          {
            name: name,
            email: email,
            review: review,
            rating: rating,
          },
          {
            headers: {'Content-Type': 'application/json'},
          }
        )
        // setName('')
        // setEmail('')
        // setReview('Thank You For Your Reviews')
        // setRating(0)
        await axios.get('http://localhost:8000/showtab').then((res) => {
          setData(res.data)
          // console.log(response)
          setLoading(false)
        })
      } catch (error) {
        console.error('Error:', error)
      }
    }
  }
  function handleDelete(id) {
    axios.delete(`http://localhost:8000/delete/${id}`).then(() => {
      getdata()
    })
  }
  // const starRatingConfigure = {
  //   size: 25,
  //   value: rating,
  //   count: 5,
  //   onChange: (newRating) => {
  //     setRating(newRating);
  //   },
  //   color: 'gray',        // Default color changes to red when error is true
  //   activeColor: rating ? 'red' : '#04c8c8',  // Color when clicked, red when error is true
  //   //hoverColor: error ? 'red' : 'red',    // Color on hover, always red when error is true
  // };

  const handleReset = () => {
    setName('')
    setEmail('')
    setReview('')
    setRating(0)
    setError(false)
  }
  const ratingsCount = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  }
  data.forEach((r) => {
    const rating = r.rating
    if (ratingsCount[rating] !== undefined) {
      ratingsCount[rating] += 1
    }
  })
  const sumRating = data.reduce((sum, r) => sum + r.rating, 0)
  const avgRating = Math.round((sumRating / data.length) * 10) / 10

  // const averageRating = () => {
  //   if (reviews.length === 0) {
  //     return 0;
  //   }
  //   const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  //   return totalRating / reviews.length;
  // };
  const filledStars = Math.floor(avgRating)
  const decimalRating = (avgRating - filledStars).toFixed(1)
  
  const oneStar = decimalRating == 0.1
  const twoStar = decimalRating == 0.2
  const threeStar = decimalRating == 0.3
  const fourStar = decimalRating == 0.4
  const halfStar = decimalRating == 0.5
  const sixStar = decimalRating == 0.6
  const sevenStar = decimalRating == 0.7
  const eightStar = decimalRating == 0.8
  const nineStar = decimalRating== 0.9

  const stars = []
  for (let i = 1; i <= 5; i++) {
    if (i <= filledStars) {
      stars.push(
        <span key={i} className='sun sunfilled'>
          &#9733;
        </span>
      )
    } else if (i === filledStars + 1 && oneStar) {
      stars.push(
        <span key={i} className='sun sunone-sunfilled'>
          &#9733;
        </span>
      )
    } else if (i === filledStars + 1 && twoStar) {
      stars.push(
        <span key={i} className='sun suntwo-sunfilled'>
          &#9733;
        </span>
      )
    } else if (i === filledStars + 1 && threeStar) {
      stars.push(
        <span key={i} className='sun sunthree-sunfilled'>
          &#9733;
        </span>
      )
    } else if (i === filledStars + 1 && fourStar) {
      stars.push(
        <span key={i} className='sun sunfour-sunfilled'>
          &#9733;
        </span>
      )
    } else if (i === filledStars + 1 && halfStar) {
      stars.push(
        <span key={i} className='sun sunhalf-sunfilled'>
          &#9733;
        </span>
      )
    } else if (i === filledStars + 1 && sixStar) {
      stars.push(
        <span key={i} className='sun sunsix-sunfilled'>
          &#9733;
        </span>
      )
    } else if (i === filledStars + 1 && sevenStar) {
      stars.push(
        <span key={i} className='sun sunseven-sunfilled'>
          &#9733;
        </span>
      )
    } else if (i === filledStars + 1 && eightStar) {
      stars.push(
        <span key={i} className='sun suneight-sunfilled'>
          &#9733;
        </span>
      )
    } else if (i === filledStars + 1 && nineStar) {
      stars.push(
        <span key={i} className='sun sunnine-sunfilled'>
          &#9733;
        </span>
      )
    } else {
      stars.push(
        <span key={i} className='sun empty'>
          &#9733;
        </span>
      )
    }
  }
  return (
    <>
      <div className='card mb-5 mb-xl-10'>
        <div className='card'>
          <div>
            <div className='card-header'>
              <div className='card-title fs-3 fw-bold'>Reviews & Ratings</div>
            </div>
            <div className='card-body p-9'>
              <div className='row mx-2 mb-2'>
                <div className='col-xl-12'>
                  <div className='row mb-4'>
                    <div className='col-xl-6'>
                      <div className='mb-4'>
                        <label className='fs-6 fw-semibold mb-2'>User Name</label>
                        <div className='fs-5' id='savediv'>
                          <i className='bi bi-person mx-3' id='text-btn'></i>
                          <input
                            onChange={(e) => {
                              setName(e.target.value)
                            }}
                            value={name}
                            type='text'
                            placeholder='Enter User Name'
                            name='name'
                            className={
                              error && !name?.trim()
                                ? 'form-control form-control-solid fixErrorborder fixAddorg'
                                : 'form-control form-control-solid fixAddorg'
                            }
                          />
                          {error && !name && (
                            <span className='errorForcompany'>Please Enter Your Name</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className='col-xl-6'>
                      <div className='mb-4'>
                        <label className='fs-6 fw-semibold mb-2'>User Email</label>
                        <div className='fs-5' id='savediv'>
                          <i className='bi bi-envelope mx-3 ' id='savebutton'></i>
                          <input
                            onChange={(e) => {
                              setEmail(e.target.value)
                            }}
                            value={email}
                            type='email'
                            placeholder='Enter User Email'
                            name='email'
                            className={
                              error && !email?.trim()
                                ? 'form-control form-control-solid fixErrorborder fixAddorg'
                                : 'form-control form-control-solid fixAddorg'
                            }
                          />
                          {error && !email && (
                            <span className='errorForcompany'>Please Enter Your Email</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mb-4 col-xl-12'>
                  <label className='fs-6 fw-semibold mb-2'>
                    <span>Review</span>
                  </label>
                  <div className='mt-1'>
                    <div className='fs-5' id='savediv'>
                      <textarea
                        id='text-review'
                        className={
                          error && !review?.trim()
                            ? 'form-control form-control-solid fixErrorborder fixAddorg'
                            : 'form-control form-control-solid fixAddorg'
                        }
                        value={review}
                        onChange={(e) => {
                          setReview(e.target.value)
                        }}
                        rows='1'
                      ></textarea>
                      {error && !review && (
                        <span className='errorForcompany'>Please Fill Your Review</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className='col-xl-6 mt-4'>
                  <div className='mb-4'>
                    <label className='fs-6 fw-semibold mb-2'>Rating</label>
                    <div
                      className={
                        error && !rating ? 'star-rating star-rating-before' : 'star-rating'
                      }
                      id='savediv'
                    >
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={rating >= star ? 'star filled' : 'star'}
                          onClick={() => handleRatingChange(star)}
                        >
                          &#9733;
                        </span>
                      ))}
                    </div>
                    {/* <div className=''>
                      <ReactStars {...starRatingConfigure}
                        />
                        </div> */}
                    <div className='fs-5' id='savediv'>
                      {error && !rating && (
                        <span className='errorForcompany'>Please Select Your Rating</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button className='btn btn-primary' onClick={handleAddReview}>
              {!loading && 'Submit Review'}
              {loading && (
                <span className='indicator-progress fixloadersite'>
                  Please wait...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
            <button
              type='reset'
              className='btn btn-light btn-active-light-primary me-2 editbutton'
              onClick={handleReset}
            >
              Discard
            </button>
          </div>
        </div>
      </div>
      {/* Show review and ratings */}
      <div className='card mb-5 mb-xl-10'>
        <div className='card'>
          <div className='card-header'>
            <div className='card-title fs-3 fw-bold'>Ratings & Reviews</div>
          </div>
          <div className='card-body p-9'>
            <div className='row mx-2 mb-2'>
              <div className='mb-4 col-xl-12 mt-1'>
                <label className='fs-6 fw-semibold mb-2'>
                  <span>Customer Ratings</span>
                </label>
                <div className='mt-1'>
                  <label className='fs-6 fw-semibold mb-2'>
                    <span className='rating '>{stars} </span>
                  </label>
                  <label className='fs-6 fw-semibold mb-2 mx-2'>
                    <span>{`${avgRating} out of 5`}</span>
                  </label>
                  <div>
                    <label className='fs-6 fw-semibold mb-2'>
                      <span>{`${data.length} global ratings`}</span>
                    </label>
                  </div>
                  <div className='fs-5' id='savediv'>
                    {Object.keys(ratingsCount)
                      .reverse()
                      .map((rating) => (
                        <div className='row' key={rating}>
                          <div className='side'>
                            <div>{rating} star</div>
                          </div>
                          <div className='middle'>
                            <div
                              className={`bar-container bar-${rating}`}
                              style={{width: `${(ratingsCount[rating] / data.length) * 100}%`}}
                            ></div>
                            {/* {console.log(data.length)} */}
                          </div>
                          <div className='side right'>
                            <div>{`${Math.round(
                              (ratingsCount[rating] / data.length) * 100
                            )}%`}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className='col-xl-12'>
                <div className='row mb-4'>
                  <div className='col-xl-12'>
                    {data.slice(0, visibleColumnCount).map((someData) => {
                      return (
                        <>
                          <div className='mb-4 col-xl-12 mt-10 main'>
                            <label className='fs-6 fw-semibold'>
                              <span>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='16'
                                  height='16'
                                  fill='currentColor'
                                  className='bi bi-person-circle'
                                  viewBox='0 0 16 16'
                                >
                                  <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' />
                                  <path
                                    fillRule='evenodd'
                                    d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'
                                  />
                                </svg>
                              </span>
                            </label>
                            <label className='fs-6 fw-semibold mx-2'>
                              <span>{someData.name}</span>
                            </label>
                            <div className='mt-1'>
                              <div className='stars-rating'>
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <>
                                    <span
                                      key={star}
                                      className={
                                        star <= someData.rating ? 'stars filleds' : 'stars'
                                      }
                                    >
                                      <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='16'
                                        height='16'
                                        fill='currentColor'
                                        className='bi bi-star-fill'
                                        viewBox='0 0 16 16'
                                      >
                                        <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
                                      </svg>
                                    </span>
                                  </>
                                ))}
                                <div className='mb-4 col-xl-12'>
                                  <label className='fs-6 fw-semibold mx-2'>
                                    <span>{someData.review}</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='card-footer d-flex justify-content-start py-6 px-9'>
            {visibleColumnCount < data.length && (
              <button
                className='btn btn-light btn-active-light-primary me-2 editbutton'
                onClick={showMoreColoumn}
              >
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    className='bi bi-caret-down-square-fill'
                    viewBox='0 0 16 16'
                  >
                    <path d='M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4 4a.5.5 0 0 0-.374.832l4 4.5a.5.5 0 0 0 .748 0l4-4.5A.5.5 0 0 0 12 6H4z' />
                  </svg>
                </span>
              </button>
            )}
            {visibleColumnCount > 2 && (
              <button
                className='btn btn-light btn-active-light-primary me-2 editbutton'
                onClick={showLessColoumn}
              >
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    className='bi bi-caret-up-square-fill'
                    viewBox='0 0 16 16'
                  >
                    <path d='M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4 9h8a.5.5 0 0 0 .374-.832l-4-4.5a.5.5 0 0 0-.748 0l-4 4.5A.5.5 0 0 0 4 11z' />
                  </svg>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Show table of review and ratings */}
      <div className='accordion scroll'>
        {/* <KTCard className='pcard'> */}
          <div className='d-flex flex-wrap flex-stack pb-7 mt-10'>
            <div className='d-flex flex-wrap align-items-center my-1 searchorg'>
              <div className='d-flex align-items-center position-relative my-1'>
                <span className='svg-icon svg-icon-1 position-absolute ms-6'>
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <rect
                      opacity='0.5'
                      x='17.0365'
                      y='15.1223'
                      width='8.15546'
                      height='2'
                      rx='1'
                      transform='rotate(45 17.0365 15.1223)'
                      fill='currentColor'
                    />
                    <path
                      d='M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z'
                      fill='currentColor'
                    />
                  </svg>
                </span>
                <input
                  type='text'
                  data-kt-customer-table-filter='search'
                  className='form-control form-control-solid w-250px ps-15'
                  placeholder='Search Organization'
                  onChange={(e) => {
                    setSearch(e.target.value)
                  }}
                  value={search}
                />
              </div>
            </div>
          </div>
          <div className='tab-content'>
            <div className='accordion-collapse collapse show'>
              <div className='orglisting'>
                <table
                  className='table align-middle  table-row-dashed fs-7'
                  id='kt_customers_table'
                >
                  <thead>
                    <tr className='text-start text-gray-400 fw-bold fs-7 cursor-pointer text-uppercase gs-0'>
                      <th className='min-w-20px'>Id</th>
                      <th className='min-w-50px'>Name</th>
                      <th className='min-w-50px'>Email</th>
                      <th className='min-w-20px'>Rating</th>
                      <th className='min-w-20px'>Review</th>
                      <th className='min-w-20px'>Delete</th>
                    </tr>
                  </thead>
                  {data
                    .filter((d) => d.name.toLowerCase().includes(search.toLowerCase()))
                    .slice(0, visibleRowCount)
                    .map((eachData, i) => {
                      return (
                        <>
                          <tbody className=''>
                            <tr className='ext-start text-black-400 '>
                              <td>{++i}</td>
                              <td>{eachData.name}</td>
                              <td>{eachData.email}</td>
                              <td>{`${eachData.rating} Star`}</td>
                              <td>{eachData.review}</td>
                              <td>
                                {' '}
                                <button
                                  type='reset'
                                  className='btn btn-light btn-active-light-primary me-2'
                                  onClick={() => {
                                    handleDelete(eachData.id)
                                  }}
                                >
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='16'
                                    height='16'
                                    fill='currentColor'
                                    className='bi bi-trash3-fill'
                                    viewBox='0 0 16 16'
                                  >
                                    <path d='M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z' />
                                  </svg>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </>
                      )
                    })}
                </table>
                <div className='card-footer d-flex justify-content-end py-6 px-9'>
                  {visibleRowCount < data.length && (
                    <button className='btn btn-primary' onClick={showMoreRows}>
                      Load More
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        {/* </KTCard> */}
      </div>
    </>
  )
}

export default GoogleIndex

// function GoogleIndex() {
//   return (
//     <>
//       <div className='card mb-5 mb-xl-10'>
//         <div className='card'>
//           <div>
//             <div className='card-header'>
//               <div className='card-title fs-3 fw-bold'>Branding Details</div>
//             </div>
//             <div className='card-body p-9'>
//               <div className='row mx-2 mb-2'>
//                 <div className='mb-4 col-xl-3'>
//                   <label className='fs-6 fw-semibold mb-2'>
//                     <span>Company Logo</span>
//                     <i
//                       className='fas fa-exclamation-circle ms-1 fs-7'
//                       data-bs-toggle='tooltip'
//                       title='Allowed file types: png, jpg, jpeg.'
//                     ></i>
//                   </label>
//                   <div className='mt-1'>
//                     <div
//                       className='image-input image-input-outline image-input-placeholder'
//                       data-kt-image-input='true'
//                     >
//                       <div className='image-input-wrapper avtarfixed'>
//                         <span className='text-muted'>No logo selected</span>
//                       </div>
//                       <label
//                         className='btn btn-icon btn-circle btn-hover btn-active-color-primary w-25px h-25px bg-body shadow'
//                         data-kt-image-input-action='change'
//                         data-bs-toggle='tooltip'
//                         title='Change avatar'
//                       >
//                         <i className='bi bi-pencil-fill fs-7'></i>
//                         <input type='file' name='avatar' accept='.png, .jpg, .jpeg' />
//                         <input type='hidden' name='avatar_remove' />
//                       </label>
//                       <span
//                         className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
//                         data-kt-image-input-action='remove'
//                         data-bs-toggle='tooltip'
//                         title='Remove avatar'
//                       >
//                         <i className='bi bi-x fs-2'></i>
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className='col-xl-9'>
//                   <div className='col-xl-12'>
//                     <div className='mb-4'>
//                       <label className='fs-6 fw-semibold mb-2'>Company Name</label>
//                       <input
//                         type='text'
//                         placeholder='Enter Your Company Name'
//                         className='form-control form-control-solid'
//                         name='company_name'
//                         // value={formValues.company_name}
//                         // onChange={(event) =>
//                         //   handleFieldChange('company_name', event.target.value)
//                         // }
//                       />
//                       {/* {formDataError.company_name && (
//                           <span className='errorForcompany fs-6'>{formDataError.company_name}</span>
//                         )} */}
//                     </div>
//                   </div>
//                   <div className='row mb-4'>
//                     <div className='col-xl-6'>
//                       <div className='mb-4'>
//                         <label className='fs-6 fw-semibold mb-2'>Primary Color</label>
//                         <div className='fs-5  ' id='savediv'>
//                           <i className='bi bi-palette mx-3 ' id='savebutton'></i>
//                           <input
//                             type='text'
//                             placeholder='Choose Color'
//                             name='text'
//                             className='form-control form-control-solid fixAddorg'
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <div className='col-xl-6'>
//                       <div className='mb-4'>
//                         <label className='fs-6 fw-semibold mb-2'>Secondary Color</label>
//                         <div className='fs-5  ' id='savediv'>
//                           <i className='bi bi-palette mx-3 ' id='savebutton'></i>
//                           <input
//                             type='text'
//                             placeholder='Choose Color'
//                             name='text'
//                             className='form-control form-control-solid fixAddorg'
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className='row mb-4'>
//                     <div className='col-xl-6'>
//                       <div className='mb-4'>
//                         <label className='fs-6 fw-semibold mb-2'>Primary Font</label>
//                         <div className='fs-5  ' id='savediv'>
//                           <i className='bi bi-file-earmark-font mx-3 ' id='savebutton'></i>
//                           <input
//                             type='text'
//                             placeholder='Choose Font'
//                             name='text'
//                             className='form-control form-control-solid fixAddorg'
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <div className='col-xl-6'>
//                       <div className='mb-4'>
//                         <label className='fs-6 fw-semibold mb-2'>Secondary Font</label>
//                         <div className='fs-5  ' id='savediv'>
//                           <i className='bi bi-file-earmark-font mx-3 ' id='savebutton'></i>
//                           <input
//                             type='text'
//                             placeholder='Choose Font'
//                             name='text'
//                             className='form-control form-control-solid fixAddorg'
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className='card-footer d-flex justify-content-center py-6 px-9'>
//               <button type='submit' className='btn btn-primary'>Submit</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default GoogleIndex
