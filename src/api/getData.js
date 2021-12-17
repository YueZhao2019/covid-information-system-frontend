import { get, post, put } from "./axios";



//login 
export function login(params) {
  return post("http://127.0.0.1:8000/api/users/login/", params);
}

//Add User
export function addUser(params) {
  return post("http://127.0.0.1:8000/api/users/addUser/", params);
}

// get covid information of the user by cid
export function getCovidInfo(params) {
  return get("http://127.0.0.1:8000/api/covid/" + params.cid + "/", params);
}

//apply for admission and accomodation
export function apply(params) {
  return put("http://127.0.0.1:8000/api/covid/" + params.cid + "/apply/", params);
}

//examine admission and accomodation
export function examine(params) {
  return put("http://127.0.0.1:8000/api/covid/" + params.cid + "/examine/", params);
}

//edit the profile of the student
export function editProfile(params) {
  return put("http://127.0.0.1:8000/api/covid/" + params.cid + "/editProfile/", params);
}

//get all student Coivd information
export function getStudentCovidInformation(params) {
  return get("http://127.0.0.1:8000/api/covid/information/", params);
}

//log out
export function logout(params) {
  return get("/oauth/logout", params);
}

