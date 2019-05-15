import { API_BASE_URL, POLL_LIST_SIZE, ACCESS_TOKEN } from "../constants";

const request = options => {
  const headers = new Headers({
    "Content-Type": "application/json"
  });

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    );
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then(response =>
    response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export function login(loginRequest) {
  return request({
    url: API_BASE_URL + "/auth/signin",
    method: "POST",
    body: JSON.stringify(loginRequest)
  });
}

export function signup(signupRequest) {
  return request({
    url: API_BASE_URL + "/auth/signup",
    method: "POST",
    body: JSON.stringify(signupRequest)
  });
}

export function checkUsernameAvailability(username) {
  return request({
    url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
    method: "GET"
  });
}

export function checkEmailAvailability(email) {
  return request({
    url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
    method: "GET"
  });
}

export function getCurrentUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: API_BASE_URL + "/user/me",
    method: "GET"
  });
}

export function getUserProfile(userId) {
  return request({
    url: API_BASE_URL + "/user/profile?id=" + userId,
    method: "GET"
  });
}

//Job Functionality
export function createJob(jobRequest) {
  return request({
    url: API_BASE_URL + "/users/job/",
    method: "POST",
    body: JSON.stringify(jobRequest)
  });
}

export function getAllJobs() {
  return request({
    url: API_BASE_URL + "/services/jobs",
    method: "GET"
  });
}

export function getJobs(userId) {
  return request({
    url: API_BASE_URL + "/users/jobs?userId=" + userId,
    method: "GET"
  });
}

export function deleteJob(jobId) {
  return request({
    url: API_BASE_URL + "/users/deleteJob?jobId=" + jobId,
    method: "GET"
  });
}

export function updateJob(updateJobRequest) {
  return request({
    url: API_BASE_URL + "/jobs/updateJob",
    method: "POST",
    body: JSON.stringify(updateJobRequest)
  });
}

// Car Functionality

export function getAllCars(userId) {
  return request({
    url: API_BASE_URL + "/users/cars?userId=" + userId,
    method: "GET"
  });
}

export function addCar(carRequest) {
  return request({
    url: API_BASE_URL + "/users/car",
    method: "POST",
    body: JSON.stringify(carRequest)
  });
}

export function updateCar(carUpdateRequest) {
  return request({
    url: API_BASE_URL + "/users/updateCar",
    method: "POST",
    body: JSON.stringify(carUpdateRequest)
  });
}

export function deleteCar(carId) {
  return request({
    url: API_BASE_URL + "/users/deleteCar?carId=" + carId,
    method: "GET"
  });
}

// Offer functionality
// Service accepta jobul

export function createOffer(offerRequest) {
  return request({
    url: API_BASE_URL + "/services/offer",
    method: "POST",
    body: JSON.stringify(offerRequest)
  });
}

export function hideJob(jobId) {
  return request({
    url: API_BASE_URL + "/services/offers/hideJob?jobId=" + jobId,
    method: "GET"
  });
}

export function deleteOffer(offerId) {
  return request({
    url: API_BASE_URL + "/services/deleteOffer?offerId=" + offerId,
    method: "GET"
  });
}

export function getOffers(userId) {
  return request({
    url: API_BASE_URL + "/users/offers?userId=" + userId,
    method: "GET"
  });
}

export function acceptOffer(offerId) {
  return request({
    url: API_BASE_URL + "/users/acceptOffer?offerId=" + offerId,
    method: "GET"
  });
}

// Update user

export function updateUser(userRequest) {
  return request({
    url: API_BASE_URL + "/user/updateProfile",
    method: "POST",
    body: JSON.stringify(userRequest)
  });
}

// Chat functionality

export function sendMessage(messageRequest) {
  return request({
    url: API_BASE_URL + "/chat/postMessage",
    method: "POST",
    body: JSON.stringify(messageRequest)
  });
}

export function getMessagesByJob(jobid) {
  return request({
    url: API_BASE_URL + "/chat/getMessagesByJobId?jobid=" + jobid,
    method: "GET"
  });
}

export function getUnreadMessages() {
  return request({
    url: API_BASE_URL + "/chat/getUnreadMessages",
    method: "GET"
  });
}

export function getAllMessages() {
  return request({
    url: API_BASE_URL + "/chat/getAllMessages",
    method: "GET"
  });
}
