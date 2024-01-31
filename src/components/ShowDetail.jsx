import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure Bootstrap CSS is imported

function ShowDetail() {
  const [show, setShow] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    showName: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve booking details from session storage
    const savedBookingDetails = JSON.parse(
      sessionStorage.getItem("bookingDetails")
    );
    if (savedBookingDetails) {
      setBookingDetails(savedBookingDetails);
    }

    const fetchShowData = async () => {
      try {
        const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
        setShow(response.data);
        setBookingDetails((prevDetails) => ({
          ...prevDetails,
          showName: response.data.name,
          ...(savedBookingDetails || {}),
        }));
      } catch (error) {
        console.error("Error fetching show details:", error);
      }
    };

    fetchShowData();
  }, [id]);

  const handleInputChange = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allBookings = JSON.parse(sessionStorage.getItem("allBookings")) || [];
    allBookings.push(bookingDetails);
    sessionStorage.setItem("allBookings", JSON.stringify(allBookings));
    alert("Booking Successful!");
    navigate("/");
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="container my-5">
      {show ? (
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="card mb-4 shadow-sm">
              <div className="card-header">
                <h2 className="my-0 font-weight-normal">{show.name}</h2>
              </div>
              <div className="card-body">
                <div dangerouslySetInnerHTML={{ __html: show.summary }} />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mb-4">
              <h4 className="mb-3">Book Tickets</h4>
              <div className="mb-3">
                <label htmlFor="showName" className="form-label">
                  Show Name:
                </label>
                <input
                  type="text"
                  id="showName"
                  className="form-control"
                  value={show.name}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  name="name"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  name="email"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                Book Ticket
              </button>
            </form>

            <button onClick={handleBack} className="btn btn-outline-secondary">
              Back to List
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p>Loading show details...</p>
        </div>
      )}
    </div>
  );
}

export default ShowDetail;

// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// function ShowDetail() {
//   const [show, setShow] = useState(null);
//   const [bookingDetails, setBookingDetails] = useState({
//     name: "",
//     email: "",
//     showName: "",
//   });
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Retrieve booking details from session storage
//     const savedBookingDetails = JSON.parse(
//       sessionStorage.getItem("bookingDetails")
//     );
//     if (savedBookingDetails) {
//       setBookingDetails(savedBookingDetails);
//     }

//     const fetchShowData = async () => {
//       try {
//         const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
//         setShow(response.data);
//         setBookingDetails((prevDetails) => ({
//           ...prevDetails,
//           showName: response.data.name,
//           ...(savedBookingDetails || {}),
//         }));
//       } catch (error) {
//         console.error("Error fetching show details:", error);
//       }
//     };

//     fetchShowData();
//   }, [id]);

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   // Store booking details in session storage
//   //   sessionStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
//   //   alert('Booking Successful!');
//   //   navigate('/');
//   // };

//   const handleInputChange = (e) => {
//     setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const allBookings = JSON.parse(sessionStorage.getItem("allBookings")) || [];
//     allBookings.push(bookingDetails);
//     sessionStorage.setItem("allBookings", JSON.stringify(allBookings));
//     alert("Booking Successful!");
//     navigate("/");
//   };

//   const handleBack = () => {
//     navigate("/");
//   };

//   return (
//     <div className="show-detail">
//       {show ? (
//         <>
//           <h2>{show.name}</h2>
//           <div dangerouslySetInnerHTML={{ __html: show.summary }} />
//           <form onSubmit={handleSubmit}>
//             <div>
//               <label>Show Name:</label>
//               <input type="text" value={show.name} readOnly />
//             </div>
//             <div>
//               <label>Name:</label>
//               <input
//                 type="text"
//                 name="name"
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div>
//               <label>Email:</label>
//               <input
//                 type="email"
//                 name="email"
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <button type="submit">Book Ticket</button>
//           </form>
//           <button onClick={handleBack}>Back to List</button>
//         </>
//       ) : (
//         <p>Loading show details...</p>
//       )}
//     </div>
//   );
// }

// export default ShowDetail;
