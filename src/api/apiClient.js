import axios from "axios";

const url = process.env.NEXT_PUBLIC_API_KEY || "";

const apiVersion = 1;

const route_endpoint = `/api/Admin/v${apiVersion}`;

const apiclient = axios.create({
  baseURL: url + "" + route_endpoint,

  //headers: {'X-Custom-Header': 'foobar'}
});

export default apiclient;
