import { useState } from "react";

/**
 * Our useFetch hook should be used for all communication with the server.
 *
 * route - This is the route you want to access on the server. It should NOT include the /api part, so should be /user or /user/{id}
 * onReceived - a function that will be called with the response of the server. Will only be called if everything went well!
 *
 * Our hook will give you an object with the properties:
 *
 * isLoading - true if the fetch is still in progress
 * error - will contain an Error object if something went wrong
 * performFetch - this function will trigger the fetching. It is up to the user of the hook to determine when to do this!
 * cancelFetch - this function will cancel the fetch, call it when your component is unmounted
 */
const useFetch = (route, onReceived) => {
  /**
   * We use the AbortController which is supported by all modern browsers to handle cancellations
   * For more info: https://developer.mozilla.org/en-US/docs/Web/API/AbortController
   */
  const controller = new AbortController();
  const signal = controller.signal;
  const cancelFetch = () => {
    controller.abort();
  };

  if (route.includes("api/")) {
    /**
     * We add this check here to provide a better error message if you accidentally add the api part
     * As an error that happens later because of this can be very confusing!
     */
    throw Error(
      "when using the useFetch hook, the route should not include the /api/ part",
    );
  }

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Add any args given to the function to the fetch function
  const performFetch = async (options = {}) => {
    setError(null);
    setIsLoading(true);

    const token = localStorage.getItem("token"); // Retrieve the token from localStorage

    //authenticating the user
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
      ...(options.method &&
        ["POST", "PUT", "DELETE"].includes(options.method) &&
        token && { Authorization: `Bearer ${token}` }),
    };

    const baseOptions = {
      method: options.method || "GET",
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    };

    try {
      // We add the /api subsection here to make it a single point of change if our configuration changes
      const url = `${process.env.BASE_SERVER_URL}/api${route}`;
      const res = await fetch(url, { ...baseOptions, signal });
      if (!res.ok) {
        throw new Error(
          `Fetch for ${url} returned an invalid status (${res.status}). Received: ${JSON.stringify(res)}`,
        );
      }

      const jsonResult = await res.json();

      if (jsonResult.success === true) {
        onReceived(jsonResult);
      } else {
        throw new Error(
          jsonResult.msg ||
            `The result from our API did not have an error message. Received: ${JSON.stringify(jsonResult)}`,
        );
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, performFetch, cancelFetch };
};

export default useFetch;
